/**
 * Unsur interaktif "Umur 25 dan Merasa Tertinggal" (D42). Tokoh: Tara, 25, staf administrasi
 * di sebuah kampus swasta di Yogyakarta (ilustrasi). Kuis memetakan dari mana rasa tertinggal
 * datang: perbandingan, pertanyaan orang lain, atau arah yang belum jelas.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Sering", points: 2 },
    { label: "Kadang", points: 1 },
    { label: "Jarang", points: 0 },
  ],
});

export const CEK_TERTINGGAL = {
  id: "cek-tertinggal",
  title: "Seberapa sering kamu merasa tertinggal?",
  intro: "Pikirkan sebulan terakhir.",
  questions: [
    freq("Setelah membuka media sosial, kamu merasa hidupmu kalah dibanding teman seangkatan."),
    freq(
      'Kamu punya "jadwal" di kepala (lulus, kerja, menikah, punya rumah) dan merasa terlambat dari jadwal itu.',
    ),
    freq(
      'Pertanyaan seperti "kapan nikah?" atau "kerja di mana sekarang?" membuatmu ingin menghindari acara keluarga.',
    ),
    freq(
      "Kamu sulit menyebutkan apa yang sebenarnya kamu inginkan, di luar yang diharapkan orang lain.",
    ),
    freq("Pencapaianmu sendiri terasa kecil, bahkan saat orang lain memujinya."),
    freq("Kamu menunda mencoba sesuatu karena merasa sudah terlalu tua untuk memulai."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Sesekali, dan wajar",
      text: "Rasa tertinggalmu datang dan pergi. Bab 5 (gunungmu sendiri) membantu memperjelas arah, supaya rasa itu makin jarang mampir.",
    },
    {
      min: 5,
      max: 8,
      title: "Sering membandingkan",
      text: "Penggaris yang kamu pakai kemungkinan besar milik orang lain. Bab 2 sampai 4 membantumu menggantinya.",
    },
    {
      min: 9,
      max: 12,
      title: "Merasa jauh tertinggal",
      text: "Rasa ini sedang berat. Baca berurutan dari Bab 1. Kalau perasaan ini disertai sedih berkepanjangan atau putus asa, bicarakan juga dengan psikolog.",
    },
  ],
};

export const PUNCAK_KEMAMPUAN = {
  title: "Usia puncak beberapa kemampuan berpikir (perkiraan)",
  kind: "bars",
  format: "number",
  items: [
    { label: "Kecepatan memproses informasi", value: 19, color: "#c9a27e" },
    { label: "Memori kerja jangka pendek", value: 30, color: "#b9825a" },
    { label: "Membaca emosi orang lain", value: 48, color: "#8a9a6b" },
    { label: "Kosakata dan pengetahuan", value: 67, color: "#5c7a5a" },
  ],
  note: "Usia dalam tahun, dibulatkan dari Hartshorne & Germine (2015). Tidak ada satu usia ketika semua kemampuan memuncak.",
};
