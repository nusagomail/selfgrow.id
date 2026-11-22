/**
 * Unsur interaktif "Hitung Harga Jual yang Untung" (D42). Kuis ini kebalikan buku lain: skor naik
 * kalau kebiasaannya sudah benar ("Sudah" = 1). Contoh Dina (risol mayo) adalah ilustrasi.
 */
const done = (q) => ({
  q,
  options: [
    { label: "Sudah", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

export const CEK_HARGA = {
  id: "cek-harga",
  mode: "score",
  label: "Cek harga",
  title: "Cek kesehatan harga jualmu",
  intro: "Centang jujur. Skor tinggi = harga jualmu sudah dihitung, bukan ditebak.",
  questions: [
    done("Aku tahu HPP setiap produkku sampai ke rupiah."),
    done("Upah tenagaku sendiri ikut masuk ke HPP."),
    done("Biaya kemasan, gas, dan ongkir belanja ikut dihitung."),
    done("Aku menyisihkan cadangan untuk produk gagal atau tidak laku."),
    done("Aku tahu berapa produk yang harus terjual tiap bulan supaya tidak rugi."),
    done("Uang usaha dan uang pribadi dipisah (rekening atau dompet berbeda)."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Harga masih tebakan",
      text: "Tidak apa-apa, kebanyakan usaha kecil mulai dari sini. Bab 2 dan 3 akan mengubah tebakan jadi angka.",
    },
    {
      min: 3,
      max: 4,
      title: "Setengah jalan",
      text: "Dasarnya sudah ada. Lengkapi biaya yang terlewat di Bab 3, lalu pasang target di Bab 6.",
    },
    {
      min: 5,
      max: 6,
      title: "Harga yang sehat",
      text: "Kamu sudah menghitung dengan rapi. Bab 8 membantumu berani menaikkan harga saat perlu.",
    },
  ],
};

export const UMKM_COUNTER = {
  title: "Usaha kecil, peran raksasa",
  kind: "counter",
  format: "percent",
  items: [
    { label: "sumbangan UMKM terhadap PDB Indonesia", value: 60.5, color: "#c2571a" },
    { label: "tenaga kerja yang diserap UMKM", value: 97, color: "#7a4a1d" },
  ],
  note: "Kemenko Perekonomian, Oktober 2026. 99,7% di antaranya usaha mikro (Kementerian UMKM).",
};

export const HARGA_BARS = {
  title: "Ke mana Rp4.500 harga risol Dina pergi",
  kind: "bars",
  format: "rupiah",
  items: [
    { label: "Bahan baku", value: 1900, color: "#c2571a" },
    { label: "Untung", value: 1250, color: "#2f7d4f" },
    { label: "Tenaga Dina", value: 900, color: "#e39b4a" },
    { label: "Kemasan", value: 250, color: "#a0785a" },
    { label: "Gas, listrik, ongkir", value: 200, color: "#c9a27e" },
  ],
  note: "Contoh ilustrasi, satu batch 50 risol.",
};

/** Bab 4: hitung cepat markup dan margin (D50, uji pengetahuan). */
export const HITUNG_MARGIN = {
  id: "hitung-margin",
  mode: "knowledge",
  label: "Hitung cepat",
  title: "Markup atau margin?",
  intro: "Pegang kertas kalau perlu. Satu soal, satu jawaban.",
  questions: [
    {
      q: "HPP Rp10.000, dijual Rp15.000. Markup-nya berapa?",
      options: [
        { label: "33%", points: 0 },
        { label: "50%", points: 0, correct: true },
        { label: "150%", points: 0 },
      ],
      explain: "Markup dibandingkan HPP: untung Rp5.000 ÷ HPP Rp10.000 = 50%.",
    },
    {
      q: "Dengan angka yang sama, margin-nya berapa?",
      options: [
        { label: "33%", points: 0, correct: true },
        { label: "50%", points: 0 },
        { label: "66%", points: 0 },
      ],
      explain:
        "Margin dibandingkan harga jual: Rp5.000 ÷ Rp15.000 ≈ 33%. Angka yang sama, persen berbeda.",
    },
    {
      q: "HPP Rp3.000 dan kamu ingin margin 25%. Harga jual yang tepat?",
      options: [
        { label: "Rp3.750", points: 0 },
        { label: "Rp4.000", points: 0, correct: true },
        { label: "Rp4.500", points: 0 },
      ],
      explain:
        "Rp3.000 ÷ (1 − 0,25) = Rp4.000. Rp3.750 adalah hasil menambah 25% dari HPP, dan marginnya hanya 20%.",
    },
    {
      q: "Margin di bawah berapa yang disebut sangat rentan?",
      options: [
        { label: "Di bawah 20%", points: 0, correct: true },
        { label: "Di bawah 40%", points: 0 },
        { label: "Di bawah 60%", points: 0 },
      ],
      explain: "Di bawah 20%, satu batch gagal atau satu promo bisa menghapus untung sebulan.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih tertukar",
      text: "Tidak apa-apa, istilah ini memang sering tertukar. Pakai rumus di kotak kutipan: harga jual = HPP ÷ (1 − margin).",
    },
    {
      min: 3,
      max: 4,
      title: "Kamu tidak akan salah hitung lagi",
      text: "Sekarang masukkan angkamu sendiri ke kalkulator di bawah.",
    },
  ],
};
