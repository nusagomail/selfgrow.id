import { and, asc, desc, eq, schema, sql } from "@selfgrow/db";
import { bookmarkBodySchema, progressBodySchema, watermarkDoc } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAuth } from "../middleware/guards";
import { ebookKeys, readDoc } from "../services/ebook-storage";
import { getAccessStatus } from "../services/entitlements";
import {
  getFreeze,
  recordChapterRead,
  watermarkMarkFor,
  withinRateLimit,
} from "../services/protection";

/**
 * Reader ebook (BLUEPRINT bagian 5 & 8). Isi diambil per bab lewat API, tanpa cache publik.
 * Bab gratis (`is_free_preview`) boleh dibaca user login tanpa langganan; bab lain WAJIB
 * langganan aktif. Data progres & bookmark selalu difilter user_id dari sesi.
 */
async function findPublishedEbook(db: AppEnv["Variables"]["db"], slug: string) {
  return db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, "ebook"),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
  });
}

const MAX_BOOKMARKS_PER_EBOOK = 500;

export const ebooks = new Hono<AppEnv>()
  .use(requireAuth)
  // Semua respons reader berisi data per user / konten berbayar: jangan pernah di-cache.
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/:slug", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const ebook = await findPublishedEbook(c.var.db, c.req.param("slug"));
    if (!ebook) return c.json({ error: "not_found" }, 404);

    const [chapters, progress, sub] = await Promise.all([
      c.var.db
        .select({
          id: schema.ebookChapters.id,
          title: schema.ebookChapters.title,
          order: schema.ebookChapters.order,
          isFreePreview: schema.ebookChapters.isFreePreview,
          wordCount: schema.ebookChapters.wordCount,
        })
        .from(schema.ebookChapters)
        .where(
          and(
            eq(schema.ebookChapters.contentId, ebook.id),
            eq(schema.ebookChapters.status, "published"),
          ),
        )
        .orderBy(asc(schema.ebookChapters.order)),
      c.var.db.query.readingProgress.findFirst({
        where: and(
          eq(schema.readingProgress.userId, user.id),
          eq(schema.readingProgress.contentId, ebook.id),
        ),
      }),
      getAccessStatus(c.env.KV, c.var.db, user),
    ]);

    return c.json({
      ebook: { id: ebook.id, slug: ebook.slug, title: ebook.title, summary: ebook.summary },
      chapters: chapters.map((ch) => ({
        ...ch,
        locked: !sub.active && !ch.isFreePreview,
      })),
      progress: progress ? { chapterId: progress.chapterId, position: progress.position } : null,
      subscribed: sub.active,
    });
  })

  .get("/:slug/chapters/:chapterId", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const ebook = await findPublishedEbook(c.var.db, c.req.param("slug"));
    if (!ebook) return c.json({ error: "not_found" }, 404);

    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: and(
        eq(schema.ebookChapters.id, c.req.param("chapterId")),
        eq(schema.ebookChapters.contentId, ebook.id),
        eq(schema.ebookChapters.status, "published"),
      ),
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);

    // Perlindungan (BLUEPRINT bagian 8): akun beku, rate limit, lalu hitung bab per jam.
    const frozen = await getFreeze(c.env.KV, user.id);
    if (frozen) return c.json({ error: "account_frozen", until: frozen.until }, 423);
    if (!(await withinRateLimit(c, "chapter"))) {
      c.header("Retry-After", "60");
      return c.json({ error: "rate_limited" }, 429);
    }

    if (!chapter.isFreePreview) {
      const sub = await getAccessStatus(c.env.KV, c.var.db, user);
      if (!sub.active) return c.json({ error: "subscription_required" }, 403);
    }

    const newlyFrozen = await recordChapterRead(c, user.id, chapter.id);
    if (newlyFrozen) return c.json({ error: "account_frozen", until: newlyFrozen.until }, 423);

    const [doc, mark] = await Promise.all([
      readDoc(c.env.CONTENT, ebookKeys.published(ebook.id, chapter.id)),
      watermarkMarkFor(c, user.id),
    ]);
    if (!doc) return c.json({ error: "not_found" }, 404);

    c.header("Cache-Control", "private, no-store");
    return c.json({
      chapter: { id: chapter.id, title: chapter.title, order: chapter.order },
      // Watermark forensik (tak terlihat, bertanda tangan) + label terlihat untuk halaman baca.
      // Kode forensik sengaja tidak ditampilkan (review keamanan PR #13).
      doc: watermarkDoc(doc, mark),
      watermark: { label: user.email },
    });
  })

  .put("/:slug/progress", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = progressBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    const ebook = await findPublishedEbook(c.var.db, c.req.param("slug"));
    if (!ebook) return c.json({ error: "not_found" }, 404);

    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: and(
        eq(schema.ebookChapters.id, body.data.chapterId),
        eq(schema.ebookChapters.contentId, ebook.id),
        eq(schema.ebookChapters.status, "published"),
      ),
      columns: { id: true },
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);

    const now = new Date();
    await c.var.db
      .insert(schema.readingProgress)
      .values({
        userId: user.id,
        contentId: ebook.id,
        chapterId: chapter.id,
        position: body.data.position,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [schema.readingProgress.userId, schema.readingProgress.contentId],
        set: { chapterId: chapter.id, position: body.data.position, updatedAt: now },
      });
    return c.body(null, 204);
  })

  .get("/:slug/bookmarks", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const ebook = await findPublishedEbook(c.var.db, c.req.param("slug"));
    if (!ebook) return c.json({ error: "not_found" }, 404);
    const rows = await c.var.db
      .select({
        id: schema.bookmarks.id,
        chapterId: schema.bookmarks.chapterId,
        note: schema.bookmarks.note,
        createdAt: schema.bookmarks.createdAt,
      })
      .from(schema.bookmarks)
      .where(and(eq(schema.bookmarks.userId, user.id), eq(schema.bookmarks.contentId, ebook.id)))
      .orderBy(desc(schema.bookmarks.createdAt));
    return c.json({
      bookmarks: rows.map((b) => ({ ...b, createdAt: b.createdAt.toISOString() })),
    });
  })

  .post("/:slug/bookmarks", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = bookmarkBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    const ebook = await findPublishedEbook(c.var.db, c.req.param("slug"));
    if (!ebook) return c.json({ error: "not_found" }, 404);
    const chapter = await c.var.db.query.ebookChapters.findFirst({
      where: and(
        eq(schema.ebookChapters.id, body.data.chapterId),
        eq(schema.ebookChapters.contentId, ebook.id),
        eq(schema.ebookChapters.status, "published"),
      ),
      columns: { id: true },
    });
    if (!chapter) return c.json({ error: "not_found" }, 404);
    const [{ n } = { n: 0 }] = await c.var.db
      .select({ n: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(eq(schema.bookmarks.userId, user.id), eq(schema.bookmarks.contentId, ebook.id)));
    if (n >= MAX_BOOKMARKS_PER_EBOOK) return c.json({ error: "bookmark_limit" }, 409);
    const id = crypto.randomUUID();
    await c.var.db.insert(schema.bookmarks).values({
      id,
      userId: user.id,
      contentId: ebook.id,
      chapterId: chapter.id,
      note: body.data.note ?? null,
    });
    return c.json({ id }, 201);
  })

  .delete("/:slug/bookmarks/:id", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const deleted = await c.var.db
      .delete(schema.bookmarks)
      .where(and(eq(schema.bookmarks.id, c.req.param("id")), eq(schema.bookmarks.userId, user.id)))
      .returning({ id: schema.bookmarks.id });
    if (deleted.length === 0) return c.json({ error: "not_found" }, 404);
    return c.body(null, 204);
  });
