/**
 * Sampul konten: hanya admin yang mengunggah, hanya gambar raster (dicek dari isi file),
 * dan sampul hanya dilayani publik untuk konten yang sudah terbit.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});
// PNG minimal (tanda tangan + sebagian header) cukup untuk pemeriksaan jenis file.
const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13]);

async function setup() {
  const admin = await createUser({ role: "admin" });
  const slug = `cov-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Bersampul", slug }),
    })
  ).json()) as { id: string };
  return { admin, id, slug };
}

const upload = (id: string, token: string, body: BodyInit, type = "image/png") =>
  call(`/api/v1/studio/content/${id}/cover`, {
    method: "PUT",
    token,
    headers: { "content-type": type },
    body,
  });

describe("sampul", () => {
  it("admin mengunggah; publik hanya bisa melihat setelah terbit", async () => {
    const { admin, id, slug } = await setup();
    const r = await upload(id, admin.token, PNG);
    expect(r.status).toBe(200);
    const { coverUrl } = (await r.json()) as { coverUrl: string };
    expect(coverUrl).toMatch(/^\/api\/v1\/catalog\/covers\/[0-9a-f-]{36}$/);

    // Masih draft: tidak dilayani publik.
    expect((await call(coverUrl)).status).toBe(404);

    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    const img = await call(coverUrl);
    expect(img.status).toBe(200);
    expect(img.headers.get("content-type")).toBe("image/png");
    expect(img.headers.get("cache-control")).toContain("immutable");
    expect(new Uint8Array(await img.arrayBuffer())).toEqual(PNG);

    const list = (await (await call("/api/v1/catalog/items")).json()) as {
      items: { slug: string; coverUrl: string | null }[];
    };
    expect(list.items.find((i) => i.slug === slug)?.coverUrl).toBe(coverUrl);

    // Hapus sampul: tidak lagi dirujuk & tidak dilayani.
    expect(
      (await call(`/api/v1/studio/content/${id}/cover`, { method: "DELETE", token: admin.token }))
        .status,
    ).toBe(204);
    expect((await call(coverUrl)).status).toBe(404);
  });

  it("mengganti sampul menghapus sampul lama dari penyimpanan", async () => {
    const { admin, id } = await setup();
    const first = (await (await upload(id, admin.token, PNG)).json()) as { coverUrl: string };
    const oldId = first.coverUrl.split("/").pop();
    expect((await upload(id, admin.token, PNG)).status).toBe(200);
    const row = await env.DB.prepare("SELECT id FROM assets WHERE id = ?").bind(oldId).first();
    expect(row).toBeNull();
    const objects = await env.CONTENT.list({ prefix: `covers/${id}/` });
    expect(objects.objects).toHaveLength(1);
  });

  it("menolak file bukan gambar (walau mengaku image/png) dan file terlalu besar", async () => {
    const { admin, id } = await setup();
    const svg = new TextEncoder().encode(
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
    );
    expect((await upload(id, admin.token, svg)).status).toBe(415);
    const big = new Uint8Array(1_600_000);
    big.set(PNG);
    expect((await upload(id, admin.token, big)).status).toBe(413);
  });

  it("member tidak bisa mengunggah sampul", async () => {
    const { id } = await setup();
    const m = await createUser();
    expect((await upload(id, m.token, PNG)).status).toBe(403);
  });
});
