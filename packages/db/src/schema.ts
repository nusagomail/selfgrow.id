/**
 * Skema D1 (BLUEPRINT bagian 6). Semua perubahan WAJIB lewat migrasi Drizzle (`pnpm db:generate`).
 *
 * Konvensi:
 * - Nama kolom snake_case di database, nama properti camelCase di TypeScript.
 * - Waktu disimpan sebagai epoch milidetik (`timestamp_ms`).
 * - Tabel auth (`users`, `sessions`, `accounts`, `verifications`) memakai nama properti yang
 *   diharapkan Better Auth (D16), dipetakan ke nama kolom blueprint.
 */
import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const id = () => text("id").primaryKey();
const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`);
const updatedAt = () =>
  integer("updated_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`);

// ---------------------------------------------------------------------------
// Auth (Better Auth, D16)
// ---------------------------------------------------------------------------

export const users = sqliteTable("users", {
  id: id(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("avatar_url"),
  role: text("role", { enum: ["member", "admin"] })
    .notNull()
    .default("member"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
});

export const sessions = sqliteTable(
  "sessions",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    deviceLabel: text("device_label"),
    createdAt: createdAt(),
    /** Diperbarui Better Auth saat sesi diperpanjang, dipakai sebagai "terakhir terlihat". */
    updatedAt: integer("last_seen_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
  },
  (t) => [index("sessions_user_idx").on(t.userId, t.createdAt)],
);

export const accounts = sqliteTable(
  "accounts",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerId: text("provider").notNull(),
    accountId: text("provider_account_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp_ms" }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("accounts_provider_account_uq").on(t.providerId, t.accountId),
    index("accounts_user_idx").on(t.userId),
  ],
);

export const verifications = sqliteTable(
  "verifications",
  {
    id: id(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("verifications_identifier_idx").on(t.identifier)],
);

// ---------------------------------------------------------------------------
// Langganan & pembayaran
// ---------------------------------------------------------------------------

export const plans = sqliteTable("plans", {
  id: id(),
  name: text("name").notNull(),
  interval: text("interval", { enum: ["month", "year"] }).notNull(),
  priceIdr: integer("price_idr").notNull(),
  tier: text("tier").notNull().default("all"),
  isFounding: integer("is_founding", { mode: "boolean" }).notNull().default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: createdAt(),
});

/** Satu-satunya sumber hak akses. Hanya diubah oleh handler webhook Xendit. */
export const entitlements = sqliteTable("entitlements", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: text("plan_id")
    .notNull()
    .references(() => plans.id),
  source: text("source", { enum: ["xendit"] })
    .notNull()
    .default("xendit"),
  status: text("status", { enum: ["active", "cancelled", "expired"] }).notNull(),
  currentPeriodEnd: integer("current_period_end", { mode: "timestamp_ms" }).notNull(),
  autoRenew: integer("auto_renew", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const payments = sqliteTable(
  "payments",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    xenditId: text("xendit_id").notNull().unique(),
    planId: text("plan_id").references(() => plans.id),
    amountIdr: integer("amount_idr").notNull(),
    method: text("method"),
    status: text("status").notNull(),
    paidAt: integer("paid_at", { mode: "timestamp_ms" }),
    rawPayload: text("raw_payload"),
    createdAt: createdAt(),
  },
  (t) => [index("payments_user_idx").on(t.userId)],
);

// ---------------------------------------------------------------------------
// Konten
// ---------------------------------------------------------------------------

/** Kategori dan topik (topik = kategori dengan parent). */
export const categories = sqliteTable("categories", {
  id: id(),
  parentId: text("parent_id"),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
});

export const contentItems = sqliteTable(
  "content_items",
  {
    id: id(),
    type: text("type", { enum: ["ebook", "tool", "template", "program"] }).notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary"),
    tier: text("tier").notNull().default("all"),
    status: text("status", { enum: ["draft", "review", "published"] })
      .notNull()
      .default("draft"),
    level: text("level", { enum: ["beginner", "intermediate", "advanced"] }),
    categoryId: text("category_id").references(() => categories.id),
    coverAssetId: text("cover_asset_id"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("content_type_slug_uq").on(t.type, t.slug),
    index("content_status_idx").on(t.status, t.publishedAt),
    index("content_category_idx").on(t.categoryId),
  ],
);

export const contentVersions = sqliteTable(
  "content_versions",
  {
    id: id(),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    snapshotRef: text("snapshot_ref").notNull(),
    createdBy: text("created_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("content_versions_uq").on(t.contentId, t.version)],
);

export const ebookChapters = sqliteTable(
  "ebook_chapters",
  {
    id: id(),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    title: text("title").notNull(),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    isFreePreview: integer("is_free_preview", { mode: "boolean" }).notNull().default(false),
    r2Key: text("r2_key").notNull(),
    wordCount: integer("word_count").notNull().default(0),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("chapters_content_idx").on(t.contentId, t.order)],
);

/** `configJson` TIDAK PERNAH dikirim ke klien (D8). */
export const toolDefinitions = sqliteTable("tool_definitions", {
  contentId: text("content_id")
    .primaryKey()
    .references(() => contentItems.id, { onDelete: "cascade" }),
  kind: text("kind", { enum: ["nocode", "custom"] }).notNull(),
  /** Draft konfigurasi (diedit Studio). */
  configJson: text("config_json"),
  /** Konfigurasi yang dipakai pelanggan; disalin dari draft saat diterbitkan. */
  publishedConfigJson: text("published_config_json"),
  moduleSlug: text("module_slug"),
  quotaPerMonth: integer("quota_per_month"),
  storesUserData: integer("stores_user_data", { mode: "boolean" }).notNull().default(false),
  usesAi: integer("uses_ai", { mode: "boolean" }).notNull().default(false),
});

export const templateDefinitions = sqliteTable("template_definitions", {
  contentId: text("content_id")
    .primaryKey()
    .references(() => contentItems.id, { onDelete: "cascade" }),
  bodyR2Key: text("body_r2_key").notNull(),
  variablesJson: text("variables_json").notNull().default("[]"),
  outputFormats: text("output_formats").notNull().default('["docx"]'),
});

export const tags = sqliteTable("tags", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const contentTags = sqliteTable(
  "content_tags",
  {
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.contentId, t.tagId] })],
);

export const collections = sqliteTable("collections", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: createdAt(),
});

export const collectionItems = sqliteTable(
  "collection_items",
  {
    collectionId: text("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    order: integer("order").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.collectionId, t.contentId] })],
);

export const assets = sqliteTable("assets", {
  id: id(),
  r2Key: text("r2_key").notNull().unique(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  uploadedBy: text("uploaded_by").references(() => users.id),
  createdAt: createdAt(),
});

// ---------------------------------------------------------------------------
// Data milik user (selalu difilter user_id dari sesi)
// ---------------------------------------------------------------------------

export const readingProgress = sqliteTable(
  "reading_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    chapterId: text("chapter_id").notNull(),
    position: integer("position").notNull().default(0),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.contentId] })],
);

export const bookmarks = sqliteTable(
  "bookmarks",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    chapterId: text("chapter_id").notNull(),
    range: text("range"),
    note: text("note"),
    createdAt: createdAt(),
  },
  (t) => [index("bookmarks_user_idx").on(t.userId, t.contentId)],
);

export const highlights = sqliteTable(
  "highlights",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: text("content_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    chapterId: text("chapter_id").notNull(),
    range: text("range").notNull(),
    note: text("note"),
    createdAt: createdAt(),
  },
  (t) => [index("highlights_user_idx").on(t.userId, t.contentId)],
);

/** Angka kuota per bulan. Log aktivitas mentah TIDAK di D1 (Analytics Engine/PostHog). */
export const usageCounters = sqliteTable(
  "usage_counters",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    period: text("period").notNull(),
    /** `downloads`, `ai_calls`, atau `tool_runs:{contentId}` (kuota per tool). */
    metric: text("metric").notNull(),
    count: integer("count").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.userId, t.period, t.metric] })],
);

// ---------------------------------------------------------------------------
// Mesin retensi (D13)
// ---------------------------------------------------------------------------

export const toolEntries = sqliteTable(
  "tool_entries",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    toolId: text("tool_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    /** YYYY-MM-DD menurut zona waktu user. */
    entryDate: text("entry_date").notNull(),
    dataJson: text("data_json").notNull(),
    createdAt: createdAt(),
  },
  // Satu entri per user per tool per tanggal (diisi ulang = diperbarui).
  (t) => [uniqueIndex("tool_entries_user_tool_date_uq").on(t.userId, t.toolId, t.entryDate)],
);

export const programs = sqliteTable("programs", {
  contentId: text("content_id")
    .primaryKey()
    .references(() => contentItems.id, { onDelete: "cascade" }),
  durationDays: integer("duration_days").notNull(),
  stepsJson: text("steps_json").notNull().default("[]"),
});

export const programEnrollments = sqliteTable(
  "program_enrollments",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: text("program_id")
      .notNull()
      .references(() => programs.contentId, { onDelete: "cascade" }),
    startedAt: integer("started_at", { mode: "timestamp_ms" }).notNull(),
    currentStep: integer("current_step").notNull().default(0),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }),
  },
  (t) => [uniqueIndex("program_enrollments_uq").on(t.userId, t.programId)],
);

/** Hari program yang sudah ditandai selesai oleh user. */
export const programDayCompletions = sqliteTable(
  "program_day_completions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: text("program_id")
      .notNull()
      .references(() => programs.contentId, { onDelete: "cascade" }),
    day: integer("day").notNull(),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.programId, t.day] })],
);

export const streaks = sqliteTable(
  "streaks",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    toolId: text("tool_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    current: integer("current").notNull().default(0),
    longest: integer("longest").notNull().default(0),
    lastEntryDate: text("last_entry_date"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.toolId] })],
);

// ---------------------------------------------------------------------------
// Pemasaran & atribusi
// ---------------------------------------------------------------------------

export const userAcquisition = sqliteTable("user_acquisition", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  firstTouchJson: text("first_touch_json"),
  lastTouchJson: text("last_touch_json"),
  fbc: text("fbc"),
  fbp: text("fbp"),
  gclid: text("gclid"),
  ttclid: text("ttclid"),
  landingPage: text("landing_page"),
  createdAt: createdAt(),
});

export const adSpendDaily = sqliteTable(
  "ad_spend_daily",
  {
    date: text("date").notNull(),
    platform: text("platform", { enum: ["meta", "google", "tiktok"] }).notNull(),
    campaignId: text("campaign_id").notNull(),
    campaignName: text("campaign_name"),
    spendIdr: integer("spend_idr").notNull().default(0),
    impressions: integer("impressions").notNull().default(0),
    clicks: integer("clicks").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.date, t.platform, t.campaignId] })],
);

export const affiliates = sqliteTable("affiliates", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  code: text("code").notNull().unique(),
  commissionRule: text("commission_rule").notNull(),
  status: text("status", { enum: ["active", "paused"] })
    .notNull()
    .default("active"),
  createdAt: createdAt(),
});

export const referrals = sqliteTable("referrals", {
  id: id(),
  affiliateId: text("affiliate_id")
    .notNull()
    .references(() => affiliates.id),
  referredUserId: text("referred_user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  status: text("status", { enum: ["pending", "approved", "paid", "void"] })
    .notNull()
    .default("pending"),
  payoutId: text("payout_id"),
  createdAt: createdAt(),
});

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

/** Semua aksi admin/Studio tercatat di sini (BLUEPRINT bagian 8). */
export const auditLog = sqliteTable(
  "audit_log",
  {
    id: id(),
    actorId: text("actor_id").references(() => users.id),
    action: text("action").notNull(),
    target: text("target"),
    beforeJson: text("before_json"),
    afterJson: text("after_json"),
    ip: text("ip"),
    createdAt: createdAt(),
  },
  (t) => [index("audit_log_created_idx").on(t.createdAt)],
);
