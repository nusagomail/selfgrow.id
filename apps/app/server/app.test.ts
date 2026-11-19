import { healthResponseSchema } from "@selfgrow/shared";
import { describe, expect, it } from "vitest";
import { testEnv as env } from "../test/helpers";
import { api } from "./app";

describe("API /api/v1", () => {
  it("GET /api/v1/health mengembalikan status ok", async () => {
    const res = await api.request("/api/v1/health", {}, env);
    expect(res.status).toBe(200);
    expect(healthResponseSchema.parse(await res.json())).toEqual({
      status: "ok",
      version: "0.0.0",
      environment: "test",
    });
  });

  it("path di luar /v1 tidak dilayani", async () => {
    const res = await api.request("/api/health", {}, env);
    expect(res.status).toBe(404);
  });

  it("route tidak dikenal mengembalikan 404 JSON", async () => {
    const res = await api.request("/api/v1/tidak-ada", {}, env);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });

  it("memasang header keamanan", async () => {
    const res = await api.request("/api/v1/health", {}, env);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });
});
