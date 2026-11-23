/**
 * "CV yang Dilirik Rekruter", 9 bab (diperdalam: lulusan baru, surat lamaran, melacak dan menindaklanjuti). Bentuk: satu tokoh, Sekar (25, staf pemasaran digital)
 * yang mengirim 40 lamaran tanpa panggilan, dan CV-nya diperbaiki bab demi bab seperti lembar
 * yang dikoreksi. Contoh perusahaan dan angka adalah ilustrasi.
 */
import { CEK_CV, LOLOS_MESIN } from "./cv-interactive.mjs";

export const CV_1 = [
  {
    title: "Empat Puluh Lamaran, Nol Panggilan",
    blocks: [
      "Dalam tiga bulan, Sekar sudah mengirim 40 lamaran. Dua puluh lewat situs lowongan, sepuluh lewat surel, sisanya lewat kenalan. Hasilnya: tiga balasan otomatis, nol panggilan wawancara.",
      "Sekar tidak kurang pengalaman. Dua tahun di bagian pemasaran digital, pernah memegang kampanye yang hasilnya bagus. Masalahnya, tidak satu pun dari itu terlihat di CV-nya.",
      ["h", "Waktu yang sangat singkat"],
      [
        "fact",
        "Dalam studi pelacakan mata, rekruter menghabiskan rata-rata 7,4 detik untuk pandangan pertama sebuah CV sebelum memutuskan membacanya lebih lanjut atau tidak. CV dengan tata letak sederhana, judul bagian yang jelas, dan kalimat pencapaian yang pendek mendapat perhatian lebih baik.",
        "Ladders, Eye-Tracking Study (2018)",
      ],
      ["img", "tujuh-detik", "Yang terbaca dalam tujuh detik pertama."],
      "Artinya, CV bukan riwayat hidup lengkap. CV adalah **iklan satu halaman** yang tugasnya hanya satu: membuat rekruter ingin memanggilmu untuk wawancara.",
      ["h", "Cek CV-mu sekarang"],
      ["quiz", CEK_CV],
    ],
  },
  {
    title: "Sepertiga Atas Halaman",
    blocks: [
      "Bagian paling berharga dari CV adalah sepertiga atas halaman pertama. Di sinilah tujuh detik itu dihabiskan.",
      ["h", "Yang wajib ada di sana"],
      [
        "ol",
        [
          "**Nama, posisi yang dilamar, kota, nomor HP, surel.** Tidak perlu foto kecuali diminta, tidak perlu tanggal lahir atau status pernikahan.",
          "**Ringkasan dua sampai tiga baris.** Siapa kamu, keahlian utama, dan satu pencapaian terbaik.",
          "**Pengalaman terbaru**, dengan jabatan yang ditebalkan.",
        ],
      ],
      ["h", "Ringkasan Sekar, sebelum dan sesudah"],
      [
        "table",
        [
          ["Sebelum", "Sesudah"],
          [
            "Saya adalah pribadi yang pekerja keras, mudah beradaptasi, dan senang belajar hal baru.",
            "Digital marketer dengan 2 tahun pengalaman di Meta Ads dan konten Instagram. Mengelola anggaran iklan Rp20 juta/bulan dan menaikkan pengikut toko 35% dalam 6 bulan.",
          ],
        ],
      ],
      [
        "tip",
        'Hapus kata sifat yang tidak bisa dibuktikan, seperti "pekerja keras" atau "bertanggung jawab". Ganti dengan fakta yang menunjukkan sifat itu.',
      ],
    ],
  },
  {
    title: "Tugas Bukan Pencapaian",
    blocks: [
      'Baris pengalaman Sekar dulu berbunyi: "Bertanggung jawab mengelola media sosial perusahaan." Kalimat itu benar, tapi bisa ditulis oleh semua orang yang pernah memegang media sosial, termasuk yang hasilnya buruk.',
      "Rekruter tidak mencari orang yang pernah diberi tugas. Mereka mencari orang yang **menghasilkan sesuatu** dari tugas itu.",
      ["img", "tugas-pencapaian", "Tiga baris yang diubah."],
      ["h", "Rumus satu baris"],
      ["quote", "Kata kerja + apa yang berubah + angka + caranya"],
      ["tool", "tugas-jadi-pencapaian"],
      [
        "info",
        'Tidak punya angka? Cari yang mendekati: jumlah orang yang kamu layani, berapa lama waktu yang dihemat, berapa proyek yang selesai, atau peringkat penilaian. Perkiraan yang jujur ("sekitar 200 pelanggan per bulan") lebih baik daripada tanpa angka.',
      ],
      [
        "exercise",
        [
          "Tulis ulang semua baris pengalamanmu dengan rumus di atas.",
          "Pastikan setiap posisi punya minimal dua baris yang memuat angka.",
          "Urutkan baris dari pencapaian terkuat ke yang paling biasa.",
        ],
        "Lembar kerja: tulis ulang pengalaman",
      ],
    ],
  },
  {
    title: "Belum Punya Pengalaman Kerja?",
    blocks: [
      'Adik Sekar, Bima, baru lulus kuliah teknik industri. Setelah membaca CV kakaknya yang sudah diperbaiki, dia mengeluh: "Aku kan belum pernah kerja. Apa yang mau ditulis?"',
      "Jawabannya: pengalaman tidak harus berupa pekerjaan bergaji. Rekruter yang membuka lowongan untuk lulusan baru tahu kamu belum punya riwayat kerja panjang. Yang mereka cari adalah **bukti bahwa kamu bisa menyelesaikan sesuatu**.",
      ["h", "Sumber pengalaman yang sering terlupa"],
      [
        "table",
        [
          ["Sumber", "Contoh baris pencapaian"],
          [
            "Magang",
            "Menyusun ulang tata letak gudang magang, memangkas waktu pengambilan barang dari 12 menjadi 8 menit",
          ],
          [
            "Organisasi kampus",
            "Menggalang dana Rp18 juta dari 14 sponsor untuk seminar 400 peserta sebagai ketua divisi dana",
          ],
          [
            "Tugas akhir atau proyek kuliah",
            "Menganalisis data antrean 3 bulan di klinik kampus dan mengusulkan jadwal yang memangkas antrean 25%",
          ],
          [
            "Usaha atau kerja lepas",
            "Menjual 300 kaus desain sendiri lewat media sosial dalam 4 bulan",
          ],
          [
            "Kegiatan sosial",
            "Mengajar matematika 20 anak di rumah belajar setiap Sabtu selama setahun",
          ],
        ],
      ],
      "Rumusnya tetap sama dengan Bab 3: kata kerja, apa yang berubah, angka, dan caranya. Bedanya hanya sumber ceritanya.",
      ["h", "Susunan CV lulusan baru"],
      [
        "ol",
        [
          "**Nama, posisi yang dilamar, kontak.**",
          "**Ringkasan dua baris** yang menyebut jurusan, satu keterampilan utama, dan satu pencapaian terbaik.",
          "**Pendidikan** naik ke atas, karena ini masih bagian terkuatmu. IPK cukup ditulis kalau 3,25 ke atas atau diminta.",
          "**Pengalaman**: magang, organisasi, dan proyek, diurutkan dari yang paling relevan dengan lowongan.",
          "**Keterampilan**: alat dan perangkat lunak yang benar-benar bisa kamu pakai.",
        ],
      ],
      [
        "warn",
        "Jangan memenuhi halaman dengan daftar sertifikat seminar atau pelatihan satu hari. Pilih dua atau tiga yang paling berkaitan dengan lowongan.",
      ],
    ],
  },
  {
    title: "Lolos Mesin, Dibaca Manusia",
    blocks: [
      "Banyak perusahaan memakai sistem pelacak lamaran (Applicant Tracking System, ATS) untuk menyimpan dan menyaring CV. Sistem ini membaca teks dari berkasmu. Kalau teksnya tidak terbaca, atau kata kuncinya tidak cocok, CV-mu bisa berada di urutan bawah sebelum dilihat manusia.",
      ["img", "ramah-ats", "Format yang aman untuk ATS."],
      ["quiz", LOLOS_MESIN],
      ["h", "Kata kunci"],
      "Kata kunci adalah keterampilan, alat, dan istilah yang tertulis di lowongan. Sekar menyalin lowongan yang dia incar, menandai istilah penting, lalu mencocokkannya dengan CV-nya.",
      ["img", "kata-kunci", "Lowongan dan CV berdampingan."],
      ["tool", "cek-kata-kunci-cv"],
      [
        "warn",
        "Jangan menulis keterampilan yang tidak kamu miliki hanya supaya lolos penyaringan. Wawancara akan menguji semua yang tertulis di CV.",
      ],
      [
        "template",
        "cv-ramah-ats",
        "CV Ramah ATS Satu Kolom",
        "Kerangka satu kolom tanpa tabel dan grafik, sudah berisi nama, kontak, dan posisi yang kamu lamar. Ada versi untuk lulusan baru.",
      ],
    ],
  },
  {
    title: "Satu CV Dasar, Banyak Versi",
    blocks: [
      "Kesalahan terbesar Sekar bukan isi CV-nya, tapi caranya mengirim: satu CV yang sama untuk 40 lowongan yang berbeda.",
      "Cara yang lebih efektif: siapkan **satu CV dasar** yang lengkap, lalu buat versi singkat yang disesuaikan untuk setiap lowongan. Penyesuaiannya tidak lama, cukup 15 sampai 20 menit:",
      [
        "ol",
        [
          "Ganti posisi yang dilamar di bagian atas.",
          "Sesuaikan ringkasan dengan dua kata kunci terpenting dari lowongan.",
          "Naikkan pencapaian yang paling relevan ke baris pertama setiap pengalaman.",
          "Hapus baris yang tidak relevan supaya tetap satu halaman.",
        ],
      ],
      "Dengan cara ini Sekar mengirim lebih sedikit lamaran, 12 dalam sebulan, tapi setiap lamaran lebih tepat sasaran. Hasilnya empat panggilan wawancara.",
      [
        "reflect",
        [
          "Lowongan mana yang benar-benar kamu inginkan, bukan sekadar bisa kamu lamar?",
          "Pencapaian mana yang paling ingin kamu ceritakan di wawancara nanti?",
        ],
      ],
    ],
  },
  {
    title: "Surat Lamaran yang Dibaca Sampai Habis",
    blocks: [
      'Sebelum memperbaiki caranya, Sekar mengirim lamaran lewat surel dengan subjek "Lamaran", badan surel kosong, dan lampiran bernama "CV.pdf". Bagi rekruter yang menerima ratusan surel, lamaran seperti itu mudah tenggelam.',
      "Badan surel adalah kesempatan pertama untuk membuat rekruter membuka lampiranmu. Tidak perlu panjang. Tiga paragraf pendek sudah cukup.",
      ["img", "surat-tiga-paragraf", "Surat lamaran tiga paragraf."],
      ["h", "Contoh milik Sekar"],
      "**Subjek:** Lamaran Digital Marketing Specialist – Sekar Ayu",
      "Selamat pagi, Tim Rekrutmen PT Contoh. Saya ingin melamar posisi Digital Marketing Specialist yang saya lihat di LinkedIn. Saya digital marketer dengan dua tahun pengalaman mengelola iklan Meta dan konten Instagram.",
      "Di posisi saya sekarang, saya mengelola anggaran iklan Rp20 juta per bulan dan menurunkan biaya per pelanggan baru sebesar 22% dalam enam bulan. Saya juga menaikkan pengikut toko 35% lewat seri konten edukasi produk, pengalaman yang menurut saya sesuai dengan target pertumbuhan yang disebut di lowongan.",
      "CV saya terlampir. Saya bersedia untuk wawancara pada waktu yang Bapak/Ibu tentukan, dan bisa dihubungi di 0812-xxxx-xxxx. Terima kasih atas waktunya.",
      [
        "tip",
        "Sebut satu hal dari lowongan atau perusahaan di paragraf kedua. Itu tanda kamu tidak mengirim surat yang sama ke semua tempat.",
      ],
    ],
  },
  {
    title: "Melacak Lamaran dan Menindaklanjuti",
    blocks: [
      "Setelah mengirim lamaran yang lebih sedikit tapi lebih tepat, Sekar menghadapi masalah baru: dia lupa melamar ke mana saja, kapan, dan dengan versi CV yang mana. Satu telepon dari HR membuatnya panik karena dia tidak ingat lowongannya.",
      ["h", "Satu tabel sederhana"],
      [
        "table",
        [
          ["Tanggal", "Perusahaan dan posisi", "Versi CV", "Lewat", "Status", "Tindak lanjut"],
          [
            "3 Mar",
            "PT Contoh · Digital Marketing",
            "v-ads",
            "LinkedIn",
            "Wawancara 12 Mar",
            "Siapkan 3 cerita pencapaian",
          ],
          [
            "5 Mar",
            "Toko Daring · Content Lead",
            "v-konten",
            "Surel",
            "Belum ada kabar",
            "Kirim tindak lanjut 15 Mar",
          ],
          [
            "8 Mar",
            "Agensi · Social Media",
            "v-konten",
            "Situs lowongan",
            "Ditolak",
            "Minta masukan singkat",
          ],
        ],
      ],
      'Tabel ini bisa dibuat di spreadsheet atau aplikasi catatan. Kolom "Versi CV" penting, karena kamu perlu tahu CV mana yang dibaca rekruter sebelum wawancara.',
      ["h", "Tindak lanjut yang sopan"],
      "Kalau belum ada kabar setelah sekitar satu sampai dua minggu dan kamu punya kontak yang jelas, satu pesan singkat masih wajar. Cukup sekali.",
      [
        "quote",
        "Selamat siang, Bu Rina. Saya Sekar, yang melamar posisi Content Lead pada 5 Maret. Saya masih sangat tertarik dengan posisi ini dan ingin menanyakan apakah prosesnya masih berjalan. Terima kasih.",
      ],
      [
        "reflect",
        [
          "Berapa lamaran yang benar-benar kamu ingat isinya minggu lalu?",
          "Versi CV mana yang paling sering membawa panggilan, dan apa bedanya dengan yang lain?",
        ],
      ],
    ],
  },
  {
    title: "Sebelum Menekan Kirim",
    blocks: [
      'CV yang bagus bisa gugur karena hal kecil: salah ketik di nama perusahaan, nomor HP yang tidak aktif, atau nama berkas "CV final revisi 3 (2).pdf".',
      ["img", "cek-sebelum-kirim", "Cek akhir."],
      [
        "tip",
        'Minta satu orang membaca CV-mu selama sepuluh detik, lalu tanyakan: "Aku ini siapa, dan apa keahlianku?" Kalau jawabannya belum tepat, sepertiga atas halamanmu perlu diperbaiki.',
      ],
      [
        "summary",
        [
          "Rekruter memberi waktu sangat singkat untuk pandangan pertama. Sepertiga atas halaman paling menentukan.",
          "Ganti kata sifat dengan fakta, dan tugas dengan pencapaian: kata kerja + apa yang berubah + angka + caranya.",
          "Pakai format satu kolom yang terbaca mesin, dan kata kunci yang sesuai lowongan.",
          "Satu CV dasar, disesuaikan 15–20 menit untuk setiap lowongan.",
          "Cek nama berkas, kontak, dan salah ketik sebelum mengirim.",
        ],
      ],
      ["h", "Cek ulang"],
      "Setelah memperbaiki CV-mu, kerjakan lagi kuis di Bab 1. Targetnya enam dari enam sebelum lamaran berikutnya dikirim.",
    ],
  },
];
