import { and, eq, schema } from "@selfgrow/db";
import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { AppEnv } from "../env";
import { getAccessStatus } from "../services/entitlements";
import { getFreeze } from "../services/protection";

/** 401 bila belum login. */
export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  if (!c.var.user) return c.json({ error: "unauthorized" }, 401);
  await next();
});

/**
 * WAJIB di setiap route konten berbayar (BLUEPRINT bagian 7).
 * 401 bila belum login, 403 bila langganan tidak aktif.
 */
export const requireActiveSubscription = createMiddleware<AppEnv>(async (c, next) => {
  const user = c.var.user;
  if (!user) return c.json({ error: "unauthorized" }, 401);
  const [status, frozen] = await Promise.all([
    getAccessStatus(c.env.KV, c.var.db, user),
    getFreeze(c.env.KV, user.id),
  ]);
  // Akun dibekukan sementara karena terdeteksi scraping (BLUEPRINT bagian 8).
  if (frozen) return c.json({ error: "account_frozen", until: frozen.until }, 423);
  if (!status.active) return c.json({ error: "subscription_required" }, 403);
  await next();
});

/** Tier konten yang terbuka untuk semua user login tanpa langganan (D35). */
export const FREE_TIER = "free";

/** Apakah konten terbit (jenis + slug) ditandai gratis di Studio. */
export async function isFreeContent(
  db: AppEnv["Variables"]["db"],
  type: "ebook" | "tool" | "template" | "program",
  slug: string,
): Promise<boolean> {
  const item = await db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, type),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
    columns: { tier: true },
  });
  return item?.tier === FREE_TIER;
}

/**
 * Seperti `requireActiveSubscription`, tetapi konten yang ditandai gratis (D35) boleh dipakai
 * user login tanpa langganan. Pembekuan akun (D28) tetap berlaku untuk semua.
 * Dipakai di route konten yang punya parameter `:slug`.
 */
export function requireActiveSubscriptionUnlessFree(
  type: "ebook" | "tool" | "template" | "program",
) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const user = c.var.user;
    if (!user) return c.json({ error: "unauthorized" }, 401);
    const [status, frozen, free] = await Promise.all([
      getAccessStatus(c.env.KV, c.var.db, user),
      getFreeze(c.env.KV, user.id),
      isFreeContent(c.var.db, type, c.req.param("slug") ?? ""),
    ]);
    if (frozen) return c.json({ error: "account_frozen", until: frozen.until }, 423);
    if (!status.active && !free) return c.json({ error: "subscription_required" }, 403);
    await next();
  });
}

/** 403 untuk selain admin. Dipakai bersama requireAccess di /studio dan /admin. */
export const requireAdmin = createMiddleware<AppEnv>(async (c, next) => {
  const user = c.var.user;
  if (!user) return c.json({ error: "unauthorized" }, 401);
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  await next();
});

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Lapisan kedua di balik Cloudflare Access (D17): verifikasi JWT Access di header
 * `Cf-Access-Jwt-Assertion`. Gagal tertutup: hanya dilewati saat test, atau saat
 * ENVIRONMENT=local DAN request benar-benar ke localhost (dev di mesin sendiri).
 */
export const requireAccess = createMiddleware<AppEnv>(async (c, next) => {
  const { ENVIRONMENT, ACCESS_TEAM_DOMAIN, ACCESS_AUD } = c.env;
  if (ENVIRONMENT === "test") return next();
  if (ENVIRONMENT === "local" && LOCAL_HOSTS.has(new URL(c.req.url).hostname)) return next();

  if (!ACCESS_TEAM_DOMAIN || !ACCESS_AUD) return c.json({ error: "forbidden" }, 403);
  const token = c.req.header("cf-access-jwt-assertion");
  if (!token) return c.json({ error: "forbidden" }, 403);

  const issuer = `https://${ACCESS_TEAM_DOMAIN}`;
  let jwks = jwksCache.get(issuer);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
    jwksCache.set(issuer, jwks);
  }
  try {
    await jwtVerify(token, jwks, { issuer, audience: ACCESS_AUD });
  } catch {
    return c.json({ error: "forbidden" }, 403);
  }
  await next();
});
