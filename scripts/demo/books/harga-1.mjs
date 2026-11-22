/**
 * "Hitung Harga Jual yang Untung", 8 bab bergaya buku kerja: setiap bab berisi satu langkah, satu
 * contoh hitungan (risol mayo Dina, ilustrasi), dan satu lembar kerja untuk pembaca.
 * Edukasi umum, bukan nasihat pajak atau akuntansi.
 */
import { CEK_HARGA, HARGA_BARS, HITUNG_MARGIN, UMKM_COUNTER } from "./harga-interactive.mjs";

export const HARGA_1 = [
  {
    title: "Laku Keras, Kok Uangnya Nggak Ada?",
    blocks: [
      "Setiap pagi, Dina menggoreng satu adonan berisi 50 risol mayo di dapur rumahnya di Bekasi. Pukul sembilan, foto risolnya sudah ada di status WhatsApp. Sebelum zuhur, rata-rata 40 risol sudah terjual. Harganya Rp3.000 per biji, lebih murah dari risol di dekat stasiun.",
      "Tiga bulan berjalan, pesanan makin ramai. Tetangga pesan untuk arisan, teman kantor suaminya pesan untuk rapat. Tapi ada yang aneh: tabungannya tidak bertambah. Malah setiap akhir bulan, Dina harus mengambil uang belanja dapur untuk modal belanja risol berikutnya.",
      '"Laku keras, kok uangnya nggak ada?" tanyanya pada suaminya suatu malam.',
      "Pertanyaan itu adalah pertanyaan yang sama yang ditanyakan jutaan pelaku usaha kecil di Indonesia. Dan jawabannya hampir selalu sama: **harga jualnya ditebak, bukan dihitung.**",
      ["h", "Usaha kecil, peran besar"],
      ["chart", UMKM_COUNTER],
      "Angka-angka itu menunjukkan betapa pentingnya usaha seperti milik Dina bagi ekonomi kita. Tapi sebagian besar adalah usaha mikro: dijalankan satu-dua orang, sering dari rumah, sering tanpa pembukuan. Banyak yang tutup bukan karena tidak laku, melainkan karena **setiap penjualan diam-diam merugi** dan pemiliknya tidak menyadarinya.",
      ["h", "Cara buku ini dipakai"],
      "Buku ini adalah buku kerja. Setiap bab berisi satu langkah, dan setiap langkah langsung kamu kerjakan untuk produkmu sendiri. Siapkan:",
      [
        "ul",
        [
          "Satu produk yang paling sering kamu jual (mulai dari satu saja).",
          "Nota atau catatan belanja bahan terakhir.",
          "Kalkulator di ponsel, atau pakai kalkulator yang ada di dalam buku ini.",
        ],
      ],
      "Sepanjang buku, kita akan menghitung bersama-sama risol Dina sebagai contoh. Angkanya sederhana supaya mudah diikuti, tapi caranya sama untuk kue, kopi, jasa jahit, atau kerajinan.",
      ["h", "Cek dulu: harga tebakan atau harga hitungan?"],
      ["quiz", CEK_HARGA],
      [
        "tip",
        "Skor rendah bukan berarti usahamu buruk. Artinya ada untung yang selama ini bocor dan bisa kamu selamatkan mulai minggu ini.",
      ],
    ],
  },
  {
    title: "Langkah 1: Hitung HPP Tanpa Pusing",
    blocks: [
      'HPP, atau harga pokok produksi, adalah semua biaya untuk membuat satu produk sampai siap dijual. Bukan perkiraan, bukan "kira-kira segini", tapi angka sampai ke rupiah.',
      "Cara paling mudah menghitungnya: **hitung biaya satu kali produksi (satu batch), lalu bagi dengan jumlah produk yang dihasilkan.**",
      ["img", "nota-hpp", "Nota HPP satu batch risol Dina."],
      ["h", "Contoh: risol Dina"],
      [
        "table",
        [
          ["Komponen", "Per batch (50 risol)", "Per risol"],
          ["Bahan baku", "Rp95.000", "Rp1.900"],
          ["Tenaga Dina (3 jam × Rp15.000)", "Rp45.000", "Rp900"],
          ["Gas, minyak tambahan, ongkir belanja", "Rp10.000", "Rp200"],
          ["Mika + label", "Rp12.500", "Rp250"],
          ["**Total**", "**Rp162.500**", "**Rp3.250**"],
        ],
      ],
      "Selama tiga bulan, Dina hanya menghitung baris pertama: Rp1.900 per risol. Dengan harga Rp3.000, dia merasa untung Rp1.100. Padahal HPP sebenarnya Rp3.250. Setiap risol yang terjual justru **merugi Rp250**, dan kerugian itu ditutup diam-diam dari uang belanja dapur.",
      [
        "warn",
        "Tenagamu sendiri adalah biaya. Kalau tidak dihitung, kamu sedang bekerja gratis, dan usahamu terlihat untung padahal sebenarnya kamu yang mensubsidinya.",
      ],
      ["h", "Berapa upah tenagamu?"],
      "Pertanyaan ini sering bikin bingung. Patokan sederhana: berapa yang wajar kamu bayar kalau pekerjaan itu dikerjakan orang lain? Atau hitung dari upah minimum di daerahmu dibagi jam kerja sebulan. Yang penting ada angkanya, dan angkanya jujur.",
      [
        "exercise",
        [
          "Pilih satu produk. Tulis semua bahan untuk satu kali produksi beserta harganya (lihat nota belanja terakhir).",
          "Catat berapa jam kamu mengerjakannya, lalu kalikan dengan upah per jam yang wajar.",
          "Tambahkan biaya gas, listrik, dan ongkir belanja untuk batch itu.",
          "Bagi totalnya dengan jumlah produk yang jadi.",
          "Tambahkan biaya kemasan per produk. Itulah HPP-mu.",
        ],
        "Lembar kerja 1: HPP produkmu",
      ],
    ],
  },
  {
    title: "Langkah 2: Biaya yang Suka Lupa Dihitung",
    blocks: [
      "Setelah menghitung HPP, Dina merasa lega. Rp3.250 per risol, tinggal dijual lebih mahal. Tapi minggu berikutnya, dua risol pecah saat digoreng, dan enam tidak laku sampai sore. Delapan risol, hampir Rp26.000, hilang begitu saja.",
      "Inilah biaya yang paling sering lupa dihitung: **biaya yang tidak terlihat di nota belanja.**",
      ["img", "biaya-terlupa", "Tujuh biaya yang suka lupa dihitung."],
      ["h", "Cadangan untuk yang gagal dan tidak laku"],
      "Tidak ada usaha makanan yang berhasil 100% setiap kali. Ada yang gosong, pecah, basi, atau tidak terjual. Cara paling sederhana: **tambahkan cadangan 5–10% ke HPP**, tergantung seberapa sering hal itu terjadi di usahamu.",
      "Untuk Dina, dari delapan risol yang hilang, enam karena tidak laku sampai sore. Dia memilih memperbaiki sumbernya dulu: mulai minggu itu, risol dijual dengan sistem pesan dulu (pre-order) sampai malam sebelumnya, dan hanya digoreng sesuai pesanan ditambah lima cadangan. Sisa tidak laku turun hampir nol, dan yang pecah tinggal satu-dua per batch, sekitar 3%. Karena di bawah 5%, Dina tetap memakai HPP Rp3.250, tapi berjanji menghitung ulang kalau angka gagalnya naik.",
      ["h", "Potongan aplikasi dan diskon"],
      "Kalau kamu berjualan lewat marketplace atau layanan pesan-antar, ada potongan untuk setiap transaksi. Besarnya berbeda-beda per platform dan bisa berubah, jadi selalu cek rincian di aplikasimu. Potongan ini harus masuk hitungan, bukan diambil dari untung setelah terjadi.",
      [
        "info",
        "Rumus aman untuk penjualan lewat aplikasi: harga di aplikasi = harga jual normal ÷ (1 − persentase potongan). Contoh: potongan 20%, harga normal Rp4.500 → Rp4.500 ÷ 0,8 = Rp5.625, dibulatkan Rp6.000.",
      ],
      "Diskon juga sama. Harga coret memang menarik pembeli, tapi setiap rupiah diskon langsung memotong untungmu, bukan memotong HPP.",
      [
        "exercise",
        [
          "Centang biaya dari daftar di atas yang belum masuk HPP-mu.",
          "Perkirakan berapa persen produk yang gagal atau tidak laku setiap batch.",
          "Hitung ulang HPP dengan cadangan itu.",
          "Kalau kamu berjualan lewat aplikasi, catat persentase potongannya.",
        ],
        "Lembar kerja 2: tambal kebocoran",
      ],
    ],
  },
  {
    title: "Langkah 3: Margin, Markup, dan Harga Jual",
    blocks: [
      "Setelah HPP jelas, barulah kita bicara harga jual. Di sini ada dua istilah yang sering tertukar dan membuat banyak orang salah hitung: **markup** dan **margin**.",
      ["img", "markup-margin", "Markup dan margin itu beda."],
      [
        "ul",
        [
          '**Markup** adalah untung dibandingkan HPP. "Aku tambah 38% dari modal."',
          '**Margin** adalah untung dibandingkan harga jual. "28% dari setiap penjualan adalah untung."',
        ],
      ],
      "Kenapa ini penting? Kalau kamu ingin margin 25% tapi menghitungnya dengan menambah 25% dari HPP, untung sebenarnya hanya 20% dari harga jual. Kelihatan kecil, tapi pada ratusan produk setiap bulan, selisihnya besar.",
      ["quote", "Harga jual = HPP ÷ (1 − margin yang diinginkan)"],
      ["h", "Berapa margin yang wajar?"],
      "Tidak ada angka yang berlaku untuk semua usaha. Makanan rumahan sering memakai margin sekitar 25–40%, sementara produk yang butuh keahlian khusus atau waktu lama bisa lebih tinggi. Yang pasti: margin di bawah 20% sangat rentan, karena satu batch gagal atau satu promo bisa menghapus untung sebulan.",
      ["quiz", HITUNG_MARGIN],
      ["h", "Hitung hargamu sekarang"],
      "Masukkan angka dari lembar kerja sebelumnya ke kalkulator di bawah. Angka contoh di dalamnya adalah angka risol Dina.",
      [
        "tool",
        "kalkulator-harga-jual",
        "Kalkulator harga jual",
        "Pakai HPP yang sudah termasuk cadangan dari Langkah 2.",
      ],
      "Dengan margin 25%, harga risol Dina menjadi **Rp4.500**. Setiap risol sekarang menyumbang untung Rp1.250. Ini rincian ke mana setiap Rp4.500 itu pergi:",
      ["chart", HARGA_BARS],
      ["img", "label-harga", "Di balik label Rp4.500."],
      [
        "tip",
        "Bulatkan harga ke atas, ke kelipatan Rp500 atau Rp1.000. Selain lebih mudah dibayar, pembulatan ke atas memberi bantalan kecil untuk kenaikan harga bahan.",
      ],
    ],
  },
  {
    title: "Diskon yang Diam-Diam Memakan Untung",
    blocks: [
      'Bulan puasa, tetangga Dina memasang promo "diskon 10% semua menu". Dina tergoda ikut. Kelihatannya kecil: Rp4.500 jadi Rp4.050, hanya Rp450 lebih murah.',
      "Masalahnya, diskon tidak dipotong dari harga. Diskon dipotong dari **untung**.",
      [
        "table",
        [
          ["", "Harga normal", "Diskon 10%"],
          ["Harga jual", "Rp4.500", "Rp4.050"],
          ["HPP", "Rp3.250", "Rp3.250"],
          ["Untung per risol", "Rp1.250", "Rp800"],
          ["Untung 40 risol", "Rp50.000", "Rp32.000"],
        ],
      ],
      "Diskon 10% memangkas untung per risol sebesar 36%. Supaya untung hariannya tetap Rp50.000, Dina harus menjual sekitar 63 risol, bukan 40. Itu berarti satu adonan tambahan, lebih banyak tenaga, dan lebih banyak minyak.",
      ["quote", "Penjualan yang dibutuhkan setelah diskon = untung lama ÷ untung baru per produk"],
      ["h", "Promo yang lebih aman"],
      [
        "ul",
        [
          "**Paket, bukan potongan harga:** 10 risol Rp42.000 untuk pesanan arisan. Potongannya hanya Rp300 per risol, dan Dina menjual 10 sekaligus tanpa repot.",
          "**Bonus kecil dengan HPP rendah:** gratis satu sachet sambal untuk pembelian 5 risol.",
          "**Diskon berbatas:** hanya untuk 20 pembeli pertama atau satu hari tertentu, supaya pelanggan tidak terbiasa menunggu promo.",
        ],
      ],
      [
        "exercise",
        [
          "Hitung untung per produkmu sekarang.",
          "Hitung untung per produk kalau diberi diskon 10% dan 20%.",
          "Bagi untung lama dengan untung baru. Apakah kamu sanggup menjual sebanyak itu?",
        ],
        "Lembar kerja: sebelum memberi diskon",
      ],
    ],
  },
  {
    title: "Langkah 4: Berapa yang Harus Terjual?",
    blocks: [
      "Harga sudah benar. Pertanyaan berikutnya: **berapa banyak yang harus terjual setiap bulan supaya usaha ini tidak rugi?** Angka ini disebut titik impas.",
      "Untuk menjawabnya, kita perlu membedakan dua jenis biaya:",
      [
        "table",
        [
          ["Jenis", "Ciri", "Contoh di usaha Dina"],
          [
            "Biaya variabel",
            "Naik-turun sesuai jumlah produksi",
            "Bahan, tenaga per batch, kemasan (sudah masuk HPP)",
          ],
          [
            "Biaya tetap",
            "Tetap dibayar walau tidak ada yang terjual",
            "Cicilan freezer Rp300.000, promosi & kuota Rp100.000",
          ],
        ],
      ],
      "Biaya tetap Dina Rp400.000 per bulan. Setiap risol menyisakan Rp1.250 setelah HPP. Jadi:",
      ["quote", "Titik impas = Rp400.000 ÷ Rp1.250 = 320 risol per bulan"],
      ["img", "titik-impas", "Titik impas: kapan mulai untung."],
      "Kalau Dina berjualan 26 hari sebulan, itu sekitar **13 risol per hari**. Risol ke-14 dan seterusnya, barulah untung yang sebenarnya. Angka sederhana ini mengubah cara Dina melihat hari-harinya: hari dengan 10 pesanan bukan hari yang buruk, tapi hari yang perlu dikejar sedikit lagi.",
      [
        "tool",
        "kalkulator-titik-impas",
        "Kalkulator titik impas",
        "Isi biaya tetap bulananmu, harga jual, dan HPP.",
      ],
      [
        "warn",
        "Kalau kalkulator menunjukkan harga jualmu di bawah HPP, berhenti menambah produksi dulu. Menjual lebih banyak dengan harga yang merugi hanya mempercepat kerugian.",
      ],
      [
        "exercise",
        [
          "Tulis semua biaya tetap bulananmu: sewa, cicilan alat, langganan, promosi.",
          "Hitung titik impas dengan kalkulator di atas.",
          "Tulis target harian di kertas dan tempel di dapur atau tempat kerjamu.",
        ],
        "Lembar kerja 3: target harian",
      ],
    ],
  },
  {
    title: "Harga Kalau Dijual Lewat Aplikasi",
    blocks: [
      'Seorang pelanggan menyarankan Dina berjualan lewat aplikasi pesan antar. "Biar orang kantor bisa pesan langsung." Dina mendaftar, memasang harga yang sama, Rp4.500. Bulan pertama, pesanan bertambah, tapi uang yang masuk tidak sebanyak yang dia hitung.',
      "Aplikasi pesan antar dan marketplace memotong komisi atau biaya layanan dari setiap penjualan. Besarnya berbeda antar-platform dan bisa berubah, jadi selalu cek di halaman mitra platform yang kamu pakai.",
      ["h", "Hitung harga daring dari yang ingin diterima"],
      [
        "quote",
        "Harga di aplikasi = harga yang ingin diterima ÷ (1 − persentase potongan platform)",
      ],
      [
        "table",
        [
          ["Contoh potongan platform 20%", "Angka"],
          ["Yang ingin diterima Dina per risol", "Rp4.500"],
          ["Harga di aplikasi (4.500 ÷ 0,8)", "Rp5.625, dibulatkan Rp6.000"],
          ["Yang diterima setelah potongan 20% dari Rp6.000", "Rp4.800"],
        ],
      ],
      "Menaikkan harga di aplikasi bukan curang. Pembeli di aplikasi membayar kemudahan: tidak perlu datang, bisa pesan dari meja kantor. Harga untuk pembeli langsung boleh tetap lebih murah, dan itu justru menjadi alasan pelanggan setia memesan langsung.",
      [
        "warn",
        "Jangan lupa biaya kemasan yang lebih kuat untuk pengiriman, dan risiko pesanan yang dibatalkan. Masukkan keduanya ke HPP versi daring.",
      ],
    ],
  },
  {
    title: "Langkah 5: Berani Naik Harga",
    blocks: [
      "Setelah semua hitungan selesai, Dina menghadapi bagian yang paling menakutkan: memberi tahu pelanggan bahwa risolnya naik dari Rp3.000 ke Rp4.500.",
      '"Nanti pada kabur," katanya. Kekhawatiran yang wajar, dan hampir semua pelaku usaha kecil pernah merasakannya.',
      ["h", "Kenapa pelanggan tidak sesensitif yang kamu kira"],
      "Pelanggan yang membeli karena rasa, kepercayaan, dan kemudahan jarang pergi hanya karena kenaikan harga yang wajar dan dijelaskan dengan baik. Yang biasanya membuat pelanggan pergi adalah kualitas yang turun diam-diam, porsi yang mengecil tanpa kabar, atau kenaikan yang mendadak tanpa penjelasan.",
      ["h", "Beri pilihan, bukan diskon"],
      "Daripada memberi potongan harga, Dina membuat tangga harga: satuan, paket hemat, dan paket arisan. Pembeli tetap bisa membeli sedikit, sementara yang membeli banyak merasa dihargai.",
      ["img", "tangga-harga", "Tangga harga: beri pilihan, bukan diskon."],
      ["h", "Contoh pesan kenaikan harga"],
      "Dina mengirim pesan ini ke grup pelanggan seminggu sebelum harga baru berlaku:",
      [
        "quote",
        "Halo kakak-kakak pelanggan Dapur Dina 🙏 Terima kasih sudah setia menemani risol kami. Mulai Sabtu depan, harga risol menjadi Rp4.500 karena kenaikan harga bahan dan supaya kualitas isian tetap sama penuhnya. Ada juga Paket Hemat 5 risol Rp20.000. Pesanan minggu ini masih harga lama ya!",
      ],
      "Hasilnya? Beberapa pelanggan berhenti memesan, dan penjualan harian sempat turun dari rata-rata 40 menjadi 26 risol. Tapi karena setiap risol kini benar-benar untung, hasil bulanan Dina berubah dari minus menjadi sekitar Rp450.000 di bulan pertama (26 risol × 26 hari × Rp1.250, dikurangi biaya tetap Rp400.000). Bukan angka besar, tapi untuk pertama kalinya usahanya membiayai dirinya sendiri.",
      ["h", "Cek lagi kesehatan hargamu"],
      ["quiz", CEK_HARGA],
      ["h", "Pisahkan dompet usaha"],
      "Satu kebiasaan terakhir yang membuat semua hitungan ini bertahan: **pisahkan uang usaha dari uang pribadi.** Rekening atau dompet berbeda, sesederhana apa pun. Bayar dirimu sendiri dari usaha (upah tenaga yang sudah kamu hitung), dan biarkan untungnya tumbuh sebagai modal.",
      [
        "summary",
        [
          "HPP = semua biaya satu batch ÷ jumlah produk, termasuk tenagamu sendiri dan cadangan produk gagal.",
          "Harga jual = HPP ÷ (1 − margin). Margin dihitung dari harga jual, bukan dari HPP.",
          "Titik impas = biaya tetap ÷ (harga − HPP). Tulis target harian dan tempel di tempat kerja.",
          "Naikkan harga dengan penjelasan dan pilihan paket, bukan diam-diam.",
        ],
      ],
    ],
  },
];
