/**
 * Perlindungan ebook (BLUEPRINT bagian 8): watermark forensik & terlihat, deteksi scraping
 * dengan pembekuan sementara, rate limit, serta alat admin (lacak bocoran, buka pembekuan).
 */
import { env } from "cloudflare:test";
import { encodeWatermark, extractWatermarks } from "@selfgrow/shared";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription, testEnv } from "../test/helpers";

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
    expect(ra.watermark.label).toBe(`${a.id}@example.com`);
    // Kode forensik tidak ditampilkan di label terlihat.
    const codeA = extractWatermarks(textA)[0]?.code as string;
    expect(ra.watermark.label).not.toContain(codeA);

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

  it("tanda palsu (kode user lain tanpa tanda tangan server) tidak bisa menjebak, dan banjir tanda palsu tidak menenggelamkan yang asli", async () => {
    const { admin, slug, ids } = await setupEbook(1);
    const victim = await subscriber();
    const leaker = await subscriber();
    const rv = (await (await read(slug, ids[0] as string, victim.token)).json()) as ChapterRes;
    const rl = (await (await read(slug, ids[0] as string, leaker.token)).json()) as ChapterRes;
    const victimCode = extractWatermarks(JSON.stringify(rv.doc))[0]?.code as string;
    const leakedText = JSON.parse(JSON.stringify(rl.doc)).content[0].content[0].text as string;
    const fakes = [
      ...Array.from({ length: 30 }, () => encodeWatermark(victimCode, "000000")),
      ...Array.from({ length: 30 }, (_, i) =>
        encodeWatermark(i.toString(16).padStart(10, "0"), "abcdef"),
      ),
    ].join(" ");
    const r = await call("/api/v1/admin/watermark/trace", {
      method: "POST",
      token: admin.token,
      ...json({ text: `${fakes} ${leakedText}` }),
    });
    const body = (await r.json()) as {
      matches: { user: { id: string } | null }[];
      forged: number;
    };
    expect(body.forged).toBe(60);
    expect(body.matches.map((m) => m.user?.id)).toEqual([leaker.id]);
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

  it("batas harian: banyak bab tersebar beberapa jam tetap terdeteksi", async () => {
    const { slug, ids } = await setupEbook(1);
    const u = await subscriber();
    const guard = testEnv.READ_GUARD.get(testEnv.READ_GUARD.idFromName(u.id));
    const now = Date.now();
    // 8 bab berbeda tersebar 4 jam (2 per jam, di bawah ambang per jam 5).
    for (let i = 0; i < 8; i++) await guard.record(`lama-${i}`, now - (4 - i / 2) * 3_600_000);
    // Bab ke-9 dalam 24 jam melewati ambang harian test (8).
    expect((await read(slug, ids[0] as string, u.token)).status).toBe(423);
  });

  it("akun beku tetap bisa melihat data akunnya sendiri", async () => {
    const { slug, ids } = await setupEbook(6);
    const u = await subscriber();
    for (const chId of ids) await read(slug, chId, u.token);
    expect((await read(slug, ids[0] as string, u.token)).status).toBe(423);
    expect((await call("/api/v1/me", { token: u.token })).status).toBe(200);
    // Pembekuan dicatat sekali saja, oleh sistem (bukan oleh user).
    const rows = await env.DB.prepare(
      "SELECT actor_id FROM audit_log WHERE action = 'security.freeze' AND target = ?",
    )
      .bind(`user:${u.id}`)
      .all<{ actor_id: string | null }>();
    expect(rows.results).toEqual([{ actor_id: null }]);
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
  it("gangguan layanan rate limit tidak memblokir pembaca", async () => {
    const { slug, ids } = await setupEbook(1);
    const u = await subscriber();
    const original = testEnv.RL_USER.limit;
    testEnv.RL_USER.limit = () => Promise.reject(new Error("limiter down"));
    await expect(testEnv.RL_USER.limit({ key: "x" })).rejects.toThrow("limiter down");
    try {
      expect((await read(slug, ids[0] as string, u.token)).status).toBe(200);
    } finally {
      testEnv.RL_USER.limit = original;
    }
  });

  // Limiter memakai jendela tetap 60 detik: kirim cukup banyak request agar tetap kena batas
  // walau satu batas jendela terlewati di tengah test, lalu cek posisi 429 pertama.
  it("terlalu banyak bab per menit dari satu user -> 429", async () => {
    const { slug, ids } = await setupEbook(1);
    const u = await subscriber();
    let first429 = -1;
    for (let i = 0; i < 70 && first429 < 0; i++) {
      if ((await read(slug, ids[0] as string, u.token)).status === 429) first429 = i;
    }
    expect(first429).toBeGreaterThanOrEqual(30);
  });

  it("batas per IP berlaku lintas akun", async () => {
    const { slug, ids } = await setupEbook(1);
    const ip = `203.0.113.${Math.floor(Math.random() * 250)}`;
    let first429 = -1;
    let sent = 0;
    // Ganti akun setiap 20 request agar batas per user (30) tidak tercapai lebih dulu.
    while (sent < 260 && first429 < 0) {
      const u = await subscriber();
      for (let j = 0; j < 20 && first429 < 0; j++, sent++) {
        const r = await read(slug, ids[0] as string, u.token, { "cf-connecting-ip": ip });
        if (r.status === 429) first429 = sent;
      }
    }
    expect(first429).toBeGreaterThanOrEqual(120);
  });
});
