/** Ebook demo yang ditulis lengkap (slug → bab + infografis). Sisanya di katalog berisi kosong. */
import { PAYLATER_1 } from "./paylater-1.mjs";
import { PAYLATER_2 } from "./paylater-2.mjs";
import { PAYLATER_3 } from "./paylater-3.mjs";
import { FIGURES } from "./paylater-figures.mjs";
import { SCROLL_1 } from "./scroll-1.mjs";
import { SCROLL_2 } from "./scroll-2.mjs";
import { SCROLL_FIGURES } from "./scroll-figures.mjs";
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
};
