import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { AppEnv } from "../env";
import { getSubscriptionStatus } from "../services/entitlements";

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
  const status = await getSubscriptionStatus(c.env.KV, c.var.db, user.id);
  if (!status.active) return c.json({ error: "subscription_required" }, 403);
  await next();
});

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
