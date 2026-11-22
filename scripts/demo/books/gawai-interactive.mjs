/**
 * Unsur interaktif "Anak dan Gawai" (D42). Keluarga ilustrasi: Bu Rina (34) dan Pak Dimas,
 * dengan Alif (8, kelas 3 SD) dan Naya (4). Kuis memotret suasana urusan layar di rumah,
 * bukan menilai orang tua.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Hampir tiap hari", points: 2 },
    { label: "Kadang", points: 1 },
    { label: "Jarang", points: 0 },
  ],
});

export const SUASANA_LAYAR = {
  id: "suasana-layar",
  mode: "scale",
  label: "Potret rumahmu",
  title: "Seberapa tegang urusan layar di rumahmu?",
  intro: "Pikirkan dua minggu terakhir. Jawab jujur; tidak ada yang menilai.",
  questions: [
    freq(
      'Mengambil gawai dari anak berakhir dengan tangisan, teriakan, atau tawar-menawar "lima menit lagi".',
    ),
    freq("Aturan layar berubah-ubah tergantung suasana hati atau seberapa capek kamu hari itu."),
    freq("Anak memakai gawai di kamar atau di tempat tidur menjelang tidur."),
    freq("Gawai dipakai supaya anak diam saat makan, di jalan, atau saat kamu sedang sibuk."),
    freq("Kamu memegang ponsel saat anak sedang mengajakmu bicara atau bermain."),
    freq("Kamu tidak yakin apa yang ditonton atau dimainkan anak."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Cukup tenang",
      text: "Urusan layar di rumahmu relatif terkendali. Bab 3 dan 4 membantu menuliskannya menjadi kesepakatan, supaya tetap stabil saat anak bertambah besar.",
    },
    {
      min: 5,
      max: 8,
      title: "Sering tarik-menarik",
      text: "Layar sudah menjadi sumber gesekan. Mulailah dari Bab 3 (lampu lalu lintas layar) dan Bab 4 (aba-aba sebelum selesai).",
    },
    {
      min: 9,
      max: 12,
      title: "Perang setiap hari",
      text: "Kamu tidak sendirian, dan ini bisa berubah. Baca berurutan dari Bab 1; Bab 6 menjelaskan kenapa minggu pertama biasanya terasa lebih berat sebelum membaik.",
    },
  ],
};

export const MINGGU_PERTAMA = {
  title: "Pertengkaran soal layar di rumah Bu Rina, minggu pertama kesepakatan",
  kind: "bars",
  format: "number",
  items: [
    { label: "Senin", value: 4, color: "#ef6f6c" },
    { label: "Selasa", value: 6, color: "#ef6f6c" },
    { label: "Rabu", value: 5, color: "#f4a259" },
    { label: "Kamis", value: 3, color: "#f4a259" },
    { label: "Jumat", value: 2, color: "#f6c85f" },
    { label: "Sabtu", value: 1, color: "#5bb37f" },
    { label: "Minggu", value: 1, color: "#5bb37f" },
  ],
  note: "Ilustrasi. Hari kedua biasanya paling berat: anak menguji apakah aturan barunya sungguhan.",
};

/** Bab 4: saat waktu layar habis (D50, skenario). */
export const SATU_LEVEL_LAGI = {
  id: "satu-level-lagi",
  mode: "scenario",
  label: "Pukul 19.30",
  title: '"Satu level lagi, Bun! Tanggung!"',
  intro: "Waktu layar Alif habis sesuai kesepakatan. Dia sedang di tengah permainan.",
  questions: [
    {
      q: "Apa yang kamu lakukan?",
      options: [
        {
          label: "Langsung mengambil tabletnya dari tangan Alif.",
          points: 0,
          feedback:
            "Perpindahan yang mendadak memicu ledakan. Masalahnya bukan aturannya, tapi tidak ada aba-aba sebelumnya.",
        },
        {
          label: '"Ya sudah, sepuluh menit lagi." (ketiga kalinya malam ini)',
          points: 0,
          feedback:
            "Setiap tambahan mengajarkan bahwa tawar-menawar berhasil. Besok, tawar-menawarnya akan lebih panjang.",
        },
        {
          label:
            '"Selesaikan level ini, lalu tabletnya kamu sendiri yang taruh di keranjang. Habis itu kita mandi."',
          points: 2,
          feedback:
            "Akhir yang jelas, anak tetap punya peran, dan ada kegiatan berikutnya yang langsung menunggu.",
        },
        {
          label: "Mulai besok pakai aba-aba 10 menit dan 2 menit sebelum waktu habis.",
          points: 2,
          feedback:
            "Mencegah lebih mudah daripada meredakan. Aba-aba membuat akhirnya bisa ditebak.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Adu kuat malam ini",
      text: "Bukan salahmu; malam hari semua orang lelah. Tempel gambar aba-aba di dekat keranjang gawai.",
    },
    {
      min: 2,
      max: 2,
      title: "Sistem yang bekerja",
      text: "Kamu tidak perlu menang adu kuat, karena akhirnya sudah disepakati dan bisa ditebak.",
    },
  ],
};
