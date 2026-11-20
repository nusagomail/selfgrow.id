import { DurableObject } from "cloudflare:workers";
import type { Env } from "../env";

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;

export interface ReadCounts {
  hour: number;
  day: number;
  /** Akhir pembekuan yang sudah tercatat di guard ini (ms), 0 bila tidak beku. */
  frozenUntil: number;
}

/**
 * Satu instance per user (idFromName(userId)). Mencatat bab berbeda yang dibuka dalam satu jam
 * dan 24 jam terakhir untuk deteksi scraping (BLUEPRINT bagian 8 & 9: bukan query D1).
 */
export class ReadGuard extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.storage.sql.exec(
      "CREATE TABLE IF NOT EXISTS reads (chapter_id TEXT PRIMARY KEY, ts INTEGER NOT NULL)",
    );
  }

  /** Catat pembukaan bab; kembalikan jumlah bab berbeda per jam & per 24 jam. */
  async record(chapterId: string, now: number = Date.now()): Promise<ReadCounts> {
    const sql = this.ctx.storage.sql;
    sql.exec("DELETE FROM reads WHERE ts < ?", now - DAY_MS);
    sql.exec(
      "INSERT INTO reads (chapter_id, ts) VALUES (?, ?) ON CONFLICT(chapter_id) DO UPDATE SET ts = excluded.ts",
      chapterId,
      now,
    );
    const row = sql
      .exec<{ hour: number; day: number }>(
        "SELECT sum(ts >= ?) AS hour, count(*) AS day FROM reads",
        now - HOUR_MS,
      )
      .one();
    const frozenUntil = (await this.ctx.storage.get<number>("frozenUntil")) ?? 0;
    return { hour: row.hour, day: row.day, frozenUntil: frozenUntil > now ? frozenUntil : 0 };
  }

  /**
   * Tandai beku. Mengembalikan false bila sudah beku (pembekuan, audit, dan alert hanya sekali
   * per masa beku walau KV belum terbaca di semua lokasi).
   */
  async markFrozen(until: number, now: number = Date.now()): Promise<boolean> {
    const current = (await this.ctx.storage.get<number>("frozenUntil")) ?? 0;
    if (current > now) return false;
    await this.ctx.storage.put("frozenUntil", until);
    return true;
  }

  async reset(): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM reads");
    await this.ctx.storage.delete("frozenUntil");
  }
}
