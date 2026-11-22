/**
 * "Dari Rebahan ke Lari 5K", 9 bab (diperdalam: persiapan, adaptasi tubuh dan cedera, makan-minum-tidur). Bentuk: buku program; tokoh Rio (34, pekerja kantoran yang
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
    title: "Sebelum Sesi Pertama: Sepatu, Jam, dan Udara",
    blocks: [
      '**Catatan Rio, hari 1:** "Hampir beli sepatu Rp1,8 juta karena katanya bagus untuk pemula. Untung istri bilang: coba dulu sebulan pakai sepatu yang ada."',
      "Sebelum sesi pertama, ada tiga keputusan kecil yang sering membuat pemula ragu: sepatu apa, jam berapa, dan di mana. Kabar baiknya, ketiganya tidak perlu mahal atau rumit.",
      ["h", "Sepatu: nyaman dulu, mahal belakangan"],
      "Tidak ada satu jenis sepatu yang terbukti mencegah cedera untuk semua orang. Para peneliti biomekanika lari kini lebih banyak menyarankan satu patokan sederhana: **pilih sepatu yang terasa nyaman di kakimu sendiri**.",
      [
        "ul",
        [
          "Sepatu olahraga yang sudah kamu punya biasanya cukup untuk empat minggu pertama.",
          "Coba jalan dan lari kecil di toko. Tumit tidak boleh terangkat, jari kaki tidak boleh tertekan ke ujung.",
          "Sisakan kira-kira satu ruas jari antara jari terpanjang dan ujung sepatu, karena kaki sedikit membengkak saat berlari.",
          "Jangan langsung lomba dengan sepatu baru. Pakai dulu di beberapa sesi latihan.",
        ],
      ],
      ["h", "Jam dan tempat"],
      "Di sebagian besar kota di Indonesia, udara siang hari panas dan lembap. Tubuh harus bekerja lebih keras untuk mendinginkan diri, sehingga lari terasa jauh lebih berat daripada seharusnya, dan pemula cepat menyimpulkan dirinya tidak kuat.",
      ["img", "cuaca-lari", "Kapan dan di mana berlari."],
      [
        "ul",
        [
          "**Rute datar dan teduh** lebih ramah daripada tanjakan dan jalan raya.",
          "**Putaran pendek** (lapangan, taman, jalan kompleks) memudahkan berhenti kapan saja dan dekat dengan air minum.",
          "**Kualitas udara** bisa dicek di aplikasi cuaca atau situs pemantau udara sebelum keluar. Kalau sedang buruk, ganti dengan jalan cepat di dalam ruangan.",
        ],
      ],
      [
        "tip",
        "Tidak punya waktu pagi? Sesi sore tetap jauh lebih baik daripada tidak sama sekali. Yang penting rutin, bukan sempurna.",
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
      [
        "info",
        "Pegal di betis dan paha selama satu-dua hari setelah latihan itu wajar untuk pemula. Nyeri tajam di satu titik, atau nyeri yang makin parah saat berlari, bukan hal wajar: istirahat dan periksakan.",
      ],
    ],
  },
  {
    title: "Tubuh yang Sedang Beradaptasi",
    blocks: [
      '**Catatan Rio, minggu 4:** "Napas sudah jauh lebih enak. Tapi lutut kanan terasa aneh setelah aku lari tambahan hari Minggu, di luar jadwal."',
      "Di minggu keempat, banyak pemula mengalami hal yang sama dengan Rio: napas membaik dengan cepat, lalu muncul godaan untuk menambah. Di sinilah cedera paling sering dimulai.",
      ["h", "Jantung lebih cepat siap daripada lutut"],
      "Jantung dan paru-paru beradaptasi dalam hitungan minggu. Otot menyusul. Tetapi tendon, ligamen, dan tulang butuh waktu lebih lama untuk menjadi kuat menahan benturan ribuan langkah. Akibatnya, ada masa ketika napasmu sudah bisa lebih jauh, tapi kakimu belum.",
      [
        "fact",
        "Tinjauan atas belasan penelitian menemukan pelari pemula mengalami rata-rata sekitar 17,8 cedera per 1.000 jam lari, lebih dari dua kali lipat pelari rekreasi yang sudah terbiasa (7,7).",
        "Videbæk dkk., Sports Medicine, 2015",
      ],
      "Angka itu tidak dimaksudkan untuk menakut-nakuti. Pelari pemula lebih rentan justru karena tubuhnya sedang berubah. Karena itu program buku ini sengaja naik pelan.",
      ["img", "naik-pelan", "Naik pelan, cederanya lebih jarang."],
      [
        "fact",
        "Dalam penelitian satu tahun terhadap pelari pemula, mereka yang menaikkan jarak mingguan lebih dari 30% dalam dua minggu lebih sering mengalami cedera yang berkaitan dengan jarak, seperti nyeri di sekitar tempurung lutut dan tulang kering.",
        "Nielsen dkk., Journal of Orthopaedic & Sports Physical Therapy, 2014",
      ],
      ["h", "Pegal yang wajar dan nyeri yang perlu didengar"],
      [
        "table",
        [
          ["Wajar", "Perlu istirahat dan diperhatikan"],
          ["Pegal merata di betis atau paha", "Nyeri tajam di satu titik"],
          [
            "Paling terasa sehari atau dua hari setelah latihan",
            "Makin parah saat berlari, atau muncul sejak langkah pertama",
          ],
          ["Membaik setelah pemanasan", "Membuatmu mengubah cara melangkah atau pincang"],
          ["Hilang dalam 2–3 hari", "Bertahan lebih dari seminggu"],
        ],
      ],
      "Rio mengikuti tabel itu. Nyeri lututnya tajam di satu titik, jadi dia istirahat tiga hari, lalu kembali ke jadwal tanpa sesi tambahan. Lututnya pulih, dan dia tidak lagi menambah sesi di luar program.",
      ["h", "Hari istirahat adalah bagian dari latihan"],
      "Di hari tanpa lari, tubuh memperbaiki dan memperkuat bagian yang tadi bekerja keras. Jalan santai, peregangan ringan, atau bersepeda pelan boleh. Lari tambahan sebaiknya tidak.",
      [
        "exercise",
        [
          "Setelah setiap sesi, beri nilai 0–10 untuk rasa tidak nyaman di kaki, dan tulis di catatan ponselmu.",
          "Kalau nilainya naik dua sesi berturut-turut, atau ada nyeri tajam di satu titik, ulangi minggu itu atau istirahat.",
          "Kalau dalam seminggu tidak membaik, periksakan ke dokter atau fisioterapis.",
        ],
        "Latihan: catatan rasa kaki",
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
    title: "Bahan Bakar: Makan, Minum, dan Tidur",
    blocks: [
      '**Catatan Rio, minggu 7:** "Berat badan turun dua kilo. Lebih sedikit dari yang aku bayangkan. Tapi celana lebih longgar dan tidur lebih nyenyak."',
      "Pemula sering bertanya: perlu suplemen apa? Minum apa? Harus diet? Untuk program delapan minggu seperti ini, jawabannya jauh lebih sederhana daripada yang dijual di iklan.",
      ["h", "Makan sebelum dan sesudah"],
      [
        "ul",
        [
          "**Sesi pagi 30–40 menit:** banyak orang nyaman berlari sebelum sarapan, atau setelah camilan kecil seperti pisang. Coba keduanya, pilih yang perutmu suka.",
          "**Sesi sore:** beri jarak sekitar dua jam dari makan besar.",
          "**Setelahnya:** makan seperti biasa. Lari 30 menit tidak membutuhkan minuman atau makanan khusus.",
        ],
      ],
      ["h", "Minum secukupnya"],
      "Untuk lari di bawah satu jam, cukup minum air saat haus, sebelum dan sesudah lari. Di cuaca panas, bawa botol kecil atau pilih rute yang melewati tempat minum. Minuman olahraga dan minuman energi tidak dibutuhkan untuk sesi sependek ini, dan sering mengandung banyak gula.",
      ["h", "Berat badan: harapan yang wajar"],
      "Kebutuhan energi berlari kira-kira 1 kilokalori per kilogram berat badan per kilometer. Untuk Rio yang beratnya 78 kilogram, lima kilometer menghabiskan sekitar 390 kilokalori, kira-kira setara satu porsi nasi goreng.",
      'Artinya, lari sangat baik untuk jantung, suasana hati, dan tidur, tetapi berat badan hanya akan turun berarti kalau pola makan ikut dijaga. Kalau penurunan berat adalah tujuanmu, lihat buku "Kurangi Gula Tanpa Menderita".',
      ["h", "Tidur adalah latihan yang tidak terlihat"],
      "Tubuh memperbaiki otot dan tendon terutama saat tidur. Jadwal lari pukul 05.30 hanya masuk akal kalau tidurnya juga dimajukan. Rio memindahkan kebiasaan menonton video sebelum tidur ke akhir pekan, dan tidur pukul 22.00 di malam sebelum hari lari.",
      [
        "reflect",
        [
          "Apa yang paling sering membuatmu tidur larut di malam sebelum hari lari?",
          "Satu kebiasaan malam apa yang bisa kamu geser supaya pagi terasa lebih ringan?",
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
