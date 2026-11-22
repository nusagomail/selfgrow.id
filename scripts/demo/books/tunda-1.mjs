/**
 * "Berhenti Menunda Mulai Hari Ini", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: 20–35 tahun, mahasiswa tingkat akhir dan pekerja muda yang menunda tugas penting
 *   lalu menyimpulkan dirinya malas.
 * - Gagasan inti: menunda adalah cara menghindari perasaan tidak enak, bukan masalah malas atau
 *   manajemen waktu (Sirois & Pychyl, 2013). Kerangka buku: rumus Teori Motivasi Temporal
 *   (Steel, 2007) dengan empat tuas: keyakinan, nilai, gangguan, jarak tenggat. Bab 3–5 masing-
 *   masing menggeser tuasnya; Bab 6 menutup dengan memaafkan diri (Wohl dkk., 2010).
 * - Bentuk: satu tokoh, Dinda (22, skripsi bab 3 tertunda empat bulan). Setiap bab dibuka dengan
 *   catatan jam dari harinya, jadi pembaca melihat polanya sendiri, bukan diceramahi.
 * - Gambar: panel mixer dengan empat fader, karena pesan bukunya "menunda itu pengaturan yang bisa
 *   digeser, bukan sifat tetap".
 * - Interaktif: kuis tanda menghindar, tool empat tuas (diagnosis), tool langkah dua menit (aksi).
 */
import { HARI_DINDA, PAGI_SETELAHNYA, TANDA_MENGHINDAR } from "./tunda-interactive.mjs";

export const TUNDA_1 = [
  {
    title: "Bukan Malas, tapi Menghindar",
    blocks: [
      "**Pukul 09.00.** Dinda tiba di perpustakaan. Hari ini, katanya, bab 3 harus dimulai.",
      '**09.12** Laptop terbuka. Dokumen skripsi terbuka. Kursor berkedip di halaman kosong berjudul "BAB III METODE PENELITIAN".',
      '**09.13** Ponsel. "Sebentar saja."',
      "**09.41** Masih ponsel.",
      "**10.05** Dinda merasa folder laptopnya terlalu berantakan untuk bekerja. Dia merapikannya.",
      "**11.30** Sudah membaca enam jurnal tentang metode penelitian. Belum menulis satu kalimat pun.",
      '**13.00** Pulang. Malamnya, sebelum tidur, satu kalimat berulang di kepalanya: "Aku memang pemalas."',
      ["chart", HARI_DINDA],
      ["h", "Kalau malas, kenapa ia sibuk sekali?"],
      "Lihat lagi catatan Dinda. Dia tidak diam. Dia membaca jurnal, merapikan folder, mengecek ponsel. Orang malas tidak melakukan semua itu. Yang dihindari Dinda bukan **pekerjaan**, tapi **perasaan** yang muncul saat menatap halaman kosong: takut tulisannya jelek, bingung harus mulai dari mana, cemas dosen pembimbing akan mencoret semuanya.",
      [
        "fact",
        "Penelitian psikologi memandang penundaan sebagai cara mengatur emosi dalam jangka pendek: kita memilih kegiatan lain untuk segera meredakan perasaan tidak nyaman, walaupun harus membayarnya nanti.",
        "Sirois & Pychyl, Social and Personality Psychology Compass, 2013",
      ],
      ["img", "lingkaran-menghindar", "Lingkaran yang membuat menunda terasa enak."],
      "Karena kabur membuat lega, otak belajar bahwa kabur adalah jalan keluar. Setiap kali diulang, lingkaran ini makin kuat. Kabar baiknya: lingkaran yang dipelajari bisa diputus.",
      ["h", "Kenali tandamu"],
      ["quiz", TANDA_MENGHINDAR],
    ],
  },
  {
    title: "Rumus di Balik Menunda",
    blocks: [
      '**Pukul 19.30.** Dinda membuka laptop di kamar kos dan menulis empat kalimat tentang kenapa bab 3 terasa berat. Untuk pertama kalinya, dia menulis tentang perasaannya, bukan tentang dirinya yang "malas".',
      "Seorang peneliti, Piers Steel, mengumpulkan ratusan penelitian tentang penundaan dan merangkumnya menjadi satu rumus sederhana. Rumus ini bukan untuk dihitung dengan kalkulator, tapi untuk menunjukkan **bagian mana yang bisa diubah**.",
      ["img", "rumus-menunda", "Empat tuas dorongan."],
      [
        "fact",
        "Teori Motivasi Temporal menjelaskan bahwa dorongan mengerjakan sesuatu naik bila kita yakin bisa berhasil dan hasilnya berarti, dan turun bila kita mudah tergoda dan hasilnya masih jauh di masa depan.",
        "Steel, Psychological Bulletin, 2007",
      ],
      ["h", "Membaca rumus Dinda"],
      [
        "table",
        [
          ["Tuas", "Untuk bab 3 Dinda", "Kondisinya"],
          ["Keyakinan", "Tidak yakin metodenya benar", "Rendah"],
          ["Nilai", "Ingin lulus, tapi menulisnya membosankan", "Sedang"],
          ["Gangguan", "Ponsel di samping laptop", "Tinggi"],
          ["Jarak", "Batas sidang masih lima bulan lagi", "Jauh"],
        ],
      ],
      "Tidak heran dorongannya hampir nol. Tapi Dinda tidak perlu mengubah keempatnya sekaligus. Cukup geser tuas yang paling lemah.",
      ["tool", "empat-tuas-menunda"],
      [
        "tip",
        "Pakai alat ini untuk satu tugas tertentu, bukan untuk hidupmu secara umum. Tuas yang lemah bisa berbeda untuk skripsi, laporan kantor, dan mengurus pajak.",
      ],
    ],
  },
  {
    title: "Tuas Keyakinan: Pecah Sampai Konyol",
    blocks: [
      "**Pukul 07.30.** Dinda membuat janji yang terdengar konyol: hari ini dia hanya akan menulis tiga judul subbab. Tidak lebih.",
      "**07.33** Selesai. Lalu, tanpa direncanakan, dia menulis satu paragraf di bawah judul pertama.",
      'Tugas besar terasa menakutkan karena otak tidak bisa melihat langkah pertamanya. "Kerjakan bab 3" bukan langkah; itu tujuan. Langkah adalah sesuatu yang bisa kamu mulai dalam dua menit, tanpa berpikir panjang.',
      ["img", "tangga-dua-menit", "Dari tugas raksasa ke langkah dua menit."],
      ["h", "Tiga cara menaikkan keyakinan"],
      [
        "ol",
        [
          "**Langkah dua menit.** Pecah sampai langkah pertama terasa terlalu mudah untuk ditolak.",
          "**Versi jelek pertama.** Izinkan dirimu menulis versi yang buruk. Memperbaiki tulisan jauh lebih mudah daripada menulis dari kertas kosong.",
          "**Lihat contoh yang sudah jadi.** Satu skripsi kakak tingkat, satu laporan rekan kerja. Melihat bahwa orang biasa bisa menyelesaikannya menurunkan rasa takut.",
        ],
      ],
      ["tool", "langkah-dua-menit"],
      [
        "info",
        "Langkah dua menit bukan trik untuk memaksa diri bekerja berjam-jam. Kalau setelah dua menit kamu berhenti, itu tetap berhasil. Kamu baru saja membuktikan pada otakmu bahwa membuka tugas itu tidak berbahaya.",
      ],
    ],
  },
  {
    title: "Tuas Nilai: Buat Tugasnya Berarti",
    blocks: [
      '**Pukul 16.00.** Dinda menempel satu kertas di atas layar laptop: foto ibunya di depan rumah, dengan tulisan tangan, "Wisuda Agustus".',
      "Tugas yang membosankan tidak akan berubah menjadi menyenangkan. Tapi nilainya bisa dinaikkan dengan dua cara: menyambungkannya ke alasan yang besar, atau menempelkannya pada hal kecil yang kamu sukai.",
      ["h", "Sambungkan ke alasan"],
      'Tanyakan "supaya apa?" sampai tiga kali. Menulis bab 3 supaya skripsi selesai. Skripsi selesai supaya bisa lulus. Lulus supaya bisa bekerja dan membantu orang tua. Alasan ketiga biasanya yang paling kuat, dan paling jarang diingat saat sedang menatap layar.',
      ["h", "Gabungkan dengan yang kamu sukai"],
      [
        "fact",
        "Dalam sebuah eksperimen, orang yang hanya boleh mendengarkan buku audio favoritnya saat berada di pusat kebugaran datang berolahraga lebih sering dibanding kelompok pembanding.",
        "Milkman, Minson & Volpp, Management Science, 2014",
      ],
      "Dinda melakukan versinya sendiri: kopi susu favoritnya hanya dibeli di hari dia menulis skripsi, dan playlist kesukaannya hanya diputar saat dokumen skripsi terbuka.",
      [
        "exercise",
        [
          'Tulis tugas yang kamu tunda, lalu tanyakan "supaya apa?" tiga kali.',
          "Pilih satu hal kecil yang kamu sukai dan hanya boleh dinikmati saat mengerjakan tugas itu.",
          "Tempel alasan ketigamu di tempat yang kamu lihat saat bekerja.",
        ],
        "Latihan: naikkan nilainya",
      ],
    ],
  },
  {
    title: "Tuas Gangguan dan Jarak",
    blocks: [
      "**Pukul 08.00.** Ponsel Dinda tinggal di loker perpustakaan. Satu jam kemudian, dua halaman selesai.",
      ["h", "Gangguan: jauhkan sebelum mulai"],
      "Menahan godaan saat godaan ada di depan mata itu melelahkan. Lebih mudah mengatur lingkungan supaya godaan tidak ada di sana sejak awal.",
      [
        "ul",
        [
          "**Ponsel di ruangan lain** atau di dalam tas, bukan di meja dengan layar terbalik.",
          "**Satu jendela, satu tab.** Tutup semua yang tidak berhubungan dengan tugas.",
          "**Tempat khusus.** Meja perpustakaan untuk skripsi, kasur untuk istirahat. Otak belajar mengasosiasikan tempat dengan kegiatannya.",
        ],
      ],
      ["h", "Jarak: dekatkan tenggatnya"],
      "Tenggat lima bulan lagi tidak terasa nyata. Tenggat hari Jumat terasa. Karena itu, pecah tenggat besar menjadi tenggat kecil yang dekat, dan buat tenggat itu terlihat oleh orang lain.",
      [
        "fact",
        "Dalam sebuah eksperimen, mahasiswa yang diberi tenggat bertahap dan merata untuk tugas-tugasnya bekerja lebih baik daripada yang hanya diberi satu tenggat di akhir. Tenggat yang dibuat sendiri juga membantu, walau tidak sebaik tenggat merata dari luar.",
        "Ariely & Wertenbroch, Psychological Science, 2002",
      ],
      "Dinda membuat kesepakatan dengan teman satu bimbingannya: setiap Jumat, masing-masing mengirim apa pun yang sudah ditulis minggu itu, sependek apa pun.",
      ["img", "empat-tuas", "Cara menggeser setiap tuas."],
    ],
  },
  {
    title: "Setelah Gagal, Maafkan, Lalu Mulai Dua Menit",
    blocks: [
      "**Minggu ketiga, Rabu.** Dinda menunda seharian. Tidak ada satu kalimat pun yang ditulis. Dulu, hari seperti ini akan menjadi awal dari minggu-minggu tanpa skripsi.",
      '**Pukul 21.00.** Kali ini dia menulis di catatannya: "Hari ini aku menghindar karena takut dicoret dosen besok. Wajar. Besok jam 07.30, dua menit saja."',
      ["img", "memaafkan-diri", "Dua jalan setelah menunda."],
      ["quiz", PAGI_SETELAHNYA],
      [
        "fact",
        "Mahasiswa yang memaafkan dirinya karena menunda belajar untuk ujian pertama, cenderung lebih sedikit menunda saat belajar untuk ujian berikutnya. Memaafkan diri membantu mengurangi perasaan negatif yang memicu penundaan.",
        "Wohl, Pychyl & Bennett, Personality and Individual Differences, 2010",
      ],
      "Memaafkan diri bukan berarti tidak peduli. Justru sebaliknya: kamu mengakui yang terjadi, memahami penyebabnya, lalu memilih langkah berikutnya, tanpa menambah beban perasaan yang membuat tugas makin dihindari.",
      [
        "reflect",
        [
          "Kalimat apa yang biasanya kamu ucapkan pada dirimu setelah menunda?",
          "Kalau sahabatmu yang menunda, kalimat apa yang akan kamu ucapkan kepadanya?",
        ],
      ],
      [
        "summary",
        [
          "Menunda adalah cara menghindari perasaan tidak enak, bukan tanda malas.",
          "Dorongan bergantung pada empat tuas: keyakinan, nilai, gangguan, dan jarak tenggat. Geser yang paling lemah.",
          "Keyakinan: pecah tugas sampai langkah pertama hanya dua menit.",
          "Nilai: sambungkan ke alasan besar dan gabungkan dengan hal kecil yang kamu sukai.",
          "Gangguan dan jarak: jauhkan godaan sebelum mulai, buat tenggat kecil yang dekat dan terlihat orang lain.",
          "Setelah gagal, maafkan diri, lalu mulai lagi dua menit.",
        ],
      ],
      [
        "info",
        "Kalau penundaan disertai sedih yang dalam, sulit tidur, atau perasaan tidak berharga yang berlangsung berminggu-minggu, bicarakan dengan konselor kampus, psikolog, atau tenaga kesehatan.",
      ],
    ],
  },
];
