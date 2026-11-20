import { and, asc, desc, eq, inArray, schema } from "@selfgrow/db";
import {
  createProgramBodySchema,
  type ProgramDay,
  saveProgramBodySchema,
  type z,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { writeJson } from "../services/ebook-storage";
import { checkProgramRefs, programKeys } from "../services/programs";

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

const STARTER_STEPS: ProgramDay[] = [
  {
    day: 1,
    title: "Mulai dari sini",
    description: "Kenali tujuanmu untuk 30 hari ke depan.",
    items: [{ type: "task", text: "Tulis satu alasan kenapa kamu ikut program ini." }],
  },
];

/** Program Builder di Studio (BLUEPRINT bagian 5). */
export const studioPrograms = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .post("/", async (c) => {
    const body = await parseBody(c.req.raw, createProgramBodySchema);
    if (!body.ok) return c.json({ error: "invalid_body", issues: body.issues }, 400);
    const { title, slug, summary, durationDays } = body.data;
    const exists = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.type, "program"), eq(schema.contentItems.slug, slug)),
      columns: { id: true },
    });
    if (exists) return c.json({ error: "slug_taken" }, 409);
    const id = crypto.randomUUID();
    await c.var.db.batch([
      c.var.db.insert(schema.contentItems).values({
        id,
        type: "program",
        slug,
        title,
        summary: summary ?? null,
        status: "draft",
      }),
      c.var.db.insert(schema.programs).values({
        contentId: id,
        durationDays,
        stepsJson: JSON.stringify(STARTER_STEPS),
      }),
    ]);
    await writeAudit(c, { action: "program.create", target: `content:${id}`, after: body.data });
    return c.json({ id }, 201);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const [item, program] = await Promise.all([
      c.var.db.query.contentItems.findFirst({
        where: and(eq(schema.contentItems.id, id), eq(schema.contentItems.type, "program")),
      }),
      c.var.db.query.programs.findFirst({ where: eq(schema.programs.contentId, id) }),
    ]);
    if (!item || !program) return c.json({ error: "not_found" }, 404);

    // Katalog untuk memilih langkah: ebook (+ bab), tool, template.
    const catalog = await c.var.db
      .select({
        id: schema.contentItems.id,
        type: schema.contentItems.type,
        title: schema.contentItems.title,
        status: schema.contentItems.status,
      })
      .from(schema.contentItems)
      .where(inArray(schema.contentItems.type, ["ebook", "tool", "template"]))
      .orderBy(desc(schema.contentItems.updatedAt))
      .limit(500);
    const ebookIds = catalog.filter((x) => x.type === "ebook").map((x) => x.id);
    const chapters = ebookIds.length
      ? await c.var.db
          .select({
            id: schema.ebookChapters.id,
            contentId: schema.ebookChapters.contentId,
            title: schema.ebookChapters.title,
            status: schema.ebookChapters.status,
          })
          .from(schema.ebookChapters)
          .where(inArray(schema.ebookChapters.contentId, ebookIds))
          .orderBy(asc(schema.ebookChapters.order))
      : [];
    const steps = JSON.parse(program.stepsJson) as ProgramDay[];
    return c.json({
      item: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        status: item.status,
      },
      durationDays: program.durationDays,
      steps,
      catalog: catalog.map((x) => ({
        ...x,
        chapters: chapters.filter((ch) => ch.contentId === x.id),
      })),
      problems: await checkProgramRefs(c.var.db, steps),
    });
  })

  .put("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await parseBody(c.req.raw, saveProgramBodySchema);
    if (!body.ok) return c.json({ error: "invalid_body", issues: body.issues }, 400);
    const program = await c.var.db.query.programs.findFirst({
      where: eq(schema.programs.contentId, id),
    });
    if (!program) return c.json({ error: "not_found" }, 404);
    const steps = [...body.data.steps].sort((a, b) => a.day - b.day);
    await c.var.db
      .update(schema.programs)
      .set({ durationDays: body.data.durationDays, stepsJson: JSON.stringify(steps) })
      .where(eq(schema.programs.contentId, id));
    await c.var.db
      .update(schema.contentItems)
      .set({ updatedAt: new Date() })
      .where(eq(schema.contentItems.id, id));
    await writeAudit(c, {
      action: "program.update",
      target: `content:${id}`,
      before: {
        durationDays: program.durationDays,
        days: (JSON.parse(program.stepsJson) as unknown[]).length,
      },
      after: { durationDays: body.data.durationDays, days: steps.length },
    });
    return c.json({ ok: true, problems: await checkProgramRefs(c.var.db, steps) });
  });

/** Dipanggil saat program diterbitkan: wajib tanpa masalah rujukan, lalu salin ke versi terbit. */
export async function publishProgram(
  env: AppEnv["Bindings"],
  db: AppEnv["Variables"]["db"],
  id: string,
) {
  const program = await db.query.programs.findFirst({ where: eq(schema.programs.contentId, id) });
  if (!program) return { ok: false as const, problems: ["Program tidak ditemukan"] };
  const parsed = saveProgramBodySchema.safeParse({
    durationDays: program.durationDays,
    steps: JSON.parse(program.stepsJson),
  });
  if (!parsed.success) return { ok: false as const, problems: ["Langkah program tidak valid"] };
  if (parsed.data.steps.length === 0)
    return { ok: false as const, problems: ["Program belum punya hari"] };
  const problems = await checkProgramRefs(db, parsed.data.steps);
  if (problems.length > 0) return { ok: false as const, problems };
  await writeJson(env.CONTENT, programKeys.published(id), parsed.data);
  return { ok: true as const, snapshot: parsed.data };
}
