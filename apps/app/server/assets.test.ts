/**
 * Gambar isi konten (D38): dilayani publik hanya bila asetnya gambar isi konten
 * (`content-images/{contentId}/...`) dan kontennya sudah terbit.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call } from "../test/helpers";
import { contentImageKey } from "./routes/assets";

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13]);

async function content(status: "draft" | "published") {
  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO content_items (id, type, slug, title, tier, status, published_at, created_at, updated_at) VALUES (?, 'ebook', ?, 'Bergambar', 'all', ?, ?, ?, ?)",
  )
    .bind(id, `img-${id.slice(0, 8)}`, status, status === "published" ? now : null, now, now)
    .run();
  return id;
}

async function asset(key: string, mime = "image/png") {
  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO assets (id, r2_key, mime, size, created_at) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(id, key, mime, PNG.length, Date.now())
    .run();
  await env.CONTENT.put(key, PNG);
  return id;
}

describe("gambar isi konten", () => {
  it("dilayani untuk konten terbit, dengan cache panjang", async () => {
    const cid = await content("published");
    const aid = crypto.randomUUID();
    const id = await asset(contentImageKey(cid, aid, "png"));
    const r = await call(`/api/v1/assets/${id}`);
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toBe("image/png");
    expect(r.headers.get("cache-control")).toContain("immutable");
    expect(r.headers.get("x-content-type-options")).toBe("nosniff");
    expect(new Uint8Array(await r.arrayBuffer())).toEqual(PNG);
  });

  it("konten draft tidak dilayani", async () => {
    const cid = await content("draft");
    const id = await asset(contentImageKey(cid, crypto.randomUUID(), "png"));
    expect((await call(`/api/v1/assets/${id}`)).status).toBe(404);
  });

  it("aset di luar gambar isi (mis. isi bab, sampul) tidak bisa diambil lewat jalur ini", async () => {
    const cid = await content("published");
    const chapter = await asset(`ebooks/${cid}/published/${crypto.randomUUID()}.json`, "image/png");
    const cover = await asset(`covers/${cid}/${crypto.randomUUID()}.png`);
    expect((await call(`/api/v1/assets/${chapter}`)).status).toBe(404);
    expect((await call(`/api/v1/assets/${cover}`)).status).toBe(404);
  });

  it("jenis berkas selain gambar ditolak walau kuncinya benar", async () => {
    const cid = await content("published");
    const id = await asset(contentImageKey(cid, crypto.randomUUID(), "png"), "text/html");
    expect((await call(`/api/v1/assets/${id}`)).status).toBe(404);
  });

  it("id tidak valid dan aset tak dikenal → 404", async () => {
    expect((await call("/api/v1/assets/not-a-uuid")).status).toBe(404);
    expect((await call(`/api/v1/assets/${crypto.randomUUID()}`)).status).toBe(404);
  });
});
