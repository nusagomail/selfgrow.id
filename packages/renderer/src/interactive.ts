/**
 * Menghidupkan unsur interaktif bab (D42) di reader `app` dan pratinjau `site`, tanpa framework:
 * - Kuis: skor dihitung dari poin pilihan saat semua pertanyaan terjawab, pita hasil disalin
 *   (cloneNode) dari daftar tersembunyi. Tidak ada HTML string.
 * - Grafik: angka berhitung naik saat elemen mendapat kelas `in-view` (dipasang pager).
 */
import { formatChartValue, scoreQuiz } from "./interactive-format";

export type QuizCompletion = { quizId: string; score: number; maxScore: number };

export type InteractiveOptions = {
  onQuizComplete?: (result: QuizCompletion) => void;
};

const COUNT_MS = 1100;

function animateNumbers(fig: HTMLElement) {
  const format = (fig.dataset.format ?? "number") as "number" | "rupiah" | "percent";
  const nums = fig.querySelectorAll<HTMLElement>(".anim-num");
  const reduced =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (const el of nums) {
    const target = Number(el.dataset.value ?? "0");
    if (reduced || !Number.isFinite(target)) {
      el.textContent = formatChartValue(target, format);
      continue;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / COUNT_MS);
      const eased = 1 - (1 - k) ** 3;
      el.textContent = formatChartValue(target * eased, format);
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = formatChartValue(0, format);
    requestAnimationFrame(step);
  }
}

function revealAnswer(fs: HTMLFieldSetElement, chosen: HTMLInputElement | null, mode: string) {
  for (const fb of fs.querySelectorAll<HTMLElement>(".quiz-fb")) {
    fb.hidden = !chosen || fb.dataset.for !== chosen.value;
  }
  const explain = fs.querySelector<HTMLElement>(".quiz-explain");
  if (explain) explain.hidden = !chosen;
  if (mode !== "knowledge" || !chosen) return;
  // Uji pengetahuan: kunci jawaban pertama, tandai benar/salah.
  for (const input of fs.querySelectorAll<HTMLInputElement>("input[type=radio]")) {
    const opt = input.closest(".quiz-opt");
    opt?.classList.toggle("is-correct", input.dataset.correct === "1");
    opt?.classList.toggle("is-wrong", input === chosen && input.dataset.correct !== "1");
    input.disabled = true;
  }
}

function setupQuiz(form: HTMLFormElement, opts: InteractiveOptions) {
  const mode = form.dataset.mode ?? "score";
  const fieldsets = [...form.querySelectorAll("fieldset")];
  const resultEl = form.querySelector<HTMLElement>(".quiz-result");
  const hint = form.querySelector<HTMLElement>(".quiz-hint");
  const bands = [...form.querySelectorAll<HTMLElement>(".quiz-bands > li")];
  const results = bands.map((b) => ({
    min: Number(b.dataset.min ?? "0"),
    max: Number(b.dataset.max ?? "0"),
  }));
  const maxPerQ = fieldsets.map((fs) =>
    Math.max(
      0,
      ...[...fs.querySelectorAll<HTMLInputElement>("input[type=radio]")].map((i) =>
        Number(i.dataset.points ?? "0"),
      ),
    ),
  );
  let reported = "";

  const update = () => {
    const chosen = fieldsets.map((fs) =>
      fs.querySelector<HTMLInputElement>("input[type=radio]:checked"),
    );
    for (const [i, fs] of fieldsets.entries()) {
      fs.classList.toggle("answered", Boolean(chosen[i]));
      revealAnswer(fs, chosen[i] ?? null, mode);
    }
    if (!resultEl || chosen.some((c) => !c)) return;
    const points = chosen.map((c) => Number(c?.dataset.points ?? "0"));
    const { score, max, band } = scoreQuiz(points, maxPerQ, results);

    resultEl.replaceChildren();
    // Skenario tidak menampilkan angka: yang penting tanggapannya, bukan skornya.
    if (mode !== "scenario") {
      const head = document.createElement("p");
      head.className = "quiz-score";
      const strong = document.createElement("strong");
      strong.textContent = String(score);
      head.append(mode === "knowledge" ? "Benar " : "Skormu ", strong, ` dari ${max}`);
      resultEl.append(head);
    }
    const src = band >= 0 ? bands[band] : undefined;
    if (src) {
      const copy = src.cloneNode(true) as HTMLElement;
      const box = document.createElement("div");
      box.className = "quiz-band";
      box.append(...copy.childNodes);
      resultEl.append(box);
    }
    // Skor sebelumnya (diisi reader dari riwayat pengguna).
    const last = form.dataset.lastScore;
    if (mode !== "scenario" && last !== undefined && last !== "") {
      const prev = document.createElement("p");
      prev.className = "quiz-prev";
      const diff = score - Number(last);
      const when = form.dataset.lastDate ? ` (${form.dataset.lastDate})` : "";
      prev.textContent = `Sebelumnya: ${last}${when}${diff === 0 ? "" : diff > 0 ? `, naik ${diff}` : `, turun ${-diff}`}.`;
      resultEl.append(prev);
    }
    resultEl.hidden = false;
    if (hint) hint.hidden = true;

    const key = `${score}/${max}`;
    if (key !== reported) {
      reported = key;
      opts.onQuizComplete?.({ quizId: form.dataset.quizId ?? "", score, maxScore: max });
    }
  };
  form.addEventListener("change", update);
  form.addEventListener("submit", (e) => e.preventDefault());
  update();
  return () => {
    form.removeEventListener("change", update);
  };
}

/** Pasang perilaku interaktif pada semua unsur di `root`. Mengembalikan fungsi pembersih. */
export function enhanceInteractive(root: HTMLElement, opts: InteractiveOptions = {}) {
  const cleanups: (() => void)[] = [];
  for (const form of root.querySelectorAll<HTMLFormElement>("form.quiz")) {
    cleanups.push(setupQuiz(form, opts));
  }
  const figs = [...root.querySelectorAll<HTMLElement>("[data-anim]")];
  if (figs.length > 0 && typeof MutationObserver !== "undefined") {
    const started = new WeakSet<HTMLElement>();
    const check = () => {
      for (const f of figs) {
        if (!started.has(f) && f.classList.contains("in-view")) {
          started.add(f);
          animateNumbers(f);
        }
      }
    };
    const mo = new MutationObserver(check);
    for (const f of figs) mo.observe(f, { attributes: true, attributeFilter: ["class"] });
    check();
    cleanups.push(() => mo.disconnect());
  }
  return () => {
    for (const c of cleanups) c();
  };
}
