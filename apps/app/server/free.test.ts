/**
 * Katalog publik ala YouTube & konten gratis (D35): daftar & detail terbuka tanpa login, bab
 * gratis pertama bisa dibaca tanpa login, konten bertanda gratis terbuka untuk user login tanpa
 * langganan, konten premium tetap terkunci.
 */
import { env } from "cloudflare:test";
import { todayWib } from "@selfgrow/shared";
import { beforeAll, describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

// Generator DOCX/PDF/XLSX dimuat lazy; muat sekali di awal agar import library besar di runner CI
// yang sibuk tidak melewati batas 5 detik per test (sama seperti templates.test.ts).
beforeAll(async () => {
  await import("./templates");
}, 60_000);

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

async function tool(
  admin: { token: string },
  tier: "all" | "free",
  preset: "budget_503020" | "habit_daily" = "budget_503020",
) {
  const slug = `tool-${rid()}`;
  const { id } = (await (
    await call("/api/v1/studio/tools", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Kalkulator", slug, preset }),
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

async function publish(admin: { token: string }, id: string, tier: "all" | "free") {
  const r = await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published", tier }),
  });
  expect(r.status).toBe(200);
}

async function template(admin: { token: string }, tier: "all" | "free") {
  const slug = `tpl-${rid()}`;
  const { id } = (await (
    await call("/api/v1/studio/templates", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Rencana", slug }),
    })
  ).json()) as { id: string };
  await publish(admin, id, tier);
  return slug;
}

async function program(admin: { token: string }, tier: "all" | "free") {
  const slug = `prg-${rid()}`;
  const { id } = (await (
    await call("/api/v1/studio/programs", {
      method: "POST",
      token: admin.token,
      ...json({ title: "7 Hari", slug, durationDays: 7 }),
    })
  ).json()) as { id: string };
  await call(`/api/v1/studio/programs/${id}`, {
    method: "PUT",
    token: admin.token,
    ...json({
      durationDays: 7,
      steps: [{ day: 1, title: "Mulai", items: [{ type: "task", text: "Catat" }] }],
    }),
  });
  await publish(admin, id, tier);
  return slug;
}

describe("konten gratis: template, program, tracker, pembekuan, draft", () => {
  it("template gratis bisa diunduh tanpa langganan, premium 403", async () => {
    const admin = await createUser({ role: "admin" });
    const free = await template(admin, "free");
    const premium = await template(admin, "all");
    const m = await createUser();
    const gen = (slug: string) =>
      call(`/api/v1/templates/${slug}/generate`, {
        method: "POST",
        token: m.token,
        ...json({
          format: "pdf",
          input: { nama: "Rina", minggu: 2, target: "Lari", catatan: null },
        }),
      });
    expect((await gen(free)).status).toBe(200);
    expect((await gen(premium)).status).toBe(403);
  });

  it("program gratis bisa diikuti & ditandai selesai tanpa langganan, premium 403", async () => {
    const admin = await createUser({ role: "admin" });
    const free = await program(admin, "free");
    const premium = await program(admin, "all");
    const m = await createUser();
    const enroll = (slug: string) =>
      call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: m.token, ...json({}) });
    expect((await enroll(free)).status).toBe(201);
    expect(
      (await call(`/api/v1/programs/${free}/days/1/complete`, { method: "POST", token: m.token }))
        .status,
    ).toBe(200);
    const view = (await (await call(`/api/v1/programs/${free}`, { token: m.token })).json()) as {
      days: { unlocked: boolean; items: unknown[] }[];
    };
    expect(view.days[0]).toMatchObject({ unlocked: true });
    expect(view.days[0]?.items.length).toBe(1);
    expect((await enroll(premium)).status).toBe(403);
  });

  it("tracker gratis bisa diisi tanpa langganan", async () => {
    const admin = await createUser({ role: "admin" });
    const t = await tool(admin, "free", "habit_daily");
    const m = await createUser();
    const r = await call(`/api/v1/tools/${t.slug}/entries`, {
      method: "PUT",
      token: m.token,
      ...json({ date: todayWib(), input: { olahraga: 30, air: 8, mood: "4" } }),
    });
    expect(r.status).toBe(200);
  });

  it("akun beku tetap 423 walau kontennya gratis", async () => {
    const admin = await createUser({ role: "admin" });
    const t = await tool(admin, "free");
    const m = await createUser();
    const until = new Date(Date.now() + 3_600_000).toISOString();
    await env.KV.put(
      `frozen:${m.id}`,
      JSON.stringify({ until, reason: "scraping", chaptersPerHour: 99, chaptersPerDay: 99 }),
    );
    const r = await call(`/api/v1/tools/${t.slug}/run`, {
      method: "POST",
      token: m.token,
      ...json({ input: { gaji: 1, pengeluaran_wajib: 1 } }),
    });
    expect(r.status).toBe(423);
  });

  it("konten bertanda gratis yang masih draft tidak terbuka", async () => {
    const admin = await createUser({ role: "admin" });
    const slug = `tool-${rid()}`;
    const { id } = (await (
      await call("/api/v1/studio/tools", {
        method: "POST",
        token: admin.token,
        ...json({ title: "Draft", slug, preset: "budget_503020" }),
      })
    ).json()) as { id: string };
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ tier: "free" }),
    });
    const m = await createUser();
    const r = await call(`/api/v1/tools/${slug}/run`, {
      method: "POST",
      token: m.token,
      ...json({ input: { gaji: 1, pengeluaran_wajib: 1 } }),
    });
    expect(r.status).toBe(403);
  });

  it("pratinjau publik 404 untuk ebook draft dan bab gratis yang masih draft", async () => {
    const admin = await createUser({ role: "admin" });
    const draft = await ebook(admin, { freeFirst: true, publish: false });
    expect((await call(`/api/v1/catalog/ebooks/${draft.slug}/preview`)).status).toBe(404);
    const eb = await ebook(admin, { freeFirst: true });
    await call(`/api/v1/studio/chapters/${eb.chapters[0]}`, {
      method: "PUT",
      token: admin.token,
      ...json({ status: "draft" }),
    });
    expect((await call(`/api/v1/catalog/ebooks/${eb.slug}/preview`)).status).toBe(404);
  });
});
