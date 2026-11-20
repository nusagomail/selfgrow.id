import { describe, expect, it } from "vitest";
import {
  clampScreen,
  fractionOf,
  layoutFor,
  leafAngle,
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
  it("HP maju: halaman sekarang terangkat, halaman berikutnya sudah ada di bawahnya", () => {
    expect(planTurn(3, 1, 1)).toEqual({
      leafSlot: 0,
      front: 3,
      back: null,
      pin: null,
      flowJumps: "start",
    });
  });
  it("HP mundur: halaman sebelumnya kembali menutup, alur pindah setelah selesai", () => {
    expect(planTurn(3, -1, 1)).toMatchObject({ front: 2, back: null, flowJumps: "end" });
  });
  it("dua halaman maju: kanan berputar ke kiri, punggungnya halaman kiri berikutnya", () => {
    expect(planTurn(1, 1, 2)).toEqual({
      leafSlot: 1,
      front: 3,
      back: 4,
      pin: { slot: 0, page: 2 },
      flowJumps: "start",
    });
  });
  it("dua halaman mundur: kiri berputar kembali ke kanan", () => {
    expect(planTurn(2, -1, 2)).toEqual({
      leafSlot: 1,
      front: 3,
      back: 4,
      pin: { slot: 1, page: 5 },
      flowJumps: "start",
    });
  });
  it("sudut lembar", () => {
    expect(leafAngle(1, 0)).toBe(-0);
    expect(leafAngle(1, 0.5)).toBeCloseTo(-90);
    expect(leafAngle(1, 0.25)).toBeCloseTo(-60);
    expect(leafAngle(1, 2)).toBe(-180);
    expect(leafAngle(-1, 0)).toBe(-180);
    expect(leafAngle(-1, 1)).toBe(-0);
  });
});
