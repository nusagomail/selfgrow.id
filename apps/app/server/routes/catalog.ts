import { and, asc, desc, eq, inArray, schema, sql } from "@selfgrow/db";
import { type ContentType, contentTypeSchema } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { FREE_TIER } from "../middleware/guards";
import { ebookKeys, readDoc } from "../services/ebook-storage";
import { inChunks, type PublishedProgram, programKeys } from "../services/programs";
import { rateLimit } from "../services/protection";
import { readJson } from "../services/template-storage";

/**
 * Katalog publik untuk etalase `site` (BLUEPRINT bagian 5 & 10): kategori, topik, dan konten
 * terbit (judul + ringkasan saja). Tanpa login, tanpa isi berbayar, boleh di-cache di edge.
 */
const PUBLIC_CACHE = "public, max-age=60";
/** Cache API (cache edge per lokasi). Respons Worker sendiri tidak disimpan CDN otomatis. */
const EDGE_TTL_SECONDS = 60;

const MAX_ITEMS = 200;

type CategoryRow = {
  id: string;
  parentId: string | null;
  slug: string;
  name: string;
  description: string | null;
  hook: string | null;
};

async function allCategories(db: AppEnv["Variables"]["db"]): Promise<CategoryRow[]> {
  return db
    .select({
      id: schema.categories.id,
      parentId: schema.categories.parentId,
      slug: schema.categories.slug,
      name: schema.categories.name,
      description: schema.categories.description,
      hook: schema.categories.hook,
    })
    .from(schema.categories)
    .orderBy(asc(schema.categories.order), asc(schema.categories.name));
}

/** Jumlah konten terbit per topik. */
async function publishedCounts(db: AppEnv["Variables"]["db"]) {
  const rows = await db
    .select({ categoryId: schema.contentItems.categoryId, n: sql<number>`count(*)` })
    .from(schema.contentItems)
    .where(eq(schema.contentItems.status, "published"))
    .groupBy(schema.contentItems.categoryId);
  return new Map(rows.map((r) => [r.categoryId, r.n]));
}

const toCategory = (r: CategoryRow) => ({
  slug: r.slug,
  name: r.name,
  description: r.description,
  hook: r.hook,
});

type Access = "free" | "preview" | "premium";

/**
 * Label akses publik (D35): `free` = ditandai gratis di Studio, `preview` = ebook dengan bab
 * gratis, `premium` = khusus pelanggan.
 */
async function accessLabels(
  db: AppEnv["Variables"]["db"],
  items: { id: string; type: string; tier: string }[],
): Promise<Map<string, Access>> {
  const ebookIds = items.filter((i) => i.type === "ebook" && i.tier !== FREE_TIER).map((i) => i.id);
  const withFree = await inChunks(ebookIds, (chunk) =>
    db
      .selectDistinct({ contentId: schema.ebookChapters.contentId })
      .from(schema.ebookChapters)
      .where(
        and(
          inArray(schema.ebookChapters.contentId, chunk),
          eq(schema.ebookChapters.isFreePreview, true),
          eq(schema.ebookChapters.status, "published"),
        ),
      ),
  );
  const preview = new Set(withFree.map((r) => r.contentId));
  return new Map(
    items.map((i) => [
      i.id,
      i.tier === FREE_TIER ? "free" : preview.has(i.id) ? "preview" : "premium",
    ]),
  );
}

async function findPublished(db: AppEnv["Variables"]["db"], type: ContentType, slug: string) {
  return db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, type),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
  });
}

/** Bab terbit sebuah ebook, urut. Hanya judul & penanda gratis (tanpa isi). */
async function publicChapters(db: AppEnv["Variables"]["db"], contentId: string) {
  return db
    .select({
      id: schema.ebookChapters.id,
      title: schema.ebookChapters.title,
      free: schema.ebookChapters.isFreePreview,
    })
    .from(schema.ebookChapters)
    .where(
      and(
        eq(schema.ebookChapters.contentId, contentId),
        eq(schema.ebookChapters.status, "published"),
      ),
    )
    .orderBy(asc(schema.ebookChapters.order));
}

export const catalog = new Hono<AppEnv>()
  .use(rateLimit("catalog"))
  .use(async (c, next) => {
    // Kunci cache hanya URL (tanpa cookie/header), karena isinya sama untuk semua orang.
    const useCache = c.env.ENVIRONMENT !== "test" && typeof caches !== "undefined";
    const key = new Request(c.req.url, { method: "GET" });
    if (useCache) {
      const hit = await caches.default.match(key);
      // Salinan: respons dari cache tidak bisa diubah, sedangkan middleware lain menambah header.
      if (hit) return new Response(hit.body, hit);
    }
    await next();
    if (c.res.status !== 200) return;
    c.header("Cache-Control", PUBLIC_CACHE);
    if (useCache) {
      const copy = c.res.clone();
      const headers = new Headers(copy.headers);
      headers.set("Cache-Control", `public, max-age=${EDGE_TTL_SECONDS}`);
      c.executionCtx.waitUntil(
        caches.default.put(key, new Response(copy.body, { status: 200, headers })),
      );
    }
  })

  /** Semua kategori beserta topik dan jumlah konten terbitnya (untuk menu & beranda). */
  .get("/categories", async (c) => {
    const [rows, counts] = await Promise.all([allCategories(c.var.db), publishedCounts(c.var.db)]);
    const roots = rows.filter((r) => !r.parentId);
    return c.json({
      categories: roots.map((root) => {
        const topics = rows
          .filter((t) => t.parentId === root.id)
          .map((t) => ({ slug: t.slug, name: t.name, count: counts.get(t.id) ?? 0 }));
        return {
          ...toCategory(root),
          count: topics.reduce((n, t) => n + t.count, 0),
          topics,
        };
      }),
    });
  })

  /** Satu kategori: topik dan konten terbitnya. `?topik=slug` menyaring satu topik. */
  .get("/categories/:slug", async (c) => {
    const rows = await allCategories(c.var.db);
    const root = rows.find((r) => r.slug === c.req.param("slug") && !r.parentId);
    if (!root) return c.json({ error: "not_found" }, 404);
    const topics = rows.filter((t) => t.parentId === root.id);
    const topicSlug = c.req.query("topik");
    const selected = topicSlug ? topics.find((t) => t.slug === topicSlug) : undefined;
    if (topicSlug && !selected) return c.json({ error: "not_found" }, 404);
    const ids = selected ? [selected.id] : topics.map((t) => t.id);

    const [chunks, counts] = await Promise.all([
      inChunks(ids, (chunk) =>
        c.var.db
          .select({
            type: schema.contentItems.type,
            slug: schema.contentItems.slug,
            title: schema.contentItems.title,
            summary: schema.contentItems.summary,
            id: schema.contentItems.id,
            tier: schema.contentItems.tier,
            categoryId: schema.contentItems.categoryId,
            publishedAt: schema.contentItems.publishedAt,
          })
          .from(schema.contentItems)
          .where(
            and(
              eq(schema.contentItems.status, "published"),
              inArray(schema.contentItems.categoryId, chunk),
            ),
          )
          .orderBy(desc(schema.contentItems.publishedAt))
          .limit(MAX_ITEMS),
      ),
      publishedCounts(c.var.db),
    ]);
    // Urutkan setelah semua potongan digabung, lalu potong (review keamanan PR #14).
    const items = chunks
      .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
      .slice(0, MAX_ITEMS);
    const topicById = new Map(topics.map((t) => [t.id, t.slug]));
    const access = await accessLabels(c.var.db, items);
    return c.json({
      category: toCategory(root),
      topic: selected ? toCategory(selected) : null,
      topics: topics.map((t) => ({
        slug: t.slug,
        name: t.name,
        count: counts.get(t.id) ?? 0,
      })),
      items: items.map((i) => ({
        type: i.type,
        slug: i.slug,
        title: i.title,
        summary: i.summary,
        topic: i.categoryId ? (topicById.get(i.categoryId) ?? null) : null,
        access: access.get(i.id) ?? "premium",
        publishedAt: i.publishedAt?.toISOString() ?? null,
      })),
    });
  })

  /** Semua konten terbit untuk beranda etalase (seperti daftar video di YouTube). */
  .get("/items", async (c) => {
    const [rows, cats] = await Promise.all([
      c.var.db
        .select({
          id: schema.contentItems.id,
          type: schema.contentItems.type,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
          summary: schema.contentItems.summary,
          tier: schema.contentItems.tier,
          categoryId: schema.contentItems.categoryId,
          publishedAt: schema.contentItems.publishedAt,
        })
        .from(schema.contentItems)
        .where(eq(schema.contentItems.status, "published"))
        .orderBy(desc(schema.contentItems.publishedAt))
        .limit(MAX_ITEMS),
      allCategories(c.var.db),
    ]);
    const byId = new Map(cats.map((r) => [r.id, r]));
    const rootOf = (id: string | null) => {
      const cat = id ? byId.get(id) : undefined;
      return cat?.parentId ? byId.get(cat.parentId) : cat;
    };
    const access = await accessLabels(c.var.db, rows);
    return c.json({
      items: rows.map((i) => {
        const root = rootOf(i.categoryId);
        return {
          type: i.type,
          slug: i.slug,
          title: i.title,
          summary: i.summary,
          access: access.get(i.id) ?? "premium",
          category: root ? { slug: root.slug, name: root.name } : null,
          publishedAt: i.publishedAt?.toISOString() ?? null,
        };
      }),
    });
  })

  /** Detail publik satu konten: ringkasan, kategori, daftar isi/hari. Tanpa isi berbayar. */
  .get("/content/:type/:slug", async (c) => {
    const type = contentTypeSchema.safeParse(c.req.param("type"));
    if (!type.success) return c.json({ error: "not_found" }, 404);
    const item = await findPublished(c.var.db, type.data, c.req.param("slug"));
    if (!item) return c.json({ error: "not_found" }, 404);
    const cats = await allCategories(c.var.db);
    const topic = cats.find((x) => x.id === item.categoryId && x.parentId);
    const category = topic ? cats.find((x) => x.id === topic.parentId) : undefined;
    const access = (await accessLabels(c.var.db, [item])).get(item.id) ?? "premium";

    let ebook: { chapters: { id: string; title: string; free: boolean }[] } | null = null;
    if (item.type === "ebook") ebook = { chapters: await publicChapters(c.var.db, item.id) };
    let program: { durationDays: number; days: { day: number; title: string }[] } | null = null;
    if (item.type === "program") {
      const published = await readJson<PublishedProgram>(
        c.env.CONTENT,
        programKeys.published(item.id),
      );
      if (published) {
        program = {
          durationDays: published.durationDays,
          // Judul hari saja; isi langkah tetap hanya untuk peserta (D27).
          days: published.steps.map((d) => ({ day: d.day, title: d.title })),
        };
      }
    }
    return c.json({
      type: item.type,
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      access,
      category: category ? { slug: category.slug, name: category.name } : null,
      topic: topic ? { slug: topic.slug, name: topic.name } : null,
      publishedAt: item.publishedAt?.toISOString() ?? null,
      updatedAt: item.updatedAt.toISOString(),
      ebook,
      program,
    });
  })

  /**
   * Bab pertama yang ditandai gratis, bisa dibaca tanpa login (D35, untuk Google & rasa
   * penasaran). Bab gratis berikutnya dan seluruh bab berbayar tetap lewat reader yang butuh login.
   */
  .get("/ebooks/:slug/preview", async (c) => {
    const item = await findPublished(c.var.db, "ebook", c.req.param("slug"));
    if (!item) return c.json({ error: "not_found" }, 404);
    const first = (await publicChapters(c.var.db, item.id)).find((ch) => ch.free);
    if (!first) return c.json({ error: "not_found" }, 404);
    const doc = await readDoc(c.env.CONTENT, ebookKeys.published(item.id, first.id));
    if (!doc) return c.json({ error: "not_found" }, 404);
    return c.json({ chapter: { id: first.id, title: first.title }, doc });
  });
