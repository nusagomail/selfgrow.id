/**
 * Video pengantar ebook (D41): publik hanya bila tercatat sebagai video pengantar konten terbit,
 * dan mendukung permintaan rentang untuk pemutar video.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call } from "../test/helpers";
import { contentVideoKey, parseRange } from "./routes/videos";

const BYTES = new Uint8Array(Array.from({ length: 100 }, (_, i) => i));

async function setup(opts: { status?: "draft" | "published"; link?: boolean; mime?: string } = {}) {
  const contentId = crypto.randomUUID();
  const assetId = crypto.randomUUID();
  const now = Date.now();
  const status = opts.status ?? "published";
  await env.DB.prepare(
    "INSERT INTO content_items (id, type, slug, title, tier, status, intro_video_asset_id, published_at, created_at, updated_at) VALUES (?, 'ebook', ?, 'Video', 'all', ?, ?, ?, ?, ?)",
  )
    .bind(
      contentId,
      `vid-${contentId.slice(0, 8)}`,
      status,
      opts.link === false ? null : assetId,
      status === "published" ? now : null,
      now,
      now,
    )
    .run();
  const key = contentVideoKey(contentId, assetId, "mp4");
  await env.DB.prepare(
    "INSERT INTO assets (id, r2_key, mime, size, created_at) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(assetId, key, opts.mime ?? "video/mp4", BYTES.length, now)
    .run();
  await env.CONTENT.put(key, BYTES);
  return { contentId, assetId, url: `/api/v1/videos/${assetId}` };
}

describe("video pengantar", () => {
  it("konten terbit: berkas utuh dengan Accept-Ranges dan cache panjang", async () => {
    const { url } = await setup();
    const r = await call(url);
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toBe("video/mp4");
    expect(r.headers.get("accept-ranges")).toBe("bytes");
    expect(r.headers.get("cache-control")).toContain("immutable");
    expect(r.headers.get("x-content-type-options")).toBe("nosniff");
    expect(new Uint8Array(await r.arrayBuffer())).toEqual(BYTES);
  });

  it("permintaan rentang dijawab 206 dengan potongan yang tepat", async () => {
    const { url } = await setup();
    const r = await call(url, { headers: { range: "bytes=10-19" } });
    expect(r.status).toBe(206);
    expect(r.headers.get("content-range")).toBe("bytes 10-19/100");
    expect(new Uint8Array(await r.arrayBuffer())).toEqual(BYTES.slice(10, 20));
    const tail = await call(url, { headers: { range: "bytes=-5" } });
    expect(new Uint8Array(await tail.arrayBuffer())).toEqual(BYTES.slice(95));
    expect((await call(url, { headers: { range: "bytes=500-" } })).status).toBe(416);
  });

  it("draft, video yang tidak ditautkan ke konten, dan jenis non-video → 404", async () => {
    expect((await call((await setup({ status: "draft" })).url)).status).toBe(404);
    expect((await call((await setup({ link: false })).url)).status).toBe(404);
    expect((await call((await setup({ mime: "text/html" })).url)).status).toBe(404);
    expect((await call("/api/v1/videos/bukan-uuid")).status).toBe(404);
  });

  it("aset di luar content-videos/ tidak bisa diambil walau ditautkan", async () => {
    const { contentId } = await setup();
    const assetId = crypto.randomUUID();
    const key = `ebooks/${contentId}/published/${crypto.randomUUID()}.json`;
    await env.DB.prepare(
      "INSERT INTO assets (id, r2_key, mime, size, created_at) VALUES (?, ?, 'video/mp4', 1, ?)",
    )
      .bind(assetId, key, Date.now())
      .run();
    await env.DB.prepare("UPDATE content_items SET intro_video_asset_id = ? WHERE id = ?")
      .bind(assetId, contentId)
      .run();
    expect((await call(`/api/v1/videos/${assetId}`)).status).toBe(404);
  });

  it("detail katalog menyertakan alamat video & poster", async () => {
    const { contentId, assetId } = await setup();
    const posterId = crypto.randomUUID();
    await env.DB.prepare("UPDATE content_items SET intro_poster_asset_id = ? WHERE id = ?")
      .bind(posterId, contentId)
      .run();
    const slug = `vid-${contentId.slice(0, 8)}`;
    const detail = (await (await call(`/api/v1/catalog/content/ebook/${slug}`)).json()) as {
      introVideo: { url: string; posterUrl: string | null } | null;
    };
    expect(detail.introVideo).toEqual({
      url: `/api/v1/videos/${assetId}`,
      posterUrl: `/api/v1/assets/${posterId}`,
    });
  });
});

describe("parseRange", () => {
  it("rentang valid dan tidak valid", () => {
    expect(parseRange("bytes=0-9", 100)).toEqual({ offset: 0, length: 10 });
    expect(parseRange("bytes=90-", 100)).toEqual({ offset: 90, length: 10 });
    expect(parseRange("bytes=-10", 100)).toEqual({ offset: 90, length: 10 });
    expect(parseRange("bytes=50-500", 100)).toEqual({ offset: 50, length: 50 });
    expect(parseRange("bytes=100-", 100)).toBeNull();
    expect(parseRange("bytes=9-1", 100)).toBeNull();
    expect(parseRange("bytes=0-1,5-6", 100)).toBeNull();
    expect(parseRange("items=0-1", 100)).toBeNull();
    expect(parseRange("bytes=-", 100)).toBeNull();
  });
});
