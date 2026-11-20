import { and, eq, schema } from "@selfgrow/db";
import {
  buildFileName,
  checkTemplate,
  createTemplateBodySchema,
  type EbookDoc,
  fillTemplate,
  parseTemplateInput,
  previewTemplateBodySchema,
  STARTER_TEMPLATE,
  saveTemplateBodySchema,
  type z,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { writeJson } from "../services/ebook-storage";
import { readJson, templateKeys } from "../services/template-storage";

// Generator DOCX/PDF/XLSX dimuat hanya saat dibutuhkan.
const loadGenerators = () => import("../templates");

import { attachmentHeaders } from "./templates";

async function parseBody<S extends z.ZodTypeAny>(req: Request, s: S) {
  const parsed = s.safeParse(await req.json().catch(() => null));
  return parsed.success
    ? { ok: true as const, data: parsed.data as z.infer<S> }
    : {
        ok: false as const,
        issues: parsed.error.issues
          .slice(0, 20)
          .map((i) => ({ path: i.path.map(String).join("."), message: i.message })),
      };
}

/** Template Builder di Studio (BLUEPRINT bagian 5). */
export const studioTemplates = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .use(async (c, next) => {
    await next();
    if (!c.res.headers.has("Cache-Control")) c.header("Cache-Control", "private, no-store");
  })

  .post("/", async (c) => {
    const body = await parseBody(c.req.raw, createTemplateBodySchema);
    if (!body.ok) return c.json({ error: "invalid_body", issues: body.issues }, 400);
    const { title, slug, summary } = body.data;
    const exists = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.type, "template"), eq(schema.contentItems.slug, slug)),
      columns: { id: true },
    });
    if (exists) return c.json({ error: "slug_taken" }, 409);

    const id = crypto.randomUUID();
    await writeJson(c.env.CONTENT, templateKeys.draft(id), STARTER_TEMPLATE.body);
    await c.var.db.batch([
      c.var.db.insert(schema.contentItems).values({
        id,
        type: "template",
        slug,
        title,
        summary: summary ?? null,
        status: "draft",
      }),
      c.var.db.insert(schema.templateDefinitions).values({
        contentId: id,
        bodyR2Key: templateKeys.draft(id),
        variablesJson: JSON.stringify(STARTER_TEMPLATE.config),
        outputFormats: JSON.stringify(STARTER_TEMPLATE.config.outputFormats),
      }),
    ]);
    await writeAudit(c, { action: "template.create", target: `content:${id}`, after: body.data });
    return c.json({ id }, 201);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const [item, def] = await Promise.all([
      c.var.db.query.contentItems.findFirst({
        where: and(eq(schema.contentItems.id, id), eq(schema.contentItems.type, "template")),
      }),
      c.var.db.query.templateDefinitions.findFirst({
        where: eq(schema.templateDefinitions.contentId, id),
      }),
    ]);
    if (!item || !def) return c.json({ error: "not_found" }, 404);
    const body =
      (await readJson<EbookDoc>(c.env.CONTENT, templateKeys.draft(id))) ?? STARTER_TEMPLATE.body;
    const config = JSON.parse(def.variablesJson);
    return c.json({
      item: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        status: item.status,
      },
      config,
      body,
      problems: checkTemplate(body, config.variables ?? []),
    });
  })

  .put("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await parseBody(c.req.raw, saveTemplateBodySchema);
    if (!body.ok) return c.json({ error: "invalid_body", issues: body.issues }, 400);
    const def = await c.var.db.query.templateDefinitions.findFirst({
      where: eq(schema.templateDefinitions.contentId, id),
    });
    if (!def) return c.json({ error: "not_found" }, 404);

    await writeJson(c.env.CONTENT, templateKeys.draft(id), body.data.body);
    await c.var.db
      .update(schema.templateDefinitions)
      .set({
        variablesJson: JSON.stringify(body.data.config),
        outputFormats: JSON.stringify(body.data.config.outputFormats),
      })
      .where(eq(schema.templateDefinitions.contentId, id));
    await c.var.db
      .update(schema.contentItems)
      .set({ updatedAt: new Date() })
      .where(eq(schema.contentItems.id, id));
    await writeAudit(c, {
      action: "template.update",
      target: `content:${id}`,
      before: { config: JSON.parse(def.variablesJson) },
      after: { config: body.data.config },
    });
    return c.json({
      ok: true,
      problems: checkTemplate(body.data.body, body.data.config.variables),
    });
  })

  /** Unduh contoh dari konfigurasi di layar (belum disimpan). Tidak memotong kuota. */
  .post("/:id/preview", async (c) => {
    const body = await parseBody(c.req.raw, previewTemplateBodySchema);
    if (!body.ok) return c.json({ error: "invalid_body", issues: body.issues }, 400);
    const { config, body: doc, format, input } = body.data;
    let values: ReturnType<typeof parseTemplateInput>;
    try {
      values = parseTemplateInput(config, input);
    } catch (e) {
      const issues = (e as { issues?: { path: PropertyKey[]; message: string }[] }).issues ?? [];
      return c.json(
        {
          error: "invalid_input",
          issues: issues.map((i) => ({ path: i.path.map(String).join("."), message: i.message })),
        },
        400,
      );
    }
    const item = await c.var.db.query.contentItems.findFirst({
      where: eq(schema.contentItems.id, c.req.param("id")),
      columns: { title: true },
    });
    const filled = fillTemplate(doc, config, values);
    const meta = {
      title: item?.title ?? "Template",
      userId: c.var.user?.id ?? "admin",
      generatedAt: new Date(),
    };
    const { CONTENT_TYPES, renderDocument } = await loadGenerators();
    const bytes = await renderDocument(format, filled, meta);
    return new Response(bytes, {
      headers: attachmentHeaders(
        CONTENT_TYPES[format],
        buildFileName(config, meta.title, values, format),
      ),
    });
  });

/** Dipanggil saat template diterbitkan (PATCH /studio/content/:id). */
export async function publishTemplate(
  env: AppEnv["Bindings"],
  db: AppEnv["Variables"]["db"],
  id: string,
) {
  const def = await db.query.templateDefinitions.findFirst({
    where: eq(schema.templateDefinitions.contentId, id),
  });
  if (!def) return { ok: false as const, problems: ["Template tidak ditemukan"] };
  const parsed = saveTemplateBodySchema.safeParse({
    config: JSON.parse(def.variablesJson),
    body: await readJson<EbookDoc>(env.CONTENT, templateKeys.draft(id)),
  });
  if (!parsed.success)
    return { ok: false as const, problems: ["Konfigurasi template tidak valid"] };
  const problems = checkTemplate(parsed.data.body, parsed.data.config.variables);
  if (problems.length > 0) return { ok: false as const, problems };
  await writeJson(env.CONTENT, templateKeys.published(id), parsed.data);
  return { ok: true as const, snapshot: parsed.data };
}
