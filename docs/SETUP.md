# Panduan setup akun (untuk pemilik)

Langkah di sini dikerjakan pemilik di dashboard layanan luar. Semua kode sudah siap; yang dibutuhkan hanya kunci dan pengaturan akun.
**Jangan pernah tempel secret (Client Secret, API key) ke chat.** Masukkan lewat `wrangler secret` atau form secret yang disediakan Claude.

## 1. Google OAuth (login "Masuk dengan Google")

1. Buka Google Cloud Console → buat project `selfgrow`.
2. **APIs & Services → OAuth consent screen**: tipe _External_, nama aplikasi `selfgrow`, email dukungan, logo (opsional). Scope cukup `email`, `profile`, `openid`.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**, tipe _Web application_.
4. **Authorized redirect URIs**, tambahkan:
   - Lokal: `http://localhost:5173/api/v1/auth/callback/google`
   - Staging: `https://<alamat-staging-app>/api/v1/auth/callback/google`
   - Production (setelah domain dibeli): `https://app.selfgrow.id/api/v1/auth/callback/google`
5. Simpan **Client ID** dan **Client Secret** (secret hanya dimasukkan sebagai secret Worker).
6. Sebelum launch: ajukan verifikasi aplikasi di OAuth consent screen (status _In production_).

## 2. Cloudflare

Dibutuhkan untuk staging dan production: D1 (`selfgrow-staging`), KV, Turnstile, Access.

- **Turnstile**: dashboard → Turnstile → Add site → domain staging/production. Site key dipakai di frontend (`VITE_TURNSTILE_SITE_KEY`), secret key sebagai secret Worker `TURNSTILE_SECRET_KEY`.
- **Access (D17)**: staging memakai Access tingkat Worker (sekali klik).
  Workers & Pages → `selfgrow-app-staging` → **Access** → *Protect this Worker behind Access*,
  scope **All traffic**, policy **Cloudflare account** (hanya anggota akun Cloudflare pemilik).
  Team domain (`ACCESS_TEAM_DOMAIN`) dan *Application Audience (AUD) tag* (`ACCESS_AUD`) ditulis di
  `apps/app/wrangler.jsonc` env `staging`; keduanya bukan rahasia. Worker tetap memverifikasi JWT
  `Cf-Access-Jwt-Assertion` untuk `/api/v1/studio/*` dan `/api/v1/admin/*`.
  Untuk production (domain `selfgrow.id`), cukup lindungi path `/studio*`, `/admin*`,
  `/api/v1/studio/*`, `/api/v1/admin/*` karena halaman pelanggan harus publik.
- **ADMIN_EMAILS**: email Google pemilik. Akun dengan email ini otomatis menjadi admin saat login pertama.

## 3. Deploy staging otomatis (GitHub Actions)

Workflow `.github/workflows/deploy-staging.yml` men-deploy staging setiap ada merge ke `main`.
Isi GitHub → repo `selfgrow.id` → **Settings → Secrets and variables → Actions → New repository secret**:

| Nama secret            | Isi                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` | Token dari Cloudflare: My Profile → API Tokens → Create Token → template **Edit Cloudflare Workers**, lalu tambahkan izin **Account → D1 → Edit** |
| `GOOGLE_CLIENT_ID`     | Dari langkah 1                                                                                                                                    |
| `GOOGLE_CLIENT_SECRET` | Dari langkah 1                                                                                                                                    |
| `ADMIN_EMAILS`         | Email Google pemilik                                                                                                                              |

`BETTER_AUTH_SECRET` dibuat otomatis oleh workflow (acak, tidak pernah ditampilkan).
Setelah deploy pertama, alamat staging dan Redirect URI Google muncul di ringkasan run GitHub Actions. Tambahkan Redirect URI itu di Google Cloud Console (langkah 1.4).

Database dan cache staging sudah dibuat di Cloudflare: D1 `selfgrow-staging` (APAC) dan KV `selfgrow-staging-kv`.

## 4. Secret Worker manual (opsional)

```sh
cd apps/app
npx wrangler secret put BETTER_AUTH_SECRET --env staging   # string acak ≥ 32 karakter
npx wrangler secret put GOOGLE_CLIENT_ID --env staging
npx wrangler secret put GOOGLE_CLIENT_SECRET --env staging
npx wrangler secret put TURNSTILE_SECRET_KEY --env staging
```
