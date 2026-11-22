/**
 * Video pengantar "CV yang Dilirik Rekruter" (D46). Konsep: selembar CV di meja rekruter;
 * stopwatch 7,4 detik dan jejak pandangan berpola F distabilo kuning, bagian bawah memudar, lalu
 * satu baris tugas dicoret dan diganti kalimat pencapaian. Template: cv.html. Isi ada di Bab 1–3.
 */
export const CV_INTRO = {
  slug: "cv-yang-dilirik-rekruter",
  template: "cv.html",
  music: { mood: "semangat", bpm: 98 },
  captions: true,
  scenes: [
    {
      type: "scan",
      say: "Tujuh koma empat detik. Rata-rata selama itulah rekruter melihat CV sebelum memutuskan lanjut atau tidak.",
    },
    {
      type: "top",
      say: "Dalam waktu sesingkat itu, yang terbaca hanya nama, jabatan, dan beberapa baris pertama.",
    },
    {
      type: "rewrite",
      say: "Karena itu, ubah tugas menjadi pencapaian. Bukan mengelola media sosial, tapi menaikkan pengikut tiga puluh lima persen dalam enam bulan.",
    },
    { type: "end", say: "CV yang Dilirik Rekruter. Baca bab pertama, gratis." },
  ],
};
