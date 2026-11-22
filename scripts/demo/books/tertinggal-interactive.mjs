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
  mode: "scale",
  label: "Cek perasaan",
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
      text: "Rasa tertinggalmu datang dan pergi. Bab 6 (gunungmu sendiri) membantu memperjelas arah, supaya rasa itu makin jarang mampir.",
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

/** Bab 3: menguji "jadwal" di kepala (D50, uji pengetahuan). */
export const JADWAL_SIAPA = {
  id: "jadwal-siapa",
  mode: "knowledge",
  label: "Tebak dulu",
  title: "Seberapa akurat jadwal di kepalamu?",
  questions: [
    {
      q: "Rata-rata usia pendiri perusahaan yang tumbuh paling cepat (data 2,7 juta pendiri di AS)?",
      options: [
        { label: "25 tahun", points: 0 },
        { label: "32 tahun", points: 0 },
        { label: "45 tahun", points: 0, correct: true },
      ],
      explain:
        "Azoulay dkk. (2020). Bahkan di bidang teknologi, rata-ratanya akhir 30-an sampai sekitar 40.",
    },
    {
      q: "Kemampuan kosakata dan pengetahuan umum memuncak sekitar usia…",
      options: [
        { label: "Awal 20-an", points: 0 },
        { label: "Akhir 30-an", points: 0 },
        { label: "Akhir 60-an", points: 0, correct: true },
      ],
      explain: "Hartshorne & Germine (2015): tidak ada satu usia ketika semua kemampuan memuncak.",
    },
    {
      q: "Dalam penelitian Vogel dkk. (2014), harga diri yang lebih rendah pada pengguna Facebook paling sering dijelaskan oleh…",
      options: [
        { label: "Lamanya waktu di depan layar", points: 0 },
        { label: "Lebih sering melihat orang yang tampak lebih baik", points: 0, correct: true },
        { label: "Jumlah teman yang sedikit", points: 0 },
      ],
      explain:
        "Perbandingan ke atas. Yang menyakitkan bukan layarnya, tapi penggaris yang kita pakai di depannya.",
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Jadwalmu terlalu sempit",
      text: "Kebanyakan orang menebak jauh lebih muda. Jadwal di kepala jarang cocok dengan data.",
    },
    {
      min: 2,
      max: 3,
      title: "Jadwal yang lebih lapang",
      text: "Kamu tahu usia 25 belum garis tengah. Sekarang ganti penggarisnya (Bab 4).",
    },
  ],
};
