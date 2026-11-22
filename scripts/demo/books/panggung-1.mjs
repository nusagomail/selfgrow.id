/**
 * "Bicara di Depan Umum Tanpa Gemetar", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: karyawan dan mahasiswa 20–35 tahun yang harus presentasi (rapat, sidang, acara kantor),
 *   jantungnya berdebar, suaranya bergetar, dan pikirannya kosong di tengah kalimat.
 * - Gagasan inti: tujuannya bukan menghilangkan gugup, tapi berhenti melawannya. Gugup lebih kecil
 *   di mata penonton daripada di kepala kita (efek lampu sorot, Gilovich dkk. 2000; ilusi
 *   transparansi, Savitsky & Gilovich 2003), bisa dibaca ulang sebagai semangat (Brooks 2014,
 *   dengan catatan replikasi), dan menjadi jinak kalau pikiran punya pegangan (kerangka) dan tubuh
 *   sudah pernah mengalaminya (latihan bersuara).
 * - Kerangka: tiga lapis gemetar. Badan (Bab 3), pikiran (Bab 2), materi (Bab 4–5); Bab 6 untuk
 *   hari H dan saat ada yang salah.
 * - Bentuk: hitung mundur. Raka (27, analis keuangan di Surabaya) harus mempresentasikan laporan
 *   kuartal ke direksi, 12 menit, sepuluh hari lagi. Setiap bab dibuka dengan "H-…".
 * - Gambar: panggung teater (tirai marun, lampu sorot, kartu catatan bertulisan tangan). Lampu
 *   sorot adalah metafora utama: terasa lebar dan terang, padahal kecil.
 * - Interaktif: kuis cek gemetar, grafik gugup Raka per latihan, tool pembagi waktu (angka) dan
 *   penyusun kartu presentasi (kata-kata).
 */
import { CEK_GEMETAR, LATIHAN_RAKA, MENIT_KEENAM } from "./panggung-interactive.mjs";

export const PANGGUNG_1 = [
  {
    title: "H-10: Undangan yang Membuat Perut Mulas",
    blocks: [
      'Hari Senin pagi, sebuah undangan rapat masuk ke kalender Raka: **"Paparan Kinerja Kuartal III, di depan Direksi. Pembicara: Raka. Durasi: 12 menit."**',
      "Raka langsung ingat presentasi terakhirnya, enam bulan lalu. Suaranya bergetar di kalimat pertama. Di slide keempat, pikirannya kosong. Dia membaca sisa slide kata demi kata sambil menatap layar, tidak sekali pun melihat ke arah penonton.",
      "Sejak itu, setiap kali ada kesempatan bicara, Raka menawarkan diri untuk menyiapkan bahannya saja. Kali ini tidak bisa. Namanya tertulis di undangan.",
      ["h", "Gugup itu normal, tapi bisa dijinakkan"],
      "Takut bicara di depan orang termasuk ketakutan yang paling umum. Kabar baiknya: kemampuan ini bisa dilatih seperti keterampilan lain. Buku ini tidak berjanji membuatmu tidak gugup sama sekali. Buku ini membuat gugupmu tidak lagi memegang kemudi.",
      "Kita akan menjinakkannya di tiga lapis:",
      [
        "ol",
        [
          "**Pikiran**: apa yang kamu kira dilihat orang (Bab 2).",
          "**Badan**: jantung berdebar, napas pendek, suara bergetar (Bab 3).",
          "**Materi**: kerangka dan latihan, supaya pikiranmu punya pegangan (Bab 4 dan 5).",
        ],
      ],
      ["h", "Cek dulu"],
      ["quiz", CEK_GEMETAR],
      [
        "info",
        "Kalau rasa takutmu sangat berat, misalnya sampai sering menghindari sekolah, pekerjaan, atau pertemuan sosial selama berbulan-bulan, itu bisa jadi gangguan kecemasan sosial. Bicarakan dengan psikolog atau dokter; kondisi ini bisa ditangani.",
      ],
    ],
  },
  {
    title: "H-8: Mereka Tidak Melihat Sebanyak yang Kamu Kira",
    blocks: [
      'Raka menceritakan ketakutannya pada Sinta, rekan kerjanya yang ikut rapat enam bulan lalu. "Waktu itu suaraku gemetar parah, kan?"',
      'Sinta berpikir sebentar. "Masa? Aku ingat kamu agak cepat bicaranya. Tapi gemetar? Nggak kelihatan."',
      "Raka tidak percaya. Padahal yang dialami Sinta adalah hal yang sangat umum.",
      ["h", "Efek lampu sorot"],
      ["img", "lampu-sorot", "Yang kamu rasakan dan yang sebenarnya."],
      [
        "fact",
        "Dalam sebuah eksperimen, mahasiswa diminta memakai kaus bergambar yang memalukan lalu masuk ke ruangan berisi mahasiswa lain. Mereka memperkirakan jauh lebih banyak orang yang memperhatikan kausnya daripada jumlah sebenarnya, kira-kira dua kali lipat.",
        "Gilovich, Medvec & Savitsky, Journal of Personality and Social Psychology, 2000",
      ],
      "Kita hidup di dalam kepala kita sendiri, jadi debaran jantung dan tangan dingin terasa sangat jelas. Penonton tidak bisa merasakannya. Mereka hanya melihat seseorang yang berdiri dan bicara, sambil sebagian memikirkan rapat berikutnya, pesan di ponsel, atau makan siang.",
      ["h", "Ilusi transparansi"],
      "Ada nama untuk keyakinan bahwa gugup kita terlihat jelas: **ilusi transparansi**. Menariknya, sekadar mengetahui ilusi ini sudah membantu.",
      [
        "fact",
        "Pembicara yang sebelum berpidato diberi tahu bahwa rasa gugup biasanya tidak setampak yang mereka kira, merasa lebih tenang dan pidatonya dinilai lebih baik oleh pengamat, dibanding pembicara yang hanya ditenangkan atau tidak diberi penjelasan apa pun.",
        "Savitsky & Gilovich, Journal of Experimental Social Psychology, 2003",
      ],
      [
        "tip",
        'Sebelum naik panggung, katakan pada dirimu: "Yang kurasakan jauh lebih besar dari yang mereka lihat." Itu bukan sugesti kosong; itu yang ditunjukkan penelitian.',
      ],
    ],
  },
  {
    title: "H-6: Gugup yang Diberi Nama Baru",
    blocks: [
      'Malam itu, saat membayangkan ruang rapat direksi, jantung Raka langsung berdebar. Dia mencoba menenangkan diri: "Tenang, tenang." Debarannya justru makin keras.',
      "Menyuruh tubuh yang sedang menyala untuk tiba-tiba tenang memang sulit. Ada jalan yang lebih mudah: **tidak mematikan nyalanya, tapi mengganti labelnya**.",
      ["img", "gugup-semangat", "Badan yang sama, dua cara membacanya."],
      [
        "fact",
        'Dalam eksperimen pidato, peserta yang sebelumnya mengucapkan "Aku bersemangat" dinilai lebih persuasif dan lebih percaya diri dibanding peserta yang mengucapkan "Aku tenang". Penelitian ulangan tahun 2025 menemukan rasa semangatnya tetap naik, tapi peningkatan penilaian penonton tidak selalu muncul.',
        "Brooks, Journal of Experimental Psychology: General, 2014",
      ],
      "Jadi pegang harapan yang wajar: mengganti label tidak membuat presentasimu tiba-tiba hebat. Tapi mengganti label membuat rasa di dadamu terasa seperti tenaga, bukan ancaman. Itu sudah cukup untuk melangkah ke depan ruangan.",
      ["h", "Napas yang memberi rem"],
      "Untuk tubuh, ada satu alat yang selalu tersedia: napas. Embusan yang lebih panjang daripada tarikan membantu memperlambat tubuh yang terlalu menyala.",
      [
        "exercise",
        [
          "Tarik napas lewat hidung selama empat hitungan.",
          "Embuskan pelan lewat mulut selama enam sampai delapan hitungan, seperti meniup lilin tanpa memadamkannya.",
          "Ulangi lima kali. Lakukan di kursi sebelum namamu dipanggil, tidak perlu ada yang tahu.",
        ],
        "Latihan: napas embusan panjang",
      ],
      [
        "tip",
        'Gabungkan keduanya. Setelah lima napas panjang, ucapkan dalam hati: "Aku bersemangat." Jangan berkata "Aku tidak gugup"; otakmu tahu itu tidak benar.',
      ],
    ],
  },
  {
    title: "H-4: Kerangka yang Menyelamatkan Saat Lupa",
    blocks: [
      "Raka membuka file presentasinya: 24 slide, penuh tabel dan angka. Dia sadar kenapa pikirannya kosong enam bulan lalu. Tidak ada jalan pulang. Kalau satu slide terlupa, seluruh urutan ikut hilang.",
      "Pikiran yang gugup butuh **pegangan yang sederhana**, bukan naskah yang panjang. Naskah harus dihafal kata demi kata; begitu satu kata hilang, semuanya runtuh. Kerangka cukup diingat urutannya.",
      ["h", "Satu pesan, tiga poin"],
      [
        "ol",
        [
          "**Satu pesan utama.** Kalau penonton hanya mengingat satu kalimat, kalimat apa itu? Tulis dalam satu tarikan napas.",
          "**Tiga poin pendukung.** Tiga mudah diingat, olehmu dan oleh penonton.",
          "**Pembuka** yang langsung menyebut masalah atau angka penting, bukan perkenalan panjang.",
          "**Penutup** yang meminta sesuatu: keputusan, persetujuan, atau langkah berikutnya.",
        ],
      ],
      ["img", "kartu-kerangka", "Kartu Raka."],
      "Ke-24 slide Raka menyusut menjadi sembilan. Tabel yang lengkap dipindah ke lampiran. Kalau direksi bertanya, datanya ada; kalau tidak, waktunya tidak habis untuk membaca angka.",
      ["tool", "kartu-presentasi"],
      ["h", "Bagi waktunya"],
      "Dua belas menit terasa lama sampai kamu mulai bicara. Bagi waktunya sejak awal, supaya kamu tahu kapan harus pindah poin.",
      ["tool", "durasi-bicara"],
    ],
  },
  {
    title: "H-2: Latihan yang Benar-Benar Latihan",
    blocks: [
      "Selama ini, latihan Raka adalah membuka slide di laptop dan membacanya dalam hati. Rasanya sudah siap. Lalu di depan orang, kalimat yang lancar di kepala ternyata macet di mulut.",
      "Membaca dalam hati dan berbicara dengan suara adalah dua kegiatan yang berbeda. Hanya yang kedua yang benar-benar latihan.",
      ["img", "tangga-latihan", "Enam anak tangga latihan."],
      "Naiki tangganya satu per satu. Setiap anak tangga sedikit lebih mirip hari H, sehingga tubuhmu terbiasa sedikit demi sedikit.",
      ["chart", LATIHAN_RAKA],
      "Gugup Raka tidak hilang. Di latihan kelima pun dia masih merasakan debaran. Bedanya, debaran itu sudah dikenalnya. Tubuh yang sudah pernah mengalami sesuatu tidak lagi bereaksi seolah itu bahaya baru.",
      ["h", "Saat merekam diri sendiri"],
      [
        "ul",
        [
          "Tonton sekali saja, lalu catat dua hal yang ingin diperbaiki. Jangan lebih.",
          'Perhatikan kata pengisi seperti "eee" dan "jadi". Jeda diam lebih baik daripada kata pengisi.',
          "Lihat apakah kamu menatap layar atau penonton.",
          "Ingat efek lampu sorot: kamu akan menilai dirimu lebih keras daripada penonton.",
        ],
      ],
    ],
  },
  {
    title: "Hari H: Saat Ada yang Salah",
    blocks: [
      'Pukul 10.40, nama Raka dipanggil. Jantungnya berdebar. Dia sudah menarik lima napas panjang di kursinya. "Aku bersemangat," katanya dalam hati, lalu berjalan ke depan.',
      "Di menit keenam, seorang direktur memotong dengan pertanyaan yang tidak ada di persiapannya. Sesaat pikirannya kosong. Raka melihat kartunya, lalu mengucapkan kalimat yang sudah dia siapkan.",
      ["img", "kalimat-penyelamat", "Kalimat penyelamat."],
      ["quiz", MENIT_KEENAM],
      "Hal yang salah hampir pasti terjadi, sekecil apa pun: proyektor lambat, pertanyaan mendadak, satu kalimat yang tersangkut. Yang membedakan pembicara yang percaya diri bukanlah tidak ada yang salah, tapi mereka sudah punya kalimat untuk melanjutkan.",
      ["h", "Lima menit sebelum mulai"],
      [
        "ol",
        [
          "Taruh kartu kerangka di tempat yang mudah dilihat.",
          "Lima napas embusan panjang.",
          'Katakan dalam hati: "Aku bersemangat. Yang kurasakan lebih besar dari yang mereka lihat."',
          "Ucapkan kalimat pertamamu sedikit lebih lambat dari biasanya.",
          "Cari satu wajah yang ramah di ruangan, dan bicaralah padanya lebih dulu.",
        ],
      ],
      'Presentasi Raka tidak sempurna. Tapi setelah rapat, direktur keuangan menyetujui rencana tiga bulannya, dan Sinta mengirim pesan: "Tadi bagus. Tenang banget kelihatannya." Raka tertawa. Dia ingat lampu sorot yang kecil itu.',
      [
        "reflect",
        [
          "Kesempatan bicara apa yang selama ini kamu hindari karena takut gemetar?",
          "Kapan kesempatan bicara berikutnya, dan anak tangga latihan mana yang akan kamu mulai minggu ini?",
        ],
      ],
      [
        "summary",
        [
          "Tujuannya bukan tidak gugup, tapi gugup yang tidak memegang kemudi.",
          "Penonton melihat gugupmu jauh lebih sedikit dari yang kamu rasakan (efek lampu sorot dan ilusi transparansi).",
          'Ganti label "cemas" menjadi "bersemangat", dan pakai napas embusan panjang untuk memberi rem.',
          "Pegang satu pesan utama dan tiga poin di satu kartu, bukan naskah.",
          "Latihan berarti bicara dengan suara: naiki tangganya dari sendirian sampai simulasi.",
          "Siapkan kalimat penyelamat untuk lupa, pertanyaan sulit, dan alat yang mati.",
        ],
      ],
    ],
  },
];
