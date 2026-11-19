/**
 * Tool tracker (D13): entri per tanggal, streak, riwayat milik user sendiri.
 */
import { env } from "cloudflare:test";
import { addDays, todayWib } from "@selfgrow/shared";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function setupTracker(opts: { tracker?: boolean } = {}) {
  const admin = await createUser({ role: "admin" });
  const slug = `tracker-${crypto.randomUUID().slice(0, 8)}`;
  const r = await call("/api/v1/studio/tools", {
    method: "POST",
    token: admin.token,
    ...json({
      title: "Habit Tracker",
      slug,
      preset: opts.tracker === false ? "budget_503020" : "habit_daily",
    }),
  });
  const { id } = (await r.json()) as { id: string };
  await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published" }),
  });
  return { admin, id, slug };
}

const INPUT = { olahraga: 30, air: 8, mood: "4" };

async function subscriber() {
  const u = await createUser();
  await grantSubscription(u.id);
  return u;
}

const save = (slug: string, token: string, date: string, input: unknown = INPUT) =>
  call(`/api/v1/tools/${slug}/entries`, { method: "PUT", token, ...json({ date, input }) });

describe("tracker", () => {
  it("preset kebiasaan otomatis menjadi tracker", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    const r = (await (await call(`/api/v1/tools/${slug}`, { token: u.token })).json()) as {
      tracker: { today: string; streak: { current: number } } | null;
    };
    expect(r.tracker?.today).toBe(todayWib());
    expect(r.tracker?.streak.current).toBe(0);
  });

  it("menyimpan entri hari ini, menghitung skor & streak", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    const r = await save(slug, u.token, todayWib());
    expect(r.status).toBe(200);
    const body = (await r.json()) as {
      results: { key: string; value: number }[];
      streak: { current: number; longest: number };
    };
    expect(body.results.find((x) => x.key === "skor")?.value).toBe(100);
    expect(body.streak).toMatchObject({ current: 1, longest: 1 });
  });

  it("mengisi ulang tanggal yang sama memperbarui, bukan menambah", async () => {
    const { slug, id } = await setupTracker();
    const u = await subscriber();
    await save(slug, u.token, todayWib(), { olahraga: 10, air: 2, mood: "1" });
    await save(slug, u.token, todayWib());
    const n = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM tool_entries WHERE user_id = ? AND tool_id = ?",
    )
      .bind(u.id, id)
      .first<{ n: number }>();
    expect(n?.n).toBe(1);
  });

  it("streak berturut-turut termasuk hari yang diisi belakangan", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    const today = todayWib();
    await save(slug, u.token, addDays(today, -2));
    await save(slug, u.token, today);
    const mid = await save(slug, u.token, addDays(today, -1));
    const body = (await mid.json()) as { streak: { current: number; longest: number } };
    expect(body.streak).toMatchObject({ current: 3, longest: 3 });
  });

  it("menolak tanggal di masa depan atau lebih dari 7 hari lalu", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    expect((await save(slug, u.token, addDays(todayWib(), 1))).status).toBe(400);
    expect((await save(slug, u.token, addDays(todayWib(), -8))).status).toBe(400);
    expect((await save(slug, u.token, "2026-02-30")).status).toBe(400);
  });

  it("input tidak valid ditolak", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    const r = await save(slug, u.token, todayWib(), { olahraga: -5, air: 1, mood: "9" });
    expect(r.status).toBe(400);
  });

  it("tanpa langganan tidak bisa menyimpan, tapi riwayat sendiri tetap bisa dibaca", async () => {
    const { slug } = await setupTracker();
    const u = await createUser();
    expect((await save(slug, u.token, todayWib())).status).toBe(403);
    expect((await call(`/api/v1/tools/${slug}/entries`, { token: u.token })).status).toBe(200);
  });

  it("riwayat hanya berisi entri milik sendiri", async () => {
    const { slug } = await setupTracker();
    const a = await subscriber();
    const b = await subscriber();
    await save(slug, a.token, todayWib());
    const r = (await (await call(`/api/v1/tools/${slug}/entries`, { token: b.token })).json()) as {
      entries: unknown[];
    };
    expect(r.entries).toHaveLength(0);
    const ra = (await (await call(`/api/v1/tools/${slug}/entries`, { token: a.token })).json()) as {
      entries: { date: string; input: { olahraga: number } }[];
    };
    expect(ra.entries[0]).toMatchObject({ date: todayWib(), input: { olahraga: 30 } });
  });

  it("menghapus entri hanya milik sendiri dan menghitung ulang streak", async () => {
    const { slug } = await setupTracker();
    const a = await subscriber();
    const b = await subscriber();
    const today = todayWib();
    await save(slug, a.token, addDays(today, -1));
    await save(slug, a.token, today);
    expect(
      (await call(`/api/v1/tools/${slug}/entries/${today}`, { method: "DELETE", token: b.token }))
        .status,
    ).toBe(404);
    const del = await call(`/api/v1/tools/${slug}/entries/${today}`, {
      method: "DELETE",
      token: a.token,
    });
    expect(del.status).toBe(200);
    expect(((await del.json()) as { streak: { current: number } }).streak.current).toBe(1);
  });

  it("riwayat tetap bisa dibaca & dihapus walau tool ditarik ke draft", async () => {
    const { admin, id, slug } = await setupTracker();
    const u = await subscriber();
    await save(slug, u.token, todayWib());
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "draft" }),
    });
    const r = (await (await call(`/api/v1/tools/${slug}/entries`, { token: u.token })).json()) as {
      entries: unknown[];
    };
    expect(r.entries).toHaveLength(1);
    const del = await call(`/api/v1/tools/${slug}/entries/${todayWib()}`, {
      method: "DELETE",
      token: u.token,
    });
    expect(del.status).toBe(200);
    expect((await save(slug, u.token, todayWib())).status).toBe(404);
  });

  it("tanggal tidak valid di URL hapus ditolak", async () => {
    const { slug } = await setupTracker();
    const u = await subscriber();
    const r = await call(`/api/v1/tools/${slug}/entries/kemarin`, {
      method: "DELETE",
      token: u.token,
    });
    expect(r.status).toBe(400);
  });

  it("tool biasa (bukan tracker) menolak entri", async () => {
    const { slug } = await setupTracker({ tracker: false });
    const u = await subscriber();
    const r = await call(`/api/v1/tools/${slug}/entries`, {
      method: "PUT",
      token: u.token,
      ...json({ date: todayWib(), input: { gaji: 1, pengeluaran_wajib: 1 } }),
    });
    expect(r.status).toBe(400);
  });

  it("Studio bisa mengubah tool menjadi tracker", async () => {
    const { admin, id } = await setupTracker({ tracker: false });
    const current = (await (
      await call(`/api/v1/studio/tools/${id}`, { token: admin.token })
    ).json()) as { tool: { config: unknown; storesUserData: boolean } };
    expect(current.tool.storesUserData).toBe(false);
    await call(`/api/v1/studio/tools/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ config: current.tool.config, storesUserData: true }),
    });
    const after = (await (
      await call(`/api/v1/studio/tools/${id}`, { token: admin.token })
    ).json()) as { tool: { storesUserData: boolean } };
    expect(after.tool.storesUserData).toBe(true);
  });
});
