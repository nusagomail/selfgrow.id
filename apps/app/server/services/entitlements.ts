import type { Database } from "@selfgrow/db";
import { eq, schema } from "@selfgrow/db";
import {
  ENTITLEMENT_CACHE_TTL_SECONDS,
  type EntitlementStatus,
  GRACE_PERIOD_DAYS,
  type SubscriptionStatus,
} from "@selfgrow/shared";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Data mentah entitlement yang di-cache di KV. Status aktif dihitung ulang setiap request. */
export interface CachedEntitlement {
  planId: string;
  status: EntitlementStatus;
  currentPeriodEnd: number;
}

export const entitlementCacheKey = (userId: string) => `ent:${userId}`;

/**
 * Aturan akses (BLUEPRINT bagian 7):
 * - `active`: akses sampai jatuh tempo + masa tenggang 3 hari (menunggu perpanjangan).
 * - `cancelled`: akses sampai akhir periode yang sudah dibayar, tanpa masa tenggang.
 * - `expired` atau tidak ada entitlement: tanpa akses.
 */
export function computeSubscriptionStatus(
  ent: CachedEntitlement | null,
  now: number = Date.now(),
): SubscriptionStatus {
  if (!ent || ent.status === "expired") {
    return {
      active: false,
      planId: ent?.planId ?? null,
      currentPeriodEnd: ent ? new Date(ent.currentPeriodEnd).toISOString() : null,
      inGracePeriod: false,
    };
  }
  const end = ent.currentPeriodEnd;
  const accessUntil = ent.status === "active" ? end + GRACE_PERIOD_DAYS * DAY_MS : end;
  const active = now < accessUntil;
  return {
    active,
    planId: ent.planId,
    currentPeriodEnd: new Date(end).toISOString(),
    inGracePeriod: active && now >= end,
  };
}

/** Baca entitlement: KV dulu (`ent:{user_id}`, TTL 5 menit), fallback ke D1. */
export async function loadEntitlement(
  kv: KVNamespace,
  db: Database,
  userId: string,
): Promise<CachedEntitlement | null> {
  const key = entitlementCacheKey(userId);
  const cached = await kv.get<{ ent: CachedEntitlement | null }>(key, "json");
  if (cached) return cached.ent;

  const row = await db.query.entitlements.findFirst({
    where: eq(schema.entitlements.userId, userId),
    columns: { planId: true, status: true, currentPeriodEnd: true },
  });
  const ent: CachedEntitlement | null = row
    ? { planId: row.planId, status: row.status, currentPeriodEnd: row.currentPeriodEnd.getTime() }
    : null;

  await kv.put(key, JSON.stringify({ ent }), { expirationTtl: ENTITLEMENT_CACHE_TTL_SECONDS });
  return ent;
}

export async function getSubscriptionStatus(
  kv: KVNamespace,
  db: Database,
  userId: string,
  now: number = Date.now(),
) {
  return computeSubscriptionStatus(await loadEntitlement(kv, db, userId), now);
}

/** Dipanggil handler webhook setelah entitlement berubah. */
export function invalidateEntitlementCache(kv: KVNamespace, userId: string) {
  return kv.delete(entitlementCacheKey(userId));
}
