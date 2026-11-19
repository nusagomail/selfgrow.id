import type { HealthResponse } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppBindings } from "../env";

export const health = new Hono<AppBindings>().get("/", (c) => {
  const body: HealthResponse = {
    status: "ok",
    version: "0.0.0",
    environment: c.env.ENVIRONMENT,
  };
  return c.json(body);
});
