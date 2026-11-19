import { createDb, schema } from "@selfgrow/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, captcha } from "better-auth/plugins";
import type { Env } from "../env";
import { deviceLabelFromUserAgent } from "./device";
import { enforceSessionLimit } from "./session-limit";

export const AUTH_BASE_PATH = "/api/v1/auth";

export function isAdminEmail(env: Pick<Env, "ADMIN_EMAILS">, email: string) {
  return (env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

/**
 * Better Auth (D4): hanya login Google, tanpa password.
 * - Akun dicocokkan lewat (provider, provider_account_id), bukan email: account linking dimatikan.
 * - Token bearer diterima selain cookie (WAJIB, siap untuk mobile).
 * - Turnstile di endpoint login bila TURNSTILE_SECRET_KEY diset.
 */
export function createAuth(env: Env) {
  if (env.ENVIRONMENT === "production" && !env.TURNSTILE_SECRET_KEY) {
    throw new Error("TURNSTILE_SECRET_KEY wajib di production");
  }
  const db = createDb(env.DB);
  const secure = env.APP_URL.startsWith("https://");

  return betterAuth({
    appName: "selfgrow",
    baseURL: env.APP_URL,
    basePath: AUTH_BASE_PATH,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.APP_URL, env.SITE_URL],
    database: drizzleAdapter(db, {
      provider: "sqlite",
      usePlural: true,
      schema: {
        users: schema.users,
        sessions: schema.sessions,
        accounts: schema.accounts,
        verifications: schema.verifications,
      },
    }),
    emailAndPassword: { enabled: false },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        prompt: "select_account",
      },
    },
    account: { accountLinking: { enabled: false } },
    user: {
      additionalFields: {
        role: { type: "string", required: false, defaultValue: "member", input: false },
        deletedAt: { type: "date", required: false, input: false },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
      additionalFields: {
        deviceLabel: { type: "string", required: false, input: false },
      },
    },
    advanced: {
      useSecureCookies: secure,
      defaultCookieAttributes: { sameSite: "lax", secure, httpOnly: true },
      ipAddress: { ipAddressHeaders: ["cf-connecting-ip"] },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => ({
            data: { ...user, role: isAdminEmail(env, user.email) ? "admin" : "member" },
          }),
        },
      },
      session: {
        create: {
          before: async (session) => ({
            data: { ...session, deviceLabel: deviceLabelFromUserAgent(session.userAgent) },
          }),
          after: async (session) => {
            await enforceSessionLimit(db, session.userId);
          },
        },
      },
    },
    plugins: [
      bearer(),
      ...(env.TURNSTILE_SECRET_KEY
        ? [
            captcha({
              provider: "cloudflare-turnstile",
              secretKey: env.TURNSTILE_SECRET_KEY,
              endpoints: ["/sign-in/social"],
            }),
          ]
        : []),
    ],
  });
}
