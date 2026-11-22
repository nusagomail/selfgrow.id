import { z } from "zod";
import { contentTypeSchema } from "./schemas";

/**
 * Pencarian katalog (D52): supaya pembaca tetap menemukan konten saat katalog bertambah tiap
 * bulan. Kata kunci dipecah jadi token; setiap token harus cocok dengan judul, ringkasan,
 * kategori, atau topik. Hasil diurutkan: yang sudah bisa dipakai lebih dulu, lalu yang cocok
 * di judul.
 */
export const catalogSearchQuerySchema = z.object({
  q: z.string().trim().min(2).max(60),
  type: contentTypeSchema.optional(),
});

/** Token pencarian: huruf kecil, tanpa tanda baca, minimal 2 huruf, maksimal 5 token. */
export function searchTokens(q: string): string[] {
  return [
    ...new Set(
      q
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .split(" ")
        .filter((t) => t.length >= 2),
    ),
  ].slice(0, 5);
}

type Searchable = {
  title: string;
  summary: string | null;
  comingSoon?: boolean;
  category?: { name: string } | null;
  topic?: { name: string } | null;
};

/** Skor kecocokan; 0 berarti ada token yang tidak cocok sama sekali. */
export function searchScore(item: Searchable, tokens: string[]): number {
  const norm = (s: string | null | undefined) =>
    (s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
  const title = norm(item.title);
  const rest = `${norm(item.summary)} ${norm(item.category?.name)} ${norm(item.topic?.name)}`;
  let score = 0;
  for (const t of tokens) {
    if (title.includes(t)) score += title.startsWith(t) || title.includes(` ${t}`) ? 4 : 3;
    else if (rest.includes(t)) score += 1;
    else return 0;
  }
  return score + (item.comingSoon ? 0 : 10);
}

/** Saring dan urutkan hasil di sisi klien atau server. */
export function rankSearch<T extends Searchable>(items: T[], q: string): T[] {
  const tokens = searchTokens(q);
  if (tokens.length === 0) return [];
  return items
    .map((item) => ({ item, score: searchScore(item, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "id"))
    .map((r) => r.item);
}

/** Urutan rak: yang sudah bisa dipakai lebih dulu, urutan asal dipertahankan (D52). */
export function readyFirst<T extends { comingSoon?: boolean }>(items: T[]): T[] {
  return [...items.filter((i) => !i.comingSoon), ...items.filter((i) => i.comingSoon)];
}
