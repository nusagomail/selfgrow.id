/** "Lepas dari Jerat Paylater" bab 5–7. Lihat paylater-1.mjs. */
import { HEMAT_BARS } from "./paylater-interactive.mjs";

export const PAYLATER_2 = [
  {
    title: "Peta Utang: Lihat Semuanya di Satu Halaman",
    blocks: [
      'Ada alasan kenapa banyak orang menghindari membuka aplikasi tagihan. Melihat angkanya terasa seperti ditampar. Lebih nyaman membiarkannya samar-samar: "ada beberapa cicilan, nanti juga lunas."',
      "Tapi utang yang samar-samar justru lebih menakutkan daripada utang yang jelas. Pikiran kita cenderung membayangkan yang terburuk saat informasinya tidak lengkap. Begitu semuanya tertulis di satu halaman, rasa takut itu biasanya berubah menjadi sesuatu yang lebih berguna: rencana.",
      ["h", "Langkah 1: kumpulkan semuanya"],
      'Siapkan satu jam dan secangkir teh. Buka setiap aplikasi dan catat semua utang yang masih berjalan. Jangan ada yang terlewat, termasuk yang terasa kecil atau yang "cuma ke keluarga".',
      [
        "ul",
        [
          "Semua layanan paylater di aplikasi belanja, ojek daring, dan dompet digital.",
          "Kartu kredit, termasuk cicilan yang dikonversi dari transaksi kartu.",
          "Pinjaman online, koperasi, atau kredit tanpa agunan.",
          "Cicilan kendaraan, ponsel, atau elektronik di toko.",
          "Utang ke keluarga, teman, atau rekan kerja.",
        ],
      ],
      "Untuk setiap utang, catat lima hal: sisa yang harus dibayar, cicilan per bulan, sisa berapa bulan, tanggal jatuh tempo, dan biaya atau bunganya.",
      ["h", "Langkah 2: cocokkan dengan catatan resmi"],
      "Supaya tidak ada yang terlewat, periksa catatan kreditmu di SLIK OJK. Layanannya bernama iDeb dan bisa diminta secara gratis untuk data dirimu sendiri lewat situs resmi OJK atau di kantor OJK. Di sana akan terlihat semua fasilitas kredit resmi atas namamu, beserta status pembayarannya.",
      "Kalau ada pinjaman yang tidak kamu kenali, jangan diabaikan. Bisa jadi itu kesalahan data, bisa juga data pribadimu disalahgunakan orang lain. Laporkan ke lembaga yang tercatat dan ke Kontak OJK 157.",
      [
        "warn",
        'Hati-hati dengan situs atau akun yang menawarkan "cek SLIK" berbayar atau meminta data lengkapmu. Gunakan hanya kanal resmi OJK.',
      ],
      ["h", "Peta utang Nadia"],
      "Inilah hasil kerja Nadia di malam itu. Untuk pertama kalinya, dia melihat semuanya di satu halaman.",
      [
        "table",
        [
          ["Utang", "Sisa", "Cicilan/bulan", "Sisa bulan", "Biaya"],
          ["Kartu kredit", "Rp3.200.000", "Rp160.000 (minimum)", "-", "Bunga ±1,75%/bln"],
          ["Ponsel (paylater)", "Rp2.622.000", "Rp437.000", "6", "2,6%/bln"],
          ["Pinjol legal", "Rp1.650.000", "Rp330.000", "5", "Termasuk bunga"],
          ["Pinjam sepupu", "Rp1.000.000", "-", "-", "Tanpa bunga"],
          ["Skincare & baju", "Rp930.000", "Rp310.000", "3", "3%/bln"],
          ["Sepatu lari", "Rp660.000", "Rp220.000", "3", "Promo 0%"],
          ["Headset", "Rp524.800", "Rp131.200", "4", "2,6%/bln"],
          ["Total", "Rp10.586.800", "Rp1.588.200", "", ""],
        ],
      ],
      [
        "img",
        "peta-utang",
        "Kotak terbesar belum tentu yang paling mendesak. Perhatikan warnanya.",
      ],
      "Reaksi pertama Nadia adalah lemas. Rp10,6 juta hampir dua kali gajinya. Tapi setelah beberapa menit, dia menyadari sesuatu: angka itu terbatas. Ada ujungnya. Selama ini yang membuatnya cemas bukan angkanya, tapi ketidaktahuannya.",
      ["quote", "Kita lebih sering menderita dalam bayangan daripada dalam kenyataan.", "Seneca"],
      "Hampir dua ribu tahun lalu, filsuf Romawi itu sudah menangkap apa yang dialami Nadia malam itu. Yang membuat kita gelisah sering kali bukan masalahnya, tapi bayangan kita tentang masalah itu. Peta utang memindahkan masalah dari kepala ke atas kertas, dan di atas kertas, masalah selalu terlihat lebih kecil dan lebih bisa diatur.",
      ["h", "Langkah 3: hitung rasio cicilanmu"],
      "Bagi total cicilan per bulan dengan gaji bersihmu, lalu kalikan 100. Hasilnya adalah persentase gajimu yang sudah dipesan untuk utang sebelum kamu sempat membelanjakannya.",
      "Untuk Nadia: Rp1.588.200 ÷ Rp5.800.000 × 100 = 27,4%.",
      [
        "tool",
        "kalkulator-rasio-cicilan",
        "Cek rasio cicilanmu",
        "Masukkan gaji bersih dan total cicilanmu bulan ini.",
      ],
      [
        "table",
        [
          ["Rasio cicilan", "Kondisi", "Artinya"],
          ["Di bawah 10%", "Aman", "Masih ada ruang bernapas"],
          ["10–20%", "Waspada", "Jangan tambah cicilan baru"],
          ["20–30%", "Berat", "Fokus pelunasan, tunda tujuan lain"],
          ["Di atas 30%", "Bahaya", "Butuh langkah tegas, termasuk negosiasi (Bab 8)"],
        ],
      ],
      "Nadia berada di zona berat. Bukan zona bahaya, tapi jelas tidak bisa dibiarkan.",
      ["h", "Perangkap pembayaran minimum"],
      "Perhatikan baris kartu kredit di tabel Nadia. Cicilannya hanya Rp160 ribu, paling kecil di antara yang lain. Justru di situlah masalahnya.",
      "Pembayaran minimum kartu kredit dirancang supaya kamu tidak telat, bukan supaya utangmu lunas. Dengan bunga sekitar 1,75% per bulan, utang Rp3,2 juta menghasilkan bunga sekitar Rp56 ribu setiap bulan. Kalau Nadia hanya membayar minimum, sebagian besar pembayarannya habis untuk bunga, dan pelunasannya bisa memakan waktu bertahun-tahun.",
      [
        "quote",
        "Membayar minimum itu seperti berlari di treadmill: capek, berkeringat, tapi tidak ke mana-mana.",
      ],
      [
        "reflect",
        [
          "Utang mana yang selama ini paling kamu hindari untuk dilihat? Apa yang kamu takutkan dari angkanya?",
          "Setelah semuanya tertulis, apakah rasa cemasmu bertambah, atau justru berkurang?",
        ],
      ],
      [
        "summary",
        [
          "Utang yang samar lebih menakutkan daripada utang yang jelas.",
          "Tulis semua utang dalam satu halaman dan cocokkan dengan catatan resmi OJK.",
          "Rasio cicilan di atas 20% gaji adalah tanda untuk berhenti menambah dan mulai melunasi.",
        ],
      ],
      [
        "exercise",
        [
          "Buat tabel peta utangmu sendiri dengan lima kolom seperti tabel Nadia.",
          "Minta iDeb SLIK OJK atas namamu sendiri lewat kanal resmi.",
          "Hitung rasio cicilanmu dan tentukan zonamu.",
          "Tandai utang dengan biaya paling mahal menggunakan warna merah.",
        ],
        "Tugas Bab 5",
      ],
    ],
  },
  {
    title: "Menemukan Uang untuk Melunasi",
    blocks: [
      "Sekarang kamu tahu berapa utangmu. Pertanyaan berikutnya: dari mana uang untuk melunasinya lebih cepat?",
      'Jawaban yang paling sering muncul adalah "nanti kalau gaji naik" atau "nanti kalau dapat bonus". Masalahnya, gaji naik sering diikuti gaya hidup yang ikut naik, dan bonus sering sudah habis bahkan sebelum diterima. Kita butuh uang yang bisa ditemukan bulan ini, dari gaji yang sama.',
      'Kabar baiknya, hampir semua orang punya uang yang "bocor" tanpa terasa. Tugas kita adalah menemukannya.',
      ["h", "Tiga sumber uang pelunasan"],
      [
        "ol",
        [
          "**Uang bocor bulanan.** Pengeluaran kecil yang rutin dan bisa dikurangi tanpa membuat hidup menderita.",
          "**Uang sekali datang.** Barang tak terpakai yang bisa dijual, THR, bonus, atau uang hadiah.",
          "**Uang tambahan.** Penghasilan sampingan kecil yang khusus dipakai untuk pelunasan.",
        ],
      ],
      ["h", "Sumber pertama: menemukan kebocoran"],
      "Nadia membuka riwayat transaksinya selama tiga bulan terakhir dan mengelompokkan pengeluarannya. Hasilnya cukup mengejutkan.",
      [
        "table",
        [
          ["Pos", "Sebelum", "Sesudah", "Hemat"],
          ["Ojek daring ke halte", "Rp380.000", "Rp150.000", "Rp230.000"],
          ["Pesan antar makanan", "Rp450.000", "Rp150.000", "Rp300.000"],
          ["Nongkrong & kopi", "Rp210.000", "Rp120.000", "Rp90.000"],
          ["Langganan aplikasi", "Rp120.000", "Rp40.000", "Rp80.000"],
          ["Total", "Rp1.160.000", "Rp460.000", "Rp700.000"],
        ],
      ],
      ["chart", HEMAT_BARS],
      "Perhatikan bahwa Nadia tidak menghapus semuanya. Dia masih nongkrong, masih sesekali pesan makanan, masih berlangganan satu aplikasi musik. Dia hanya menguranginya. Inilah kunci yang sering dilupakan: anggaran yang terlalu ketat akan runtuh dalam dua minggu. Pengurangan yang masuk akal bisa bertahan berbulan-bulan.",
      "Nenek moyang kita sudah merumuskan prinsip ini jauh sebelum ada aplikasi keuangan: **sedikit demi sedikit, lama-lama menjadi bukit**. Rp700 ribu terdengar biasa saja. Dalam tujuh bulan, angka itu berubah menjadi hampir Rp5 juta yang menyerang utang.",
      ["img", "sebelum-sesudah", "Gaji yang sama, arah yang berbeda."],
      [
        "tip",
        "Cara mudah mengurangi ojek daring: berangkat 10 menit lebih awal dan jalan kaki ke halte. Nadia menghemat lebih dari Rp200 ribu sebulan, dan bonusnya, dia jadi lebih sering bergerak.",
      ],
      ["h", "Sumber kedua: barang yang menunggu dijual"],
      "Coba berkeliling kamarmu dengan mata seorang penjual. Ada berapa barang yang tidak kamu pakai dalam enam bulan terakhir? Pakaian yang masih bagus, gawai lama, alat olahraga yang hanya dipakai dua kali, buku, perlengkapan hobi yang ditinggalkan.",
      "Nadia menemukan ponsel lamanya, sepeda statis yang dipakai tiga kali, dan beberapa tas. Setelah dijual di marketplace barang bekas dan grup jual beli, dia mendapat sekitar Rp1,4 juta dalam dua minggu.",
      "Uang sekali datang seperti ini sangat berharga untuk pelunasan karena bisa langsung menghapus satu atau dua utang sekaligus. Kemenangan cepat seperti itu memberi energi untuk berbulan-bulan berikutnya.",
      ["h", "Sumber ketiga: penghasilan tambahan kecil"],
      "Tidak semua orang punya waktu untuk pekerjaan sampingan, dan itu tidak apa-apa. Tapi kalau kamu punya beberapa jam di akhir pekan, penghasilan tambahan kecil yang khusus untuk pelunasan bisa mempercepat semuanya.",
      "Beberapa contoh yang realistis: membantu admin toko online teman, les privat, menjual makanan rumahan ke rekan kantor, atau jasa desain sederhana. Yang penting, beri label yang jelas: uang ini hanya untuk melunasi utang. Kalau tidak diberi label, uang tambahan biasanya ikut habis untuk gaya hidup.",
      [
        "warn",
        "Jangan memulai usaha sampingan dengan modal utang. Tujuan kita mengurangi utang, bukan memindahkannya ke tempat lain.",
      ],
      ["h", "Hal-hal yang tidak boleh dipotong"],
      "Dalam semangat melunasi utang, jangan sampai kamu memotong hal-hal yang justru melindungimu:",
      [
        "ul",
        [
          "Makan yang cukup dan bergizi. Hemat dengan masak sendiri, bukan dengan melewatkan makan.",
          "Iuran BPJS Kesehatan. Sakit tanpa jaminan bisa melahirkan utang yang jauh lebih besar.",
          "Setoran kecil ke Darurat Kecil. Tetap jalan, sekecil apa pun.",
          "Sedikit uang untuk kesenangan. Tanpa ini, kamu akan mudah menyerah.",
        ],
      ],
      [
        "quote",
        "Melunasi utang adalah lari jarak jauh. Kalau kamu berlari terlalu kencang di kilometer pertama, kamu tidak akan sampai di garis akhir.",
      ],
      [
        "quote",
        "Menghabiskan uang untuk menunjukkan kepada orang lain seberapa banyak uang yang kamu punya adalah cara tercepat untuk punya lebih sedikit uang.",
        "Morgan Housel, The Psychology of Money (2020)",
      ],
      [
        "reflect",
        [
          "Pengeluaran mana yang sebenarnya kamu lakukan supaya terlihat baik di mata orang lain?",
          "Barang apa di sekitarmu yang lebih berguna sebagai uang daripada sebagai barang?",
        ],
      ],
      [
        "summary",
        [
          "Uang untuk melunasi bisa ditemukan dari gaji yang sama: kebocoran kecil, barang tak terpakai, dan penghasilan tambahan kecil.",
          "Kurangi, jangan hapus. Anggaran yang terlalu ketat runtuh dalam dua minggu.",
          "Jangan pernah memotong makan bergizi, BPJS, dan Darurat Kecil.",
        ],
      ],
      [
        "exercise",
        [
          "Kelompokkan pengeluaranmu tiga bulan terakhir dan temukan empat pos yang bisa dikurangi.",
          "Tulis target pengurangan yang realistis untuk masing-masing pos.",
          "Daftar minimal lima barang yang bisa dijual minggu ini.",
          "Tentukan berapa uang ekstra per bulan yang bisa kamu arahkan ke pelunasan.",
        ],
        "Tugas Bab 6",
      ],
    ],
  },
  {
    title: "Bola Salju atau Longsoran",
    blocks: [
      "Kamu sudah punya peta utang dan sudah menemukan uang ekstra. Sekarang pertanyaannya: uang ekstra itu dipakai untuk melunasi yang mana dulu?",
      "Ada dua strategi yang paling terkenal. Keduanya sama-sama berhasil, asal dijalankan sampai selesai.",
      ["h", "Strategi bola salju"],
      "Bayar minimum di semua utang, lalu arahkan seluruh uang ekstra ke utang dengan sisa paling kecil. Begitu lunas, cicilan yang tadinya untuk utang itu ditambahkan ke utang terkecil berikutnya. Begitu seterusnya. Seperti bola salju yang menggelinding, jumlah yang kamu pakai untuk menyerang utang semakin besar.",
      "Kelebihannya: kamu cepat merasakan kemenangan. Melihat satu utang hilang dari daftar memberi semangat luar biasa, apalagi di bulan-bulan awal ketika godaan untuk menyerah paling besar.",
      ["h", "Strategi longsoran"],
      "Bayar minimum di semua utang, lalu arahkan seluruh uang ekstra ke utang dengan biaya atau bunga paling tinggi. Secara matematika, ini cara paling hemat karena kamu menghentikan biaya yang paling mahal lebih dulu.",
      "Kekurangannya: kalau utang termahal juga yang terbesar, kamu bisa butuh berbulan-bulan sebelum merasakan satu kemenangan.",
      [
        "table",
        [
          ["", "Bola salju", "Longsoran"],
          ["Urutan", "Sisa terkecil dulu", "Bunga tertinggi dulu"],
          ["Total biaya", "Sedikit lebih mahal", "Paling hemat"],
          ["Rasa menang", "Cepat", "Lebih lambat"],
          ["Cocok untuk", "Yang mudah kehilangan semangat", "Yang termotivasi oleh angka"],
        ],
      ],
      ["h", "Jalan tengah ala Nadia"],
      "Nadia memilih gabungan keduanya. Uang hasil jual barang, sekitar Rp1,4 juta, dia pakai untuk melunasi dua utang kecil sekaligus di bulan pertama: headset (Rp524.800) dan skincare & baju (Rp930.000). Totalnya sedikit di atas Rp1,4 juta, sisanya ditutup dari uang ekstra bulan itu.",
      "Dua kemenangan di bulan pertama. Lebih dari itu, dua cicilan hilang dari daftar, sehingga Rp441 ribu per bulan langsung bebas.",
      [
        "fact",
        "Penelitian terhadap ribuan nasabah program pengelolaan utang menemukan bahwa orang yang berhasil menutup lebih banyak akun utangnya satu per satu lebih mungkin melunasi seluruh utangnya, terlepas dari besarnya jumlah yang sudah dibayar. Kemenangan kecil ternyata menjaga semangat untuk perjalanan panjang.",
        'Gal & McShane, "Can Small Victories Help Win the War?", Journal of Marketing Research, 2012',
      ],
      "Setelah itu dia beralih ke longsoran. Uang ekstra Rp700 ribu ditambah Rp441 ribu yang sudah bebas, total Rp1,14 juta per bulan, dia arahkan ke pinjol legal yang biayanya tinggi. Pinjol itu lunas di bulan ketiga, bersamaan dengan sepatu lari yang memang selesai sesuai jadwal.",
      "Bola saljunya semakin besar. Mulai bulan keempat, ada sekitar Rp1,69 juta per bulan untuk menyerang kartu kredit. Utang yang tadinya terasa tidak akan pernah lunas itu habis di bulan keenam, di bulan yang sama dengan cicilan ponsel yang berakhir sesuai jadwal.",
      "Di bulan ketujuh, Nadia melunasi utang ke sepupunya. Dia mengantarkan uangnya langsung, bersama sekotak martabak.",
      ["img", "tujuh-bulan", "Setiap utang yang lunas menambah tenaga untuk utang berikutnya."],
      ["h", "Cara menjalankannya setiap bulan"],
      [
        "ol",
        [
          "Di hari gajian, bayar semua cicilan minimum lebih dulu. Pakai autodebet kalau memungkinkan supaya tidak pernah telat.",
          "Transfer uang ekstra ke utang target bulan ini di hari yang sama, sebelum uangnya sempat terpakai.",
          'Begitu satu utang lunas, jangan biarkan cicilannya "menganggur". Langsung gulirkan ke utang berikutnya.',
          "Coret utang yang lunas dari peta utangmu. Secara harfiah, dengan pulpen. Rasakan kepuasannya.",
        ],
      ],
      [
        "tip",
        "Rayakan setiap utang yang lunas dengan hadiah kecil yang tidak memakai utang. Nadia merayakan lunasnya kartu kredit dengan masak besar dan mengundang dua sahabatnya ke kos.",
      ],
      ["h", "Bagaimana dengan utang ke keluarga?"],
      "Utang ke keluarga sering diletakkan di urutan terakhir karena tanpa bunga. Secara hitungan, itu masuk akal. Tapi jangan lupakan biaya lain yang tidak tertulis: hubungan. Bicarakan terus terang dengan keluarga yang meminjamkan. Jelaskan bahwa kamu sedang melunasi utang berbunga lebih dulu, dan berikan perkiraan kapan giliran mereka tiba. Kebanyakan keluarga akan menghargai kejujuran itu, jauh lebih dari diam dan menghindar.",
      [
        "reflect",
        [
          "Mana yang lebih menggerakkanmu: melihat angka bunga yang hemat, atau merasakan satu utang hilang dari daftar?",
          "Siapa yang akan kamu ajak merayakan saat utang pertamamu lunas?",
        ],
      ],
      [
        "summary",
        [
          "Bola salju: sisa terkecil dulu, demi kemenangan cepat.",
          "Longsoran: bunga tertinggi dulu, demi biaya paling hemat.",
          "Setiap cicilan yang lunas jangan dibiarkan menganggur; gulirkan ke utang berikutnya.",
        ],
      ],
      [
        "exercise",
        [
          "Pilih strategimu: bola salju, longsoran, atau jalan tengah.",
          "Urutkan utang di peta utangmu sesuai strategi yang dipilih.",
          "Hitung kira-kira di bulan ke berapa setiap utang akan lunas.",
          "Atur autodebet untuk semua cicilan minimum.",
        ],
        "Tugas Bab 7",
      ],
    ],
  },
];
