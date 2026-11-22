/**
 * Unsur interaktif "Anak dan Gawai" (D42). Keluarga ilustrasi: Bu Rina (34) dan Pak Dimas,
 * dengan Alif (8, kelas 3 SD) dan Naya (4). Kuis memotret suasana urusan layar di rumah,
 * bukan menilai orang tua.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Hampir setiap hari", points: 2 },
    { label: "Kadang-kadang", points: 1 },
    { label: "Jarang", points: 0 },
  ],
});

export const SUASANA_LAYAR = {
  id: "suasana-layar",
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
