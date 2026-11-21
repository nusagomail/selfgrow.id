import type { EbookNode } from "@selfgrow/shared";

/**
 * Tata letak tabel di buku (D39). Tabel dengan baris judul dan 4 kolom atau lebih ditandai
 * `wide`: di layar sempit tiap baris tampil sebagai kartu berlabel (lihat book.css), karena
 * tabel tidak boleh digulir ke samping di halaman yang dibalik dengan geser.
 */
export type TableLayout = { wide: boolean; labels: string[] };

export const WIDE_TABLE_MIN_COLUMNS = 4;

/** Teks polos sebuah node (untuk label kolom). */
export function plainText(node: EbookNode): string {
  if (node.type === "text") return node.text;
  if ("content" in node && Array.isArray(node.content)) {
    return node.content.map(plainText).join(" ").replace(/\s+/g, " ").trim();
  }
  return "";
}

export function tableLayout(table: EbookNode): TableLayout {
  const rows = table.type === "table" ? table.content.filter((r) => r.type === "tableRow") : [];
  const head = rows[0];
  const cells = head && "content" in head && Array.isArray(head.content) ? head.content : [];
  const isHeader = cells.length > 0 && cells.every((c) => c.type === "tableHeader");
  // Sel gabungan (colspan/rowspan) membuat label per kolom ambigu: biarkan sebagai tabel biasa.
  const merged = rows.some(
    (r) =>
      "content" in r &&
      Array.isArray(r.content) &&
      r.content.some(
        (c) =>
          (c.type === "tableCell" || c.type === "tableHeader") &&
          ((c.attrs?.colspan ?? 1) > 1 || (c.attrs?.rowspan ?? 1) > 1),
      ),
  );
  if (!isHeader || merged) return { wide: false, labels: [] };
  const labels = cells.map(plainText);
  return { wide: labels.length >= WIDE_TABLE_MIN_COLUMNS, labels };
}
