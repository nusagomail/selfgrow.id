import type { HealthResponse } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";

export const health = new Hono<AppEnv>()
  /** Konfigurasi publik untuk klien: alamat etalase (pengunjung belum login diarahkan ke sana). */
  .get("/config", (c) => {
    c.header("Cache-Control", "public, max-age=300");
    return c.json({ siteUrl: c.env.SITE_URL || null });
  })
  .get("/", (c) => {
    const body: HealthResponse = {
      status: "ok",
      version: "0.0.0",
      environment: c.env.ENVIRONMENT,
    };
    return c.json(body);
  });
