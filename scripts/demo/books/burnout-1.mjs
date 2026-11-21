/**
 * "Burnout Bukan Lemah", 6 bab. Bentuk: satu tokoh, Nadia (29, pemimpin tim layanan pelanggan
 * di perusahaan rintisan), diikuti lewat catatan energinya. Nada lembut dan tidak menyalahkan.
 * Edukasi umum; burnout berat, depresi, atau pikiran menyakiti diri perlu bantuan profesional.
 */
import { POLA_PULIH } from "./burnout-interactive.mjs";

export const BURNOUT_1 = [
  {
    title: "Ketika Libur Tidak Lagi Memulihkan",
    blocks: [
      "Nadia baru pulang dari cuti tiga hari di Bandung. Senin pagi, saat membuka laptop, dadanya langsung terasa berat. Bukan karena ada masalah baru. Hanya karena harus membuka laptop.",
      "Dulu dia menyukai pekerjaannya. Dia yang paling semangat membalas pelanggan yang marah, yang paling cepat membuat panduan untuk anggota tim baru. Sekarang dia hanya ingin hari cepat berakhir, dan merasa bersalah karena berpikir begitu.",
      '"Mungkin aku memang tidak sekuat yang lain," pikirnya.',
      ["h", "Bukan soal kuat atau lemah"],
      "Yang dialami Nadia bukan kemalasan dan bukan kelemahan karakter. Kelelahan seperti ini punya nama, dan punya penjelasan.",
      ["img", "tiga-tanda", "Tiga tanda burnout."],
      [
        "fact",
        "WHO memasukkan burn-out ke dalam ICD-11 sebagai fenomena pekerjaan, bukan kondisi medis: sindrom akibat stres kerja kronis yang tidak berhasil dikelola, ditandai kelelahan, jarak mental atau sinisme terhadap pekerjaan, dan menurunnya rasa mampu dalam bekerja.",
        "World Health Organization, ICD-11 (2019)",
      ],
      "Kata kuncinya: **stres kerja kronis yang tidak terkelola**. Burnout tumbuh dari situasi yang berlangsung lama, bukan dari satu minggu yang berat. Karena itu, jalan keluarnya juga bukan sekadar satu kali liburan.",
      [
        "warn",
        "Burnout bisa mirip dengan depresi atau gangguan kecemasan, dan keduanya bisa terjadi bersamaan. Kalau kamu merasa sedih hampir setiap hari, kehilangan minat pada hampir semua hal, atau punya pikiran menyakiti diri, segera hubungi tenaga kesehatan atau layanan kesehatan jiwa terdekat.",
      ],
    ],
  },
  {
    title: "Mengenali Tanda Lebih Awal",
    blocks: [
      "Nadia mulai mencatat energinya setiap malam dengan satu angka: 0 sampai 100. Setelah seminggu, polanya terlihat jelas.",
      ["img", "baterai-minggu", "Minggu Nadia dalam baterai."],
      "Akhir pekan tidak pernah cukup untuk mengisi ulang. Setiap Senin dimulai dari angka yang lebih rendah dari Senin sebelumnya. Ini ciri khas burnout: bukan satu hari yang berat, tapi **pemulihan yang tidak pernah mengejar pengurasan**.",
      ["h", "Cek dirimu"],
      ["tool", "cek-tiga-tanda-burnout"],
      ["h", "Tanda kecil yang sering terlewat"],
      [
        "ul",
        [
          "Mudah tersinggung oleh hal kecil, terutama di rumah.",
          "Menunda pekerjaan yang dulu mudah dikerjakan.",
          "Merasa mati rasa saat mendapat pujian atau kabar baik di kantor.",
          "Sakit kepala, sakit perut, atau mudah sakit tanpa penyebab jelas.",
          "Butuh kopi, gula, atau gulir layar yang semakin banyak hanya untuk bertahan.",
        ],
      ],
      [
        "exercise",
        [
          "Setiap malam selama tujuh hari, tulis energimu dalam angka 0–100.",
          "Tambahkan satu kalimat: apa yang paling menguras hari ini?",
          "Di hari kedelapan, lingkari tiga penguras yang paling sering muncul.",
        ],
        "Latihan: catatan energi tujuh hari",
      ],
    ],
  },
  {
    title: "Kebocoran yang Tidak Terasa",
    blocks: [
      'Nadia merasa dia sudah beristirahat: pulang jam enam, tidur tujuh jam. Tapi catatannya menunjukkan hal lain. Dia membalas grup kerja saat makan malam. Dia membuka dasbor keluhan pelanggan sebelum tidur "sebentar saja". Akhir pekannya diisi mengecek pesan setiap jam.',
      "Badannya libur. Pikirannya tidak.",
      ["h", "Kebocoran yang paling umum"],
      [
        "table",
        [
          ["Kebocoran", "Kenapa menguras"],
          [
            "Notifikasi kerja di ponsel pribadi",
            "Pikiran terus siaga, tidak pernah benar-benar selesai",
          ],
          ["Makan siang di depan layar", "Hilang satu-satunya jeda di tengah hari"],
          ["Menerima semua permintaan", "Beban bertambah tanpa ada yang dikurangi"],
          [
            "Merasa bersalah saat istirahat",
            "Istirahat tidak memulihkan karena dihabiskan dengan cemas",
          ],
          ["Tidak ada batas jam kerja", "Hari kerja melebar sampai malam"],
        ],
      ],
      ["h", "Seberapa sering kamu benar-benar pulih?"],
      ["quiz", POLA_PULIH],
    ],
  },
  {
    title: "Empat Cara Mengisi Ulang",
    blocks: [
      'Saran yang paling sering didengar Nadia adalah "istirahat yang cukup". Saran itu benar, tapi terlalu umum. Penelitian tentang pemulihan dari kerja menunjukkan bahwa istirahat punya beberapa bentuk, dan masing-masing mengisi bagian yang berbeda.',
      ["img", "empat-pemulihan", "Empat jenis pemulihan."],
      [
        "fact",
        "Penelitian tentang pemulihan setelah jam kerja menemukan empat pengalaman yang membantu memulihkan energi: melepaskan diri secara mental dari pekerjaan, relaksasi, pengalaman belajar atau menguasai hal baru, dan rasa memegang kendali atas waktu luang.",
        "Sonnentag & Fritz, Journal of Occupational Health Psychology, 2007",
      ],
      ["h", "Yang paling sulit: melepaskan diri"],
      'Dari keempatnya, Nadia paling kesulitan dengan yang pertama. Jadi dia membuat aturan kecil: notifikasi kerja mati pukul 19.00, aplikasi kerja dipindah ke folder kedua di ponsel, dan satu kalimat penutup hari ditulis di catatan sebelum menutup laptop: "Besok mulai dari…". Kalimat itu membantu pikirannya berhenti memutar pekerjaan.',
      [
        "tip",
        "Pemulihan tidak harus lama. Dua puluh menit berjalan tanpa ponsel setelah pulang kerja sering lebih memulihkan daripada dua jam rebahan sambil membuka media sosial.",
      ],
    ],
  },
  {
    title: "Bukan Hanya Urusan Dirimu",
    blocks: [
      "Setelah sebulan memperbaiki pemulihan, energi Nadia membaik, tapi tidak sepenuhnya. Ada hal yang tidak bisa diselesaikan dengan tidur lebih awal: timnya kekurangan dua orang sejak empat bulan lalu, dan target bulanan tetap sama.",
      "Burnout bukan hanya soal cara seseorang mengurus dirinya. Lingkungan kerja punya peran besar.",
      ["img", "enam-area", "Enam area yang memengaruhi burnout."],
      ["h", "Berbicara dengan atasan"],
      "Nadia menyiapkan percakapan seperti menyiapkan laporan: data jumlah tiket per orang dalam tiga bulan terakhir, dua usulan konkret, dan satu pertanyaan.",
      [
        "quote",
        "Sejak tim berkurang dua orang, beban per orang naik sekitar 40%, dan waktu respons kita turun. Saya mengusulkan dua hal: menunda proyek dokumentasi sampai ada tambahan orang, dan menerapkan jam tanpa rapat setiap Rabu pagi. Mana yang menurut Mas paling mungkin dijalankan bulan ini?",
      ],
      "Tidak semua usulan diterima. Proyek dokumentasi ditunda, jam tanpa rapat belum. Tapi untuk pertama kalinya beban timnya terlihat oleh orang yang bisa mengubahnya.",
      [
        "info",
        "Kalau beban kerja tetap tidak masuk akal setelah dibicarakan, dan kesehatanmu terus menurun, mencari pekerjaan lain bukan kegagalan. Itu bagian dari menjaga diri.",
      ],
    ],
  },
  {
    title: "Pulih Itu Tidak Lurus",
    blocks: [
      "Tiga bulan kemudian, catatan energi Nadia lebih stabil. Ada minggu yang buruk, terutama menjelang peluncuran produk. Tapi Senin tidak lagi dimulai dari angka 30.",
      "Pemulihan dari burnout jarang berjalan lurus. Ada hari baik, ada hari yang terasa mundur. Yang penting adalah arah dalam beberapa minggu, bukan angka satu hari.",
      ["img", "rencana-14-hari", "Dua minggu pertama."],
      [
        "reflect",
        [
          "Kalau sahabatmu mengalami apa yang kamu alami sekarang, apa yang akan kamu katakan kepadanya?",
          "Satu hal apa yang bisa kamu lepaskan minggu ini tanpa akibat yang benar-benar buruk?",
        ],
      ],
      [
        "summary",
        [
          "Burnout adalah fenomena pekerjaan akibat stres kronis yang tidak terkelola, bukan kelemahan.",
          "Tiga tandanya: terkuras, menjauh dari pekerjaan, dan merasa tidak berdaya.",
          "Catat energimu untuk melihat pola, lalu tutup kebocoran terbesar lebih dulu.",
          "Pulihkan diri dengan empat cara: lepas, rileks, belajar hal baru, dan memegang kendali waktu.",
          "Lingkungan kerja ikut berperan: bicarakan beban dengan data dan usulan.",
        ],
      ],
      [
        "warn",
        "Kalau lelahmu disertai sedih yang dalam, sulit tidur berminggu-minggu, atau pikiran menyakiti diri, jangan menunggu. Hubungi psikolog, puskesmas, atau layanan kesehatan jiwa terdekat.",
      ],
    ],
  },
];
