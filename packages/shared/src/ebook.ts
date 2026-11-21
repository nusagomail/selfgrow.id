/**
 * Format isi bab ebook (BLUEPRINT bagian 5): JSON Tiptap dengan daftar node & mark yang
 * diizinkan. Semua isi bab divalidasi skema ini saat disimpan dari Studio, sehingga
 * renderer hanya pernah menerima struktur yang dikenalnya (tanpa HTML mentah).
 */
import { z } from "zod";
import { slugSchema } from "./schemas";

const MAX_TEXT = 20_000;

/** Hanya tautan http(s) dan mailto. Menolak `javascript:` dan skema lain. */
export const safeHrefSchema = z
  .string()
  .max(2048)
  .refine((v) => /^(https?:\/\/|mailto:)/i.test(v), "Tautan harus http(s) atau mailto");

/**
 * Gambar hanya dari aset platform sendiri (`/api/v1/assets/{id}`, tanpa path lain) atau https.
 * Pola ketat mencegah path traversal ke endpoint lain (review keamanan PR #6).
 */
export const safeImageSrcSchema = z
  .string()
  .max(2048)
  .refine(
    (v) => /^\/api\/v1\/assets\/[A-Za-z0-9_-]+$/.test(v) || /^https:\/\/[^\s]+$/.test(v),
    "Sumber gambar tidak diizinkan",
  );

const markSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("bold") }),
  z.object({ type: z.literal("italic") }),
  z.object({ type: z.literal("underline") }),
  z.object({ type: z.literal("strike") }),
  z.object({ type: z.literal("code") }),
  z.object({
    type: z.literal("link"),
    attrs: z.object({
      href: safeHrefSchema,
      target: z.literal("_blank").nullish(),
      rel: z.string().max(100).nullish(),
      class: z.null().optional(),
    }),
  }),
]);
export type EbookMark = z.infer<typeof markSchema>;

/**
 * Varian kotak (D40): tips, info, perhatian, ditambah unsur buku pengembangan diri:
 * renungkan (pertanyaan refleksi), fakta (data/sains bersumber), intisari bab, latihan.
 */
export const CALLOUT_VARIANTS = [
  "tip",
  "info",
  "warning",
  "reflect",
  "fact",
  "summary",
  "exercise",
] as const;

/** Label tampilan tiap varian kotak (Bahasa Indonesia). */
export const CALLOUT_LABELS: Record<(typeof CALLOUT_VARIANTS)[number], string> = {
  tip: "Tips",
  info: "Info",
  warning: "Perhatian",
  reflect: "Renungkan",
  fact: "Fakta",
  summary: "Intisari",
  exercise: "Latihan",
};

/** Batas panjang nama tokoh pada kutipan. */
const MAX_CITE = 200;

export type EbookNode =
  | { type: "text"; text: string; marks?: EbookMark[] }
  | { type: "paragraph"; content?: EbookNode[] }
  | { type: "heading"; attrs: { level: 2 | 3 | 4 }; content?: EbookNode[] }
  | { type: "bulletList"; content: EbookNode[] }
  | { type: "orderedList"; attrs?: { start?: number }; content: EbookNode[] }
  | { type: "listItem"; content: EbookNode[] }
  | { type: "blockquote"; attrs?: { cite?: string | null }; content: EbookNode[] }
  | { type: "horizontalRule" }
  | { type: "hardBreak" }
  | { type: "image"; attrs: { src: string; alt?: string | null; title?: string | null } }
  | {
      type: "callout";
      attrs: { variant: (typeof CALLOUT_VARIANTS)[number] };
      content: EbookNode[];
    }
  | { type: "quiz"; attrs: QuizAttrs }
  | { type: "toolEmbed"; attrs: ToolEmbedAttrs }
  | { type: "animChart"; attrs: AnimChartAttrs }
  | { type: "table"; content: EbookNode[] }
  | { type: "tableRow"; content: EbookNode[] }
  | {
      type: "tableHeader" | "tableCell";
      attrs?: { colspan?: number; rowspan?: number; colwidth?: number[] | null };
      content: EbookNode[];
    };

/**
 * Unsur interaktif di dalam bab (D42): kuis/tes diri dengan skor langsung, tool yang ditanam,
 * dan grafik bergerak. Semua berupa data (tanpa kode); skor kuis dihitung dari poin pilihan.
 */
export const quizAttrsSchema = z
  .object({
    /** Id kuis dalam satu ebook; kuis yang sama di bab lain memakai id yang sama (tes ulang). */
    id: z.string().regex(/^[a-z0-9][a-z0-9-]{0,59}$/, "Id kuis: huruf kecil, angka, tanda hubung"),
    title: z.string().trim().min(1).max(200),
    intro: z.string().max(1000).nullish(),
    questions: z
      .array(
        z.object({
          q: z.string().trim().min(1).max(500),
          options: z
            .array(
              z.object({
                label: z.string().trim().min(1).max(200),
                points: z.number().int().min(0).max(100),
              }),
            )
            .min(2)
            .max(6),
        }),
      )
      .min(1)
      .max(20),
    results: z
      .array(
        z.object({
          min: z.number().int().min(0).max(2000),
          max: z.number().int().min(0).max(2000),
          title: z.string().trim().min(1).max(200),
          text: z.string().max(1000).default(""),
        }),
      )
      .min(1)
      .max(6),
  })
  .refine((a) => a.results.every((r) => r.min <= r.max), {
    message: "Rentang skor hasil tidak valid",
    path: ["results"],
  });
export type QuizAttrs = z.infer<typeof quizAttrsSchema>;

export const toolEmbedAttrsSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .max(120),
  title: z.string().max(200).nullish(),
  intro: z.string().max(1000).nullish(),
});
export type ToolEmbedAttrs = z.infer<typeof toolEmbedAttrsSchema>;

export const ANIM_CHART_KINDS = ["bars", "counter"] as const;
export const ANIM_CHART_FORMATS = ["number", "rupiah", "percent"] as const;
export const animChartAttrsSchema = z.object({
  title: z.string().trim().min(1).max(200),
  kind: z.enum(ANIM_CHART_KINDS),
  format: z.enum(ANIM_CHART_FORMATS).default("number"),
  items: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(100),
        value: z.number().finite().min(0).max(1e13),
        color: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/)
          .nullish(),
      }),
    )
    .min(1)
    .max(12),
  note: z.string().max(500).nullish(),
});
export type AnimChartAttrs = z.infer<typeof animChartAttrsSchema>;

const text = z.object({
  type: z.literal("text"),
  text: z.string().max(MAX_TEXT),
  marks: z.array(markSchema).max(10).optional(),
});

export const ebookNodeSchema: z.ZodType<EbookNode> = z.lazy(() =>
  z.discriminatedUnion("type", [
    text,
    z.object({ type: z.literal("paragraph"), content: z.array(ebookNodeSchema).optional() }),
    z.object({
      type: z.literal("heading"),
      attrs: z.object({ level: z.union([z.literal(2), z.literal(3), z.literal(4)]) }),
      content: z.array(ebookNodeSchema).optional(),
    }),
    z.object({ type: z.literal("bulletList"), content: z.array(ebookNodeSchema) }),
    z.object({
      type: z.literal("orderedList"),
      attrs: z.object({ start: z.number().int().min(0).optional() }).optional(),
      content: z.array(ebookNodeSchema),
    }),
    z.object({ type: z.literal("listItem"), content: z.array(ebookNodeSchema) }),
    z.object({
      type: z.literal("blockquote"),
      // Nama tokoh kutipan (opsional, D40).
      attrs: z.object({ cite: z.string().max(MAX_CITE).nullish() }).optional(),
      content: z.array(ebookNodeSchema),
    }),
    z.object({ type: z.literal("horizontalRule") }),
    z.object({ type: z.literal("hardBreak") }),
    z.object({
      type: z.literal("image"),
      attrs: z.object({
        src: safeImageSrcSchema,
        alt: z.string().max(500).nullish(),
        title: z.string().max(500).nullish(),
      }),
    }),
    z.object({
      type: z.literal("callout"),
      attrs: z.object({ variant: z.enum(CALLOUT_VARIANTS) }),
      content: z.array(ebookNodeSchema),
    }),
    z.object({ type: z.literal("quiz"), attrs: quizAttrsSchema }),
    z.object({ type: z.literal("toolEmbed"), attrs: toolEmbedAttrsSchema }),
    z.object({ type: z.literal("animChart"), attrs: animChartAttrsSchema }),
    z.object({ type: z.literal("table"), content: z.array(ebookNodeSchema).max(500) }),
    z.object({ type: z.literal("tableRow"), content: z.array(ebookNodeSchema).max(30) }),
    ...(["tableHeader", "tableCell"] as const).map((t) =>
      z.object({
        type: z.literal(t),
        attrs: z
          .object({
            colspan: z.number().int().min(1).max(30).optional(),
            rowspan: z.number().int().min(1).max(500).optional(),
            colwidth: z.array(z.number().int().min(0).max(2000)).max(30).nullish(),
          })
          .optional(),
        content: z.array(ebookNodeSchema),
      }),
    ),
  ]),
) as z.ZodType<EbookNode>;

/** Batas bentuk dokumen, dicek iteratif SEBELUM validasi rekursif (cegah stack overflow). */
export const EBOOK_DOC_LIMITS = { maxDepth: 24, maxNodes: 20_000 } as const;

export function checkDocShape(raw: unknown): boolean {
  const stack: { node: unknown; depth: number }[] = [{ node: raw, depth: 0 }];
  let count = 0;
  while (stack.length > 0) {
    const item = stack.pop() as { node: unknown; depth: number };
    if (++count > EBOOK_DOC_LIMITS.maxNodes) return false;
    if (item.depth > EBOOK_DOC_LIMITS.maxDepth) return false;
    const content = (item.node as { content?: unknown } | null)?.content;
    if (content === undefined) continue;
    if (!Array.isArray(content)) return false;
    for (const child of content) stack.push({ node: child, depth: item.depth + 1 });
  }
  return true;
}

const ebookDocInner = z.object({
  type: z.literal("doc"),
  content: z.array(ebookNodeSchema).max(5000),
});

export const ebookDocSchema = z
  .unknown()
  .refine(checkDocShape, "Dokumen terlalu dalam atau terlalu besar")
  .pipe(ebookDocInner);
export type EbookDoc = z.infer<typeof ebookDocInner>;

export const EMPTY_EBOOK_DOC: EbookDoc = { type: "doc", content: [{ type: "paragraph" }] };

/** Jumlah kata dari dokumen, untuk `ebook_chapters.word_count`. */
export function countWords(doc: EbookDoc): number {
  let n = 0;
  const walk = (nodes: EbookNode[] | undefined) => {
    for (const node of nodes ?? []) {
      if (node.type === "text") n += node.text.split(/\s+/).filter(Boolean).length;
      else if ("content" in node) walk(node.content);
    }
  };
  walk(doc.content);
  return n;
}

// ---------------------------------------------------------------------------
// Payload API Studio & reader
// ---------------------------------------------------------------------------

export const createEbookBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  summary: z.string().trim().max(1000).optional(),
});

export const updateContentBodySchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    slug: slugSchema,
    summary: z.string().trim().max(1000).nullable(),
    level: z.enum(["beginner", "intermediate", "advanced"]).nullable(),
    status: z.enum(["draft", "published"]),
    /** Topik (kategori anak). Kategori induk ikut dari topik. `null` = belum dikelompokkan. */
    categoryId: z.string().min(1).max(100).nullable(),
    /** `free` = terbuka untuk semua user login tanpa langganan (D35); `all` = untuk pelanggan. */
    tier: z.enum(["all", "free"]),
  })
  .partial();

export const createChapterBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
});

export const saveChapterBodySchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    doc: ebookDocSchema,
    isFreePreview: z.boolean(),
    status: z.enum(["draft", "published"]),
  })
  .partial();

export const reorderChaptersBodySchema = z.object({
  chapterIds: z.array(z.string().min(1)).min(1).max(500),
});

export const progressBodySchema = z.object({
  chapterId: z.string().min(1),
  position: z.number().int().min(0).max(1_000_000),
});

/** Simpan skor kuis (D42). Skor dihitung di perangkat pembaca; ini catatan pribadi, bukan nilai resmi. */
export const quizResultBodySchema = z
  .object({
    score: z.number().int().min(0).max(2000),
    maxScore: z.number().int().min(0).max(2000),
  })
  .refine((b) => b.score <= b.maxScore, { message: "Skor melebihi skor maksimal" });
export const quizIdSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{0,59}$/);

export const bookmarkBodySchema = z.object({
  chapterId: z.string().min(1),
  note: z.string().trim().max(1000).optional(),
});

export interface ChapterSummary {
  id: string;
  title: string;
  order: number;
  isFreePreview: boolean;
  status: "draft" | "published";
  wordCount: number;
}

export interface EbookSummary {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  status: "draft" | "review" | "published";
  publishedAt: string | null;
  updatedAt: string;
}
