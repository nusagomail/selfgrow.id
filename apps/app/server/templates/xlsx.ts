import type { EbookDoc } from "@selfgrow/shared";
import { strToU8, zipSync } from "fflate";
import { cleanText, type DocMeta, plain, sliceChars, toBlocks } from "./walk";

/**
 * Penulis XLSX minimal (tanpa library spreadsheet): setiap tabel menjadi satu sheet, teks lain
 * masuk sheet "Catatan". Semua teks ditulis sebagai inline string (tidak pernah formula), dan
 * isian yang diawali = + - @ tab/CR diberi awalan ' (WAJIB, cegah formula injection saat diekspor
 * ke CSV / dibuka aplikasi lain).
 */
export function sanitizeCell(value: string): string {
  // Termasuk spasi/baris baru di depan dan versi full-width (＝ ＋ － ＠), yang dipangkas
  // sebagian aplikasi impor CSV sebelum dievaluasi (review keamanan PR #11).
  return /^[\s\u3000]*[=+\-@\uFF1D\uFF0B\uFF0D\uFF20]/.test(value) ? `'${value}` : value;
}

const esc = (s: string) =>
  s
    // biome-ignore lint/suspicious/noControlCharactersInRegex: karakter kontrol tidak sah di XML, sengaja dibuang
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const colName = (i: number) => {
  let s = "";
  let n = i + 1;
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

/** Nama sheet yang diterima Excel: tanpa \\ / ? * [ ] :, tanpa ' di tepi, maks 31 karakter. */
function sheetName(name: string, i: number): string {
  const clean = sliceChars(
    cleanText(name)
      .replace(/[\\/?*[\]:]/g, " ")
      .trim(),
    31,
  )
    .replace(/^'+|'+$/g, "")
    .trim();
  return !clean || clean.toLowerCase() === "history" ? `Sheet${i + 1}` : clean;
}

type Sheet = { name: string; rows: { header: boolean; cells: string[] }[] };

function sheetXml(sheet: Sheet): string {
  const widths = new Map<number, number>();
  const rows = sheet.rows
    .map((row, r) => {
      const cells = row.cells
        .map((raw, c) => {
          widths.set(c, Math.min(60, Math.max(widths.get(c) ?? 8, raw.length + 2)));
          const ref = `${colName(c)}${r + 1}`;
          const style = row.header ? ' s="1"' : "";
          // Angka murni (mis. 12 atau 1500.5) ditulis sebagai angka; selain itu teks.
          // Angka hanya bila ditulis polos (1500 atau 1500,5 gaya Indonesia). "1.500" (pemisah ribuan)
          // tetap teks supaya tidak terbaca 1,5 (review keamanan PR #11).
          const t = raw.trim();
          if (/^-?\d{1,15}(,\d{1,6})?$/.test(t) && !/^-?0\d/.test(t)) {
            return `<c r="${ref}"${style}><v>${t.replace(",", ".")}</v></c>`;
          }
          if (raw === "") return `<c r="${ref}"${style}/>`;
          return `<c r="${ref}" t="inlineStr"${style}><is><t xml:space="preserve">${esc(sanitizeCell(raw))}</t></is></c>`;
        })
        .join("");
      return `<row r="${r + 1}">${cells}</row>`;
    })
    .join("");
  const cols = [...widths.entries()]
    .map(([c, w]) => `<col min="${c + 1}" max="${c + 1}" width="${w}" customWidth="1"/>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${cols ? `<cols>${cols}</cols>` : ""}<sheetData>${rows}</sheetData></worksheet>`;
}

export function renderXlsx(doc: EbookDoc, meta: DocMeta): Uint8Array {
  const blocks = toBlocks(doc);
  const sheets: Sheet[] = [];
  const notes: Sheet = { name: "Catatan", rows: [] };
  for (const b of blocks) {
    if (b.kind === "table") sheets.push({ name: `Tabel ${sheets.length + 1}`, rows: b.rows });
    else if (b.kind === "heading" || b.kind === "paragraph" || b.kind === "listItem") {
      const text = b.runs.map((r) => r.text).join("");
      if (text.trim()) {
        notes.rows.push({
          header: b.kind === "heading",
          cells: [b.kind === "listItem" ? `${b.ordered ? `${b.index}.` : "•"} ${text}` : text],
        });
      }
    }
  }
  if (notes.rows.length > 0 || sheets.length === 0) sheets.unshift(notes);
  if (sheets.length === 1 && sheets[0]?.name === "Tabel 1") (sheets[0] as Sheet).name = meta.title;

  const files: Record<string, Uint8Array> = {
    "[Content_Types].xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>${sheets
      .map(
        (_, i) =>
          `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`,
      )
      .join("")}</Types>`),
    "_rels/.rels": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`),
    "docProps/core.xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${esc(meta.title)}</dc:title><dc:creator>SelfGrow</dc:creator><dc:description>${esc(`Dibuat oleh SelfGrow untuk pelanggan ${meta.userId}`)}</dc:description><cp:keywords>${esc(`selfgrow:${meta.userId}`)}</cp:keywords><dcterms:created xsi:type="dcterms:W3CDTF">${meta.generatedAt.toISOString()}</dcterms:created></cp:coreProperties>`),
    "xl/workbook.xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets
      .map(
        (s, i) =>
          `<sheet name="${esc(sheetName(s.name, i))}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`,
      )
      .join("")}</sheets></workbook>`),
    "xl/_rels/workbook.xml.rels": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets
      .map(
        (_, i) =>
          `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`,
      )
      .join(
        "",
      )}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`),
    "xl/styles.xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE8F3E9"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" fillId="2" applyFont="1" applyFill="1"/></cellXfs></styleSheet>`),
  };
  sheets.forEach((s, i) => {
    files[`xl/worksheets/sheet${i + 1}.xml`] = strToU8(sheetXml(s));
  });
  return zipSync(files, { level: 6 });
}

export { plain };
