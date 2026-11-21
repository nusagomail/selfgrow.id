/** Ebook demo yang ditulis lengkap (slug → bab + infografis). Sisanya di katalog berisi kosong. */

import { GULA_1 } from "./gula-1.mjs";
import { GULA_FIGURES } from "./gula-figures.mjs";
import { HARGA_1 } from "./harga-1.mjs";
import { HARGA_FIGURES } from "./harga-figures.mjs";
import { MINGGU_1 } from "./minggu-1.mjs";
import { MINGGU_FIGURES } from "./minggu-figures.mjs";
import { NEGO_1 } from "./nego-1.mjs";
import { NEGO_FIGURES } from "./nego-figures.mjs";
import { OVERTHINKING_1 } from "./overthinking-1.mjs";
import { OVERTHINKING_FIGURES } from "./overthinking-figures.mjs";
import { PAYLATER_1 } from "./paylater-1.mjs";
import { PAYLATER_2 } from "./paylater-2.mjs";
import { PAYLATER_3 } from "./paylater-3.mjs";
import { FIGURES } from "./paylater-figures.mjs";
import { SCROLL_1 } from "./scroll-1.mjs";
import { SCROLL_2 } from "./scroll-2.mjs";
import { SCROLL_FIGURES } from "./scroll-figures.mjs";
import { STOIK_1 } from "./stoik-1.mjs";
import { STOIK_FIGURES } from "./stoik-figures.mjs";
import { TERIAK_1 } from "./teriak-1.mjs";
import { TERIAK_FIGURES } from "./teriak-figures.mjs";
import { TIDAK_1 } from "./tidak-1.mjs";
import { TIDAK_2 } from "./tidak-2.mjs";
import { TIDAK_FIGURES } from "./tidak-figures.mjs";

export const FULL_BOOKS = {
  "lepas-dari-jerat-paylater": {
    chapters: [...PAYLATER_1, ...PAYLATER_2, ...PAYLATER_3],
    figures: FIGURES,
  },
  "lepas-dari-scroll-tanpa-ujung": {
    chapters: [...SCROLL_1, ...SCROLL_2],
    figures: SCROLL_FIGURES,
  },
  "berani-bilang-tidak": {
    chapters: [...TIDAK_1, ...TIDAK_2],
    figures: TIDAK_FIGURES,
  },
  "keluar-dari-lingkaran-overthinking": {
    chapters: OVERTHINKING_1,
    figures: OVERTHINKING_FIGURES,
  },
  "hitung-harga-jual-yang-untung": {
    chapters: HARGA_1,
    figures: HARGA_FIGURES,
  },
  "kurangi-gula-tanpa-menderita": {
    chapters: GULA_1,
    figures: GULA_FIGURES,
  },
  "berani-nego-gaji": {
    chapters: NEGO_1,
    figures: NEGO_FIGURES,
  },
  "mengasuh-tanpa-teriak": {
    chapters: TERIAK_1,
    figures: TERIAK_FIGURES,
  },
  "seminggu-dalam-satu-jam": {
    chapters: MINGGU_1,
    figures: MINGGU_FIGURES,
  },
  "stoik-untuk-hidup-sehari-hari": {
    chapters: STOIK_1,
    figures: STOIK_FIGURES,
  },
};
