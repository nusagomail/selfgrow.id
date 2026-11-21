# Panduan Video Pengantar Ebook

Video pengantar tampil di halaman ebook sebelum orang mulai membaca. Panjangnya kira-kira
40–70 detik. Tugasnya satu: membuat calon pembaca berpikir "ini buku untukku" dan menekan
tombol baca.

> **Mulai ebook keenam (D46): rancang dulu, rakit belakangan.** Video ebook 1–5 terasa seperti
> slide yang berganti: judul di kiri, kartu di kanan, latar memudar, ajakan di akhir. Untuk buku
> berikutnya, kerjakan bagian 0 sebelum menyentuh kotak adegan.

## 0. Konsep dulu (wajib sebelum menulis data video)

Jawab tiga pertanyaan ini di komentar atas berkas data video:

1. **Satu konsep visual yang berjalan terus.** Apa "dunia" video ini? Contoh: seluruh video
   terjadi di layar kalkulator yang angkanya terus berubah; satu buku tabungan yang halamannya
   dibalik; satu hari di jam dinding dari pagi ke malam; peta perjalanan yang garisnya bertambah.
   Adegan berpindah *di dalam* dunia itu (kamera bergeser, benda berubah), bukan memudar ke
   kartu baru. Hindari pola judul-kiri-kartu-kanan berulang.
2. **Satu hal yang penonton dapat walau tidak membaca.** Video harus mengajarkan sesuatu yang
   nyata: satu rumus, satu tanda bahaya, satu kalimat yang bisa dicoba hari ini, satu hitungan
   contoh sampai selesai. Penonton yang berhenti di detik ke-40 tetap pulang membawa sesuatu.
3. **Isi asli buku yang bergerak.** Pakai infografis, tool, atau contoh dari buku itu sendiri dan
   hidupkan (angka dihitung, bagan tumbuh, input tool diketik). Jangan hanya menyebut "ada
   kalkulator"; perlihatkan kalkulatornya bekerja.

Lalu periksa: kalau logo dan judul ditutup, apakah video ini masih bisa dibedakan dari video
buku lain? Kalau tidak, konsepnya belum cukup kuat.

Kotak adegan di bagian 2 tetap boleh dipakai sebagai bahan, tetapi bukan kerangka. Buat jenis
adegan baru di `template.html` bila konsep membutuhkannya (seperti `receipt` dan `breath`), dan
susunan cover → isi → features → cta tidak wajib selain aturan di bagian 1.

**Contoh pertama: "Kurangi Gula Tanpa Menderita"** (`intro-video/gula.mjs` + `gula.html`).
Konsep: satu toples ukur di atas kertas periksa sepanjang video. Kubus gula (1 kubus = 1 sendok
teh) jatuh mengikuti hari contoh sampai 68 g dan melewati garis 50 g; label gizi dibaca langsung
dengan rumus 12 g × 2 sajian ÷ 4 = 6 sendok teh; lalu kubus keluar dari toples saat pilihan
ditukar sampai 26 g. Template khusus cukup memenuhi kontrak yang sama (`window.DURATION`,
`window.TIMELINE`, `window.render(t)`) dan didaftarkan lewat `template` di data video.

**Contoh kedua: "Berani Nego Gaji"** (`nego.mjs` + `nego.html`). Konsep: papan catur dan jam
catur. Jam menghitung sepuluh detik tokoh menerima tawaran, batang emas menunjukkan harga diam
(selisih Rp1 juta/bulan ≈ Rp76 juta dalam lima tahun), bidak bergerak untuk lima langkah, kalimat
nego diketik lalu jam berganti menjadi hitungan "diam", dan hasil akhir jatuh di papan.

**Contoh ketiga: "Mengasuh Tanpa Teriak"** (`teriak.mjs` + `teriak.html`). Konsep: pintu kulkas
dan satu meter suara tegak. Pemicu pagi menaikkan meter sampai merah, jeda 10 detik (dengan
hitungan mundur) menurunkannya ke hijau, lalu kalimat batas tiga potong muncul.

**Contoh keempat: "Seminggu dalam Satu Jam"** (`minggu.mjs` + `minggu.html`). Konsep: halaman
planner dengan kalender Senin–Jumat dan jam ritual 60 menit yang terisi per bagian. Blok kacau
tersapu ke catatan, tiga batu besar jatuh ke pagi hari, dan slot cadangan bergaris muncul.

**Contoh kelima: "Stoik untuk Hidup Sehari-hari"** (`stoik.mjs` + `stoik.html`). Konsep: lempeng
batu dengan tiga lingkaran kendali. Kekhawatiran jatuh sebagai kerikil berlabel lalu dipilah: yang
di luar kendali memudar di cincin luar, yang dalam kendali bersinar di tengah.

**Contoh keenam: "Dana Darurat dari Nol"** (`darurat.mjs` + `darurat.html`). Konsep: buku
tabungan yang terbuka. Halaman pertama mencetak minggu buruk (paylater merah), halaman berganti,
setoran tercetak bulan demi bulan, dan penarikan darurat dicap "tanpa utang".

**Contoh ketujuh: "Burnout Bukan Lemah"** (`burnout.mjs` + `burnout.html`). Konsep: langit senja
dan satu baterai besar yang terkuras hari demi hari, retak untuk tiga tanda burnout WHO, lalu
diisi kembali oleh empat jenis pemulihan yang dicolokkan satu per satu.

Panduan ini bukan cetakan. Setiap buku punya cara masuk yang berbeda. Buku keuangan mungkin
dibuka dengan angka yang mengejutkan, buku tentang duka dibuka dengan satu kalimat yang
lembut, buku kebiasaan dibuka dengan pertanyaan. Pilih adegan yang melayani buku itu, lalu
susun urutannya sendiri.

---

## 1. Yang tetap (sedikit saja)

1. **Buka dengan sampul dan judul**, atau dengan pertanyaan/angka lalu sampul tepat sesudahnya.
   Penonton harus tahu buku apa ini dalam 10 detik pertama.
2. **Tutup dengan ajakan** (adegan `cta`) yang jujur: apa yang bisa langsung dibaca, gratis atau tidak.
3. **Jangan menjanjikan yang tidak ada di buku.** Setiap angka dan klaim harus bisa ditemukan di isinya.
4. **Teks besar dan sedikit.** Satu gagasan per adegan; video ditonton di HP.

Selebihnya bebas.

---

## 2. Kotak adegan

| Adegan | Isinya | Cocok untuk |
|---|---|---|
| `cover` | Sampul, judul, subjudul, label kecil (jumlah bab, waktu baca) | Hampir selalu ada |
| `question` | Satu pertanyaan besar + kalimat pendek | Membuka dengan rasa "ini aku banget" |
| `bigNumber` | Satu angka besar yang berhitung naik + keterangan | Data mengejutkan (keuangan, kesehatan, karier). Wajib bersumber |
| `story` | Tokoh, dua baris latar, 1–3 angka tentang dirinya, kalimat penutup | Buku yang dibangun di atas cerita tokoh |
| `list` | Judul + 2–5 butir bertanda ✓, ✕, atau nomor | "Buku ini untuk kamu yang…", "Kesalahan yang sering terjadi" |
| `compare` | Dua kolom: sebelum dan sesudah, mitos dan fakta | Buku yang mengubah cara pandang atau kebiasaan |
| `stages` | 2–5 tahap berurutan dengan label bab | Buku berjalur (program, langkah demi langkah) |
| `features` | 2–4 kotak ikon: apa saja yang ada di dalam buku | Menonjolkan kuis, kalkulator, latihan, infografis |
| `quote` | Satu kalimat kuat dari buku atau tokoh (+ nama) | Puncak emosi sebelum ajakan |
| `chat` | Layar ponsel dengan pesan yang muncul bergiliran (ada animasi "sedang mengetik") + judul di samping | Buku komunikasi dan relasi; menunjukkan percakapan sebelum dan sesudah |
| `breath` | Lingkaran yang mengembang–mengempis (tarik, tahan, hembus) + judul | Buku kesehatan mental, tidur, dan ketenangan; mengajak penonton merasakan isi buku |
| `receipt` | Struk/nota yang tercetak baris demi baris dari mesin kasir, baris yang terlupa ditandai, lalu total dan cap (mis. "RUGI") + judul di samping | Buku bisnis dan keuangan yang punya hitungan konkret |
| `cta` | Kalimat pendek + tombol + logo | Selalu di akhir |

Setiap adegan boleh memilih latar: `dark` (hijau tua), `paper` (krem), atau `night` (biru malam).
Selang-seling latar membantu mata merasakan pergantian adegan.

**Tema warna per buku.** Warna bawaan adalah hijau SelfGrow. Supaya video ikut identitas bukunya,
data video boleh memuat `theme` (latar `dark`/`night`/`paper`, warna `accent` dan `primary`).
Contoh: "Berani Bilang Tidak" memakai ungu tua dan koral, sama dengan infografisnya. Logo SelfGrow
tetap muncul di setiap video.

### Contoh susunan yang berbeda

- **Keuangan (Lepas dari Jerat Paylater)**: cover → question → story → list → stages → features → quote → cta.
- **Kebiasaan**: question → cover → compare (pagi biasanya vs pagi baru) → stages → cta.
- **Kesehatan mental**: cover (latar `night`) → quote → list (lembut, tanpa ✕) → features → cta. Tanpa angka mengejutkan.
- **Karier**: bigNumber → cover → story → features → cta.
- **Kesehatan mental (Keluar dari Lingkaran Overthinking)**: question (malam) → cover → quote → list → breath → cta, tema biru malam, musik tenang lambat, narasi lembut. Tanpa angka besar di awal.
- **Bisnis (Hitung Harga Jual yang Untung)**: question → receipt (nota HPP risol Dina, cap "RUGI Rp250") → cover → stages → bigNumber hasil → features → cta, tema kertas kraft dan oranye, musik semangat.
- **Komunikasi (Berani Bilang Tidak)**: chat (jawaban lama) → cover → bigNumber → list tokoh → chat (jawaban baru) → features → cta, dengan tema ungu-koral.

---

## 3. Narasi dan musik

- Setiap adegan punya `say`: kalimat yang dibacakan narator. Tulis seperti orang berbicara,
  bukan seperti teks di layar. Pendek-pendek. Angka ditulis dengan kata ("satu koma enam juta")
  supaya dibaca benar.
- Durasi adegan mengikuti panjang narasinya. Adegan tanpa `say` memakai durasi minimum jenisnya.
- Narasi juga tampil sebagai teks di bawah layar (`captions: true`), untuk yang menonton tanpa suara.
- Musik latar dibuat sendiri oleh skrip (bebas royalti). Pilih `music.mood`:
  `hangat` (optimis), `tenang` (reflektif, cocok untuk kesehatan mental dan makna hidup),
  `semangat` (karier, kebugaran, bisnis). Musik otomatis mengecil saat narator berbicara.
- Narasi rekaman (mis. ElevenLabs, suara Putri Maharani) disimpan di `intro-video/voice/{slug}/{nomor adegan}.mp3` dan diutamakan.
- Cadangan: Google Cloud Text-to-Speech. Kuncinya disimpan sebagai network secret
  lingkungan, tidak pernah di kode. Tanpa kunci, video tetap jadi dengan musik saja.

---

## 4. Membuat video

1. Buat berkas data di `scripts/demo/intro-video/` (lihat `paylater.mjs`), daftarkan di `render.mjs`.
2. Pratinjau gambar per adegan: `node scripts/demo/intro-video/render.mjs --keys`.
3. Render: `node scripts/demo/intro-video/render.mjs` → `scripts/demo/videos/{slug}.mp4` dan `.jpg`.
4. Seed staging mengunggah video dan poster ke ebook yang slug-nya sama.

## 5. Pertanyaan pemeriksa

1. Kalau video dimatikan di detik ke-10, apakah penonton sudah tahu buku apa ini dan untuk siapa?
2. Apakah ada satu momen yang membuat penonton merasa dipahami?
3. Apakah narasinya terdengar seperti manusia, bukan pengumuman?
4. Apakah semua angka ada di dalam buku, lengkap dengan sumbernya?
5. Apakah teks terbaca di layar HP?
