import { and, eq, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { edgeCache } from "../services/edge-cache";

/**
 * Gambar di dalam isi konten (ilustrasi & infografis ebook, D38). Alamatnya `/api/v1/assets/{id}`
 * sesuai skema dokumen. Hanya aset berawalan `content-images/{contentId}/` milik konten TERBIT
 * yang dilayani, tanpa login (seperti sampul) supaya bab gratis di etalase ikut bergambar.
 * Teks bab tetap hanya lewat reader; gambar memakai id acak yang tidak bisa ditebak.
 */
export const CONTENT_IMAGE_PREFIX = "content-images/";
export const contentImageKey = (contentId: string, assetId: string, ext: "png" | "jpg" | "webp") =>
  `${CONTENT_IMAGE_PREFIX}${contentId}/${assetId}.${ext}`;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const IMAGE_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

// Tanpa rate limit (D38): satu bab bisa memuat banyak gambar, id-nya acak, dan respons
// disajikan dari cache edge setelah permintaan pertama.
export const assets = new Hono<AppEnv>()
  .use(edgeCache(60, "public, max-age=60"))
  .get("/:assetId", async (c) => {
    const id = c.req.param("assetId");
    if (!UUID.test(id)) return c.json({ error: "not_found" }, 404);
    const asset = await c.var.db.query.assets.findFirst({ where: eq(schema.assets.id, id) });
    if (!asset?.r2Key.startsWith(CONTENT_IMAGE_PREFIX) || !IMAGE_MIME.has(asset.mime)) {
      return c.json({ error: "not_found" }, 404);
    }
    const contentId = asset.r2Key.slice(CONTENT_IMAGE_PREFIX.length).split("/")[0] ?? "";
    const content = await c.var.db.query.contentItems.findFirst({
      columns: { id: true },
      where: and(
        eq(schema.contentItems.id, contentId),
        eq(schema.contentItems.status, "published"),
      ),
    });
    if (!content) return c.json({ error: "not_found" }, 404);
    const obj = await c.env.CONTENT.get(asset.r2Key);
    if (!obj) return c.json({ error: "not_found" }, 404);
    return new Response(obj.body, {
      headers: {
        "Content-Type": asset.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  });
