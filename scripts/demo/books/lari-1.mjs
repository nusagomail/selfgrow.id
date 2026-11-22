/**
 * "Dari Rebahan ke Lari 5K", 6 bab. Bentuk: buku program; tokoh Rio (34, pekerja kantoran yang
 * hampir tidak pernah berolahraga) menulis catatan singkat di awal setiap bab. Program 8 minggu
 * lari–jalan berselang adalah rancangan buku ini. Edukasi umum; kondisi kesehatan tertentu perlu
 * konsultasi dokter sebelum mulai.
 */
import { CEK_AMAN, ZONA_BICARA } from "./lari-interactive.mjs";

export const LARI_1 = [
  {
    title: "Kenapa 5K, dan Kenapa Bukan Besok Langsung Lari",
    blocks: [
      '**Catatan Rio, hari 0:** "Naik tangga ke lantai tiga kantor sudah ngos-ngosan. Teman-teman sekantor ikut lari 5K bulan depan. Aku daftar. Mungkin keputusan yang salah."',
      "Lima kilometer adalah jarak yang ideal untuk target pertama: cukup jauh untuk terasa sebagai pencapaian, cukup dekat untuk dicapai pemula dalam dua bulan. Banyak acara lari di kota-kota Indonesia menyediakan kategori 5K, dan sebagian besar pesertanya bukan atlet.",
      ["h", "Kesalahan paling umum"],
      'Hari pertama, kebanyakan pemula langsung berlari sekencang yang mereka bisa. Lima menit kemudian napas habis, kaki berat, dan muncul kesimpulan: "Aku memang tidak cocok lari." Padahal yang salah bukan badannya, tapi programnya.',
      "Buku ini memakai cara yang lebih pelan: **berselang antara lari dan jalan**. Porsi lari bertambah sedikit setiap minggu, sementara jalan berkurang, sampai di minggu kedelapan kamu bisa berlari 30 menit tanpa berhenti.",
      ["img", "rencana-8-minggu", "Program delapan minggu."],
      ["h", "Sebelum mulai: cek keamanan"],
      ["quiz", CEK_AMAN],
      [
        "warn",
        "Hentikan latihan dan segera cari pertolongan bila muncul nyeri atau rasa tertekan di dada, sesak napas yang tidak membaik saat berhenti, atau pusing berat.",
      ],
    ],
  },
  {
    title: "Seberapa Cepat? Pakai Tes Bicara",
    blocks: [
      '**Catatan Rio, minggu 1:** "Satu menit lari terasa lama sekali. Tapi aku selesai delapan putaran."',
      "Jam pintar dan aplikasi lari punya banyak angka. Untuk pemula, satu alat ukur sudah cukup, dan gratis: **apakah kamu masih bisa bicara?**",
      ["img", "tes-bicara", "Tiga zona tes bicara."],
      'Di zona yang pas, kamu masih bisa mengucapkan kalimat lengkap walau napas terasa berat. Kalau hanya bisa mengucapkan satu-dua kata, pelankan. Di awal program, lari yang benar sering terasa "terlalu lambat". Itu justru tanda kamu melakukannya dengan benar.',
      ["quiz", ZONA_BICARA],
      ["img", "anatomi-sesi", "Satu sesi dari awal sampai akhir."],
      ["tool", "jadwal-lari-8-minggu"],
      [
        "tip",
        "Lari di tempat datar dulu. Taman kota, lapangan, atau jalan kompleks di pagi hari lebih ramah untuk pemula daripada tanjakan atau jalan raya yang ramai.",
      ],
    ],
  },
  {
    title: "Minggu 1–4: Membangun Kebiasaan",
    blocks: [
      '**Catatan Rio, minggu 3:** "Bangun pagi tetap berat. Tapi setelah sepuluh menit, aku selalu senang sudah keluar rumah."',
      "Empat minggu pertama bukan tentang kecepatan atau jarak. Tujuannya adalah membuat tiga sesi seminggu menjadi bagian biasa dari hidupmu.",
      ["h", "Yang membantu Rio bertahan"],
      [
        "ul",
        [
          "**Jadwal tetap:** Selasa, Kamis, dan Sabtu pukul 05.30. Tidak perlu memutuskan ulang setiap hari.",
          "**Baju disiapkan malam sebelumnya,** sepatu di dekat pintu.",
          "**Teman lari:** satu rekan kerja yang juga pemula. Rasa tidak enak membatalkan janji ternyata kuat.",
          "**Catatan sederhana:** tanggal, sesi, dan satu kata tentang rasanya.",
        ],
      ],
      ["h", "Sepatu dan perlengkapan"],
      "Kamu tidak perlu sepatu mahal. Yang penting sepatu olahraga yang nyaman, sudah dipakai jalan beberapa kali, dan tidak membuat lecet. Baju yang menyerap keringat dan botol minum sudah cukup.",
      [
        "info",
        "Pegal di betis dan paha selama satu-dua hari setelah latihan itu wajar untuk pemula. Nyeri tajam di satu titik, atau nyeri yang makin parah saat berlari, bukan hal wajar: istirahat dan periksakan.",
      ],
    ],
  },
  {
    title: "Minggu 5–8: Dari Berselang ke Tanpa Henti",
    blocks: [
      '**Catatan Rio, minggu 6:** "Dua belas menit tanpa berhenti. Setahun lalu aku tidak percaya ini mungkin."',
      "Minggu kelima dan keenam adalah lompatan terbesar: blok lari menjadi delapan lalu dua belas menit. Banyak orang merasa ragu di sini. Dua hal membantu:",
      [
        "ol",
        [
          "**Pelankan lagi.** Lari lebih lama hanya mungkin kalau kecepatannya lebih rendah. Kembali ke tes bicara.",
          "**Pecah dalam kepala.** Dua belas menit adalah tiga kali empat menit. Hitung blok kecilnya, bukan totalnya.",
        ],
      ],
      ["img", "sinyal-berhenti", "Kapan harus berhenti."],
      "Kalau satu minggu terasa terlalu berat, ulangi minggu itu. Program ini tidak punya tenggat; acara 5K bisa diikuti bulan depan atau bulan berikutnya.",
      [
        "reflect",
        [
          "Kapan terakhir kali kamu melakukan sesuatu yang dulu kamu pikir tidak mungkin?",
          "Kalimat apa yang akan kamu ucapkan pada dirimu sendiri saat ingin berhenti di menit ketujuh?",
        ],
      ],
    ],
  },
  {
    title: "Hari Lomba",
    blocks: [
      '**Catatan Rio, minggu 9:** "Nomor dada 2217. Tidak bisa tidur semalam."',
      "Lomba 5K pertamamu bukan tentang waktu, tapi tentang menyelesaikannya dengan senang. Beberapa hal yang membantu:",
      [
        "table",
        [
          ["Kapan", "Yang dilakukan"],
          ["Malam sebelumnya", "Siapkan baju, nomor dada, peniti. Tidur lebih awal."],
          ["Pagi hari", "Sarapan ringan yang biasa kamu makan, 1,5–2 jam sebelum mulai."],
          ["Di garis start", "Berdiri di belakang. Biarkan yang cepat berangkat duluan."],
          [
            "Kilometer pertama",
            "Sengaja lebih pelan dari biasanya. Kegembiraan membuat kita terlalu cepat.",
          ],
          ["Kilometer terakhir", "Kalau masih ada tenaga, baru percepat."],
        ],
      ],
      ["tool", "kalkulator-pace-5k"],
      [
        "tip",
        "Jangan mencoba sepatu, minuman energi, atau makanan baru di hari lomba. Pakai semua yang sudah kamu coba saat latihan.",
      ],
    ],
  },
  {
    title: "Setelah Garis Finis",
    blocks: [
      '**Catatan Rio, setelah lomba:** "39 menit 40 detik. Tidak tercepat, tidak terlambat. Yang penting: aku lari semuanya."',
      "Setelah 5K pertama, ada dua godaan: berhenti total karena target sudah tercapai, atau langsung mendaftar 10K minggu depan. Keduanya sering berakhir sama: berhenti berlari.",
      ["img", "anjuran-who", "Anjuran aktivitas fisik WHO."],
      ["h", "Pilihan setelah 5K"],
      [
        "ul",
        [
          "**Pertahankan:** tiga kali seminggu, 30 menit. Ini sudah sangat baik untuk kesehatan.",
          "**Perbaiki waktu:** tambahkan satu sesi interval seminggu, misalnya 6 kali lari cepat satu menit.",
          "**Tambah jarak:** naikkan sesi terpanjang sekitar 5 menit setiap minggu, menuju 10K dalam dua sampai tiga bulan.",
        ],
      ],
      [
        "summary",
        [
          "Cek keamanan sebelum mulai; konsultasi dokter bila ada kondisi tertentu.",
          "Mulai dengan berselang lari dan jalan. Porsi lari bertambah sedikit setiap minggu.",
          "Pakai tes bicara: masih bisa mengobrol berarti kecepatannya pas.",
          "Tiga sesi seminggu dengan jadwal tetap. Mengulang minggu yang berat itu wajar.",
          "Di hari lomba, kilometer pertama lebih pelan. Tujuannya selesai dengan senang.",
        ],
      ],
    ],
  },
];
