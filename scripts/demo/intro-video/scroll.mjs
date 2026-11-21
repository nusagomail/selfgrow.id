/**
 * Video pengantar "Lepas dari Scroll Tanpa Ujung" (D41, D43). Susunan adegan khusus buku ini:
 * dibuka dengan angka, bukan sampul. `say` = naskah narasi per adegan.
 */
export const SCROLL_INTRO = {
  slug: "lepas-dari-scroll-tanpa-ujung",
  music: { mood: "tenang", bpm: 76 },
  captions: true,
  scenes: [
    {
      type: "bigNumber",
      kicker: "Rata-rata orang Indonesia",
      value: "6 jam",
      label: "sehari menatap aplikasi di ponsel",
      note: "data.ai, State of Mobile 2024 (data 2023)",
      say: "Enam jam. Itu rata-rata waktu orang Indonesia menatap ponsel, setiap hari.",
    },
    {
      type: "cover",
      kicker: "Pengantar ebook",
      title: "Lepas dari Scroll Tanpa Ujung",
      subtitle: "Mengambil kembali waktu dan perhatian dari layar ponsel",
      meta: ["8 bab", "±30 menit baca", "Tes diri & kalkulator"],
      say: "Lepas dari Scroll Tanpa Ujung. Buku untuk mengambil kembali waktu dan perhatianmu dari layar.",
    },
    {
      type: "question",
      text: "Niatnya cek pesan. Kok tiba-tiba sudah satu jam?",
      sub: "Itu bukan karena kamu lemah. Aplikasinya memang dirancang begitu.",
      bg: "night",
      say: "Niatnya cuma cek pesan, tiba-tiba sudah satu jam. Itu bukan karena kamu lemah. Aplikasinya memang dirancang begitu.",
    },
    {
      type: "story",
      title: "Kenalan dengan Dimas",
      initial: "D",
      lines: ["29 tahun, staf pemasaran di Surabaya", "Merasa selalu tidak punya waktu"],
      stats: [
        ["7j 12m", "waktu layar sehari"],
        ["96×", "membuka ponsel"],
        ["110", "hari setahun"],
      ],
      end: "Dalam 30 hari, dia mengambil kembali lebih dari empat jam setiap hari.",
      say: "Kenalkan Dimas. Waktu layarnya tujuh jam sehari. Dalam tiga puluh hari, dia mengambil kembali lebih dari empat jam setiap harinya.",
    },
    {
      type: "compare",
      title: "Bukan berhenti total, tapi kamu yang memilih",
      left: {
        title: "Sebelumnya",
        items: [
          "Bangun langsung buka ponsel",
          "Satu video jadi satu jam",
          "Tidur larut karena scroll",
        ],
      },
      right: {
        title: "Setelah buku ini",
        items: [
          "30 menit pertama tanpa layar",
          "Aplikasi jebakan dibuat membosankan",
          "Ponsel menginap di luar kamar",
        ],
      },
      say: "Kamu tidak perlu membuang ponsel. Yang berubah, kamu yang memilih kapan memakainya.",
    },
    {
      type: "features",
      title: "Di dalamnya ada",
      items: [
        ["❓", "Tes diri: seberapa dalam layar menyedotmu"],
        ["🧮", "Kalkulator waktu layar seumur hidup"],
        ["📱", "Cara membuat ponsel jadi membosankan"],
        ["🗺️", "Rencana 30 hari yang bisa langsung dijalankan"],
      ],
      say: "Di dalamnya ada tes diri, kalkulator waktu layar, cara membuat ponsel membosankan, dan rencana tiga puluh hari.",
    },
    {
      type: "quote",
      text: "Bagaimana kita menghabiskan hari-hari kita, adalah bagaimana kita menghabiskan hidup kita.",
      cite: "Annie Dillard",
      say: "Bagaimana kita menghabiskan hari-hari kita, adalah bagaimana kita menghabiskan hidup kita.",
    },
    {
      type: "cta",
      lead: "Bab pertama bisa kamu baca sekarang.",
      button: "Mulai dari Bab 1, gratis",
      say: "Mulai dari bab pertama, gratis.",
    },
  ],
};
