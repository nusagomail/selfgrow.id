/**
 * Unsur interaktif "Bicara di Depan Umum Tanpa Gemetar" (D42). Tokoh: Raka, 27, analis keuangan
 * yang harus mempresentasikan laporan kuartal ke direksi dalam sepuluh hari (ilustrasi).
 * Kuis memetakan di lapis mana gemetarnya paling terasa: badan, pikiran, atau materi.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Sering", points: 2 },
    { label: "Kadang", points: 1 },
    { label: "Jarang", points: 0 },
  ],
});

export const CEK_GEMETAR = {
  id: "cek-gemetar",
  title: "Seberapa gemetar kamu saat harus bicara di depan orang?",
  intro: "Ingat presentasi, rapat, atau acara terakhir saat kamu harus bicara di depan orang.",
  questions: [
    freq("Beberapa hari sebelumnya, kamu sudah membayangkan dirimu gagal di depan mereka."),
    freq("Saat mulai bicara, suaramu bergetar atau napasmu terasa pendek."),
    freq("Kamu yakin semua orang bisa melihat betapa gugupnya kamu."),
    freq("Pikiranmu tiba-tiba kosong di tengah kalimat."),
    freq("Kamu membaca slide kata demi kata karena takut lupa."),
    freq("Kamu mencari alasan supaya orang lain saja yang presentasi."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Gugup yang wajar",
      text: "Gugupmu masih terkendali. Bab 4 dan 5 (kerangka dan latihan) akan membuatmu lebih tajam.",
    },
    {
      min: 5,
      max: 8,
      title: "Gugup yang mengganggu",
      text: "Gugupmu mulai mengambil alih. Bab 2 dan 3 membantu menenangkan badan dan pikiran, lalu Bab 4 menyiapkan pegangan.",
    },
    {
      min: 9,
      max: 12,
      title: "Gugup yang membuatmu menghindar",
      text: "Kamu mungkin sudah mulai menghindari kesempatan bicara. Baca berurutan dari Bab 1, dan mulai latihan dari anak tangga paling bawah di Bab 5.",
    },
  ],
};

export const LATIHAN_RAKA = {
  title: "Rasa gugup Raka di setiap latihan (skala 1–10)",
  kind: "bars",
  format: "number",
  items: [
    { label: "Latihan 1: baca lantang sendirian", value: 8, color: "#b3261e" },
    { label: "Latihan 2: berdiri dan pakai pengatur waktu", value: 7, color: "#c8502a" },
    { label: "Latihan 3: rekam di ponsel", value: 7, color: "#d97a36" },
    { label: "Latihan 4: di depan satu teman", value: 5, color: "#e6a247" },
    { label: "Latihan 5: simulasi di ruang rapat", value: 4, color: "#ffd27a" },
  ],
  note: "Ilustrasi. Gugupnya tidak hilang, tapi turun setiap kali dihadapi.",
};
