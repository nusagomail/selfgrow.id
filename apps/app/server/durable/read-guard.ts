import { DurableObject } from "cloudflare:workers";
import type { Env } from "../env";

const HOUR_MS = 3_600_000;

/**
 * Satu instance per user (idFromName(userId)). Mencatat bab berbeda yang dibuka dalam satu jam
 * terakhir untuk deteksi scraping (BLUEPRINT bagian 8 & 9: bukan query D1).
 */
export class ReadGuard extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.storage.sql.exec(
      "CREATE TABLE IF NOT EXISTS reads (chapter_id TEXT PRIMARY KEY, ts INTEGER NOT NULL)",
    );
  }

  /** Catat pembukaan bab; kembalikan jumlah bab berbeda dalam satu jam terakhir. */
  async record(chapterId: string, now: number = Date.now()): Promise<number> {
    const sql = this.ctx.storage.sql;
    sql.exec("DELETE FROM reads WHERE ts < ?", now - HOUR_MS);
    sql.exec(
      "INSERT INTO reads (chapter_id, ts) VALUES (?, ?) ON CONFLICT(chapter_id) DO UPDATE SET ts = excluded.ts",
      chapterId,
      now,
    );
    return sql.exec<{ n: number }>("SELECT count(*) AS n FROM reads").one().n;
  }

  async reset(): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM reads");
  }
}
