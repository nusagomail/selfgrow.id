import { and, eq, schema } from "@selfgrow/db";
import {
  createToolBodySchema,
  DEFAULT_TOOL_RUN_QUOTA,
  runToolConfig,
  saveToolBodySchema,
  TOOL_PRESETS,
  testRunBodySchema,
  toolConfigSchema,
  type z,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";

async function parseBody<S extends z.ZodTypeAny>(req: Request, s: S) {
  const parsed = s.safeParse(await req.json().catch(() => null));
  return parsed.success
    ? { ok: true as const, data: parsed.data as z.infer<S> }
    : { ok: false as const, issues: parsed.error.issues.slice(0, 20) };
}

const issuesBody = (issues: { path: PropertyKey[]; message: string }[]) => ({
  error: "invalid_body",
  issues: issues.map((i) => ({ path: i.path.map(String).join("."), message: i.message })),
});

/** Tool Builder di Studio (BLUEPRINT bagian 5). Admin melihat rumus; pelanggan tidak pernah. */
export const studioTools = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .post("/", async (c) => {
    const body = await parseBody(c.req.raw, createToolBodySchema);
    if (!body.ok) return c.json(issuesBody(body.issues), 400);
    const { title, slug, summary, preset } = body.data;

    const exists = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.type, "tool"), eq(schema.contentItems.slug, slug)),
      columns: { id: true },
    });
    if (exists) return c.json({ error: "slug_taken" }, 409);

    const id = crypto.randomUUID();
    await c.var.db.batch([
      c.var.db.insert(schema.contentItems).values({
        id,
        type: "tool",
        slug,
        title,
        summary: summary ?? null,
        status: "draft",
      }),
      c.var.db.insert(schema.toolDefinitions).values({
        contentId: id,
        kind: "nocode",
        configJson: JSON.stringify(TOOL_PRESETS[preset]),
      }),
    ]);
    await writeAudit(c, { action: "tool.create", target: `content:${id}`, after: body.data });
    return c.json({ id }, 201);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const [item, def] = await Promise.all([
      c.var.db.query.contentItems.findFirst({
        where: and(eq(schema.contentItems.id, id), eq(schema.contentItems.type, "tool")),
      }),
      c.var.db.query.toolDefinitions.findFirst({ where: eq(schema.toolDefinitions.contentId, id) }),
    ]);
    if (!item || !def) return c.json({ error: "not_found" }, 404);
    return c.json({
      item: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        status: item.status,
        publishedAt: item.publishedAt?.toISOString() ?? null,
      },
      tool: {
        kind: def.kind,
        moduleSlug: def.moduleSlug,
        config: def.configJson ? JSON.parse(def.configJson) : null,
        hasUnpublishedChanges: def.configJson !== def.publishedConfigJson,
        quotaPerMonth: def.quotaPerMonth,
        defaultQuota: DEFAULT_TOOL_RUN_QUOTA,
      },
    });
  })

  .put("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await parseBody(c.req.raw, saveToolBodySchema);
    if (!body.ok) return c.json(issuesBody(body.issues), 400);

    const def = await c.var.db.query.toolDefinitions.findFirst({
      where: eq(schema.toolDefinitions.contentId, id),
    });
    if (!def) return c.json({ error: "not_found" }, 404);
    if (def.kind !== "nocode") return c.json({ error: "custom_tool_not_editable" }, 400);

    await c.var.db
      .update(schema.toolDefinitions)
      .set({
        configJson: JSON.stringify(body.data.config),
        ...(body.data.quotaPerMonth !== undefined
          ? { quotaPerMonth: body.data.quotaPerMonth }
          : {}),
      })
      .where(eq(schema.toolDefinitions.contentId, id));
    await c.var.db
      .update(schema.contentItems)
      .set({ updatedAt: new Date() })
      .where(eq(schema.contentItems.id, id));
    await writeAudit(c, {
      action: "tool.config.update",
      target: `content:${id}`,
      before: {
        config: def.configJson ? JSON.parse(def.configJson) : null,
        quota: def.quotaPerMonth,
      },
      after: body.data,
    });
    return c.json({ ok: true });
  })

  /** Uji coba konfigurasi (belum disimpan) di Studio. Tidak menghitung kuota. */
  .post("/:id/test-run", async (c) => {
    const body = await parseBody(c.req.raw, testRunBodySchema);
    if (!body.ok) return c.json(issuesBody(body.issues), 400);
    try {
      return c.json(runToolConfig(toolConfigSchema.parse(body.data.config), body.data.input));
    } catch (e) {
      const issues = (e as { issues?: { path: PropertyKey[]; message: string }[] }).issues;
      return c.json(issues ? issuesBody(issues) : { error: "run_failed" }, 400);
    }
  });
