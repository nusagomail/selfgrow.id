/**
 * Unsur interaktif "Keluar dari Lingkaran Overthinking" (D42). Kuis skala 0–4 ("seberapa mirip
 * denganmu"), bukan alat diagnosis. Angka 91% dari LaFreniere & Newman (2019).
 */
const mirip = (q) => ({
  q,
  options: [
    { label: "0", points: 0 },
    { label: "1", points: 1 },
    { label: "2", points: 2 },
    { label: "3", points: 3 },
    { label: "4", points: 4 },
  ],
});

export const PUTARAN_PIKIRAN = {
  id: "putaran-pikiran",
  mode: "scale",
  label: "Seberapa mirip denganmu?",
  ends: ["Tidak mirip", "Sangat mirip"],
  title: "Seberapa sering pikiranmu berputar?",
  intro: "Ini bukan tes diagnosis. Anggap seperti bercermin sebentar.",
  questions: [
    mirip(
      "Aku memutar ulang percakapan yang sudah lewat dan memikirkan apa yang seharusnya kukatakan.",
    ),
    mirip("Aku sulit tidur karena pikiranku masih sibuk."),
    mirip("Aku membayangkan hal terburuk sebelum sesuatu terjadi."),
    mirip("Aku lama sekali memutuskan hal kecil karena takut salah pilih."),
    mirip("Aku sadar sedang berpikir berlebihan, tapi tidak bisa berhenti."),
    mirip("Pikiranku membuatku lelah, walau badanku tidak melakukan apa-apa."),
    mirip("Aku mencari kepastian berulang kali, bertanya ke orang lain atau mengecek ulang."),
  ],
  results: [
    {
      min: 0,
      max: 9,
      title: "Pikiran yang cukup tenang",
      text: "Sesekali berputar itu manusiawi. Teknik di Bab 4 dan 5 bisa kamu simpan untuk malam-malam yang berat.",
    },
    {
      min: 10,
      max: 18,
      title: "Sering berputar",
      text: "Lingkarannya sudah cukup sering menyala. Mulailah dari waktu khawatir di Bab 4, pelan-pelan.",
    },
    {
      min: 19,
      max: 28,
      title: "Lingkaran yang melelahkan",
      text: "Pikiranmu jarang beristirahat, dan itu berat. Buku ini bisa menemanimu, dan jangan ragu bicara dengan tenaga profesional (lihat Bab 6).",
    },
  ],
};

export const KHAWATIR_COUNTER = {
  title: "Kekhawatiran yang ternyata tidak terjadi",
  kind: "counter",
  format: "percent",
  items: [
    {
      label: "dari semua kekhawatiran yang dicatat peserta selama penelitian",
      value: 91.4,
      color: "#7c6fc4",
    },
  ],
  note: "LaFreniere & Newman, Behavior Therapy (2019), pada orang dengan kecemasan berlebih.",
};
