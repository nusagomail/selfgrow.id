/**
 * Konfigurasi tool no-code (BLUEPRINT bagian 5): `inputs` (form), `computed` (rumus), dan
 * `recommendations` (aturan + teks). Disimpan sebagai `tool_definitions.config_json`.
 *
 * Yang disimpan hanya teks rumus. Server mem-parse ulang rumus setiap kali menyimpan dan
 * menjalankan, sehingga pohon logika dari klien tidak pernah dipercaya. Klien hanya menerima
 * `PublicToolDefinition` (form + label hasil), tanpa rumus maupun aturan (D8).
 */
import { z } from "zod";
import {
  evaluate,
  FORMULA_FUNCTIONS,
  FormulaError,
  type Logic,
  parseFormula,
  type Value,
} from "./formula";
import { slugSchema } from "./schemas";

const keySchema = z
  .string()
  .regex(/^[a-z][a-z0-9_]{0,39}$/, "Kunci: huruf kecil, angka, garis bawah, diawali huruf");

const RESERVED_KEYS = new Set(["true", "false", "null", ...Object.keys(FORMULA_FUNCTIONS)]);

export const TOOL_INPUT_TYPES = ["number", "text", "select", "boolean"] as const;
export const TOOL_OUTPUT_FORMATS = ["number", "currency_idr", "percent", "text"] as const;
export const TOOL_VARIANTS = ["tip", "info", "warning"] as const;

const optionSchema = z.object({
  value: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
});

export const toolInputSchema = z
  .object({
    key: keySchema,
    label: z.string().trim().min(1).max(200),
    type: z.enum(TOOL_INPUT_TYPES),
    required: z.boolean().default(true),
    help: z.string().max(500).optional(),
    placeholder: z.string().max(200).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().positive().optional(),
    unit: z.string().max(20).optional(),
    options: z.array(optionSchema).max(50).optional(),
  })
  .refine((i) => i.type !== "select" || (i.options?.length ?? 0) > 0, {
    message: "Pilihan wajib diisi untuk input jenis pilihan",
    path: ["options"],
  });
export type ToolInput = z.infer<typeof toolInputSchema>;

export const toolComputedSchema = z.object({
  key: keySchema,
  label: z.string().trim().min(1).max(200),
  formula: z.string().trim().min(1).max(1000),
  format: z.enum(TOOL_OUTPUT_FORMATS).default("number"),
  /** false = nilai antara, tidak ditampilkan ke pengguna. */
  show: z.boolean().default(true),
});

export const toolRecommendationSchema = z.object({
  when: z.string().trim().min(1).max(1000),
  /** Teks boleh memuat {{kunci}} yang diganti nilai terformat. */
  text: z.string().trim().min(1).max(2000),
  variant: z.enum(TOOL_VARIANTS).default("tip"),
});

export const toolConfigSchema = z
  .object({
    version: z.literal(1).default(1),
    intro: z.string().max(2000).optional(),
    submitLabel: z.string().max(60).optional(),
    inputs: z.array(toolInputSchema).min(1).max(40),
    computed: z.array(toolComputedSchema).min(1).max(40),
    recommendations: z.array(toolRecommendationSchema).max(40).default([]),
  })
  .superRefine((cfg, ctx) => {
    // Kunci unik, rumus valid, dan hanya merujuk input atau hasil yang sudah didefinisikan sebelumnya.
    const known = new Set<string>();
    const add = (key: string, path: (string | number)[]) => {
      if (known.has(key) || RESERVED_KEYS.has(key)) {
        ctx.addIssue({
          code: "custom",
          message: `Kunci "${key}" dipakai dua kali atau terlarang`,
          path,
        });
      }
      known.add(key);
    };
    cfg.inputs.forEach((i, idx) => {
      add(i.key, ["inputs", idx, "key"]);
    });
    const check = (formula: string, path: (string | number)[]) => {
      try {
        const { vars } = parseFormula(formula);
        for (const v of vars) {
          if (!known.has(v)) {
            ctx.addIssue({ code: "custom", message: `"${v}" belum didefinisikan`, path });
          }
        }
      } catch (e) {
        ctx.addIssue({
          code: "custom",
          message: e instanceof FormulaError ? e.message : "Rumus tidak valid",
          path,
        });
      }
    };
    cfg.computed.forEach((c, idx) => {
      check(c.formula, ["computed", idx, "formula"]);
      add(c.key, ["computed", idx, "key"]);
    });
    cfg.recommendations.forEach((r, idx) => {
      check(r.when, ["recommendations", idx, "when"]);
    });
  });
export type ToolConfig = z.infer<typeof toolConfigSchema>;

// ---------------------------------------------------------------------------
// Definisi publik (dikirim ke klien) & hasil run
// ---------------------------------------------------------------------------

export interface PublicToolDefinition {
  intro?: string;
  submitLabel?: string;
  inputs: ToolInput[];
  outputs: { key: string; label: string; format: (typeof TOOL_OUTPUT_FORMATS)[number] }[];
}

/** Hanya form & label. Rumus dan aturan rekomendasi TIDAK ikut (D8). */
export function toPublicDefinition(cfg: ToolConfig): PublicToolDefinition {
  return {
    intro: cfg.intro,
    submitLabel: cfg.submitLabel,
    inputs: cfg.inputs,
    outputs: cfg.computed
      .filter((c) => c.show)
      .map(({ key, label, format }) => ({ key, label, format })),
  };
}

export interface ToolRunResult {
  results: { key: string; label: string; value: Value; display: string }[];
  recommendations: { text: string; variant: (typeof TOOL_VARIANTS)[number] }[];
}

export function formatValue(value: Value, format: (typeof TOOL_OUTPUT_FORMATS)[number]): string {
  if (value === null) return "–";
  if (format === "text" || typeof value !== "number") return String(value);
  if (format === "currency_idr") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (format === "percent") {
    return `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value)}%`;
  }
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value);
}

/** Bangun skema Zod dari definisi input untuk memvalidasi isian pengguna. */
export function buildInputSchema(inputs: ToolInput[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const i of inputs) {
    let s: z.ZodTypeAny;
    if (i.type === "number") {
      let n = z.number().finite();
      if (i.min !== undefined) n = n.min(i.min);
      if (i.max !== undefined) n = n.max(i.max);
      s = n;
    } else if (i.type === "boolean") {
      s = z.boolean();
    } else if (i.type === "select") {
      const values = (i.options ?? []).map((o) => o.value);
      s = z.string().refine((v) => values.includes(v), "Pilihan tidak valid");
    } else {
      s = z.string().max(2000);
    }
    shape[i.key] = i.required ? s : s.nullish();
  }
  return z.object(shape).strict();
}

/** Jalankan tool: validasi input, hitung rumus berurutan, pilih rekomendasi. Hanya di server. */
export function runToolConfig(cfg: ToolConfig, rawInput: unknown): ToolRunResult {
  const input = buildInputSchema(cfg.inputs).parse(rawInput) as Record<string, Value | undefined>;
  const data: Record<string, Value> = Object.create(null);
  for (const i of cfg.inputs) data[i.key] = input[i.key] ?? null;

  const compiled = (formula: string): Logic => parseFormula(formula).logic;
  const results: ToolRunResult["results"] = [];
  const display: Record<string, string> = Object.create(null);
  for (const c of cfg.computed) {
    const value = evaluate(compiled(c.formula), data);
    data[c.key] = value;
    display[c.key] = formatValue(value, c.format);
    if (c.show)
      results.push({ key: c.key, label: c.label, value, display: display[c.key] as string });
  }
  for (const i of cfg.inputs) {
    if (!(i.key in display)) display[i.key] = data[i.key] === null ? "–" : String(data[i.key]);
  }

  const recommendations: ToolRunResult["recommendations"] = [];
  for (const r of cfg.recommendations) {
    const hit = evaluate(compiled(r.when), data);
    if (hit !== null && hit !== false && hit !== 0 && hit !== "") {
      recommendations.push({
        variant: r.variant,
        text: r.text.replace(
          /\{\{\s*([a-z][a-z0-9_]*)\s*\}\}/g,
          (_, k: string) => display[k] ?? "",
        ),
      });
    }
  }
  return { results, recommendations };
}

// ---------------------------------------------------------------------------
// Payload API
// ---------------------------------------------------------------------------

export const createToolBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  summary: z.string().trim().max(1000).optional(),
  preset: z.enum(["blank", "budget_503020"]).default("blank"),
});

export const saveToolBodySchema = z.object({
  config: toolConfigSchema,
  quotaPerMonth: z.number().int().min(1).max(100_000).nullable().optional(),
});

export const testRunBodySchema = z.object({
  config: toolConfigSchema,
  input: z.record(z.string(), z.unknown()),
});

export const runToolBodySchema = z.object({
  input: z.record(z.string(), z.unknown()),
});

/** Kuota run default per user per bulan bila tool tidak mengatur sendiri (deteksi scraping). */
export const DEFAULT_TOOL_RUN_QUOTA = 1000;

// ---------------------------------------------------------------------------
// Contoh siap pakai di Studio
// ---------------------------------------------------------------------------

export const TOOL_PRESETS: Record<"blank" | "budget_503020", ToolConfig> = {
  blank: {
    version: 1,
    inputs: [{ key: "angka", label: "Angka", type: "number", required: true }],
    computed: [
      { key: "hasil", label: "Hasil", formula: "angka * 2", format: "number", show: true },
    ],
    recommendations: [],
  },
  budget_503020: {
    version: 1,
    intro: "Bagi gaji bulananmu dengan aturan 50/30/20: kebutuhan, keinginan, tabungan.",
    submitLabel: "Hitung anggaran",
    inputs: [
      {
        key: "gaji",
        label: "Gaji bersih per bulan",
        type: "number",
        required: true,
        min: 0,
        unit: "Rp",
        placeholder: "5000000",
      },
      {
        key: "pengeluaran_wajib",
        label: "Pengeluaran wajib (kos, cicilan, makan)",
        type: "number",
        required: true,
        min: 0,
        unit: "Rp",
      },
    ],
    computed: [
      {
        key: "kebutuhan",
        label: "Batas kebutuhan (50%)",
        formula: "gaji * 0.5",
        format: "currency_idr",
        show: true,
      },
      {
        key: "keinginan",
        label: "Batas keinginan (30%)",
        formula: "gaji * 0.3",
        format: "currency_idr",
        show: true,
      },
      {
        key: "tabungan",
        label: "Target tabungan (20%)",
        formula: "gaji * 0.2",
        format: "currency_idr",
        show: true,
      },
      {
        key: "porsi_wajib",
        label: "Porsi pengeluaran wajib",
        formula: "round(pengeluaran_wajib / gaji * 100, 1)",
        format: "percent",
        show: true,
      },
    ],
    recommendations: [
      {
        when: "porsi_wajib > 50",
        text: "Pengeluaran wajibmu {{porsi_wajib}} dari gaji, di atas batas 50%. Mulai dari pos terbesar: bisakah dikurangi atau dinegosiasi?",
        variant: "warning",
      },
      {
        when: "porsi_wajib <= 50",
        text: "Pengeluaran wajibmu masih di bawah 50%. Sisihkan {{tabungan}} di awal bulan sebelum belanja lain.",
        variant: "tip",
      },
    ],
  },
};
