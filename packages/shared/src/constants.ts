/** Versi API publik. Semua endpoint berada di bawah /api/v1 (BLUEPRINT bagian 4). */
export const API_VERSION = "v1";
export const API_BASE_PATH = `/api/${API_VERSION}`;

export const CONTENT_TYPES = ["ebook", "tool", "template", "program"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_STATUSES = ["draft", "review", "published"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const USER_ROLES = ["member", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Batas sesi aktif per user (BLUEPRINT bagian 7). */
export const MAX_ACTIVE_SESSIONS = 2;

/** Masa tenggang setelah jatuh tempo sebelum akses ditutup (BLUEPRINT bagian 7). */
export const GRACE_PERIOD_DAYS = 3;

/** Cache status langganan di KV, `ent:{user_id}` (BLUEPRINT bagian 7). */
export const ENTITLEMENT_CACHE_TTL_SECONDS = 300;

export const ENTITLEMENT_STATUSES = ["active", "cancelled", "expired"] as const;
export type EntitlementStatus = (typeof ENTITLEMENT_STATUSES)[number];

/** Event analitik & iklan standar (BLUEPRINT bagian 11). */
export const ANALYTICS_EVENTS = [
  "lead",
  "activation",
  "checkout_start",
  "purchase",
  "renewal",
  "cancel",
] as const;
export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];
