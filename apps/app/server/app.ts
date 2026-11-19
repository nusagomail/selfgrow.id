import { API_BASE_PATH } from "@selfgrow/shared";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { AppBindings } from "./env";
import { health } from "./routes/health";

/**
 * API Hono, berdiri sendiri supaya bisa dipecah jadi Worker terpisah kapan saja (BLUEPRINT bagian 4).
 * Semua route di bawah /api/v1.
 */
export const api = new Hono<AppBindings>().basePath(API_BASE_PATH);

api.use("*", secureHeaders());
api.route("/health", health);

api.notFound((c) => c.json({ error: "not_found" }, 404));
api.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export type Api = typeof api;
