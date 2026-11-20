/**
 * Template Builder (BLUEPRINT bagian 5). Isi template ditulis di editor yang sama dengan ebook
 * (JSON Tiptap) memakai:
 *   - `{{kunci}}`  → diganti isian pelanggan
 *   - paragraf `{{#if kunci}}` … paragraf `{{/if}}` → bagian bersyarat (tampil bila isian terisi/ya)
 * Variabel (form) memakai skema isian yang sama dengan Tool Builder.
 */
import { z } from "zod";
import { type EbookDoc, type EbookNode, ebookDocSchema } from "./ebook";
import { slugSchema } from "./schemas";
import { buildInputSchema, type ToolInput, toolInputSchema } from "./tool";

export const TEMPLATE_FORMATS = ["docx", "pdf", "xlsx"] as const;
export type TemplateFormat = (typeof TEMPLATE_FORMATS)[number];

/** Kuota unduh default per user per bulan (BLUEPRINT bagian 5). */
export const DEFAULT_DOWNLOAD_QUOTA = 20;

const PLACEHOLDER = /\{\{\s*([a-z][a-z0-9_]*)\s*\}\}/g;
const IF_OPEN = /^\{\{\s*#if\s+([a-z][a-z0-9_]*)\s*\}\}$/;
const IF_CLOSE = /^\{\{\s*\/if\s*\}\}$/;

export const templateConfigSchema = z
  .object({
    variables: z.array(toolInputSchema).min(1).max(40),
    outputFormats: z.array(z.enum(TEMPLATE_FORMATS)).min(1).max(3),
    fileName: z
      .string()
      .trim()
      .min(1)
      .max(80)
      .regex(/^[\p{L}\p{N} _\-{}]+$/u, "Nama file: huruf, angka, spasi, - dan _")
      .optional(),
  })
  .superRefine((cfg, ctx) => {
    const seen = new Set<string>();
    cfg.variables.forEach((v, i) => {
      if (seen.has(v.key)) {
        ctx.addIssue({
          code: "custom",
          message: `Kunci "${v.key}" dipakai dua kali`,
          path: ["variables", i, "key"],
        });
      }
      seen.add(v.key);
    });
  });
export type TemplateConfig = z.infer<typeof templateConfigSchema>;

const plainText = (node: EbookNode): string =>
  node.type === "text"
    ? node.text
    : "content" in node && Array.isArray(node.content)
      ? node.content.map(plainText).join("")
      : "";

/** Kunci yang dipakai di isi template (placeholder & kondisi), untuk validasi di Studio. */
export function templateKeys(doc: EbookDoc): string[] {
  const keys = new Set<string>();
  const walk = (nodes: EbookNode[] | undefined) => {
    for (const n of nodes ?? []) {
      if (n.type === "text") {
        for (const m of n.text.matchAll(PLACEHOLDER)) keys.add(m[1] as string);
      } else if (n.type === "paragraph") {
        const t = plainText(n).trim();
        const open = IF_OPEN.exec(t);
        if (open) keys.add(open[1] as string);
        else walk(n.content);
      } else if ("content" in n) walk(n.content);
    }
  };
  walk(doc.content);
  return [...keys];
}

/** Masalah isi template: kunci tak dikenal & blok {{#if}} yang tidak seimbang. */
export function checkTemplate(doc: EbookDoc, variables: ToolInput[]): string[] {
  const known = new Set(variables.map((v) => v.key));
  const problems = templateKeys(doc)
    .filter((k) => !known.has(k))
    .map((k) => `Isi template memakai {{${k}}} yang belum ada di daftar isian`);
  const walk = (nodes: EbookNode[] | undefined) => {
    let depth = 0;
    for (const n of nodes ?? []) {
      if (n.type === "paragraph") {
        const t = plainText(n).trim();
        if (IF_OPEN.test(t)) depth++;
        else if (IF_CLOSE.test(t)) {
          depth--;
          if (depth < 0) {
            problems.push("Ada {{/if}} tanpa pasangan {{#if …}}");
            depth = 0;
          }
        }
      } else if ("content" in n && Array.isArray(n.content)) walk(n.content);
    }
    if (depth > 0) problems.push("Ada {{#if …}} yang belum ditutup {{/if}}");
  };
  walk(doc.content);
  return problems;
}

const MAX_TEXT_CHARS = 20_000;
const MAX_FILLED_CHARS = 1_000_000;

export class TemplateTooLargeError extends Error {
  constructor() {
    super("Hasil template terlalu besar");
  }
}

export type TemplateValues = Record<string, string | number | boolean | null>;

/** Validasi isian pelanggan dengan skema dari daftar variabel. */
export function parseTemplateInput(cfg: TemplateConfig, raw: unknown): TemplateValues {
  return buildInputSchema(cfg.variables).parse(raw) as TemplateValues;
}

/** Nilai siap tampil: angka diformat, pilihan memakai label, ya/tidak. */
export function displayValues(cfg: TemplateConfig, values: TemplateValues): Record<string, string> {
  const out: Record<string, string> = Object.create(null);
  for (const v of cfg.variables) {
    const raw = values[v.key];
    if (raw === null || raw === undefined || raw === "") out[v.key] = "";
    else if (v.type === "boolean") out[v.key] = raw ? "Ya" : "Tidak";
    else if (v.type === "select")
      out[v.key] = v.options?.find((o) => o.value === raw)?.label ?? String(raw);
    else if (v.type === "number" && typeof raw === "number") {
      out[v.key] = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(raw);
    } else out[v.key] = String(raw);
  }
  return out;
}

const isTruthy = (v: TemplateValues[string]) =>
  !(v === null || v === undefined || v === false || v === "" || v === 0);

/**
 * Isi template: ganti placeholder dan buang bagian bersyarat yang kondisinya salah.
 * Hasilnya tetap dokumen yang lolos `ebookDocSchema` (tanpa HTML), siap diubah ke DOCX/PDF/XLSX.
 */
export function fillTemplate(doc: EbookDoc, cfg: TemplateConfig, values: TemplateValues): EbookDoc {
  const display = displayValues(cfg, values);
  // Ganti placeholder sambil menghitung panjang: berhenti di 20.000 karakter per teks, dan
  // seluruh dokumen dibatasi 1 juta karakter (cegah ledakan ukuran, review keamanan PR #11).
  let budget = MAX_FILLED_CHARS;
  const replace = (text: string) => {
    let out = "";
    let last = 0;
    for (const m of text.matchAll(PLACEHOLDER)) {
      out += text.slice(last, m.index) + (display[m[1] as string] ?? "");
      last = (m.index as number) + m[0].length;
      if (out.length >= MAX_TEXT_CHARS) break;
    }
    if (out.length < MAX_TEXT_CHARS) out += text.slice(last);
    out = Array.from(out.slice(0, MAX_TEXT_CHARS + 1))
      .slice(0, MAX_TEXT_CHARS)
      .join("");
    budget -= out.length;
    if (budget < 0) throw new TemplateTooLargeError();
    return out;
  };

  const fillNodes = (nodes: EbookNode[]): EbookNode[] => {
    const out: EbookNode[] = [];
    const stack: boolean[] = [];
    const visible = () => stack.every(Boolean);
    for (const n of nodes) {
      if (n.type === "paragraph") {
        const t = plainText(n).trim();
        const open = IF_OPEN.exec(t);
        if (open) {
          stack.push(isTruthy(values[open[1] as string] ?? null));
          continue;
        }
        if (IF_CLOSE.test(t)) {
          stack.pop();
          continue;
        }
      }
      if (!visible()) continue;
      out.push(fillNode(n));
    }
    return out;
  };

  const fillNode = (n: EbookNode): EbookNode => {
    if (n.type === "text") return { ...n, text: replace(n.text) };
    if ("content" in n && Array.isArray(n.content)) {
      return { ...n, content: fillNodes(n.content) } as EbookNode;
    }
    return n;
  };

  return ebookDocSchema.parse({ type: "doc", content: fillNodes(doc.content) });
}

/** Nama file unduhan dari pola (boleh memakai {{kunci}}), aman untuk sistem berkas. */
export function buildFileName(
  cfg: TemplateConfig,
  title: string,
  values: TemplateValues,
  format: TemplateFormat,
): string {
  const display = displayValues(cfg, values);
  const base = (cfg.fileName ?? title).replace(PLACEHOLDER, (_, k: string) => display[k] ?? "");
  const safe = base
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N} _-]+/gu, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 80);
  return `${safe || "template"}.${format}`;
}

// ---------------------------------------------------------------------------
// Payload API
// ---------------------------------------------------------------------------

export const createTemplateBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  summary: z.string().trim().max(1000).optional(),
});

export const saveTemplateBodySchema = z.object({
  config: templateConfigSchema,
  body: ebookDocSchema,
});

export const generateTemplateBodySchema = z.object({
  format: z.enum(TEMPLATE_FORMATS),
  input: z.record(z.string(), z.unknown()),
});

export const previewTemplateBodySchema = generateTemplateBodySchema.extend({
  config: templateConfigSchema,
  body: ebookDocSchema,
});

export const STARTER_TEMPLATE: { config: TemplateConfig; body: EbookDoc } = {
  config: {
    variables: [
      { key: "nama", label: "Nama", type: "text", required: true },
      { key: "minggu", label: "Minggu ke-", type: "number", required: true, min: 1, max: 53 },
      { key: "target", label: "Target utama minggu ini", type: "text", required: true },
      { key: "catatan", label: "Catatan tambahan", type: "text", required: false },
    ],
    outputFormats: ["docx", "pdf", "xlsx"],
    fileName: "Rencana Mingguan {{nama}}",
  },
  body: {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Rencana Mingguan {{nama}}" }],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "Minggu ke-{{minggu}} · Target: {{target}}" }],
      },
      {
        type: "table",
        content: [
          {
            type: "tableRow",
            content: ["Hari", "Fokus", "Selesai?"].map((t) => ({
              type: "tableHeader" as const,
              content: [
                { type: "paragraph" as const, content: [{ type: "text" as const, text: t }] },
              ],
            })),
          },
          ...["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((d) => ({
            type: "tableRow" as const,
            content: [d, "", ""].map((t) => ({
              type: "tableCell" as const,
              content: [
                t
                  ? { type: "paragraph" as const, content: [{ type: "text" as const, text: t }] }
                  : { type: "paragraph" as const },
              ],
            })),
          })),
        ],
      },
      { type: "paragraph", content: [{ type: "text", text: "{{#if catatan}}" }] },
      { type: "paragraph", content: [{ type: "text", text: "Catatan: {{catatan}}" }] },
      { type: "paragraph", content: [{ type: "text", text: "{{/if}}" }] },
    ],
  },
};
