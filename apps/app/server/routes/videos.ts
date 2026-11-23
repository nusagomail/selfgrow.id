import { and, eq, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { loadSession } from "../middleware/context";
import { FREE_TIER } from "../middleware/guards";
import { getAccessStatus } from "../services/entitlements";
import { getFreeze, rateLimit } from "../services/protection";

/**
 * Berkas video: `GET /api/v1/videos/:assetId`, berawalan `content-videos/{contentId}/`, bertipe
 * video, milik konten TERBIT. Dua jenis:
 * - video pengantar ebook (D41, `intro_video_asset_id`): publik seperti sampul;
 * - Video Edukasi (D54, `video_definitions.video_asset_id`): publik bila kontennya gratis, selain
 *   itu WAJIB login + langganan aktif (seperti requireActiveSubscription) dan tidak di-cache publik.
 * Mendukung permintaan rentang (Range) supaya pemutar bisa memutar sebagian dan menggeser posisi
 * tanpa mengunduh seluruh berkas.
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
    columns: { type: true, tier: true, introVideoAssetId: true },
    where: and(eq(schema.contentItems.id, contentId), eq(schema.contentItems.status, "published")),
  });
  if (!content) return c.json({ error: "not_found" }, 404);
  let cacheControl = "public, max-age=31536000, immutable";
  if (content.introVideoAssetId !== id) {
    if (content.type !== "video") return c.json({ error: "not_found" }, 404);
    const def = await c.var.db.query.videoDefinitions.findFirst({
      columns: { videoAssetId: true },
      where: eq(schema.videoDefinitions.contentId, contentId),
    });
    if (def?.videoAssetId !== id) return c.json({ error: "not_found" }, 404);
    if (content.tier !== FREE_TIER) {
      await loadSession(c);
      const user = c.var.user;
      if (!user) return c.json({ error: "unauthorized" }, 401);
      const [status, frozen] = await Promise.all([
        getAccessStatus(c.env.KV, c.var.db, user),
        getFreeze(c.env.KV, user.id),
      ]);
      if (frozen) return c.json({ error: "account_frozen", until: frozen.until }, 423);
      if (!status.active) return c.json({ error: "subscription_required" }, 403);
      cacheControl = "private, no-store";
    }
  }

  return serveVideoObject(
    c.env.CONTENT,
    asset.r2Key,
    asset.mime,
    cacheControl,
    c.req.header("range"),
  );
});

/** Kirim objek video dari R2, utuh (200) atau sebagian sesuai header Range (206/416). */
export async function serveVideoObject(
  bucket: R2Bucket,
  key: string,
  mime: string,
  cacheControl: string,
  rangeHeader: string | undefined,
): Promise<Response> {
  const notFound = () => Response.json({ error: "not_found" }, { status: 404 });
  const head = await bucket.head(key);
  if (!head) return notFound();
  const size = head.size;
  const headers = new Headers({
    "Content-Type": mime,
    "Accept-Ranges": "bytes",
    "Cache-Control": cacheControl,
    "X-Content-Type-Options": "nosniff",
  });
  if (rangeHeader) {
    const range = parseRange(rangeHeader, size);
    if (!range) {
      headers.set("Content-Range", `bytes */${size}`);
      headers.set("Cache-Control", "no-store");
      return new Response(null, { status: 416, headers });
    }
    const obj = await bucket.get(key, { range });
    if (!obj) return notFound();
    headers.set(
      "Content-Range",
      `bytes ${range.offset}-${range.offset + range.length - 1}/${size}`,
    );
    headers.set("Content-Length", String(range.length));
    return new Response(obj.body, { status: 206, headers });
  }
  const obj = await bucket.get(key);
  if (!obj) return notFound();
  headers.set("Content-Length", String(size));
  return new Response(obj.body, { status: 200, headers });
}
