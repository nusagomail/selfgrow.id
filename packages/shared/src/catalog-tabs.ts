import { CONTENT_TYPES, type ContentType } from "./constants";

/**
 * Pemisahan katalog per jenis konten (D44): etalase menampilkan satu jenis sekaligus (Ebook,
 * Tools, Template, Program), dan kategori dihitung di dalam jenis itu, bukan dicampur.
 */
export const CONTENT_TYPE_TABS: readonly { type: ContentType; param: string; label: string }[] = [
  { type: "ebook", param: "ebook", label: "Ebook" },
  { type: "tool", param: "tools", label: "Tools" },
  { type: "template", param: "template", label: "Template" },
  { type: "program", param: "program", label: "Program" },
];

/** Tab yang punya konten, urut tetap, beserta jumlahnya. */
export function availableTypeTabs(items: readonly { type: string }[]) {
  return CONTENT_TYPE_TABS.map((t) => ({
    ...t,
    count: items.filter((i) => i.type === t.type).length,
  })).filter((t) => t.count > 0);
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
