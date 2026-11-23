import { CONTENT_TYPES, type ContentType } from "./constants";
import { VIDEO_SHELF_MIN } from "./video";

/**
 * Pemisahan katalog per jenis konten (D44): etalase menampilkan satu jenis sekaligus (Ebook,
 * Tools, Template, Program, Video), dan kategori dihitung di dalam jenis itu, bukan dicampur.
 */
export const CONTENT_TYPE_TABS: readonly { type: ContentType; param: string; label: string }[] = [
  { type: "ebook", param: "ebook", label: "Ebook" },
  { type: "tool", param: "tools", label: "Tools" },
  { type: "template", param: "template", label: "Template" },
  { type: "program", param: "program", label: "Program" },
  { type: "video", param: "video", label: "Video" },
];

/** Jumlah minimal konten agar tab jenis itu tampil. Kanal Video baru dibuka saat ≥3 video (D54). */
const minCount = (type: ContentType) => (type === "video" ? VIDEO_SHELF_MIN : 1);

/**
 * Tab yang punya cukup konten, urut tetap, beserta jumlahnya. Untuk mengelompokkan hasil yang
 * sudah tersaring (halaman kategori, hasil cari), pakai `{ anyCount: true }`: setiap jenis yang
 * berisi tampil, termasuk video yang belum mencapai batas rak beranda.
 */
export function availableTypeTabs(
  items: readonly { type: string }[],
  opts: { anyCount?: boolean } = {},
) {
  return CONTENT_TYPE_TABS.map((t) => ({
    ...t,
    count: items.filter((i) => i.type === t.type).length,
  })).filter((t) => t.count >= (opts.anyCount ? 1 : minCount(t.type)));
}

/**
 * Jenis aktif dari parameter `?jenis=`. Bila kosong, tidak dikenal, atau jenis itu belum punya
 * konten, pakai tab pertama yang berisi (biasanya Ebook).
 */
export function activeTypeTab(
  param: string | null | undefined,
  items: readonly { type: string }[],
) {
  const tabs = availableTypeTabs(items);
  return tabs.find((t) => t.param === param) ?? tabs[0] ?? null;
}

export const isContentType = (v: string): v is ContentType =>
  (CONTENT_TYPES as readonly string[]).includes(v);
