/**
 * Isi katalog DEMO (100 ebook bersampul, satu ditulis lengkap) ke D1 & R2 (D38). Idempoten: id
 * dibuat dari slug, jadi menjalankan ulang tidak menggandakan data.
 *
 *   cd apps/app && node ../../scripts/demo/seed.mjs --local     # dev lokal
 *   cd apps/app && node ../../scripts/demo/seed.mjs --staging   # lewat GitHub Actions
 *
 * Hanya untuk lokal/staging. Tidak pernah dijalankan ke production.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { toDoc, words } from "./blocks.mjs";
import { FULL_BOOKS } from "./books/index.mjs";
import { catalogBooks } from "./catalog.mjs";
import { DEMO_TOOLS } from "./tools.mjs";

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
export function uid(name) {
  const h = createHash("sha256").update(`selfgrow-demo:${name}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const q = (v) =>
  v === null ? "NULL" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`;

function wrangler(args, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      execFileSync("npx", ["wrangler", ...args], { stdio: ["ignore", "ignore", "inherit"] });
      return;
    } catch (e) {
      // Galat sementara dari API Cloudflare (mis. 500) cukup diulang.
      if (i >= attempts) throw e;
      console.warn(`Ulangi (${i}/${attempts - 1})…`);
    }
  }
}

const now = Date.now();
const sql = [];
const uploads = [];

catalogBooks().forEach((b, i) => {
  const contentId = uid(`ebook:${b.slug}`);
  const coverId = uid(`cover:${b.slug}`);
  const coverFile = join(here, "covers", `${b.slug}.jpg`);
  if (!existsSync(coverFile)) throw new Error(`Sampul belum dirender: ${b.slug}`);
  const coverKey = `covers/${contentId}/${coverId}.jpg`;
  // Terbit berurutan supaya urutan rak stabil (urutan katalog).
  const publishedAt = now - i * 60_000;
  sql.push(
    `INSERT OR IGNORE INTO assets (id, r2_key, mime, size, uploaded_by, created_at) VALUES (${q(coverId)}, ${q(coverKey)}, 'image/jpeg', ${statSync(coverFile).size}, NULL, ${now});`,
    `INSERT INTO content_items (id, type, slug, title, summary, tier, status, category_id, cover_asset_id, published_at, created_at, updated_at) VALUES (${q(contentId)}, 'ebook', ${q(b.slug)}, ${q(b.title)}, ${q(b.subtitle)}, 'all', 'published', ${q(b.topic)}, ${q(coverId)}, ${publishedAt}, ${now}, ${now}) ON CONFLICT(id) DO UPDATE SET title = excluded.title, summary = excluded.summary, category_id = excluded.category_id, cover_asset_id = excluded.cover_asset_id, status = 'published', updated_at = excluded.updated_at ON CONFLICT DO NOTHING;`,
  );
  uploads.push({ key: coverKey, file: coverFile, type: "image/jpeg" });

  // Video pengantar + poster (D41), bila sudah dirender ke scripts/demo/videos/.
  const videoFile = join(here, "videos", `${b.slug}.mp4`);
  const posterFile = join(here, "videos", `${b.slug}.jpg`);
  if (existsSync(videoFile) && existsSync(posterFile)) {
    const videoId = uid(`video:${b.slug}`);
    const posterId = uid(`poster:${b.slug}`);
    const videoKey = `content-videos/${contentId}/${videoId}.mp4`;
    const posterKey = `content-images/${contentId}/${posterId}.jpg`;
    sql.push(
      `INSERT OR IGNORE INTO assets (id, r2_key, mime, size, uploaded_by, created_at) VALUES (${q(videoId)}, ${q(videoKey)}, 'video/mp4', ${statSync(videoFile).size}, NULL, ${now});`,
      `INSERT OR IGNORE INTO assets (id, r2_key, mime, size, uploaded_by, created_at) VALUES (${q(posterId)}, ${q(posterKey)}, 'image/jpeg', ${statSync(posterFile).size}, NULL, ${now});`,
      `UPDATE content_items SET intro_video_asset_id = ${q(videoId)}, intro_poster_asset_id = ${q(posterId)} WHERE id = ${q(contentId)};`,
    );
    uploads.push({ key: videoKey, file: videoFile, type: "video/mp4" });
    uploads.push({ key: posterKey, file: posterFile, type: "image/jpeg" });
  }

  const full = FULL_BOOKS[b.slug];
  if (!full) return;
  const image = (name) => {
    const assetId = uid(`img:${b.slug}:${name}`);
    const file = join(here, "figures", b.slug, `${name}.png`);
    if (!existsSync(file)) throw new Error(`Infografis belum dirender: ${b.slug}/${name}`);
    const key = `content-images/${contentId}/${assetId}.png`;
    if (!uploads.some((u) => u.key === key)) {
      sql.push(
        `INSERT OR IGNORE INTO assets (id, r2_key, mime, size, uploaded_by, created_at) VALUES (${q(assetId)}, ${q(key)}, 'image/png', ${statSync(file).size}, NULL, ${now});`,
      );
      uploads.push({ key, file, type: "image/png" });
    }
    return `/api/v1/assets/${assetId}`;
  };
  const ctx = { image, alt: (name) => full.figures[name]?.alt };
  full.chapters.forEach((ch, order) => {
    const chapterId = uid(`chapter:${b.slug}:${order}`);
    const draftKey = `ebooks/${contentId}/chapters/${chapterId}.json`;
    const publishedKey = `ebooks/${contentId}/published/${chapterId}.json`;
    const file = join(work, `${chapterId}.json`);
    writeFileSync(file, JSON.stringify(toDoc(ch.blocks, ctx)));
    sql.push(
      `INSERT INTO ebook_chapters (id, content_id, "order", title, status, is_free_preview, r2_key, word_count, created_at, updated_at) SELECT ${q(chapterId)}, ${q(contentId)}, ${order}, ${q(ch.title)}, 'published', ${order === 0 ? 1 : 0}, ${q(draftKey)}, ${words(ch.blocks)}, ${now}, ${now} WHERE EXISTS (SELECT 1 FROM content_items WHERE id = ${q(contentId)}) ON CONFLICT(id) DO UPDATE SET title = excluded.title, word_count = excluded.word_count, updated_at = excluded.updated_at;`,
    );
    uploads.push({ key: draftKey, file, type: "application/json" });
    uploads.push({ key: publishedKey, file, type: "application/json" });
  });
});

// Tool demo yang ditanam di ebook (D42): gratis untuk user login, terbit.
DEMO_TOOLS.forEach((t, i) => {
  const contentId = uid(`tool:${t.slug}`);
  const cfg = JSON.stringify(t.config);
  sql.push(
    `INSERT INTO content_items (id, type, slug, title, summary, tier, status, category_id, published_at, created_at, updated_at) VALUES (${q(contentId)}, 'tool', ${q(t.slug)}, ${q(t.title)}, ${q(t.summary)}, 'free', 'published', ${q(t.topic)}, ${now - 200 * 60_000 - i * 60_000}, ${now}, ${now}) ON CONFLICT(id) DO UPDATE SET title = excluded.title, summary = excluded.summary, tier = 'free', status = 'published', updated_at = excluded.updated_at ON CONFLICT DO NOTHING;`,
    `INSERT INTO tool_definitions (content_id, kind, config_json, published_config_json) SELECT ${q(contentId)}, 'nocode', ${q(cfg)}, ${q(cfg)} WHERE EXISTS (SELECT 1 FROM content_items WHERE id = ${q(contentId)}) ON CONFLICT(content_id) DO UPDATE SET config_json = excluded.config_json, published_config_json = excluded.published_config_json;`,
  );
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
