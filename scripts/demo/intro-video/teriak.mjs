/**
 * Video pengantar "Mengasuh Tanpa Teriak" (D46). Konsep: pintu kulkas dan satu meter suara
 * tegak. Pemicu pagi Bu Laras menaikkan meter sampai merah; jeda 10 detik menurunkannya; kalimat
 * batas tiga potong muncul dengan suara kecil. Template: teriak.html. Semua isi ada di Bab 1–4.
 */
export const TERIAK_INTRO = {
  slug: "mengasuh-tanpa-teriak",
  template: "teriak.html",
  music: { mood: "hangat", bpm: 88 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Jam enam empat puluh dua. Kaus kaki belum dipakai, susu tumpah, ojek menunggu. Dan suara itu keluar begitu saja.",
    },
    {
      type: "cost",
      say: "Teriakan memang membuat anak bergerak. Tapi yang ia pelajari: Ibu baru serius kalau sudah berteriak.",
    },
    {
      type: "pause",
      say: "Teriakan jarang datang tiba-tiba. Badan memberi tanda lebih dulu. Di situ, ambil jeda sepuluh detik: berhenti, napas panjang, lalu turunkan badan.",
    },
    {
      type: "line",
      say: "Lalu pakai kalimat tiga potong. Kamu kesal ya. Boleh kesal, tapi tidak boleh melempar. Mau tarik napas bareng, atau peluk dulu?",
    },
    {
      type: "end",
      say: "Mengasuh Tanpa Teriak. Baca bab pertama, gratis.",
    },
  ],
};
