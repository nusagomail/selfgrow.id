import { describe, expect, it } from "vitest";
import {
  clampScreen,
  foldGeometry,
  fractionOf,
  layoutFor,
  pagesFor,
  planTurn,
  screenAtFraction,
  screensFor,
  stateFor,
} from "./pager";

describe("layoutFor", () => {
  it("satu halaman di HP, lebar teks = layar dikurangi margin", () => {
    const l = layoutFor(390);
    expect(l.cols).toBe(1);
    expect(l.step).toBe(390);
    expect(l.colWidth).toBe(390 - 2 * l.pad);
  });

  it("dua halaman berdampingan di layar lebar", () => {
    const l = layoutFor(1100);
    expect(l.cols).toBe(2);
    expect(l.step).toBe(550);
    expect(l.colWidth * 2 + l.pad * 4).toBe(1100);
  });

  it("ambang dua halaman bisa diatur", () => {
    expect(layoutFor(800, 700).cols).toBe(2);
    expect(layoutFor(800).cols).toBe(1);
  });

  it("lebar nol tidak menghasilkan nilai negatif", () => {
    const l = layoutFor(0);
    expect(l.colWidth).toBeGreaterThan(0);
    expect(l.step).toBeGreaterThan(0);
  });
});

describe("pagesFor & screensFor", () => {
  const l = layoutFor(400);
  it("penanda di halaman pertama = 1 halaman", () => {
    expect(pagesFor(l.pad + 10, l)).toBe(1);
    expect(pagesFor(-5, l)).toBe(1);
  });
  it("penanda di halaman ke-4", () => {
    expect(pagesFor(3 * l.step + l.pad, l)).toBe(4);
  });
  it("layar = halaman dibagi kolom, dibulatkan ke atas", () => {
    expect(screensFor(5, 1)).toBe(5);
    expect(screensFor(5, 2)).toBe(3);
    expect(screensFor(0, 2)).toBe(1);
  });
});

describe("posisi baca", () => {
  it("clampScreen menjaga di dalam rentang", () => {
    expect(clampScreen(-2, 5)).toBe(0);
    expect(clampScreen(9, 5)).toBe(4);
    expect(clampScreen(Number.NaN, 5)).toBe(0);
  });
  it("fraksi bolak-balik konsisten", () => {
    expect(fractionOf(0, 1)).toBe(0);
    expect(fractionOf(2, 5)).toBe(0.5);
    expect(screenAtFraction(0.5, 5)).toBe(2);
    expect(screenAtFraction(1, 9)).toBe(8);
    expect(screenAtFraction(2, 9)).toBe(8);
  });
  it("posisi dipertahankan saat jumlah halaman berubah (ganti ukuran huruf)", () => {
    const f = fractionOf(5, 11);
    expect(screenAtFraction(f, 21)).toBe(10);
  });
});

describe("stateFor", () => {
  it("nomor halaman terlihat di mode dua halaman", () => {
    expect(stateFor(1, 5, 2)).toEqual({
      screen: 1,
      screens: 3,
      first: 3,
      last: 4,
      pages: 5,
      cols: 2,
    });
    expect(stateFor(2, 5, 2)).toMatchObject({ first: 5, last: 5 });
  });
  it("mode satu halaman", () => {
    expect(stateFor(7, 3, 1)).toMatchObject({ screen: 2, first: 3, last: 3 });
  });
});

describe("membalik lembar", () => {
  it("HP maju: halaman sekarang terlipat, halaman berikutnya sudah ada di bawahnya", () => {
    expect(planTurn(3, 1, 1)).toEqual({
      side: "right",
      sheetSlot: 0,
      turning: 3,
      back: "mirror",
      pin: null,
      under: "target",
      reverse: false,
    });
  });
  it("HP mundur: lembar sebelumnya kembali menutup (animasi maju dibalik)", () => {
    expect(planTurn(3, -1, 1)).toMatchObject({ turning: 2, under: "current", reverse: true });
  });
  it("buku terbuka maju: halaman kanan terlipat, punggungnya halaman kiri berikutnya", () => {
    expect(planTurn(1, 1, 2)).toEqual({
      side: "right",
      sheetSlot: 1,
      turning: 3,
      back: 4,
      pin: { slot: 0, page: 2 },
      under: "target",
      reverse: false,
    });
  });
  it("buku terbuka mundur: halaman kiri terlipat ke kanan", () => {
    expect(planTurn(2, -1, 2)).toEqual({
      side: "left",
      sheetSlot: 0,
      turning: 4,
      back: 3,
      pin: { slot: 1, page: 5 },
      under: "target",
      reverse: false,
    });
  });
});

describe("geometri lipatan", () => {
  it("awal: belum ada lipatan", () => {
    expect(foldGeometry("right", 0, 400, 0)).toEqual({
      edge: 400,
      fold: 400,
      visible: [0, 400],
      flap: [400, 400],
    });
  });
  it("tengah: kertas terlipat dua, lipatan di tengah halaman", () => {
    const g = foldGeometry("right", 0, 400, 0.5);
    expect(g.edge).toBe(0);
    expect(g.fold).toBe(200);
    expect(g.flap[1] - g.flap[0]).toBe(400 - g.fold);
  });
  it("selesai: lipatan di tulang buku", () => {
    expect(foldGeometry("right", 500, 1000, 1).fold).toBe(500);
    expect(foldGeometry("left", 0, 500, 1).fold).toBe(500);
  });
  it("lebar lipatan selalu sama dengan bagian kertas yang terangkat", () => {
    for (const q of [0.1, 0.3, 0.7]) {
      const g = foldGeometry("left", 0, 500, q);
      expect(g.flap[1] - g.flap[0]).toBeCloseTo(g.fold - 0);
    }
  });
});
