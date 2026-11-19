import type { Database } from "@selfgrow/db";
import { eq, schema } from "@selfgrow/db";

/**
 * Hapus akun (soft delete) dan cabut semua sesinya sekaligus, supaya sesi lama tidak bisa
 * dipakai lagi di endpoint mana pun (review keamanan PR #2). Data tetap disimpan sesuai
 * kebijakan retensi; penghapusan permanen ditangani terpisah (UU PDP).
 */
export async function softDeleteUser(db: Database, userId: string, now = new Date()) {
  await db.batch([
    db
      .update(schema.users)
      .set({ deletedAt: now, updatedAt: now })
      .where(eq(schema.users.id, userId)),
    db.delete(schema.sessions).where(eq(schema.sessions.userId, userId)),
  ]);
}
