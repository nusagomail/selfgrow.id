/**
 * Taksonomi & katalog publik (D30): 10 kategori + topik dari migrasi, konten hanya bisa
 * ditempatkan di topik, katalog publik hanya menampilkan konten terbit tanpa isi berbayar.
 */
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

type Cat = {
  slug: string;
  name: string;
  hook: string | null;
  count: number;
  topics: { slug: string; count: number }[];
};

async function newEbook(admin: { token: string }, title: string) {
  const slug = `cat-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title, slug, summary: "Ringkasan publik" }),
    })
  ).json()) as { id: string };
  return { id, slug };
}

describe("katalog publik", () => {
  it("10 kategori dengan topik tersedia tanpa login dan boleh di-cache", async () => {
    const r = await call("/api/v1/catalog/categories");
    expect(r.status).toBe(200);
    expect(r.headers.get("cache-control")).toContain("public");
    const { categories } = (await r.json()) as { categories: Cat[] };
    expect(categories).toHaveLength(10);
    expect(categories[0]?.slug).toBe("keuangan-pribadi");
    expect(categories[0]?.hook).toBe("Gaji habis sebelum tanggal 25?");
    expect(categories.reduce((n, c) => n + c.topics.length, 0)).toBe(51);
  });

  it("kategori tak dikenal 404", async () => {
    expect((await call("/api/v1/catalog/categories/tidak-ada")).status).toBe(404);
    expect((await call("/api/v1/catalog/categories/keuangan-pribadi?topik=x")).status).toBe(404);
    // Topik bukan kategori induk.
    expect((await call("/api/v1/catalog/categories/investasi-pemula")).status).toBe(404);
  });

  it("konten di topik tampil di katalog hanya setelah terbit, tanpa isi", async () => {
    const admin = await createUser({ role: "admin" });
    const eb = await newEbook(admin, "Keluar dari Jerat Paylater");
    // Kategori induk ditolak, topik diterima.
    expect(
      (
        await call(`/api/v1/studio/content/${eb.id}`, {
          method: "PATCH",
          token: admin.token,
          ...json({ categoryId: "cat_keuangan-pribadi" }),
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await call(`/api/v1/studio/content/${eb.id}`, {
          method: "PATCH",
          token: admin.token,
          ...json({ categoryId: "top_utang-pinjol-paylater" }),
        })
      ).status,
    ).toBe(200);
    const cur = (await (
      await call(`/api/v1/studio/content/${eb.id}/category`, { token: admin.token })
    ).json()) as { categoryId: string };
    expect(cur.categoryId).toBe("top_utang-pinjol-paylater");

    const before = (await (await call("/api/v1/catalog/categories/keuangan-pribadi")).json()) as {
      items: { slug: string }[];
    };
    expect(before.items.some((i) => i.slug === eb.slug)).toBe(false);

    await call(`/api/v1/studio/content/${eb.id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    const after = (await (
      await call("/api/v1/catalog/categories/keuangan-pribadi?topik=utang-pinjol-paylater")
    ).json()) as { topic: { slug: string }; items: Record<string, unknown>[] };
    expect(after.topic.slug).toBe("utang-pinjol-paylater");
    const item = after.items.find((i) => i.slug === eb.slug);
    expect(item).toMatchObject({
      type: "ebook",
      title: "Keluar dari Jerat Paylater",
      summary: "Ringkasan publik",
      topic: "utang-pinjol-paylater",
    });
    expect(Object.keys(item ?? {}).sort()).toEqual(
      ["publishedAt", "slug", "summary", "title", "topic", "type"].sort(),
    );

    const list = (await (await call("/api/v1/catalog/categories")).json()) as { categories: Cat[] };
    expect(list.categories[0]?.count).toBeGreaterThanOrEqual(1);
  });

  it("member tidak bisa membaca pohon kategori Studio atau mengubah kategori konten", async () => {
    const admin = await createUser({ role: "admin" });
    const eb = await newEbook(admin, "Rahasia");
    const m = await createUser();
    expect((await call("/api/v1/studio/categories", { token: m.token })).status).toBe(403);
    expect(
      (
        await call(`/api/v1/studio/content/${eb.id}`, {
          method: "PATCH",
          token: m.token,
          ...json({ categoryId: "top_overthinking" }),
        })
      ).status,
    ).toBe(403);
  });
});
