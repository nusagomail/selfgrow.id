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
