/**
 * "CV yang Dilirik Rekruter", 6 bab. Bentuk: satu tokoh, Sekar (25, staf pemasaran digital)
 * yang mengirim 40 lamaran tanpa panggilan, dan CV-nya diperbaiki bab demi bab seperti lembar
 * yang dikoreksi. Contoh perusahaan dan angka adalah ilustrasi.
 */
import { CEK_CV, LOLOS_MESIN } from "./cv-interactive.mjs";

export const CV_1 = [
  {
    title: "Empat Puluh Lamaran, Nol Panggilan",
    blocks: [
      "Dalam tiga bulan, Sekar sudah mengirim 40 lamaran. Dua puluh lewat situs lowongan, sepuluh lewat surel, sisanya lewat kenalan. Hasilnya: tiga balasan otomatis, nol panggilan wawancara.",
      "Sekar tidak kurang pengalaman. Dua tahun di bagian pemasaran digital, pernah memegang kampanye yang hasilnya bagus. Masalahnya, tidak satu pun dari itu terlihat di CV-nya.",
      ["h", "Waktu yang sangat singkat"],
      [
        "fact",
        "Dalam studi pelacakan mata, rekruter menghabiskan rata-rata 7,4 detik untuk pandangan pertama sebuah CV sebelum memutuskan membacanya lebih lanjut atau tidak. CV dengan tata letak sederhana, judul bagian yang jelas, dan kalimat pencapaian yang pendek mendapat perhatian lebih baik.",
        "Ladders, Eye-Tracking Study (2018)",
      ],
      ["img", "tujuh-detik", "Yang terbaca dalam tujuh detik pertama."],
      "Artinya, CV bukan riwayat hidup lengkap. CV adalah **iklan satu halaman** yang tugasnya hanya satu: membuat rekruter ingin memanggilmu untuk wawancara.",
      ["h", "Cek CV-mu sekarang"],
      ["quiz", CEK_CV],
    ],
  },
  {
    title: "Sepertiga Atas Halaman",
    blocks: [
      "Bagian paling berharga dari CV adalah sepertiga atas halaman pertama. Di sinilah tujuh detik itu dihabiskan.",
      ["h", "Yang wajib ada di sana"],
      [
        "ol",
        [
          "**Nama, posisi yang dilamar, kota, nomor HP, surel.** Tidak perlu foto kecuali diminta, tidak perlu tanggal lahir atau status pernikahan.",
          "**Ringkasan dua sampai tiga baris.** Siapa kamu, keahlian utama, dan satu pencapaian terbaik.",
          "**Pengalaman terbaru**, dengan jabatan yang ditebalkan.",
        ],
      ],
      ["h", "Ringkasan Sekar, sebelum dan sesudah"],
      [
        "table",
        [
          ["Sebelum", "Sesudah"],
          [
            "Saya adalah pribadi yang pekerja keras, mudah beradaptasi, dan senang belajar hal baru.",
            "Digital marketer dengan 2 tahun pengalaman di Meta Ads dan konten Instagram. Mengelola anggaran iklan Rp20 juta/bulan dan menaikkan pengikut toko 35% dalam 6 bulan.",
          ],
        ],
      ],
      [
        "tip",
        'Hapus kata sifat yang tidak bisa dibuktikan, seperti "pekerja keras" atau "bertanggung jawab". Ganti dengan fakta yang menunjukkan sifat itu.',
      ],
    ],
  },
  {
    title: "Tugas Bukan Pencapaian",
    blocks: [
      'Baris pengalaman Sekar dulu berbunyi: "Bertanggung jawab mengelola media sosial perusahaan." Kalimat itu benar, tapi bisa ditulis oleh semua orang yang pernah memegang media sosial, termasuk yang hasilnya buruk.',
      "Rekruter tidak mencari orang yang pernah diberi tugas. Mereka mencari orang yang **menghasilkan sesuatu** dari tugas itu.",
      ["img", "tugas-pencapaian", "Tiga baris yang diubah."],
      ["h", "Rumus satu baris"],
      ["quote", "Kata kerja + apa yang berubah + angka + caranya"],
      ["tool", "tugas-jadi-pencapaian"],
      [
        "info",
        'Tidak punya angka? Cari yang mendekati: jumlah orang yang kamu layani, berapa lama waktu yang dihemat, berapa proyek yang selesai, atau peringkat penilaian. Perkiraan yang jujur ("sekitar 200 pelanggan per bulan") lebih baik daripada tanpa angka.',
      ],
      [
        "exercise",
        [
          "Tulis ulang semua baris pengalamanmu dengan rumus di atas.",
          "Pastikan setiap posisi punya minimal dua baris yang memuat angka.",
          "Urutkan baris dari pencapaian terkuat ke yang paling biasa.",
        ],
        "Lembar kerja: tulis ulang pengalaman",
      ],
    ],
  },
  {
    title: "Lolos Mesin, Dibaca Manusia",
    blocks: [
      "Banyak perusahaan memakai sistem pelacak lamaran (Applicant Tracking System, ATS) untuk menyimpan dan menyaring CV. Sistem ini membaca teks dari berkasmu. Kalau teksnya tidak terbaca, atau kata kuncinya tidak cocok, CV-mu bisa berada di urutan bawah sebelum dilihat manusia.",
      ["img", "ramah-ats", "Format yang aman untuk ATS."],
      ["quiz", LOLOS_MESIN],
      ["h", "Kata kunci"],
      "Kata kunci adalah keterampilan, alat, dan istilah yang tertulis di lowongan. Sekar menyalin lowongan yang dia incar, menandai istilah penting, lalu mencocokkannya dengan CV-nya.",
      ["img", "kata-kunci", "Lowongan dan CV berdampingan."],
      ["tool", "cek-kata-kunci-cv"],
      [
        "warn",
        "Jangan menulis keterampilan yang tidak kamu miliki hanya supaya lolos penyaringan. Wawancara akan menguji semua yang tertulis di CV.",
      ],
    ],
  },
  {
    title: "Satu CV Dasar, Banyak Versi",
    blocks: [
      "Kesalahan terbesar Sekar bukan isi CV-nya, tapi caranya mengirim: satu CV yang sama untuk 40 lowongan yang berbeda.",
      "Cara yang lebih efektif: siapkan **satu CV dasar** yang lengkap, lalu buat versi singkat yang disesuaikan untuk setiap lowongan. Penyesuaiannya tidak lama, cukup 15 sampai 20 menit:",
      [
        "ol",
        [
          "Ganti posisi yang dilamar di bagian atas.",
          "Sesuaikan ringkasan dengan dua kata kunci terpenting dari lowongan.",
          "Naikkan pencapaian yang paling relevan ke baris pertama setiap pengalaman.",
          "Hapus baris yang tidak relevan supaya tetap satu halaman.",
        ],
      ],
      "Dengan cara ini Sekar mengirim lebih sedikit lamaran, 12 dalam sebulan, tapi setiap lamaran lebih tepat sasaran. Hasilnya empat panggilan wawancara.",
      [
        "reflect",
        [
          "Lowongan mana yang benar-benar kamu inginkan, bukan sekadar bisa kamu lamar?",
          "Pencapaian mana yang paling ingin kamu ceritakan di wawancara nanti?",
        ],
      ],
    ],
  },
  {
    title: "Sebelum Menekan Kirim",
    blocks: [
      'CV yang bagus bisa gugur karena hal kecil: salah ketik di nama perusahaan, nomor HP yang tidak aktif, atau nama berkas "CV final revisi 3 (2).pdf".',
      ["img", "cek-sebelum-kirim", "Cek akhir."],
      [
        "tip",
        'Minta satu orang membaca CV-mu selama sepuluh detik, lalu tanyakan: "Aku ini siapa, dan apa keahlianku?" Kalau jawabannya belum tepat, sepertiga atas halamanmu perlu diperbaiki.',
      ],
      [
        "summary",
        [
          "Rekruter memberi waktu sangat singkat untuk pandangan pertama. Sepertiga atas halaman paling menentukan.",
          "Ganti kata sifat dengan fakta, dan tugas dengan pencapaian: kata kerja + apa yang berubah + angka + caranya.",
          "Pakai format satu kolom yang terbaca mesin, dan kata kunci yang sesuai lowongan.",
          "Satu CV dasar, disesuaikan 15–20 menit untuk setiap lowongan.",
          "Cek nama berkas, kontak, dan salah ketik sebelum mengirim.",
        ],
      ],
      ["h", "Cek ulang"],
      "Setelah memperbaiki CV-mu, kerjakan lagi kuis di Bab 1. Targetnya enam dari enam sebelum lamaran berikutnya dikirim.",
    ],
  },
];
