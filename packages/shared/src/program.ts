/**
 * Program bertahap (BLUEPRINT bagian 5, D13): rangkaian harian yang menggabungkan bab ebook,
 * tool/tracker, template, dan tugas. User mendaftar, lalu langkah terbuka sesuai hari (WIB).
 */
import { z } from "zod";
import { slugSchema } from "./schemas";
import { addDays, todayWib } from "./tracker";

export const MAX_PROGRAM_DAYS = 366;

export const programItemSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("chapter"),
    contentId: z.string().min(1),
    chapterId: z.string().min(1),
  }),
  z.object({ type: z.literal("tool"), contentId: z.string().min(1) }),
  z.object({ type: z.literal("template"), contentId: z.string().min(1) }),
  z.object({ type: z.literal("task"), text: z.string().trim().min(1).max(500) }),
]);
export type ProgramItem = z.infer<typeof programItemSchema>;

export const programDaySchema = z.object({
  day: z.number().int().min(1).max(MAX_PROGRAM_DAYS),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
  items: z.array(programItemSchema).max(20).default([]),
});
export type ProgramDay = z.infer<typeof programDaySchema>;

export const programStepsSchema = z
  .array(programDaySchema)
  .max(MAX_PROGRAM_DAYS)
  .superRefine((days, ctx) => {
    const seen = new Set<number>();
    days.forEach((d, i) => {
      if (seen.has(d.day)) {
        ctx.addIssue({
          code: "custom",
          message: `Hari ke-${d.day} dipakai dua kali`,
          path: [i, "day"],
        });
      }
      seen.add(d.day);
    });
  });

export const createProgramBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugSchema,
  summary: z.string().trim().max(1000).optional(),
  durationDays: z.number().int().min(1).max(MAX_PROGRAM_DAYS).default(30),
});

export const saveProgramBodySchema = z
  .object({
    durationDays: z.number().int().min(1).max(MAX_PROGRAM_DAYS),
    steps: programStepsSchema,
  })
  .superRefine((b, ctx) => {
    b.steps.forEach((s, i) => {
      if (s.day > b.durationDays) {
        ctx.addIssue({
          code: "custom",
          message: `Hari ke-${s.day} melebihi durasi ${b.durationDays} hari`,
          path: ["steps", i, "day"],
        });
      }
    });
  });

export const enrollBodySchema = z.object({ restart: z.boolean().default(false) });

/** Hari program yang sedang berjalan (1 = hari mendaftar), menurut kalender WIB. */
export function currentProgramDay(startedAt: Date, now: Date = new Date()): number {
  const start = Date.parse(`${todayWib(startedAt)}T00:00:00Z`);
  const today = Date.parse(`${todayWib(now)}T00:00:00Z`);
  return Math.max(1, Math.round((today - start) / 86_400_000) + 1);
}

/** Tanggal (YYYY-MM-DD) saat hari ke-N terbuka untuk pendaftaran tertentu. */
export function programDayDate(startedAt: Date, day: number): string {
  return addDays(todayWib(startedAt), day - 1);
}

export interface ProgramItemView {
  type: ProgramItem["type"];
  title: string;
  /** Tautan di aplikasi (tanpa domain), null untuk tugas. */
  href: string | null;
}

export interface ProgramDayView {
  day: number;
  title: string;
  description?: string;
  unlocked: boolean;
  unlockDate: string | null;
  completed: boolean;
  items: ProgramItemView[];
}
