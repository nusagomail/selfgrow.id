/**
 * Tool Builder (Fase 1B): Studio membuat & menerbitkan tool, pelanggan menjalankannya.
 * Test WAJIB: config_json tidak pernah sampai ke klien, run butuh langganan, kuota bulanan,
 * draft tidak dipakai sebelum terbit, member tidak bisa membuka Tool Builder.
 */
import { env } from "cloudflare:test";
import { TOOL_PRESETS } from "@selfgrow/shared";
import { afterEach, describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";
import { customTools } from "./tools/registry";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function setupTool(opts: { publish?: boolean; quota?: number } = {}) {
  const admin = await createUser({ role: "admin" });
  const slug = `tool-${crypto.randomUUID().slice(0, 8)}`;
  const r = await call("/api/v1/studio/tools", {
    method: "POST",
    token: admin.token,
    ...json({ title: "Kalkulator Anggaran", slug, preset: "budget_503020" }),
  });
  expect(r.status).toBe(201);
  const { id } = (await r.json()) as { id: string };
  if (opts.quota) {
    const q = await call(`/api/v1/studio/tools/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ config: TOOL_PRESETS.budget_503020, quotaPerMonth: opts.quota }),
    });
    expect(q.status).toBe(200);
  }
  if (opts.publish !== false) {
    const p = await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(p.status).toBe(200);
  }
  return { admin, id, slug };
}

const INPUT = { gaji: 5_000_000, pengeluaran_wajib: 3_000_000 };

describe("Studio Tool Builder", () => {
  it("member tidak bisa membuat atau membaca konfigurasi tool", async () => {
    const { id } = await setupTool();
    const m = await createUser();
    await grantSubscription(m.id);
    const create = await call("/api/v1/studio/tools", {
      method: "POST",
      token: m.token,
      ...json({ title: "x", slug: "x" }),
    });
    expect(create.status).toBe(403);
    expect((await call(`/api/v1/studio/tools/${id}`, { token: m.token })).status).toBe(403);
  });

  it("konfigurasi dengan rumus tidak valid ditolak beserta lokasinya", async () => {
    const { admin, id } = await setupTool();
    const r = await call(`/api/v1/studio/tools/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({
        config: {
          inputs: [{ key: "a", label: "A", type: "number" }],
          computed: [{ key: "b", label: "B", formula: "a + tidak_ada" }],
        },
      }),
    });
    expect(r.status).toBe(400);
    const body = (await r.json()) as { issues: { path: string }[] };
    expect(body.issues[0]?.path).toBe("config.computed.0.formula");
  });

  it("uji coba di Studio menghitung tanpa menyimpan", async () => {
    const { admin, id } = await setupTool({ publish: false });
    const r = await call(`/api/v1/studio/tools/${id}/test-run`, {
      method: "POST",
      token: admin.token,
      ...json({ config: TOOL_PRESETS.budget_503020, input: INPUT }),
    });
    expect(r.status).toBe(200);
    const body = (await r.json()) as { recommendations: { variant: string }[] };
    expect(body.recommendations[0]?.variant).toBe("warning");
  });

  it("menerbitkan membuat versi dan audit", async () => {
    const { id } = await setupTool();
    const v = await env.DB.prepare("SELECT snapshot_ref FROM content_versions WHERE content_id = ?")
      .bind(id)
      .first<{ snapshot_ref: string }>();
    expect(v?.snapshot_ref).toBe(`tools/${id}/versions/1.json`);
    expect(await env.CONTENT.get(`tools/${id}/versions/1.json`)).not.toBeNull();
  });
});

describe("menjalankan tool", () => {
  it("definisi untuk pengguna tidak memuat rumus maupun aturan", async () => {
    const { slug } = await setupTool();
    const u = await createUser();
    await grantSubscription(u.id);
    const r = await call(`/api/v1/tools/${slug}`, { token: u.token });
    expect(r.status).toBe(200);
    const text = await r.text();
    expect(text).not.toContain("formula");
    expect(text).not.toContain("gaji * 0.5");
    expect(text).not.toContain("porsi_wajib > 50");
    expect(text).toContain("Gaji bersih per bulan");
  });

  it("tanpa login 401, tanpa langganan 403 untuk run", async () => {
    const { slug } = await setupTool();
    expect(
      (await call(`/api/v1/tools/${slug}/run`, { method: "POST", ...json({ input: INPUT }) }))
        .status,
    ).toBe(401);
    const u = await createUser();
    const meta = (await (await call(`/api/v1/tools/${slug}`, { token: u.token })).json()) as {
      locked: boolean;
    };
    expect(meta.locked).toBe(true);
    const r = await call(`/api/v1/tools/${slug}/run`, {
      method: "POST",
      token: u.token,
      ...json({ input: INPUT }),
    });
    expect(r.status).toBe(403);
  });

  it("pelanggan menjalankan tool dan mendapat hasil + rekomendasi", async () => {
    const { slug } = await setupTool();
    const u = await createUser();
    await grantSubscription(u.id);
    const r = await call(`/api/v1/tools/${slug}/run`, {
      method: "POST",
      token: u.token,
      ...json({ input: INPUT }),
    });
    expect(r.status).toBe(200);
    const body = (await r.json()) as {
      results: { key: string; display: string }[];
      recommendations: { text: string }[];
      usage: { used: number };
    };
    expect(body.results.find((x) => x.key === "tabungan")?.display).toContain("1.000.000");
    expect(body.recommendations[0]?.text).toContain("60%");
    expect(body.usage.used).toBe(1);
    expect(r.headers.get("cache-control")).toBe("private, no-store");
  });

  it("input tidak valid 400 dan tidak memotong kuota", async () => {
    const { slug } = await setupTool({ quota: 1 });
    const u = await createUser();
    await grantSubscription(u.id);
    const bad = await call(`/api/v1/tools/${slug}/run`, {
      method: "POST",
      token: u.token,
      ...json({ input: { gaji: "banyak" } }),
    });
    expect(bad.status).toBe(400);
    const ok = await call(`/api/v1/tools/${slug}/run`, {
      method: "POST",
      token: u.token,
      ...json({ input: INPUT }),
    });
    expect(ok.status).toBe(200);
  });

  it("kuota bulanan habis -> 429", async () => {
    const { slug } = await setupTool({ quota: 2 });
    const u = await createUser();
    await grantSubscription(u.id);
    const run = () =>
      call(`/api/v1/tools/${slug}/run`, {
        method: "POST",
        token: u.token,
        ...json({ input: INPUT }),
      });
    expect((await run()).status).toBe(200);
    expect((await run()).status).toBe(200);
    expect((await run()).status).toBe(429);
  });

  it("draft Studio tidak dipakai pengguna sampai diterbitkan ulang", async () => {
    const { admin, id, slug } = await setupTool();
    const changed = structuredClone(TOOL_PRESETS.budget_503020);
    (changed.computed[2] as { formula: string }).formula = "gaji * 0.9";
    await call(`/api/v1/studio/tools/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ config: changed }),
    });
    const u = await createUser();
    await grantSubscription(u.id);
    const run = async () => {
      const r = await call(`/api/v1/tools/${slug}/run`, {
        method: "POST",
        token: u.token,
        ...json({ input: INPUT }),
      });
      const b = (await r.json()) as { results: { key: string; value: number }[] };
      return b.results.find((x) => x.key === "tabungan")?.value;
    };
    expect(await run()).toBe(1_000_000);
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(await run()).toBe(4_500_000);
  });

  it("tool draft tidak bisa diakses pengguna", async () => {
    const { slug } = await setupTool({ publish: false });
    const u = await createUser();
    await grantSubscription(u.id);
    expect((await call(`/api/v1/tools/${slug}`, { token: u.token })).status).toBe(404);
  });

  describe("tool custom (registry)", () => {
    afterEach(() => {
      delete customTools.uji_custom;
    });

    it("dijalankan lewat endpoint yang sama", async () => {
      customTools.uji_custom = {
        definition: {
          inputs: [{ key: "x", label: "X", type: "number", required: true }],
          outputs: [],
        },
        run: (input) => ({
          results: [{ key: "y", label: "Y", value: Number(input.x) * 3, display: "" }],
          recommendations: [],
        }),
      };
      const id = crypto.randomUUID();
      const slug = `custom-${id.slice(0, 8)}`;
      await env.DB.batch([
        env.DB.prepare(
          "INSERT INTO content_items (id, type, slug, title, status, created_at, updated_at) VALUES (?, 'tool', ?, 'Custom', 'published', ?, ?)",
        ).bind(id, slug, Date.now(), Date.now()),
        env.DB.prepare(
          "INSERT INTO tool_definitions (content_id, kind, module_slug) VALUES (?, 'custom', 'uji_custom')",
        ).bind(id),
      ]);
      const u = await createUser();
      await grantSubscription(u.id);
      const r = await call(`/api/v1/tools/${slug}/run`, {
        method: "POST",
        token: u.token,
        ...json({ input: { x: 2 } }),
      });
      expect(((await r.json()) as { results: { value: number }[] }).results[0]?.value).toBe(6);
    });
  });
});
