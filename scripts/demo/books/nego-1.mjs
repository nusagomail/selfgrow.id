/**
 * "Berani Nego Gaji", 6 bab. Bentuk: satu tokoh, Raka (27, analis pemasaran), diikuti dari
 * tawaran Rp8 juta sampai kesepakatan; setiap bab dibuka dengan percakapan atau momen di
 * prosesnya. Pembaca menyiapkan negosiasinya sendiri di setiap bab. Angka gaji adalah ilustrasi.
 */
import { BALAS_HR, SELISIH_BARS } from "./nego-interactive.mjs";

export const NEGO_1 = [
  {
    title: "Sepuluh Detik yang Mahal",
    blocks: [
      'Telepon dari HR datang pukul empat sore. "Selamat, Mas Raka. Kami ingin menawarkan posisi Marketing Analyst dengan gaji Rp8 juta per bulan. Bagaimana?"',
      'Raka sudah menunggu telepon ini dua minggu. Jantungnya berdebar, dan dalam sepuluh detik dia menjawab: "Baik, Bu. Saya terima."',
      "Malamnya, seorang teman yang bekerja di bidang yang sama bercerita bahwa posisi serupa di perusahaan lain dibayar Rp9,5 sampai Rp11 juta. Raka tidak tahu. Dia tidak pernah mencari tahu. Dan dia tidak pernah bertanya.",
      ["h", "Kenapa selisih kecil itu besar"],
      "Selisih Rp1 juta per bulan terdengar kecil dibanding rasa lega mendapat pekerjaan. Tapi gaji tidak dibayar sekali. Ia dibayar setiap bulan, ditambah THR, dan setiap kenaikan tahunan biasanya dihitung dalam persen dari gaji yang sudah ada. Selisih di awal ikut naik setiap tahun.",
      ["chart", SELISIH_BARS],
      "Dalam lima tahun, sepuluh detik itu bernilai sekitar **Rp76 juta**. Dan itu belum menghitung pekerjaan berikutnya, yang tawarannya sering berpatokan pada gaji terakhirmu.",
      ["tool", "biaya-tidak-nego"],
      [
        "fact",
        "THR keagamaan wajib dibayarkan sebesar satu bulan upah bagi pekerja dengan masa kerja 12 bulan atau lebih, sehingga gaji pekerja tetap umumnya dibayar 13 kali setahun.",
        "Permenaker No. 6 Tahun 2016 tentang Tunjangan Hari Raya Keagamaan",
      ],
      ["h", "Menawar bukan tidak tahu terima kasih"],
      "Banyak dari kita dibesarkan dengan pesan bahwa membicarakan uang itu tidak sopan, apalagi kepada calon atasan. Padahal bagi perusahaan, negosiasi gaji adalah bagian biasa dari proses rekrutmen. Rentang anggaran untuk satu posisi hampir selalu punya ruang, dan tawaran pertama jarang berada di batas atasnya.",
      "Yang membuat negosiasi terasa tidak sopan biasanya bukan permintaannya, tapi caranya: tiba-tiba, tanpa alasan, atau dengan nada mengancam. Buku ini mengajarkan cara yang sebaliknya.",
      ["img", "lima-langkah", "Lima langkah yang akan kita jalani."],
      ["h", "Cek kesiapanmu"],
    ],
  },
  {
    title: "Langkah 1: Riset Angka Sebelum Bicara",
    blocks: [
      "Setahun kemudian, Raka mendapat panggilan wawancara dari perusahaan lain. Kali ini, sebelum wawancara pertama, dia membuka laptop dan mencari angka.",
      "Riset gaji tidak perlu sempurna. Tujuannya hanya satu: tahu **rentang yang wajar** untuk peran, pengalaman, dan kotamu, supaya angkamu berdiri di atas data, bukan perasaan.",
      ["h", "Tiga sumber, satu rentang"],
      [
        "ol",
        [
          "**Laporan gaji** dari situs lowongan kerja dan firma rekrutmen. Banyak yang menerbitkan rentang gaji per posisi setiap tahun.",
          "**Lowongan yang mencantumkan gaji.** Kumpulkan lima sampai sepuluh lowongan untuk posisi serupa di kotamu, lalu catat angkanya.",
          '**Orang yang bekerja di bidang yang sama.** Tanyakan rentang, bukan gaji pribadinya: "Untuk posisi seperti ini dengan pengalaman tiga tahun, kisaran wajarnya berapa?"',
        ],
      ],
      "Kalau ketiga sumber memberi angka yang berbeda, wajar. Ambil irisan yang paling sering muncul. Untuk Raka, ketiganya menunjuk ke **Rp9 juta sampai Rp11 juta**.",
      ["h", "Tiga angka yang harus kamu tulis"],
      [
        "table",
        [
          ["Angka", "Artinya", "Raka"],
          ["Target", "Angka yang kamu inginkan dan bisa kamu jelaskan", "Rp10,5 juta"],
          ["Batas bawah rentang", "Angka pertama yang kamu sebut", "Rp9,5 juta"],
          ["Batas terendah", "Di bawah ini kamu lebih baik menolak", "Rp9 juta"],
        ],
      ],
      ["img", "rentang-pasar", "Rentang pasar dan rentang yang diajukan Raka."],
      [
        "tip",
        "Tentukan batas terendah sebelum negosiasi, saat kepalamu masih dingin. Di tengah percakapan, rasa ingin cepat selesai bisa membuatmu menerima angka yang sebenarnya tidak kamu mau.",
      ],
      [
        "exercise",
        [
          "Kumpulkan minimal lima lowongan untuk posisimu yang mencantumkan gaji.",
          "Cari satu laporan gaji terbaru untuk bidangmu.",
          "Tanyakan rentang ke satu orang di bidang yang sama.",
          "Tulis tiga angkamu: target, batas bawah rentang, dan batas terendah.",
        ],
        "Lembar kerja: riset angka",
      ],
    ],
  },
  {
    title: "Langkah 2: Bukti yang Bisa Diucapkan",
    blocks: [
      '"Apa yang membuatmu layak dibayar di angka itu?"',
      'Pertanyaan ini bisa datang dari HR, bisa juga hanya dari kepalamu sendiri. Jawabannya bukan "karena saya pekerja keras". Semua orang mengatakan itu. Jawabannya adalah **bukti yang bisa diukur**.',
      ["img", "bukti-hasil", "Kerja, angka, dampak."],
      ["h", "Tiga bagian kalimat bukti"],
      [
        "ul",
        [
          "**Kerja**: apa yang kamu lakukan, dalam satu kalimat.",
          "**Angka**: apa yang berubah, dalam angka. Persen, rupiah, jumlah orang, waktu yang dihemat.",
          "**Dampak**: kenapa perubahan itu penting bagi perusahaan.",
        ],
      ],
      "Kalau pekerjaanmu sulit diukur, cari angka yang dekat: jumlah klien yang kamu tangani, berapa laporan yang kamu selesaikan lebih cepat, berapa keluhan yang berkurang, berapa orang yang kamu latih.",
      [
        "info",
        "Bukti bukan hanya untuk negosiasi gaji. Simpan catatan hasil kerjamu setiap bulan di satu dokumen. Saat penilaian kinerja atau wawancara berikutnya, kamu tidak perlu mengingat-ingat.",
      ],
      [
        "exercise",
        [
          "Tulis tiga pencapaian terbaikmu dalam setahun terakhir.",
          "Untuk masing-masing, tambahkan satu angka.",
          "Tulis dampaknya untuk perusahaan dalam satu kalimat.",
          "Baca ketiganya dengan suara keras. Yang paling mudah diucapkan, jadikan bukti utama.",
        ],
        "Lembar kerja: tiga bukti",
      ],
    ],
  },
  {
    title: "Langkah 3: Sebut Angka, Lalu Diam",
    blocks: [
      'Di wawancara kedua, HR bertanya: "Berapa gaji yang Mas Raka harapkan?"',
      "Ini momen yang paling ditakuti. Raka sudah berlatih. Dia menjawab dengan tenang, menyebut rentangnya, lalu berhenti bicara.",
      [
        "quote",
        "Berdasarkan riset gaji untuk peran dan pengalaman seperti ini, rentang yang saya harapkan Rp9,5 juta sampai Rp11 juta per bulan. Saya terbuka mendiskusikan paket secara keseluruhan.",
      ],
      ["h", "Kenapa rentang, dan kenapa batas bawahnya target"],
      "Angka pertama yang muncul dalam negosiasi cenderung menjadi patokan untuk sisa percakapan. Peneliti menyebutnya efek jangkar. Kalau kamu menyebut rentang, lawan bicara cenderung mendengar batas bawahnya. Karena itu, batas bawah rentangmu harus angka yang sudah memuaskanmu, bukan angka terendah yang masih kamu terima.",
      [
        "fact",
        "Dalam serangkaian eksperimen negosiasi, pihak yang mengajukan tawaran pertama cenderung mendapatkan hasil akhir yang lebih menguntungkan, karena tawaran pertama berfungsi sebagai jangkar.",
        "Galinsky & Mussweiler, Journal of Personality and Social Psychology, 2001",
      ],
      ["h", "Lalu, diam"],
      'Setelah menyebut angka, kebanyakan orang langsung menambahkan: "…tapi kalau terlalu tinggi, bisa disesuaikan kok." Kalimat itu menurunkan angkamu sendiri sebelum lawan bicara sempat menjawab.',
      "Hening tiga detik terasa seperti tiga menit. Biarkan saja. Hening adalah bagian normal dari percakapan, bukan tanda kamu salah bicara.",
      ["tool", "penyusun-kalimat-nego"],
      [
        "tip",
        "Latih kalimatmu dengan suara keras minimal tiga kali, idealnya di depan teman yang berpura-pura menjadi HR. Kalimat yang sudah pernah diucapkan jauh lebih mudah keluar saat gugup.",
      ],
    ],
  },
  {
    title: "Langkah 4: Saat HR Menjawab",
    blocks: [
      "Seminggu kemudian, tawaran tertulis datang: Rp9 juta. Di atas tawaran setahun lalu, tapi di bawah rentang yang Raka sebut.",
      "Ini titik di mana banyak orang menyerah dan langsung menerima. Padahal tawaran balik adalah tanda bahwa perusahaan sudah memilihmu. Pertanyaannya tinggal di angka berapa kalian bertemu.",
      ["img", "jawaban-hr", "Jawaban HR yang umum dan langkah balasannya."],
      ["h", "Kalau gaji pokok benar-benar mentok"],
      "Raka bertanya dengan sopan apakah ada ruang di gaji pokok. Jawabannya: anggaran posisi itu memang maksimal Rp9,5 juta. Raka lalu bertanya tentang bagian lain paket.",
      ["img", "paket-lain", "Yang bisa ditawar selain gaji pokok."],
      "Hasilnya: gaji pokok Rp9,5 juta, anggaran sertifikasi Rp5 juta di tahun pertama, dan tinjauan gaji setelah enam bulan, bukan setahun. Bukan target awalnya, tapi Rp1,5 juta per bulan lebih tinggi dari tawaran yang dulu dia terima dalam sepuluh detik.",
      [
        "warn",
        "Minta semua kesepakatan dalam bentuk tertulis, termasuk tunjangan dan tanggal tinjauan gaji. Janji lisan mudah terlupa saat orang yang menjanjikan sudah pindah bagian.",
      ],
      ["quiz", BALAS_HR],
      [
        "reflect",
        [
          "Bagian paket mana yang paling berarti untukmu selain gaji pokok?",
          "Di angka berapa kamu akan menolak dengan sopan, dan apakah kamu siap melakukannya?",
        ],
      ],
    ],
  },
  {
    title: "Minta Kenaikan di Kantor Sendiri",
    blocks: [
      "Negosiasi tidak hanya terjadi saat pindah kerja. Kesempatan yang lebih sering datang adalah meminta kenaikan di kantor sendiri, dan prinsipnya sama: angka, bukti, kalimat, lalu diam.",
      ["h", "Waktu yang tepat"],
      [
        "ul",
        [
          "Beberapa minggu sebelum siklus penilaian kinerja atau penyusunan anggaran, bukan sesudahnya.",
          "Setelah kamu menyelesaikan proyek yang hasilnya terlihat.",
          "Saat tanggung jawabmu sudah bertambah, tapi gajimu belum.",
        ],
      ],
      ["h", "Susunan percakapan"],
      [
        "ol",
        [
          'Minta waktu khusus: "Bu, boleh minta waktu 20 menit minggu ini untuk membicarakan perkembangan saya?"',
          "Buka dengan hasil kerja, bukan kebutuhan pribadi. Kenaikan biaya hidup itu nyata, tapi bukan alasan yang bisa disetujui atasan ke atasannya.",
          "Sebut rentangmu, lalu diam.",
          'Kalau jawabannya belum, tanyakan: "Apa yang perlu saya capai supaya ini bisa disetujui, dan kapan kita bisa membicarakannya lagi?" Catat jawabannya.',
        ],
      ],
      [
        "tip",
        "Kirim ringkasan percakapan lewat surel setelahnya: apa yang dibahas, apa targetnya, dan kapan akan ditinjau lagi. Ini mengubah janji lisan menjadi kesepakatan yang bisa ditagih dengan sopan.",
      ],
      [
        "summary",
        [
          "Selisih gaji kecil di awal menjadi besar karena dibayar 13 kali setahun dan ikut naik setiap tahun.",
          "Riset dari tiga sumber, lalu tulis target, batas bawah rentang, dan batas terendah.",
          "Bukti yang baik punya tiga bagian: kerja, angka, dampak.",
          "Sebut rentang yang batas bawahnya targetmu, lalu diam.",
          "Kalau gaji pokok mentok, tawar bagian lain paket, dan minta semuanya tertulis.",
        ],
      ],
      ["h", "Ulangi tesnya"],
      "Sebelum negosiasi berikutnya, kerjakan lagi tes kesiapan di Bab 1. Targetnya: enam dari enam.",
    ],
  },
];
