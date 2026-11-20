/**
 * Program bertahap (Fase 1B, D13): rujukan wajib terbit, hari terbuka sesuai tanggal WIB,
 * progres per user (IDOR), butuh langganan untuk mulai & menandai selesai.
 */

import { env } from "cloudflare:test";
import { createDb } from "@selfgrow/db";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";
import { checkProgramRefs, resolveRefs } from "./services/programs";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function publishedEbook(admin: { token: string }) {
  const slug = `eb-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Ebook", slug }),
    })
  ).json()) as { id: string };
  const { id: chapterId } = (await (
    await call(`/api/v1/studio/content/${id}/chapters`, {
      method: "POST",
      token: admin.token,
      ...json({ title: "Bab 1" }),
    })
  ).json()) as { id: string };
  await call(`/api/v1/studio/chapters/${chapterId}`, {
    method: "PUT",
    token: admin.token,
    ...json({ status: "published" }),
  });
  return { id, slug, chapterId };
}

async function setupProgram(opts: { publishEbook?: boolean } = {}) {
  const admin = await createUser({ role: "admin" });
  const eb = await publishedEbook(admin);
  if (opts.publishEbook !== false) {
    await call(`/api/v1/studio/content/${eb.id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
  }
  const slug = `prog-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/programs", {
      method: "POST",
      token: admin.token,
      ...json({ title: "30 Hari Gaji Aman", slug, durationDays: 30 }),
    })
  ).json()) as { id: string };
  const save = await call(`/api/v1/studio/programs/${id}`, {
    method: "PUT",
    token: admin.token,
    ...json({
      durationDays: 30,
      steps: [
        {
          day: 1,
          title: "Kenali pengeluaran",
          description: "Hari pertama",
          items: [
            { type: "chapter", contentId: eb.id, chapterId: eb.chapterId },
            { type: "task", text: "Catat pengeluaran hari ini" },
          ],
        },
        { day: 2, title: "Hari dua", items: [{ type: "task", text: "Rahasia hari dua" }] },
      ],
    }),
  });
  expect(save.status).toBe(200);
  const pub = await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published" }),
  });
  return { admin, id, slug, eb, pub };
}

async function subscriber() {
  const u = await createUser();
  await grantSubscription(u.id);
  return u;
}

describe("Studio program", () => {
  it("member tidak bisa membuka Program Builder", async () => {
    const { id } = await setupProgram();
    const m = await subscriber();
    expect((await call(`/api/v1/studio/programs/${id}`, { token: m.token })).status).toBe(403);
  });

  it("program yang merujuk konten belum terbit tidak bisa diterbitkan", async () => {
    const { pub, id } = await setupProgram({ publishEbook: false });
    expect(pub.status).toBe(400);
    const body = (await pub.json()) as { problems: string[] };
    expect(body.problems.join(" ")).toContain("belum diterbitkan");
    const row = await env.DB.prepare("SELECT status FROM content_items WHERE id = ?")
      .bind(id)
      .first<{ status: string }>();
    expect(row?.status).toBe("draft");
  });

  it("hari melebihi durasi ditolak", async () => {
    const { admin, id } = await setupProgram();
    const r = await call(`/api/v1/studio/programs/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ durationDays: 7, steps: [{ day: 8, title: "x", items: [] }] }),
    });
    expect(r.status).toBe(400);
  });
});

describe("program pelanggan", () => {
  it("sebelum mendaftar: judul hari terlihat, isi langkah tidak", async () => {
    const { slug, pub } = await setupProgram();
    expect(pub.status).toBe(200);
    const u = await subscriber();
    const r = (await (await call(`/api/v1/programs/${slug}`, { token: u.token })).json()) as {
      enrollment: unknown;
      days: { title: string; unlocked: boolean; items: unknown[] }[];
    };
    expect(r.enrollment).toBeNull();
    expect(r.days.map((d) => d.title)).toEqual(["Kenali pengeluaran", "Hari dua"]);
    expect(r.days.every((d) => !d.unlocked && d.items.length === 0)).toBe(true);
  });

  it("tanpa langganan tidak bisa mendaftar", async () => {
    const { slug } = await setupProgram();
    const u = await createUser();
    expect(
      (
        await call(`/api/v1/programs/${slug}/enroll`, {
          method: "POST",
          token: u.token,
          ...json({}),
        })
      ).status,
    ).toBe(403);
  });

  it("setelah mendaftar: hari 1 terbuka dengan tautan, hari 2 terkunci dan isinya tersembunyi", async () => {
    const { slug, eb } = await setupProgram();
    const u = await subscriber();
    expect(
      (
        await call(`/api/v1/programs/${slug}/enroll`, {
          method: "POST",
          token: u.token,
          ...json({}),
        })
      ).status,
    ).toBe(201);
    const text = await (await call(`/api/v1/programs/${slug}`, { token: u.token })).text();
    const r = JSON.parse(text) as {
      enrollment: { currentDay: number };
      days: { unlocked: boolean; items: { href: string | null }[] }[];
    };
    expect(r.enrollment.currentDay).toBe(1);
    expect(r.days[0]?.unlocked).toBe(true);
    expect(r.days[0]?.items[0]?.href).toBe(`/baca/${eb.slug}/${eb.chapterId}`);
    expect(r.days[1]?.unlocked).toBe(false);
    expect(text).not.toContain("Rahasia hari dua");
  });

  it("hari yang belum terbuka tidak bisa ditandai selesai; hari 1 bisa", async () => {
    const { slug } = await setupProgram();
    const u = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: u.token, ...json({}) });
    expect(
      (await call(`/api/v1/programs/${slug}/days/2/complete`, { method: "POST", token: u.token }))
        .status,
    ).toBe(403);
    const ok = await call(`/api/v1/programs/${slug}/days/1/complete`, {
      method: "POST",
      token: u.token,
    });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ completedCount: 1, finished: false });
  });

  it("hari ke-2 terbuka keesokan harinya dan program selesai bila semua hari selesai", async () => {
    const { slug, id } = await setupProgram();
    const u = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: u.token, ...json({}) });
    // Mundurkan tanggal mulai 1 hari (simulasi hari berikutnya).
    await env.DB.prepare(
      "UPDATE program_enrollments SET started_at = started_at - 86400000 WHERE user_id = ? AND program_id = ?",
    )
      .bind(u.id, id)
      .run();
    await call(`/api/v1/programs/${slug}/days/1/complete`, { method: "POST", token: u.token });
    const r = await call(`/api/v1/programs/${slug}/days/2/complete`, {
      method: "POST",
      token: u.token,
    });
    expect(await r.json()).toEqual({ completedCount: 2, finished: true });
  });

  it("hari yang dihapus saat terbit ulang tidak dihitung untuk status selesai", async () => {
    const { admin, slug, id } = await setupProgram();
    const u = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: u.token, ...json({}) });
    await env.DB.prepare(
      "UPDATE program_enrollments SET started_at = started_at - 86400000 WHERE user_id = ? AND program_id = ?",
    )
      .bind(u.id, id)
      .run();
    await call(`/api/v1/programs/${slug}/days/1/complete`, { method: "POST", token: u.token });
    await call(`/api/v1/studio/programs/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({
        durationDays: 30,
        steps: [
          { day: 2, title: "Dua", items: [] },
          { day: 3, title: "Tiga", items: [] },
        ],
      }),
    });
    const pub = await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(pub.status).toBe(200);
    const r = await call(`/api/v1/programs/${slug}/days/2/complete`, {
      method: "POST",
      token: u.token,
    });
    expect(await r.json()).toEqual({ completedCount: 1, finished: false });
  });

  it("progres hanya milik sendiri", async () => {
    const { slug } = await setupProgram();
    const a = await subscriber();
    const b = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: a.token, ...json({}) });
    await call(`/api/v1/programs/${slug}/days/1/complete`, { method: "POST", token: a.token });
    const rb = (await (await call(`/api/v1/programs/${slug}`, { token: b.token })).json()) as {
      enrollment: unknown;
      days: { completed: boolean }[];
    };
    expect(rb.enrollment).toBeNull();
    expect(rb.days.some((d) => d.completed)).toBe(false);
    expect(
      (await call(`/api/v1/programs/${slug}/days/1/complete`, { method: "POST", token: b.token }))
        .status,
    ).toBe(409);
  });

  it("mengulang program menghapus progres", async () => {
    const { slug } = await setupProgram();
    const u = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: u.token, ...json({}) });
    await call(`/api/v1/programs/${slug}/days/1/complete`, { method: "POST", token: u.token });
    await call(`/api/v1/programs/${slug}/enroll`, {
      method: "POST",
      token: u.token,
      ...json({ restart: true }),
    });
    const r = (await (await call(`/api/v1/programs/${slug}`, { token: u.token })).json()) as {
      enrollment: { completedCount: number };
    };
    expect(r.enrollment.completedCount).toBe(0);
  });

  it("konten yang ditarik setelah program terbit tidak ditautkan", async () => {
    const { admin, slug, eb } = await setupProgram();
    const u = await subscriber();
    await call(`/api/v1/programs/${slug}/enroll`, { method: "POST", token: u.token, ...json({}) });
    await call(`/api/v1/studio/content/${eb.id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "draft" }),
    });
    const r = (await (await call(`/api/v1/programs/${slug}`, { token: u.token })).json()) as {
      days: { items: { href: string | null; title: string }[] }[];
    };
    expect(r.days[0]?.items[0]).toEqual({
      type: "chapter",
      title: "Bab tidak tersedia",
      href: null,
    });
  });

  it("hapus tanda selesai untuk slug tak dikenal tetap 204 (tidak membocorkan slug)", async () => {
    const u = await subscriber();
    const r = await call("/api/v1/programs/tidak-ada-slug/days/1/complete", {
      method: "DELETE",
      token: u.token,
    });
    expect(r.status).toBe(204);
  });
});

describe("rujukan program dalam jumlah besar", () => {
  it("lebih dari 100 rujukan tidak melewati batas parameter D1", async () => {
    const { eb } = await setupProgram();
    const db = createDb(env.DB);
    const steps = Array.from({ length: 150 }, (_, i) => ({
      day: i + 1,
      title: `Hari ${i + 1}`,
      items: [
        {
          type: "chapter" as const,
          contentId: eb.id,
          chapterId: i === 0 ? eb.chapterId : `ch-${i}`,
        },
        { type: "tool" as const, contentId: `tool-${i}` },
      ],
    }));
    const refs = await resolveRefs(db, steps);
    expect(refs.contents.has(eb.id)).toBe(true);
    expect(refs.chapters.has(eb.chapterId)).toBe(true);
    const problems = await checkProgramRefs(db, steps);
    expect(problems.length).toBeGreaterThan(100);
  });
});
