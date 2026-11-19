import type { Database } from "@selfgrow/db";
import { and, desc, eq, gt, inArray, schema } from "@selfgrow/db";
import { MAX_ACTIVE_SESSIONS } from "@selfgrow/shared";

/**
 * Batas perangkat (BLUEPRINT bagian 7): bila lebih dari MAX_ACTIVE_SESSIONS sesi aktif,
 * sesi terlama dikeluarkan. Dipanggil setiap kali sesi baru dibuat.
 */
export async function enforceSessionLimit(db: Database, userId: string, now = new Date()) {
  const active = await db
    .select({ id: schema.sessions.id })
    .from(schema.sessions)
    .where(and(eq(schema.sessions.userId, userId), gt(schema.sessions.expiresAt, now)))
    .orderBy(desc(schema.sessions.createdAt), desc(schema.sessions.id));

  const excess = active.slice(MAX_ACTIVE_SESSIONS).map((s) => s.id);
  if (excess.length > 0) {
    await db.delete(schema.sessions).where(inArray(schema.sessions.id, excess));
  }
  return excess;
}
