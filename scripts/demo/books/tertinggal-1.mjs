/**
 * "Umur 25 dan Merasa Tertinggal", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: 23–30 tahun yang melihat teman seangkatan menikah, naik jabatan, membeli rumah, lalu
 *   merasa hidupnya berjalan terlalu lambat dan tidak yakin arahnya sendiri.
 * - Gagasan inti: "tertinggal" mengandaikan satu lintasan dan satu garis finis. Itu tidak ada.
 *   Yang perlu diganti bukan hidupmu, tapi penggaris yang dipakai untuk mengukurnya: dari potongan
 *   terbaik hidup orang lain, ke dirimu setahun lalu dan ke nilai yang kamu pilih.
 * - Kerangka: perbandingan ke atas (Festinger 1954; Vogel dkk. 2014) → tidak ada satu jam untuk
 *   semua (Azoulay dkk. 2020; Hartshorne & Germine 2015) → tiga penggaris → nilai sebagai arah
 *   (Acceptance and Commitment Therapy) → langkah berikutnya, termasuk menjawab pertanyaan keluarga.
 * - Bentuk: Tara (25, staf administrasi kampus di Yogyakarta, diam-diam ingin pindah ke desain).
 *   Setiap bab dibuka dengan satu unggahan di berandanya, sumber rasa tertinggal itu sendiri.
 * - Gambar: peta pendakian dengan garis kontur. Setiap orang mendaki gunung yang berbeda.
 * - Interaktif: kuis rasa tertinggal, grafik usia puncak kemampuan, tool catatan setahun
 *   (penggaris diri) dan kompas nilai (arah dan langkah minggu ini).
 */
import { CEK_TERTINGGAL, PUNCAK_KEMAMPUAN } from "./tertinggal-interactive.mjs";

export const TERTINGGAL_1 = [
  {
    title: "Semua Orang Sudah Sampai, Kecuali Aku",
    blocks: [
      '**Rani Putri** membagikan foto: "Bismillah, babak baru. Terima kasih sudah datang, teman-teman!"',
      'Tara baru pulang dari pernikahan Rani, teman sekamarnya waktu kuliah. Di sana, obrolan meja bundar terdengar seperti laporan kemajuan: Dimas baru akad rumah, Sasha pindah ke Singapura, Bayu sudah jadi manajer. Ketika giliran Tara ditanya, dia menjawab pendek: "Masih di kampus, jadi admin."',
      "Malamnya, Tara menggulir foto-foto pernikahan itu sampai pukul satu. Umurnya 25. Rasanya semua orang sudah sampai di suatu tempat, kecuali dia.",
      ["h", "Perasaan yang sangat umum"],
      "Rasa tertinggal di pertengahan usia dua puluhan sangat umum, sampai punya sebutan sendiri: **quarter-life crisis**, krisis seperempat abad. Pilihan terasa banyak, tapi setiap pilihan juga terasa menentukan. Sementara itu, pencapaian orang lain terlihat setiap hari di layar.",
      "Buku ini tidak akan menyuruhmu berhenti membandingkan; itu hampir mustahil. Buku ini membantumu **mengganti penggaris** yang kamu pakai.",
      ["h", "Cek dulu"],
      ["quiz", CEK_TERTINGGAL],
      [
        "info",
        "Merasa tertinggal sesekali itu wajar. Kalau rasa ini disertai sedih hampir setiap hari, sulit tidur, atau merasa hidup tidak ada gunanya selama lebih dari dua minggu, bicarakan dengan psikolog atau datangi layanan kesehatan jiwa terdekat.",
      ],
    ],
  },
  {
    title: "Panggung Mereka, Belakang Panggungmu",
    blocks: [
      '**Dimas Pratama** membagikan foto: "Alhamdulillah, rumah pertama! Perjuangan lima tahun."',
      'Tara melihat kunci rumah itu dan langsung menghitung tabungannya sendiri. Dia tidak melihat "perjuangan lima tahun" di keterangannya: tidak ada foto lembur, tidak ada foto menolak ajakan liburan, tidak ada foto surat persetujuan kredit yang tiga kali ditolak.',
      ["img", "panggung-belakang", "Yang kamu lihat dan yang tidak."],
      ["h", "Kenapa membandingkan terasa begitu menyakitkan"],
      "Manusia memang menilai dirinya dengan membandingkan. Psikolog Leon Festinger menyebutnya **teori perbandingan sosial** (1954). Masalahnya, media sosial memberi kita bahan pembanding tanpa henti, dan hampir semuanya adalah momen terbaik orang lain.",
      [
        "fact",
        "Dalam serangkaian penelitian, orang yang paling sering memakai Facebook memiliki harga diri yang lebih rendah. Hubungan ini dijelaskan oleh lebih seringnya mereka melihat orang yang tampak lebih baik dari dirinya (perbandingan ke atas).",
        "Vogel, Rose, Roberts & Eckles, Psychology of Popular Media Culture, 2014",
      ],
      [
        "exercise",
        [
          "Gulir berandamu selama lima menit. Catat akun mana yang membuatmu merasa kecil setelah melihatnya.",
          "Bisukan akun-akun itu selama 30 hari. Tidak perlu berhenti berteman; cukup bisukan.",
          "Ikuti tiga akun yang membuatmu ingin belajar atau mencoba sesuatu, bukan yang membuatmu merasa kalah.",
        ],
        "Latihan: rapikan berandamu",
      ],
    ],
  },
  {
    title: "Tidak Ada Satu Jam untuk Semua Orang",
    blocks: [
      '**Bayu Saputra** memperbarui profilnya: "Manajer Operasional."',
      "Bayu seumuran dengan Tara. Di kepala Tara ada sebuah jadwal yang tidak pernah dia tulis tapi selalu dia percaya: lulus di 22, kerja tetap di 23, menikah di 26, rumah di 30. Menurut jadwal itu, dia sudah terlambat.",
      "Pertanyaannya: jadwal itu milik siapa?",
      ["img", "gunung-berbeda", "Tidak ada satu jalur untuk semua orang."],
      [
        "fact",
        "Dari lebih dari 2,7 juta pendiri usaha di Amerika Serikat, rata-rata usia pendiri perusahaan yang tumbuh paling cepat adalah 45 tahun. Pengalaman di bidang yang sama sangat meningkatkan peluang keberhasilan.",
        "Azoulay, Jones, Kim & Miranda, American Economic Review: Insights, 2020",
      ],
      "Bahkan otak kita tidak punya satu usia puncak. Beberapa kemampuan memuncak di usia belasan, beberapa di usia 40-an, dan beberapa terus tumbuh sampai usia 60-an.",
      ["chart", PUNCAK_KEMAMPUAN],
      "Usia 25 bukan garis finis. Untuk banyak hal yang penting, usia 25 bahkan belum garis tengah.",
      [
        "tip",
        'Saat pikiran "aku sudah terlambat" muncul, tambahkan satu kata: "aku sudah terlambat **menurut jadwal siapa**?"',
      ],
    ],
  },
  {
    title: "Ganti Penggarisnya",
    blocks: [
      '**Sasha Wulandari** check-in di Bandara Changi: "New chapter, Singapore!"',
      "Tara menutup aplikasi dan bertanya pada dirinya sendiri: kalau dibandingkan dengan Sasha, aku kalah. Tapi kenapa aku harus dibandingkan dengan Sasha? Hidup kami berbeda, keluarga kami berbeda, keinginan kami pun berbeda.",
      ["img", "tiga-penggaris", "Tiga penggaris."],
      "Penggaris orang lain selalu membuatmu kalah, karena selalu ada orang yang lebih dulu, lebih kaya, atau lebih terkenal. Penggaris itu juga mengukur hal yang tidak bisa kamu kendalikan.",
      "Dua penggaris lainnya lebih adil. **Dirimu setahun lalu** menunjukkan kemajuan nyata yang sering tidak terlihat. **Nilai yang kamu pilih** menunjukkan apakah kamu berjalan ke arah yang kamu anggap penting.",
      ["h", "Pakai penggaris pertama: dirimu setahun lalu"],
      "Tara mencobanya. Setahun lalu dia belum berani menyetir sendiri, belum pernah tinggal jauh dari orang tua, dan belum tahu bahwa dia lebih senang merancang poster acara kampus daripada mengurus berkas. Sekarang dia tahu ketiganya.",
      ["tool", "catatan-setahun"],
    ],
  },
  {
    title: "Gunungmu Sendiri",
    blocks: [
      '**Akun kursus desain** yang baru Tara ikuti: "Kelas Desain Grafis Dasar, angkatan Januari. Daftar sekarang."',
      "Tara sudah melihat iklan ini tiga kali. Setiap kali, satu pikiran muncul: umur 25 baru mulai belajar desain, apa tidak terlambat? Teman-temannya yang kuliah desain sudah bekerja di agensi.",
      "Pikiran itu memakai penggaris yang salah lagi. Pertanyaan yang lebih berguna: **apa yang penting bagiku?**",
      ["img", "kompas-nilai", "Nilai adalah arah, tujuan adalah tempat."],
      'Tujuan seperti "menikah di 27" atau "punya rumah di 30" bisa tercapai atau tidak, sebagian di luar kendalimu. **Nilai** berbeda. Nilai adalah arah, seperti "terus belajar", "menjaga keluarga", atau "berkarya". Arah bisa diikuti hari ini juga, dengan langkah sekecil apa pun, berapa pun umurmu.',
      ["tool", "kompas-nilai"],
      'Tara memilih "berkarya". Langkahnya minggu itu: mendaftar kelas desain, dan menawarkan diri membuat poster seminar di kampus.',
      [
        "reflect",
        [
          "Kalau tidak ada yang melihat dan tidak ada yang menilai, apa yang ingin kamu lakukan dengan lima tahun ke depan?",
          "Pencapaian mana yang sebenarnya kamu inginkan, dan mana yang kamu kejar karena orang lain sudah mendapatkannya?",
        ],
      ],
    ],
  },
  {
    title: "Langkah Berikutnya, Bukan Garis Finis",
    blocks: [
      '**Grup WhatsApp Keluarga Besar:** "Lebaran kumpul di rumah Eyang ya. Jangan lupa bawa calon!"',
      'Tara tertawa getir. Pertanyaan "kapan nikah?" dan "kerja di mana sekarang?" adalah alasan dia hampir tidak pulang tahun lalu. Tahun ini, dia memutuskan untuk menyiapkan jawabannya lebih dulu.',
      ["img", "jawaban-lebaran", "Jawaban yang sudah disiapkan."],
      "Pertanyaan keluarga sering bukan penghakiman, tapi cara mereka menunjukkan perhatian dengan bahasa yang mereka tahu. Kamu tidak perlu meyakinkan siapa pun bahwa hidupmu baik-baik saja. Cukup jawab dengan hangat dan singkat.",
      ["h", "Setiap bulan, cukup satu pertanyaan"],
      "Tara sekarang punya kebiasaan kecil di akhir bulan. Dia tidak membuka beranda teman-temannya, tapi membuka catatannya sendiri dan bertanya: **bulan ini, apakah aku melangkah ke arah yang kupilih?** Kalau ya, bulan itu berhasil, apa pun yang diunggah orang lain.",
      "Enam bulan kemudian, Tara masih admin di kampus. Tapi tiga poster seminar di kampusnya adalah buatannya, dan dosen desain memintanya membantu acara pameran. Dia belum sampai di mana-mana. Dia sedang mendaki gunungnya sendiri.",
      [
        "summary",
        [
          '"Tertinggal" mengandaikan satu lintasan dan satu garis finis. Keduanya tidak ada.',
          "Media sosial membuatmu membandingkan seluruh hidupmu dengan potongan terbaik hidup orang lain. Bisukan akun yang membuatmu merasa kecil.",
          "Tidak ada satu jam untuk semua orang: pendiri usaha yang paling sukses rata-rata berusia 45, dan kemampuan otak memuncak di usia yang berbeda-beda.",
          "Ganti penggaris orang lain dengan dirimu setahun lalu dan nilai yang kamu pilih.",
          "Nilai adalah arah yang bisa diikuti hari ini juga. Ubah menjadi satu langkah kecil setiap minggu.",
          "Siapkan jawaban singkat dan hangat untuk pertanyaan keluarga. Kamu tidak berutang penjelasan panjang.",
        ],
      ],
    ],
  },
];
