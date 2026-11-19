/**
 * Alur ebook Fase 1B: Studio membuat & menerbitkan ebook, pelanggan membacanya.
 * Termasuk test otorisasi WAJIB: bab berbayar 403 tanpa langganan, bab gratis boleh,
 * draft tidak pernah terlihat pelanggan, member tidak bisa memakai Studio.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const para = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});

async function setupEbook(opts: { slug?: string; publish?: boolean } = {}) {
  const admin = await createUser({ role: "admin" });
  const slug = opts.slug ?? `ebook-${crypto.randomUUID().slice(0, 8)}`;
  const created = await call("/api/v1/studio/ebooks", {
    method: "POST",
    token: admin.token,
    ...json({ title: "Atur Gaji", slug, summary: "Ringkas" }),
  });
  expect(created.status).toBe(201);
  const { id } = (await created.json()) as { id: string };

  const mk = async (title: string) => {
    const r = await call(`/api/v1/studio/content/${id}/chapters`, {
      method: "POST",
      token: admin.token,
      ...json({ title }),
    });
    return ((await r.json()) as { id: string }).id;
  };
  const free = await mk("Bab 1");
  const paid = await mk("Bab 2");
  const draft = await mk("Bab 3 (draft)");

  for (const [chId, text, extra] of [
    [free, "isi gratis", { isFreePreview: true, status: "published" }],
    [paid, "isi berbayar", { status: "published" }],
    [draft, "isi draft", {}],
  ] as const) {
    const r = await call(`/api/v1/studio/chapters/${chId}`, {
      method: "PUT",
      token: admin.token,
      ...json({ doc: para(text), ...extra }),
    });
    expect(r.status).toBe(200);
  }

  if (opts.publish !== false) {
    const r = await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(r.status).toBe(200);
  }
  return { admin, id, slug, free, paid, draft };
}

describe("Studio ebook", () => {
  it("member tidak bisa membuat ebook", async () => {
    const m = await createUser();
    const r = await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: m.token,
      ...json({ title: "x", slug: "x" }),
    });
    expect(r.status).toBe(403);
  });

  it("slug ganda ditolak 409", async () => {
    const { admin, slug } = await setupEbook();
    const r = await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "lain", slug }),
    });
    expect(r.status).toBe(409);
  });

  it("isi bab tersimpan di R2, bukan di D1, dan jumlah kata dihitung", async () => {
    const { admin, id, paid } = await setupEbook();
    const r = await call(`/api/v1/studio/chapters/${paid}`, { token: admin.token });
    const body = (await r.json()) as { doc: unknown; chapter: { wordCount: number } };
    expect(body.doc).toEqual(para("isi berbayar"));
    expect(body.chapter.wordCount).toBe(2);
    expect(await env.CONTENT.get(`ebooks/${id}/chapters/${paid}.json`)).not.toBeNull();
  });

  it("dokumen dengan node tidak dikenal ditolak", async () => {
    const { admin, paid } = await setupEbook();
    const r = await call(`/api/v1/studio/chapters/${paid}`, {
      method: "PUT",
      token: admin.token,
      ...json({ doc: { type: "doc", content: [{ type: "html", html: "<script>" }] } }),
    });
    expect(r.status).toBe(400);
  });

  it("menerbitkan membuat riwayat versi dan tercatat di audit_log", async () => {
    const { admin, id } = await setupEbook();
    const r = await call(`/api/v1/studio/content/${id}/versions`, { token: admin.token });
    const { versions } = (await r.json()) as { versions: { version: number }[] };
    expect(versions.map((v) => v.version)).toEqual([1]);
    const snap = await env.CONTENT.get(`ebooks/${id}/versions/1.json`);
    const data = (await snap?.json()) as { chapters: { title: string }[] };
    expect(data.chapters.map((ch) => ch.title)).toEqual(["Bab 1", "Bab 2"]);
    const log = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM audit_log WHERE target = ? AND action = 'content.publish'",
    )
      .bind(`content:${id}`)
      .first<{ n: number }>();
    expect(log?.n).toBe(1);
  });

  it("urutan bab bisa diubah, daftar bab harus lengkap", async () => {
    const { admin, id, free, paid, draft } = await setupEbook();
    const bad = await call(`/api/v1/studio/content/${id}/chapter-order`, {
      method: "PUT",
      token: admin.token,
      ...json({ chapterIds: [paid, free] }),
    });
    expect(bad.status).toBe(400);
    const ok = await call(`/api/v1/studio/content/${id}/chapter-order`, {
      method: "PUT",
      token: admin.token,
      ...json({ chapterIds: [draft, paid, free] }),
    });
    expect(ok.status).toBe(200);
    const r = await call(`/api/v1/studio/content/${id}`, { token: admin.token });
    const { chapters } = (await r.json()) as { chapters: { id: string }[] };
    expect(chapters.map((c) => c.id)).toEqual([draft, paid, free]);
  });
});

describe("reader ebook", () => {
  it("tanpa login 401", async () => {
    const { slug } = await setupEbook();
    expect((await call(`/api/v1/ebooks/${slug}`)).status).toBe(401);
  });

  it("tanpa langganan: bab gratis boleh, bab berbayar 403", async () => {
    const { slug, free, paid } = await setupEbook();
    const u = await createUser();
    const meta = await call(`/api/v1/ebooks/${slug}`, { token: u.token });
    const body = (await meta.json()) as { chapters: { id: string; locked: boolean }[] };
    expect(body.chapters).toEqual([
      expect.objectContaining({ id: free, locked: false }),
      expect.objectContaining({ id: paid, locked: true }),
    ]);
    expect((await call(`/api/v1/ebooks/${slug}/chapters/${free}`, { token: u.token })).status).toBe(
      200,
    );
    expect((await call(`/api/v1/ebooks/${slug}/chapters/${paid}`, { token: u.token })).status).toBe(
      403,
    );
  });

  it("pelanggan membaca bab terbit, tanpa cache publik", async () => {
    const { slug, paid } = await setupEbook();
    const u = await createUser();
    await grantSubscription(u.id);
    const r = await call(`/api/v1/ebooks/${slug}/chapters/${paid}`, { token: u.token });
    expect(r.status).toBe(200);
    expect(r.headers.get("cache-control")).toBe("private, no-store");
    expect(((await r.json()) as { doc: unknown }).doc).toEqual(para("isi berbayar"));
  });

  it("bab draft tidak pernah terlihat pelanggan", async () => {
    const { slug, draft } = await setupEbook();
    const u = await createUser();
    await grantSubscription(u.id);
    const meta = (await (await call(`/api/v1/ebooks/${slug}`, { token: u.token })).json()) as {
      chapters: { id: string }[];
    };
    expect(meta.chapters.map((c) => c.id)).not.toContain(draft);
    expect(
      (await call(`/api/v1/ebooks/${slug}/chapters/${draft}`, { token: u.token })).status,
    ).toBe(404);
  });

  it("ebook draft tidak terlihat sama sekali", async () => {
    const { slug } = await setupEbook({ publish: false });
    const u = await createUser();
    await grantSubscription(u.id);
    expect((await call(`/api/v1/ebooks/${slug}`, { token: u.token })).status).toBe(404);
  });

  it("autosave draft tidak mengubah isi yang dibaca pelanggan sampai diterbitkan ulang", async () => {
    const { admin, slug, paid } = await setupEbook();
    await call(`/api/v1/studio/chapters/${paid}`, {
      method: "PUT",
      token: admin.token,
      ...json({ doc: para("revisi belum terbit") }),
    });
    const u = await createUser();
    await grantSubscription(u.id);
    const r = await call(`/api/v1/ebooks/${slug}/chapters/${paid}`, { token: u.token });
    expect(((await r.json()) as { doc: unknown }).doc).toEqual(para("isi berbayar"));
  });

  it("progres baca tersimpan per user", async () => {
    const { slug, paid } = await setupEbook();
    const a = await createUser();
    const b = await createUser();
    await grantSubscription(a.id);
    const put = await call(`/api/v1/ebooks/${slug}/progress`, {
      method: "PUT",
      token: a.token,
      ...json({ chapterId: paid, position: 42 }),
    });
    expect(put.status).toBe(204);
    const ra = (await (await call(`/api/v1/ebooks/${slug}`, { token: a.token })).json()) as {
      progress: unknown;
    };
    const rb = (await (await call(`/api/v1/ebooks/${slug}`, { token: b.token })).json()) as {
      progress: unknown;
    };
    expect(ra.progress).toEqual({ chapterId: paid, position: 42 });
    expect(rb.progress).toBeNull();
  });

  it("user A tidak bisa melihat atau menghapus bookmark user B", async () => {
    const { slug, free } = await setupEbook();
    const a = await createUser();
    const b = await createUser();
    const created = await call(`/api/v1/ebooks/${slug}/bookmarks`, {
      method: "POST",
      token: b.token,
      ...json({ chapterId: free, note: "penting" }),
    });
    const { id } = (await created.json()) as { id: string };
    const list = (await (
      await call(`/api/v1/ebooks/${slug}/bookmarks`, { token: a.token })
    ).json()) as {
      bookmarks: unknown[];
    };
    expect(list.bookmarks).toHaveLength(0);
    const del = await call(`/api/v1/ebooks/${slug}/bookmarks/${id}`, {
      method: "DELETE",
      token: a.token,
    });
    expect(del.status).toBe(404);
  });

  it("perpustakaan hanya berisi konten terbit, untuk pelanggan", async () => {
    const pub = await setupEbook();
    const draft = await setupEbook({ publish: false });
    const u = await createUser();
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(403);
    await grantSubscription(u.id);
    const r = (await (await call("/api/v1/library", { token: u.token })).json()) as {
      items: { slug: string }[];
    };
    const slugs = r.items.map((i) => i.slug);
    expect(slugs).toContain(pub.slug);
    expect(slugs).not.toContain(draft.slug);
  });
});
