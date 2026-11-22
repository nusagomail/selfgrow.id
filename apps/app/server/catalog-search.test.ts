/**
 * Pencarian katalog (D52): hanya konten terbit, setiap kata harus cocok (judul, ringkasan, atau
 * kategori/topik), kueri divalidasi, dan karakter pola LIKE tidak bisa dipakai untuk mengakali.
 */
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function ebook(admin: { token: string }, title: string, summary: string, publish = true) {
  const slug = `cari-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title, slug, summary }),
    })
  ).json()) as { id: string };
  if (publish) {
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
  }
  return slug;
}

type Hit = { slug: string; title: string; topic: unknown; comingSoon: boolean };
const search = async (q: string, type?: string) => {
  const r = await call(
    `/api/v1/catalog/search?q=${encodeURIComponent(q)}${type ? `&type=${type}` : ""}`,
  );
  return {
    status: r.status,
    items: r.status === 200 ? ((await r.json()) as { items: Hit[] }).items : [],
  };
};

describe("pencarian katalog", () => {
  it("menemukan konten terbit lewat judul dan ringkasan, semua kata harus cocok", async () => {
    const admin = await createUser({ role: "admin" });
    const tag = `zq${crypto.randomUUID().slice(0, 6).replace(/-/g, "")}`;
    const a = await ebook(admin, `Mengatur Gaji ${tag}`, "Arus kas bulanan");
    const b = await ebook(admin, `Catatan ${tag}`, "Tentang gaji pertama");
    const draft = await ebook(admin, `Draf ${tag}`, "gaji rahasia", false);

    const r = await search(`gaji ${tag}`);
    expect(r.status).toBe(200);
    const slugs = r.items.map((i) => i.slug);
    expect(slugs).toContain(a);
    expect(slugs).toContain(b);
    expect(slugs).not.toContain(draft);
    // Cocok di judul diurutkan lebih dulu daripada cocok di ringkasan.
    expect(slugs.indexOf(a)).toBeLessThan(slugs.indexOf(b));
    expect(r.items[0]).toHaveProperty("topic");

    expect((await search(`${tag} tidakada`)).items).toHaveLength(0);
    expect((await search(`gaji ${tag}`, "tool")).items).toHaveLength(0);
  });

  it("kueri divalidasi dan pola LIKE tidak bisa disisipkan", async () => {
    expect((await search("a")).status).toBe(400);
    expect((await search("x".repeat(61))).status).toBe(400);
    expect((await search("gaji", "lain")).status).toBe(400);
    // "%" dan "_" dibuang dari token; kueri ini tidak berubah menjadi "cocok semua".
    const all = await search("%_ %");
    expect(all.status).toBe(200);
    expect(all.items).toHaveLength(0);
  });
});
