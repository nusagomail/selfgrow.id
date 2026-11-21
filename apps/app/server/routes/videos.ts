import { and, eq, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { rateLimit } from "../services/protection";

/**
 * Video pengantar ebook (D41): `GET /api/v1/videos/:assetId`, publik seperti sampul. Hanya video
 * yang tercatat sebagai `intro_video_asset_id` milik konten TERBIT, berawalan
 * `content-videos/{contentId}/`, bertipe video. Mendukung permintaan rentang (Range) supaya
 * pemutar bisa memutar sebagian dan menggeser posisi tanpa mengunduh seluruh berkas.
 */
export const CONTENT_VIDEO_PREFIX = "content-videos/";
export const contentVideoKey = (contentId: string, assetId: string, ext: "mp4" | "webm") =>
  `${CONTENT_VIDEO_PREFIX}${contentId}/${assetId}.${ext}`;

/** Alamat publik video & poster pengantar (poster dilayani lewat /api/v1/assets, D38). */
export const introMedia = (item: {
  introVideoAssetId: string | null;
  introPosterAssetId: string | null;
}) =>
  item.introVideoAssetId
    ? {
        url: `/api/v1/videos/${item.introVideoAssetId}`,
        posterUrl: item.introPosterAssetId ? `/api/v1/assets/${item.introPosterAssetId}` : null,
      }
    : null;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const VIDEO_MIME = new Set(["video/mp4", "video/webm"]);

/** Satu rentang `bytes=a-b` / `bytes=a-` / `bytes=-n`. Selain itu dianggap tidak valid. */
export function parseRange(
  header: string,
  size: number,
): { offset: number; length: number } | null {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || size <= 0) return null;
  const [, a, b] = m;
  if (a === "" && b === "") return null;
  let start: number;
  let end: number;
  if (a === "") {
    const n = Number(b);
    if (n === 0) return null;
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(a);
    end = b === "" ? size - 1 : Math.min(Number(b), size - 1);
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
    return null;
  }
  return { offset: start, length: end - start + 1 };
}

export const videos = new Hono<AppEnv>().use(rateLimit("media")).get("/:assetId", async (c) => {
  const id = c.req.param("assetId");
  if (!UUID.test(id)) return c.json({ error: "not_found" }, 404);
  const asset = await c.var.db.query.assets.findFirst({ where: eq(schema.assets.id, id) });
  if (!asset?.r2Key.startsWith(CONTENT_VIDEO_PREFIX) || !VIDEO_MIME.has(asset.mime)) {
    return c.json({ error: "not_found" }, 404);
  }
  const contentId = asset.r2Key.slice(CONTENT_VIDEO_PREFIX.length).split("/")[0] ?? "";
  const content = await c.var.db.query.contentItems.findFirst({
    columns: { id: true },
    where: and(
      eq(schema.contentItems.id, contentId),
      eq(schema.contentItems.status, "published"),
      eq(schema.contentItems.introVideoAssetId, id),
    ),
  });
  if (!content) return c.json({ error: "not_found" }, 404);

  const head = await c.env.CONTENT.head(asset.r2Key);
  if (!head) return c.json({ error: "not_found" }, 404);
  const size = head.size;
  const headers = new Headers({
    "Content-Type": asset.mime,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  });
  const rangeHeader = c.req.header("range");
  if (rangeHeader) {
    const range = parseRange(rangeHeader, size);
    if (!range) {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    const obj = await c.env.CONTENT.get(asset.r2Key, { range });
    if (!obj) return c.json({ error: "not_found" }, 404);
    headers.set(
      "Content-Range",
      `bytes ${range.offset}-${range.offset + range.length - 1}/${size}`,
    );
    headers.set("Content-Length", String(range.length));
    return new Response(obj.body, { status: 206, headers });
  }
  const obj = await c.env.CONTENT.get(asset.r2Key);
  if (!obj) return c.json({ error: "not_found" }, 404);
  headers.set("Content-Length", String(size));
  return new Response(obj.body, { status: 200, headers });
});
