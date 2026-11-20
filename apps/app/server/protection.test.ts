/**
 * Perlindungan ebook (BLUEPRINT bagian 8): watermark forensik & terlihat, deteksi scraping
 * dengan pembekuan sementara, rate limit, serta alat admin (lacak bocoran, buka pembekuan).
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const LONG = "Catat setiap pengeluaran harian kamu agar tahu ke mana uang pergi setiap bulan.";

async function setupEbook(chapters: number) {
  const admin = await createUser({ role: "admin" });
  const slug = `wm-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Atur Gaji", slug }),
    })
  ).json()) as { id: string };
  const ids: string[] = [];
  for (let i = 0; i < chapters; i++) {
    const r = await call(`/api/v1/studio/content/${id}/chapters`, {
      method: "POST",
      token: admin.token,
      ...json({ title: `Bab ${i + 1}` }),
    });
    const chId = ((await r.json()) as { id: string }).id;
    await call(`/api/v1/studio/chapters/${chId}`, {
      method: "PUT",
      token: admin.token,
      ...json({
        status: "published",
        doc: {
          type: "doc",
          content: [{ type: "paragraph", content: [{ type: "text", text: LONG }] }],
        },
      }),
    });
    ids.push(chId);
  }
  await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published" }),
  });
  return { admin, slug, ids };
}

async function subscriber() {
  const u = await createUser();
  await grantSubscription(u.id);
  return u;
}

type ChapterRes = { doc: unknown; watermark: { label: string } };

const read = (slug: string, chId: string, token: string, headers?: Record<string, string>) =>
  call(`/api/v1/ebooks/${slug}/chapters/${chId}`, { token, headers });

describe("watermark", () => {
  it("teks bab membawa kode unik per pelanggan yang bisa dilacak admin", async () => {
    const { admin, slug, ids } = await setupEbook(1);
    const a = await subscriber();
    const b = await subscriber();
    const ra = (await (await read(slug, ids[0] as string, a.token)).json()) as ChapterRes;
    const ra2 = (await (await read(slug, ids[0] as string, a.token)).json()) as ChapterRes;
    const rb = (await (await read(slug, ids[0] as string, b.token)).json()) as ChapterRes;
    const textA = JSON.stringify(ra.doc);
    expect(textA).not.toContain(LONG); // disisipi karakter tak terlihat
    expect(JSON.stringify(ra2.doc)).toBe(textA); // stabil untuk user yang sama
    expect(JSON.stringify(rb.doc)).not.toBe(textA); // berbeda antar user
    expect(ra.watermark.label).toContain(`${a.id}@example.com`);

    // Admin menempel teks bocoran -> pemilik teks ditemukan.
    const leaked = JSON.parse(textA).content[0].content[0].text as string;
    const trace = await call("/api/v1/admin/watermark/trace", {
      method: "POST",
      token: admin.token,
      ...json({ text: `bocor di grup: ${leaked}` }),
    });
    expect(trace.status).toBe(200);
    const { matches } = (await trace.json()) as { matches: { user: { id: string } | null }[] };
    expect(matches).toHaveLength(1);
    expect(matches[0]?.user?.id).toBe(a.id);
  });

  it("member tidak bisa memakai alat lacak", async () => {
    const m = await subscriber();
    const r = await call("/api/v1/admin/watermark/trace", {
      method: "POST",
      token: m.token,
      ...json({ text: "apa saja" }),
    });
    expect(r.status).toBe(403);
  });
});

describe("deteksi scraping", () => {
  it("melewati ambang bab per jam membekukan akun sementara, admin bisa membuka", async () => {
    const { admin, slug, ids } = await setupEbook(6);
    const u = await subscriber();
    for (const chId of ids.slice(0, 5)) {
      expect((await read(slug, chId, u.token)).status).toBe(200);
    }
    // Bab ke-6 berbeda dalam satu jam (ambang test = 5) -> dibekukan.
    const frozen = await read(slug, ids[5] as string, u.token);
    expect(frozen.status).toBe(423);
    expect(((await frozen.json()) as { error: string }).error).toBe("account_frozen");
    // Bab yang tadinya boleh pun ikut terkunci, begitu juga konten berbayar lain.
    expect((await read(slug, ids[0] as string, u.token)).status).toBe(423);
    expect(
      (await call("/api/v1/tools/apa-saja/run", { method: "POST", token: u.token, ...json({}) }))
        .status,
    ).toBe(423);

    const audit = await env.DB.prepare(
      "SELECT count(*) AS n FROM audit_log WHERE action = 'security.freeze' AND target = ?",
    )
      .bind(`user:${u.id}`)
      .first<{ n: number }>();
    expect(audit?.n).toBe(1);

    const list = (await (await call("/api/v1/admin/frozen", { token: admin.token })).json()) as {
      frozen: { userId: string }[];
    };
    expect(list.frozen.some((f) => f.userId === u.id)).toBe(true);

    expect(
      (await call(`/api/v1/admin/users/${u.id}/freeze`, { method: "DELETE", token: admin.token }))
        .status,
    ).toBe(204);
    expect((await read(slug, ids[0] as string, u.token)).status).toBe(200);
  });

  it("membaca ulang bab yang sama tidak dihitung sebagai scraping", async () => {
    const { slug, ids } = await setupEbook(1);
    const u = await subscriber();
    for (let i = 0; i < 8; i++) {
      expect((await read(slug, ids[0] as string, u.token)).status).toBe(200);
    }
  });

  it("member tidak bisa melihat atau membuka akun beku", async () => {
    const m = await subscriber();
    expect((await call("/api/v1/admin/frozen", { token: m.token })).status).toBe(403);
    expect(
      (await call(`/api/v1/admin/users/${m.id}/freeze`, { method: "DELETE", token: m.token }))
        .status,
    ).toBe(403);
  });
});

describe("rate limit", () => {
  it("terlalu banyak bab per menit dari satu user -> 429", async () => {
    const { slug, ids } = await setupEbook(1);
    const u = await subscriber();
    const statuses: number[] = [];
    for (let i = 0; i < 32; i++)
      statuses.push((await read(slug, ids[0] as string, u.token)).status);
    expect(statuses.slice(0, 30).every((s) => s === 200)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
  });

  it("batas per IP berlaku lintas akun", async () => {
    const { slug, ids } = await setupEbook(1);
    const ip = `203.0.113.${Math.floor(Math.random() * 250)}`;
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const u = await subscriber();
      for (let j = 0; j < 21; j++) {
        statuses.push(
          (await read(slug, ids[0] as string, u.token, { "cf-connecting-ip": ip })).status,
        );
      }
    }
    expect(statuses.slice(0, 120).every((s) => s === 200)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
  });
});
