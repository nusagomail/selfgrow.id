/**
 * "Pagi yang Menang", 8 bab. Bentuk: jurnal harian. Setiap bab dibuka dengan catatan pagi Sari
 * (27, staf layanan nasabah, berangkat naik KRL dari Bekasi pukul 06.15), lalu dijelaskan.
 * Sudut pembeda: bukan "bangun jam 4", tapi pagi yang dipimpin sendiri dalam waktu yang ada.
 * Kebiasaan malam dan sains tidur dibahas seperlunya; buku "Ritual Malam" dan "Tidur yang
 * Benar-Benar Memulihkan" membahasnya lebih dalam. Tokoh dan angka adalah ilustrasi.
 */
import { CEK_PAGI, LALLY_COUNTER, MITOS_PAGI, TELAT_BANGUN } from "./pagi-interactive.mjs";

const jurnal = (when, text) => ["quote", text, `Jurnal Sari, ${when}`];

export const PAGI_1 = [
  {
    title: "Pagi yang Kalah",
    blocks: [
      jurnal(
        "Senin, 05.47",
        "Alarm 05.00, aku tunda empat kali. Bangun langsung buka grup kantor: 32 pesan. Mandi sambil kepikiran komplain nasabah kemarin. Tidak sarapan. Kartu KRL ketinggalan, balik lagi dari gang. Lari ke stasiun. Duduk di kereta sudah capek, padahal kerja belum mulai.",
      ),
      "Kalau pagimu mirip pagi Sari, kamu tidak sendirian. Banyak pekerja di kota besar memulai hari dengan perasaan sudah tertinggal, bahkan sebelum jam kerja dimulai.",
      'Lalu kita membuka media sosial dan menemukan video "rutinitas pagi jam 4": bangun sebelum subuh, meditasi 20 menit, olahraga, jurnal tiga halaman, smoothie hijau, membaca satu bab buku. Semuanya selesai sebelum jam 7. Kita menonton sambil berbaring, merasa makin kalah.',
      ["h", "Pagi yang menang bukan soal jam bangun"],
      "Buku ini tidak akan menyuruhmu bangun jam 4. Untuk sebagian besar pekerja, bangun jam 4 tanpa tidur lebih awal hanya berarti satu hal: kurang tidur. Dan kurang tidur adalah cara tercepat membuat pagi, siang, dan malam sama-sama kalah.",
      "Yang dimaksud **pagi yang menang** di buku ini lebih sederhana:",
      [
        "ol",
        [
          "Kamu bangun tanpa perang melawan alarm.",
          "Kamu sempat mengisi tubuh dan kepala dengan hal yang kamu pilih, bukan yang menyerbu dari ponsel.",
          "Kamu berangkat dengan tahu satu hal terpenting hari itu.",
        ],
      ],
      "Tiga hal itu bisa terjadi dalam 30 menit, bahkan dalam 5 menit di hari yang berantakan. Bukan pagi yang sempurna. Pagi yang kamu pimpin.",
      ["img", "dua-pagi", "Pagi Sari yang dikejar dan pagi yang dipimpin."],
      ["h", "Pagimu sekarang"],
      ["quiz", CEK_PAGI],
      "Simpan skormu. Di bab terakhir, kamu akan mengerjakan cek yang sama dan melihat apa yang berubah.",
      [
        "reflect",
        [
          "Dari tiga hal di atas, mana yang paling sering hilang dari pagimu?",
          "Apa satu hal kecil yang, kalau terjadi setiap pagi, akan membuat harimu terasa berbeda?",
        ],
      ],
    ],
  },
  {
    title: "Pagi Dimulai Tadi Malam",
    blocks: [
      jurnal(
        "Selasa, 05.30",
        'Semalam tidur jam 00.40 karena nonton satu episode "terakhir" yang ternyata tiga. Pagi ini seperti dihantam. Mungkin masalahku bukan di pagi.',
      ),
      "Sari menemukan sesuatu yang sering terlewat: **pagi yang menang tidak bisa dibangun di atas malam yang kalah.** Rutinitas pagi apa pun akan terasa seperti hukuman kalau tubuhmu baru tidur lima jam.",
      [
        "fact",
        "Untuk orang dewasa usia 18–64 tahun, panel ahli National Sleep Foundation merekomendasikan tidur 7–9 jam per malam.",
        "Hirshkowitz dkk. (2015), Sleep Health, rekomendasi National Sleep Foundation",
      ],
      ["h", "Hitung mundur dari jam berangkat"],
      "Cara paling jujur menentukan jam tidur adalah menghitung mundur. Mulai dari jam kamu harus keluar rumah, kurangi waktu yang kamu butuhkan untuk bersiap, lalu kurangi lagi kebutuhan tidurmu.",
      [
        "table",
        [
          ["Langkah", "Sari"],
          ["Harus berangkat", "06.15"],
          ["Waktu bersiap yang nyaman", "45 menit → bangun 05.30"],
          ["Kebutuhan tidur", "7,5 jam"],
          ["Waktu sampai terlelap", "± 15 menit"],
          ["Jam masuk kasur", "21.45"],
        ],
      ],
      'Angka 21.45 membuat Sari tertawa. "Itu jam aku baru mulai nonton." Dia tidak langsung mengubahnya. Dia memajukan jam tidurnya **15 menit setiap beberapa hari**, sampai dalam tiga minggu dia terbiasa masuk kasur sekitar 22.15. Belum ideal, tapi jauh lebih baik dari 00.40.',
      ["h", "Jam tubuh setiap orang berbeda"],
      "Sebagian orang memang lebih mudah bangun pagi, sebagian lebih segar di malam hari. Para peneliti menyebut kecenderungan ini **kronotipe**. Masalahnya, jam kerja dan sekolah jarang menyesuaikan kronotipe kita.",
      [
        "fact",
        'Peneliti kronobiologi menyebut selisih antara jam tidur di hari kerja dan hari libur sebagai "social jetlag". Semakin besar selisihnya, semakin tubuh terasa seperti terkena jet lag setiap Senin.',
        "Wittmann, Dinich, Merrow & Roenneberg (2006), Chronobiology International",
      ],
      "Pelajaran praktisnya: **jaga jam bangun tetap mirip di hari libur**, paling banyak bergeser satu jam. Tidur siang sebentar lebih baik daripada bangun jam 10 di hari Minggu lalu tidak bisa tidur di Minggu malam.",
      ["h", 'Kalau kamu memang "orang malam"'],
      'Sebagian pembaca akan berkata, "Aku sudah coba tidur jam 10, tapi mataku terbuka lebar sampai jam 12." Itu bisa benar. Kronotipe malam bukan kemalasan, dan tidak bisa diubah hanya dengan niat.',
      "Yang masih bisa kamu lakukan adalah membantu jam tubuh bergeser sedikit, bukan melawannya habis-habisan:",
      [
        "ul",
        [
          "**Cahaya terang di pagi hari, redup di malam hari.** Dua jam sebelum tidur, kurangi lampu terang dan layar yang dekat dengan wajah.",
          "**Geser pelan-pelan.** Lima belas menit setiap beberapa hari jauh lebih mudah diikuti tubuh daripada dua jam sekaligus.",
          "**Pindahkan beban ke perjalanan.** Kalau bangun lebih awal memang berat, buat rutinitas di rumah sesingkat mungkin dan lanjutkan sisanya di jalan (Bab 5).",
          "**Pakai hari libur dengan bijak.** Bangun sedikit lebih siang boleh, asal selisihnya tidak terlalu jauh dari hari kerja.",
        ],
      ],
      ["quiz", MITOS_PAGI],
      [
        "warn",
        "Kalau kamu sudah tidur cukup tapi tetap sangat mengantuk sepanjang hari, sering terbangun dengan napas tersengal, atau sulit tidur hampir setiap malam selama berminggu-minggu, bicarakan dengan dokter. Itu bisa tanda gangguan tidur yang perlu diperiksa, bukan soal kurang disiplin.",
      ],
    ],
  },
  {
    title: "Lima Belas Menit Pertama",
    blocks: [
      jurnal(
        "Rabu, 05.33",
        "Tidak buka ponsel dulu. Rasanya aneh, tangan gatal. Buka jendela, duduk di tepi kasur, minum segelas air. Kepala masih berat, tapi tidak dikejar 32 pesan. Jam 05.48 baru cek grup, dan isinya ternyata tidak ada yang darurat.",
      ),
      'Menit-menit pertama setelah bangun adalah masa peralihan. Otak belum sepenuhnya menyala; para peneliti tidur menyebutnya **inersia tidur**. Itu sebabnya keputusan yang diambil di kasur sering keputusan yang buruk: menekan tunda alarm, atau membuka ponsel "sebentar".',
      "Daripada melawan masa ini dengan kemauan, lebih mudah mengisinya dengan langkah-langkah yang sudah diputuskan sebelumnya. Sari menyebutnya **landasan pacu**: urutan kecil yang sama setiap pagi, yang tidak perlu dipikirkan.",
      ["img", "landasan-pacu", "Landasan pacu lima belas menit pertama Sari."],
      ["h", "Tiga unsur landasan pacu"],
      [
        "ul",
        [
          "**Cahaya.** Buka tirai atau jendela, nyalakan lampu terang, atau berdiri sebentar di teras. Cahaya adalah penanda waktu terkuat bagi jam biologis tubuh.",
          "**Cairan.** Segelas air di samping kasur, disiapkan malam sebelumnya. Bukan karena air pagi punya khasiat ajaib, tapi karena itu langkah pertama yang mudah dan membuatmu berdiri.",
          "**Jeda dari layar.** Beri jarak sebelum membuka pesan. Lima belas menit cukup. Kalau pekerjaanmu memang menuntut siaga, cek sekilas yang mendesak saja, lalu tutup.",
        ],
      ],
      ["h", "Soal alarm"],
      "Taruh alarm di tempat yang memaksamu berdiri untuk mematikannya, misalnya di meja dekat pintu. Begitu kamu berdiri, langkah pertama landasan pacu sudah dekat. Kalau kamu memakai ponsel sebagai alarm, ini juga membuat ponsel tidak tidur di sebelah bantal.",
      [
        "tip",
        "Siapkan landasan pacu malam sebelumnya: gelas terisi, tirai mudah dibuka, ponsel diisi daya di luar jangkauan tangan. Pagi hari, kamu tinggal mengikuti jejak yang sudah kamu siapkan sendiri.",
      ],
      [
        "reflect",
        [
          "Apa yang kamu lakukan dalam lima menit pertama setelah bangun pagi ini?",
          "Kalau harus memilih satu langkah pertama yang sama setiap pagi, apa itu?",
        ],
      ],
    ],
  },
  {
    title: "Tiga Jangkar, Bukan Sepuluh Kebiasaan",
    blocks: [
      jurnal(
        "Kamis, 05.35",
        "Kemarin aku coba tambah yoga 20 menit, jurnal, dan baca buku. Hasilnya telat. Hari ini kembali ke tiga hal saja. Selesai dalam 25 menit, dan berangkat dengan tenang.",
      ),
      "Godaan terbesar saat mulai memperbaiki pagi adalah menambah terlalu banyak sekaligus. Rutinitas sepuluh langkah terlihat indah di kertas, tapi satu langkah yang terlambat menjatuhkan semua yang lain.",
      "Sari memangkas pagi idealnya menjadi **tiga jangkar**: satu untuk tubuh, satu untuk perut, satu untuk kepala.",
      ["img", "tiga-jangkar", "Tiga jangkar pagi: gerak, isi, arah."],
      [
        "table",
        [
          ["Jangkar", "Versi Sari", "Versi lain yang bisa dipilih"],
          [
            "Gerak",
            "Peregangan 5 menit di samping kasur",
            "Jalan ke warung, 10 kali naik-turun tangga, salat dengan tenang",
          ],
          [
            "Isi",
            "Roti dan telur rebus yang disiapkan malam",
            "Pisang dan susu, nasi sisa semalam, bekal untuk dimakan di kereta",
          ],
          [
            "Arah",
            "Satu prioritas hari ini, ditulis di catatan ponsel",
            "Satu kalimat di kertas tempel, satu tugas yang dikerjakan pertama di kantor",
          ],
        ],
      ],
      ["h", "Tempelkan pada yang sudah ada"],
      'Kebiasaan baru lebih mudah menempel kalau ditumpangkan pada kebiasaan lama yang sudah pasti terjadi. Peneliti perilaku BJ Fogg menyebutnya **jangkar**: "Setelah aku (kebiasaan lama), aku akan (kebiasaan baru)."',
      [
        "fact",
        'Rencana berbentuk "kalau-maka" (jika situasi X terjadi, aku melakukan Y) secara konsisten meningkatkan kemungkinan orang benar-benar menjalankan niatnya. Tinjauan atas puluhan studi menemukan efek yang sedang sampai besar.',
        "Gollwitzer (1999), American Psychologist; Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology",
      ],
      [
        "ul",
        [
          "Setelah mematikan alarm, aku membuka jendela.",
          "Setelah minum air, aku meregangkan badan lima menit.",
          "Setelah duduk di kereta, aku menulis satu prioritas hari ini.",
        ],
      ],
      [
        "tool",
        "langkah-dua-menit",
        "Susun jangkar pertamamu",
        "Tulis kebiasaan yang ingin kamu mulai, langkah terkecilnya, dan kebiasaan lama yang akan menjadi jangkarnya.",
      ],
      [
        "tip",
        "Mulai dari satu jangkar dulu selama seminggu. Kalau sudah berjalan tanpa dipikirkan, baru tambah yang kedua. Lambat di awal, tapi tidak runtuh di minggu kedua.",
      ],
    ],
  },
  {
    title: "Pagi di Atas Rel",
    blocks: [
      jurnal(
        "Jumat, 06.31",
        "Dapat duduk di gerbong 3. Aku pakai 20 menit perjalanan untuk menulis prioritas dan membaca 10 halaman buku. Rasanya seperti mencuri waktu yang selama ini hilang untuk scroll.",
      ),
      "Bagi banyak pekerja di kota besar, sebagian pagi terjadi di jalan: di KRL, bus TransJakarta, angkot, atau di boncengan ojek. Rutinitas pagi yang hanya membayangkan rumah yang tenang mengabaikan waktu yang bisa jadi paling panjang dalam pagimu.",
      ["h", "Perjalanan sebagai ruang kedua"],
      "Sari memindahkan jangkar **arah** ke kereta. Di rumah, dia cukup bergerak dan makan. Di kereta, dia menulis prioritas. Rumahnya lebih lega, perjalanannya lebih berarti.",
      [
        "table",
        [
          ["Cara berangkat", "Yang masuk akal", "Yang sebaiknya tidak"],
          [
            "KRL atau bus, dapat duduk",
            "Menulis prioritas, membaca, mendengar siniar",
            "Membuka surel kantor sejak naik",
          ],
          [
            "KRL berdiri dan padat",
            "Mendengar siniar atau musik, merencanakan di kepala",
            "Memaksa membaca sambil berdesakan",
          ],
          [
            "Naik motor sendiri",
            "Diam, memikirkan satu prioritas di lampu merah",
            "Membuka ponsel saat berkendara",
          ],
          [
            "Ojek daring",
            "Mendengar, mengatur napas, mengamati jalan",
            "Rapat daring di boncengan",
          ],
        ],
      ],
      [
        "warn",
        "Saat mengemudi atau mengendarai motor, perjalanan bukan waktu untuk ponsel, termasuk membaca pesan di lampu merah. Selain berbahaya, itu melanggar kewajiban mengemudi dengan wajar dan penuh konsentrasi dalam UU Lalu Lintas dan Angkutan Jalan (UU No. 22 Tahun 2009).",
      ],
      ["h", "Tas yang siap sejak malam"],
      "Separuh kepanikan pagi Sari dulu bukan soal waktu, tapi soal mencari: kartu KRL, charger, kunci loker, dompet. Sekarang dia punya satu kebiasaan malam yang kecil: **tas disiapkan di dekat pintu**, dengan isi yang sama setiap hari.",
      [
        "exercise",
        [
          "Tulis lima barang yang wajib kamu bawa setiap hari kerja.",
          "Tentukan satu tempat tetap untuk menaruh semuanya, sedekat mungkin dengan pintu.",
          "Selama seminggu, kembalikan barang-barang itu ke tempatnya sebelum tidur.",
        ],
        "Malam ini, sepuluh menit:",
      ],
      ["h", "Malam sepuluh menit, pagi setengah jam"],
      "Sari mulai melihat pola yang sama di banyak bagian pagi: hampir setiap hal yang membuat pagi lancar sebenarnya diputuskan malam sebelumnya. Baju kerja yang sudah dipilih. Bekal di kulkas. Gelas air di samping kasur. Alarm di dekat pintu. Tas di tempatnya.",
      "Semua itu butuh sekitar sepuluh menit di malam hari, saat kepala masih cukup jernih untuk memutuskan. Sebagai gantinya, pagi tidak lagi berisi keputusan kecil yang melelahkan: pakai baju apa, makan apa, barang apa yang belum masuk tas. Pagi tinggal dijalankan.",
      "Pagi ketika Sari tidak perlu kembali dari ujung gang karena kartunya tertinggal adalah pagi yang sudah setengah menang.",
    ],
  },
  {
    title: "Kalau Pagimu Bukan Milikmu Sendiri",
    blocks: [
      jurnal(
        "Sabtu, 07.10",
        'Ngobrol dengan Mbak Laras, kakakku. Anaknya baru 8 bulan, bangun jam 3 dan jam 5. "Rutinitas pagimu lucu," katanya, "pagiku diatur bayi." Aku jadi berpikir: buku-buku pagi ditulis untuk siapa?',
      ),
      "Pertanyaan Mbak Laras penting. Banyak orang tidak bisa mengatur pagi sepenuhnya: orang tua dengan bayi, pekerja shift, perawat yang pulang jaga malam, anak yang mengurus orang tua sakit, atau penghuni kos yang kamar mandinya dipakai bergiliran.",
      "Untuk mereka, rutinitas pagi yang kaku justru menambah rasa gagal. Yang lebih berguna adalah **versi minimal**: rutinitas sangat kecil yang tetap bisa dijalankan di hari terburuk.",
      ["h", "Versi lima menit"],
      [
        "ol",
        [
          "**Satu menit:** buka jendela atau nyalakan lampu terang.",
          "**Satu menit:** minum segelas air.",
          "**Tiga menit:** tulis atau ucapkan dalam hati satu hal terpenting hari ini, dan satu hal yang bisa ditunda.",
        ],
      ],
      'Mbak Laras menjalankan versi ini sambil menggendong bayinya di dekat jendela. "Bukan meditasi," katanya, "tapi setidaknya aku yang memutuskan hari ini mau fokus ke apa."',
      ["quiz", TELAT_BANGUN],
      ["h", "Untuk pekerja shift"],
      'Kalau jam kerjamu bergiliran, "pagi" adalah waktu kamu bangun, kapan pun itu. Prinsipnya tetap sama: cahaya terang saat ingin terjaga, cairan, jeda dari layar, dan satu prioritas. Setelah shift malam, kebalikannya berlaku: kurangi cahaya terang dalam perjalanan pulang supaya tubuh lebih mudah tidur.',
      [
        "info",
        "Pekerja shift dan orang tua bayi sering kurang tidur karena keadaan, bukan pilihan. Kalau kantuk berat membuatmu hampir tertidur saat berkendara atau bekerja dengan mesin, itu tanda bahaya. Bicarakan dengan atasan atau dokter perusahaan, dan jangan berkendara dalam keadaan sangat mengantuk.",
      ],
      [
        "reflect",
        [
          "Siapa atau apa yang paling sering mengatur pagimu?",
          "Versi lima menit seperti apa yang tetap bisa kamu jalankan di pagi terburukmu?",
        ],
      ],
    ],
  },
  {
    title: "Saat Rutinitas Bolong",
    blocks: [
      jurnal(
        "Rabu minggu ketiga, 06.02",
        "Dua hari ini bolong total. Senin lembur sampai jam 10 malam, Selasa bangun telat. Rasanya semua usahaku tiga minggu ini hilang. Hampir menyerah, tapi pagi ini aku jalankan versi lima menit saja.",
      ),
      "Setiap orang yang membangun kebiasaan akan mengalami pagi seperti ini. Lembur, sakit, mudik, tamu menginap, atau sekadar malam yang buruk. Yang menentukan bukan apakah rutinitasmu pernah bolong, tapi apa yang terjadi setelahnya.",
      ["chart", LALLY_COUNTER],
      "Penelitian Phillippa Lally dan rekan-rekannya di University College London mengikuti peserta yang membangun kebiasaan baru setiap hari. Rata-rata butuh sekitar 66 hari sampai kebiasaan terasa otomatis, dengan rentang yang sangat lebar. Temuan yang paling melegakan: **melewatkan satu kesempatan tidak merusak prosesnya secara berarti.**",
      ["img", "kurva-kebiasaan", "Pola pembentukan kebiasaan: naik cepat di awal, lalu melandai."],
      ["h", "Aturan jangan bolong dua kali"],
      "Satu pagi yang bolong hanyalah satu pagi. Dua pagi berturut-turut mulai menjadi pola baru. Karena itu, banyak orang memakai aturan sederhana: **boleh bolong sekali, jangan dua kali berturut-turut.** Di pagi setelah bolong, jalankan setidaknya versi lima menit dari Bab 6.",
      ["h", "Catat, jangan hukum"],
      "Mencatat membantu kamu melihat polanya: hari apa yang sering bolong, dan kenapa. Sari menemukan bahwa hampir semua pagi bolongnya terjadi setelah malam lembur. Solusinya bukan memarahi diri, tapi menyiapkan versi minimal khusus untuk hari setelah lembur.",
      [
        "template",
        "pelacak-kebiasaan-30-hari",
        "Pelacak Kebiasaan 30 Hari",
        "Cetak atau isi lembar ini untuk tiga jangkar pagimu. Beri tanda berbeda untuk hari yang hanya menjalankan versi lima menit, karena itu tetap dihitung.",
      ],
      [
        "quote",
        "Kita adalah apa yang kita lakukan berulang-ulang.",
        "Will Durant, merangkum pemikiran Aristoteles (1926)",
      ],
      [
        "reflect",
        [
          "Kapan rutinitas pagimu paling sering bolong? Apa yang terjadi di malam sebelumnya?",
          "Apa yang akan kamu katakan pada dirimu sendiri di pagi setelah bolong?",
        ],
      ],
    ],
  },
  {
    title: "Pagi Menangmu",
    blocks: [
      jurnal(
        "Senin minggu kelima, 05.31",
        'Bangun sebelum alarm kedua. Jendela, air, peregangan. Sarapan sudah siap dari semalam. Tas di dekat pintu. Di kereta menulis: "Hari ini: selesaikan laporan keluhan bulan lalu." Bukan pagi yang luar biasa. Pagi yang biasa saja, dan itu yang aku mau.',
      ),
      "Lima minggu setelah catatan pertamanya, pagi Sari tidak berubah menjadi video rutinitas yang estetis. Dia tetap bangun 05.30, tetap naik KRL yang sama, tetap kadang bolong. Yang berubah: pagi itu terasa miliknya.",
      ["h", "Rancang pagimu dalam satu lembar"],
      [
        "table",
        [
          ["Bagian", "Pertanyaan", "Jawabanku"],
          ["Jam berangkat", "Jam berapa aku harus keluar rumah?", ""],
          ["Jam bangun", "Berapa lama aku butuh bersiap dengan tenang?", ""],
          ["Jam ke kasur", "Hitung mundur 7–9 jam, ditambah waktu terlelap", ""],
          ["Landasan pacu", "Apa tiga langkah pertamaku setelah bangun?", ""],
          ["Tiga jangkar", "Gerak, isi, arah: versiku apa?", ""],
          ["Versi lima menit", "Apa yang tetap kulakukan di pagi terburuk?", ""],
          ["Persiapan malam", "Apa yang kusiapkan sebelum tidur?", ""],
        ],
      ],
      [
        "exercise",
        [
          "Isi lembar di atas malam ini, bukan pagi hari.",
          "Jalankan satu bagian saja minggu ini, dimulai dari persiapan malam atau landasan pacu.",
          "Setiap Minggu malam, lihat lagi lembarnya dan tambah satu bagian bila yang lama sudah berjalan.",
        ],
        "Mulai dari yang paling mudah:",
      ],
      ["h", "Ukur lagi"],
      "Setelah dua sampai empat minggu menjalankan rancanganmu, kerjakan lagi cek dari Bab 1. Bandingkan, lalu lihat bagian mana yang sudah berjalan sendiri dan mana yang masih perlu jangkar.",
      ["quiz", CEK_PAGI],
      [
        "summary",
        [
          "Pagi yang menang bukan soal jam bangun, tapi soal siapa yang memimpin pagi itu.",
          "Pagi dimulai dari malam sebelumnya: hitung mundur dari jam berangkat dan jaga jam bangun tetap mirip di hari libur.",
          "Tiga jangkar (gerak, isi, arah) lebih kuat daripada sepuluh kebiasaan.",
          "Siapkan versi lima menit, dan jangan bolong dua kali berturut-turut.",
        ],
      ],
      ["h", "Bacaan lebih lanjut"],
      [
        "ul",
        [
          "BJ Fogg, Tiny Habits (2019), tentang kebiasaan kecil yang ditumpangkan pada jangkar.",
          'Lally dkk., "How are habits formed", European Journal of Social Psychology (2010).',
          'Hirshkowitz dkk., "National Sleep Foundation\'s sleep time duration recommendations", Sleep Health (2015).',
          "Till Roenneberg, Internal Time (2012), tentang kronotipe dan social jetlag.",
        ],
      ],
    ],
  },
];
