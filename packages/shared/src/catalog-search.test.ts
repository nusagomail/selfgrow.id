import { describe, expect, it } from "vitest";
import { catalogSearchQuerySchema, rankSearch, readyFirst, searchTokens } from "./catalog-search";

const items = [
  {
    title: "Dana Darurat dari Nol",
    summary: "Bantalan keuangan",
    comingSoon: false,
    category: { name: "Keuangan Pribadi" },
    topic: { name: "Dana darurat & menabung" },
  },
  {
    title: "Seni Menabung Tanpa Tersiksa",
    summary: null,
    comingSoon: true,
    category: { name: "Keuangan Pribadi" },
    topic: { name: "Dana darurat & menabung" },
  },
  {
    title: "Kalkulator Target Dana Darurat",
    summary: "Berapa yang kamu butuhkan",
    comingSoon: false,
    category: null,
    topic: null,
  },
  {
    title: "Berani Bilang Tidak",
    summary: "Menolak tanpa rasa bersalah",
    comingSoon: false,
    category: { name: "Komunikasi & Relasi" },
    topic: null,
  },
];

describe("pencarian katalog (D52)", () => {
  it("token: huruf kecil, tanpa tanda baca, tanpa duplikat, maks 5", () => {
    expect(searchTokens("  Dana-Darurat!! dana ")).toEqual(["dana", "darurat"]);
    expect(searchTokens("a b")).toEqual([]);
    expect(searchTokens("satu dua tiga empat lima enam")).toHaveLength(5);
  });
  it("semua token harus cocok; yang siap dipakai lebih dulu", () => {
    const r = rankSearch(items, "dana darurat");
    expect(r.map((i) => i.title)).toEqual([
      "Dana Darurat dari Nol",
      "Kalkulator Target Dana Darurat",
      "Seni Menabung Tanpa Tersiksa",
    ]);
    expect(rankSearch(items, "menolak").map((i) => i.title)).toEqual(["Berani Bilang Tidak"]);
    expect(rankSearch(items, "zzz")).toEqual([]);
  });
  it("validasi kueri", () => {
    expect(catalogSearchQuerySchema.safeParse({ q: "a" }).success).toBe(false);
    expect(catalogSearchQuerySchema.safeParse({ q: "x".repeat(61) }).success).toBe(false);
    expect(catalogSearchQuerySchema.safeParse({ q: "gaji", type: "tool" }).success).toBe(true);
    expect(catalogSearchQuerySchema.safeParse({ q: "gaji", type: "lain" }).success).toBe(false);
  });
  it("readyFirst menjaga urutan", () => {
    expect(readyFirst(items).map((i) => i.comingSoon)).toEqual([false, false, false, true]);
  });
});
