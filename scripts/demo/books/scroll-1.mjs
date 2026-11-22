/**
 * "Lepas dari Scroll Tanpa Ujung" bab 1–4. Contoh ebook lengkap kedua untuk staging.
 * Tokoh Dimas dan angkanya adalah ilustrasi; data nasional dan riset diberi sumber.
 */
import { APLIKASI_BARS, LAYAR_COUNTER, MESIN_SCROLL, SKOR_LAYAR } from "./scroll-interactive.mjs";

export const SCROLL_1 = [
  {
    title: "Tujuh Jam yang Tidak Terasa",
    blocks: [
      "Dimas tidak sedang mencari masalah. Malam itu dia hanya ingin tahu kenapa baterai ponselnya cepat sekali habis. Dia membuka pengaturan, menggulir ke bawah, dan menemukan menu yang belum pernah dia sentuh: **Waktu Layar**.",
      "Angka di bagian atas membuatnya diam cukup lama. Rata-rata harian: **7 jam 12 menit**.",
      "Dimas berumur 29 tahun, bekerja di bagian pemasaran sebuah distributor alat rumah tangga di Surabaya. Jam kerjanya delapan jam. Dia tidur sekitar enam jam. Kalau dihitung kasar, hampir semua waktu bangunnya di luar kantor habis di layar sekecil telapak tangan.",
      "Yang lebih aneh: dia tidak merasa menghabiskan waktu selama itu. Dia merasa sibuk. Merasa capek. Merasa tidak punya waktu untuk olahraga, membaca, atau menelepon ibunya di Jember. Tapi tujuh jam itu nyata, tercatat rapi, menit demi menit.",
      ["chart", LAYAR_COUNTER],
      "Kalau dijumlahkan dalam setahun, tujuh jam sehari sama dengan sekitar **110 hari penuh**. Hampir empat bulan, tanpa tidur, tanpa makan, hanya menatap layar.",
      ["img", "satu-tahun", "Satu tahun, dilihat dari layar."],
      ["h", "Kamu tidak sendirian, dan itu justru masalahnya"],
      "Kalau angkamu mirip Dimas, jangan buru-buru menyalahkan diri. Orang Indonesia termasuk yang paling lama menatap ponsel di dunia.",
      [
        "fact",
        "Rata-rata orang Indonesia menghabiskan sekitar 6,05 jam sehari di aplikasi ponsel pada 2023, tertinggi di antara negara yang diamati. Indonesia juga satu-satunya negara dengan rata-rata di atas 6 jam per hari.",
        "data.ai, State of Mobile 2024, dikutip GoodStats dan CNBC Indonesia",
      ],
      "Enam jam itu rata-rata. Artinya ada banyak orang yang jauh di atasnya. Dan karena hampir semua orang di sekitar kita melakukannya, kebiasaan ini terasa normal. Di angkot, di antrean, di meja makan, di ranjang sebelum tidur. Tidak ada yang menegur, karena semua sedang menunduk.",
      ["h", "Ini bukan buku anti-ponsel"],
      "Sebelum lanjut, mari luruskan satu hal. Buku ini tidak akan menyuruhmu membuang ponsel, pindah ke ponsel jadul, atau bertapa di gunung tanpa sinyal. Ponsel adalah alat yang luar biasa. Lewat ponsel kamu bekerja, membayar tagihan, menemukan jalan, dan tetap dekat dengan orang yang jauh.",
      "Masalahnya bukan ponselnya. Masalahnya adalah sebagian besar waktu itu **bukan kamu yang memilih**. Jempol bergerak sendiri. Satu video jadi dua puluh. Niatnya cek pesan, ujungnya setengah jam di beranda orang yang tidak kamu kenal.",
      [
        "quote",
        "Kalau kamu tidak memutuskan untuk apa waktumu dipakai, akan ada orang lain yang memutuskannya untukmu.",
      ],
      "Tujuan buku ini sederhana: mengembalikan pilihan itu ke tanganmu. Kamu boleh tetap menonton video lucu, membalas grup keluarga, atau main gim. Bedanya, kamu melakukannya karena memang mau, bukan karena terseret.",
      ["h", "Ukur dulu posisimu"],
      "Sebelum membahas caranya, coba cek seberapa jauh layar sudah menyedot harimu. Ketuk jawabanmu, skornya langsung muncul.",
      ["quiz", SKOR_LAYAR],
      [
        "tip",
        "Skormu tersimpan. Di bab terakhir kamu akan mengisi tes yang sama dan melihat perubahannya.",
      ],
      ["h", "Cara membaca buku ini"],
      "Buku ini dibagi menjadi empat tahap, mengikuti 30 hari pertama Dimas:",
      [
        "ol",
        [
          "**Memahami.** Kenapa ponsel begitu sulit dilepas, dan kenapa ini bukan soal lemah niat (Bab 2 dan 3).",
          "**Melihat dengan jujur.** Audit satu minggu untuk tahu ke mana waktumu pergi (Bab 4).",
          "**Mengubah lingkungan.** Membuat ponsel membosankan dan memasang zona tanpa layar (Bab 5 dan 6).",
          "**Mengisi ruang kosong.** Supaya waktu yang kembali tidak tersedot lagi (Bab 7 dan 8).",
        ],
      ],
      "Bacalah satu bab, kerjakan latihannya, baru lanjut. Ironis memang kalau buku tentang scroll dibaca sambil di-scroll cepat-cepat sampai habis.",
      [
        "reflect",
        [
          "Tanpa melihat ponsel, berapa jam waktu layarmu sehari menurut tebakanmu? Sekarang cek angka aslinya. Seberapa jauh bedanya?",
          "Kapan terakhir kali kamu membuka ponsel lalu lupa tadi mau apa?",
          "Kalau besok kamu mendapat tambahan dua jam setiap hari, akan kamu pakai untuk apa?",
        ],
      ],
      [
        "summary",
        [
          "Waktu layar terasa jauh lebih sedikit dari kenyataannya. Angka aslinya hampir selalu mengejutkan.",
          "Orang Indonesia rata-rata menatap aplikasi ponsel sekitar 6 jam sehari, salah satu yang tertinggi di dunia.",
          "Tujuannya bukan nol layar, melainkan waktu layar yang kamu pilih sendiri.",
        ],
      ],
    ],
  },
  {
    title: "Kenapa Jempol Tidak Mau Berhenti",
    blocks: [
      'Coba ingat kapan terakhir kali kamu membaca buku sampai halaman terakhir. Ada momen ketika halamannya habis, sampul belakang tertutup, dan kamu tahu ceritanya selesai. Sekarang ingat kapan terakhir kali kamu mencapai "ujung" beranda media sosial.',
      "Tidak pernah, kan? Karena memang tidak ada ujungnya.",
      ["h", "Halaman yang sengaja dibuat tanpa dasar"],
      'Dulu, halaman internet punya tombol "halaman berikutnya". Kamu membaca sepuluh hasil, lalu harus memutuskan: lanjut atau berhenti. Keputusan kecil itu memberi otak kesempatan untuk bertanya, "Sudah cukup belum?"',
      "Lalu muncul gulir tanpa ujung, atau infinite scroll. Begitu kamu mendekati bagian bawah, isi baru muncul sendiri. Tidak ada jeda. Tidak ada pertanyaan. Perancangnya, Aza Raskin, belakangan mengaku menyesal karena temuannya membuat orang menghabiskan waktu jauh lebih lama dari yang mereka inginkan.",
      [
        "info",
        "Bayangkan makan keripik dari kantong yang terus terisi sendiri. Kamu tidak berhenti karena kenyang. Kamu berhenti karena ada yang mengganggu, atau karena sudah terlalu malam.",
      ],
      ["h", "Mesin judi di saku"],
      "Ada alasan kedua yang lebih licin. Setiap kali kamu menarik layar ke bawah untuk memuat ulang, kamu tidak tahu apa yang akan muncul. Kadang pesan dari orang yang kamu tunggu. Kadang video yang lucu sekali. Kadang tidak ada apa-apa.",
      "Para ahli perilaku menyebut pola ini **hadiah acak**. Hadiah yang datangnya tidak bisa ditebak justru membuat kita terus mencoba, jauh lebih kuat dibanding hadiah yang pasti. Itulah cara kerja mesin judi: tuasnya ditarik lagi dan lagi karena siapa tahu kali ini.",
      ["quote", "Bukan isinya yang membuat kita kecanduan. Ketidakpastiannya."],
      "Gabungkan keduanya, halaman tanpa ujung dan hadiah acak, lalu tambahkan notifikasi yang menyala setiap beberapa menit. Hasilnya adalah lingkaran yang hampir sempurna.",
      ["img", "lingkaran-scroll", 'Lingkaran yang membuat "satu video lagi" jadi satu jam.'],
      ["h", "Perhatian yang makin pendek"],
      "Lingkaran ini tidak hanya memakan waktu. Ia juga melatih otak untuk berpindah-pindah.",
      [
        "fact",
        "Gloria Mark, profesor informatika di University of California, Irvine, mengamati berapa lama orang bertahan di satu layar sebelum berpindah. Pada 2003 rata-ratanya sekitar dua setengah menit. Pada periode 2016–2020, rata-ratanya tinggal sekitar 47 detik.",
        "Wawancara Gloria Mark, UC Newsroom, 2024; buku Attention Span (2023)",
      ],
      'Empat puluh tujuh detik. Itu kurang dari satu menit sebelum kita pindah ke hal lain, dan separuh dari perpindahan itu kita sendiri yang memulainya, bukan karena diganggu orang lain. Jempol sudah terbiasa mencari "yang berikutnya", bahkan saat tidak ada notifikasi.',
      "Itulah sebabnya Dimas sering merasa sulit membaca dua halaman dokumen kantor tanpa membuka ponsel. Bukan karena dia malas. Otaknya sudah dilatih bertahun-tahun untuk berpindah setiap setengah menit.",
      ["h", "Jadi, siapa yang salah?"],
      'Kalau kamu merasa "kalah" melawan ponsel, sekarang kamu tahu kenapa. Kamu sedang melawan ribuan insinyur dan ilmuwan perilaku yang pekerjaannya membuatmu bertahan selama mungkin di aplikasi mereka. Waktumu adalah produk yang mereka jual ke pengiklan.',
      "Kabar baiknya: lingkaran ini punya titik lemah. Ia sangat bergantung pada **pemicu** dan pada **tidak adanya ujung**. Ubah pemicunya, pasang ujung buatanmu sendiri, dan lingkarannya melemah. Itu yang akan kita kerjakan mulai Bab 5.",
      [
        "exercise",
        [
          'Hari ini, setiap kali kamu membuka ponsel tanpa rencana, berhenti satu detik dan tanyakan: "Tadi aku mau apa?"',
          'Kalau jawabannya "tidak tahu", taruh ponselnya dan hitung sampai lima.',
          "Malam ini, tulis satu kalimat: dalam situasi apa kamu paling sering membuka ponsel tanpa sadar?",
        ],
        "Latihan sederhana untuk hari ini:",
      ],
      ["quiz", MESIN_SCROLL],
      [
        "summary",
        [
          'Gulir tanpa ujung menghapus momen berhenti yang dulu diberikan oleh tombol "halaman berikutnya".',
          "Hadiah acak (kadang ada yang menarik, kadang tidak) membuat kita terus mencoba, seperti mesin judi.",
          "Lingkaran ini lemah di dua titik: pemicunya dan tidak adanya ujung.",
        ],
      ],
    ],
  },
  {
    title: "Bukan Soal Kurang Niat",
    blocks: [
      "Dimas sudah pernah mencoba berhenti. Tiga kali.",
      'Pertama, dia menghapus aplikasi video pendek. Bertahan lima hari, lalu memasangnya lagi "cuma buat lihat satu video yang dikirim teman". Kedua, dia berjanji tidak membuka ponsel setelah jam sepuluh malam. Bertahan dua hari. Ketiga, dia memasang batas waktu aplikasi, lalu menekan "abaikan untuk hari ini" setiap kali batasnya muncul.',
      "Setiap kali gagal, ada suara kecil di kepalanya: dasar lemah, gitu aja nggak bisa.",
      "Kalau kamu pernah mendengar suara yang sama, bab ini untukmu.",
      ["h", "Niat itu seperti baterai"],
      "Mengandalkan niat untuk melawan ponsel itu seperti berusaha tidak makan kue sementara toples kuenya terbuka di meja kerjamu, sepanjang hari, dan sesekali toples itu berbunyi memanggilmu. Pagi hari kamu mungkin kuat. Tapi setelah rapat yang melelahkan, macet di jalan, dan pesan atasan yang menyebalkan, pertahananmu menipis.",
      "Ponsel tidak pernah lelah. Kamu iya.",
      "Itulah kenapa orang yang berhasil mengubah kebiasaan biasanya bukan orang yang paling kuat niatnya, melainkan orang yang paling pandai **mengatur lingkungannya** supaya tidak perlu terus-menerus bertarung. Mereka memindahkan toples kuenya ke lemari paling atas.",
      ["quote", "Jangan mengandalkan kekuatanmu untuk menolak godaan. Jauhkan saja godaannya."],
      ["h", "Bahkan diam pun ponsel bekerja"],
      "Ada satu penelitian yang sering dikutip soal ini, dan menarik untuk dibahas dengan jujur.",
      [
        "fact",
        "Dalam eksperimen tahun 2017, peserta yang ponselnya diletakkan di ruangan lain mendapat skor lebih baik pada tes memori dan konsentrasi dibanding peserta yang ponselnya ada di meja, meski ponsel itu dalam keadaan diam dan tertelungkup. Efeknya paling besar pada orang yang merasa paling bergantung pada ponselnya. Catatan: penelitian lanjutan pada 2021 tidak berhasil menemukan efek yang sama, jadi temuan ini masih diperdebatkan.",
        "Ward dkk., Journal of the Association for Consumer Research, 2017; Hartmann dkk., Consciousness and Cognition, 2021",
      ],
      'Para ilmuwan masih berdebat soal besarnya efek itu. Tapi kalau kamu jujur, kamu mungkin pernah merasakannya sendiri: saat ponsel ada di dekatmu, sebagian pikiranmu terus "melirik". Ada pesan belum? Grup sudah ramai? Video tadi sudah berapa yang menonton?',
      "Pelajarannya tetap sama: jarak itu membantu. Bukan karena kamu lemah, tapi karena otak manusia memang mudah terpancing oleh hal yang ada di dekatnya.",
      ["h", "Berhenti memarahi diri sendiri"],
      "Ada alasan praktis untuk berhenti menyalahkan diri. Rasa bersalah ternyata justru sering mendorong kita kembali ke ponsel. Merasa buruk, butuh pelarian, buka ponsel, merasa makin buruk karena gagal lagi. Lingkaran baru.",
      'Coba ganti suara di kepalamu. Dari "dasar lemah" menjadi "oke, tadi aku terseret lagi. Pemicunya apa, ya?". Kalimat kedua tidak memarahi. Ia penasaran, dan rasa penasaran itulah yang membawamu ke langkah berikutnya.',
      [
        "tip",
        "Setiap kali kamu sadar sedang scroll tanpa rencana, itu bukan kegagalan. Itu momen sadar. Semakin sering kamu sadar, semakin cepat kebiasaannya berubah.",
      ],
      ["h", "Catat pemicumu"],
      "Sebelum mengubah apa pun, kamu perlu tahu kapan dan kenapa kamu meraih ponsel. Dimas melakukan latihan di bawah ini selama tiga hari, dan menemukan sesuatu yang tidak dia sangka: dia paling sering membuka ponsel bukan saat bosan, tapi **sesaat setelah menyelesaikan satu tugas**. Seolah ponsel adalah hadiah kecil setelah setiap pekerjaan.",
      [
        "exercise",
        [
          "Selama tiga hari, setiap kali kamu sadar sedang membuka ponsel tanpa rencana, catat jamnya.",
          "Tulis juga apa yang sedang terjadi tepat sebelumnya: bosan, menunggu, selesai kerja, canggung, cemas, atau lelah.",
          "Di hari ketiga, lihat catatanmu. Pemicu mana yang paling sering muncul?",
          "Lingkari dua pemicu teratas. Itulah sasaran pertamamu di Bab 5.",
        ],
        "Latihan tiga hari: berburu pemicu",
      ],
      [
        "reflect",
        [
          "Kapan terakhir kali kamu gagal mengurangi waktu layar? Apa yang kamu katakan pada dirimu sendiri saat itu?",
          "Di ruangan mana ponselmu paling sering berada saat kamu ingin fokus atau beristirahat?",
        ],
      ],
      [
        "summary",
        [
          "Niat cepat habis; ponsel tidak pernah lelah. Mengatur lingkungan jauh lebih efektif daripada mengandalkan niat.",
          "Jarak fisik dari ponsel membantu, meski besarnya efek dalam penelitian masih diperdebatkan.",
          'Rasa bersalah sering mendorong kembali ke ponsel. Ganti dengan rasa penasaran: "Pemicunya apa?"',
        ],
      ],
    ],
  },
  {
    title: "Audit Satu Minggu",
    blocks: [
      "Hari Senin, Dimas memutuskan untuk tidak mengubah apa pun selama seminggu. Tidak ada janji, tidak ada aplikasi yang dihapus. Dia hanya akan **melihat**.",
      "Kedengarannya pasif, tapi ini langkah yang sering dilewati orang. Kita ingin langsung berubah, padahal belum tahu persis apa yang harus diubah. Seperti dokter yang memberi obat sebelum memeriksa.",
      ["h", "Langkah 1: buka angka aslinya"],
      "Hampir semua ponsel sekarang mencatat waktu layarmu. Di Android biasanya ada di **Pengaturan → Kesehatan Digital & Kontrol Orang Tua**. Di iPhone, ada di **Pengaturan → Waktu Layar**. Di sana kamu bisa melihat tiga angka penting:",
      [
        "ul",
        [
          "**Total waktu layar per hari**, dan rata-ratanya dalam seminggu.",
          "**Aplikasi yang paling lama dibuka**.",
          '**Berapa kali ponsel dibuka** dalam sehari (di beberapa ponsel disebut "buka kunci" atau "pengambilan").',
        ],
      ],
      "Angka ketiga sering lebih mengejutkan dari yang pertama. Dimas membuka ponselnya rata-rata **96 kali sehari**. Hampir enam kali setiap jam ia terjaga.",
      ["h", "Langkah 2: hitung apa artinya bagimu"],
      "Angka per hari sulit dirasakan. Kalkulator di bawah ini mengubahnya menjadi sesuatu yang lebih nyata: berapa hari setahun, dan berapa tahun dari sisa hidupmu.",
      [
        "tool",
        "kalkulator-waktu-layar",
        "Hitung waktu layarmu dalam setahun",
        "Masukkan rata-rata harian dari pengaturan ponselmu.",
      ],
      "Dimas memasukkan angkanya: 7 jam 12 menit, usia 29. Hasilnya **110 hari setahun**, dan sekitar **15 tahun** sampai usia 80 kalau tidak ada yang berubah. Dia menatap angka 15 tahun itu lama sekali.",
      "Tapi kalkulator itu juga menunjukkan sisi baiknya: setiap satu jam yang kamu ambil kembali setiap hari setara dengan **15 hari penuh** setiap tahun. Bayangkan tambahan liburan dua minggu, setiap tahun, tanpa mengambil cuti.",
      ["h", "Langkah 3: pilah aplikasimu"],
      "Sekarang lihat daftar aplikasi yang paling lama kamu buka, lalu golongkan ke dalam tiga kelompok:",
      ["img", "tiga-golongan", "Tiga golongan aplikasi di ponselmu."],
      [
        "table",
        [
          ["Golongan", "Ciri-cirinya", "Yang perlu dilakukan"],
          [
            "Alat",
            "Dibuka untuk satu tujuan, selesai, lalu ditutup",
            "Biarkan. Taruh di layar utama.",
          ],
          [
            "Hiburan pilihan",
            "Dinikmati dengan sengaja dan ada akhirnya (satu film, satu album)",
            "Boleh, asal kamu yang memilih waktunya.",
          ],
          [
            "Jebakan tanpa dasar",
            "Tidak pernah selesai, selalu ada yang berikutnya",
            "Jauhkan dari jempol: Bab 5 dan 6.",
          ],
        ],
      ],
      'Satu aplikasi bisa masuk golongan berbeda tergantung cara kamu memakainya. YouTube untuk menonton satu tutorial memasak adalah alat. YouTube yang dibuka "buat iseng" lalu berlanjut ke video rekomendasi berikutnya adalah jebakan.',
      ["chart", APLIKASI_BARS],
      "Dimas menemukan bahwa dua pertiga waktunya habis di tiga aplikasi jebakan. Aplikasi alatnya, seperti bank, peta, dan email kantor, kalau dijumlahkan bahkan tidak sampai 40 menit sehari.",
      [
        "warn",
        "Jangan langsung menghapus semua aplikasi jebakan di minggu audit. Lonjakan semangat seperti itu biasanya berakhir dengan memasangnya kembali beberapa hari kemudian. Sabar sampai Bab 5.",
      ],
      [
        "exercise",
        [
          "Buka pengaturan waktu layar dan catat rata-rata harian, aplikasi tiga teratas, dan berapa kali ponsel dibuka.",
          "Masukkan angkamu ke kalkulator di atas.",
          "Golongkan 10 aplikasi yang paling sering kamu buka: alat, hiburan pilihan, atau jebakan.",
          "Gabungkan dengan catatan pemicu dari Bab 3: pemicu mana yang paling sering membawamu ke aplikasi jebakan?",
        ],
        "Tugas minggu ini:",
      ],
      [
        "reflect",
        [
          "Angka mana yang paling mengejutkanmu: total jam, jumlah membuka ponsel, atau aplikasi teratasnya?",
          "Kalau kamu mendapat kembali 15 hari setahun, apa satu hal yang ingin kamu lakukan dengannya?",
        ],
      ],
      [
        "summary",
        [
          "Lihat dulu sebelum mengubah: rata-rata harian, aplikasi teratas, dan jumlah membuka ponsel.",
          "Satu jam sehari yang kembali setara dengan sekitar 15 hari penuh setahun.",
          "Pilah aplikasi menjadi alat, hiburan pilihan, dan jebakan tanpa dasar. Sasaran kita adalah jebakannya.",
        ],
      ],
    ],
  },
];
