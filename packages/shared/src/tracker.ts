/**
 * Tool tracker (BLUEPRINT bagian 5, D13): input pengguna tersimpan per tanggal di `tool_entries`,
 * dengan streak sebagai motivasi. Semua tanggal memakai kalender WIB (UTC+7).
 */
import { z } from "zod";

const DAY_MS = 86_400_000;
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

/** Berapa hari ke belakang pengguna boleh mengisi entri yang terlewat. */
export const TRACKER_BACKFILL_DAYS = 7;
/** Batas riwayat yang bisa diminta sekaligus. */
export const TRACKER_MAX_HISTORY_DAYS = 366;

export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal YYYY-MM-DD");

/** Tanggal hari ini (YYYY-MM-DD) menurut WIB. */
export function todayWib(now: Date = new Date()): string {
  return new Date(now.getTime() + WIB_OFFSET_MS).toISOString().slice(0, 10);
}

export function addDays(date: string, days: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

/** Tanggal valid (kalender nyata) dan dalam rentang isi: hari ini s.d. N hari ke belakang. */
export function isEntryDateAllowed(date: string, now: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const t = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(t) || new Date(t).toISOString().slice(0, 10) !== date) return false;
  const today = todayWib(now);
  return date <= today && date >= addDays(today, -TRACKER_BACKFILL_DAYS);
}

export interface StreakSummary {
  current: number;
  longest: number;
  lastEntryDate: string | null;
}

/**
 * Hitung streak dari daftar tanggal entri (urutan bebas, boleh duplikat).
 * Streak berjalan masih dihitung bila entri terakhir kemarin (hari ini belum diisi).
 */
export function computeStreak(dates: string[], today: string): StreakSummary {
  const uniq = [...new Set(dates)].sort();
  if (uniq.length === 0) return { current: 0, longest: 0, lastEntryDate: null };
  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniq.length; i++) {
    run = addDays(uniq[i - 1] as string, 1) === uniq[i] ? run + 1 : 1;
    if (run > longest) longest = run;
  }
  const last = uniq[uniq.length - 1] as string;
  const current = last === today || last === addDays(today, -1) ? run : 0;
  return { current, longest, lastEntryDate: last };
}

export const trackerEntryBodySchema = z.object({
  date: isoDateSchema,
  input: z.record(z.string(), z.unknown()),
});

export interface TrackerEntry {
  date: string;
  input: Record<string, unknown>;
  results: {
    key: string;
    label: string;
    value: number | string | boolean | null;
    display: string;
  }[];
}
