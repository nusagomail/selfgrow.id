# Panduan Video Pengantar Ebook

Video pengantar tampil di halaman ebook sebelum orang mulai membaca. Panjangnya kira-kira
40–70 detik. Tugasnya satu: membuat calon pembaca berpikir "ini buku untukku" dan menekan
tombol baca.

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
- Narasi memakai Google Cloud Text-to-Speech. Kuncinya disimpan sebagai network secret
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
