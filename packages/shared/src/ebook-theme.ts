import { z } from "zod";

/**
 * Tema baca per ebook (D51): supaya isi setiap buku di reader ikut identitas visualnya, bukan
 * satu tampilan seragam. Tema hanya mengatur aksen, huruf judul, gaya kotak, ornamen, dan
 * tekstur kertas. Latar dan warna teks tetap mengikuti pilihan pembaca (terang, sepia, malam)
 * supaya keterbacaan terjaga.
 */
export const EBOOK_HEADING_FONTS = ["sans", "serif", "hand", "mono", "condensed"] as const;
export const EBOOK_CALLOUT_STYLES = ["soft", "outline", "card", "tape", "bar"] as const;
export const EBOOK_ORNAMENTS = ["line", "dots", "wave", "star", "none"] as const;
export const EBOOK_PAPERS = ["plain", "grid", "lined", "dots"] as const;

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Warna harus berbentuk #RRGGBB");

export const ebookThemeSchema = z.object({
  /** Warna utama buku: judul bab, ornamen, tautan, kuis. */
  accent: hex,
  /** Warna kedua untuk kotak fakta dan grafik; bawaan sama dengan aksen. */
  second: hex.optional(),
  heading: z.enum(EBOOK_HEADING_FONTS).default("sans"),
  callout: z.enum(EBOOK_CALLOUT_STYLES).default("soft"),
  ornament: z.enum(EBOOK_ORNAMENTS).default("line"),
  paper: z.enum(EBOOK_PAPERS).default("plain"),
});
export type EbookTheme = z.infer<typeof ebookThemeSchema>;

/** Baca tema yang tersimpan (JSON di database). Tema rusak atau kosong dianggap tidak ada. */
export function parseEbookTheme(raw: string | null | undefined): EbookTheme | null {
  if (!raw) return null;
  try {
    const r = ebookThemeSchema.safeParse(JSON.parse(raw));
    return r.success ? r.data : null;
  } catch {
    return null;
  }
}

/** Atribut data-* dan variabel CSS untuk elemen `.book`. */
export function ebookThemeAttrs(theme: EbookTheme | null): {
  data: Record<string, string>;
  vars: Record<string, string>;
} {
  if (!theme) return { data: {}, vars: {} };
  return {
    data: {
      "data-heading": theme.heading,
      "data-callout": theme.callout,
      "data-ornament": theme.ornament,
      "data-paper": theme.paper,
    },
    vars: {
      "--theme-accent": theme.accent,
      "--theme-second": theme.second ?? theme.accent,
    },
  };
}
