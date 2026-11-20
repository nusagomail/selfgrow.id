/**
 * Perlindungan konten (BLUEPRINT bagian 8): rate limit, deteksi scraping + pembekuan akun
 * sementara, dan kode watermark forensik per pelanggan.
 */
import { eq, schema } from "@selfgrow/db";
import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import type { AppEnv, Env } from "../env";
import { writeAudit } from "./audit";

// ---------------------------------------------------------------------------
// Rate limit
// ---------------------------------------------------------------------------

export type RateGroup = "chapter" | "tool" | "template" | "auth";

/** 429 bila melewati batas per IP (bila IP diketahui) atau per user (bila login). */
export function rateLimit(group: RateGroup) {
  return createMiddleware<AppEnv>(async (c, next) => {
    if (!(await withinRateLimit(c, group))) {
      c.header("Retry-After", "60");
      return c.json({ error: "rate_limited" }, 429);
    }
    await next();
  });
}

export async function withinRateLimit(c: Context<AppEnv>, group: RateGroup): Promise<boolean> {
  // Header ini selalu diisi Cloudflare di produksi dan tidak bisa dipalsukan klien.
  const ip = c.req.header("cf-connecting-ip");
  const checks: Promise<{ success: boolean }>[] = [];
  if (ip) checks.push(c.env.RL_IP.limit({ key: `${group}:${ip}` }));
  const userId = c.var.user?.id;
  if (userId) checks.push(c.env.RL_USER.limit({ key: `${group}:${userId}` }));
  const results = await Promise.all(checks);
  return results.every((r) => r.success);
}

// ---------------------------------------------------------------------------
// Pembekuan akun sementara
// ---------------------------------------------------------------------------

export const FREEZE_HOURS = 12;
const DEFAULT_CHAPTERS_PER_HOUR = 60;
const frozenKey = (userId: string) => `frozen:${userId}`;

export interface FreezeInfo {
  until: string;
  reason: "scraping";
  chaptersPerHour: number;
}

export async function getFreeze(kv: KVNamespace, userId: string): Promise<FreezeInfo | null> {
  const info = await kv.get<FreezeInfo>(frozenKey(userId), "json");
  return info && Date.parse(info.until) > Date.now() ? info : null;
}

export function chaptersPerHourLimit(env: Env): number {
  const n = Number(env.SCRAPE_CHAPTERS_PER_HOUR);
  return Number.isInteger(n) && n > 0 ? n : DEFAULT_CHAPTERS_PER_HOUR;
}

/**
 * Catat pembukaan bab. Bila jumlah bab berbeda dalam satu jam melewati ambang, akun dibekukan
 * sementara (KV dengan TTL), dicatat di audit_log, dan dilaporkan ke log sebagai alert.
 * Mengembalikan info pembekuan bila baru saja dibekukan.
 */
export async function recordChapterRead(
  c: Context<AppEnv>,
  userId: string,
  chapterId: string,
): Promise<FreezeInfo | null> {
  const guard = c.env.READ_GUARD.get(c.env.READ_GUARD.idFromName(userId));
  const count = await guard.record(chapterId);
  const limit = chaptersPerHourLimit(c.env);
  if (count <= limit) return null;

  const info: FreezeInfo = {
    until: new Date(Date.now() + FREEZE_HOURS * 3_600_000).toISOString(),
    reason: "scraping",
    chaptersPerHour: count,
  };
  await c.env.KV.put(frozenKey(userId), JSON.stringify(info), {
    expirationTtl: FREEZE_HOURS * 3600,
  });
  await writeAudit(c, { action: "security.freeze", target: `user:${userId}`, after: info });
  // Alert: email/WhatsApp menyusul di Fase 1C; sementara tercatat di log Workers (observability).
  console.warn(JSON.stringify({ alert: "scraping_detected", userId, count, limit }));
  return info;
}

export async function unfreezeUser(env: Env, userId: string): Promise<void> {
  await env.KV.delete(frozenKey(userId));
  await env.READ_GUARD.get(env.READ_GUARD.idFromName(userId)).reset();
}

export async function listFrozen(kv: KVNamespace) {
  const { keys } = await kv.list({ prefix: "frozen:", limit: 1000 });
  const rows = await Promise.all(
    keys.map(async (k) => {
      const userId = k.name.slice("frozen:".length);
      const info = await getFreeze(kv, userId);
      return info ? { userId, ...info } : null;
    }),
  );
  return rows.filter((r) => r !== null);
}

// ---------------------------------------------------------------------------
// Watermark forensik
// ---------------------------------------------------------------------------

function randomCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Kode watermark milik user; dibuat sekali saat pertama kali membaca bab. */
export async function getWatermarkCode(db: AppEnv["Variables"]["db"], userId: string) {
  const find = () =>
    db.query.userWatermarks.findFirst({
      where: eq(schema.userWatermarks.userId, userId),
      columns: { code: true },
    });
  const existing = await find();
  if (existing) return existing.code;
  for (let i = 0; i < 3; i++) {
    try {
      await db
        .insert(schema.userWatermarks)
        .values({ userId, code: randomCode() })
        .onConflictDoNothing({ target: schema.userWatermarks.userId });
    } catch {
      // Tabrakan kode (sangat jarang): coba kode lain.
      continue;
    }
    const row = await find();
    if (row) return row.code;
  }
  throw new Error("Gagal membuat kode watermark");
}
