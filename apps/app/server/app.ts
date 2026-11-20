import { API_BASE_PATH } from "@selfgrow/shared";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import { resolveAppUrl } from "./auth/auth";
import type { AppEnv } from "./env";
import { contextMiddleware } from "./middleware/context";
import { admin } from "./routes/admin";
import { ebooks } from "./routes/ebooks";
import { health } from "./routes/health";
import { library } from "./routes/library";
import { me } from "./routes/me";
import { programs } from "./routes/programs";
import { studio } from "./routes/studio";
import { studioPrograms } from "./routes/studio-programs";
import { studioTemplates } from "./routes/studio-templates";
import { studioTools } from "./routes/studio-tools";
import { templates } from "./routes/templates";
import { tools } from "./routes/tools";
import { rateLimit } from "./services/protection";

/**
 * API Hono, berdiri sendiri supaya bisa dipecah jadi Worker terpisah kapan saja (BLUEPRINT bagian 4).
 * Semua route di bawah /api/v1.
 */
export const api = new Hono<AppEnv>().basePath(API_BASE_PATH);

api.use("*", secureHeaders());
api.route("/health", health);

// Batas ukuran body request (dokumen bab terbesar jauh di bawah ini).
api.use(
  "*",
  bodyLimit({
    maxSize: 2 * 1024 * 1024,
    onError: (c) => c.json({ error: "payload_too_large" }, 413),
  }),
);
api.use("*", contextMiddleware);
// Lapisan tambahan anti-CSRF untuk mutasi berbasis cookie (Better Auth punya cek origin sendiri).
// Klien bearer murni (mobile, tanpa cookie) tidak rentan CSRF dan dilewati. Bila ada cookie,
// cek tetap jalan karena plugin bearer jatuh ke cookie saat token tidak valid.
api.use("*", (c, next) => {
  const bearerOnly =
    c.req.header("authorization")?.startsWith("Bearer ") && !c.req.header("cookie");
  if (bearerOnly) return next();
  return csrf({ origin: [resolveAppUrl(c.env, c.req.url)] })(c, next);
});
api.post("/auth/*", rateLimit("auth"));
api.on(["GET", "POST"], "/auth/*", (c) => c.var.auth.handler(c.req.raw));
api.route("/me", me);
api.route("/library", library);
api.route("/ebooks", ebooks);
api.route("/studio/tools", studioTools);
api.route("/studio/templates", studioTemplates);
api.route("/studio/programs", studioPrograms);
api.route("/studio", studio);
api.route("/tools", tools);
api.route("/templates", templates);
api.route("/programs", programs);
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
