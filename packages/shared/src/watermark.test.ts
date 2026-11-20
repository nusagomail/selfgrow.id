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
    expect(extractWatermarks(`abc ${encodeWatermark("0a1b2c3d4e")} def`)).toEqual([
      { code: "0a1b2c3d4e", count: 1 },
    ]);
  });

  it("tidak terlihat: teks tanpa watermark sama persis dengan aslinya", () => {
    const w = watermarkDoc(doc, "ffffffffff");
    const p = w.content[1] as { content: { text: string }[] };
    expect(p.content[0]?.text).not.toBe(long);
    expect(stripWatermarks(p.content[0]?.text ?? "")).toBe(long);
  });

  it("teks pendek dan tautan tidak disisipi", () => {
    const w = watermarkDoc(doc, "0000000001");
    expect(w.content[0]).toEqual(doc.content[0]);
    expect(w.content[2]).toEqual(doc.content[2]);
  });

  it("kode berbeda per pelanggan dan bisa dilacak dari potongan teks", () => {
    const a = textOf(watermarkDoc(doc, "aaaaaaaaaa"));
    const b = textOf(watermarkDoc(doc, "bbbbbbbbbb"));
    expect(extractWatermarks(a)).toEqual([{ code: "aaaaaaaaaa", count: 1 }]);
    expect(extractWatermarks(b)).toEqual([{ code: "bbbbbbbbbb", count: 1 }]);
  });

  it("sisipan rusak (checksum salah) diabaikan", () => {
    const m = encodeWatermark("1234567890");
    const broken = m.slice(0, 5) + (m[5] === "‌" ? "‍" : "‌") + m.slice(6);
    expect(extractWatermarks(broken)).toEqual([]);
  });

  it("kode tidak valid ditolak", () => {
    expect(() => encodeWatermark("XYZ")).toThrow();
  });
});
