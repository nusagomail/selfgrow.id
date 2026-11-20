import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

// Etalase publik (BLUEPRINT bagian 4, 5, 10). Halaman dirender di edge dari katalog publik
// `app` (service binding APP), tanpa logika bisnis, dan di-cache singkat di edge.
export default defineConfig({
  // Production mengisi SITE_URL; selain itu alamat dasar diambil dari request (D15).
  site: process.env.SITE_URL || undefined,
  output: "server",
  adapter: cloudflare(),
  build: { inlineStylesheets: "always" },
});
