import type { Database } from "@selfgrow/db";
import { and, desc, eq, schema } from "@selfgrow/db";
import { computeStreak, type StreakSummary, todayWib } from "@selfgrow/shared";

/** Hitung ulang streak dari entri lalu simpan angka ringkasnya di tabel `streaks`. */
export async function recomputeStreak(
  db: Database,
  userId: string,
  toolId: string,
  now = new Date(),
): Promise<StreakSummary> {
  const rows = await db
    .select({ date: schema.toolEntries.entryDate })
    .from(schema.toolEntries)
    .where(and(eq(schema.toolEntries.userId, userId), eq(schema.toolEntries.toolId, toolId)))
    .orderBy(desc(schema.toolEntries.entryDate))
    .limit(4000);
  const summary = computeStreak(
    rows.map((r) => r.date),
    todayWib(now),
  );
  await db
    .insert(schema.streaks)
    .values({
      userId,
      toolId,
      current: summary.current,
      longest: summary.longest,
      lastEntryDate: summary.lastEntryDate,
    })
    .onConflictDoUpdate({
      target: [schema.streaks.userId, schema.streaks.toolId],
      set: {
        current: summary.current,
        longest: summary.longest,
        lastEntryDate: summary.lastEntryDate,
      },
    });
  return summary;
}

/** Baca streak tersimpan; streak berjalan dianggap 0 bila entri terakhir lebih dari kemarin. */
export async function readStreak(
  db: Database,
  userId: string,
  toolId: string,
  now = new Date(),
): Promise<StreakSummary> {
  const row = await db.query.streaks.findFirst({
    where: and(eq(schema.streaks.userId, userId), eq(schema.streaks.toolId, toolId)),
  });
  if (!row) return { current: 0, longest: 0, lastEntryDate: null };
  const today = todayWib(now);
  const yesterday = new Date(Date.parse(`${today}T00:00:00Z`) - 86_400_000)
    .toISOString()
    .slice(0, 10);
  const alive = row.lastEntryDate === today || row.lastEntryDate === yesterday;
  return {
    current: alive ? row.current : 0,
    longest: row.longest,
    lastEntryDate: row.lastEntryDate,
  };
}
