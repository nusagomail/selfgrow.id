# Rencana Konten (Nov 2026 →)

Dokumen kerja untuk empat permintaan pemilik:
1. Mengisi 80 ebook yang masih kosong, sesuai judul dan ditulis serius.
2. Memberi setiap ebook visual, kuis, dan tool yang tidak seragam.
3. Menyiapkan template yang siap diunduh.
4. Membuka kanal Video Edukasi.

Setiap sesi kerja cukup membaca dokumen ini dan melanjutkan dari baris ✗ pertama di bagian yang sedang aktif.

## Prinsip hemat jatah

- **Satu sesi, satu paket kecil.** Untuk ebook: 2 judul per sesi, lalu PR, merge, dan seed. Mulailah sesi baru untuk paket berikutnya supaya konteksnya kecil.
- **Tanpa riset ulang.** Gunakan PANDUAN-EBOOK, contoh 20 ebook yang sudah jadi, dan dokumen ini.
- **Cek visual secukupnya.** Render figur, jalankan `demo-content.test.ts`, lalu ambil satu tangkapan layar per buku hanya kalau figurnya baru.
- **Satu PR per paket**, dikirim dengan `ship2.sh` (merge, deploy staging, seed).

## Urutan fase

| Fase | Isi | Perkiraan sesi | Status |
|---|---|---|---|
| 1 | Template unduhan: 10 template, satu per kategori, masing-masing ditautkan ke ebook terkait | 1–2 | ✓ (D53) |
| 2 | Kanal Video Edukasi: tipe konten `video`, rak di beranda dan situs, halaman tonton, unggah di Studio, aturan gratis/berbayar sama dengan ebook | 2 | ✓ (D54) |
| 3 | 80 ebook: 8 putaran × 10 kategori (satu judul per kategori per putaran) | ±40 | ✗ |
| 4 | Isi video edukasi, dibuat setelah langganan ElevenLabs aktif | per video | tertunda |

Fase 1 dan 2 dikerjakan lebih dulu karena kecil dan langsung menambah ragam katalog. Fase 3 berjalan paling lama.

## Standar setiap ebook (anti-template)

Setiap buku harus berbeda dari buku lain di kolom-kolom ini. Catat pilihannya di tabel putaran sebelum mulai menulis.

- **Bentuk tulisan.** Pilih yang cocok dengan isinya, misalnya cerita tokoh, buku kerja, berkas kasus, jurnal harian, tanya-jawab, peta jalan, atau surat. Hindari bentuk yang sama dengan buku sekategori.
- **Kedalaman.** 7–9 bab, 3.500–6.000 kata. Buku praktis boleh lebih pendek; buku konsep lebih panjang.
- **Angka dan sumber.** Utamakan konteks Indonesia (BPS, OJK, Kemenkes, regulasi yang berlaku). Riset luar negeri ditulis dengan nama dan tahun. Tidak ada angka karangan; ilustrasi diberi label ilustrasi.
- **Visual.** 2–5 figur dengan jenis yang mengikuti isi (alur, perbandingan, timeline, matriks, peta, kartu), tidak harus selalu diagram batang.
- **Interaktif.** 1–3 kuis dengan mode yang dipilih sesuai isi (score/scale/knowledge/scenario). Tool hanya kalau memang ada hitungan atau penyusunan. Template ditautkan kalau relevan.
- **Tema baca.** Kombinasi `theme` harus unik (dijaga oleh test).

## Judul yang mirip: sudut pembeda

| Pasangan | Sudut pembeda |
|---|---|
| Satu Persen Lebih Baik / Konsisten Itu Bisa Dilatih | Perbaikan kecil yang menumpuk (sistem) / bertahan saat motivasi turun (identitas dan pemulihan setelah bolong) |
| Fokus di Era Notifikasi / Kerja Dalam, Hasil Nyata | Mengelola gangguan digital / merancang blok kerja mendalam dan hasilnya |
| Seminggu dalam Satu Jam (✓) / To-Do List yang Benar-Benar Selesai | Perencanaan mingguan / eksekusi harian dan memecah tugas |
| Ritual Malam untuk Tidur Nyenyak / Tidur yang Benar-Benar Memulihkan | Kebiasaan 2 jam sebelum tidur / sains tidur, kronotipe, dan kapan ke dokter |
| Ayah yang Hadir / Ayah Juga Bisa Mengasuh | Kehadiran emosional dan relasi / keterampilan pengasuhan praktis sehari-hari |
| Gagal Lagi? Mulai Lagi / Konsisten Itu Bisa Dilatih | Bangkit setelah gagal besar / menjaga ritme harian |
| Kerja Cerdas dengan AI / Prompt yang Bekerja | Alur kerja dan etika AI di kantor / teknik menulis prompt |
| Hidup Bukan Lomba / Berhenti Membandingkan Diri / Umur 25 (✓) | Makna dan nilai hidup / mekanisme psikologis perbandingan sosial / tonggak usia |

## Putaran ebook (Fase 3)

Tanda: ✓ sudah terbit, ✗ belum. Setiap putaran berisi satu judul per kategori.

| Kategori | Putaran 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Keuangan | Seni Menabung ✗ | Investasi Pertamamu ✗ | Generasi Sandwich ✗ | Rencana 12 Bulan Bebas Cicilan ✗ | Anti FOMO Investasi ✗ | Menuju Rumah Pertama ✗ | Melek Pajak ✗ | (cadangan) |
| Kebiasaan | Pagi yang Menang ✗ | Satu Persen ✗ | Ritual Malam ✗ | Disiplin Tanpa Drama ✗ | Konsisten ✗ | Gagal Lagi? ✗ | Lingkungan ✗ | Kembali ke Buku ✗ |
| Produktivitas | Fokus di Era Notifikasi ✗ | Kerja Cerdas dengan AI ✗ | To-Do List ✗ | Belajar Cepat ✗ | Kerja Dalam ✗ | Prompt yang Bekerja ✗ | Energi ✗ | Catatan ✗ · Resolusi ✗ |
| Karier | Lolos Wawancara ✗ | Fresh Graduate ✗ | Setelah PHK ✗ | Banting Setir ✗ | Naik Level ✗ | LinkedIn ✗ | Bertahan di Kantor ✗ | Skill 2030 ✗ |
| Mental | Cemas Itu Wajar ✗ | Percaya Diri ✗ | Istirahat Tanpa Rasa Bersalah ✗ | Marah Tanpa Menyesal ✗ | Berhenti Membandingkan ✗ | Menulis untuk Pulih ✗ | Tenang di Tengah Kesibukan ✗ | Tidak Harus Menyenangkan Semua ✗ |
| Kesehatan | Tidak Lagi Lemas Jam 2 ✗ | Badan Pegal Kerja Duduk ✗ | Kenali Angka Tubuhmu ✗ | Makan Enak Tetap Sehat ✗ | Masak Sehat Hemat ✗ | Kuat di Rumah ✗ | Tidur yang Memulihkan ✗ | Sehat Mulai 30 ✗ |
| Relasi | Ngobrol yang Nyambung ✗ | Mengenali Hubungan Tidak Sehat ✗ | Berdebat Tanpa Bertengkar ✗ | Mengatasi Kesepian ✗ | Teman Baru di Usia Dewasa ✗ | Siap Menikah? ✗ | Cinta yang Bertahan ✗ | Networking ✗ |
| Bisnis | Side Hustle Pertamamu ✗ | Jualan di TikTok Shop ✗ | Pembukuan UMKM ✗ | Freelance dari Nol ✗ | Foto Produk Pakai HP ✗ | Klien Puas ✗ | Konten yang Menjual ✗ | Personal Branding ✗ |
| Parenting | 1000 Hari ✗ | Ngobrol dengan Remaja ✗ | Keuangan Keluarga Muda ✗ | Main Tanpa Layar ✗ | Ayah yang Hadir ✗ | Tim Orang Tua Kompak ✗ | Ayah Juga Bisa Mengasuh ✗ | Rumah Rapi ✗ |
| Mindset | Memutuskan dengan Kepala Dingin ✗ | Menemukan Arah Hidup ✗ | Tenang Menghadapi Tak Pasti ✗ | Berdamai dengan Masa Lalu ✗ | Mengenal Diri ✗ | Hidup Bukan Lomba ✗ | Bahagia Sederhana ✗ | Pelan-Pelan Saja ✗ |

Urutan di setiap kategori mendahulukan judul yang paling dicari dan paling mudah dijual.

## Template (Fase 1)

✓ Selesai (D53). Satu template per kategori, dibuat dengan mesin template yang sudah ada (DOCX/PDF/XLSX) dan ditautkan dari ebook terkait. Ebook baru di Fase 3 boleh menambah template sendiri di `scripts/demo/templates.mjs` (blok `["template", slug, judul, pengantar]`), hanya bila memang ada lembar yang berguna dicetak atau diisi.

| Kategori | Template | Format | Ebook terkait |
|---|---|---|---|
| Keuangan | Anggaran bulanan 50/30/20 + pelacak dana darurat | XLSX | Gajian, Dana Darurat |
| Kebiasaan | Pelacak kebiasaan 30 hari | PDF | Scroll, Menunda |
| Produktivitas | Lembar rencana mingguan | PDF | Seminggu dalam Satu Jam |
| Karier | CV ATS-friendly | DOCX | CV yang Dilirik |
| Mental | Jurnal pikiran (catatan pemicu–pikiran–respons) | PDF | Overthinking |
| Kesehatan | Jadwal lari 5K 8 minggu | PDF | Lari 5K |
| Relasi | Kartu kalimat menolak dengan sopan | PDF | Berani Bilang Tidak |
| Bisnis | Kalkulator HPP dan harga jual | XLSX | Hitung Harga Jual |
| Parenting | Kesepakatan gawai keluarga | DOCX | Anak dan Gawai |
| Mindset | Lembar refleksi mingguan ala Stoik | PDF | Stoik |

## Video Edukasi (Fase 2 dan 4)

- **Bentuk.** Video 3–8 menit per topik. Kanalnya terpisah dari video pengantar ebook.
- **Infrastruktur.** ✓ Selesai (D54). Studio → Konten baru → "Video edukasi": unggah MP4 (maks 95 MB, 16:9, H.264 + AAC), poster 16:9, pilih topik, tandai gratis bila perlu, lalu Terbitkan. Halaman tonton: app `/tonton/{slug}`, etalase `/tonton/{slug}`. Tab Video baru tampil di beranda setelah ada minimal 3 video terbit.
- **Produksi.** Isi video dibuat dengan scene toolkit yang sudah ada dan narasi ElevenLabs, jadi menunggu langganan aktif.
