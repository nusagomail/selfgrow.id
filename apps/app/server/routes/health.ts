import type { HealthResponse } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";

export const health = new Hono<AppEnv>().get("/", (c) => {
  const body: HealthResponse = {
    status: "ok",
    version: "0.0.0",
    environment: c.env.ENVIRONMENT,
  };
  return c.json(body);
});
