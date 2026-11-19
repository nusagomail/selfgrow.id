# CLAUDE.md

Sumber kebenaran produk & arsitektur: docs/BLUEPRINT.md. Baca sebelum mengerjakan fitur baru.
Keputusan di bagian 2 BLUEPRINT terkunci. Jangan usulkan alternatif kecuali diminta.
Pemilik bukan programmer: jelaskan hasil kerja dalam bahasa bisnis, keputusan teknis diambil sesuai BLUEPRINT.

## Struktur

- apps/site (Astro), apps/app (React+Vite PWA di src/ + API Hono di server/, satu Worker, API di /api/v1)
- packages/db (Drizzle), packages/shared (tipe + Zod), packages/renderer (render ebook & tool)
- Bahasa kode & identifier: Inggris. Teks UI: Bahasa Indonesia.
- TypeScript strict. pnpm workspaces. Lint/format: Biome. Test: Vitest.
- Domain diatur lewat konfigurasi (D15). Jangan hardcode selfgrow.id atau workers.dev di kode.

## WAJIB

- Semua endpoint di /v1. Semua input divalidasi Zod dari packages/shared.
- Setiap route konten berbayar memakai middleware requireActiveSubscription.
- Setiap query data milik user difilter user_id dari sesi, bukan dari parameter.
- Status langganan hanya diubah oleh handler webhook Xendit (verifikasi token + idempoten).
- Konten dirender dari JSON ke komponen. Dilarang innerHTML / dangerouslySetInnerHTML.
- Dilarang eval, new Function, atau eksekusi kode yang disimpan di database.
- Konfigurasi logic tool (config_json) tidak pernah dikirim ke klien.
- Log aktivitas ke Analytics Engine/PostHog, bukan tabel D1.
- Perubahan skema hanya lewat migrasi Drizzle, satu migrasi per perubahan.
- Setiap fitur baru disertai test. Perubahan auth/pembayaran/otorisasi disertai test otorisasi.
- Jaga budget performa (BLUEPRINT bagian 10). Lazy-load modul berat.

## DILARANG

- Membaca, menulis, atau mencetak secret produksi. Gunakan staging/sandbox.
- Menambah dependency tanpa menyebut alasannya di deskripsi PR.
- Deploy ke production dari lokal. Production hanya lewat GitHub Actions.
- Mengubah file migrasi yang sudah di-merge.

## Alur kerja

- Branch per fitur -> PR -> CI (lint, typecheck, test, Lighthouse CI, bundle budget) -> merge ke main.
- Setelah perubahan di auth, pembayaran, atau otorisasi: minta review keamanan di sesi terpisah.
- Catat keputusan baru di BLUEPRINT bagian 2.

## Perintah

- pnpm dev | pnpm test | pnpm lint | pnpm typecheck
- pnpm db:generate | pnpm db:migrate:local | pnpm db:migrate:staging
