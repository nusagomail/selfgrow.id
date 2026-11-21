import type { Database } from "@selfgrow/db";
import type { createAuth } from "./auth/auth";

/**
 * Binding & variabel Worker.
 * Secret (BETTER_AUTH_SECRET, GOOGLE_*, TURNSTILE_SECRET_KEY) hanya lewat `wrangler secret`
 * atau `.dev.vars` lokal, tidak pernah di repo.
 */
export interface Env {
  ENVIRONMENT: "local" | "test" | "staging" | "production";
  APP_URL: string;
  SITE_URL: string;
  /** Email yang otomatis menjadi admin saat akun dibuat, dipisah koma. */
  ADMIN_EMAILS: string;
  /** Cloudflare Access: domain tim (mis. `selfgrow.cloudflareaccess.com`) dan AUD aplikasi. */
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;

  BETTER_AUTH_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  TURNSTILE_SECRET_KEY?: string;

  DB: D1Database;
  KV: KVNamespace;
  /** File privat: isi bab ebook, template, aset (BLUEPRINT bagian 5). Tidak pernah publik. */
  CONTENT: R2Bucket;
  ASSETS: Fetcher;

  /** Rate limit (jendela 60 detik): per user per kelompok endpoint, dan per IP. */
  RL_USER: RateLimit;
  RL_IP: RateLimit;
  /** Batas per IP untuk sampul & gambar isi (D38), jauh lebih longgar dari RL_IP. */
  RL_MEDIA: RateLimit;
  /** Penghitung bab berbeda per jam per user (deteksi scraping, BLUEPRINT bagian 8). */
  READ_GUARD: DurableObjectNamespace<import("./durable/read-guard").ReadGuard>;
  /** Ambang bab berbeda per jam sebelum akun dibekukan sementara. Default 60. */
  SCRAPE_CHAPTERS_PER_HOUR?: string;
  /** Ambang bab berbeda per 24 jam. Default 300. */
  SCRAPE_CHAPTERS_PER_DAY?: string;
}

export type Auth = ReturnType<typeof createAuth>;
export type SessionData = NonNullable<Awaited<ReturnType<Auth["api"]["getSession"]>>>;
export type SessionUser = SessionData["user"];

export type AppEnv = {
  Bindings: Env;
  Variables: {
    db: Database;
    auth: Auth;
    user: SessionUser | null;
    session: SessionData["session"] | null;
  };
};
