/**
 * Watermark forensik ebook (BLUEPRINT bagian 8): kode unik per pelanggan disisipkan ke teks bab
 * sebagai karakter tak terlihat (zero-width). Teks yang bocor (disalin atau disedot dari API)
 * bisa ditelusuri kembali ke akun asalnya lewat `extractWatermarks`.
 *
 * Format satu sisipan: U+200B, lalu 64 bit (U+200C = 0, U+200D = 1), lalu U+200B.
 * 64 bit = kode 40 bit (10 heksadesimal) + tanda tangan HMAC 24 bit.
 */
import { z } from "zod";
import type { EbookDoc, EbookNode } from "./ebook";

const FRAME = "\u200B";
const BIT0 = "\u200C";
const BIT1 = "\u200D";
const PAYLOAD_BITS = 64;
const MARK_RE = new RegExp(`${FRAME}([${BIT0}${BIT1}]{${PAYLOAD_BITS}})${FRAME}`, "g");

/** Kode watermark: 10 karakter heksadesimal kecil (40 bit). */
export const WATERMARK_CODE_RE = /^[0-9a-f]{10}$/;
/** Tanda tangan: 6 heksadesimal (24 bit) dari HMAC rahasia server atas kode. */
export const WATERMARK_TAG_RE = /^[0-9a-f]{6}$/;

/** Teks minimal (karakter) agar sebuah node teks diberi sisipan. */
const MIN_TEXT_CHARS = 40;
/** Batas sisipan per bab agar ukuran respons tetap kecil. */
const MAX_MARKS_PER_DOC = 200;

const hexToBytes = (hex: string) => {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) bytes.push(Number.parseInt(hex.slice(i, i + 2), 16));
  return bytes;
};
const bytesToHex = (bytes: number[]) => bytes.map((b) => b.toString(16).padStart(2, "0")).join("");

/**
 * Satu sisipan tak terlihat berisi kode + tanda tangan. Tanda tangan dibuat server dengan kunci
 * rahasia, sehingga orang yang mengetahui kode user lain tetap tidak bisa memalsukan sisipan
 * untuk menjebaknya (review keamanan PR #13).
 */
export function encodeWatermark(code: string, tag: string): string {
  if (!WATERMARK_CODE_RE.test(code) || !WATERMARK_TAG_RE.test(tag)) {
    throw new Error("Kode watermark tidak valid");
  }
  let bits = "";
  for (const b of hexToBytes(code + tag)) {
    for (let i = 7; i >= 0; i--) bits += (b >> i) & 1 ? BIT1 : BIT0;
  }
  return FRAME + bits + FRAME;
}

/** Sisipan yang ditemukan di teks (kode + tanda tangan, belum diverifikasi), dengan jumlahnya. */
export function extractWatermarks(text: string): { code: string; tag: string; count: number }[] {
  const found = new Map<string, number>();
  for (const m of text.matchAll(MARK_RE)) {
    const bits = m[1] as string;
    const bytes: number[] = [];
    for (let i = 0; i < PAYLOAD_BITS; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i + j] === BIT1 ? 1 : 0);
      bytes.push(b);
    }
    const hex = bytesToHex(bytes);
    found.set(hex, (found.get(hex) ?? 0) + 1);
  }
  return [...found]
    .map(([hex, count]) => ({ code: hex.slice(0, 10), tag: hex.slice(10), count }))
    .sort((a, b) => b.count - a.count);
}

/** Buang semua karakter watermark (mis. sebelum membandingkan teks). */
export function stripWatermarks(text: string): string {
  return text.replace(/[\u200B\u200C\u200D]/g, "");
}

/**
 * Sisipkan watermark ke dokumen bab: satu sisipan di setiap node teks yang cukup panjang,
 * tepat setelah spasi pertama (tidak memecah kata, tidak mengubah tampilan).
 * Tautan dan kode (`code`) tidak disentuh.
 */
export function watermarkDoc(doc: EbookDoc, mark: string): EbookDoc {
  let remaining = MAX_MARKS_PER_DOC;
  const visit = (node: EbookNode): EbookNode => {
    if (node.type === "text") {
      if (remaining <= 0 || node.text.length < MIN_TEXT_CHARS) return node;
      if (node.marks?.some((m) => m.type === "link" || m.type === "code")) return node;
      const at = node.text.indexOf(" ");
      if (at < 0 || at === node.text.length - 1) return node;
      remaining--;
      return { ...node, text: node.text.slice(0, at + 1) + mark + node.text.slice(at + 1) };
    }
    if ("content" in node && Array.isArray(node.content)) {
      return { ...node, content: node.content.map(visit) } as EbookNode;
    }
    return node;
  };
  return { ...doc, content: doc.content.map(visit) };
}

/** Admin: teks yang dicurigai bocor (maks 200.000 karakter). */
export const traceLeakBodySchema = z.object({ text: z.string().min(1).max(200_000) });
