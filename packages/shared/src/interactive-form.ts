import type { z } from "zod";
import {
  type AnimChartAttrs,
  animChartAttrsSchema,
  type QuizAttrs,
  quizAttrsSchema,
  type ToolEmbedAttrs,
  toolEmbedAttrsSchema,
} from "./ebook";

/**
 * Formulir unsur interaktif bab di Studio (D42): nilai awal, pembersihan isian kosong, dan
 * validasi dengan skema yang sama dengan API, plus pesan galat yang ramah penulis.
 */
export type InteractiveKind = "quiz" | "toolEmbed" | "animChart";
export type InteractiveAttrsOf = {
  quiz: QuizAttrs;
  toolEmbed: ToolEmbedAttrs;
  animChart: AnimChartAttrs;
};

export const INTERACTIVE_SCHEMAS: Record<InteractiveKind, z.ZodType> = {
  quiz: quizAttrsSchema,
  toolEmbed: toolEmbedAttrsSchema,
  animChart: animChartAttrsSchema,
};

export const INTERACTIVE_KEYS: Record<InteractiveKind, string[]> = {
  quiz: ["id", "title", "intro", "questions", "results"],
  toolEmbed: ["slug", "title", "intro"],
  animChart: ["title", "kind", "format", "items", "note"],
};

export const DEFAULT_INTERACTIVE_ATTRS: InteractiveAttrsOf = {
  quiz: {
    id: "",
    title: "",
    intro: "",
    questions: [
      {
        q: "",
        options: [
          { label: "Ya", points: 1 },
          { label: "Tidak", points: 0 },
        ],
      },
    ],
    results: [
      { min: 0, max: 0, title: "", text: "" },
      { min: 1, max: 1, title: "", text: "" },
    ],
  },
  toolEmbed: { slug: "", title: "", intro: "" },
  animChart: {
    title: "",
    kind: "bars",
    format: "number",
    items: [{ label: "", value: 0 }],
    note: "",
  },
};

export const interactiveSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export function pickInteractive(kind: InteractiveKind, attrs: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of INTERACTIVE_KEYS[kind]) out[k] = attrs[k];
  return out;
}

/** Bersihkan isian formulir lalu validasi. Mengembalikan atribut siap simpan atau pesan galat. */
export function finalizeInteractive<K extends InteractiveKind>(
  kind: K,
  draft: InteractiveAttrsOf[K],
): { ok: true; attrs: InteractiveAttrsOf[K] } | { ok: false; errors: string[] } {
  const value: Record<string, unknown> = { ...draft };
  // Isian opsional yang kosong disimpan sebagai null (judul kuis/grafik tetap wajib).
  const optional = kind === "toolEmbed" ? ["title", "intro"] : ["intro", "note"];
  for (const k of optional) {
    if (typeof value[k] === "string" && (value[k] as string).trim() === "") value[k] = null;
  }
  if (kind === "quiz" && !value.id) value.id = interactiveSlug(String(value.title ?? ""));
  const r = INTERACTIVE_SCHEMAS[kind].safeParse(value);
  if (r.success) return { ok: true, attrs: r.data as InteractiveAttrsOf[K] };
  return {
    ok: false,
    errors: r.error.issues.slice(0, 6).map(humanizeIssue),
  };
}

const FIELD_NAMES: Record<string, string> = {
  id: "Id kuis",
  title: "Judul",
  intro: "Pengantar",
  questions: "Pertanyaan",
  q: "teks pertanyaan",
  options: "Pilihan",
  label: "label",
  points: "poin",
  results: "Hasil",
  min: "skor minimal",
  max: "skor maksimal",
  text: "penjelasan",
  slug: "Tool",
  items: "Data",
  value: "nilai",
  color: "warna",
  note: "Catatan",
};

/** Ubah galat validasi menjadi kalimat yang bisa dipahami penulis. */
export function humanizeIssue(i: z.core.$ZodIssue): string {
  const where =
    i.path
      .map((p) => (typeof p === "number" ? String(p + 1) : (FIELD_NAMES[String(p)] ?? String(p))))
      .join(" ") || "Isian";
  let what = i.message;
  if (i.code === "too_small")
    what = i.origin === "array" ? "kurang dari jumlah minimal" : "wajib diisi";
  else if (i.code === "too_big") what = "melebihi batas";
  else if (i.code === "invalid_format" && i.path[0] === "slug") what = "belum dipilih";
  else if (i.code === "invalid_type") what = "wajib diisi";
  return `${where}: ${what}`;
}
