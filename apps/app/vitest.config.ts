import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  const migrations = await readD1Migrations("../../packages/db/migrations");
  return {
    plugins: [
      cloudflareTest({
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          assets: undefined,
          bindings: {
            ENVIRONMENT: "test",
            APP_URL: "http://localhost:5173",
            SITE_URL: "http://localhost:4321",
            ADMIN_EMAILS: "pemilik@example.com",
            BETTER_AUTH_SECRET: "test-secret-yang-panjang-sekali-untuk-test-saja-123",
            GOOGLE_CLIENT_ID: "test-client-id",
            GOOGLE_CLIENT_SECRET: "test-client-secret",
            // Ambang scraping kecil agar mudah diuji (produksi default 60 bab/jam).
            SCRAPE_CHAPTERS_PER_HOUR: "5",
            TEST_MIGRATIONS: migrations,
          },
        },
      }),
    ],
    test: {
      include: ["server/**/*.test.ts"],
      setupFiles: ["./test/apply-migrations.ts"],
    },
  };
});
