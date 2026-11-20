import { describe, expect, it } from "vitest";
import type { EbookDoc } from "./ebook";
import { encodeWatermark, extractWatermarks, stripWatermarks, watermarkDoc } from "./watermark";

const long = "Atur keuangan dengan sederhana: catat setiap pengeluaran harian kamu.";
const doc: EbookDoc = {
  type: "doc",
  content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Pendek" }] },
    { type: "paragraph", content: [{ type: "text", text: long }] },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "https://contoh.com/tautan-yang-panjang sekali untuk diuji ya",
          marks: [{ type: "link", attrs: { href: "https://contoh.com" } }],
        },
      ],
    },
  ],
};

const textOf = (d: EbookDoc): string => JSON.stringify(d);

describe("watermark forensik", () => {
  it("encode lalu extract mengembalikan kode yang sama", () => {
    expect(extractWatermarks(`abc ${encodeWatermark("0a1b2c3d4e", "abcdef")} def`)).toEqual([
      { code: "0a1b2c3d4e", tag: "abcdef", count: 1 },
    ]);
  });

  it("tidak terlihat: teks tanpa watermark sama persis dengan aslinya", () => {
    const w = watermarkDoc(doc, encodeWatermark("ffffffffff", "000000"));
    const p = w.content[1] as { content: { text: string }[] };
    expect(p.content[0]?.text).not.toBe(long);
    expect(stripWatermarks(p.content[0]?.text ?? "")).toBe(long);
  });

  it("teks pendek dan tautan tidak disisipi", () => {
    const w = watermarkDoc(doc, encodeWatermark("0000000001", "000000"));
    expect(w.content[0]).toEqual(doc.content[0]);
    expect(w.content[2]).toEqual(doc.content[2]);
  });

  it("kode berbeda per pelanggan dan bisa dilacak dari potongan teks", () => {
    const a = textOf(watermarkDoc(doc, encodeWatermark("aaaaaaaaaa", "111111")));
    const b = textOf(watermarkDoc(doc, encodeWatermark("bbbbbbbbbb", "222222")));
    expect(extractWatermarks(a)).toEqual([{ code: "aaaaaaaaaa", tag: "111111", count: 1 }]);
    expect(extractWatermarks(b)).toEqual([{ code: "bbbbbbbbbb", tag: "222222", count: 1 }]);
  });

  it("sisipan terpotong diabaikan", () => {
    const m = encodeWatermark("1234567890", "abcdef");
    expect(extractWatermarks(m.slice(0, 30) + m.slice(31))).toEqual([]);
  });

  it("kode tidak valid ditolak", () => {
    expect(() => encodeWatermark("XYZ", "abcdef")).toThrow();
    expect(() => encodeWatermark("1234567890", "zz")).toThrow();
  });
});
