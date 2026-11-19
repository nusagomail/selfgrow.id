import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

// Halaman publik. Astro hanya membaca data publik dari API, tanpa logika bisnis (BLUEPRINT bagian 4).
export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  output: "static",
  adapter: cloudflare(),
});
