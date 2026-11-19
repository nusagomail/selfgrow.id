import { API_BASE_PATH } from "@selfgrow/shared";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import type { AppEnv } from "./env";
import { contextMiddleware } from "./middleware/context";
import { admin } from "./routes/admin";
import { health } from "./routes/health";
import { library } from "./routes/library";
import { me } from "./routes/me";
import { studio } from "./routes/studio";

/**
 * API Hono, berdiri sendiri supaya bisa dipecah jadi Worker terpisah kapan saja (BLUEPRINT bagian 4).
 * Semua route di bawah /api/v1.
 */
export const api = new Hono<AppEnv>().basePath(API_BASE_PATH);

api.use("*", secureHeaders());
api.route("/health", health);

api.use("*", contextMiddleware);
// Lapisan tambahan anti-CSRF untuk mutasi berbasis cookie (Better Auth punya cek origin sendiri).
// Klien bearer (mobile) tidak memakai cookie sehingga tidak rentan CSRF dan dilewati.
api.use("*", (c, next) => {
  if (c.req.header("authorization")?.startsWith("Bearer ")) return next();
  return csrf({ origin: [c.env.APP_URL] })(c, next);
});
api.on(["GET", "POST"], "/auth/*", (c) => c.var.auth.handler(c.req.raw));
api.route("/me", me);
api.route("/library", library);
api.route("/studio", studio);
api.route("/admin", admin);

api.notFound((c) => c.json({ error: "not_found" }, 404));
api.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.status === 403 ? "forbidden" : "error" }, err.status);
  }
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export type Api = typeof api;
