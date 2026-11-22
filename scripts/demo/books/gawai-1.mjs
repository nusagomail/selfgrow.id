/**
 * "Anak dan Gawai", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: orang tua anak 2–12 tahun yang bertengkar soal gawai hampir setiap hari, capek,
 *   dan diam-diam merasa bersalah karena juga sering memegang ponsel.
 * - Gagasan inti: aturan layar yang berhasil bukan yang paling ketat, tapi yang disepakati,
 *   bisa ditebak, dan dijaga oleh tempat dan waktu, bukan oleh omelan. Pertanyaannya bergeser
 *   dari "berapa lama" ke "apa yang tergeser" (tidur, gerak, waktu keluarga).
 * - Kerangka: takaran menurut usia (WHO 2019, AAP) → lampu lalu lintas layar (zona merah, kuning,
 *   hijau) → kesepakatan dan aba-aba sebelum selesai → layar orang tua sendiri (technoference,
 *   McDaniel & Radesky 2018) → menjaga aturan saat diuji, dan kapan perlu bantuan.
 * - Bentuk: keluarga Bu Rina (Alif 8, Naya 4). Setiap bab dibuka dengan satu kalimat anak,
 *   karena dari situlah orang tua mengenali situasinya sendiri.
 * - Gambar: papan tempel di kulkas, stiker tebal dan warna krayon. Aturan yang ditempel di kulkas
 *   adalah hasil akhir buku ini.
 * - Interaktif: kuis suasana layar, grafik minggu pertama, tool neraca 24 jam (melihat apa yang
 *   tergeser) dan penyusun kesepakatan (aksi).
 * - Batas: bukan buku untuk kecanduan berat; Bab 6 merujuk ke dokter anak atau psikolog anak.
 */
import { MINGGU_PERTAMA, SATU_LEVEL_LAGI, SUASANA_LAYAR } from "./gawai-interactive.mjs";

export const GAWAI_1 = [
  {
    title: '"Lima Menit Lagi, Bun!"',
    blocks: [
      '**Alif, 8 tahun:** "Lima menit lagi, Bun! Tanggung, ini mau menang!"',
      "Pukul delapan malam di rumah Bu Rina selalu sama. Alif, 8 tahun, sedang di tengah permainan. Naya, 4 tahun, menonton video yang berganti sendiri setiap beberapa menit. Bu Rina, yang baru selesai mencuci piring, meminta tablet dikembalikan. Lalu dimulailah tawar-menawar, tangisan, dan pintu kamar yang dibanting.",
      "Setelah anak-anak tidur, Bu Rina duduk di sofa dengan ponselnya sendiri, dan merasa bersalah dua kali: karena berteriak, dan karena dia juga tidak bisa lepas dari layar.",
      ["h", "Ini bukan soal anak yang nakal"],
      "Melepas layar memang sulit, untuk anak maupun orang dewasa. Banyak aplikasi dan video dirancang supaya terus ditonton: episode berikutnya mulai otomatis, permainan selalu menawarkan satu level lagi. Anak belum punya rem sekuat orang dewasa untuk melawannya.",
      "Jadi tujuan buku ini bukan menang adu kuat dengan anak setiap malam. Tujuannya membuat sistem yang membuat adu kuat itu tidak perlu terjadi.",
      ["h", "Potret rumahmu"],
      ["quiz", SUASANA_LAYAR],
      [
        "info",
        "Buku ini untuk urusan layar sehari-hari. Kalau kamu khawatir anakmu mengalami masalah yang lebih berat, lihat daftar tanda di Bab 6.",
      ],
    ],
  },
  {
    title: '"Teman-temanku Boleh Main Sampai Malam"',
    blocks: [
      '**Alif:** "Teman-temanku boleh main sampai malam. Kenapa aku nggak?"',
      "Pertanyaan pertama yang biasanya muncul: berapa lama sebenarnya yang wajar? Jawabannya bergantung pada usia.",
      ["img", "takaran-usia", "Takaran layar menurut usia."],
      [
        "fact",
        "Untuk anak usia 2 tahun, waktu layar sambil duduk dianjurkan tidak lebih dari 1 jam sehari, dan lebih sedikit lebih baik. Anjuran yang sama berlaku untuk usia 3–4 tahun. Waktu duduk yang lebih baik adalah membaca, bercerita, bernyanyi, dan bermain puzzle bersama pengasuh.",
        "WHO, Pedoman Aktivitas Fisik, Perilaku Sedenter, dan Tidur Anak di Bawah 5 Tahun, 2019",
      ],
      ["h", "Untuk anak usia sekolah: apa yang tergeser?"],
      "Untuk anak seperti Alif, tidak ada satu angka yang berlaku untuk semua. Pertanyaan yang lebih berguna adalah: **apa yang hilang karena layar?** Kalau tidurnya cukup, dia bergerak aktif, PR-nya beres, dan masih ada waktu mengobrol dengan keluarga, satu jam bermain gim bukan masalah besar.",
      [
        "fact",
        "Tinjauan 67 penelitian menemukan bahwa waktu layar berhubungan dengan tidur yang lebih buruk pada 90% penelitian, terutama tidur yang lebih larut dan lebih singkat.",
        "Hale & Guan, Sleep Medicine Reviews, 2015",
      ],
      "Tidur adalah yang paling sering tergeser. Karena itu, kalau hanya ada satu aturan yang kamu jalankan dari buku ini, jadikan **satu jam sebelum tidur tanpa layar, dan tidak ada gawai di kamar tidur**.",
      ["tool", "neraca-24-jam-anak"],
    ],
  },
  {
    title: '"Kenapa Hari Ini Nggak Boleh? Kemarin Boleh!"',
    blocks: [
      '**Alif:** "Kenapa hari ini nggak boleh? Kemarin boleh!"',
      "Alif benar. Kemarin Bu Rina sedang lelah dan membiarkannya bermain sampai pukul sembilan. Hari ini dia sedang tidak sabar dan melarang. Bagi anak, aturan yang berubah-ubah terasa seperti undian. Jadi mereka terus mencoba, karena kadang-kadang berhasil.",
      "Aturan yang bisa ditebak jauh lebih mudah dipatuhi. Cara paling sederhana adalah membagi layar menjadi tiga zona, seperti lampu lalu lintas.",
      ["img", "lampu-layar", "Lampu lalu lintas layar."],
      ["h", "Zona merah dijaga oleh tempat, bukan omelan"],
      "Kekuatan zona merah adalah karena ia terkait dengan **tempat dan waktu**, bukan keputusan orang tua saat itu. Tidak ada yang perlu diperdebatkan di meja makan, karena meja makan memang bukan tempat layar, untuk siapa pun.",
      [
        "ul",
        [
          "Taruh pengisi daya semua gawai di ruang keluarga, bukan di kamar.",
          "Pasang pengatur waktu di gawai atau pakai pengatur waktu dapur yang terlihat anak.",
          "Matikan putar otomatis di aplikasi video. Ini satu pengaturan kecil yang mengurangi banyak tawar-menawar.",
        ],
      ],
      [
        "tip",
        "Mulai dengan dua zona merah saja: meja makan dan satu jam sebelum tidur. Tambah zona lain setelah dua zona ini berjalan dua minggu.",
      ],
    ],
  },
  {
    title: '"Aku Kan Belum Selesai!"',
    blocks: [
      '**Alif:** "Aku kan belum selesai! Satu level lagi!"',
      "Bayangkan kamu sedang menonton film, dan di tengah adegan penting seseorang mematikan televisi tanpa peringatan. Begitulah rasanya bagi anak ketika gawai diambil tiba-tiba. Ledakan emosinya bukan hanya soal layar, tapi soal **perpindahan yang mendadak**.",
      ["img", "aba-aba-selesai", "Aba-aba sebelum layar selesai."],
      ["quiz", SATU_LEVEL_LAGI],
      ["h", "Kesepakatan, bukan larangan"],
      "Untuk anak usia 6 tahun ke atas, libatkan mereka saat membuat aturan. Anak lebih menjaga aturan yang ikut dia susun. Duduk bersama di akhir pekan, saat suasana tenang, bukan tepat setelah pertengkaran.",
      [
        "ol",
        [
          "Jelaskan alasannya dengan singkat: tidur, mata, waktu main di luar, waktu bersama.",
          "Tanyakan pendapat anak: kapan waktu yang paling dia inginkan untuk bermain?",
          "Sepakati akibat yang wajar dan bisa dijalankan, misalnya besok tanpa layar. Hindari hukuman yang tidak akan kamu laksanakan.",
          "Tulis, tandatangani bersama, dan tempel.",
        ],
      ],
      ["tool", "kesepakatan-layar"],
      "Untuk Naya yang berusia 4 tahun, kesepakatannya lebih sederhana: gambar jam dan gambar keranjang. Ketika jarum jam sampai di gambar, tablet masuk keranjang.",
    ],
  },
  {
    title: '"Bunda Juga Main HP Terus"',
    blocks: [
      '**Alif:** "Bunda juga main HP terus."',
      "Kalimat Alif itu menusuk, karena benar. Bu Rina membalas pesan kantor di meja makan, menggulir media sosial saat menemani Naya bermain, dan memegang ponsel saat Alif bercerita tentang sekolahnya.",
      ["img", "ponsel-orang-tua", "Layar di tangan kita sendiri."],
      [
        "fact",
        "Dalam penelitian terhadap 170 keluarga dengan anak sekitar 3 tahun, orang tua yang lebih banyak terdistraksi gawai saat bersama anak melaporkan lebih banyak masalah perilaku pada anaknya. Penelitian lanjutan menunjukkan hubungannya dua arah: perilaku anak yang sulit juga membuat orang tua lebih sering lari ke ponsel.",
        "McDaniel & Radesky, Child Development, 2018; Pediatric Research, 2018",
      ],
      "Anak belajar lebih banyak dari apa yang mereka lihat daripada dari apa yang mereka dengar. Aturan layar yang hanya berlaku untuk anak akan terasa tidak adil, dan memang tidak adil.",
      [
        "exercise",
        [
          "Pilih satu jam setiap hari ketika ponsel ayah dan ibu juga masuk keranjang.",
          'Kalau harus membalas pesan penting, katakan pada anak: "Bunda balas pesan kantor dulu, dua menit." Lalu letakkan lagi.',
          "Saat anak bercerita, letakkan ponsel dengan layar menghadap ke bawah dan tatap anak.",
        ],
        "Latihan: aturan untuk orang tua",
      ],
    ],
  },
  {
    title: '"Bunda Jahat!"',
    blocks: [
      '**Alif:** "Bunda jahat! Aku benci Bunda!"',
      "Hari kedua kesepakatan, Alif melanggar batas waktu, dan Bu Rina menjalankan akibatnya: besok tanpa layar. Alif berteriak, menangis, dan membanting pintu. Bu Rina hampir menyerah.",
      ["chart", MINGGU_PERTAMA],
      "Ini pola yang sangat umum: **sebelum membaik, biasanya memburuk dulu**. Anak sedang menguji apakah aturan barunya sungguhan. Kalau di hari-hari ini orang tua mengalah, anak belajar bahwa berteriak cukup keras akan berhasil. Kalau orang tua tetap tenang dan konsisten, ujiannya berhenti.",
      ["h", "Menjaga aturan tanpa ikut meledak"],
      [
        "ul",
        [
          'Akui perasaannya: "Kamu kesal karena belum selesai. Bunda mengerti."',
          "Jangan berdebat ulang soal aturan saat anak sedang marah. Aturan dibahas di pertemuan akhir pekan.",
          "Jalankan akibat yang sudah disepakati, tanpa menambah hukuman baru karena emosi.",
          "Puji saat anak berhenti tepat waktu, sekecil apa pun.",
        ],
      ],
      ["img", "tanda-bantuan", "Kapan perlu bantuan profesional."],
      [
        "reflect",
        [
          "Kapan di rumahmu layar paling sering menjadi sumber pertengkaran?",
          "Satu zona merah apa yang akan kamu mulai minggu ini, dan apakah kamu juga ikut menjaganya?",
        ],
      ],
      [
        "summary",
        [
          "Tujuannya bukan menang adu kuat, tapi membuat sistem yang membuat adu kuat tidak perlu.",
          "Di bawah 2 tahun sebaiknya tanpa layar kecuali video call; 2–4 tahun paling lama 1 jam sehari (WHO).",
          "Untuk anak usia sekolah, tanyakan apa yang tergeser: tidur, gerak, PR, waktu keluarga.",
          "Bagi layar menjadi zona merah, kuning, dan hijau yang dijaga tempat dan waktu.",
          "Beri aba-aba sebelum selesai dan susun kesepakatan bersama anak.",
          "Aturan berlaku juga untuk orang tua. Minggu pertama biasanya paling berat; tetap tenang dan konsisten.",
        ],
      ],
    ],
  },
];
