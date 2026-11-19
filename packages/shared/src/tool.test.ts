import { describe, expect, it } from "vitest";
import { runToolConfig, TOOL_PRESETS, toolConfigSchema, toPublicDefinition } from "./tool";

describe("toolConfigSchema", () => {
  it("preset valid", () => {
    for (const p of Object.values(TOOL_PRESETS)) {
      expect(toolConfigSchema.safeParse(p).success).toBe(true);
    }
  });

  it("menolak rumus yang merujuk kunci belum didefinisikan", () => {
    const r = toolConfigSchema.safeParse({
      inputs: [{ key: "a", label: "A", type: "number" }],
      computed: [{ key: "b", label: "B", formula: "a + c" }],
    });
    expect(r.success).toBe(false);
  });

  it("menolak kunci ganda dan nama fungsi sebagai kunci", () => {
    for (const computed of [
      [{ key: "a", label: "A2", formula: "a" }],
      [{ key: "round", label: "R", formula: "a" }],
    ]) {
      const r = toolConfigSchema.safeParse({
        inputs: [{ key: "a", label: "A", type: "number" }],
        computed,
      });
      expect(r.success).toBe(false);
    }
  });

  it("menolak rumus tidak valid", () => {
    const r = toolConfigSchema.safeParse({
      inputs: [{ key: "a", label: "A", type: "number" }],
      computed: [{ key: "b", label: "B", formula: "a +" }],
    });
    expect(r.success).toBe(false);
  });
});

describe("runToolConfig", () => {
  const cfg = toolConfigSchema.parse(TOOL_PRESETS.budget_503020);

  it("menghitung hasil dan rekomendasi dengan placeholder", () => {
    const out = runToolConfig(cfg, { gaji: 5_000_000, pengeluaran_wajib: 3_000_000 });
    const byKey = Object.fromEntries(out.results.map((r) => [r.key, r.value]));
    expect(byKey).toMatchObject({ kebutuhan: 2_500_000, tabungan: 1_000_000, porsi_wajib: 60 });
    expect(out.recommendations).toHaveLength(1);
    expect(out.recommendations[0]?.variant).toBe("warning");
    expect(out.recommendations[0]?.text).toContain("60%");
  });

  it("menolak input tidak valid & kunci asing", () => {
    expect(() => runToolConfig(cfg, { gaji: "banyak", pengeluaran_wajib: 1 })).toThrow();
    expect(() => runToolConfig(cfg, { gaji: -1, pengeluaran_wajib: 1 })).toThrow();
    expect(() => runToolConfig(cfg, { gaji: 1, pengeluaran_wajib: 1, x: 1 })).toThrow();
  });

  it("definisi publik tidak memuat rumus maupun aturan", () => {
    const pub = JSON.stringify(toPublicDefinition(cfg));
    expect(pub).not.toContain("formula");
    expect(pub).not.toContain("gaji * 0.5");
    expect(pub).not.toContain("porsi_wajib > 50");
    expect(pub).not.toContain("recommendations");
  });
});
