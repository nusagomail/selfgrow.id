import { healthResponseSchema } from "@selfgrow/shared";
import { describe, expect, it } from "vitest";
import { call, testEnv as env } from "../test/helpers";
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

describe("konfigurasi publik", () => {
  it("memberi alamat etalase untuk mengarahkan pengunjung yang belum login", async () => {
    const r = await call("/api/v1/health/config");
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ siteUrl: "http://localhost:4321" });
  });
});
