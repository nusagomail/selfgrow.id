/**
 * Beranda katalog & Profil: konten terbit per kategori dengan status terkunci/gratis sesuai
 * akses, lanjutkan membaca, dan ringkasan profil yang hanya berisi data milik sendiri.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});
const doc = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});

async function setup() {
  const admin = await createUser({ role: "admin" });
  const slug = `home-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Gaji Aman", slug, summary: "Ringkasan" }),
    })
  ).json()) as { id: string };
  const chapters: string[] = [];
  for (const [title, free] of [
    ["Bab 1", true],
    ["Bab 2", false],
  ] as const) {
    const r = await call(`/api/v1/studio/content/${id}/chapters`, {
      method: "POST",
      token: admin.token,
      ...json({ title }),
    });
    const chId = ((await r.json()) as { id: string }).id;
    await call(`/api/v1/studio/chapters/${chId}`, {
      method: "PUT",
      token: admin.token,
      ...json({ doc: doc("isi rahasia bab"), status: "published", isFreePreview: free }),
    });
    chapters.push(chId);
  }
  await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ categoryId: "top_anggaran-arus-kas", status: "published" }),
  });
  // Tool terbit tanpa kategori + ebook draft (tidak boleh tampil).
  const tool = (await (
    await call("/api/v1/studio/tools", {
      method: "POST",
      token: admin.token,
      ...json({
        title: "Kalkulator",
        slug: `tool-${crypto.randomUUID().slice(0, 8)}`,
        preset: "budget_503020",
      }),
    })
  ).json()) as { id: string };
  await call(`/api/v1/studio/content/${tool.id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published" }),
  });
  const draftSlug = `draft-${crypto.randomUUID().slice(0, 8)}`;
  await call("/api/v1/studio/ebooks", {
    method: "POST",
    token: admin.token,
    ...json({ title: "Draft rahasia", slug: draftSlug }),
  });
  return { admin, slug, chapters, draftSlug };
}

type Item = { type: string; slug: string; locked: boolean; freePreview: boolean };
type Home = {
  sections: { slug: string; items: Item[] }[];
  uncategorized: Item[];
  continueReading: { slug: string; chapterNumber: number; totalChapters: number }[];
  subscription: { active: boolean };
};
const allItems = (h: Home) => [...h.sections.flatMap((s) => s.items), ...h.uncategorized];

describe("beranda katalog", () => {
  it("butuh login", async () => {
    expect((await call("/api/v1/home")).status).toBe(401);
  });

  it("belum berlangganan: ebook dengan bab gratis terbuka, tool terkunci, draft tidak tampil", async () => {
    const { slug, draftSlug } = await setup();
    const m = await createUser();
    const r = await call("/api/v1/home", { token: m.token });
    expect(r.headers.get("cache-control")).toContain("no-store");
    const h = (await r.json()) as Home;
    const keuangan = h.sections.find((s) => s.slug === "keuangan-pribadi");
    const ebook = keuangan?.items.find((i) => i.slug === slug);
    expect(ebook).toMatchObject({ type: "ebook", freePreview: true, locked: false });
    const tool = allItems(h).find((i) => i.type === "tool");
    expect(tool?.locked).toBe(true);
    expect(allItems(h).some((i) => i.slug === draftSlug)).toBe(false);
    expect(JSON.stringify(h)).not.toContain("isi rahasia");
  });

  it("pelanggan: tidak ada yang terkunci, dan muncul di Lanjutkan membaca", async () => {
    const { slug, chapters } = await setup();
    const u = await createUser();
    await grantSubscription(u.id);
    await call(`/api/v1/ebooks/${slug}/progress`, {
      method: "PUT",
      token: u.token,
      ...json({ chapterId: chapters[1], position: 5000 }),
    });
    const h = (await (await call("/api/v1/home", { token: u.token })).json()) as Home;
    expect(allItems(h).every((i) => !i.locked)).toBe(true);
    expect(h.continueReading[0]).toMatchObject({ slug, chapterNumber: 2, totalChapters: 2 });
  });

  it("admin mode pengunjung melihat konten terkunci", async () => {
    const { admin } = await setup();
    await call("/api/v1/me/admin-view", {
      method: "PUT",
      token: admin.token,
      ...json({ view: "visitor" }),
    });
    const h = (await (await call("/api/v1/home", { token: admin.token })).json()) as Home;
    expect(allItems(h).find((i) => i.type === "tool")?.locked).toBe(true);
  });
});

type Profile = {
  reading: { slug: string; percent: number }[];
  downloads: { fileName: string }[];
};

describe("profil", () => {
  it("hanya berisi data milik sendiri", async () => {
    const { slug, chapters } = await setup();
    const a = await createUser();
    const b = await createUser();
    await grantSubscription(a.id);
    await call(`/api/v1/ebooks/${slug}/progress`, {
      method: "PUT",
      token: a.token,
      ...json({ chapterId: chapters[0], position: 10000 }),
    });
    const content = await env.DB.prepare("SELECT id FROM content_items WHERE slug = ?")
      .bind(slug)
      .first<{ id: string }>();
    await env.DB.prepare(
      "INSERT INTO template_downloads (id, user_id, content_id, format, file_name, created_at) VALUES (?, ?, ?, 'pdf', 'Rencana A.pdf', ?)",
    )
      .bind(crypto.randomUUID(), a.id, content?.id, Date.now())
      .run();

    const pa = (await (await call("/api/v1/profile", { token: a.token })).json()) as Profile;
    expect(pa.reading[0]).toMatchObject({ slug, percent: 50 });
    expect(pa.downloads.map((d) => d.fileName)).toEqual(["Rencana A.pdf"]);

    const pb = (await (await call("/api/v1/profile", { token: b.token })).json()) as Profile;
    expect(pb.reading).toEqual([]);
    expect(pb.downloads).toEqual([]);
    expect((await call("/api/v1/profile")).status).toBe(401);
  });
});
