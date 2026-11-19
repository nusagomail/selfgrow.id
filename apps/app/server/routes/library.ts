import { and, desc, eq, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireActiveSubscription } from "../middleware/guards";

/** Perpustakaan pelanggan: semua konten terbit. */
export const library = new Hono<AppEnv>().use(requireActiveSubscription).get("/", async (c) => {
  const rows = await c.var.db
    .select({
      id: schema.contentItems.id,
      type: schema.contentItems.type,
      slug: schema.contentItems.slug,
      title: schema.contentItems.title,
      summary: schema.contentItems.summary,
      publishedAt: schema.contentItems.publishedAt,
    })
    .from(schema.contentItems)
    .where(and(eq(schema.contentItems.status, "published")))
    .orderBy(desc(schema.contentItems.publishedAt))
    .limit(500);
  return c.json({
    items: rows.map((r) => ({ ...r, publishedAt: r.publishedAt?.toISOString() ?? null })),
  });
});
