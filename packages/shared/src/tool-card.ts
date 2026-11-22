/**
 * Tampilan kartu tool di katalog (D49): tool bukan buku, jadi tidak memakai sampul tegak.
 * Kartu menampilkan ikon sesuai fungsi tool, yang ditebak dari judulnya (konfigurasi tool tidak
 * pernah dikirim ke klien), dan warna yang stabil per slug.
 */
export const TOOL_KINDS = ["hitung", "susun", "cek", "jadwal", "catat"] as const;
export type ToolKind = (typeof TOOL_KINDS)[number];

export const TOOL_KIND_LABEL: Record<ToolKind, string> = {
  hitung: "Kalkulator",
  susun: "Penyusun",
  cek: "Cek cepat",
  jadwal: "Perencana",
  catat: "Refleksi",
};

const RULES: [RegExp, ToolKind][] = [
  [/\b(cek|termometer|tanda|empat tuas)\b/, "cek"],
  [/\b(jadwal|tangga|kapan)\b/, "jadwal"],
  [/\b(catatan|kompas|pemilah|latihan)\b/, "catat"],
  [/\b(penyusun|perakit|pengubah)\b/, "susun"],
  [/\b(kalkulator|pembagi|penilai|neraca|pencari|pengali|penerjemah|hitung)\b/, "hitung"],
];

/** Jenis tool dari judulnya; bawaan "hitung". */
export function toolKind(title: string): ToolKind {
  const t = title.toLowerCase();
  for (const [re, kind] of RULES) if (re.test(t)) return kind;
  return "hitung";
}

/** Indeks warna 0..n-1 yang stabil untuk satu slug. */
export function toolTone(slug: string, n = 6): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % n;
}
