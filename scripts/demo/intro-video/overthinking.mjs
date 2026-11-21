/**
 * Video pengantar "Keluar dari Lingkaran Overthinking" (D41, D43, D45). Pelan dan tenang: dibuka
 * dengan pertanyaan di malam hari, ada adegan latihan napas, tanpa angka besar di awal.
 */
export const OVERTHINKING_INTRO = {
  slug: "keluar-dari-lingkaran-overthinking",
  music: { mood: "tenang", bpm: 66 },
  captions: true,
  theme: {
    dark: "radial-gradient(120% 90% at 80% 0%, #3b4785 0%, #2e3a6b 40%, #1b2340 100%)",
    night: "radial-gradient(120% 100% at 20% 0%, #2a3260 0%, #1b2340 60%, #10152a 100%)",
    paper: "radial-gradient(100% 80% at 50% 0%, #f7f4ee, #e8e6f3)",
    accent: "#f3e6b5",
    accentInk: "#1b2340",
    primary: "#6a5ab0",
  },
  scenes: [
    {
      type: "question",
      bg: "night",
      text: "Sudah jam satu pagi, dan pikiranmu masih menyala?",
      sub: "Memutar ulang hari ini. Mengkhawatirkan hari esok.",
      say: "Sudah jam satu pagi, dan pikiranmu masih menyala? Memutar ulang hari ini, mengkhawatirkan hari esok.",
    },
    {
      type: "cover",
      kicker: "Pengantar ebook",
      title: "Keluar dari Lingkaran Overthinking",
      subtitle: "Menenangkan pikiran yang terus berputar, terutama menjelang tidur",
      meta: ["6 bab", "±20 menit baca", "Ditulis untuk dibaca malam hari"],
      say: "Keluar dari Lingkaran Overthinking. Buku untuk menenangkan pikiran yang terus berputar.",
    },
    {
      type: "quote",
      bg: "dark",
      text: "Pikiran di jam dua pagi bukan pikiran yang paling jujur. Itu pikiran yang paling lelah.",
      say: "Pikiran di jam dua pagi, bukan pikiran yang paling jujur. Itu pikiran yang paling lelah.",
    },
    {
      type: "list",
      bg: "paper",
      title: "Di dalamnya, pelan-pelan kamu belajar…",
      mark: "number",
      items: [
        "Menulis supaya bisa melepas",
        "Memberi kekhawatiran jam kunjungan",
        "Memilah: tindak, jadwalkan, atau lepaskan",
        "Kembali ke tubuh lewat napas",
      ],
      say: "Di dalamnya, pelan-pelan kamu belajar menulis supaya bisa melepas, memberi kekhawatiran jam kunjungan, memilah, dan kembali ke tubuh lewat napas.",
    },
    {
      type: "breath",
      title: "Coba sekarang, sebentar saja",
      say: "Coba sekarang, sebentar saja. Ikuti lingkaran ini. Tarik napas saat ia membesar, hembuskan saat ia mengecil.",
    },
    {
      type: "cta",
      bg: "night",
      lead: "Malam-malam yang tenang bisa dimulai malam ini.",
      button: "Baca Bab 1, gratis",
      say: "Malam-malam yang tenang bisa dimulai malam ini. Baca bab pertama, gratis.",
    },
  ],
};
