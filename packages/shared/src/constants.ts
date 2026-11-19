/** Versi API publik. Semua endpoint berada di bawah /api/v1 (BLUEPRINT bagian 4). */
export const API_VERSION = "v1";
export const API_BASE_PATH = `/api/${API_VERSION}`;

export const CONTENT_TYPES = ["ebook", "tool", "template"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_STATUSES = ["draft", "review", "published"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const USER_ROLES = ["member", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Batas sesi aktif per user (BLUEPRINT bagian 7). */
export const MAX_ACTIVE_SESSIONS = 2;

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
