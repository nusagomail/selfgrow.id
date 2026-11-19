import type { Database } from "@selfgrow/db";
import { schema, sql } from "@selfgrow/db";

export type UsageMetric = "downloads" | "ai_calls" | `tool_runs:${string}`;

/** Periode kuota bulanan (YYYY-MM, UTC+7 / WIB). */
export function currentPeriod(now = new Date()) {
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return wib.toISOString().slice(0, 7);
}

/**
 * Tambah pemakaian secara atomik bila masih di bawah batas (BLUEPRINT bagian 6, `usage_counters`).
 * Mengembalikan hitungan baru, atau null bila kuota sudah habis.
 */
export async function consumeQuota(
  db: Database,
  userId: string,
  metric: UsageMetric,
  limit: number,
  now = new Date(),
): Promise<number | null> {
  const period = currentPeriod(now);
  const rows = await db
    .insert(schema.usageCounters)
    .values({ userId, period, metric, count: 1 })
    .onConflictDoUpdate({
      target: [
        schema.usageCounters.userId,
        schema.usageCounters.period,
        schema.usageCounters.metric,
      ],
      set: { count: sql`${schema.usageCounters.count} + 1` },
      setWhere: sql`${schema.usageCounters.count} < ${limit}`,
    })
    .returning({ count: schema.usageCounters.count });
  const count = rows[0]?.count;
  return count === undefined || count > limit ? null : count;
}
