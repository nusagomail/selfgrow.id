# selfgrow.id

Platform langganan konten pengembangan diri. Sumber kebenaran produk & arsitektur: [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

## Struktur

| Folder              | Isi                                                                            |
| ------------------- | ------------------------------------------------------------------------------ |
| `apps/site`         | Astro: halaman publik (landing, katalog, harga, blog)                          |
| `apps/app`          | React SPA (`src/`) + API Hono di `/api/v1` (`server/`), satu Cloudflare Worker |
| `packages/db`       | Skema D1 (Drizzle) + migrasi                                                   |
| `packages/shared`   | Tipe, skema Zod, konstanta                                                     |
| `packages/renderer` | Mesin render ebook & tool (dipakai web dan mobile)                             |

## Perintah

```sh
pnpm install
pnpm dev         # jalankan site + app lokal
pnpm test        # semua test
pnpm lint        # Biome
pnpm typecheck   # TypeScript strict
```
