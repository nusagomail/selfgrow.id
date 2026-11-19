import { describe, expect, it } from "vitest";
import { evaluate, FormulaError, parseFormula } from "./formula";

const run = (f: string, data: Record<string, number | string | boolean | null> = {}) =>
  evaluate(parseFormula(f).logic, data);

describe("parseFormula + evaluate", () => {
  it("aritmetika dengan prioritas operator", () => {
    expect(run("1 + 2 * 3")).toBe(7);
    expect(run("(1 + 2) * 3")).toBe(9);
    expect(run("-a + 10", { a: 4 })).toBe(6);
    expect(run("10 % 4")).toBe(2);
  });

  it("variabel & fungsi", () => {
    expect(run("round(a / b * 100, 1)", { a: 1, b: 3 })).toBe(33.3);
    expect(run("max(a, b, 3)", { a: 1, b: 2 })).toBe(3);
    expect(run('if(skor >= 70, "Bagus", "Perlu perbaikan")', { skor: 80 })).toBe("Bagus");
    expect(run('concat("Halo ", nama)', { nama: "Dhuha" })).toBe("Halo Dhuha");
    expect(run("a > 1 && b < 5", { a: 2, b: 3 })).toBe(true);
    expect(run("and(a > 1, not(b))", { a: 2, b: false })).toBe(true);
  });

  it("pembagian dengan nol menghasilkan null, bukan Infinity", () => {
    expect(run("a / b", { a: 1, b: 0 })).toBeNull();
  });

  it("tidak pernah menghasilkan Infinity", () => {
    expect(run(`round(${"9".repeat(400)})`)).toBeNull();
    expect(run("abs(a * a)", { a: 1e200 })).toBeNull();
  });

  it("mencatat variabel yang dipakai", () => {
    expect(parseFormula("gaji - (makan + kos)").vars.sort()).toEqual(["gaji", "kos", "makan"]);
  });

  it("menolak sintaks berbahaya atau tidak dikenal", () => {
    for (const bad of [
      "constructor.constructor('x')()",
      "eval(1)",
      "a; b",
      "a = 1",
      "`x`",
      "[1]",
      "a.b",
      "fetch('http://x')",
      "1 +",
      "((1)",
    ]) {
      expect(() => parseFormula(bad), bad).toThrow(FormulaError);
    }
  });

  it("variabel yang tidak ada / nama bawaan JS dibaca sebagai null", () => {
    expect(run("__proto__", {})).toBeNull();
    expect(run("constructor", {})).toBeNull();
    expect(run("toString", {})).toBeNull();
    expect(() => parseFormula("constructor(1)")).toThrow(FormulaError);
    expect(() => parseFormula("hasOwnProperty(1)")).toThrow(FormulaError);
  });

  it("menolak rumus terlalu bertingkat atau terlalu panjang", () => {
    expect(() => parseFormula(`${"(".repeat(100)}1${")".repeat(100)}`)).toThrow(FormulaError);
    expect(() => parseFormula(`${"1+".repeat(600)}1`)).toThrow(FormulaError);
  });

  it("menolak operator di luar daftar saat evaluasi logika mentah", () => {
    expect(() => evaluate({ method: ["x", "toString"] } as never, {})).toThrow(FormulaError);
  });
});
