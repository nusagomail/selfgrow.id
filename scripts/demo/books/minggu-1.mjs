/**
 * "Seminggu dalam Satu Jam", 6 bab. Bentuk: buku resep ritual. Tokoh Tari (31, koordinator
 * proyek) muncul sebagai contoh di setiap bagian ritual; bab 2–4 masing-masing satu bagian
 * ritual, dikerjakan pembaca langsung. Angka jam Tari adalah ilustrasi.
 */
import { KENDALI_MINGGU, MINGGU_BARS } from "./minggu-interactive.mjs";

export const MINGGU_1 = [
  {
    title: "Minggu yang Dikendalikan Kotak Masuk",
    blocks: [
      "Senin, 08.05. Tari membuka laptop dan langsung disambut 47 surel, 12 grup percakapan yang berkedip, dan undangan rapat jam sembilan yang baru masuk tadi malam. Pukul sebelas, dia sadar belum menyentuh laporan klien yang tenggatnya Jumat.",
      "Jumat malam, laporan itu dia kerjakan di rumah sampai pukul satu dini hari. Minggu depannya, polanya berulang.",
      "Tari bukan orang yang malas atau tidak teratur. Dia hanya tidak pernah punya waktu untuk **memutuskan minggunya sendiri**, sehingga minggunya diputuskan oleh siapa pun yang paling cepat mengirim pesan.",
      ["h", "Ke mana waktunya pergi"],
      "Atas saran temannya, Tari mencatat waktunya selama satu minggu, setiap jam. Hasilnya mengejutkan.",
      ["chart", MINGGU_BARS],
      "Hanya 7 dari 40 jam yang dipakai untuk pekerjaan yang paling menentukan penilaian kinerjanya. Sisanya habis untuk merespons.",
      ["h", "Satu jam yang mengubah enam hari lainnya"],
      "Buku ini mengajarkan satu ritual: **satu jam setiap minggu untuk merencanakan minggu berikutnya**. Bukan aplikasi baru, bukan sistem rumit. Hanya satu jam, di waktu yang sama setiap minggu, dengan lima bagian yang jelas.",
      ["img", "ritual-60", "Lima bagian ritual satu jam."],
      ["h", "Siapa yang memegang kemudi?"],
      ["quiz", KENDALI_MINGGU],
    ],
  },
  {
    title: "Bagian 1–2: Kosongkan Kepala, Tinjau Minggu Lalu",
    blocks: [
      "Minggu sore pertama, Tari duduk dengan secangkir teh, selembar kertas, dan timer 15 menit. Instruksinya sederhana: tulis semua yang ada di kepala.",
      ["h", "Kosongkan kepala (15 menit)"],
      "Tulis semuanya tanpa menyaring: pekerjaan kantor, janji yang belum ditepati, tagihan yang harus dibayar, hadiah ulang tahun ibu, ide yang terlintas di jalan. Satu baris untuk satu hal.",
      "Pikiran yang menyimpan banyak urusan yang belum selesai cenderung terus mengingatkan kita pada urusan itu, sering di saat yang tidak tepat. Menuliskannya, lengkap dengan rencana kapan akan dikerjakan, membantu pikiran melepaskannya.",
      [
        "tip",
        "Buka kalender minggu lalu dan minggu depan saat menulis. Rapat yang sudah lewat sering mengingatkan pada tindak lanjut yang belum dikerjakan.",
      ],
      ["h", "Tinjau minggu lalu (10 menit)"],
      ["img", "tinjauan-mingguan", "Tiga pertanyaan tinjauan."],
      "Tari menjawab pertanyaan kedua dengan jujur: laporan klien tidak selesai bukan karena sulit, tapi karena tidak pernah punya jam khusus di kalender. Itu satu perubahan yang dia pilih untuk minggu ini.",
      [
        "exercise",
        [
          "Siapkan timer 15 menit dan tulis semua yang ada di kepalamu.",
          "Jawab tiga pertanyaan tinjauan untuk minggu lalu.",
          "Pilih satu perubahan untuk minggu depan.",
        ],
        "Lembar kerja: 25 menit pertama",
      ],
    ],
  },
  {
    title: "Bagian 3: Pilih Tiga Batu Besar",
    blocks: [
      "Daftar Tari berisi 38 baris. Tidak mungkin semuanya selesai dalam satu minggu, dan memang tidak perlu.",
      ["img", "batu-besar", "Batu besar, kerikil, dan pasir."],
      ["h", "Cara memilih"],
      "Dari daftar, pilih tiga pekerjaan yang paling menentukan. Pertanyaan yang membantu:",
      [
        "ul",
        [
          "Kalau minggu ini hanya tiga hal yang selesai, mana yang membuatku merasa minggu ini berhasil?",
          "Mana yang paling berdampak pada target bulan ini atau penilaian kinerjaku?",
          "Mana yang sudah tertunda paling lama dan terus mengganggu pikiranku?",
        ],
      ],
      "Batu besar Tari minggu itu: laporan klien, rencana kuartal pertama, dan sesi pelatihan untuk anggota tim baru.",
      ["h", "Berapa yang muat?"],
      "Sebelum memilih, hitung dulu berapa jam fokus yang benar-benar kamu punya. Rapat yang sudah terjadwal tidak bisa diabaikan.",
      ["tool", "kapasitas-minggu"],
      [
        "info",
        "Batu besar tidak harus pekerjaan kantor. Olahraga tiga kali, makan malam bersama keluarga, atau menyelesaikan kursus juga bisa menjadi batu besar, asal kamu memutuskannya dengan sengaja.",
      ],
    ],
  },
  {
    title: "Bagian 4–5: Pasang di Kalender, Cek Akhir",
    blocks: [
      "Daftar batu besar yang hanya ditulis di kertas akan kalah oleh undangan rapat yang masuk Senin pagi. Karena itu, langkah terpenting dari ritual ini adalah **memasang batu besar di kalender** sebagai janji temu dengan dirimu sendiri.",
      ["img", "kalender-tari", "Kalender Tari setelah ritual."],
      ["h", "Tiga aturan memasang"],
      [
        "ol",
        [
          "**Batu besar dulu.** Pasang di jam ketika pikiranmu paling segar, biasanya pagi hari, sebelum kerikil masuk.",
          "**Perkirakan dengan jujur.** Pekerjaan hampir selalu butuh waktu lebih lama dari dugaan. Kalikan perkiraanmu sebelum menjadwalkan.",
          "**Sisakan cadangan sekitar 20%.** Sebar di beberapa hari, bukan ditumpuk di Jumat sore.",
        ],
      ],
      [
        "fact",
        "Dalam serangkaian penelitian, orang secara konsisten meremehkan waktu yang mereka butuhkan untuk menyelesaikan pekerjaan, bahkan ketika mereka tahu pekerjaan serupa di masa lalu selesai terlambat. Fenomena ini disebut planning fallacy.",
        "Buehler, Griffin & Ross, Journal of Personality and Social Psychology, 1994",
      ],
      ["tool", "pengali-estimasi"],
      ["h", "Cek akhir (5 menit)"],
      "Lihat kalendermu sekali lagi dan tanyakan: kalau minggu ini berjalan persis seperti ini, apakah aku akan puas? Kalau jawabannya tidak, ubah sekarang, bukan Rabu sore.",
      [
        "exercise",
        [
          "Pasang tiga batu besar di kalender, lengkap dengan nama pekerjaannya.",
          "Tambahkan slot cadangan di tiga hari berbeda.",
          "Baca ulang kalendermu dan pastikan tidak ada hari yang penuh dari pagi sampai sore.",
        ],
        "Lembar kerja: 25 menit terakhir",
      ],
    ],
  },
  {
    title: "Saat Minggu Tidak Berjalan Sesuai Rencana",
    blocks: [
      "Rabu minggu pertama, klien terbesar Tari meminta rapat mendadak tepat di jam rencana kuartal. Tari hampir menerimanya tanpa berpikir, lalu ingat satu kalimat yang dia tulis Minggu sore.",
      ["img", "jika-maka", "Keputusan yang dibuat di hari tenang."],
      "Rencana jika–maka bekerja karena keputusannya sudah diambil sebelumnya. Di tengah hari yang sibuk, kamu tidak perlu menimbang ulang; kamu hanya menjalankan apa yang sudah diputuskan.",
      [
        "fact",
        "Analisis gabungan terhadap 94 penelitian menemukan bahwa merumuskan rencana dalam bentuk jika–maka (implementation intentions) memberi pengaruh sedang sampai besar terhadap tercapainya tujuan.",
        "Gollwitzer & Sheeran, Advances in Experimental Social Psychology, 2006",
      ],
      ["h", "Minggu yang berantakan tetap butuh ritual"],
      "Ada minggu yang hancur sejak Senin: anak sakit, atasan cuti, proyek mendadak. Di minggu seperti itu, godaannya adalah melewatkan ritual. Justru di minggu itulah ritual paling dibutuhkan, walau versinya dipendekkan: 15 menit, satu batu besar, satu slot cadangan.",
      [
        "reflect",
        [
          "Situasi apa yang paling sering merusak rencanamu?",
          "Rencana jika–maka apa yang akan kamu tulis untuk situasi itu?",
        ],
      ],
    ],
  },
  {
    title: "Ritual yang Bertahan",
    blocks: [
      "Delapan minggu kemudian, catatan waktu Tari berubah. Rapat masih ada, pesan masih masuk. Tapi pekerjaan penting kini mendapat sekitar 15 jam seminggu, dan Jumat malamnya kembali menjadi milik dirinya sendiri.",
      "Yang membuat ritual ini bertahan bukan motivasi, tapi beberapa kebiasaan kecil:",
      [
        "table",
        [
          ["Kebiasaan", "Kenapa membantu"],
          [
            "Jam dan tempat yang sama setiap minggu",
            "Tidak perlu memutuskan ulang kapan merencanakan",
          ],
          ["Satu dokumen yang sama", "Minggu lalu selalu bisa dilihat kembali"],
          ["Teh atau kopi favorit", "Ritual terasa sebagai hadiah, bukan beban"],
          ["Pengingat di kalender", "Ritual ini juga sebuah janji temu"],
        ],
      ],
      [
        "tip",
        "Kalau satu jam terasa berat di awal, mulai dengan 30 menit: 10 menit mengosongkan kepala, 5 menit tinjauan, 15 menit memasang batu besar. Tambah waktunya setelah ritual terasa biasa.",
      ],
      [
        "summary",
        [
          "Minggu yang tidak direncanakan akan direncanakan oleh orang lain.",
          "Ritual satu jam: kosongkan kepala, tinjau minggu lalu, pilih tiga batu besar, pasang di kalender, cek akhir.",
          "Batu besar dipasang lebih dulu, di jam terbaikmu.",
          "Perkiraan waktu hampir selalu terlalu optimis; kalikan, dan sisakan cadangan sekitar 20%.",
          "Tulis rencana jika–maka untuk gangguan yang paling sering terjadi.",
        ],
      ],
      ["h", "Ukur ulang"],
      "Setelah empat minggu menjalankan ritual, kerjakan lagi kuis di Bab 1. Lihat apakah kemudi minggumu sudah lebih sering kamu pegang sendiri.",
    ],
  },
];
