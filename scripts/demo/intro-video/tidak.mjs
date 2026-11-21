/**
 * Video pengantar "Berani Bilang Tidak" (D41, D43). Dibuka dengan adegan chat (jenis adegan baru
 * yang cocok untuk buku komunikasi), lalu diulang dengan jawaban baru di tengah video.
 */
const ASK = { from: "them", text: "Sar, Sabtu bisa masuk ya? Laporan cabang belum beres." };

export const TIDAK_INTRO = {
  slug: "berani-bilang-tidak",
  music: { mood: "semangat", bpm: 96 },
  // Identitas visual buku ini (sama dengan infografisnya): ungu tua, koral, toska.
  theme: {
    dark: "radial-gradient(110% 90% at 85% 0%, #8e4a7a 0%, #4a2140 55%, #2b1b2e 100%)",
    night: "radial-gradient(120% 100% at 20% 0%, #3a2a48 0%, #23172b 60%, #150d1a 100%)",
    paper: "radial-gradient(100% 80% at 50% 0%, #fffaf5, #f6e6dc)",
    accent: "#ff8a5c",
    accentInk: "#2b1b2e",
    primary: "#e4572e",
  },
  captions: true,
  scenes: [
    {
      type: "chat",
      kicker: "Jumat, 16.52",
      title: "Sudah mau pulang, lalu pesan ini masuk.",
      sub: "Jempolmu menjawab sebelum hatimu sempat bertanya.",
      messages: [ASK, { from: "me", text: "Iya Bu, bisa 🙏" }],
      say: "Jumat sore. Sudah mau pulang, lalu pesan ini masuk. Dan jempolmu menjawab iya, sebelum hatimu sempat bertanya.",
    },
    {
      type: "cover",
      kicker: "Pengantar ebook",
      title: "Berani Bilang Tidak",
      subtitle: "Komunikasi asertif: jujur tanpa kasar, tegas tanpa merasa bersalah",
      meta: ["7 bab", "±25 menit baca", "Perakit kalimat"],
      say: "Berani Bilang Tidak. Jujur tanpa kasar, tegas tanpa merasa bersalah.",
    },
    {
      type: "bigNumber",
      bg: "dark",
      kicker: "Studi tentang menolak ajakan",
      value: "77%",
      label: "pernah menerima ajakan yang sebenarnya tidak ingin dihadiri",
      note: "Givi & Kirk, Journal of Personality and Social Psychology (2023)",
      say: "Tujuh puluh tujuh persen orang pernah menerima ajakan yang tidak ingin mereka hadiri, hanya karena takut menolak.",
    },
    {
      type: "list",
      title: "Kamu akan bertemu…",
      mark: "number",
      items: [
        "Sari, andalan kantor yang tidak pernah libur",
        "Bayu, anak sulung yang jadi ATM keluarga",
        "Rina, yang uangnya dipinjam tapi tak kembali",
      ],
      say: "Di buku ini kamu akan bertemu Sari, Bayu, dan Rina. Tiga orang baik, yang belum belajar menolak.",
    },
    {
      type: "chat",
      bg: "paper",
      kicker: "Tiga bulan kemudian",
      title: "Pesan yang sama, jawaban baru.",
      sub: "Jelas, sopan, dan tetap bertanggung jawab.",
      messages: [
        ASK,
        {
          from: "me",
          good: true,
          text: "Sabtu ini saya tidak bisa, Bu. Senin jam 11 laporannya sudah di meja Ibu.",
        },
        { from: "them", text: "Oke, Senin jam 11 ya. Makasih Sar." },
      ],
      say: "Pesannya sama. Jawabannya berbeda. Jelas, sopan, dan tetap bertanggung jawab.",
    },
    {
      type: "features",
      title: "Di dalamnya ada",
      items: [
        ["💬", "Kalimat siap pakai untuk atasan, keluarga, dan teman"],
        ["🧩", "Perakit kalimat menolak sesuai situasimu"],
        ["❓", 'Tes: seberapa sering "iya" keluar duluan'],
        ["🧭", "Bagan: haruskah aku bilang iya?"],
      ],
      say: "Di dalamnya ada kalimat siap pakai, perakit kalimat menolak, tes diri, dan bagan untuk memutuskan kapan harus bilang iya.",
    },
    {
      type: "cta",
      bg: "dark",
      lead: "Menolak permintaan bukan menolak orangnya.",
      button: "Mulai dari Bab 1, gratis",
      say: "Menolak permintaan, bukan menolak orangnya. Mulai dari bab pertama, gratis.",
    },
  ],
};
