/**
 * Isi konten DEMO (10 ebook + sampul) ke D1 & R2 (D36). Idempoten: id dibuat dari slug, jadi
 * menjalankan ulang tidak menggandakan data; isi bab & sampul ditimpa dengan versi terbaru.
 *
 *   cd apps/app && node ../../scripts/demo/seed.mjs --local     # dev lokal
 *   cd apps/app && node ../../scripts/demo/seed.mjs --staging   # lewat GitHub Actions
 *
 * Hanya untuk lokal/staging. Tidak pernah dijalankan ke production.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EBOOKS } from "./ebooks.mjs";

const mode = process.argv.includes("--staging")
  ? "staging"
  : process.argv.includes("--local")
    ? "local"
    : null;
if (!mode) {
  console.error("Pakai --local atau --staging");
  process.exit(1);
}
const here = dirname(fileURLToPath(import.meta.url));
const bucket = mode === "staging" ? "selfgrow-staging-content" : "selfgrow-local-content";
const target = mode === "staging" ? ["--env", "staging", "--remote"] : ["--local"];
const work = mkdtempSync(join(tmpdir(), "selfgrow-demo-"));

/** UUID deterministik dari nama (agar idempoten). */
function uid(name) {
  const h = createHash("sha256").update(`selfgrow-demo:${name}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const q = (v) =>
  v === null ? "NULL" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`;
const text = (t) => [{ type: "text", text: t }];

/** Blok sederhana → node Tiptap yang lolos ebookDocSchema. */
function toNode(b) {
  if (typeof b === "string") return { type: "paragraph", content: text(b) };
  const [kind, value] = b;
  if (kind === "h") return { type: "heading", attrs: { level: 2 }, content: text(value) };
  if (kind === "ul" || kind === "ol") {
    return {
      type: kind === "ul" ? "bulletList" : "orderedList",
      content: value.map((v) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: text(v) }],
      })),
    };
  }
  if (kind === "tip") {
    return {
      type: "callout",
      attrs: { variant: "tip" },
      content: [{ type: "paragraph", content: text(value) }],
    };
  }
  throw new Error(`Blok tidak dikenal: ${kind}`);
}
const words = (blocks) =>
  JSON.stringify(blocks)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean).length;

function wrangler(args) {
  execFileSync("npx", ["wrangler", ...args], { stdio: ["ignore", "ignore", "inherit"] });
}

const now = Date.now();
const sql = [];
const uploads = [];

EBOOKS.forEach((e, i) => {
  const contentId = uid(`ebook:${e.slug}`);
  const coverId = uid(`cover:${e.slug}`);
  const coverFile = join(here, "covers", `${e.slug}.jpg`);
  const coverKey = `covers/${contentId}/${coverId}.jpg`;
  // Slug yang sudah dipakai konten lain (buatan pemilik) dilewati, tidak ditimpa: baris konten
  // diabaikan (ON CONFLICT DO NOTHING) dan bab hanya dibuat bila baris demo-nya ada.
  // Terbit berurutan supaya urutan katalog stabil.
  const publishedAt = now - i * 60_000;
  sql.push(
    `INSERT OR IGNORE INTO assets (id, r2_key, mime, size, uploaded_by, created_at) VALUES (${q(coverId)}, ${q(coverKey)}, 'image/jpeg', ${statSync(coverFile).size}, NULL, ${now});`,
    `INSERT INTO content_items (id, type, slug, title, summary, tier, status, category_id, cover_asset_id, published_at, created_at, updated_at) VALUES (${q(contentId)}, 'ebook', ${q(e.slug)}, ${q(e.title)}, ${q(e.summary)}, 'all', 'published', ${q(e.topic)}, ${q(coverId)}, ${publishedAt}, ${now}, ${now}) ON CONFLICT(id) DO UPDATE SET title = excluded.title, summary = excluded.summary, category_id = excluded.category_id, updated_at = excluded.updated_at ON CONFLICT DO NOTHING;`,
  );
  uploads.push({ key: coverKey, file: coverFile, type: "image/jpeg" });

  e.chapters.forEach((ch, order) => {
    const chapterId = uid(`chapter:${e.slug}:${order}`);
    const draftKey = `ebooks/${contentId}/chapters/${chapterId}.json`;
    const publishedKey = `ebooks/${contentId}/published/${chapterId}.json`;
    const doc = { type: "doc", content: ch.blocks.map(toNode) };
    const file = join(work, `${chapterId}.json`);
    writeFileSync(file, JSON.stringify(doc));
    sql.push(
      `INSERT INTO ebook_chapters (id, content_id, "order", title, status, is_free_preview, r2_key, word_count, created_at, updated_at) SELECT ${q(chapterId)}, ${q(contentId)}, ${order}, ${q(ch.title)}, 'published', ${order === 0 ? 1 : 0}, ${q(draftKey)}, ${words(ch.blocks)}, ${now}, ${now} WHERE EXISTS (SELECT 1 FROM content_items WHERE id = ${q(contentId)}) ON CONFLICT(id) DO UPDATE SET title = excluded.title, word_count = excluded.word_count, updated_at = excluded.updated_at;`,
    );
    uploads.push({ key: draftKey, file, type: "application/json" });
    uploads.push({ key: publishedKey, file, type: "application/json" });
  });
});

const sqlFile = join(work, "seed.sql");
writeFileSync(sqlFile, sql.join("\n"));
console.log(`D1: ${sql.length} perintah (${mode})`);
wrangler(["d1", "execute", "DB", ...target, "--file", sqlFile]);

for (const u of uploads) {
  wrangler([
    "r2",
    "object",
    "put",
    `${bucket}/${u.key}`,
    "--file",
    u.file,
    "--content-type",
    u.type,
    ...target,
  ]);
}
console.log(`R2: ${uploads.length} objek diunggah ke ${bucket}`);
console.log("Selesai. Katalog publik ter-cache ±1 menit.");
