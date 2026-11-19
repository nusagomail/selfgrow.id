# Blueprint Platform Konten Berlangganan

Nov 19, 2026 · @Dhuha

## 1. Visi & cara memakai dokumen ini

Platform web berlangganan Rp100.000/user/bulan untuk menikmati konten buatan platform sendiri: ebook interaktif (bukan PDF), tools, dan template. Dibangun dan dijalankan oleh satu orang (pemilik) dengan Claude dan Claude Code sebagai tim. Target: bisnis bernilai miliaran rupiah per tahun dengan biaya operasional minimal.

**Untuk pemilik:** baca bagian 1–3 untuk gambaran besar, bagian 12 untuk pemasaran, bagian 14 untuk urutan kerja.

**Untuk Claude / Claude Code:** dokumen ini adalah sumber kebenaran produk dan arsitektur. Aturannya:

- Keputusan di bagian 2 bersifat **terkunci**. Jangan mengusulkan alternatif kecuali diminta pemilik.
- Kata **WAJIB** berarti tidak boleh dilanggar. **HINDARI** berarti hanya boleh dengan alasan tertulis di commit atau PR.
- Bila ada konflik antara kode dan dokumen ini, dokumen menang, lalu laporkan konfliknya.
- Simpan dokumen ini di repo sebagai `docs/BLUEPRINT.md` dan rujuk dari `CLAUDE.md` (isi bagian 13).
- Bila keputusan baru diambil, tambahkan baris ke tabel bagian 2, jangan menulis ulang sejarahnya.

## 2. Keputusan yang sudah dikunci

| #   | Keputusan                                                                                                                                                                                       | Alasan                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Web-first. Semua penjualan dan pemakaian lewat web                                                                                                                                              | Validasi bisnis tanpa biaya dan aturan store                                                                                                                           |
| D2  | Aplikasi Android/iOS baru dibangun setelah sekitar 10.000 pelanggan aktif                                                                                                                       | Aplikasi untuk kenyamanan pelanggan, bukan kanal penjualan                                                                                                             |
| D3  | Pembayaran hanya Xendit, hanya di web                                                                                                                                                           | Potongan store 0%. Aplikasi mobile nanti "bayar di web, pakai di app" tanpa tombol beli                                                                                |
| D4  | Login hanya dengan akun Google (Sign in with Apple ditambah saat ada app iOS)                                                                                                                   | Tidak ada password, tidak ada fitur lupa password                                                                                                                      |
| D5  | Stack inti: Astro + React SPA + Hono, semua di Cloudflare, satu monorepo GitHub                                                                                                                 | Sesuai keahlian pemilik, murah, skalabel, punya jalur keluar                                                                                                           |
| D6  | Konten dibuat langsung di Studio platform, disimpan sebagai data terstruktur (JSON)                                                                                                             | Anti-pembajakan dan bisa dipakai ulang di mobile                                                                                                                       |
| D7  | Ebook dan tools tidak bisa diunduh. Template boleh diunduh (pembajakan diterima)                                                                                                                | Nilai inti dilindungi, template jadi nilai tambah                                                                                                                      |
| D8  | Logika tools berjalan di server, tidak pernah dikirim ke browser                                                                                                                                | Tools tidak bisa disalin                                                                                                                                               |
| D9  | Tim = pemilik + Claude + Claude Code, tanpa karyawan                                                                                                                                            | Semua operasional harus otomatis                                                                                                                                       |
| D10 | Harga dasar Rp100.000/bulan, dengan opsi tahunan dan harga founding member                                                                                                                      | Arus kas di depan, retensi lebih tinggi                                                                                                                                |
| D11 | Niche: pengembangan diri untuk konsumen umum, sebagai brand payung multi-kategori (nama kerja: selfgrow.id)                                                                                     | Katalog luas membuat Rp100rb terasa sepadan dan membuka banyak pintu SEO                                                                                               |
| D12 | Iklan selalu masuk lewat satu pain point spesifik per kampanye, bukan pesan "platform lengkap"                                                                                                  | Hook tajam menurunkan biaya akuisisi                                                                                                                                   |
| D13 | Retensi ditopang tools tracker (data pribadi user tersimpan) dan template jadwal/program, setiap masalah punya solusi yang dipakai rutin                                                        | Pelanggan bertahan karena kebiasaan dan datanya, bukan karena jumlah ebook                                                                                             |
| D14 | `app` dan `api` di-deploy sebagai satu Worker (SPA + Hono di `/api/v1`). Seluruh fitur web dan isi awal siap saat launch, tanpa MVP. Hanya aplikasi mobile yang ditunda (bagian 14)             | Dua unit deploy, tanpa CORS. Pelanggan pertama harus mendapat produk yang lengkap fitur dan isinya agar bertahan lama                                                  |
| D15 | Domain produksi `selfgrow.id` (dibeli sebelum launch). Sampai domain dibeli, staging memakai subdomain `*.workers.dev` dari Cloudflare. Nama domain diatur lewat konfigurasi, tidak di-hardcode | Pembangunan bisa jalan sebelum domain dibeli. Catatan: `workers.dev` tidak bisa berbagi cookie antar-subdomain, jadi uji atribusi iklan (fase 1D) menunggu domain asli |
| D16 | Tabel auth (`users`, `sessions`, `accounts`) mengikuti skema Better Auth, dengan kolom tambahan bagian 6 (role, device\_label, deleted\_at, dll.) sebagai additional fields                     | Satu sumber identitas tanpa tabel ganda                                                                                                                                |
| D17 | Cloudflare Access melindungi `/studio`, `/admin`, **dan** `/api/v1/studio/*`, `/api/v1/admin/*`                                                                                                 | SPA mengambil data lewat API, jadi path API juga harus di balik Access                                                                                                 |
| D18 | Unduhan template disajikan lewat Worker dengan token sekali pakai berumur 5 menit (pengganti signed URL R2)                                                                                     | Tanpa kredensial S3 API di Worker, efek sama                                                                                                                           |
| D19 | `content_items.type` ditambah `program`                                                                                                                                                         | Program bertahap (bagian 5) butuh slug, status, dan halaman etalase seperti konten lain; tabel `programs` merujuk `content_items`                                      |
| D20 | Admin pertama ditentukan lewat variabel `ADMIN_EMAILS` saat akun dibuat; perubahan role berikutnya lewat `/admin` dan tercatat di `audit_log`                                                   | Tidak perlu akses database manual untuk bootstrap admin                                                                                                                |

## 3. Model bisnis & tahapan

Satu langganan membuka semua konten. Kolom `tier` tetap disiapkan agar kelak bisa ada paket Basic/Pro tanpa ubah arsitektur.

**Paket harga**

- Bulanan: Rp100.000
- Tahunan: setara 10 bulan (diskon sekitar 2 bulan)
- Founding member: 500 pelanggan pertama mendapat harga Rp49.000–69.000 yang terkunci selama langganan aktif

**Jenis konten**

- **Ebook**: dibaca di platform per bab, interaktif, bisa berisi tool tertanam. Tidak bisa diunduh.
- **Tools**: kalkulator, checklist penilaian, decision tree, generator. Dipakai di platform, logika di server.
- **Template**: diisi lewat form di platform, server menghasilkan file DOCX/PDF/XLSX untuk diunduh, dengan kuota per bulan.

**Tahapan besar**

1. **Fase 1, web + PWA**: semua fitur inti, pembayaran Xendit, pemasaran berbasis web.
2. **Fase 2, mobile** (setelah sekitar 10.000 pelanggan aktif): bungkus `app` dengan Capacitor atau evaluasi ulang Expo. Login Google native + Sign in with Apple. Tanpa elemen pembelian di aplikasi.

**Angka acuan unit economics**

| Churn bulanan | LTV kotor   | CAC maksimal (LTV:CAC 3:1) |
| ------------- | ----------- | -------------------------- |
| 5%            | Rp2.000.000 | \~Rp650.000                |
| 10%           | Rp1.000.000 | \~Rp330.000                |
| 20%           | Rp500.000   | \~Rp165.000                |

## 4. Arsitektur & tech stack

Dua unit deploy (`site` dan `app`, dengan API di dalam `app`) dalam satu monorepo, semuanya di Cloudflare, satu domain induk. API-first: semua logika bisnis ada di `api`, web hanya klien, sehingga aplikasi mobile kelak cukup jadi klien kedua.

Semua klien hanya bicara ke `api`, dan hanya `api` yang menyentuh data serta layanan luar.

| Bagian              | Teknologi                                                    | Peran                                                                                          | Domain            |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ----------------- |
| `apps/site`         | Astro (SSG/SSR) di Cloudflare                                | Halaman publik: landing, katalog, preview, harga, blog, checkout                               | `selfgrow.id`     |
| `apps/app`          | React + Vite + TanStack Router (PWA) + Hono, **satu Worker** | SPA area login (perpustakaan, reader, tools, template, akun, Studio, admin) + API di `/api/v1` | `app.selfgrow.id` |
| `packages/db`       | Drizzle ORM + migrasi                                        | Skema D1, satu sumber tipe data                                                                | —                 |
| `packages/shared`   | TypeScript + Zod                                             | Tipe, validasi, nama event, konstanta                                                          | —                 |
| `packages/renderer` | React                                                        | Mesin render ebook (JSON → komponen) dan mesin tool, dipakai web dan mobile                    | —                 |

Kode API tetap dipisah di folder `apps/app/server` dengan routing Hono sendiri, sehingga bisa dipecah menjadi Worker terpisah kapan saja tanpa menulis ulang. Aplikasi mobile kelak memanggil `app.selfgrow.id/api/v1`.

**Layanan Cloudflare:** Workers, D1 (database), R2 (file privat), KV (cache status langganan), Queues (webhook, email, konversi iklan), Cron Triggers (rekonsiliasi, tarik biaya iklan, backup), Analytics Engine (log aktivitas volume besar), Rate Limiting, Turnstile, Zaraz (tag iklan + consent), Access (proteksi Studio/admin), Images.

**Layanan pihak ketiga:** Xendit (pembayaran), Better Auth (auth, berjalan di Workers + D1), Resend (email), WhatsApp Business API (pengingat), PostHog (analytics produk & A/B test), Sentry (error).

**Aturan arsitektur:**

- WAJIB semua endpoint di path versi `/v1/...`.
- WAJIB API menerima token bearer selain cookie, supaya siap untuk mobile.
- WAJIB `site` dan `app` satu domain induk agar cookie first-party dan atribusi iklan tidak putus.
- HINDARI logika bisnis di endpoint Astro. Astro hanya membaca data publik dari `api`.
- Jalur keluar: Hono bisa jalan di Node/Bun, Drizzle mendukung Postgres, R2 kompatibel S3.

## 5. Model konten & Studio

Semua konten adalah satu "item" (`content_items`) dengan tipe berbeda, dibuat di Studio (`app.selfgrow.id/studio`), dan tidak pernah disimpan sebagai file jadi di repo atau bundle publik.

### Ebook Studio

- Editor blok Tiptap: heading, paragraf, gambar, tabel, daftar, kutipan.
- Blok khusus: callout/tips, checklist, kuis singkat, **tool tertanam**, gambar dengan caption.
- Manajemen bab: urutkan, draft/terbit per bab, autosave, riwayat versi, preview sebagai pelanggan.
- Penyimpanan: JSON Tiptap per bab. Metadata di D1, isi bab di R2 (`ebooks/{id}/chapters/{chapterId}.json`) supaya D1 tetap ramping.
- Render: `packages/renderer` mengubah JSON menjadi komponen React. WAJIB tanpa `innerHTML`.

### Tool Builder

- **Tingkat 1, no-code**: tool = konfigurasi JSON berisi `inputs` (field form + validasi), `logic` (rumus/aturan dalam JSON Logic), `outputs` (hasil, tabel, rekomendasi). Pola: kalkulator, skor/penilaian, decision tree, generator teks.
- **Tingkat 2, custom code**: modul React di `apps/app/src/tools/{slug}` + endpoint di `apps/app/server/tools/{slug}`, didaftarkan di registry yang sama.
- Eksekusi: `POST /v1/tools/:id/run`. Browser hanya mengirim input dan menerima output. Konfigurasi `logic` tidak pernah dikirim ke klien.
- WAJIB tanpa `eval`, `new Function`, atau JavaScript bebas yang ditulis di Studio.
- Tool yang memakai AI: kuota per user per bulan dan batas biaya global.

### Template Builder

- Ditulis di editor yang sama dengan variabel `{{nama_variabel}}` dan bagian bersyarat.
- Pelanggan mengisi form, lalu server menghasilkan DOCX (`docx`), PDF (`pdf-lib`, atau Browser Rendering untuk yang kompleks), atau XLSX (SheetJS).
- File besar diproses lewat Queues dan user diberi notifikasi saat siap.
- Kuota unduh per bulan (awal: 20 per user, bisa diatur). ID pelanggan disisipkan di metadata file.
- WAJIB sanitasi isian yang diawali `=`, `+`, `-`, `@` di XLSX/CSV (formula injection).

### Mesin retensi: tracker & program (D13)

Setiap kategori minimal punya satu tool yang dipakai rutin dan satu template jadwal/program, sehingga setiap pain point punya pasangan solusi: ebook menjelaskan, tool melacak, template menjadwalkan.

- **Tool tracker**: tool no-code bisa ditandai `stores_user_data`, sehingga input user tersimpan per tanggal (habit, keuangan, mood, target, lamaran kerja, waktu belajar). Tampilan: riwayat, grafik progres, streak.
- **Program bertahap**: rangkaian harian/mingguan (misalnya 30 hari) yang menggabungkan bab ebook, tugas, dan tool tracker. User mendaftar, lalu platform membuka langkah sesuai hari.
- **Template jadwal**: template yang bisa dipakai langsung di platform (jadwal harian, rencana mingguan, rencana bulanan), dengan opsi unduh.
- **Ritual**: review mingguan otomatis (ringkasan progres di platform + email/WhatsApp), pengingat streak, tantangan bulanan.
- Data tracker milik user: bisa diekspor (UU PDP), tetap tersimpan 90 hari setelah langganan berakhir agar mudah kembali berlangganan.

### Etalase publik (otomatis)

Setiap konten yang terbit otomatis punya halaman di `site`: ringkasan, daftar isi, bab pertama gratis (ebook), demo terbatas 3 kali pakai (tools), preview visual (template). Taksonomi: kategori → topik → tag, ditambah koleksi/seri dan level.

## 6. Skema data inti

D1 hanya menyimpan data inti dan angka ringkas. Log aktivitas mentah WAJIB ke Analytics Engine/PostHog, bukan ke D1. Semua perubahan skema WAJIB lewat file migrasi Drizzle.

| Tabel                                               | Kolom utama                                                                                                                                       | Catatan                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `users`                                             | id, name, email, avatar\_url, role (`member`/`admin`), created\_at, deleted\_at                                                                   | Identitas tidak bergantung email               |
| `accounts`                                          | user\_id, provider (`google`/`apple`), provider\_account\_id                                                                                      | Siap untuk Sign in with Apple                  |
| `sessions`                                          | id, user\_id, device\_label, user\_agent, last\_seen\_at, expires\_at                                                                             | Batas 2 perangkat aktif                        |
| `plans`                                             | id, name, interval (`month`/`year`), price\_idr, tier, is\_founding                                                                               | Harga di sini, bukan di kode                   |
| `entitlements`                                      | user\_id, plan\_id, source (`xendit`), status, current\_period\_end, auto\_renew                                                                  | Satu-satunya sumber hak akses                  |
| `payments`                                          | id, user\_id, xendit\_id (unik), amount\_idr, method, status, paid\_at, raw\_payload                                                              | Idempotensi webhook                            |
| `content_items`                                     | id, type (`ebook`/`tool`/`template`), slug, title, summary, tier, status (`draft`/`review`/`published`), category\_id, published\_at, updated\_at | Kolom `review` disiapkan walau dipakai sendiri |
| `content_versions`                                  | content\_id, version, snapshot\_ref, created\_by, created\_at                                                                                     | Riwayat versi semua tipe                       |
| `ebook_chapters`                                    | id, content\_id, order, title, is\_free\_preview, r2\_key, word\_count                                                                            | Isi di R2                                      |
| `tool_definitions`                                  | content\_id, kind (`nocode`/`custom`), config\_json atau module\_slug, quota\_per\_month                                                          | `config_json` tidak pernah dikirim ke klien    |
| `template_definitions`                              | content\_id, body\_r2\_key, variables\_json, output\_formats                                                                                      | —                                              |
| `categories`, `tags`, `content_tags`, `collections` | —                                                                                                                                                 | Taksonomi                                      |
| `reading_progress`                                  | user\_id, content\_id, chapter\_id, position, updated\_at                                                                                         | Satu baris per user per ebook                  |
| `bookmarks`, `highlights`                           | user\_id, content\_id, chapter\_id, range, note                                                                                                   | —                                              |
| `usage_counters`                                    | user\_id, period (YYYY-MM), metric (`downloads`/`tool_runs`/`ai_calls`), count                                                                    | Untuk kuota                                    |
| `user_acquisition`                                  | user\_id, first\_touch\_json, last\_touch\_json, fbc, fbp, gclid, ttclid, landing\_page                                                           | Atribusi iklan                                 |
| `ad_spend_daily`                                    | date, platform, campaign\_id, campaign\_name, spend\_idr, impressions, clicks                                                                     | Ditarik oleh cron                              |
| `affiliates`, `referrals`                           | code, user\_id, commission\_rule, referred\_user\_id, status, payout\_id                                                                          | Program afiliasi                               |
| `audit_log`                                         | actor\_id, action, target, before\_json, after\_json, ip, created\_at                                                                             | Semua aksi admin/Studio                        |
| `assets`                                            | id, r2\_key, mime, size, uploaded\_by                                                                                                             | Gambar dan file                                |

Tabel tambahan untuk mesin retensi:

| Tabel                 | Kolom utama                                                      | Catatan                                                                                                                  |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `tool_entries`        | id, user\_id, tool\_id, entry\_date, data\_json, created\_at     | Data tracker per user per tanggal. Volume tinggi: indeks `(user_id, tool_id, entry_date)`, pindah ke Postgres bila perlu |
| `programs`            | content\_id, duration\_days, steps\_json                         | Langkah merujuk bab, tool, dan template                                                                                  |
| `program_enrollments` | user\_id, program\_id, started\_at, current\_step, completed\_at | Progres program                                                                                                          |
| `streaks`             | user\_id, tool\_id, current, longest, last\_entry\_date          | Angka ringkas untuk motivasi                                                                                             |

## 7. Auth, langganan & pembayaran

### Login

1. User klik "Masuk dengan Google" (Better Auth, OAuth Google). Turnstile di halaman login.
2. Akun dibuat atau dicocokkan berdasarkan `provider_account_id`, bukan email.
3. Sesi dicatat di `sessions`. Bila lebih dari 2 perangkat aktif, sesi terlama dikeluarkan.
4. Data akuisisi dari cookie (UTM, click ID) disalin ke `user_acquisition` saat login pertama, lalu event `lead` dikirim.

Fase mobile: plugin native Google Sign-In (login Google dilarang lewat webview) + Sign in with Apple di iOS, keduanya menghasilkan ID token yang diverifikasi di `api`.

### Alur langganan Xendit

1. User memilih paket di `site` lalu checkout. `api` membuat invoice/subscription Xendit dengan metadata `user_id`, `plan_id`, dan data atribusi.
2. Metode: kartu kredit dan e-wallet ter-link untuk tagihan otomatis bulanan. QRIS dan Virtual Account untuk pembayaran manual per periode.
3. Webhook Xendit masuk ke `POST /v1/webhooks/xendit`:
   - WAJIB verifikasi callback token, tolak bila tidak cocok.
   - WAJIB idempoten berdasarkan `xendit_id` di `payments`.
   - Diteruskan ke Queues untuk diproses dan di-retry.
4. Pembayaran sukses memperbarui `entitlements.current_period_end`, menghapus cache KV, mengirim email struk, dan mengirim event `purchase`/`renewal` ke platform iklan.
5. WAJIB status langganan hanya berubah lewat webhook, tidak pernah dari halaman redirect sukses.

### Perpanjangan & churn

- Pengguna QRIS/VA: pengingat email + WhatsApp pada H-3, H-1, dan hari H, dengan link bayar langsung.
- Masa tenggang 3 hari setelah jatuh tempo, lalu akses ditutup (data user tetap disimpan).
- Pembatalan: user bisa berhenti sendiri dari halaman akun, dengan survei alasan singkat.
- Refund: diatur di Syarat & Ketentuan, diproses manual oleh pemilik.

### Pengecekan akses

Middleware `requireActiveSubscription` membaca KV (`ent:{user_id}`, TTL 5 menit), fallback ke D1. WAJIB dipasang di setiap route konten berbayar. Rekonsiliasi harian (cron) mencocokkan transaksi Xendit dengan `entitlements` dan mengirim alert bila ada selisih.

## 8. Keamanan & anti-pembajakan

Tujuannya membuat pembajakan mahal, lambat, dan bisa dilacak. Tanpa tim jaga, setiap lapisan harus otomatis.

### Aplikasi

- Otorisasi di server untuk setiap endpoint konten. Setiap query difilter `user_id` dari sesi (cegah IDOR).
- Validasi semua input dengan Zod. Konten dirender dari JSON, tanpa `innerHTML` (cegah XSS).
- Rate limit per user dan per IP untuk endpoint bab, tool run, unduhan, dan login. Turnstile di login dan checkout.
- Test otomatis untuk otorisasi: tanpa langganan → 403, user A tidak bisa membaca data user B, admin-only → 403 untuk member.

### Studio & admin

- `/studio` dan `/admin` dilindungi Cloudflare Access (allowlist email pemilik) sebelum request sampai ke aplikasi, ditambah cek `role = admin` di `api`.
- Akun Google pemilik memakai passkey/security key fisik.
- Semua aksi tercatat di `audit_log`.

### Perlindungan konten

| Lapisan            | Ebook                                                          | Tools                                    | Template                                                       |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| Akses per potongan | Per bab via API, tanpa cache publik                            | Per run via API                          | Token unduh sekali pakai via Worker, kedaluwarsa 5 menit (D18) |
| Logika di server   | —                                                              | Ya, `config_json` tidak dikirim ke klien | Generator di server                                            |
| Deteksi scraping   | Ambang bab per jam, akun dibekukan sementara + alert           | Kuota run per bulan                      | Kuota unduh per bulan                                          |
| Watermark terlihat | Nama/email samar di halaman                                    | —                                        | —                                                              |
| Watermark forensik | Variasi mikro unik per user (karakter tak terlihat/pola spasi) | —                                        | ID pelanggan di metadata file                                  |
| Penghalang dasar   | Copy, klik kanan, print dimatikan                              | —                                        | —                                                              |
| Batas perangkat    | 2 sesi aktif                                                   | 2 sesi aktif                             | 2 sesi aktif                                                   |

HINDARI merender teks ebook sebagai gambar/canvas: merusak pencarian, aksesibilitas, dan performa di HP.

### Data pribadi (UU PDP)

- Kumpulkan minimal: nama, email, foto dari Google. Tanpa NIK atau alamat.
- Data kartu tidak pernah disimpan (ditangani Xendit).
- Fitur hapus akun dan ekspor data mandiri, kebijakan privasi, prosedur pemberitahuan kebocoran.

### Operasional satu orang + AI

- Tiga lingkungan: `local`, `staging` (D1/R2 sendiri, Xendit sandbox), `production`.
- Secret produksi hanya di `wrangler secret`. Tidak pernah ada di repo, `.env` yang dibaca AI, atau log.
- Deploy produksi hanya lewat GitHub Actions setelah test lulus. Branch protection di `main`.
- Dependabot dan secret scanning aktif di GitHub.
- Perubahan di auth, pembayaran, dan otorisasi wajib direview keamanan oleh sesi Claude terpisah sebelum merge.
- 2FA security key (minimal dua kunci) di Google, GitHub, Cloudflare, Xendit, registrar, dan email bisnis. Recovery codes dicetak dan disimpan offline. Domain auto-renew + registrar lock.
- Backup: D1 Time Travel + ekspor harian ke R2, uji restore sebulan sekali.
- Runbook darurat di `docs/RUNBOOK.md`: bekukan akun, tutup pendaftaran, restore database, rotasi secret.
- Alert ke email/WhatsApp/Telegram: webhook gagal, scraping terdeteksi, login admin dari lokasi baru, selisih rekonsiliasi, lonjakan error.

### Legal sebelum launch

Pendaftaran PSE Lingkup Privat (Komdigi), penyesuaian KBLI di OSS, Syarat & Ketentuan (lisensi pemakaian, larangan distribusi, refund, pembatalan), kebijakan privasi, dan prosedur takedown berbasis UU Hak Cipta.

## 9. Skalabilitas jangka panjang

Workers dan R2 naik kapasitas otomatis. Titik rawan satu-satunya adalah D1 (ukuran per database terbatas, sekitar 10 GB saat ini, dan proses tulis berurutan). D1 aman sampai puluhan ribu pelanggan bila aturan di bawah dipatuhi.

| Komponen                      | Kapan mulai terasa                                                           | Langkah                                                             |
| ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Log aktivitas                 | Sejak awal bila disimpan di D1 (sekitar 70 juta baris/tahun di 10 ribu user) | Analytics Engine + PostHog, arsip ke R2. D1 hanya `usage_counters`  |
| Isi ebook                     | Katalog sangat besar                                                         | Sudah di R2 sejak awal                                              |
| Rate limit & deteksi scraping | Trafik tinggi                                                                | Rate Limiting binding / Durable Objects, bukan query D1             |
| Pencarian                     | Ribuan item                                                                  | FTS5 di D1, lalu Meilisearch/Typesense atau Cloudflare Vectorize    |
| Generate file besar           | Template panjang/banyak gambar                                               | Queues + notifikasi, Browser Rendering untuk PDF                    |
| Database umum                 | Ratusan ribu user, analitik berat                                            | Migrasi ke Postgres (Neon/Supabase) lewat Hyperdrive, Drizzle tetap |
| Analitik iklan berat          | Jutaan event                                                                 | Alirkan ke BigQuery/ClickHouse                                      |

Biaya infrastruktur diperkirakan tetap di kisaran ratusan dolar per bulan pada 10 ribu pelanggan (omzet sekitar Rp1 miliar/bulan). Biaya terbesar adalah fee payment gateway dan iklan.

## 10. Performa, SEO & GEO

Target pengguna utama: HP Android kelas menengah dengan 4G yang tidak stabil.

### Target performa

- Core Web Vitals (persentil 75): LCP < 2,5 detik, INP < 200 ms, CLS < 0,1.
- JavaScript halaman publik `site`: < 50 KB per halaman (Astro tanpa JS kecuali island).
- Bundle awal `app`: < 200 KB gzip. Reader, setiap tool, dan Studio dimuat terpisah (code splitting). Tiptap hanya dimuat di Studio.
- WAJIB Lighthouse CI + budget ukuran bundle di GitHub Actions. Deploy ditolak bila budget terlampaui.

### Teknik performa

- Gambar lewat Cloudflare Images (AVIF/WebP, resize), lazy load, dimensi eksplisit.
- Font di-host sendiri, maksimal 2 keluarga, subset Latin.
- Halaman publik di-cache di edge, cache dibersihkan otomatis saat konten terbit.
- Status langganan di KV, katalog publik di Cache API, Smart Placement aktif.
- PWA: prefetch bab berikutnya, cache offline bab yang sedang dibaca, skeleton loading.

### SEO

- Setiap konten terbit menghasilkan halaman landing otomatis (bagian 5) + sitemap otomatis.
- WAJIB structured data paywall (`isAccessibleForFree: false` + penanda bagian terkunci) agar tidak dianggap cloaking.
- Structured data per tipe: `Book`, `SoftwareApplication`, `CreativeWork`/`DigitalDocument`, `Organization`, `BreadcrumbList`, `FAQPage`.
- URL rapi (`/ebook/{slug}`, `/tools/{slug}`, `/template/{slug}`), canonical, Open Graph untuk dibagikan di WhatsApp.
- Halaman hub per kategori/topik + blog untuk kata kunci pertanyaan.
- HINDARI memproduksi massal halaman hasil AI yang mirip satu sama lain (kebijakan _scaled content abuse_ Google). Setiap halaman wajib punya nilai unik.

### GEO (ChatGPT, Gemini, Perplexity, AI Overviews)

- Atur kontrol crawler AI di Cloudflare: izinkan bot pencarian/jawaban (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) di halaman publik, blokir bot pelatihan model.
- Setiap halaman publik dibuka dengan jawaban ringkas 2–3 kalimat, lalu detail, langkah bernomor, dan tabel.
- E-E-A-T: profil penulis, halaman tentang dengan identitas PT, tanggal terbit dan pembaruan.
- Daftarkan Google Search Console dan Bing Webmaster Tools. `llms.txt` opsional.
- Bangun penyebutan di luar website: forum, YouTube, artikel pihak ketiga.

## 11. Tracking iklan & analitik

Konversi diukur dari server (webhook Xendit), bukan dari pixel browser, sehingga tidak hilang karena ad blocker atau pembatasan iOS.

### Alur data

1. Klik iklan → `site` menerima `fbclid`/`gclid`/`gbraid`/`wbraid`/`ttclid` + UTM.
2. Middleware edge menyimpannya ke cookie first-party di domain induk (`.selfgrow.id`), berlaku 90 hari.
3. Login pertama → data disalin ke `user_acquisition` (first touch + last touch).
4. Checkout → `user_id` dan data atribusi ikut sebagai metadata invoice Xendit.
5. Webhook PAID → Queues → Meta Conversions API, Google Ads (enhanced/offline conversions), TikTok Events API, PostHog.
6. Cron harian menarik biaya iklan (Meta Marketing API, Google Ads API, TikTok API) ke `ad_spend_daily`.
7. Dashboard `/admin` menghitung metrik per channel, kampanye, dan kohort.

### Event standar

| Event            | Kapan                                        | Dikirim ke                                  |
| ---------------- | -------------------------------------------- | ------------------------------------------- |
| `lead`           | Login pertama                                | Meta, Google, TikTok, PostHog               |
| `activation`     | Pertama kali memakai konten gratis           | PostHog                                     |
| `checkout_start` | Membuka checkout                             | Meta, Google, TikTok, PostHog               |
| `purchase`       | Pembayaran pertama sukses (dengan nilai IDR) | Meta, Google, TikTok, PostHog               |
| `renewal`        | Perpanjangan sukses (dengan nilai)           | PostHog, conversion value adjustment Google |
| `cancel`         | Langganan dibatalkan/berakhir                | PostHog                                     |

- WAJIB `event_id` yang sama di pixel browser dan server untuk deduplikasi.
- Tag browser (Meta Pixel, Google tag, TikTok Pixel) dipasang lewat Cloudflare Zaraz dengan consent manager (UU PDP).
- Data dikirim ke platform iklan dalam bentuk hash (email) sesuai spesifikasi masing-masing.

### Dashboard `/admin`

Pelanggan aktif, MRR, churn bulanan, konversi funnel (pengunjung → lead → aktivasi → bayar), CAC, ROAS, LTV per channel, retensi per kohort bulanan, payback period, konten dan lead magnet paling efektif.

### Persiapan akses

Ajukan Google Ads API developer token dan buat app di Meta for Developers sejak awal fase 1, karena prosesnya bisa memakan waktu. Verifikasi Business Manager Meta atas nama PT.

## 12. Strategi pemasaran

Funnel utama: **iklan → konten gratis (demo tool / bab gratis / preview template) → login Google (lead) → nurturing 7–14 hari via email + WhatsApp → penawaran → berlangganan.** Iklan tidak diarahkan langsung ke halaman harga.

### Iklan berbasis pain point (D12)

Brand luas, iklan tajam. Setiap kampanye dibuka dengan satu masalah yang paling dirasakan, diarahkan ke konten gratis kategori itu, lalu pelanggan menemukan kategori lain setelah masuk. Contoh hook awal untuk diuji:

| Kategori         | Contoh hook                                  | Pintu masuk gratis               |
| ---------------- | -------------------------------------------- | -------------------------------- |
| Keuangan pribadi | "Gaji habis sebelum tanggal 25?"             | Kalkulator anggaran + bab gratis |
| Produktivitas    | "Sibuk seharian tapi kerjaan nggak kelar?"   | Template jadwal harian           |
| Kebiasaan        | "Udah 5 kali mulai olahraga, berhenti lagi?" | Habit tracker 7 hari             |
| Karier           | "Lamar 50 kerjaan, nggak ada panggilan?"     | Checklist CV + pelacak lamaran   |

Uji 3–4 kategori dengan budget kecil. Kategori dengan biaya per lead dan per pelanggan terendah dijadikan pintu masuk utama dan diproduksi paling dalam.

### Channel berbayar (urutan prioritas)

| Prioritas | Channel                                  | Fungsi                                      | Catatan                                                                         |
| --------- | ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| 1         | Meta Ads (FB + IG)                       | Akuisisi lead utama, retargeting, lookalike | Retargeting lead yang belum bayar biasanya ROI tertinggi                        |
| 2         | TikTok Ads                               | Jangkauan murah ke konsumen umum            | Kreatif video native: demo di layar HP, sebelum/sesudah, tips cepat             |
| 3         | Google Search Ads                        | Niat tinggi ("template …", "kalkulator …")  | Volume lebih kecil, konversi tinggi. Kata kunci yang bagus dijadikan konten SEO |
| 4         | Micro-influencer (10–100 ribu followers) | Kepercayaan dan jangkauan di komunitas      | Bayaran tetap kecil + komisi afiliasi                                           |
| 5         | Program afiliasi                         | Bayar hanya bila ada pelanggan              | 30–50% bulan pertama atau 10–20% berulang, dashboard otomatis                   |

Target pasar konsumen umum (D11), jadi kreatif iklan memakai bahasa sehari-hari dan format video pendek yang ditonton di HP. Checkout mengutamakan QRIS dan e-wallet, dan pengingat perpanjangan WhatsApp jadi prioritas. LinkedIn Ads tidak dipakai.

### Aturan eksekusi iklan

1. Tracking server-side (bagian 11) WAJIB berjalan sebelum iklan pertama.
2. Tahap uji: Rp5–10 juta/bulan di 2 channel selama 3–4 minggu.
3. Matikan iklan dengan CAC di atas batas (tabel bagian 3). Naikkan budget iklan yang bagus sekitar 20% per beberapa hari.
4. Uji 5–10 variasi kreatif per minggu. Copy dan hook dibuat bersama Claude.
5. Jangan menaikkan budget besar sebelum data churn 2–3 bulan tersedia.
6. Akun iklan cadangan disiapkan karena akun Meta bisa dibatasi tanpa peringatan.

### Organik & retensi

- Founder-led content: kisah "satu orang + AI membangun bisnis miliaran" dibagikan terbuka (build in public).
- Komunitas pelanggan (WhatsApp/Telegram) dan referral "ajak teman, kalian berdua gratis 1 bulan".
- Ritme rilis konten yang terlihat (misalnya mingguan) + halaman "Baru bulan ini".
- Onboarding minggu pertama menuju 3 konten paling bernilai. Email otomatis untuk user yang tidak login 14 hari.

### Peluncuran

Waitlist lewat konten gratis → buka pendaftaran serentak dengan harga founding member (500 kursi, harga terkunci) → kumpulkan testimoni asli → lookalike audience dari pelanggan pertama.

## 13. Aturan kerja untuk Claude Code (isi `CLAUDE.md`)

Salin blok di bawah ke `CLAUDE.md` di root repo.

```markdown
# CLAUDE.md

Sumber kebenaran produk & arsitektur: docs/BLUEPRINT.md. Baca sebelum mengerjakan fitur baru.
Keputusan di bagian 2 BLUEPRINT terkunci. Jangan usulkan alternatif kecuali diminta.

## Struktur

- apps/site (Astro), apps/app (React+Vite PWA + API Hono di apps/app/server, satu Worker)
- packages/db (Drizzle), packages/shared (tipe + Zod), packages/renderer (render ebook & tool)
- Bahasa kode & identifier: Inggris. Teks UI: Bahasa Indonesia.
- TypeScript strict. pnpm workspaces.

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
```

### Cara bekerja dengan Claude

- **Claude (chat):** strategi, riset, copy iklan, konten, review keamanan diff, analisis dashboard.
- **Claude Code:** implementasi per fitur sesuai roadmap bagian 14, satu fitur per branch/PR.
- Setiap sesi Claude Code dimulai dengan menyebut nomor fase dan fitur dari bagian 14.

## 14. Roadmap build & definisi selesai

Setiap tahap selesai bila semua kriteria "Selesai bila" terpenuhi di staging dan test CI lulus.

### Lingkup launch: produk lengkap, bukan MVP (D14)

Situs baru dibuka untuk umum setelah seluruh fitur fase 1A–1E berjalan di production dan target isi di bawah terpenuhi. Satu-satunya yang ditunda adalah aplikasi Android/iOS (fase 2). Selama build, waitlist dan konten gratis boleh berjalan lebih dulu untuk mengumpulkan calon pelanggan.

**Target isi saat launch** (per kategori pintu masuk, 4 kategori awal):

| Jenis                                        | Per kategori | Total 4 kategori |
| -------------------------------------------- | ------------ | ---------------- |
| Ebook lengkap (bab gratis + bab berbayar)    | 5            | 20               |
| Tool tracker                                 | 2            | 8                |
| Tool lain (kalkulator, penilaian, perencana) | 1            | 4                |
| Template jadwal/perencana                    | 3            | 12               |
| Program bertahap (misalnya 30 hari)          | 1            | 4                |
| Artikel blog SEO                             | 5            | 20               |

Setelah launch, ritme rilis minimal: 1 ebook atau program baru per minggu, ditambah tools dan template pendukungnya.

### Fase 1A — Fondasi

- [ ] Monorepo pnpm, dua app (`site`, `app` + server), tiga paket, CI GitHub Actions, lingkungan local/staging/production
- [x] Skema D1 + migrasi awal (bagian 6), Drizzle
- [x] Better Auth + login Google, `sessions` dengan batas 2 perangkat
- [x] `entitlements` + middleware `requireActiveSubscription` + cache KV
- [ ] Cloudflare Access untuk `/studio` dan `/admin`, `audit_log` (kode verifikasi JWT + `audit_log` selesai; aplikasi Access dibuat saat setup staging, lihat `docs/SETUP.md`)

Selesai bila: user bisa login, admin bisa masuk Studio, user tanpa langganan ditolak 403 di endpoint konten (dibuktikan test).

### Fase 1B — Studio & konten

- [ ] Ebook Studio (Tiptap, bab, versi, preview) + reader di `app` dengan progress dan bookmark
- [ ] Tool Builder no-code (JSON Logic) + registry tool custom + `POST /v1/tools/:id/run`
- [ ] Template Builder + generator DOCX/PDF/XLSX + kuota unduh, tool tracker dengan data user, program bertahap, streak, dan review mingguan
- [ ] Perlindungan ebook: rate limit, deteksi scraping, watermark terlihat + forensik

Selesai bila: pemilik bisa membuat, menerbitkan, dan memperbarui satu ebook, satu tool, dan satu template dari Studio tanpa menyentuh kode.

### Fase 1C — Pembayaran

- [ ] Checkout Xendit (kartu, e-wallet, QRIS, VA), webhook terverifikasi dan idempoten via Queues
- [ ] Email struk + pengingat perpanjangan (email + WhatsApp), masa tenggang, pembatalan mandiri
- [ ] Rekonsiliasi harian + alert

Selesai bila: pembayaran sandbox mengaktifkan akses, perpanjangan memperpanjang akses, dan webhook ganda tidak membuat transaksi ganda.

### Fase 1D — Etalase, SEO & tracking

- [ ] `site` Astro: landing, katalog, halaman per konten otomatis, harga, blog, structured data, sitemap
- [ ] Demo gratis (bab gratis, demo tool 3 kali, preview template)
- [ ] Cookie atribusi, `user_acquisition`, Zaraz + consent, konversi server-side ke Meta/Google/TikTok
- [ ] Cron biaya iklan + dashboard `/admin`
- [ ] PWA (install, offline bab, push notification)

Selesai bila: Lighthouse CI lulus budget, event `purchase` dari sandbox tercatat di Meta Events Manager dan Google Ads, dashboard menampilkan CAC per channel.

### Fase 1E — Siap launch

- [ ] PSE Lingkup Privat, KBLI, Syarat & Ketentuan, kebijakan privasi
- [ ] Runbook darurat, uji restore backup, 2FA security key di semua akun inti
- [ ] Program afiliasi + referral
- [ ] Waitlist + harga founding member

Selesai bila: launch ke publik dan iklan tahap uji mulai berjalan.

### Fase 2 — Aplikasi mobile (setelah sekitar 10.000 pelanggan aktif)

- [ ] Evaluasi ulang Capacitor vs Expo dan aturan pembayaran store terbaru
- [ ] Login native Google + Sign in with Apple
- [ ] Aplikasi Android dan iOS "bayar di web, pakai di app" tanpa elemen pembelian
- [ ] Baca offline dan push notification native
