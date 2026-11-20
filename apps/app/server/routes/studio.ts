import { and, asc, desc, eq, schema, sql } from "@selfgrow/db";
import type { z } from "@selfgrow/shared";
import {
  type ChapterSummary,
  countWords,
  createChapterBodySchema,
  createEbookBodySchema,
  EMPTY_EBOOK_DOC,
  reorderChaptersBodySchema,
  saveChapterBodySchema,
  toolConfigSchema,
  updateContentBodySchema,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import {
  ebookKeys,
  readDoc,
  readDraftOrEmpty,
  writeDoc,
  writeJson,
} from "../services/ebook-storage";
import { publishProgram } from "./studio-programs";
import { publishTemplate } from "./studio-templates";

/** Baca & validasi body JSON dengan skema Zod dari packages/shared. */
async function parseBody<S extends z.ZodTypeAny>(req: Request, s: S) {
  const parsed = s.safeParse(await req.json().catch(() => null));
  return parsed.success ? (parsed.data as z.infer<S>) : null;
}

const toChapterSummary = (c: typeof schema.ebookChapters.$inferSelect): ChapterSummary => ({
  id: c.id,
  title: c.title,
  order: c.order,
  isFreePreview: c.isFreePreview,
  status: c.status,
  wordCount: c.wordCount,
});

/** Studio: dilindungi Cloudflare Access + role admin (D17). Semua aksi tercatat di audit_log. */
export const studio = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/content", async (c) => {
    const rows = await c.var.db
      .select({
        id: schema.contentItems.id,
        type: schema.contentItems.type,
        slug: schema.contentItems.slug,
        title: schema.contentItems.title,
        status: schema.contentItems.status,
        updatedAt: schema.contentItems.updatedAt,
      })
      .from(schema.contentItems)
      .orderBy(desc(schema.contentItems.updatedAt))
      .limit(200);
    return c.json({ items: rows });
  })

  .post("/ebooks", async (c) => {
    const body = await parseBody(c.req.raw, createEbookBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);

    const exists = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.type, "ebook"), eq(schema.contentItems.slug, body.slug)),
      columns: { id: true },
    });
    if (exists) return c.json({ error: "slug_taken" }, 409);

    const id = crypto.randomUUID();
    await c.var.db.insert(schema.contentItems).values({
      id,
      type: "ebook",
      slug: body.slug,
      title: body.title,
      summary: body.summary ?? null,
      status: "draft",
    });
    await writeAudit(c, { action: "ebook.create", target: `content:${id}`, after: body });
    return c.json({ id }, 201);
  })

  /** Pohon kategori → topik untuk pemilih topik di Studio. */
  .get("/categories", async (c) => {
    const rows = await c.var.db
      .select({
        id: schema.categories.id,
        parentId: schema.categories.parentId,
        name: schema.categories.name,
      })
      .from(schema.categories)
      .orderBy(asc(schema.categories.order));
    const roots = rows.filter((r) => !r.parentId);
    return c.json({
      categories: roots.map((r) => ({
        id: r.id,
        name: r.name,
        topics: rows.filter((t) => t.parentId === r.id).map((t) => ({ id: t.id, name: t.name })),
      })),
    });
  })

  .get("/content/:id/category", async (c) => {
    const item = await c.var.db.query.contentItems.findFirst({
      where: eq(schema.contentItems.id, c.req.param("id")),
      columns: { categoryId: true, tier: true },
    });
    if (!item) return c.json({ error: "not_found" }, 404);
    return c.json({ categoryId: item.categoryId, tier: item.tier === "free" ? "free" : "all" });
  })

  .get("/content/:id", async (c) => {
    const id = c.req.param("id");
    const item = await c.var.db.query.contentItems.findFirst({
      where: eq(schema.contentItems.id, id),
    });
    if (!item) return c.json({ error: "not_found" }, 404);
    const chapters = await c.var.db
      .select()
      .from(schema.ebookChapters)
      .where(eq(schema.ebookChapters.contentId, id))
      .orderBy(asc(schema.ebookChapters.order));
    return c.json({
      item: {
        ...item,
        publishedAt: item.publishedAt?.toISOString() ?? null,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
      chapters: chapters.map(toChapterSummary),
    });
  })

  .patch("/content/:id", async (c) => {
    const id = c.req.param("id");
    const body = await parseBody(c.req.raw, updateContentBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);

    const before = await c.var.db.query.contentItems.findFirst({
      where: eq(schema.contentItems.id, id),
    });
    if (!before) return c.json({ error: "not_found" }, 404);

    // Konten hanya boleh ditempatkan di topik (kategori yang punya induk), bukan kategori induk.
    if (body.categoryId) {
      const topic = await c.var.db.query.categories.findFirst({
        where: eq(schema.categories.id, body.categoryId),
        columns: { parentId: true },
      });
      if (!topic?.parentId) return c.json({ error: "invalid_category" }, 400);
    }

    if (body.slug && body.slug !== before.slug) {
      const taken = await c.var.db.query.contentItems.findFirst({
        where: and(
          eq(schema.contentItems.type, before.type),
          eq(schema.contentItems.slug, body.slug),
        ),
        columns: { id: true },
      });
      if (taken) return c.json({ error: "slug_taken" }, 409);
    }

    // Tool: validasi & salin konfigurasi terbit SEBELUM status diubah, supaya penerbitan
    // gagal tanpa efek samping bila konfigurasi tidak valid (review keamanan PR #8).
    let programPublish: { snapshot: unknown } | null = null;
    if (body.status === "published" && before.type === "program") {
      const published = await publishProgram(c.env, c.var.db, id);
      if (!published.ok) {
        return c.json({ error: "invalid_program", problems: published.problems }, 400);
      }
      programPublish = { snapshot: published.snapshot };
    }
    let templatePublish: { snapshot: unknown } | null = null;
    if (body.status === "published" && before.type === "template") {
      const published = await publishTemplate(c.env, c.var.db, id);
      if (!published.ok) {
        return c.json({ error: "invalid_template", problems: published.problems }, 400);
      }
      templatePublish = { snapshot: published.snapshot };
    }
    let toolPublish: { config: unknown } | null = null;
    if (body.status === "published" && before.type === "tool") {
      const published = await publishToolConfig(c.var.db, id);
      if (!published.ok) return c.json({ error: "invalid_tool_config" }, 400);
      toolPublish = { config: published.config };
    }

    const now = new Date();
    const publishing = body.status === "published" && before.status !== "published";
    await c.var.db
      .update(schema.contentItems)
      .set({
        ...body,
        updatedAt: now,
        ...(publishing && !before.publishedAt ? { publishedAt: now } : {}),
      })
      .where(eq(schema.contentItems.id, id));

    let version: number | undefined;
    if (body.status === "published" && before.type === "ebook") {
      version = await snapshotEbook(c.env.CONTENT, c.var.db, id, c.var.user?.id ?? null);
    } else if (programPublish) {
      version = await recordVersion(c.env.CONTENT, c.var.db, id, c.var.user?.id ?? null, {
        program: programPublish.snapshot,
      });
    } else if (templatePublish) {
      version = await recordVersion(c.env.CONTENT, c.var.db, id, c.var.user?.id ?? null, {
        template: templatePublish.snapshot,
      });
    } else if (toolPublish) {
      version = await recordVersion(c.env.CONTENT, c.var.db, id, c.var.user?.id ?? null, {
        config: toolPublish.config,
      });
    }

    await writeAudit(c, {
      action: publishing ? "content.publish" : "content.update",
      target: `content:${id}`,
      before: { title: before.title, slug: before.slug, status: before.status },
      after: { ...body, version },
    });
    return c.json({ ok: true, version });
  })

  .post("/content/:id/chapters", async (c) => {
    const contentId = c.req.param("id");
    const body = await parseBody(c.req.raw, createChapterBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);

    const item = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.id, contentId), eq(schema.contentItems.type, "ebook")),
      columns: { id: true },
    });
    if (!item) return c.json({ error: "not_found" }, 404);

    const [{ next } = { next: 0 }] = await c.var.db
      .select({ next: sql<number>`coalesce(max(${schema.ebookChapters.order}) + 1, 0)` })
      .from(schema.ebookChapters)
      .where(eq(schema.ebookChapters.contentId, contentId));

    const id = crypto.randomUUID();
    const r2Key = ebookKeys.draft(contentId, id);
    await writeDoc(c.env.CONTENT, r2Key, EMPTY_EBOOK_DOC);
    await c.var.db.insert(schema.ebookChapters).values({
      id,
      contentId,
      order: next,
      title: body.title,
      r2Key,
    });
    await touchContent(c.var.db, contentId);
    await writeAudit(c, { action: "chapter.create", target: `chapter:${id}`, after: body });
    return c.json({ id }, 201);
  })

  .put("/content/:id/chapter-order", async (c) => {
    const contentId = c.req.param("id");
    const body = await parseBody(c.req.raw, reorderChaptersBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);

    const existing = await c.var.db
      .select({ id: schema.ebookChapters.id })
      .from(schema.ebookChapters)
      .where(eq(schema.ebookChapters.contentId, contentId));
    const ids = new Set(existing.map((r) => r.id));
    if (ids.size !== body.chapterIds.length || !body.chapterIds.every((x) => ids.has(x))) {
      return c.json({ error: "chapter_mismatch" }, 400);
    }
    await c.var.db.batch(
      body.chapterIds.map((chapterId, order) =>
        c.var.db
          .update(schema.ebookChapters)
          .set({ order })
          .where(
            and(
              eq(schema.ebookChapters.id, chapterId),
              eq(schema.ebookChapters.contentId, contentId),
            ),
          ),
      ) as [never, ...never[]],
    );
    await touchContent(c.var.db, contentId);
    await writeAudit(c, { action: "chapter.reorder", target: `content:${contentId}`, after: body });
    return c.json({ ok: true });
  })

  .get("/chapters/:id", async (c) => {
    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: eq(schema.ebookChapters.id, c.req.param("id")),
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);
    const doc = await readDraftOrEmpty(c.env.CONTENT, chapter.contentId, chapter.id);
    return c.json({ chapter: { ...toChapterSummary(chapter), contentId: chapter.contentId }, doc });
  })

  .put("/chapters/:id", async (c) => {
    const body = await parseBody(c.req.raw, saveChapterBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);

    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: eq(schema.ebookChapters.id, c.req.param("id")),
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);
    const { contentId, id } = chapter;

    const patch: Partial<typeof schema.ebookChapters.$inferInsert> = { updatedAt: new Date() };
    if (body.title !== undefined) patch.title = body.title;
    if (body.isFreePreview !== undefined) patch.isFreePreview = body.isFreePreview;
    if (body.doc) {
      await writeDoc(c.env.CONTENT, ebookKeys.draft(contentId, id), body.doc);
      patch.wordCount = countWords(body.doc);
    }
    if (body.status === "published") {
      const draft = body.doc ?? (await readDraftOrEmpty(c.env.CONTENT, contentId, id));
      await writeDoc(c.env.CONTENT, ebookKeys.published(contentId, id), draft);
      patch.status = "published";
    } else if (body.status === "draft") {
      await c.env.CONTENT.delete(ebookKeys.published(contentId, id));
      patch.status = "draft";
    }

    await c.var.db.update(schema.ebookChapters).set(patch).where(eq(schema.ebookChapters.id, id));
    await touchContent(c.var.db, contentId);

    // Autosave isi bab tidak dicatat (terlalu sering); perubahan metadata & terbit dicatat.
    const meta = { title: body.title, isFreePreview: body.isFreePreview, status: body.status };
    if (Object.values(meta).some((v) => v !== undefined)) {
      await writeAudit(c, {
        action: body.status === "published" ? "chapter.publish" : "chapter.update",
        target: `chapter:${id}`,
        before: {
          title: chapter.title,
          isFreePreview: chapter.isFreePreview,
          status: chapter.status,
        },
        after: meta,
      });
    }
    return c.json({ ok: true, wordCount: patch.wordCount ?? chapter.wordCount });
  })

  .delete("/chapters/:id", async (c) => {
    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: eq(schema.ebookChapters.id, c.req.param("id")),
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);
    await c.env.CONTENT.delete([
      ebookKeys.draft(chapter.contentId, chapter.id),
      ebookKeys.published(chapter.contentId, chapter.id),
    ]);
    await c.var.db.delete(schema.ebookChapters).where(eq(schema.ebookChapters.id, chapter.id));
    await touchContent(c.var.db, chapter.contentId);
    await writeAudit(c, {
      action: "chapter.delete",
      target: `chapter:${chapter.id}`,
      before: { title: chapter.title, contentId: chapter.contentId },
    });
    return c.body(null, 204);
  })

  .get("/content/:id/versions", async (c) => {
    const rows = await c.var.db
      .select()
      .from(schema.contentVersions)
      .where(eq(schema.contentVersions.contentId, c.req.param("id")))
      .orderBy(desc(schema.contentVersions.version));
    return c.json({
      versions: rows.map((v) => ({
        version: v.version,
        createdAt: v.createdAt.toISOString(),
        createdBy: v.createdBy,
      })),
    });
  });

function touchContent(db: AppEnv["Variables"]["db"], contentId: string) {
  return db
    .update(schema.contentItems)
    .set({ updatedAt: new Date() })
    .where(eq(schema.contentItems.id, contentId));
}

/** Simpan snapshot seluruh bab terbit ke R2 + baris content_versions (riwayat versi). */
async function snapshotEbook(
  bucket: R2Bucket,
  db: AppEnv["Variables"]["db"],
  contentId: string,
  userId: string | null,
) {
  const chapters = await db
    .select()
    .from(schema.ebookChapters)
    .where(eq(schema.ebookChapters.contentId, contentId))
    .orderBy(asc(schema.ebookChapters.order));
  const published = [];
  for (const ch of chapters) {
    if (ch.status !== "published") continue;
    published.push({
      id: ch.id,
      title: ch.title,
      order: ch.order,
      isFreePreview: ch.isFreePreview,
      doc: await readDoc(bucket, ebookKeys.published(contentId, ch.id)),
    });
  }
  return recordVersion(bucket, db, contentId, userId, { chapters: published });
}

/** Snapshot ke R2 `{type}s/{id}/versions/{n}.json` + baris content_versions. */
export async function recordVersion(
  bucket: R2Bucket,
  db: AppEnv["Variables"]["db"],
  contentId: string,
  userId: string | null,
  payload: Record<string, unknown>,
) {
  const [{ next } = { next: 1 }] = await db
    .select({ next: sql<number>`coalesce(max(${schema.contentVersions.version}) + 1, 1)` })
    .from(schema.contentVersions)
    .where(eq(schema.contentVersions.contentId, contentId));
  const item = await db.query.contentItems.findFirst({
    where: eq(schema.contentItems.id, contentId),
    columns: { type: true },
  });
  const key =
    item?.type === "ebook"
      ? ebookKeys.version(contentId, next)
      : `${item?.type ?? "content"}s/${contentId}/versions/${next}.json`;
  await writeJson(bucket, key, { contentId, version: next, ...payload });
  await db.insert(schema.contentVersions).values({
    id: crypto.randomUUID(),
    contentId,
    version: next,
    snapshotRef: key,
    createdBy: userId,
  });
  return next;
}

/** Salin draft konfigurasi tool ke versi terbit, hanya bila valid. */
async function publishToolConfig(db: AppEnv["Variables"]["db"], contentId: string) {
  const def = await db.query.toolDefinitions.findFirst({
    where: eq(schema.toolDefinitions.contentId, contentId),
  });
  if (!def) return { ok: false as const };
  if (def.kind === "custom") return { ok: true as const, config: { moduleSlug: def.moduleSlug } };
  const parsed = toolConfigSchema.safeParse(JSON.parse(def.configJson ?? "null"));
  if (!parsed.success) return { ok: false as const };
  const json = JSON.stringify(parsed.data);
  await db
    .update(schema.toolDefinitions)
    .set({ publishedConfigJson: json })
    .where(eq(schema.toolDefinitions.contentId, contentId));
  return { ok: true as const, config: parsed.data };
}
