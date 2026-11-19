import { env } from "cloudflare:test";
import { api } from "../server/app";
import type { Env } from "../server/env";

const DAY = 24 * 60 * 60 * 1000;
export const testEnv = env as unknown as Env;

/** Buat user + sesi langsung di D1. Token dipakai sebagai bearer (cara klien mobile login). */
export async function createUser(opts: { role?: "member" | "admin"; email?: string } = {}) {
  const id = crypto.randomUUID();
  const token = `tok_${crypto.randomUUID()}`;
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO users (id, name, email, email_verified, role, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?, ?)",
    ).bind(id, "User Test", opts.email ?? `${id}@example.com`, opts.role ?? "member", now, now),
    env.DB.prepare(
      "INSERT INTO sessions (id, user_id, token, expires_at, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?)",
    ).bind(crypto.randomUUID(), id, token, now + 30 * DAY, now, now),
  ]);
  return { id, token };
}

export async function grantSubscription(
  userId: string,
  opts: { status?: "active" | "cancelled" | "expired"; periodEndOffsetDays?: number } = {},
) {
  await env.DB.prepare(
    "INSERT OR IGNORE INTO plans (id, name, interval, price_idr, tier, is_founding, is_active, created_at) VALUES ('monthly', 'Bulanan', 'month', 100000, 'all', 0, 1, ?)",
  )
    .bind(Date.now())
    .run();
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO entitlements (id, user_id, plan_id, source, status, current_period_end, auto_renew, created_at, updated_at) VALUES (?, ?, 'monthly', 'xendit', ?, ?, 0, ?, ?)",
  )
    .bind(
      crypto.randomUUID(),
      userId,
      opts.status ?? "active",
      now + (opts.periodEndOffsetDays ?? 30) * DAY,
      now,
      now,
    )
    .run();
  // Seperti handler webhook: entitlement berubah -> cache KV dihapus.
  await env.KV.delete(`ent:${userId}`);
}

export function call(path: string, init: RequestInit & { token?: string } = {}) {
  const headers = new Headers(init.headers);
  if (init.token) headers.set("authorization", `Bearer ${init.token}`);
  return api.request(path, { ...init, headers }, testEnv);
}
