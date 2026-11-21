/** "Lepas dari Jerat Paylater" bab 8–10. Lihat paylater-1.mjs. */
import { SKOR_JERAT } from "./paylater-interactive.mjs";

export const PAYLATER_3 = [
  {
    title: "Kalau Sudah Telat Bayar",
    blocks: [
      "Tidak semua pembaca buku ini berada di posisi Nadia. Sebagian mungkin sudah lewat beberapa minggu dari jatuh tempo. Ada yang ponselnya terus berdering, ada yang takut membuka pesan, ada yang sudah tidak bisa tidur nyenyak.",
      "Kalau itu kamu, bab ini untukmu. Dan hal pertama yang perlu kamu dengar: situasimu sulit, tapi bukan akhir dari segalanya. Banyak orang pernah berada di sana dan berhasil keluar.",
      ["h", "Apa yang terjadi saat telat bayar"],
      "Supaya tidak menebak-nebak, mari kita lihat apa yang biasanya terjadi, dari yang paling ringan:",
      [
        "ol",
        [
          "**Denda keterlambatan.** Biasanya dihitung per hari atau per bulan, sesuai syarat yang kamu setujui. Semakin lama, semakin besar.",
          "**Tercatat di SLIK.** Lembaga keuangan resmi melaporkan status pembayaranmu. Keterlambatan yang lama bisa menurunkan kualitas kreditmu dan menyulitkan pengajuan kredit di masa depan.",
          "**Penagihan.** Mulai dari pengingat lewat aplikasi, pesan, telepon, hingga kunjungan petugas penagihan.",
          "**Layanan ditutup.** Limit paylater dibekukan dan akun bisa ditutup sampai utang diselesaikan.",
        ],
      ],
      "Yang perlu kamu tahu: ada aturan perlindungan konsumen dari OJK yang mengatur cara penagihan oleh lembaga resmi. Penagihan tidak boleh dilakukan dengan ancaman, kekerasan, kata-kata yang mempermalukan, atau menghubungi orang lain yang tidak terkait untuk menekanmu. Kamu tetap wajib membayar utangmu, tapi kamu juga berhak diperlakukan dengan layak.",
      ["h", "Jangan menghilang"],
      "Reaksi paling alami saat telat bayar adalah menghindar: tidak mengangkat telepon, tidak membaca pesan, berharap masalahnya reda sendiri. Sayangnya, yang terjadi justru sebaliknya. Denda bertambah, penagihan semakin sering, dan pilihan penyelesaian semakin sedikit.",
      [
        "quote",
        "Ada hal-hal yang berada dalam kendali kita, dan ada yang tidak.",
        "Epiktetos, Enchiridion",
      ],
      "Filsuf Stoa itu mengajarkan untuk memisahkan dua hal tersebut. Kamu tidak bisa mengendalikan denda yang sudah terjadi atau sikap penagih. Yang bisa kamu kendalikan: menghubungi pemberi pinjaman lebih dulu, berkata jujur, dan membayar apa yang sanggup kamu bayar. Fokus pada bagian itu, dan beban di kepala akan terasa lebih ringan.",
      "Lembaga keuangan resmi umumnya lebih terbuka bernegosiasi dengan nasabah yang datang lebih dulu, sebelum menunggak berbulan-bulan. Dari sisi mereka, nasabah yang membayar sedikit demi sedikit jauh lebih baik daripada nasabah yang menghilang.",
      ["h", "Cara menghubungi dan bernegosiasi"],
      "Hubungi layanan pelanggan resmi lewat aplikasi atau nomor yang tertera di situs resminya. Jelaskan kondisimu dengan jujur dan singkat. Tanyakan pilihan yang tersedia, misalnya perpanjangan tenor, keringanan denda, atau penjadwalan ulang pembayaran. Istilah resminya sering disebut restrukturisasi.",
      "Kalau bingung harus berkata apa, kamu bisa memakai contoh pesan ini dan menyesuaikannya:",
      [
        "quote",
        "Selamat siang. Saya [nama], pemilik akun [nomor/email]. Saya terlambat membayar cicilan karena [alasan singkat, misalnya: biaya berobat keluarga]. Saya ingin menyelesaikan kewajiban saya. Saat ini kemampuan saya membayar sekitar Rp[jumlah] per bulan. Apakah ada pilihan penjadwalan ulang atau keringanan denda yang bisa saya ajukan? Terima kasih.",
      ],
      [
        "ul",
        [
          "Simpan semua bukti percakapan dan pembayaran.",
          "Jangan menjanjikan jumlah yang tidak sanggup kamu bayar. Lebih baik kecil tapi konsisten.",
          "Minta kesepakatan tertulis, termasuk sisa utang dan jadwal barunya.",
          "Jangan menutup satu utang dengan meminjam di tempat lain.",
        ],
      ],
      [
        "tip",
        "Kalau ada beberapa utang yang telat sekaligus, dahulukan yang dendanya paling besar dan yang berdampak langsung pada kebutuhan pokok, misalnya cicilan kendaraan yang dipakai untuk bekerja.",
      ],
      ["h", "Waspada pinjol ilegal"],
      'Di saat terdesak, tawaran pinjaman cepat terasa seperti jalan keluar. Pesan masuk tanpa diminta: "Dana cair 10 menit, tanpa BI checking." Inilah saat paling berbahaya.',
      "Pinjaman online ilegal tidak diawasi siapa pun. Bunganya bisa sangat tinggi, tenornya sangat pendek, dan cara penagihannya sering melanggar hukum, termasuk menyebarkan data pribadi ke kontak di ponselmu.",
      ["img", "rambu-pinjol", 'Kenali tanda-tandanya sebelum menekan "setuju".'],
      "Sebelum meminjam di mana pun, pastikan penyelenggaranya terdaftar dan berizin di OJK. Kamu bisa mengecek daftarnya di situs resmi OJK atau bertanya ke Kontak OJK 157. Kalau kamu sudah terlanjur berurusan dengan pinjol ilegal dan mengalami teror penagihan, laporkan ke Kontak OJK 157, Satgas PASTI, atau kepolisian. Simpan semua bukti ancaman yang kamu terima.",
      [
        "warn",
        "Jangan pernah memberikan foto KTP, swafoto, atau akses kontak ke aplikasi pinjaman yang tidak jelas izinnya. Data itu bisa disalahgunakan bertahun-tahun kemudian.",
      ],
      ["h", "Merawat diri di tengah tekanan"],
      "Utang yang menumpuk bukan hanya masalah keuangan. Ia menguras pikiran dan perasaan. Kalau kamu sulit tidur, kehilangan nafsu makan, atau terus-menerus merasa tidak berharga, itu tanda kamu butuh dukungan. Bicaralah dengan orang yang kamu percaya. Kalau perasaan itu sangat berat, mencari bantuan tenaga profesional seperti psikolog adalah langkah yang berani, bukan tanda lemah.",
      ["quote", "Utangmu adalah sesuatu yang kamu punya, bukan siapa dirimu."],
      [
        "reflect",
        [
          "Apa yang selama ini membuatmu menghindar dari tagihan: malu, takut, atau tidak tahu harus berkata apa?",
          "Siapa yang bisa kamu hubungi hari ini untuk mulai menyelesaikannya?",
        ],
      ],
      [
        "summary",
        [
          "Jangan menghilang. Pemberi pinjaman resmi lebih terbuka pada nasabah yang datang lebih dulu.",
          "Minta kesepakatan tertulis dan jangan menutup utang dengan utang baru.",
          "Satu tanda pinjol ilegal saja sudah cukup untuk tidak meminjam.",
        ],
      ],
      [
        "exercise",
        [
          "Kalau ada yang telat, hubungi layanan resminya minggu ini dengan contoh pesan di atas.",
          "Pastikan semua pemberi pinjamanmu terdaftar di OJK.",
          "Simpan nomor Kontak OJK 157 di ponselmu.",
        ],
        "Tugas Bab 8",
      ],
    ],
  },
  {
    title: "Paylater yang Sehat, Kalau Memang Mau Dipakai",
    blocks: [
      "Setelah semua cerita di buku ini, mungkin kamu berpikir jawabannya sederhana: jangan pernah pakai paylater lagi. Untuk sebagian orang, itu memang pilihan terbaik, terutama di tahun pertama setelah bebas utang.",
      "Tapi buku ini tidak ingin menjadi buku larangan. Paylater adalah alat. Seperti pisau di dapur, ia bisa berguna di tangan yang terlatih dan berbahaya di tangan yang terburu-buru. Bab ini membahas bagaimana memakainya dengan sadar, kalau kamu memang memutuskan untuk memakainya.",
      ["h", "Kapan paylater masuk akal"],
      "Ada beberapa situasi di mana paylater bisa membantu, dengan syarat semuanya terpenuhi:",
      [
        "ul",
        [
          "Barangnya memang kebutuhan dan sudah direncanakan di anggaran, bukan keputusan dadakan.",
          "Ada promo tanpa bunga dan tanpa biaya tersembunyi untuk tenor pendek.",
          "Kamu sebenarnya punya uangnya hari ini, dan memilih mencicil hanya untuk menjaga arus kas.",
          "Cicilannya otomatis terpotong dari rekening sehingga tidak mungkin telat.",
        ],
      ],
      "Perhatikan syarat ketiga. Paylater yang sehat dipakai oleh orang yang sebenarnya mampu membayar lunas. Kalau kamu memakai paylater karena tidak punya uang, itu bukan mengatur arus kas, itu berutang.",
      "Ingat temuan di Bab 3: rasa berat saat membayar adalah rem alami otak kita. Paylater yang sehat mengembalikan rem itu. Kamu baru memakainya setelah memutuskan dengan sadar bahwa kamu sanggup membayar lunas, bukan karena tombolnya ada di depan mata.",
      ["h", "Empat pertanyaan sebelum menekan tombol"],
      'Nadia menempelkan empat pertanyaan ini di layar kunci ponselnya selama berbulan-bulan. Setiap kali tergoda, dia harus menjawab keempatnya dengan "ya".',
      ["img", "empat-pertanyaan", 'Satu saja jawaban "tidak" sudah cukup untuk berhenti.'],
      ["h", "Pagar yang menjagamu"],
      "Selain empat pertanyaan itu, pasang beberapa pagar yang bekerja otomatis:",
      [
        "table",
        [
          ["Pagar", "Aturan"],
          ["Jumlah aktif", "Maksimal satu cicilan paylater pada satu waktu"],
          ["Batas total", "Semua cicilan di bawah 10% gaji bersih"],
          ["Tenor", "Maksimal 3 bulan, tanpa bunga"],
          ["Limit", "Minta turunkan limit, jangan terima kenaikan otomatis"],
          ["Pembayaran", "Autodebet dari rekening gaji"],
          ["Kategori", "Tidak untuk makanan, hiburan, atau barang gaya hidup"],
        ],
      ],
      ["h", "Menghadapi kenaikan gaji"],
      'Suatu hari gajimu akan naik. Itu kabar baik, tapi juga ujian. Banyak orang yang pernah lepas dari utang kembali terjerat justru setelah gajinya naik, karena merasa "sekarang sudah aman".',
      "Buat keputusan sebelum kenaikan itu datang. Aturan sederhana yang banyak dipakai: separuh kenaikan untuk masa depan (dana darurat, tabungan tujuan), separuh untuk menikmati hidup. Dengan begitu kamu tetap merasakan hasil kerjamu, tanpa membuka pintu untuk cicilan baru.",
      ["h", "Dari Darurat Kecil ke dana darurat sungguhan"],
      "Ingat rekening Darurat Kecil yang kamu buka di Bab 4? Setelah semua utang lunas, inilah saatnya membesarkannya. Arahkan uang yang tadinya untuk cicilan ke rekening ini. Targetnya tiga kali pengeluaran bulanan untuk yang masih lajang dengan pekerjaan tetap, dan lebih besar kalau kamu punya tanggungan atau penghasilan tidak menentu.",
      'Dana darurat adalah alasan terkuat kenapa kamu tidak akan kembali ke paylater. Saat kejadian tak terduga datang, dan pasti akan datang, kamu punya jawaban selain "bayar nanti".',
      [
        "reflect",
        [
          "Untuk apa saja kamu benar-benar akan memakai paylater lagi, kalau memang ada?",
          "Pagar mana yang paling kamu butuhkan supaya tidak kembali ke lingkaran lama?",
        ],
      ],
      [
        "summary",
        [
          "Paylater yang sehat dipakai oleh orang yang sebenarnya mampu membayar lunas.",
          'Empat pertanyaan sebelum menekan tombol; satu jawaban "tidak" berarti berhenti.',
          "Uang bekas cicilan dialihkan ke dana darurat, bukan ke cicilan baru.",
        ],
      ],
      [
        "tip",
        "Teruskan kebiasaan yang sudah terbentuk. Selama berbulan-bulan kamu sudah hidup tanpa uang cicilan itu. Pindahkan jumlah yang sama ke tabungan, dan kamu tidak akan merasa kehilangan apa pun.",
      ],
      [
        "exercise",
        [
          "Tulis empat pertanyaan di atas dan jadikan layar kunci ponselmu.",
          "Tentukan pagar mana saja yang akan kamu pasang.",
          "Tulis rencana pembagian untuk kenaikan gajimu berikutnya.",
        ],
        "Tugas Bab 9",
      ],
    ],
  },
  {
    title: "Sembilan Puluh Hari Menuju Bebas",
    blocks: [
      "Kamu sudah sampai di bab terakhir. Kalau kamu mengerjakan tugas di setiap bab, sebagian besar fondasinya sudah berdiri. Kalau belum, tidak apa-apa. Bab ini merangkum semuanya menjadi rencana yang bisa kamu mulai besok pagi.",
      ["img", "peta-90-hari", "Empat tahap. Satu langkah setiap hari sudah cukup."],
      ["h", "Hari 1 sampai 7: berhenti menggali"],
      [
        "ul",
        [
          "Matikan paylater dan hapus kartu yang tersimpan (Bab 4).",
          "Putus aliran godaan: notifikasi, grup diskon, akun belanja.",
          "Buka rekening Darurat Kecil dan setor pertama kali.",
          "Ceritakan rencanamu kepada satu orang yang kamu percaya.",
        ],
      ],
      ["h", "Hari 8 sampai 30: lihat semuanya"],
      [
        "ul",
        [
          "Buat peta utang lengkap dan cocokkan dengan iDeb SLIK (Bab 5).",
          "Hitung harga sebenarnya dari tiga cicilan terbesarmu (Bab 2).",
          "Kelompokkan pengeluaran dan temukan uang bocor bulanan (Bab 6).",
          "Jual barang yang tidak terpakai.",
        ],
      ],
      ["h", "Hari 31 sampai 60: mulai menyerang"],
      [
        "ul",
        [
          "Pilih strategi bola salju, longsoran, atau jalan tengah (Bab 7).",
          "Lunasi utang pertama dengan uang sekali datang.",
          "Gulirkan setiap cicilan yang bebas ke utang berikutnya.",
          "Kalau ada yang telat, hubungi pemberi pinjaman dan bernegosiasi (Bab 8).",
        ],
      ],
      ["h", "Hari 61 sampai 90: kunci kebiasaan"],
      [
        "ul",
        [
          "Tinjau keuangan lima menit setiap Minggu malam.",
          "Terus isi Darurat Kecil sampai minimal Rp1 juta.",
          "Pasang pagar paylater sehat (Bab 9).",
          "Ulangi tes delapan pertanyaan dari Bab 1.",
        ],
      ],
      ["h", "Tes ulang: seberapa jauh kamu bergerak?"],
      "Ingat tes di Bab 1? Jawab lagi delapan pertanyaan yang sama. Kalau kamu sudah mengisinya di Bab 1, skor lamamu akan muncul sebagai pembanding.",
      ["quiz", SKOR_JERAT],
      ["h", "Ritual lima menit setiap minggu"],
      "Kebiasaan yang paling menentukan bukan yang paling besar, tapi yang paling rutin. Pilih satu waktu tetap, misalnya Minggu malam sebelum tidur, dan jawab tiga pertanyaan ini:",
      [
        "ol",
        [
          "Apakah semua cicilan minggu ini sudah terbayar?",
          "Apakah ada godaan belanja minggu ini, dan bagaimana aku menghadapinya?",
          "Utang mana yang sedang aku serang, dan berapa sisanya sekarang?",
        ],
      ],
      "Lima menit. Tidak lebih. Tapi lima menit yang diulang setiap minggu akan menjagamu tetap di jalur jauh lebih baik daripada niat besar yang muncul sekali setahun.",
      ["h", "Akhir cerita Nadia"],
      "Di bulan ketujuh, Nadia mencoret utang terakhir dari peta utangnya. Dia memotret lembar itu, penuh coretan pulpen, dan mengirimkannya ke kakaknya. Balasannya hanya satu stiker pelukan, tapi Nadia bilang itu salah satu pesan terbaik yang pernah dia terima.",
      'Tiga bulan setelahnya, rekening Darurat Kecil sudah berisi Rp3 juta. Uang yang dulu habis untuk cicilan sekarang mengalir ke tabungan. Bulan lalu, motor yang dia pakai ke kantor rusak dan biaya servisnya Rp850 ribu. Untuk pertama kalinya dalam dua tahun, dia membayarnya tanpa menekan "bayar nanti".',
      '"Yang paling berubah bukan saldo rekeningku," katanya. "Yang berubah itu tidurku. Aku nggak lagi takut buka notifikasi."',
      [
        "quote",
        "Kebebasan finansial tidak selalu berarti punya banyak uang. Kadang artinya sesederhana tidur nyenyak tanpa takut tagihan besok pagi.",
      ],
      ["h", "Untukmu yang baru memulai"],
      "Mungkin angkamu lebih besar dari angka Nadia. Mungkin jalanmu lebih panjang. Mungkin kamu akan tergelincir sekali dua kali di tengah jalan. Itu semua wajar. Yang membedakan orang yang berhasil bukan bulan-bulan tanpa kesalahan, tapi kemampuan untuk kembali ke jalur di bulan berikutnya.",
      "Mulailah dari yang paling kecil: matikan satu fitur, buka satu rekening, catat satu pengeluaran. Lalu lakukan lagi besok.",
      ["quote", "Perjalanan seribu mil dimulai dari satu langkah.", "Laozi, Tao Te Ching"],
      "Terima kasih sudah membaca sampai akhir. Kamu sudah melakukan sesuatu yang tidak dilakukan kebanyakan orang: berhenti, melihat, dan memutuskan untuk berubah.",
      [
        "reflect",
        [
          "Ulangi tes delapan pertanyaan di Bab 1. Berapa skormu sekarang?",
          "Apa satu hal yang paling berubah dalam caramu memandang uang setelah membaca buku ini?",
          "Langkah kecil apa yang akan kamu lakukan besok pagi?",
        ],
      ],
      [
        "summary",
        [
          "Berhenti menggali lubang sebelum mulai melunasi.",
          "Lihat semua utang di satu halaman; yang samar selalu lebih menakutkan.",
          "Lunasi dengan strategi, rayakan setiap kemenangan kecil.",
          "Pasang pagar dan bangun dana darurat supaya tidak kembali.",
        ],
      ],
      ["h", "Bacaan lebih lanjut"],
      [
        "ul",
        [
          "Morgan Housel, **The Psychology of Money** (2020): tentang perilaku, bukan rumus, dalam mengelola uang.",
          "Richard Thaler, **Misbehaving** (2015): kisah lahirnya ekonomi perilaku.",
          "Sendhil Mullainathan & Eldar Shafir, **Scarcity** (2013): bagaimana kekurangan memengaruhi cara kita berpikir.",
          "Henry Manampiring, **Filosofi Teras** (2018): stoisisme untuk kehidupan sehari-hari di Indonesia.",
        ],
      ],
      [
        "info",
        "Isi buku ini bersifat edukasi umum. Biaya, bunga, dan aturan setiap layanan bisa berbeda dan berubah dari waktu ke waktu. Selalu baca syarat resmi sebelum menyetujui, dan pertimbangkan berkonsultasi dengan perencana keuangan untuk keputusan besar.",
      ],
    ],
  },
];
