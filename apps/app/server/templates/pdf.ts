import type { EbookDoc } from "@selfgrow/shared";
import { PDFDocument, type PDFFont, type PDFPage, rgb, StandardFonts } from "pdf-lib";
import { type Block, type DocMeta, type Run, toBlocks } from "./walk";

/**
 * Generator PDF ringan (pdf-lib, font standar). Font standar hanya mendukung WinAnsi, jadi karakter
 * di luar itu (mis. emoji) diganti/dibuang supaya pembuatan PDF tidak pernah gagal.
 * PDF rumit (banyak gambar/layout) bisa beralih ke Browser Rendering kelak (BLUEPRINT bagian 5).
 */
const WINANSI_EXTRA = new Set("€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ");
/** Simbol umum di luar WinAnsi yang punya padanan ASCII, supaya rumus tidak rusak (D53). */
const WINANSI_FALLBACK: Record<string, string> = {
  "−": "-",
  "≥": ">=",
  "≤": "<=",
  "≠": "!=",
  "≈": "~",
  "→": "->",
  "←": "<-",
  "✓": "v",
  "✔": "v",
  "✗": "x",
  "☐": "[ ]",
};
export function toWinAnsi(s: string): string {
  return [...s.normalize("NFC")]
    .map((ch) => {
      const c = ch.codePointAt(0) as number;
      if (ch === "\n") return ch;
      if ((c >= 0x20 && c <= 0x7e) || (c >= 0xa0 && c <= 0xff) || WINANSI_EXTRA.has(ch)) return ch;
      if (ch === "\t") return " ";
      return WINANSI_FALLBACK[ch] ?? "";
    })
    .join("");
}

const A4: [number, number] = [595.28, 841.89];
const MARGIN = 56;
const GREEN = rgb(0.03, 0.24, 0.12);
const MUTED = rgb(0.45, 0.45, 0.45);

interface Fonts {
  regular: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  boldItalic: PDFFont;
}

class Writer {
  page: PDFPage;
  y: number;
  constructor(
    private pdf: PDFDocument,
    public fonts: Fonts,
  ) {
    this.page = pdf.addPage(A4);
    this.y = A4[1] - MARGIN;
  }
  get width() {
    return A4[0] - MARGIN * 2;
  }
  ensure(h: number) {
    if (this.y - h < MARGIN) {
      this.page = this.pdf.addPage(A4);
      this.y = A4[1] - MARGIN;
    }
  }
  font(r: Run) {
    if (r.bold && r.italic) return this.fonts.boldItalic;
    if (r.bold) return this.fonts.bold;
    if (r.italic) return this.fonts.italic;
    return this.fonts.regular;
  }

  /** Tulis runs berformat dengan word-wrap. */
  runs(
    runs: Run[],
    opts: {
      size: number;
      x?: number;
      width?: number;
      color?: ReturnType<typeof rgb>;
      lineGap?: number;
    },
  ) {
    const x0 = MARGIN + (opts.x ?? 0);
    const maxW = opts.width ?? this.width - (opts.x ?? 0);
    const lh = opts.size * (opts.lineGap ?? 1.4);
    type Word = { text: string; font: PDFFont; run: Run };
    const lines: Word[][] = [[]];
    let lineW = 0;
    for (const r of runs) {
      const font = this.font(r);
      const parts = toWinAnsi(r.text).split(/(\n| )/);
      for (const part of parts) {
        if (part === "\n") {
          lines.push([]);
          lineW = 0;
          continue;
        }
        if (part === "") continue;
        const w = font.widthOfTextAtSize(part, opts.size);
        const current = lines[lines.length - 1] as Word[];
        if (part !== " " && lineW + w > maxW && current.length > 0) {
          lines.push([]);
          lineW = 0;
        }
        if (part === " " && (lines[lines.length - 1] as Word[]).length === 0) continue;
        (lines[lines.length - 1] as Word[]).push({ text: part, font, run: r });
        lineW += w;
      }
    }
    for (const line of lines) {
      this.ensure(lh);
      this.y -= lh;
      let x = x0;
      for (const w of line) {
        this.page.drawText(w.text, {
          x,
          y: this.y,
          size: opts.size,
          font: w.font,
          color: opts.color,
        });
        const ww = w.font.widthOfTextAtSize(w.text, opts.size);
        if (w.run.underline || w.run.strike) {
          const yy = w.run.underline ? this.y - 1.5 : this.y + opts.size * 0.3;
          this.page.drawLine({
            start: { x, y: yy },
            end: { x: x + ww, y: yy },
            thickness: 0.6,
            color: opts.color,
          });
        }
        x += ww;
      }
    }
  }
}

function drawTable(wr: Writer, rows: { header: boolean; cells: string[] }[]) {
  const cols = Math.max(1, ...rows.map((r) => r.cells.length));
  const colW = wr.width / cols;
  const size = 9.5;
  const pad = 4;
  for (const row of rows) {
    const font = row.header ? wr.fonts.bold : wr.fonts.regular;
    // Tinggi baris = sel dengan baris teks terbanyak.
    const wrapped = row.cells.map((cell) => {
      const lines: string[] = [];
      for (const para of toWinAnsi(cell).split("\n")) {
        let line = "";
        for (const word of para.split(" ")) {
          const next = line ? `${line} ${word}` : word;
          if (font.widthOfTextAtSize(next, size) > colW - pad * 2 && line) {
            lines.push(line);
            line = word;
          } else line = next;
        }
        lines.push(line);
      }
      return lines;
    });
    const h = Math.max(1, ...wrapped.map((l) => l.length)) * size * 1.3 + pad * 2;
    wr.ensure(h);
    const top = wr.y;
    wrapped.forEach((lines, c) => {
      const x = MARGIN + c * colW;
      wr.page.drawRectangle({
        x,
        y: top - h,
        width: colW,
        height: h,
        borderColor: rgb(0.75, 0.8, 0.77),
        borderWidth: 0.6,
        color: row.header ? rgb(0.91, 0.95, 0.91) : undefined,
      });
      lines.forEach((line, i) => {
        wr.page.drawText(line, { x: x + pad, y: top - pad - size * (i + 1) * 1.2, size, font });
      });
    });
    wr.y = top - h;
  }
  wr.y -= 8;
}

function drawBlock(wr: Writer, b: Block) {
  switch (b.kind) {
    case "heading": {
      const size = b.level === 2 ? 17 : b.level === 3 ? 14 : 12;
      wr.y -= 6;
      wr.runs(
        b.runs.map((r) => ({ ...r, bold: true })),
        { size, color: GREEN },
      );
      wr.y -= 4;
      break;
    }
    case "paragraph":
      if (b.runs.length === 0) {
        wr.y -= 8;
        break;
      }
      wr.runs(b.quote ? b.runs.map((r) => ({ ...r, italic: true })) : b.runs, {
        size: 11,
        x: b.quote || b.callout ? 14 : 0,
        color: b.quote ? MUTED : undefined,
      });
      wr.y -= 6;
      break;
    case "listItem":
      wr.runs([{ text: b.ordered ? `${b.index}. ` : "• " }, ...b.runs], {
        size: 11,
        x: 12 + b.depth * 14,
      });
      wr.y -= 2;
      break;
    case "rule":
      wr.ensure(14);
      wr.y -= 8;
      wr.page.drawLine({
        start: { x: MARGIN, y: wr.y },
        end: { x: A4[0] - MARGIN, y: wr.y },
        thickness: 0.6,
        color: rgb(0.7, 0.7, 0.7),
      });
      wr.y -= 8;
      break;
    case "table":
      drawTable(wr, b.rows);
      break;
  }
}

export async function renderPdf(doc: EbookDoc, meta: DocMeta): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(toWinAnsi(meta.title));
  pdf.setAuthor("SelfGrow");
  pdf.setCreator("SelfGrow");
  pdf.setProducer("SelfGrow");
  pdf.setSubject(`Dibuat oleh SelfGrow untuk pelanggan ${meta.userId}`);
  pdf.setKeywords([`selfgrow:${meta.userId}`]);
  pdf.setCreationDate(meta.generatedAt);
  const fonts: Fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
    italic: await pdf.embedFont(StandardFonts.HelveticaOblique),
    boldItalic: await pdf.embedFont(StandardFonts.HelveticaBoldOblique),
  };
  const wr = new Writer(pdf, fonts);
  for (const b of toBlocks(doc)) drawBlock(wr, b);
  for (const page of pdf.getPages()) {
    page.drawText("Dibuat dengan SelfGrow", {
      x: MARGIN,
      y: 28,
      size: 8,
      font: fonts.regular,
      color: MUTED,
    });
  }
  return pdf.save();
}
