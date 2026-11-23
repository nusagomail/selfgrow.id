/**
 * Render infografis ebook demo (HTML → PNG lebar 900px) dengan Playwright (D38).
 *   node scripts/demo/render-figures.mjs → scripts/demo/figures/{slug}/{nama}.png
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { BURNOUT_FIGURE_CSS, BURNOUT_FIGURES } from "./books/burnout-figures.mjs";
import { CV_FIGURE_CSS, CV_FIGURES } from "./books/cv-figures.mjs";
import { DARURAT_FIGURE_CSS, DARURAT_FIGURES } from "./books/darurat-figures.mjs";
import { GAJIAN_FIGURE_CSS, GAJIAN_FIGURES } from "./books/gajian-figures.mjs";
import { GAWAI_FIGURE_CSS, GAWAI_FIGURES } from "./books/gawai-figures.mjs";
import { GULA_FIGURE_CSS, GULA_FIGURES } from "./books/gula-figures.mjs";
import { HARGA_FIGURE_CSS, HARGA_FIGURES } from "./books/harga-figures.mjs";
import { LARI_FIGURE_CSS, LARI_FIGURES } from "./books/lari-figures.mjs";
import { MENABUNG_FIGURE_CSS, MENABUNG_FIGURES } from "./books/menabung-figures.mjs";
import { MINGGU_FIGURE_CSS, MINGGU_FIGURES } from "./books/minggu-figures.mjs";
import { NEGO_FIGURE_CSS, NEGO_FIGURES } from "./books/nego-figures.mjs";
import { OVERTHINKING_FIGURE_CSS, OVERTHINKING_FIGURES } from "./books/overthinking-figures.mjs";
import { PAGI_FIGURE_CSS, PAGI_FIGURES } from "./books/pagi-figures.mjs";
import { PANGGUNG_FIGURE_CSS, PANGGUNG_FIGURES } from "./books/panggung-figures.mjs";
import { FIGURE_CSS, FIGURES } from "./books/paylater-figures.mjs";
import { SCROLL_FIGURE_CSS, SCROLL_FIGURES } from "./books/scroll-figures.mjs";
import { STOIK_FIGURE_CSS, STOIK_FIGURES } from "./books/stoik-figures.mjs";
import { TERIAK_FIGURE_CSS, TERIAK_FIGURES } from "./books/teriak-figures.mjs";
import { TERTINGGAL_FIGURE_CSS, TERTINGGAL_FIGURES } from "./books/tertinggal-figures.mjs";
import { TIDAK_FIGURE_CSS, TIDAK_FIGURES } from "./books/tidak-figures.mjs";
import { TUNDA_FIGURE_CSS, TUNDA_FIGURES } from "./books/tunda-figures.mjs";
import { VALIDASI_FIGURE_CSS, VALIDASI_FIGURES } from "./books/validasi-figures.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const font = pathToFileURL(
  join(
    root,
    "apps/site/node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  ),
).href;

const SETS = {
  "lepas-dari-jerat-paylater": { figures: FIGURES, css: FIGURE_CSS },
  "lepas-dari-scroll-tanpa-ujung": { figures: SCROLL_FIGURES, css: SCROLL_FIGURE_CSS },
  "berani-bilang-tidak": { figures: TIDAK_FIGURES, css: TIDAK_FIGURE_CSS },
  "hitung-harga-jual-yang-untung": { figures: HARGA_FIGURES, css: HARGA_FIGURE_CSS },
  "kurangi-gula-tanpa-menderita": { figures: GULA_FIGURES, css: GULA_FIGURE_CSS },
  "berani-nego-gaji": { figures: NEGO_FIGURES, css: NEGO_FIGURE_CSS },
  "mengasuh-tanpa-teriak": { figures: TERIAK_FIGURES, css: TERIAK_FIGURE_CSS },
  "seminggu-dalam-satu-jam": { figures: MINGGU_FIGURES, css: MINGGU_FIGURE_CSS },
  "stoik-untuk-hidup-sehari-hari": { figures: STOIK_FIGURES, css: STOIK_FIGURE_CSS },
  "dana-darurat-dari-nol": { figures: DARURAT_FIGURES, css: DARURAT_FIGURE_CSS },
  "burnout-bukan-lemah": { figures: BURNOUT_FIGURES, css: BURNOUT_FIGURE_CSS },
  "dari-rebahan-ke-lari-5k": { figures: LARI_FIGURES, css: LARI_FIGURE_CSS },
  "cv-yang-dilirik-rekruter": { figures: CV_FIGURES, css: CV_FIGURE_CSS },
  "berhenti-menunda-mulai-hari-ini": { figures: TUNDA_FIGURES, css: TUNDA_FIGURE_CSS },
  "gajian-kok-cepat-habis": { figures: GAJIAN_FIGURES, css: GAJIAN_FIGURE_CSS },
  "bicara-di-depan-umum-tanpa-gemetar": { figures: PANGGUNG_FIGURES, css: PANGGUNG_FIGURE_CSS },
  "anak-dan-gawai": { figures: GAWAI_FIGURES, css: GAWAI_FIGURE_CSS },
  "umur-25-dan-merasa-tertinggal": { figures: TERTINGGAL_FIGURES, css: TERTINGGAL_FIGURE_CSS },
  "validasi-ide-sebelum-modal-habis": { figures: VALIDASI_FIGURES, css: VALIDASI_FIGURE_CSS },
  "seni-menabung-tanpa-tersiksa": { figures: MENABUNG_FIGURES, css: MENABUNG_FIGURE_CSS },
  "pagi-yang-menang": { figures: PAGI_FIGURES, css: PAGI_FIGURE_CSS },
  "keluar-dari-lingkaran-overthinking": {
    figures: OVERTHINKING_FIGURES,
    css: OVERTHINKING_FIGURE_CSS,
  },
};
// Huruf tambahan per buku (scripts/demo/fonts, OFL): SgHand = tulisan tangan, SgSerif = judul serif.
const extraFonts = [
  ["SgHand", "caveat-latin-700-normal.woff2", 700],
  ["SgSerif", "dm-serif-display-latin-400-normal.woff2", 400],
  ["SgMono", "jetbrains-mono-latin-500-normal.woff2", 500],
  ["SgLabel", "oswald-latin-600-normal.woff2", 600],
]
  .map(
    ([family, file, weight]) =>
      `@font-face{font-family:${family};src:url(${pathToFileURL(join(here, "fonts", file)).href}) format("woff2");font-weight:${weight}}`,
  )
  .join("");
// Render satu buku saja: node render-figures.mjs <slug>
const only = process.argv[2];

const browser = await chromium.launch();
const tab = await browser.newPage({
  viewport: { width: 720, height: 600 },
  deviceScaleFactor: 1.25,
});
const work = join(tmpdir(), "selfgrow-figures");
mkdirSync(work, { recursive: true });
for (const [slug, set] of Object.entries(SETS)) {
  if (only && slug !== only) continue;
  const out = join(here, "figures", slug);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const [name, fig] of Object.entries(set.figures)) {
    const file = join(work, `${name}.html`);
    writeFileSync(
      file,
      `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}${extraFonts}${set.css}</style></head><body>${fig.html()}</body></html>`,
    );
    await tab.goto(pathToFileURL(file).href);
    await tab.evaluate(() => document.fonts.ready);
    await tab.locator(".card").screenshot({ path: join(out, `${name}.png`), omitBackground: true });
    console.log("figure", slug, name);
  }
}
await browser.close();
