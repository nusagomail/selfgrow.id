/**
 * "Validasi Ide Sebelum Modal Habis", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: karyawan atau anak muda yang ingin membuka usaha sampingan dengan tabungan
 *   Rp10–50 juta, dan hampir membelanjakannya untuk sewa, alat, dan logo sebelum ada pembeli.
 * - Gagasan inti: pujian dan "aku pasti beli" bukan data. Bukti datang dari perilaku: cerita
 *   masa lalu dan komitmen (waktu, kontak, uang). Modal dikeluarkan bertahap, sesuai bukti.
 * - Kerangka: alasan usaha gagal (tidak ada kebutuhan pasar, CB Insights) → kesenjangan niat dan
 *   tindakan (Sheeran 2002) dan bertanya tentang masa lalu (The Mom Test, Fitzpatrick 2013) →
 *   tangga bukti → kartu dugaan dengan batas lulus → batas modal aman, titik impas, modal
 *   bertahap → lanjut, ubah, atau berhenti.
 * - Bentuk: Nadia (29, staf HR di Makassar, tabungan Rp40 juta, ide katering bekal sehat). Setiap
 *   bab dibuka dengan saldo tabungannya, karena itulah yang dipertaruhkan.
 * - Gambar: buku catatan eksperimen (kertas berpetak, stabilo, stempel). Ide adalah dugaan yang
 *   diuji, bukan rencana yang langsung dibiayai.
 * - Interaktif: kuis kesiapan uji, grafik "mau" sampai bayar, tool penilai uji pra-pesan, batas
 *   modal aman, dan kalkulator titik impas dari buku "Hitung Harga Jual yang Untung".
 */
import { BUKTI_NADIA, SIAP_UJI } from "./validasi-interactive.mjs";

export const VALIDASI_1 = [
  {
    title: "Rp40 Juta dan Satu Ide",
    blocks: [
      "**Tabungan Nadia: Rp40.000.000.** Hasil menabung enam tahun bekerja sebagai staf HR di Makassar.",
      "Idenya sudah matang di kepala: katering bekal sehat untuk karyawan kantor. Setiap hari dia melihat rekan kerjanya makan gorengan atau mi instan karena tidak sempat keluar. Rencananya juga sudah lengkap: sewa dapur Rp3 juta per bulan, peralatan masak Rp12 juta, desain logo dan kemasan Rp5 juta, promosi Rp4 juta.",
      'Teman-temannya mendukung. "Bagus banget idenya, Nad! Aku pasti langganan!" Nadia hampir mentransfer uang muka sewa dapur.',
      ["h", "Kenapa banyak usaha tutup"],
      [
        "fact",
        'Dalam analisis lebih dari seratus cerita kegagalan perusahaan rintisan, "tidak ada kebutuhan pasar" (produknya tidak cukup dibutuhkan orang) selalu termasuk dua alasan paling sering, bersama kehabisan modal.',
        "CB Insights, The Top Reasons Startups Fail",
      ],
      "Keduanya sering saling terkait: modal habis untuk membangun sesuatu yang ternyata tidak cukup dibeli orang. Buku ini membantumu membalik urutannya: **buktikan dulu ada yang membeli, baru keluarkan modal**.",
      ["h", "Cek dulu"],
      ["quiz", SIAP_UJI],
    ],
  },
  {
    title: "Pujian Bukan Data",
    blocks: [
      "**Tabungan Nadia: Rp40.000.000.** Dia menunda transfer sewa dapur satu minggu, untuk bicara dengan calon pembeli lebih dulu.",
      'Masalah pertamanya: semua yang dia tanya menjawab "mau". Tapi Nadia ingat, teman-temannya juga pernah bilang "mau" ikut kelas yoga bersama, dan tidak satu pun datang.',
      [
        "fact",
        "Tinjauan atas ratusan penelitian menemukan bahwa niat seseorang hanya menjelaskan sekitar 28% dari apa yang akhirnya mereka lakukan. Banyak orang yang berniat, tidak pernah bertindak.",
        "Sheeran, European Review of Social Psychology, 2002",
      ],
      'Orang tidak berbohong saat bilang "mau". Mereka sedang bersikap baik, dan mereka memang tidak pandai menebak perilakunya sendiri di masa depan. Yang bisa mereka ceritakan dengan akurat adalah **apa yang sudah mereka lakukan**.',
      ["img", "pertanyaan-baik", "Tanyakan masa lalu, bukan masa depan."],
      ["h", "Aturan bertanya"],
      [
        "ul",
        [
          "Jangan ceritakan idemu di awal. Begitu tahu idemu, orang cenderung memuji.",
          "Tanyakan kejadian nyata: kapan terakhir, berapa, dengan apa, kenapa berhenti.",
          "Dengarkan keluhan yang sudah membuat mereka mengeluarkan uang atau waktu. Itu masalah yang nyata.",
          "Bicara dengan orang yang bukan keluarga atau teman dekat.",
        ],
      ],
      [
        "exercise",
        [
          'Tulis siapa calon pembelimu sespesifik mungkin, misalnya "karyawan kantor di Jalan Pettarani yang makan siang di meja".',
          "Temui atau telepon sepuluh orang seperti itu minggu ini.",
          "Catat kalimat persis mereka, terutama yang menyebut uang, waktu, atau usaha yang sudah dicoba.",
        ],
        "Lembar kerja: sepuluh percakapan",
      ],
    ],
  },
  {
    title: "Tangga Bukti",
    blocks: [
      "**Tabungan Nadia: Rp40.000.000.** Dari sepuluh percakapan, enam orang pernah berlangganan katering dan berhenti. Alasannya sama: menunya membosankan dan sering terlambat datang.",
      'Itu informasi yang jauh lebih berharga daripada "ide bagus". Tapi masih belum cukup. Nadia butuh bukti yang lebih kuat: apakah ada yang mau **menyerahkan sesuatu**?',
      ["img", "tangga-bukti", "Tangga bukti."],
      "Setiap anak tangga meminta sedikit lebih banyak dari calon pembeli. Pujian tidak meminta apa pun. Mengisi daftar tunggu meminta nomor WhatsApp. Uang muka meminta uang. Memesan lagi meminta kepuasan.",
      ["chart", BUKTI_NADIA],
      "Tiga puluh orang bilang mau. Hanya lima yang membayar. Kalau Nadia menghitung pasarnya dari tiga puluh orang itu, perhitungannya enam kali terlalu besar.",
      [
        "tip",
        "Uang muka kecil sudah cukup, misalnya Rp20.000 untuk pesanan minggu depan. Yang diuji bukan besarnya uang, tapi kesediaan untuk membayar.",
      ],
    ],
  },
  {
    title: "Uji Paling Murah yang Bisa Membuktikanmu Salah",
    blocks: [
      "**Tabungan Nadia: Rp39.500.000.** Rp500.000 dipakai untuk bahan sepuluh porsi contoh dan ongkos antar.",
      "Uji yang baik bukan yang paling meyakinkan, tapi yang **paling murah dan paling cepat bisa membuktikan idemu salah**. Kalau ternyata salah, lebih baik tahu di minggu pertama dengan Rp500 ribu, daripada di bulan keenam dengan Rp25 juta.",
      ["h", "Tulis dugaanmu dan batas lulusnya"],
      ["img", "kartu-dugaan", "Kartu dugaan Nadia."],
      'Batas lulus harus ditulis **sebelum** uji. Kalau tidak, hasil apa pun akan terasa "lumayan", dan kamu akan terus berharap.',
      ["h", "Contoh uji murah"],
      [
        "ul",
        [
          "**Pra-pesan lewat WhatsApp**: tawarkan menu minggu depan dengan uang muka. Belum ada dapur, belum ada logo.",
          "**Contoh untuk satu kantor**: antar sepuluh porsi, lalu tawarkan paket mingguan.",
          "**Halaman sederhana atau sorotan Instagram** berisi menu dan formulir pesanan, untuk melihat berapa yang benar-benar memesan.",
        ],
      ],
      ["tool", "uji-pra-pesan"],
    ],
  },
  {
    title: "Hitung Sebelum Belanja",
    blocks: [
      "**Tabungan Nadia: Rp39.500.000.** Ujinya lolos. Lima dari tiga puluh orang membayar uang muka. Godaan untuk langsung menyewa dapur muncul lagi.",
      "Sebelum itu, Nadia menghitung satu hal yang selama ini dia lewatkan: **berapa yang sebenarnya boleh dipakai**. Rp40 juta itu bukan seluruhnya modal. Sebagian adalah dana daruratnya.",
      ["tool", "batas-modal-aman"],
      "Dengan pengeluaran Rp4,5 juta per bulan dan dana darurat enam bulan, modal aman Nadia hanya Rp13 juta, bukan Rp40 juta. Rencana awalnya (sewa, alat, logo, promosi) senilai Rp24 juta akan memakan dana daruratnya.",
      ["h", "Berapa porsi supaya tidak rugi"],
      "Harga bekalnya Rp35.000, biaya bahan dan kemasan Rp21.000. Kalau menyewa dapur dan menanggung biaya tetap Rp4,2 juta per bulan, Nadia harus menjual 300 porsi sebulan, sekitar 12 porsi setiap hari kerja, hanya untuk tidak rugi.",
      ["tool", "kalkulator-titik-impas"],
      ["img", "modal-bertahap", "Keluarkan modal sesuai buktinya."],
      [
        "info",
        'Untuk menghitung harga jual dan HPP lebih rinci, lihat buku "Hitung Harga Jual yang Untung".',
      ],
    ],
  },
  {
    title: "Lanjut, Ubah, atau Berhenti",
    blocks: [
      "**Tabungan Nadia: Rp37.900.000.** Enam minggu, dua tahap uji, total Rp2,1 juta.",
      "Di tahap coba kecil, Nadia memasak dari dapur rumahnya selama dua minggu. Pesanan harian karyawan tidak mencapai target, tapi ada yang tidak dia duga: tiga bagian HR dari kantor lain memesan 30 sampai 40 kotak untuk rapat dan pelatihan, dan dua di antaranya memesan lagi.",
      ["img", "lanjut-ubah-berhenti", "Lanjut, ubah, atau berhenti."],
      "Ini keputusan **ubah**. Idenya tidak salah seluruhnya, tapi pembeli yang membayar bukan yang dia duga. Nadia mengganti tawarannya menjadi katering sehat untuk rapat kantor, pembeli yang dia kenal betul karena dia sendiri orang HR.",
      "Tiga bulan kemudian, pesanan rutinnya cukup untuk membeli peralatan masak. Dia tetap belum menyewa dapur.",
      [
        "reflect",
        [
          "Bukti apa yang selama ini kamu anggap kuat, padahal hanya pujian?",
          "Uji paling murah apa yang bisa membuktikan idemu salah minggu ini?",
        ],
      ],
      [
        "summary",
        [
          '"Tidak ada kebutuhan pasar" adalah salah satu alasan paling sering usaha gagal. Buktikan ada pembeli sebelum mengeluarkan modal.',
          'Pujian dan "aku pasti beli" bukan data. Tanyakan apa yang sudah orang lakukan, bukan yang akan mereka lakukan.',
          "Naiki tangga bukti: cerita masa lalu, kontak, uang, lalu pembelian ulang.",
          "Tulis dugaan dan batas lulus sebelum menguji. Cari uji paling murah yang bisa membuktikanmu salah.",
          "Pisahkan dana darurat dari modal, hitung titik impas, dan keluarkan modal bertahap sesuai bukti.",
          "Setelah uji: lanjut, ubah, atau berhenti. Berhenti dengan murah juga keberhasilan.",
        ],
      ],
    ],
  },
];
