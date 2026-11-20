/**
 * Konten DEMO untuk staging: 10 ebook sederhana, satu per kategori (D36). Bukan konten jual:
 * pemilik menggantinya lewat Studio. Bab 1 tiap ebook ditandai gratis.
 *
 * Format blok sederhana diubah ke JSON Tiptap oleh seed.mjs:
 *   "teks"                → paragraf
 *   ["h", "judul"]        → heading level 2
 *   ["ul", [..]]          → daftar berbutir
 *   ["ol", [..]]          → daftar bernomor
 *   ["tip", "teks"]       → callout tips
 */
export const EBOOKS = [
  {
    slug: "gaji-aman-sampai-akhir-bulan",
    topic: "top_anggaran-arus-kas",
    category: "Keuangan Pribadi",
    title: "Gaji Aman Sampai Akhir Bulan",
    summary:
      "Cara sederhana mengatur gaji dengan aturan 50/30/20 supaya tidak habis sebelum tanggal 25.",
    cover: { from: "#073e1f", to: "#1d7a34", accent: "#f4ac13", motif: "bars" },
    chapters: [
      {
        title: "Kenapa gaji cepat habis",
        blocks: [
          "Gaji habis sebelum tanggal 25 jarang terjadi karena penghasilan terlalu kecil. Lebih sering, uang keluar tanpa rencana: jajan kecil yang berulang, cicilan yang lupa dihitung, dan belanja dadakan.",
          ["h", "Tiga kebocoran paling umum"],
          [
            "ul",
            [
              "Pengeluaran kecil harian yang tidak dicatat, misalnya kopi dan ongkir.",
              "Langganan yang lupa dibatalkan.",
              "Belanja karena diskon, bukan karena butuh.",
            ],
          ],
          [
            "tip",
            "Catat semua pengeluaran selama 7 hari, sekecil apa pun. Kamu akan kaget melihat totalnya.",
          ],
        ],
      },
      {
        title: "Aturan 50/30/20",
        blocks: [
          "Bagi gaji bersih menjadi tiga pos: 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan atau pelunasan utang.",
          [
            "ol",
            [
              "Kebutuhan: kos, makan, transportasi, cicilan wajib.",
              "Keinginan: nongkrong, hiburan, belanja non-pokok.",
              "Tabungan: dana darurat, investasi, atau melunasi utang lebih cepat.",
            ],
          ],
          "Kalau kebutuhanmu lebih dari 50%, jangan menyerah. Mulai dari 70/20/10, lalu geser pelan-pelan.",
        ],
      },
      {
        title: "Mulai bulan ini",
        blocks: [
          "Hari gajian adalah hari terpenting. Langsung pindahkan porsi tabungan ke rekening terpisah sebelum uang sempat terpakai.",
          [
            "ul",
            [
              "Buat rekening khusus tabungan tanpa kartu ATM.",
              "Atur transfer otomatis di hari gajian.",
              "Tinjau pengeluaran setiap Minggu malam selama 10 menit.",
            ],
          ],
          ["tip", "Bayar dirimu sendiri lebih dulu: tabungan bukan sisa, tapi pos pertama."],
        ],
      },
    ],
  },
  {
    slug: "kebiasaan-kecil-hasil-besar",
    topic: "top_membangun-kebiasaan",
    category: "Kebiasaan & Disiplin",
    title: "Kebiasaan Kecil, Hasil Besar",
    summary: "Membangun kebiasaan baru mulai dari 2 menit sehari, tanpa mengandalkan motivasi.",
    cover: { from: "#0b4a3a", to: "#2f8f6b", accent: "#f4ac13", motif: "dots" },
    chapters: [
      {
        title: "Lupakan motivasi, andalkan sistem",
        blocks: [
          "Motivasi itu naik turun. Orang yang konsisten bukan yang paling termotivasi, tapi yang punya sistem sederhana dan diulang setiap hari.",
          ["h", "Mulai dari 2 menit"],
          "Kecilkan kebiasaanmu sampai terasa terlalu mudah: 2 menit membaca, 1 kali push-up, atau menulis satu kalimat jurnal.",
          [
            "tip",
            "Tujuannya bukan hasil besar di hari pertama, tapi menjadi orang yang selalu muncul.",
          ],
        ],
      },
      {
        title: "Tempelkan pada kebiasaan lama",
        blocks: [
          "Cara termudah mengingat kebiasaan baru adalah menempelkannya pada kebiasaan yang sudah ada.",
          [
            "ul",
            [
              "Setelah menyikat gigi pagi, aku minum segelas air.",
              "Setelah menaruh tas di kantor, aku menulis 3 prioritas hari ini.",
              "Setelah makan malam, aku berjalan kaki 10 menit.",
            ],
          ],
          "Rumusnya: setelah [kebiasaan lama], aku akan [kebiasaan baru].",
        ],
      },
      {
        title: "Jaga rantainya",
        blocks: [
          "Tandai setiap hari kamu berhasil. Rantai tanda yang panjang membuatmu enggan memutusnya.",
          [
            "ol",
            [
              "Pakai tracker harian dan centang setiap selesai.",
              "Kalau terlewat sehari, jangan sampai dua hari berturut-turut.",
              "Rayakan streak 7, 21, dan 30 hari.",
            ],
          ],
          ["tip", "Gagal sekali itu wajar. Yang berbahaya adalah gagal dua kali berturut-turut."],
        ],
      },
    ],
  },
  {
    slug: "satu-jam-merencanakan-seminggu-lancar",
    topic: "top_rencana-harian-mingguan",
    category: "Produktivitas & Fokus",
    title: "Satu Jam Merencanakan, Seminggu Lancar",
    summary: "Rencana mingguan sederhana supaya sibuk seharian benar-benar menghasilkan.",
    cover: { from: "#123552", to: "#2f6fa8", accent: "#f4ac13", motif: "grid" },
    chapters: [
      {
        title: "Sibuk tidak sama dengan produktif",
        blocks: [
          "Banyak orang merasa sibuk seharian tapi pekerjaan penting tidak maju. Penyebabnya: hari diisi hal mendesak milik orang lain, bukan hal penting milik kita.",
          ["h", "Pisahkan penting dan mendesak"],
          [
            "ul",
            [
              "Penting dan mendesak: kerjakan sekarang.",
              "Penting tapi tidak mendesak: jadwalkan.",
              "Mendesak tapi tidak penting: delegasikan atau batasi.",
              "Tidak keduanya: hapus.",
            ],
          ],
        ],
      },
      {
        title: "Ritual Minggu malam",
        blocks: [
          "Luangkan satu jam setiap Minggu malam untuk menyusun minggu depan.",
          [
            "ol",
            [
              "Tulis 3 hasil terpenting minggu ini.",
              "Pecah tiap hasil menjadi tugas kecil.",
              "Taruh tugas-tugas itu di kalender, bukan hanya di daftar.",
            ],
          ],
          [
            "tip",
            "Tugas yang punya jam di kalender jauh lebih mungkin selesai daripada yang hanya ada di daftar.",
          ],
        ],
      },
      {
        title: "Lindungi jam fokus",
        blocks: [
          "Pilih 2 jam setiap hari untuk pekerjaan terpenting, saat energimu paling tinggi.",
          [
            "ul",
            [
              "Matikan notifikasi HP selama jam fokus.",
              "Tutup tab dan aplikasi yang tidak dipakai.",
              "Beri tahu rekan kerja jam berapa kamu bisa dihubungi.",
            ],
          ],
          "Dua jam fokus penuh sering menghasilkan lebih banyak daripada delapan jam yang terpotong-potong.",
        ],
      },
    ],
  },
  {
    slug: "cv-yang-lolos-saringan-hrd",
    topic: "top_cv-lamaran",
    category: "Karier & Pekerjaan",
    title: "CV yang Lolos Saringan HRD",
    summary:
      "Menyusun CV ringkas yang terbaca sistem ATS dan menarik perhatian perekrut dalam 6 detik.",
    cover: { from: "#2a2f45", to: "#4a5578", accent: "#f4ac13", motif: "steps" },
    chapters: [
      {
        title: "6 detik pertama",
        blocks: [
          "Perekrut rata-rata hanya memindai sebuah CV beberapa detik sebelum memutuskan lanjut atau tidak. Bagian atas CV menentukan segalanya.",
          ["h", "Yang wajib terlihat di atas"],
          [
            "ul",
            [
              "Nama, kota, email, dan nomor WhatsApp.",
              "Satu kalimat ringkasan: siapa kamu dan apa keahlian utamamu.",
              "Pengalaman paling relevan dengan lowongan.",
            ],
          ],
          [
            "tip",
            "Satu CV untuk semua lowongan jarang berhasil. Sesuaikan ringkasan dengan setiap posisi.",
          ],
        ],
      },
      {
        title: "Lolos sistem ATS",
        blocks: [
          "Banyak perusahaan menyaring CV dengan sistem otomatis (ATS) sebelum dibaca manusia.",
          [
            "ol",
            [
              "Pakai format sederhana: satu kolom, tanpa tabel rumit.",
              "Gunakan kata kunci dari deskripsi lowongan.",
              "Simpan sebagai PDF dengan nama file yang jelas, misalnya CV-Nama-Posisi.pdf.",
            ],
          ],
        ],
      },
      {
        title: "Tulis pencapaian, bukan tugas",
        blocks: [
          'Bandingkan: "Bertanggung jawab atas media sosial" dengan "Menaikkan pengikut Instagram dari 2.000 ke 15.000 dalam 6 bulan". Yang kedua jauh lebih meyakinkan.',
          [
            "ul",
            [
              "Mulai dengan kata kerja aktif: meningkatkan, menghemat, memimpin.",
              "Tambahkan angka bila bisa.",
              "Maksimal 3–5 poin per pengalaman.",
            ],
          ],
          ["tip", "Rumus sederhana: kata kerja + apa yang dilakukan + hasilnya dalam angka."],
        ],
      },
    ],
  },
  {
    slug: "keluar-dari-lingkaran-overthinking",
    topic: "top_overthinking",
    category: "Kesehatan Mental & Emosi",
    title: "Keluar dari Lingkaran Overthinking",
    summary:
      "Latihan sederhana untuk menenangkan pikiran yang terus berputar, terutama menjelang tidur.",
    cover: { from: "#34205a", to: "#7a5aa8", accent: "#f4ac13", motif: "rings" },
    chapters: [
      {
        title: "Kenali pola overthinking",
        blocks: [
          "Overthinking adalah memikirkan hal yang sama berulang-ulang tanpa sampai pada keputusan atau tindakan. Biasanya muncul saat lelah, sendirian, atau menjelang tidur.",
          [
            "ul",
            [
              "Mengulang percakapan yang sudah lewat.",
              "Membayangkan skenario terburuk.",
              "Sulit tidur karena pikiran tidak berhenti.",
            ],
          ],
          [
            "tip",
            "Materi ini latihan mandiri, bukan pengganti psikolog. Bila cemas mengganggu aktivitas, hubungi tenaga profesional.",
          ],
        ],
      },
      {
        title: "Fakta atau asumsi?",
        blocks: [
          "Tulis pikiran yang mengganggumu, lalu tanyakan: ini fakta yang bisa dibuktikan, atau asumsi?",
          [
            "ol",
            [
              "Tulis pikirannya apa adanya.",
              "Tandai bagian yang fakta dan yang asumsi.",
              "Tulis satu penjelasan lain yang lebih adil.",
            ],
          ],
          "Seringkali pikiran yang terasa besar menyusut setelah ditulis di kertas.",
        ],
      },
      {
        title: "Jadwal khawatir",
        blocks: [
          "Beri waktu khusus 15 menit setiap sore untuk khawatir. Di luar jam itu, setiap kekhawatiran dicatat dulu untuk dibahas nanti.",
          [
            "ul",
            [
              "Siapkan catatan kecil di HP.",
              "Saat jamnya tiba, baca dan putuskan satu langkah kecil.",
              "Selesai 15 menit, tutup catatannya.",
            ],
          ],
          [
            "tip",
            "Menunda kekhawatiran memberi pikiranmu rasa aman: tidak ada yang dilupakan, hanya dijadwalkan.",
          ],
        ],
      },
    ],
  },
  {
    slug: "dari-rebahan-ke-lari-5k",
    topic: "top_mulai-olahraga",
    category: "Kesehatan & Kebugaran",
    title: "Dari Rebahan ke Lari 5K",
    summary: "Program pemula 8 minggu untuk bisa berlari 5 kilometer tanpa berhenti.",
    cover: { from: "#5a3a00", to: "#d08a00", accent: "#ffffff", motif: "wave" },
    chapters: [
      {
        title: "Mulai dari jalan cepat",
        blocks: [
          "Kamu tidak perlu langsung berlari. Minggu pertama cukup jalan cepat 20 menit, tiga kali seminggu.",
          ["h", "Yang kamu butuhkan"],
          [
            "ul",
            [
              "Sepatu yang nyaman (tidak harus mahal).",
              "Botol minum.",
              "Waktu 30 menit, tiga kali seminggu.",
            ],
          ],
          [
            "tip",
            "Konsultasikan dengan dokter dulu bila punya masalah jantung, sendi, atau tekanan darah.",
          ],
        ],
      },
      {
        title: "Lari-jalan bergantian",
        blocks: [
          "Mulai minggu kedua, selingi jalan dengan lari pelan.",
          [
            "ol",
            [
              "Pemanasan jalan 5 menit.",
              "Lari pelan 1 menit, jalan 2 menit. Ulangi 6 kali.",
              "Pendinginan jalan 5 menit.",
            ],
          ],
          "Setiap minggu, tambah durasi lari dan kurangi durasi jalan sedikit demi sedikit.",
        ],
      },
      {
        title: "Menuju 5K",
        blocks: [
          "Di minggu ketujuh dan kedelapan, kamu akan berlari 20–30 menit tanpa berhenti, yaitu sekitar 5 kilometer untuk pemula.",
          [
            "ul",
            [
              "Lari dengan kecepatan yang masih bisa dipakai mengobrol.",
              "Tidur cukup dan minum air yang banyak.",
              "Beri jeda satu hari di antara hari lari.",
            ],
          ],
          ["tip", "Catat setiap latihan di tracker. Melihat kemajuan adalah motivasi terbaik."],
        ],
      },
    ],
  },
  {
    slug: "bicara-di-depan-umum-tanpa-gemetar",
    topic: "top_public-speaking",
    category: "Komunikasi & Relasi",
    title: "Bicara di Depan Umum Tanpa Gemetar",
    summary: "Teknik sederhana menyiapkan dan membawakan presentasi 5 menit dengan percaya diri.",
    cover: { from: "#7a1f2b", to: "#c2414f", accent: "#f4ac13", motif: "arc" },
    chapters: [
      {
        title: "Grogi itu normal",
        blocks: [
          "Hampir semua orang grogi sebelum bicara di depan umum. Jantung berdebar adalah tanda tubuh bersiap, bukan tanda kamu akan gagal.",
          ["h", "Ubah cara memandang grogi"],
          'Alih-alih berkata "aku gugup", coba katakan "aku bersemangat". Reaksi tubuhnya sama, tapi pikiranmu jadi lebih siap.',
          [
            "tip",
            "Tarik napas 4 detik, tahan 4 detik, embuskan 6 detik. Ulangi 3 kali sebelum maju.",
          ],
        ],
      },
      {
        title: "Kerangka 5 menit",
        blocks: [
          "Presentasi singkat cukup punya tiga bagian.",
          [
            "ol",
            [
              "Pembuka: satu cerita atau pertanyaan yang dekat dengan pendengar.",
              "Isi: maksimal tiga poin utama.",
              "Penutup: satu ajakan atau kesimpulan yang mudah diingat.",
            ],
          ],
          "Jangan menghafal kata per kata. Hafalkan urutan poinnya saja.",
        ],
      },
      {
        title: "Latihan yang benar",
        blocks: [
          "Latihan terbaik adalah latihan yang mirip aslinya.",
          [
            "ul",
            [
              "Berdiri dan bicara keras, jangan hanya membaca dalam hati.",
              "Rekam dengan HP lalu tonton ulang.",
              "Latih di depan satu atau dua teman.",
            ],
          ],
          [
            "tip",
            "Tiga kali latihan bersuara lebih berguna daripada sepuluh kali membaca catatan.",
          ],
        ],
      },
    ],
  },
  {
    slug: "usaha-sampingan-modal-kecil",
    topic: "top_ide-usaha",
    category: "Bisnis & Penghasilan Tambahan",
    title: "Usaha Sampingan Modal Kecil",
    summary: "Menemukan dan menguji ide usaha sampingan tanpa harus berhenti kerja.",
    cover: { from: "#3d4a0b", to: "#7a8f1d", accent: "#f4ac13", motif: "sun" },
    chapters: [
      {
        title: "Mulai dari yang kamu bisa",
        blocks: [
          "Usaha sampingan terbaik biasanya berangkat dari keahlian yang sudah kamu punya, bukan dari tren yang sedang ramai.",
          ["h", "Tiga pertanyaan awal"],
          [
            "ul",
            [
              "Apa yang sering orang minta tolong kepadamu?",
              "Masalah apa yang sering kamu lihat di sekitarmu?",
              "Berapa jam per minggu yang realistis kamu sediakan?",
            ],
          ],
        ],
      },
      {
        title: "Uji sebelum modal besar",
        blocks: [
          "Sebelum membeli stok atau alat, uji dulu apakah orang mau membayar.",
          [
            "ol",
            [
              "Tawarkan ke 10 orang terdekat dengan harga jelas.",
              "Buka pre-order lewat WhatsApp atau media sosial.",
              "Catat siapa yang benar-benar membayar, bukan sekadar bilang tertarik.",
            ],
          ],
          [
            "tip",
            'Lima pembeli pertama yang membayar lebih berharga daripada seratus orang yang bilang "bagus".',
          ],
        ],
      },
      {
        title: "Hitung untungnya",
        blocks: [
          "Banyak usaha sampingan terlihat laris tapi ternyata rugi karena biaya tidak dihitung.",
          [
            "ul",
            [
              "Hitung modal per produk, termasuk kemasan dan ongkir.",
              "Masukkan biaya waktu dan potongan marketplace.",
              "Tentukan harga jual minimal 2 kali modal untuk produk fisik.",
            ],
          ],
          "Pisahkan uang usaha dan uang pribadi sejak hari pertama.",
        ],
      },
    ],
  },
  {
    slug: "atur-layar-tanpa-perang",
    topic: "top_anak-gawai",
    category: "Keluarga & Parenting",
    title: "Atur Layar Tanpa Perang",
    summary: "Membuat aturan HP dan gawai bersama anak tanpa drama setiap hari.",
    cover: { from: "#0e4a5c", to: "#1f8aa6", accent: "#f4ac13", motif: "circles" },
    chapters: [
      {
        title: "Kenapa larangan saja tidak berhasil",
        blocks: [
          "Melarang tanpa penjelasan sering berakhir dengan tawar-menawar setiap hari. Anak lebih mudah patuh pada aturan yang ikut ia buat.",
          ["h", "Mulai dari contoh orang tua"],
          "Anak meniru apa yang dilihat. Kalau orang tua terus memegang HP saat makan, aturan untuk anak akan terasa tidak adil.",
          ["tip", "Pilih satu waktu bebas HP untuk seluruh keluarga, misalnya saat makan malam."],
        ],
      },
      {
        title: "Kesepakatan keluarga",
        blocks: [
          "Duduk bersama dan buat kesepakatan tertulis yang sederhana.",
          [
            "ol",
            [
              "Berapa lama boleh main HP di hari sekolah dan hari libur.",
              "Kapan dan di mana HP tidak boleh dipakai.",
              "Apa yang terjadi bila kesepakatan dilanggar.",
            ],
          ],
          "Tempel kesepakatan di tempat yang terlihat, lalu tinjau ulang setiap bulan.",
        ],
      },
      {
        title: "Ganti, jangan hanya kurangi",
        blocks: [
          "Waktu layar yang dikurangi perlu diganti dengan kegiatan lain, kalau tidak anak akan bosan dan kembali ke HP.",
          [
            "ul",
            [
              "Siapkan kotak berisi buku, mainan konstruksi, atau alat gambar.",
              "Jadwalkan kegiatan luar rumah di akhir pekan.",
              "Libatkan anak dalam pekerjaan rumah sederhana.",
            ],
          ],
          [
            "tip",
            "Lima belas menit bermain bersama orang tua sering lebih menarik bagi anak daripada satu jam HP.",
          ],
        ],
      },
    ],
  },
  {
    slug: "fokus-pada-yang-bisa-dikendalikan",
    topic: "top_stoikisme",
    category: "Mindset & Makna Hidup",
    title: "Fokus pada yang Bisa Dikendalikan",
    summary:
      "Pelajaran sederhana dari stoikisme untuk hidup lebih tenang di tengah hal yang tidak pasti.",
    cover: { from: "#1f1f1f", to: "#4a4a4a", accent: "#f4ac13", motif: "split" },
    chapters: [
      {
        title: "Dua lingkaran",
        blocks: [
          "Gambar dua lingkaran: satu berisi hal yang bisa kamu kendalikan, satu lagi hal yang tidak. Sebagian besar stres datang dari memikirkan lingkaran kedua.",
          [
            "ul",
            [
              "Bisa dikendalikan: sikap, usaha, kata-kata, pilihan hari ini.",
              "Tidak bisa dikendalikan: cuaca, pendapat orang lain, masa lalu.",
            ],
          ],
          [
            "tip",
            "Saat cemas, tanyakan: bagian mana dari masalah ini yang bisa aku kendalikan sekarang?",
          ],
        ],
      },
      {
        title: "Latihan malam",
        blocks: [
          "Sebelum tidur, jawab tiga pertanyaan singkat di jurnal.",
          [
            "ol",
            [
              "Apa yang aku lakukan dengan baik hari ini?",
              "Apa yang bisa aku lakukan lebih baik?",
              "Apa yang aku pelajari?",
            ],
          ],
          "Tujuannya bukan menghakimi diri, tapi belajar dan memulai besok dengan lebih jernih.",
        ],
      },
      {
        title: "Bersyukur atas yang ada",
        blocks: [
          "Bayangkan sejenak kehilangan sesuatu yang kamu punya hari ini: kesehatan, keluarga, pekerjaan. Latihan ini membuat kita lebih menghargai yang sering dianggap biasa.",
          [
            "ul",
            [
              "Tulis tiga hal yang kamu syukuri setiap pagi.",
              "Sampaikan terima kasih kepada satu orang setiap hari.",
            ],
          ],
          ["tip", "Ketenangan bukan berarti tidak ada masalah, tapi tahu di mana menaruh tenaga."],
        ],
      },
    ],
  },
];
