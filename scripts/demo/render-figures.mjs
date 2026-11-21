/**
 * Render infografis ebook demo (HTML → PNG lebar 900px) dengan Playwright (D38).
 *   node scripts/demo/render-figures.mjs → scripts/demo/figures/{slug}/{nama}.png
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FIGURE_CSS, FIGURES } from "./books/paylater-figures.mjs";

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

const SETS = { "lepas-dari-jerat-paylater": { figures: FIGURES, css: FIGURE_CSS } };

const browser = await chromium.launch();
const tab = await browser.newPage({
  viewport: { width: 720, height: 600 },
  deviceScaleFactor: 1.25,
});
const work = join(tmpdir(), "selfgrow-figures");
mkdirSync(work, { recursive: true });
for (const [slug, set] of Object.entries(SETS)) {
  const out = join(here, "figures", slug);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const [name, fig] of Object.entries(set.figures)) {
    const file = join(work, `${name}.html`);
    writeFileSync(
      file,
      `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}${set.css}</style></head><body>${fig.html()}</body></html>`,
    );
    await tab.goto(pathToFileURL(file).href);
    await tab.evaluate(() => document.fonts.ready);
    await tab.locator(".card").screenshot({ path: join(out, `${name}.png`), omitBackground: true });
    console.log("figure", slug, name);
  }
}
await browser.close();
