/**
 * "Seni Menabung Tanpa Tersiksa", 8 bab. Bentuk: tanya-jawab. Setiap bab dibuka dengan surat
 * pembaca (nama samaran, kisah gabungan), lalu dijawab. Benang merahnya metafora pipa: tabungan
 * yang baik mengalir sendiri, bukan dipompa dengan kemauan. Berbeda dari "Dana Darurat dari Nol"
 * (satu tokoh, satu bantalan) dan "Gajian Kok Cepat Habis?" (anggaran): buku ini tentang sistem
 * menabung untuk tujuan apa pun. Angka contoh adalah ilustrasi. Edukasi umum, bukan rekomendasi
 * produk tertentu.
 */
import { BOLEH_DIPAKAI, GAYA_MENABUNG, SMART_BARS, UANG_KAGET } from "./menabung-interactive.mjs";

export const MENABUNG_1 = [
  {
    title: "Kenapa Menabung Terasa Seperti Diet",
    blocks: [
      [
        "quote",
        "Setiap awal bulan aku janji menabung Rp1 juta. Setiap tanggal 20 aku sadar uangnya tinggal Rp300 ribu, dan aku belum menabung apa-apa. Sudah dua tahun begini. Apa aku memang tidak bisa menabung?",
        "Rara, 26, staf admin di Surabaya",
      ],
      "Rara, kamu bisa menabung. Yang belum kamu punya adalah cara yang tidak menuntutmu menang melawan dirimu sendiri setiap hari.",
      'Coba perhatikan polanya. Di awal bulan, saldo terlihat besar dan niat terasa kuat. Kamu berencana menabung "nanti, setelah kebutuhan terpenuhi". Lalu datang ongkos, makan siang, kado teman, diskon tengah bulan, dan langganan yang lupa dimatikan. Setiap pengeluaran terasa masuk akal. Menabung selalu bisa ditunda besok. Sampai tanggal 20, besok itu tidak pernah datang.',
      "Ini mirip diet. Hampir semua orang tahu makan sayur lebih baik daripada gorengan. Masalahnya, pilihan itu harus dimenangkan berkali-kali sehari, sementara godaannya selalu ada di depan mata. Menabung dari sisa bekerja dengan cara yang sama: kamu harus menolak puluhan pengeluaran kecil selama sebulan supaya ada yang tersisa di akhir.",
      ["h", "Otak kita memang lebih sayang pada hari ini"],
      "Para ekonom perilaku menyebutnya **bias masa kini** (present bias): kita menilai kesenangan sekarang jauh lebih berat daripada manfaat yang sama di masa depan. Es kopi hari ini terasa nyata. Uang muka rumah lima tahun lagi terasa seperti milik orang lain.",
      [
        "fact",
        "Dalam sebuah eksperimen, peserta yang melihat foto wajah mereka sendiri yang dibuat tampak tua menyisihkan lebih banyak uang untuk pensiun dibanding peserta yang melihat wajah mereka saat ini. Masa depan yang terasa dekat lebih mudah dibela.",
        "Hershfield dkk. (2011), Journal of Marketing Research",
      ],
      "Kabar baiknya: kalau kemauan tidak bisa diandalkan, kita tidak perlu mengandalkannya. Kita bisa membuat **sistem** yang memutuskan sekali, lalu berjalan sendiri ratusan kali.",
      ["h", "Pipa, bukan pompa"],
      "Bayangkan dua cara mengisi tangki air di atap rumah. Cara pertama: memompa dengan tangan setiap kali ingat, kalau sedang bertenaga. Cara kedua: memasang pipa dari sumber air, lalu membiarkannya mengalir. Cara pertama melelahkan dan sering lupa. Cara kedua membosankan, dan justru karena membosankan, ia bekerja.",
      ["img", "dua-pipa", "Menabung dari sisa dibanding menabung di depan."],
      "Seluruh buku ini membahas cara memasang pipa itu: kapan uang mengalir (Bab 2), ke tangki mana (Bab 3), seberapa besar mulainya (Bab 4), bagaimana pipanya membesar (Bab 5), cara menampung hujan yang datang tiba-tiba (Bab 6), dan apa yang terjadi saat keran harus dibuka (Bab 7).",
      ["h", "Seberapa otomatis caramu sekarang?"],
      ["quiz", GAYA_MENABUNG],
      [
        "reflect",
        [
          "Kapan terakhir kali kamu berhasil menabung? Apa yang berbeda di bulan itu?",
          'Pengeluaran kecil apa yang paling sering "menang" melawan niat menabungmu?',
        ],
      ],
    ],
  },
  {
    title: "Bayar Dirimu Duluan",
    blocks: [
      [
        "quote",
        "Aku sudah coba catat pengeluaran. Hasilnya aku jadi tahu ke mana uangku pergi, tapi tetap tidak ada sisa. Apa langkah berikutnya?",
        "Dimas, 29, teknisi jaringan di Bekasi",
      ],
      "Dimas, mencatat itu langkah bagus untuk memahami keuangan. Tapi mencatat tidak memindahkan uang. Langkah berikutnya adalah membalik urutan: **tabungan keluar lebih dulu, belanja dari sisanya.**",
      [
        "table",
        [
          ["Urutan lama", "Urutan baru"],
          ["Gaji masuk", "Gaji masuk"],
          ["Bayar kebutuhan, belanja, jajan", "Tabungan pindah otomatis"],
          ["Sisa (kalau ada) ditabung", "Bayar kebutuhan dan belanja dari sisanya"],
          ["Akhir bulan: sering nol", "Akhir bulan: tabungan sudah aman sejak tanggal 1"],
        ],
      ],
      'Kedengarannya sederhana, dan memang sederhana. Yang membuatnya kuat adalah satu kata: **otomatis**. Kalau perpindahan uangnya masih harus kamu lakukan sendiri, kamu kembali ke cara pompa. Kamu harus ingat, harus mau, dan harus menang melawan alasan "bulan ini pengecualian".',
      ["h", "Kekuatan pilihan bawaan"],
      [
        "fact",
        "Di sebuah perusahaan di Amerika Serikat, karyawan baru yang otomatis didaftarkan ke program tabungan pensiun (boleh keluar kapan saja) jauh lebih banyak yang ikut menabung: tingkat kepesertaan naik dari sekitar 37% menjadi 86%. Yang berubah hanya pilihan bawaannya.",
        "Madrian & Shea (2001), Quarterly Journal of Economics",
      ],
      "Orang-orang itu tidak tiba-tiba menjadi lebih disiplin. Mereka hanya tidak perlu melakukan apa pun untuk menabung, dan harus melakukan sesuatu untuk berhenti. Kemalasan yang sama, yang biasanya menghalangi kita menabung, sekarang bekerja untuk kita.",
      ["h", "Memasang pipa pertamamu"],
      "Hampir semua bank di Indonesia, termasuk bank digital, punya fitur transfer terjadwal atau autodebet ke rekening lain. Namanya berbeda-beda: transfer berkala, auto-save, setoran rutin, atau kantong otomatis. Fungsinya sama.",
      ["img", "jam-gajian", "Sehari setelah gajian, pipa otomatis bekerja lebih dulu."],
      [
        "exercise",
        [
          "Lihat tanggal gajianmu. Atur transfer otomatis **satu hari setelahnya**, untuk berjaga-jaga kalau gaji terlambat beberapa jam.",
          "Tujuannya rekening lain, bukan rekening yang kartunya kamu bawa setiap hari (lebih lanjut di Bab 3).",
          "Isi nominal yang tidak terasa menyakitkan. Kalau ragu, pakai angka kecil dulu. Bab 4 membahas cara memilihnya.",
          "Matikan notifikasi promosi dari rekening tabungan itu, supaya kamu tidak tergoda membukanya.",
        ],
        "Lima belas menit, sekali saja:",
      ],
      [
        "tip",
        "Kalau gajimu dibayar mingguan atau tidak tentu, pasang aturannya di setiap uang masuk: begitu ada transfer masuk, sekian persen langsung dipindah. Beberapa aplikasi bisa melakukannya otomatis; kalau tidak, jadikan itu hal pertama yang kamu lakukan sebelum membalas pesan pembeli.",
      ],
      'Dimas memasang transfer Rp500.000 setiap tanggal 26, sehari setelah gajian. Bulan pertama, dia sempat merasa "kok sisa gajinya lebih sedikit". Bulan ketiga, dia lupa bahwa transfer itu ada. Itu tanda pipanya sudah bekerja.',
    ],
  },
  {
    title: "Satu Tangki, Satu Tujuan",
    blocks: [
      [
        "quote",
        "Aku sebenarnya punya tabungan, tapi selalu terpakai. Bulan lalu untuk servis motor, bulan sebelumnya untuk kondangan, sebelumnya lagi untuk sepatu. Rasanya tidak pernah bertambah.",
        "Tika, 24, guru honorer di Klaten",
      ],
      "Tika, masalahnya mungkin bukan jumlahnya, tapi **semua uangmu tinggal di satu tangki yang sama**. Kalau tabungan untuk liburan, servis motor, dan dana darurat tercampur, setiap pengeluaran terasa sah, karena memang ada uangnya.",
      ["h", "Uang yang diberi nama lebih sulit dipakai sembarangan"],
      'Ekonom Richard Thaler, peraih Nobel Ekonomi 2017, menjelaskan bahwa kita punya **akuntansi mental**: kita memperlakukan uang secara berbeda tergantung "label" di kepala kita. Secara logika, Rp1 juta tetaplah Rp1 juta. Secara perasaan, Rp1 juta berlabel "biaya sekolah Adik" jauh lebih sulit dipakai untuk diskon daripada Rp1 juta tanpa nama.',
      [
        "fact",
        "Dalam penelitian lapangan dengan buruh harian di India, keluarga yang menyimpan tabungannya dalam amplop terpisah menabung lebih banyak daripada yang menyimpannya dalam satu amplop. Hasilnya lebih baik lagi ketika amplopnya diberi foto anak mereka.",
        "Soman & Cheema (2011), Journal of Marketing Research",
      ],
      'Kita bisa memakai kecenderungan ini dengan sengaja. Bukan lagi "rekening tabungan", tapi beberapa tangki kecil, masing-masing dengan satu tujuan.',
      ["img", "tangki-tujuan", "Tiga tangki dengan nama, target, dan tanggal."],
      ["h", "Cara memberi nama yang bekerja"],
      [
        "ul",
        [
          '**Spesifik.** "Laptop kerja" lebih kuat daripada "Elektronik".',
          "**Ada angka.** Target Rp7.000.000 membuatmu bisa melihat kemajuan.",
          '**Ada tanggal.** "Juni 2027" memberi alasan untuk setoran rutin.',
          '**Boleh personal.** "Kado umrah Bapak" atau "Kuliah S2 Tika" mengingatkanmu pada orang dan alasan di baliknya.',
        ],
      ],
      "Banyak bank digital menyediakan fitur kantong atau rekening bayangan yang bisa diberi nama, tanpa biaya membuka rekening baru. Kalau bankmu tidak punya, dua rekening sudah cukup: satu untuk harian, satu untuk tujuan (lalu catat pembagiannya di lembar sederhana).",
      ["h", "Jangan sampai terlalu mudah dijangkau"],
      'Tangki yang baik punya sedikit jarak. Tidak perlu sulit sekali, cukup ada satu langkah ekstra sebelum uangnya bisa dipakai: kartu tidak dibawa, aplikasinya tidak di layar depan ponsel, atau rekeningnya di bank lain. Jarak kecil itu memberi waktu bagi kepala dingin untuk bertanya, "Ini benar-benar untuk tujuannya?"',
      [
        "warn",
        "Jangan pernah mempercayakan tabungan tujuan kepada pihak yang menjanjikan imbal hasil tetap yang tinggi dan pasti. Simpan di lembaga yang diawasi OJK. Untuk tabungan bank, cek juga bahwa banknya peserta Lembaga Penjamin Simpanan (LPS).",
      ],
      [
        "reflect",
        [
          "Jika semua uangmu harus diberi nama, tiga nama pertama apa yang akan kamu tulis?",
          "Tabunganmu sekarang bisa dipakai dalam berapa detik? Terlalu cepat, atau sudah ada jaraknya?",
        ],
      ],
    ],
  },
  {
    title: "Mulai dari Angka yang Tidak Terasa",
    blocks: [
      [
        "quote",
        "Kata orang, idealnya menabung 20% dari gaji. Gajiku Rp4,5 juta, kos saja sudah Rp1,5 juta. 20% itu Rp900 ribu, mustahil. Jadi ya sudah, aku tidak menabung sama sekali.",
        "Bayu, 23, kasir minimarket di Medan",
      ],
      "Bayu, angka 20% itu patokan yang sering dipakai, bukan syarat masuk. Menunggu sampai bisa menabung 20% sama seperti menunggu bisa lari 10 km sebelum mau mulai jogging. Hasilnya kamu tidak pernah mulai.",
      "Yang lebih penting dari besar setoran pertama adalah **pipanya terpasang**. Pipa kecil bisa dibesarkan. Pipa yang tidak pernah dipasang tidak akan pernah mengalirkan apa-apa.",
      ["h", "Cari angka yang tidak membuatmu kesal"],
      "Pilih nominal yang kalau hilang dari rekening harianmu, kamu hampir tidak merasakannya. Untuk sebagian orang itu Rp100.000 sebulan, untuk yang lain Rp50.000 per minggu. Ukuran yang tepat adalah yang bisa kamu biarkan berjalan tanpa kamu batalkan di bulan kedua.",
      [
        "table",
        [
          ["Setoran", "Per bulan", "Setahun (ilustrasi, tanpa bunga)"],
          ["1% dari Rp4.500.000", "Rp45.000", "Rp540.000"],
          ["Rp100.000", "Rp100.000", "Rp1.200.000"],
          ["3% dari Rp4.500.000", "Rp135.000", "Rp1.620.000"],
          ["5% dari Rp4.500.000", "Rp225.000", "Rp2.700.000"],
        ],
      ],
      'Angka-angka itu kelihatan kecil. Tapi Rp1,2 juta setahun cukup untuk membayar servis motor tanpa paylater, atau menjadi setengah dari biaya mudik. Dan yang lebih penting dari uangnya: kamu sedang membangun identitas baru, dari "aku orang yang tidak bisa menabung" menjadi "aku orang yang menabung setiap bulan, walau sedikit".',
      ["quote", "Sedikit demi sedikit, lama-lama menjadi bukit.", "Peribahasa"],
      ["h", "Cari uangnya dari kebocoran, bukan dari kebutuhan"],
      "Kalau benar-benar tidak ada ruang, jangan memotong makan atau ongkos kerja. Cari kebocoran kecil yang tidak membuat hidupmu lebih baik: biaya admin dobel, langganan yang jarang dibuka, ongkos kirim dari belanja yang bisa digabung, atau jajan yang dibeli karena bosan, bukan lapar.",
      [
        "tool",
        "pencari-bocor",
        "Cari kebocoran kecil",
        "Masukkan pengeluaran kecil yang sering terjadi. Hasilnya bisa menjadi setoran pertamamu.",
      ],
      [
        "tip",
        "Setelah menemukan kebocoran, langsung arahkan nominal yang sama ke transfer otomatis. Uang yang dihemat tapi tidak dipindah biasanya habis untuk hal lain.",
      ],
      "Bayu memulai dari Rp75.000 sebulan, hasil mematikan dua langganan yang jarang dipakai dan menggabungkan belanja daring menjadi sekali seminggu. Kecil. Tapi untuk pertama kalinya, saldo tabungannya naik setiap bulan.",
    ],
  },
  {
    title: "Pipa yang Membesar Sendiri",
    blocks: [
      [
        "quote",
        "Sudah enam bulan aku rutin menabung Rp200 ribu. Senang, tapi kok rasanya targetku masih jauh sekali. Harus dinaikkan, tapi takut tidak kuat.",
        "Nadia, 27, desainer grafis di Bandung",
      ],
      "Nadia, selamat, kamu sudah melewati bagian tersulit: memasang pipa dan menjaganya tetap mengalir. Sekarang saatnya membuatnya membesar, dan caranya juga tidak perlu menyakitkan.",
      ["h", "Naikkan saat gajimu naik, bukan sekarang"],
      "Dua ekonom perilaku, Richard Thaler dan Shlomo Benartzi, merancang program bernama **Save More Tomorrow** (Menabung Lebih Banyak Besok). Idenya: karyawan tidak diminta menabung lebih banyak hari ini, tapi berjanji bahwa setiap kali gajinya naik, sebagian kenaikan itu otomatis masuk tabungan.",
      ["chart", SMART_BARS],
      "Kenapa berhasil? Karena dua hal yang biasanya terasa menyakitkan dihindari sekaligus. Peserta tidak pernah melihat gajinya turun, karena setoran hanya naik bersamaan dengan kenaikan gaji. Dan keputusan diambil jauh-jauh hari, saat kepala masih dingin, bukan saat godaan sudah di depan mata.",
      ["h", "Versi sederhana untukmu"],
      [
        "ol",
        [
          'Tulis hari ini: "Setiap gaji atau penghasilanku naik, separuh kenaikannya masuk tabungan."',
          "Pasang pengingat di kalender pada bulan kenaikan gaji biasanya terjadi (misalnya Januari atau April).",
          "Saat kenaikan datang, ubah nominal transfer otomatis hari itu juga, sebelum gaya hidup ikut naik.",
          "Kalau penghasilanmu tidak naik tahun ini, tetap naikkan setoran sedikit, misalnya Rp25.000. Hampir tidak terasa, tapi pipanya tetap membesar.",
        ],
      ],
      [
        "table",
        [
          ["Tahun", "Gaji (ilustrasi)", "Kenaikan", "Setoran per bulan"],
          ["1", "Rp5.000.000", "–", "Rp200.000"],
          ["2", "Rp5.400.000", "Rp400.000", "Rp400.000"],
          ["3", "Rp5.800.000", "Rp400.000", "Rp600.000"],
          ["4", "Rp6.300.000", "Rp500.000", "Rp850.000"],
        ],
      ],
      'Perhatikan: di tahun keempat, setoran Nadia lebih dari empat kali lipat, tapi uang belanjanya tetap naik setiap tahun. Tidak ada bulan di mana dia merasa "dipotong". Inilah yang dimaksud menabung tanpa tersiksa.',
      [
        "info",
        "Kenaikan gaya hidup (lifestyle creep) hampir selalu datang diam-diam: kos yang sedikit lebih bagus, kopi yang sedikit lebih mahal. Tidak ada yang salah dengan menikmati kenaikan gaji. Yang membuatnya berbahaya adalah kalau seluruh kenaikan habis tanpa pernah diputuskan.",
      ],
      [
        "reflect",
        [
          "Kapan terakhir kali penghasilanmu naik? Ke mana perginya kenaikan itu?",
          "Kalimat janji apa yang bisa kamu tulis sekarang untuk kenaikan berikutnya?",
        ],
      ],
    ],
  },
  {
    title: "Menampung Hujan yang Datang Tiba-Tiba",
    blocks: [
      [
        "quote",
        "Setiap THR aku selalu niat menabung. Tapi entah bagaimana, dua minggu setelah Lebaran uangnya sudah tidak ada. Bahkan aku tidak ingat beli apa saja.",
        "Andi, 31, sopir ekspedisi di Makassar",
      ],
      'Andi, kamu tidak sendirian. Uang kaget punya sifat yang licin: karena datangnya di luar gaji, otak kita cenderung menganggapnya "uang bonus" yang boleh dipakai lebih longgar. Para peneliti menyebutnya bagian dari akuntansi mental yang sama dengan Bab 3, hanya kali ini bekerja melawan kita.',
      ["h", "Hujan yang perlu ditampung"],
      "THR, bonus tahunan, uang lembur besar, cashback, uang dari menjual barang bekas, sampai angpau. Semua ini seperti hujan: tidak datang setiap hari, tapi kalau ditampung, bisa mengisi tangki jauh lebih cepat daripada pipa biasa.",
      "Kuncinya adalah **memutuskan pembagian sekali, sebelum uangnya datang**. Saat uangnya sudah ada di rekening, setiap keinginan terasa mendesak. Saat uangnya belum ada, kamu bisa berpikir jernih.",
      [
        "table",
        [
          ["Aturan uang kaget (contoh)", "Bagian"],
          ["Tujuan terpenting (dana darurat, lalu tujuan bernama)", "40%"],
          ["Kewajiban yang memang menunggu (zakat, sedekah, kiriman keluarga)", "Sesuai kebutuhan"],
          ["Dinikmati tanpa rasa bersalah", "Sisanya"],
        ],
      ],
      'Persentasenya boleh berbeda. Yang penting ada **bagian untuk dinikmati**. Aturan yang terlalu keras ("semua harus ditabung") jarang bertahan lebih dari satu tahun, dan sering berakhir dengan belanja balas dendam.',
      ["quiz", UANG_KAGET],
      ["h", "Hujan kecil juga dihitung"],
      "Cashback Rp27.000, kembalian yang ditransfer, atau sisa uang belanja bulanan. Jumlahnya kecil, tapi sering. Kebiasaan sederhana yang berguna: setiap ada uang kecil yang tidak direncanakan, pindahkan ke tangki tujuan hari itu juga. Beberapa aplikasi punya fitur pembulatan otomatis (sisa belanja dibulatkan dan selisihnya masuk tabungan). Kalau tersedia, nyalakan.",
      [
        "exercise",
        [
          "Tulis uang kaget yang kemungkinan datang dalam 12 bulan ke depan dan bulannya: THR, bonus, insentif.",
          "Untuk masing-masing, tulis pembagiannya sekarang juga: berapa untuk tangki mana, berapa untuk dinikmati.",
          "Pasang pengingat di kalender pada hari uang itu biasanya masuk, isinya pembagian yang sudah kamu tulis.",
        ],
        "Rencana hujan tahun ini:",
      ],
      'Andi menulis rencana THR-nya di bulan Februari: 40% untuk dana darurat, sebagian untuk orang tua, sisanya untuk Lebaran. Saat THR masuk di bulan Maret, dia tinggal mengikuti catatannya. "Rasanya aneh," katanya, "Lebaranku tetap ramai, tapi untuk pertama kalinya ada sisa yang benar-benar tersisa."',
    ],
  },
  {
    title: "Saat Keran Harus Dibuka",
    blocks: [
      [
        "quote",
        "Aku berhasil menabung Rp6 juta untuk laptop. Lalu ayahku masuk rumah sakit dan aku pakai semuanya. Sekarang aku merasa gagal dan malas mulai lagi.",
        "Sinta, 25, penulis lepas di Yogyakarta",
      ],
      "Sinta, kamu tidak gagal. Tabunganmu melakukan tepat apa yang seharusnya dilakukan tabungan: ada saat dibutuhkan. Tanpa tabungan itu, kamu mungkin harus berutang untuk biaya rumah sakit, dan utang itu akan memakan penghasilanmu berbulan-bulan.",
      "Banyak orang berhenti menabung justru setelah tabungannya terpakai, karena merasa usahanya sia-sia. Padahal tujuan tabungan bukan disimpan selamanya. Tangki diisi supaya bisa dibuka.",
      ["h", "Tiga jenis keran"],
      [
        "ul",
        [
          "**Keran tujuan.** Uangnya dipakai untuk hal yang memang menjadi namanya. Ini bukan kegagalan, ini keberhasilan. Rayakan.",
          "**Keran darurat.** Kejadian mendadak yang tidak bisa ditunda: sakit, kehilangan pekerjaan, kendaraan kerja rusak. Pakai dana darurat dulu; kalau kurang, boleh pakai tabungan tujuan.",
          "**Keran godaan.** Diskon, ajakan dadakan, keinginan yang datang tiba-tiba. Keran ini yang perlu dijaga.",
        ],
      ],
      ["quiz", BOLEH_DIPAKAI],
      ["h", "Aturan 48 jam"],
      "Untuk keran godaan, satu aturan sederhana sangat membantu: **tunggu 48 jam** sebelum mengambil uang dari tangki tujuan untuk hal lain. Kalau setelah dua hari keinginannya masih ada dan kamu tetap merasa itu sepadan, silakan. Seringkali keinginannya sudah hilang dengan sendirinya.",
      ["h", "Setelah keran dibuka"],
      [
        "ol",
        [
          "**Jangan matikan pipanya.** Transfer otomatis tetap berjalan, walau tangkinya sedang kosong. Inilah kesalahan paling umum.",
          "**Catat jumlah yang dipakai**, supaya kamu tahu berapa yang perlu diisi ulang, tanpa menyalahkan diri.",
          "**Isi ulang yang darurat lebih dulu**, baru tujuan lain. Kalau perlu, naikkan setoran sedikit selama beberapa bulan.",
        ],
      ],
      [
        "fact",
        "Simpanan di bank peserta Lembaga Penjamin Simpanan dijamin sampai Rp2 miliar per nasabah per bank, selama memenuhi syarat: tercatat di pembukuan bank, tingkat bunganya tidak melebihi tingkat bunga penjaminan LPS, dan nasabah tidak menyebabkan bank merugi (misalnya kredit macet).",
        "Lembaga Penjamin Simpanan, ketentuan program penjaminan simpanan",
      ],
      "Sinta kembali menabung dua minggu kemudian, dengan nominal yang sama. Laptopnya datang lima bulan lebih lambat dari rencana. Tapi ayahnya pulih, dan dia tidak punya utang sepeser pun.",
      [
        "reflect",
        [
          "Kalau tabunganmu terpakai bulan depan, apa yang akan kamu katakan pada dirimu sendiri?",
          "Keran godaan mana yang paling sering terbuka untukmu?",
        ],
      ],
    ],
  },
  {
    title: "Sistemmu dalam Satu Halaman",
    blocks: [
      [
        "quote",
        "Bukunya bagus, tapi aku takut lupa semuanya minggu depan. Bisa diringkas jadi sesuatu yang bisa aku tempel?",
        "banyak pembaca",
      ],
      "Bisa. Seluruh isi buku ini sebenarnya hanya lima bagian pipa. Kalau kelimanya terpasang, tabunganmu akan bertambah tanpa kamu harus memikirkannya setiap hari.",
      ["img", "peta-pipa", "Peta sistem menabung tanpa tersiksa."],
      [
        "table",
        [
          ["Bagian", "Pertanyaan", "Jawabanku"],
          ["Pipa utama", "Berapa, tanggal berapa, ke rekening mana?", ""],
          ["Tangki", "Apa saja tujuanku, berapa targetnya, kapan?", ""],
          ["Pembesar pipa", "Berapa bagian kenaikan gaji yang masuk tabungan?", ""],
          ["Penampung hujan", "Bagaimana pembagian THR dan bonus?", ""],
          ["Aturan keran", "Kapan tabungan boleh dipakai?", ""],
        ],
      ],
      "Isi kolom terakhir dengan jawabanmu sendiri. Kalau ingin melihat semua uangmu dalam satu lembar bulanan, template anggaran di bawah ini bisa dipakai bersama sistem ini: baris tabungan diisi lebih dulu, baru yang lain.",
      [
        "template",
        "anggaran-bulanan-gajian",
        "Lembar Anggaran Bulanan",
        "Isi dari tanggal gajian. Taruh tabungan di baris pertama, sesuai prinsip bayar dirimu duluan.",
      ],
      ["h", "Ukur lagi"],
      "Kerjakan lagi cek yang sama dengan Bab 1, satu atau dua bulan setelah sistemmu terpasang. Skornya mungkin naik bukan karena kamu lebih disiplin, tapi karena lebih sedikit hal yang perlu didisiplinkan.",
      ["quiz", GAYA_MENABUNG],
      [
        "summary",
        [
          "Kemauan cepat habis. Sistem yang memutuskan sekali bekerja ratusan kali.",
          "Tabungan keluar di hari gajian, otomatis, ke tangki yang bernama dan sedikit berjarak.",
          "Mulai dari angka yang tidak terasa, lalu besarkan bersama kenaikan penghasilan.",
          "Tabungan yang terpakai untuk tujuannya adalah keberhasilan. Yang penting pipanya tidak dimatikan.",
        ],
      ],
      [
        "info",
        "Buku ini adalah edukasi umum tentang kebiasaan menabung, bukan nasihat keuangan pribadi atau rekomendasi produk. Untuk keputusan besar seperti investasi, asuransi, atau utang dalam jumlah besar, pertimbangkan berkonsultasi dengan perencana keuangan yang independen, dan pastikan setiap produk diawasi OJK.",
      ],
      ["h", "Bacaan lebih lanjut"],
      [
        "ul",
        [
          "Richard H. Thaler & Cass R. Sunstein, Nudge (2008), tentang pilihan bawaan dan rancangan keputusan.",
          'Thaler & Benartzi, "Save More Tomorrow", Journal of Political Economy (2004).',
          'Madrian & Shea, "The Power of Suggestion", Quarterly Journal of Economics (2001).',
          'Soman & Cheema, "Earmarking and Partitioning", Journal of Marketing Research (2011).',
          "Lembaga Penjamin Simpanan (lps.go.id) dan Otoritas Jasa Keuangan (ojk.go.id) untuk mengecek lembaga keuangan.",
        ],
      ],
    ],
  },
];
