/**
 * "Burnout Bukan Lemah", 9 bab (diperdalam: tuntutan dan bekal kerja, malam dan tidur, cuti/jeda/pindah). Bentuk: satu tokoh, Nadia (29, pemimpin tim layanan pelanggan
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
    title: "Tuntutan Naik, Bekal Menipis",
    blocks: [
      "Seminggu mencatat energi membuat Nadia bertanya: kenapa sekarang? Dua tahun lalu pekerjaannya sama beratnya, tapi dia tidak pernah merasa seperti ini.",
      "Jawabannya bukan pada beratnya pekerjaan saja, tapi pada **keseimbangan** antara apa yang dituntut dan apa yang tersedia untuk menghadapinya.",
      ["img", "tuntutan-bekal", "Tuntutan naik, bekal menipis."],
      [
        "fact",
        "Model tuntutan-bekal kerja (Job Demands–Resources) menjelaskan bahwa tuntutan yang tinggi dan terus-menerus menguras energi, sementara bekal kerja seperti dukungan rekan, umpan balik, dan kendali atas pekerjaan menjaga semangat. Beberapa penelitian menemukan bekal kerja bisa meredam pengaruh tuntutan yang tinggi terhadap burnout.",
        "Bakker & Demerouti, Journal of Managerial Psychology, 2007; Xanthopoulou dkk., 2007",
      ],
      "Dua tahun lalu, tuntutan Nadia sama tingginya. Bedanya, saat itu ada atasan yang rutin bertanya kabar, rekan yang bisa diajak bertukar shift, dan kebebasan mengatur jam istirahat. Ketika atasan itu pindah dan dua rekan keluar, tuntutannya tetap, tetapi bekalnya hilang.",
      ["h", "Petakan milikmu"],
      [
        "table",
        [
          ["Tuntutan yang sering menguras", "Bekal yang sering melindungi"],
          ["Beban terlalu banyak untuk waktunya", "Kendali atas cara dan waktu kerja"],
          ["Tuntutan emosional (pelanggan, pasien, murid)", "Dukungan rekan dan atasan"],
          ["Peran yang tidak jelas atau berubah-ubah", "Umpan balik yang jelas"],
          ["Selalu bisa dihubungi", "Pengakuan atas hasil kerja"],
          ["Konflik dengan rekan atau atasan", "Kesempatan belajar dan berkembang"],
        ],
      ],
      [
        "exercise",
        [
          "Tulis tiga tuntutan terberat di pekerjaanmu saat ini.",
          "Tulis tiga bekal yang dulu ada dan sekarang berkurang, atau memang belum pernah ada.",
          "Lingkari satu tuntutan yang bisa dikurangi dan satu bekal yang bisa diminta. Keduanya akan berguna di Bab 7.",
        ],
        "Lembar kerja: timbangan milikmu",
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
    title: "Malam yang Tidak Lagi Menolong",
    blocks: [
      "Nadia tidur pukul sebelas, tapi baru benar-benar terlelap pukul satu. Di kepalanya, percakapan dengan pelanggan yang marah tadi siang diputar ulang. Pagi harinya dia bangun lebih lelah daripada saat berangkat tidur.",
      "Kelelahan karena burnout sering membuat tidur kurang memulihkan, dan tidur yang kurang membuat hari berikutnya terasa lebih berat. Lingkaran ini perlu diputus dari dua sisi: **cara menutup hari kerja** dan **cara masuk ke malam**.",
      ["h", "Jeda pindah: dari kantor ke rumah"],
      "Dulu, perjalanan pulang memberi jeda alami. Sekarang, banyak orang membawa pulang pekerjaan di saku. Jeda perlu dibuat sendiri:",
      [
        "ol",
        [
          "**Satu daftar penutup.** Lima menit sebelum pulang, tulis tiga hal yang belum selesai dan langkah pertamanya besok. Kepala tidak perlu lagi menjaganya semalaman.",
          '**Satu kalimat penutup.** Ucapkan dalam hati: "Hari kerja selesai." Terdengar sepele, tapi menandai batas.',
          "**Satu kegiatan pindah.** Mandi, jalan kaki sepuluh menit, atau memasak, sebelum membuka ponsel lagi.",
        ],
      ],
      ["h", "Masuk ke malam"],
      [
        "ul",
        [
          "Tidur dan bangun di jam yang hampir sama, termasuk akhir pekan. Kebanyakan orang dewasa butuh tujuh jam atau lebih.",
          "Kalau pikiran berputar di tempat tidur lebih dari dua puluh menit, bangun sebentar, tulis isinya di kertas, lalu kembali.",
          "Kopi terakhir sebelum pukul dua siang.",
          "Ponsel kerja tidak ikut ke kamar.",
        ],
      ],
      [
        "info",
        "Sulit tidur yang berlangsung berminggu-minggu meskipun kebiasaan sudah diperbaiki perlu diperiksakan ke dokter. Bisa jadi ada hal lain di baliknya, termasuk kecemasan atau depresi.",
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
    title: "Cuti, Jeda, atau Pindah?",
    blocks: [
      "Di bulan kedua, Nadia bertanya pada dirinya sendiri: apakah aku perlu cuti panjang? Atau sudah saatnya mencari pekerjaan lain? Pertanyaan itu menakutkan, jadi dia menundanya. Padahal pertanyaannya bisa dijawab dengan lebih tenang.",
      ["h", "Tiga pilihan, tiga keadaan"],
      [
        "table",
        [
          ["Pilihan", "Cocok kalau", "Yang perlu disiapkan"],
          [
            "Cuti pendek terencana",
            "Kelelahan masih bisa pulih, beban kerja sedang dibenahi",
            "Cuti yang benar-benar putus: serah terima, pesan otomatis, ponsel kerja mati",
          ],
          [
            "Jeda lebih panjang",
            "Dokter atau psikolog menyarankan istirahat, atau gejala sudah mengganggu kesehatan",
            "Surat keterangan dari tenaga kesehatan dan pembicaraan dengan HR",
          ],
          [
            "Pindah pekerjaan atau peran",
            "Tuntutan tetap tidak masuk akal setelah dibicarakan, dan bekal tidak akan kembali",
            "Tabungan beberapa bulan, rencana pencarian, dan alasan yang jelas untuk diri sendiri",
          ],
        ],
      ],
      [
        "fact",
        "Pekerja yang sudah bekerja 12 bulan berturut-turut berhak atas cuti tahunan paling sedikit 12 hari kerja. Pelaksanaannya diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama.",
        "UU No. 13 Tahun 2003 tentang Ketenagakerjaan Pasal 79, sebagaimana diubah UU Cipta Kerja",
      ],
      "Cuti yang tidak pernah diambil bukan tanda kesetiaan. Cuti adalah hak yang dibuat justru untuk mencegah kelelahan yang menumpuk.",
      ["h", "Saat memutuskan pindah"],
      "Pindah pekerjaan bisa menjadi keputusan yang sangat sehat. Tapi pindah dalam keadaan terkuras sering membawa pola lama ke tempat baru. Sebelum pindah, tanyakan:",
      [
        "ul",
        [
          "Tuntutan mana yang akan berbeda di tempat baru, dan bagaimana aku tahu?",
          "Bekal apa yang kucari, dan apakah aku menanyakannya saat wawancara?",
          "Kebiasaan pemulihan mana yang akan kubawa, apa pun tempat kerjanya?",
        ],
      ],
      [
        "warn",
        "Kalau lelahmu disertai sedih yang dalam hampir setiap hari, kehilangan minat pada hampir semua hal, atau pikiran menyakiti diri, jangan menunggu keputusan apa pun. Hubungi psikolog, puskesmas, atau layanan kesehatan jiwa terdekat sekarang.",
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
