import { z } from "zod";
import { slugSchema } from "./schemas";

/**
 * Video Edukasi (D54): kanal video 3–8 menit per topik, terpisah dari video pengantar ebook (D41).
 * Aturan gratis/berbayar sama dengan konten lain: `tier = free` boleh ditonton siapa saja,
 * selain itu hanya pelanggan aktif.
 */

/** Rak/tab Video baru tampil di beranda app dan site bila sudah ada minimal sekian video terbit. */
export const VIDEO_SHELF_MIN = 3;

/** Batas ukuran berkas video yang diunggah lewat Studio (di bawah batas body request Workers). */
export const VIDEO_MAX_BYTES = 95 * 1024 * 1024;

/** Durasi maksimal yang boleh dicatat (kanal ini untuk video pendek, bukan kelas panjang). */
export const VIDEO_MAX_SECONDS = 60 * 60;

export const createVideoBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  summary: z.string().trim().max(1000).optional(),
});
export type CreateVideoBody = z.infer<typeof createVideoBodySchema>;

export const updateVideoMetaBodySchema = z.object({
  durationSeconds: z.number().int().min(1).max(VIDEO_MAX_SECONDS).nullable(),
});

/** "6:05" / "1:02:03" untuk label durasi. */
export function formatDuration(seconds: number | null | undefined): string | null {
  if (!seconds || seconds <= 0 || !Number.isFinite(seconds)) return null;
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${r}` : `${m}:${r}`;
}

/** Jenis berkas video dari byte awalnya: MP4 (kotak `ftyp`) atau WebM (EBML). */
export function sniffVideo(bytes: Uint8Array): "video/mp4" | "video/webm" | null {
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    return "video/mp4";
  }
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x1a &&
    bytes[1] === 0x45 &&
    bytes[2] === 0xdf &&
    bytes[3] === 0xa3
  ) {
    return "video/webm";
  }
  return null;
}
