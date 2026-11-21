/**
 * Skor kuis di dalam ebook (D42): hanya user login, hanya ebook terbit, setiap user hanya
 * melihat skornya sendiri, dan isi permintaan divalidasi.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function ebook(status: "draft" | "published" = "published") {
  const id = crypto.randomUUID();
  const slug = `kuis-${id.slice(0, 8)}`;
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO content_items (id, type, slug, title, tier, status, published_at, created_at, updated_at) VALUES (?, 'ebook', ?, 'Berkuis', 'all', ?, ?, ?, ?)",
  )
    .bind(id, slug, status, status === "published" ? now : null, now, now)
    .run();
  return slug;
}

const save = (slug: string, token: string, quiz: string, body: unknown) =>
  call(`/api/v1/ebooks/${slug}/quizzes/${quiz}`, { method: "POST", token, ...json(body) });
const list = async (slug: string, token: string) =>
  (await (await call(`/api/v1/ebooks/${slug}/quizzes`, { token })).json()) as {
    results: { quizId: string; score: number; maxScore: number }[];
  };

describe("skor kuis", () => {
  it("menyimpan dan mengembalikan skor terakhir per kuis", async () => {
    const slug = await ebook();
    const u = await createUser();
    expect((await save(slug, u.token, "skor-jerat", { score: 6, maxScore: 8 })).status).toBe(201);
    expect((await save(slug, u.token, "skor-jerat", { score: 2, maxScore: 8 })).status).toBe(201);
    expect((await save(slug, u.token, "kuis-lain", { score: 1, maxScore: 3 })).status).toBe(201);
    const r = await list(slug, u.token);
    expect(r.results.find((x) => x.quizId === "skor-jerat")).toMatchObject({
      score: 2,
      maxScore: 8,
    });
    expect(r.results).toHaveLength(2);
  });

  it("user lain tidak melihat skor orang lain", async () => {
    const slug = await ebook();
    const a = await createUser();
    const b = await createUser();
    await save(slug, a.token, "skor-jerat", { score: 7, maxScore: 8 });
    expect((await list(slug, b.token)).results).toEqual([]);
  });

  it("validasi: skor > maksimal, id kuis aneh, bukan angka bulat → 400", async () => {
    const slug = await ebook();
    const u = await createUser();
    expect((await save(slug, u.token, "skor-jerat", { score: 9, maxScore: 8 })).status).toBe(400);
    expect((await save(slug, u.token, "Skor Jerat!", { score: 1, maxScore: 8 })).status).toBe(400);
    expect((await save(slug, u.token, "skor-jerat", { score: 1.5, maxScore: 8 })).status).toBe(400);
    expect((await save(slug, u.token, "skor-jerat", null)).status).toBe(400);
  });

  it("ebook draft atau tidak ada → 404; tanpa login → 401", async () => {
    const draft = await ebook("draft");
    const u = await createUser();
    expect((await save(draft, u.token, "skor-jerat", { score: 1, maxScore: 8 })).status).toBe(404);
    expect((await save("tidak-ada", u.token, "skor-jerat", { score: 1, maxScore: 8 })).status).toBe(
      404,
    );
    const slug = await ebook();
    expect(
      (
        await call(`/api/v1/ebooks/${slug}/quizzes/skor-jerat`, {
          method: "POST",
          ...json({ score: 1, maxScore: 8 }),
        })
      ).status,
    ).toBe(401);
  });

  it("riwayat dibatasi 20 per kuis", async () => {
    const slug = await ebook();
    const u = await createUser();
    for (let i = 0; i < 23; i++)
      await save(slug, u.token, "skor-jerat", { score: i % 8, maxScore: 8 });
    const { results } = await env.DB.prepare(
      "SELECT count(*) AS n FROM quiz_results WHERE user_id = ? AND quiz_id = 'skor-jerat'",
    )
      .bind(u.id)
      .all<{ n: number }>();
    expect(results[0]?.n).toBe(20);
  });

  it("maksimal 50 id kuis berbeda per ebook; kuis lama tetap bisa disimpan", async () => {
    const slug = await ebook();
    const u = await createUser();
    const item = await env.DB.prepare("SELECT id FROM content_items WHERE slug = ?")
      .bind(slug)
      .first<{ id: string }>();
    const stmt = env.DB.prepare(
      "INSERT INTO quiz_results (id, user_id, content_id, quiz_id, score, max_score, created_at) VALUES (?, ?, ?, ?, 1, 2, ?)",
    );
    await env.DB.batch(
      Array.from({ length: 50 }, (_, i) =>
        stmt.bind(crypto.randomUUID(), u.id, item?.id, `kuis-${i}`, Date.now()),
      ),
    );
    expect((await save(slug, u.token, "kuis-baru", { score: 1, maxScore: 2 })).status).toBe(409);
    expect((await save(slug, u.token, "kuis-7", { score: 2, maxScore: 2 })).status).toBe(201);
  });
});
