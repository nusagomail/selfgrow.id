import { eq, schema } from "@selfgrow/db";
import type { AppEnv } from "../env";

/**
 * Sampul konten (ebook, tool, template, program). Disimpan privat di R2, metadata di `assets`,
 * dirujuk `content_items.cover_asset_id`. Hanya gambar raster (tanpa SVG, cegah XSS).
 */
export const COVER_MAX_BYTES = 1_500_000;

export type CoverMime = "image/png" | "image/jpeg" | "image/webp";

const EXT: Record<CoverMime, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

/** Jenis gambar dari byte awal file, bukan dari header yang dikirim klien. */
export function sniffImage(bytes: Uint8Array): CoverMime | null {
  const b = bytes;
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
    return "image/png";
  }
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (
    b.length >= 12 &&
    String.fromCharCode(b[0] ?? 0, b[1] ?? 0, b[2] ?? 0, b[3] ?? 0) === "RIFF" &&
    String.fromCharCode(b[8] ?? 0, b[9] ?? 0, b[10] ?? 0, b[11] ?? 0) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

/** Hapus sampul lama (objek R2 + baris assets) setelah diganti/dihapus, agar tidak menumpuk. */
export async function removeCoverAsset(
  db: AppEnv["Variables"]["db"],
  bucket: R2Bucket,
  assetId: string | null | undefined,
) {
  if (!assetId) return;
  const asset = await db.query.assets.findFirst({
    where: eq(schema.assets.id, assetId),
    columns: { r2Key: true },
  });
  if (!asset) return;
  await bucket.delete(asset.r2Key);
  await db.delete(schema.assets).where(eq(schema.assets.id, assetId));
}

export const coverKey = (contentId: string, assetId: string, mime: CoverMime) =>
  `covers/${contentId}/${assetId}.${EXT[mime]}`;

/** Alamat publik sampul (dilayani katalog; di etalase lewat proxy /sampul/{id}). */
export const coverPath = (assetId: string | null | undefined) =>
  assetId ? `/api/v1/catalog/covers/${assetId}` : null;
