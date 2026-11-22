/**
 * "Berhenti Menunda Mulai Hari Ini", 9 bab (diperdalam: perfeksionisme, teman belajar dan janji bersama, kalau bukan hanya soal kebiasaan).
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: 20–35 tahun, mahasiswa tingkat akhir dan pekerja muda yang menunda tugas penting
 *   lalu menyimpulkan dirinya malas.
 * - Gagasan inti: menunda adalah cara menghindari perasaan tidak enak, bukan masalah malas atau
 *   manajemen waktu (Sirois & Pychyl, 2013). Kerangka buku: rumus Teori Motivasi Temporal
 *   (Steel, 2007) dengan empat tuas: keyakinan, nilai, gangguan, jarak tenggat. Bab 3, 5, dan 6 masing-
 *   masing menggeser tuasnya; Bab 9 menutup dengan memaafkan diri (Wohl dkk., 2010).
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
    title: "Kalau yang Ditakuti adalah Hasilnya Jelek",
    blocks: [
      '**Pukul 21.15.** Dinda sudah menulis satu halaman. Lalu dia membacanya ulang, menghapus semuanya, dan menutup laptop. "Kalau jelek begini, mending nggak usah dikumpulkan dulu."',
      "Bagi banyak orang, yang dihindari bukan pekerjaannya, tapi **penilaian atas hasilnya**. Selama belum dikerjakan, hasilnya masih bisa dibayangkan sempurna. Begitu dikerjakan, hasilnya bisa dinilai, termasuk oleh diri sendiri.",
      [
        "fact",
        "Tinjauan gabungan atas puluhan penelitian menemukan bahwa kekhawatiran perfeksionis, yaitu takut berbuat salah dan takut dinilai buruk, berkaitan dengan kebiasaan menunda yang lebih tinggi.",
        "Sirois, Molnar & Hirsch, European Journal of Personality, 2017",
      ],
      ["h", "Turunkan standar untuk versi pertama, bukan untuk hasil akhir"],
      [
        "ul",
        [
          '**Beri nama "draf jelek"** pada versi pertama. Tugasnya hanya ada, bukan bagus.',
          "**Pisahkan menulis dan menyunting** ke hari yang berbeda. Menyunting sambil menulis adalah cara paling cepat untuk berhenti menulis.",
          '**Tetapkan standar "cukup" sebelum mulai,** misalnya "bab 3 cukup kalau semua subbab terisi, walau kasar".',
          "**Tunjukkan lebih awal.** Dinda mengirim draf kasar ke dosen pembimbing lebih cepat dari biasanya. Komentarnya ternyata lebih ringan daripada yang dia bayangkan selama empat bulan.",
        ],
      ],
      [
        "tip",
        'Tanyakan: "Apa yang akan kukatakan pada adik tingkat yang menunjukkan draf pertamanya padaku?" Biasanya jauh lebih ramah daripada yang kita katakan pada diri sendiri.',
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
    title: "Teman Belajar dan Janji Bersama",
    blocks: [
      "**Pukul 13.00, Sabtu.** Dinda dan dua teman satu angkatan duduk di satu meja perpustakaan. Aturannya sederhana: 50 menit menulis tanpa bicara, 10 menit istirahat bersama. Dalam tiga sesi, Dinda menulis lebih banyak daripada selama seminggu sendirian.",
      "Bekerja di dekat orang lain yang juga sedang bekerja memberi dua hal yang sulit didapat sendirian: tenggat yang dekat, dan rasa malu yang sehat untuk membuka ponsel di depan teman yang serius menulis.",
      ["h", "Tiga bentuk janji bersama"],
      [
        "table",
        [
          ["Bentuk", "Cara", "Cocok untuk"],
          [
            "Duduk bareng",
            "Satu meja atau satu panggilan video, kamera menyala, mikrofon mati",
            "Tugas yang butuh fokus panjang",
          ],
          [
            "Setoran mingguan",
            "Setiap Jumat kirim hasil ke teman atau grup kecil",
            "Proyek panjang seperti skripsi atau laporan",
          ],
          [
            "Janji ke orang yang dihormati",
            "Sampaikan tanggal draf ke dosen atau atasan",
            "Saat tenggat resmi masih jauh",
          ],
        ],
      ],
      "Janji bersama bekerja karena menggeser tuas jarak: tenggat yang tadinya berbulan-bulan berubah menjadi hari Jumat ini.",
      [
        "warn",
        "Pilih teman yang benar-benar ingin bekerja. Kelompok yang berakhir mengobrol justru menjadi gangguan baru, walaupun terasa seperti belajar.",
      ],
    ],
  },
  {
    title: "Kalau Menunda Bukan Hanya Soal Kebiasaan",
    blocks: [
      "Sebagian besar penundaan bisa dikurangi dengan alat di buku ini. Tapi pada sebagian orang, kesulitan memulai adalah bagian dari sesuatu yang lebih besar.",
      ["h", "Tanda yang perlu diperhatikan"],
      [
        "ul",
        [
          "Sulit memulai dan menyelesaikan hampir semua hal sejak kecil, bukan hanya tugas tertentu, disertai mudah terdistraksi dan sering kehilangan barang.",
          "Kehilangan minat dan tenaga untuk hampir semua kegiatan, sedih berkepanjangan, atau merasa tidak berharga selama lebih dari dua minggu.",
          "Cemas yang sangat besar setiap kali membuka tugas, sampai berdebar, sesak, atau tidak bisa tidur.",
        ],
      ],
      "Tanda-tanda seperti ini bisa berkaitan dengan kondisi seperti gangguan pemusatan perhatian, depresi, atau gangguan kecemasan. Hanya tenaga profesional yang bisa memastikannya. Kabar baiknya, semuanya bisa ditangani, dan penanganannya sering membuat alat-alat di buku ini jauh lebih mudah dipakai.",
      [
        "info",
        "Mahasiswa bisa mulai dari layanan konseling kampus. Pekerja bisa bertanya ke dokter umum di puskesmas atau klinik, lalu dirujuk ke psikolog atau psikiater bila perlu.",
      ],
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
