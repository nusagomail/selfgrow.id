import { and, asc, desc, eq, inArray, schema, sql } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { inChunks } from "../services/programs";
import { rateLimit } from "../services/protection";

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

export const catalog = new Hono<AppEnv>()
  .use(rateLimit("catalog"))
  .use(async (c, next) => {
    // Kunci cache hanya URL (tanpa cookie/header), karena isinya sama untuk semua orang.
    const useCache = c.env.ENVIRONMENT !== "test" && typeof caches !== "undefined";
    const key = new Request(c.req.url, { method: "GET" });
    if (useCache) {
      const hit = await caches.default.match(key);
      if (hit) return hit;
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
        publishedAt: i.publishedAt?.toISOString() ?? null,
      })),
    });
  });
