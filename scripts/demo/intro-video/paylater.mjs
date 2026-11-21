/**
 * Video pengantar "Lepas dari Jerat Paylater" (D41, D43).
 * Adegan dipilih dan diurutkan khusus untuk buku ini; buku lain boleh memakai susunan berbeda
 * (lihat docs/PANDUAN-VIDEO.md). `say` = naskah narasi per adegan.
 */
export const PAYLATER_INTRO = {
  slug: "lepas-dari-jerat-paylater",
  music: { mood: "hangat", bpm: 84 },
  captions: true,
  scenes: [
    {
      type: "cover",
      kicker: "Pengantar ebook",
      title: "Lepas dari Jerat Paylater",
      subtitle: "Cara keluar dari cicilan kecil yang diam-diam memotong gaji bulan depan",
      meta: ["10 bab", "±45 menit baca", "Kuis & kalkulator"],
      say: "Lepas dari Jerat Paylater. Buku tentang cicilan kecil yang diam-diam memotong gaji bulan depan.",
    },
    {
      type: "question",
      text: "Gajian baru dua minggu, kok saldo sudah tipis?",
      sub: "Kalau ini terasa akrab, kamu tidak sendirian.",
      say: "Pernah merasa gajian baru dua minggu, tapi saldo sudah tipis? Kalau iya, kamu tidak sendirian.",
    },
    {
      type: "story",
      title: "Kenalan dengan Nadia",
      initial: "N",
      lines: ["27 tahun, admin gudang di Cikarang", "Gaji bersih Rp5,8 juta"],
      stats: [
        ["9", "bulan"],
        ["7", "cicilan"],
        ["Rp1,6 jt", "per bulan"],
      ],
      end: "Kamu akan mengikuti perjalanannya sampai lunas.",
      say: "Kenalkan Nadia. Dalam sembilan bulan, cicilannya tumbuh jadi tujuh, totalnya satu koma enam juta rupiah sebulan. Kamu akan mengikuti perjalanannya sampai lunas.",
    },
    {
      type: "list",
      title: "Buku ini untuk kamu yang…",
      items: [
        "punya lebih dari dua cicilan yang sedang berjalan",
        "pernah menutup satu utang dengan utang lain",
        "ingin lepas, tapi bingung mulai dari mana",
      ],
      say: "Buku ini untuk kamu yang punya beberapa cicilan berjalan, pernah menutup utang dengan utang lain, dan ingin lepas tapi bingung mulai dari mana.",
    },
    {
      type: "stages",
      title: "Yang akan kamu jalani",
      items: [
        ["Berhenti menggali lubang", "Bab 1–4"],
        ["Melihat semua utang di satu halaman", "Bab 5"],
        ["Melunasi dengan strategi", "Bab 6–8"],
        ["Membangun pagar agar tidak kembali", "Bab 9–10"],
      ],
      say: "Langkahnya empat. Berhenti menggali lubang. Melihat semua utang di satu halaman. Melunasi dengan strategi. Lalu membangun pagar supaya tidak kembali.",
    },
    {
      type: "features",
      title: "Bukan buku yang cuma dibaca",
      items: [
        ["❓", "Tes diri: seberapa dalam kamu terjerat"],
        ["🧮", "Kalkulator harga sebenarnya cicilan"],
        ["📊", "Infografis dan hitungan nyata"],
        ["🗺️", "Rencana 90 hari yang bisa langsung dijalankan"],
      ],
      say: "Di dalamnya ada tes diri, kalkulator cicilan, infografis, dan rencana sembilan puluh hari yang bisa langsung kamu jalankan.",
    },
    {
      type: "quote",
      text: "Paylater tidak membuat barang jadi lebih murah. Paylater membuat harganya jadi lebih tidak terasa.",
      say: "Paylater tidak membuat barang jadi lebih murah. Paylater membuat harganya jadi lebih tidak terasa.",
    },
    {
      type: "cta",
      lead: "Bab pertama bisa kamu baca sekarang.",
      button: "Mulai dari Bab 1, gratis",
      say: "Bab pertama bisa kamu baca sekarang, gratis.",
    },
  ],
};
