/**
 * Perlindungan konten (BLUEPRINT bagian 8, D28): rate limit, deteksi scraping + pembekuan akun
 * sementara, dan watermark forensik bertanda tangan per pelanggan.
 */
import { eq, schema } from "@selfgrow/db";
import { encodeWatermark } from "@selfgrow/shared";
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
  const userId = c.var.user?.id;
  try {
    const checks: Promise<{ success: boolean }>[] = [];
    if (ip) checks.push(c.env.RL_IP.limit({ key: `${group}:${ip}` }));
    if (userId) checks.push(c.env.RL_USER.limit({ key: `${group}:${userId}` }));
    const results = await Promise.all(checks);
    return results.every((r) => r.success);
  } catch (e) {
    // Gangguan layanan rate limit tidak boleh mematikan login & baca (review keamanan PR #13).
    // Penjaga bab per jam/hari tetap berlaku sebagai cadangan.
    console.error(JSON.stringify({ alert: "rate_limiter_error", group, error: String(e) }));
    return true;
  }
}

// ---------------------------------------------------------------------------
// Pembekuan akun sementara
// ---------------------------------------------------------------------------

export const FREEZE_HOURS = 12;
const DEFAULT_CHAPTERS_PER_HOUR = 60;
const DEFAULT_CHAPTERS_PER_DAY = 300;
const FROZEN_PREFIX = "frozen:";
const frozenKey = (userId: string) => `${FROZEN_PREFIX}${userId}`;

export interface FreezeInfo {
  until: string;
  reason: "scraping";
  chaptersPerHour: number;
  chaptersPerDay: number;
}

export async function getFreeze(kv: KVNamespace, userId: string): Promise<FreezeInfo | null> {
  const info = await kv.get<FreezeInfo>(frozenKey(userId), "json");
  return info && Date.parse(info.until) > Date.now() ? info : null;
}

const positiveInt = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

export function scrapeLimits(env: Env) {
  return {
    perHour: positiveInt(env.SCRAPE_CHAPTERS_PER_HOUR, DEFAULT_CHAPTERS_PER_HOUR),
    perDay: positiveInt(env.SCRAPE_CHAPTERS_PER_DAY, DEFAULT_CHAPTERS_PER_DAY),
  };
}

const guardFor = (env: Env, userId: string) =>
  env.READ_GUARD.get(env.READ_GUARD.idFromName(userId));

/**
 * Catat pembukaan bab. Bila jumlah bab berbeda per jam atau per 24 jam melewati ambang, akun
 * dibekukan sementara (KV dengan TTL), dicatat di audit_log oleh sistem, dan dilaporkan ke log
 * sebagai alert. Mengembalikan info pembekuan bila akun (kini) beku.
 */
export async function recordChapterRead(
  c: Context<AppEnv>,
  userId: string,
  chapterId: string,
): Promise<FreezeInfo | null> {
  const guard = guardFor(c.env, userId);
  const counts = await guard.record(chapterId);
  if (counts.frozenUntil) {
    return {
      until: new Date(counts.frozenUntil).toISOString(),
      reason: "scraping",
      chaptersPerHour: counts.hour,
      chaptersPerDay: counts.day,
    };
  }
  const limits = scrapeLimits(c.env);
  if (counts.hour <= limits.perHour && counts.day <= limits.perDay) return null;

  const untilMs = Date.now() + FREEZE_HOURS * 3_600_000;
  const info: FreezeInfo = {
    until: new Date(untilMs).toISOString(),
    reason: "scraping",
    chaptersPerHour: counts.hour,
    chaptersPerDay: counts.day,
  };
  // Durable Object memastikan pembekuan, audit, dan alert hanya terjadi sekali per masa beku.
  if (!(await guard.markFrozen(untilMs))) return info;
  await c.env.KV.put(frozenKey(userId), JSON.stringify(info), {
    expirationTtl: FREEZE_HOURS * 3600,
    metadata: info,
  });
  await writeAudit(c, {
    action: "security.freeze",
    target: `user:${userId}`,
    after: info,
    actorId: null,
  });
  // Alert: email/WhatsApp menyusul di Fase 1C; sementara tercatat di log Workers (observability).
  console.warn(JSON.stringify({ alert: "scraping_detected", userId, ...counts, ...limits }));
  return info;
}

export async function unfreezeUser(env: Env, userId: string): Promise<void> {
  await env.KV.delete(frozenKey(userId));
  await guardFor(env, userId).reset();
}

/** Daftar akun beku dari metadata KV (tanpa get per kunci), dengan paginasi kursor. */
export async function listFrozen(kv: KVNamespace, max = 1000) {
  const out: ({ userId: string } & FreezeInfo)[] = [];
  let cursor: string | undefined;
  do {
    const page = await kv.list<FreezeInfo>({ prefix: FROZEN_PREFIX, cursor, limit: 1000 });
    for (const k of page.keys) {
      const info = k.metadata;
      if (info && Date.parse(info.until) > Date.now()) {
        out.push({ userId: k.name.slice(FROZEN_PREFIX.length), ...info });
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor && out.length < max);
  return out.slice(0, max);
}

// ---------------------------------------------------------------------------
// Watermark forensik
// ---------------------------------------------------------------------------

function randomCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const isUniqueCodeError = (e: unknown) =>
  /UNIQUE constraint failed: user_watermarks\.code/.test(
    `${String(e)} ${String((e as { cause?: unknown })?.cause ?? "")}`,
  );

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
    } catch (e) {
      // Hanya tabrakan kode (sangat jarang) yang dicoba ulang; error lain diteruskan.
      if (isUniqueCodeError(e)) continue;
      throw e;
    }
    const row = await find();
    if (row) return row.code;
  }
  throw new Error("Gagal membuat kode watermark");
}

const keyCache = new Map<string, Promise<CryptoKey>>();

/** Kunci HMAC watermark, diturunkan dari BETTER_AUTH_SECRET (tanpa secret baru). */
function watermarkKey(secret: string): Promise<CryptoKey> {
  let key = keyCache.get(secret);
  if (!key) {
    key = (async () => {
      const enc = new TextEncoder();
      const base = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const derived = await crypto.subtle.sign("HMAC", base, enc.encode("selfgrow-watermark-v1"));
      return crypto.subtle.importKey("raw", derived, { name: "HMAC", hash: "SHA-256" }, false, [
        "sign",
      ]);
    })();
    keyCache.set(secret, key);
  }
  return key;
}

/** Tanda tangan 24 bit atas kode, hanya bisa dibuat server. */
export async function watermarkTag(env: Env, code: string): Promise<string> {
  const sig = await crypto.subtle.sign(
    "HMAC",
    await watermarkKey(env.BETTER_AUTH_SECRET),
    new TextEncoder().encode(code),
  );
  return [...new Uint8Array(sig).slice(0, 3)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Sisipan watermark siap pakai untuk user (kode + tanda tangan). */
export async function watermarkMarkFor(c: Context<AppEnv>, userId: string): Promise<string> {
  const code = await getWatermarkCode(c.var.db, userId);
  return encodeWatermark(code, await watermarkTag(c.env, code));
}
