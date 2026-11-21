/**
 * Hapus SEMUA ebook beserta bab, versi, sampul, gambar isi, dan berkasnya di R2 (D38). Dipakai
 * sebelum mengisi ulang katalog demo. Hanya untuk lokal/staging, tidak pernah production.
 *
 *   cd apps/app && node ../../scripts/demo/purge.mjs --local
 *   cd apps/app && node ../../scripts/demo/purge.mjs --staging   # lewat GitHub Actions
 */
import { execFileSync } from "node:child_process";

const mode = process.argv.includes("--staging")
  ? "staging"
  : process.argv.includes("--local")
    ? "local"
    : null;
if (!mode) {
  console.error("Pakai --local atau --staging");
  process.exit(1);
}
const bucket = mode === "staging" ? "selfgrow-staging-content" : "selfgrow-local-content";
const target = mode === "staging" ? ["--env", "staging", "--remote"] : ["--local"];

function wrangler(args, { json = false, attempts = 3 } = {}) {
  for (let i = 1; ; i++) {
    try {
      return execFileSync("npx", ["wrangler", ...args], {
        stdio: ["ignore", json ? "pipe" : "ignore", "inherit"],
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (e) {
      if (i >= attempts) throw e;
      console.warn(`Ulangi (${i}/${attempts - 1})…`);
    }
  }
}

function query(sql) {
  const out = wrangler(["d1", "execute", "DB", ...target, "--json", "--command", sql], {
    json: true,
  });
  const parsed = JSON.parse(out.slice(out.indexOf("[")));
  return parsed.flatMap((r) => r.results ?? []);
}

const ebooks = query("SELECT id FROM content_items WHERE type = 'ebook'").map((r) => r.id);
console.log(`Ebook ditemukan: ${ebooks.length}`);
if (ebooks.length === 0) process.exit(0);
const ids = new Set(ebooks);
const inEbooks = "(SELECT id FROM content_items WHERE type = 'ebook')";

const keys = new Set();
for (const ch of query(
  `SELECT id, content_id, r2_key FROM ebook_chapters WHERE content_id IN ${inEbooks}`,
)) {
  keys.add(ch.r2_key);
  keys.add(`ebooks/${ch.content_id}/published/${ch.id}.json`);
}
for (const v of query(
  `SELECT snapshot_ref FROM content_versions WHERE content_id IN ${inEbooks}`,
)) {
  keys.add(v.snapshot_ref);
}
// Sampul dan gambar isi disimpan di covers/{contentId}/… dan content-images/{contentId}/….
const assets = query(
  "SELECT id, r2_key FROM assets WHERE r2_key LIKE 'covers/%' OR r2_key LIKE 'content-images/%'",
).filter((a) => ids.has(a.r2_key.split("/")[1]));
for (const a of assets) keys.add(a.r2_key);

console.log(`Berkas R2 dihapus: ${keys.size}`);
for (const key of keys) {
  wrangler(["r2", "object", "delete", `${bucket}/${key}`, ...target]);
}

// Bab, versi, progres baca, penanda, dan relasi lain ikut terhapus lewat ON DELETE CASCADE.
const assetIds = assets.map((a) => `'${a.id.replace(/'/g, "''")}'`);
const statements = [
  `DELETE FROM ebook_chapters WHERE content_id IN ${inEbooks};`,
  `DELETE FROM content_versions WHERE content_id IN ${inEbooks};`,
  "DELETE FROM content_items WHERE type = 'ebook';",
];
for (let i = 0; i < assetIds.length; i += 200) {
  statements.push(`DELETE FROM assets WHERE id IN (${assetIds.slice(i, i + 200).join(",")});`);
}
wrangler(["d1", "execute", "DB", ...target, "--command", statements.join(" ")]);
const left = query("SELECT count(*) AS n FROM content_items WHERE type = 'ebook'")[0]?.n;
console.log(`Selesai. Ebook tersisa: ${left}`);
if (left !== 0) process.exit(1);
