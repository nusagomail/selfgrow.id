/**
 * Katalog publik ala YouTube & konten gratis (D35): daftar & detail terbuka tanpa login, bab
 * gratis pertama bisa dibaca tanpa login, konten bertanda gratis terbuka untuk user login tanpa
 * langganan, konten premium tetap terkunci.
 */
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});
const doc = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});
const rid = () => crypto.randomUUID().slice(0, 8);

async function ebook(admin: { token: string }, opts: { freeFirst: boolean; publish?: boolean }) {
  const slug = `pub-${rid()}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Ebook Publik", slug, summary: "Ringkas" }),
    })
  ).json()) as { id: string };
  const chapters: string[] = [];
  for (const [title, text, free] of [
    ["Bab 1", "isi bab satu", opts.freeFirst],
    ["Bab 2", "isi bab dua rahasia", false],
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
      ...json({ doc: doc(text), status: "published", isFreePreview: free }),
    });
    chapters.push(chId);
  }
  if (opts.publish !== false) {
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
  }
  return { id, slug, chapters };
}

async function tool(admin: { token: string }, tier: "all" | "free") {
  const slug = `tool-${rid()}`;
  const { id } = (await (
    await call("/api/v1/studio/tools", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Kalkulator", slug, preset: "budget_503020" }),
    })
  ).json()) as { id: string };
  const r = await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published", tier }),
  });
  expect(r.status).toBe(200);
  return { id, slug };
}

describe("katalog publik", () => {
  it("daftar & detail tanpa login, dengan label akses, tanpa isi bab", async () => {
    const admin = await createUser({ role: "admin" });
    const eb = await ebook(admin, { freeFirst: true });
    const draft = await ebook(admin, { freeFirst: true, publish: false });
    const t = await tool(admin, "free");

    const list = (await (await call("/api/v1/catalog/items")).json()) as {
      items: { slug: string; access: string }[];
    };
    expect(list.items.find((i) => i.slug === eb.slug)?.access).toBe("preview");
    expect(list.items.find((i) => i.slug === t.slug)?.access).toBe("free");
    expect(list.items.some((i) => i.slug === draft.slug)).toBe(false);

    const r = await call(`/api/v1/catalog/content/ebook/${eb.slug}`);
    expect(r.status).toBe(200);
    const detail = (await r.json()) as { ebook: { chapters: { title: string; free: boolean }[] } };
    expect(detail.ebook.chapters.map((c) => [c.title, c.free])).toEqual([
      ["Bab 1", true],
      ["Bab 2", false],
    ]);
    expect(JSON.stringify(detail)).not.toContain("isi bab");
    expect((await call(`/api/v1/catalog/content/ebook/${draft.slug}`)).status).toBe(404);
    expect((await call(`/api/v1/catalog/content/video/${eb.slug}`)).status).toBe(404);
  });

  it("bab gratis pertama bisa dibaca tanpa login; bab berbayar tidak", async () => {
    const admin = await createUser({ role: "admin" });
    const eb = await ebook(admin, { freeFirst: true });
    const r = await call(`/api/v1/catalog/ebooks/${eb.slug}/preview`);
    expect(r.status).toBe(200);
    const body = await r.text();
    expect(body).toContain("isi bab satu");
    expect(body).not.toContain("isi bab dua");
    // Ebook tanpa bab gratis: tidak ada pratinjau publik.
    const closed = await ebook(admin, { freeFirst: false });
    expect((await call(`/api/v1/catalog/ebooks/${closed.slug}/preview`)).status).toBe(404);
    // Reader tetap butuh login.
    expect((await call(`/api/v1/ebooks/${eb.slug}/chapters/${eb.chapters[1]}`)).status).toBe(401);
  });
});

describe("konten gratis (tier free)", () => {
  it("user login tanpa langganan bisa memakai tool gratis, tetapi tool premium tetap 403", async () => {
    const admin = await createUser({ role: "admin" });
    const free = await tool(admin, "free");
    const premium = await tool(admin, "all");
    const m = await createUser();
    const input = { gaji: 5_000_000, pengeluaran_wajib: 3_000_000 };
    const run = (slug: string) =>
      call(`/api/v1/tools/${slug}/run`, { method: "POST", token: m.token, ...json({ input }) });
    expect((await run(free.slug)).status).toBe(200);
    expect((await run(premium.slug)).status).toBe(403);
    const info = (await (await call(`/api/v1/tools/${free.slug}`, { token: m.token })).json()) as {
      locked: boolean;
      free: boolean;
    };
    expect(info).toMatchObject({ locked: false, free: true });
    // Tanpa login tetap 401.
    expect(
      (await call(`/api/v1/tools/${free.slug}/run`, { method: "POST", ...json({ input }) })).status,
    ).toBe(401);
  });

  it("ebook bertanda gratis: semua bab terbuka untuk user login tanpa langganan", async () => {
    const admin = await createUser({ role: "admin" });
    const eb = await ebook(admin, { freeFirst: false });
    const m = await createUser();
    const read = () =>
      call(`/api/v1/ebooks/${eb.slug}/chapters/${eb.chapters[1]}`, { token: m.token });
    expect((await read()).status).toBe(403);
    await call(`/api/v1/studio/content/${eb.id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ tier: "free" }),
    });
    expect((await read()).status).toBe(200);
  });

  it("hanya admin yang bisa menandai gratis; nilai tidak dikenal ditolak", async () => {
    const admin = await createUser({ role: "admin" });
    const t = await tool(admin, "all");
    const m = await createUser();
    expect(
      (
        await call(`/api/v1/studio/content/${t.id}`, {
          method: "PATCH",
          token: m.token,
          ...json({ tier: "free" }),
        })
      ).status,
    ).toBe(403);
    expect(
      (
        await call(`/api/v1/studio/content/${t.id}`, {
          method: "PATCH",
          token: admin.token,
          ...json({ tier: "vip" }),
        })
      ).status,
    ).toBe(400);
  });
});
