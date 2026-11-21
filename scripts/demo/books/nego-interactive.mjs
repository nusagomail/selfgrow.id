/**
 * Unsur interaktif "Berani Nego Gaji" (D42). Tokoh: Raka, 27 tahun, analis pemasaran yang
 * mendapat tawaran Rp8 juta untuk pekerjaan barunya (ilustrasi). Selisih Rp1 juta per bulan
 * dipakai di grafik, tool, dan video (≈ Rp76 juta dalam lima tahun).
 */
const yes = (q) => ({
  q,
  options: [
    { label: "Sudah", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

export const SIAP_NEGO = {
  id: "siap-nego",
  title: "Seberapa siap kamu bernegosiasi?",
  intro: "Jawab untuk tawaran kerja atau kenaikan gaji yang sedang kamu hadapi.",
  questions: [
    yes("Aku tahu rentang gaji pasar untuk peran dan pengalamanku dari minimal tiga sumber."),
    yes("Aku sudah menentukan angka target dan angka terendah yang masih kuterima."),
    yes("Aku punya tiga bukti hasil kerja yang bisa diukur (angka, proyek, penghargaan)."),
    yes('Aku sudah menyiapkan kalimat untuk menjawab "Berapa gaji yang kamu harapkan?"'),
    yes("Aku tahu benefit lain yang bisa dinegosiasikan selain gaji pokok."),
    yes("Aku sudah berlatih mengucapkan angkaku dengan suara keras, minimal sekali."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih menebak",
      text: "Tidak apa-apa, sebagian besar orang masuk ruang negosiasi dalam kondisi ini. Mulailah dari Bab 2: riset angka.",
    },
    {
      min: 3,
      max: 4,
      title: "Setengah siap",
      text: "Fondasinya ada. Lengkapi bukti hasil kerja (Bab 3) dan latih kalimatmu (Bab 4).",
    },
    {
      min: 5,
      max: 6,
      title: "Siap masuk ruangan",
      text: "Persiapanmu matang. Bab 5 membantumu menghadapi jawaban HR yang tidak terduga.",
    },
  ],
};

export const SELISIH_BARS = {
  title: "Selisih Rp1 juta per bulan, lima tahun kemudian",
  kind: "bars",
  format: "rupiah",
  items: [
    { label: "Tahun 1", value: 13000000, color: "#c8a24a" },
    { label: "Tahun 2", value: 14040000, color: "#b8913a" },
    { label: "Tahun 3", value: 15163200, color: "#a8802c" },
    { label: "Tahun 4", value: 16376256, color: "#97701f" },
    { label: "Tahun 5", value: 17686356, color: "#856014" },
  ],
  note: "Ilustrasi: 13 kali gaji setahun (termasuk THR), kenaikan 8% per tahun. Total sekitar Rp76 juta.",
};
