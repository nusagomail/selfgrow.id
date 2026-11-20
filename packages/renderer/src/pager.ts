/**
 * Mesin halaman ebook (D37): isi bab ditata dalam kolom CSS selebar layar lalu digeser per
 * halaman, seperti membaca buku. Tanpa React dan tanpa dependency, dipakai reader di `app` dan
 * pratinjau bab gratis di `site`. Hanya mengatur gaya & transform; tidak pernah menulis HTML.
 */

export type PagerLayout = {
  /** Kolom per layar: 1 di HP, 2 (buku terbuka) di layar lebar. */
  cols: number;
  /** Margin kiri-kanan tiap halaman (px). */
  pad: number;
  /** Lebar teks tiap halaman (px). */
  colWidth: number;
  /** Jarak geser antar halaman (px) = lebar layar / kolom. */
  step: number;
};

export type PagerState = {
  /** Layar ke- (0-based). Di mode dua halaman, satu layar = dua halaman. */
  screen: number;
  screens: number;
  /** Nomor halaman pertama & terakhir yang terlihat (1-based) dan total halaman. */
  first: number;
  last: number;
  pages: number;
  cols: number;
};

export type PagerOptions = {
  /** Posisi awal: layar ke-, "end" (halaman terakhir), atau { fraction } 0..1. */
  startAt?: number | "end" | { fraction: number };
  /** Lebar minimal untuk tampilan dua halaman. */
  spreadMinWidth?: number;
  onChange?: (state: PagerState) => void;
  /** Dipanggil saat membalik melewati halaman pertama / terakhir. */
  onEdge?: (direction: "prev" | "next") => void;
  /** Ketukan di tengah layar (mis. menyembunyikan menu). */
  onTapCenter?: () => void;
  /** Elemen yang mendengar tombol panah. Default: window. */
  keyTarget?: HTMLElement | Window;
};

export type Pager = {
  next: () => void;
  prev: () => void;
  goTo: (screen: number) => void;
  relayout: () => void;
  state: () => PagerState;
  destroy: () => void;
};

const SWIPE_MIN_PX = 40;
const DRAG_START_PX = 8;
const INTERACTIVE = "a,button,input,select,textarea,summary,label,[role=button]";

export function layoutFor(width: number, spreadMinWidth = 900): PagerLayout {
  const w = Math.max(1, width);
  const cols = w >= spreadMinWidth ? 2 : 1;
  const pad = w < 480 ? 22 : w < spreadMinWidth ? 36 : 44;
  const step = w / cols;
  return { cols, pad, colWidth: Math.max(1, step - 2 * pad), step };
}

/** Jumlah halaman dari posisi penanda akhir (px dari tepi kiri alur teks). */
export function pagesFor(markerOffset: number, layout: PagerLayout): number {
  return Math.max(1, Math.floor(Math.max(0, markerOffset) / layout.step) + 1);
}

export function screensFor(pages: number, cols: number): number {
  return Math.max(1, Math.ceil(pages / Math.max(1, cols)));
}

export function clampScreen(screen: number, screens: number): number {
  if (!Number.isFinite(screen)) return 0;
  return Math.min(Math.max(0, Math.round(screen)), Math.max(0, screens - 1));
}

/** Posisi baca 0..1 (dipakai untuk menyimpan progres dan mempertahankan posisi saat tata ulang). */
export function fractionOf(screen: number, screens: number): number {
  return screens <= 1 ? 0 : Math.min(1, Math.max(0, screen / (screens - 1)));
}

export function screenAtFraction(fraction: number, screens: number): number {
  return clampScreen(Math.min(1, Math.max(0, fraction)) * (screens - 1), screens);
}

export function stateFor(screen: number, pages: number, cols: number): PagerState {
  const screens = screensFor(pages, cols);
  const s = clampScreen(screen, screens);
  const first = s * cols + 1;
  return { screen: s, screens, first, last: Math.min(pages, first + cols - 1), pages, cols };
}

/**
 * Pasang mode halaman pada `viewport` (pembungkus, overflow tersembunyi) dan `flow` (isi bab).
 * `flow` wajib berisi elemen `.book-marker` di posisi paling akhir isi (boleh di dalam halaman
 * penutup) untuk menghitung jumlah halaman.
 */
export function createPager(
  viewport: HTMLElement,
  flow: HTMLElement,
  options: PagerOptions = {},
): Pager {
  const marker = flow.querySelector<HTMLElement>(".book-marker");
  let layout = layoutFor(viewport.clientWidth, options.spreadMinWidth);
  let pages = 1;
  let current = 0;
  let initialized = false;
  let destroyed = false;

  const state = () => stateFor(current, pages, layout.cols);

  const apply = (animate: boolean) => {
    flow.classList.toggle("is-dragging", !animate);
    flow.style.transform = `translate3d(${-current * layout.step * layout.cols}px,0,0)`;
  };

  const measure = () => {
    layout = layoutFor(viewport.clientWidth, options.spreadMinWidth);
    const s = flow.style;
    s.boxSizing = "border-box";
    s.width = `${layout.step * layout.cols}px`;
    s.height = "100%";
    s.padding = `0 ${layout.pad}px`;
    s.columnCount = String(layout.cols);
    s.columnGap = `${layout.pad * 2}px`;
    s.columnFill = "auto";
    viewport.classList.add("is-paged");
    viewport.classList.toggle("is-spread", layout.cols > 1);
    if (!marker) return;
    // Selisih dua rect tidak terpengaruh transform yang sedang berlaku.
    const offset = marker.getBoundingClientRect().left - flow.getBoundingClientRect().left;
    pages = pagesFor(offset, layout);
  };

  const emit = () => options.onChange?.(state());

  const relayout = () => {
    if (destroyed) return;
    const before = initialized ? fractionOf(current, screensFor(pages, layout.cols)) : null;
    measure();
    const screens = screensFor(pages, layout.cols);
    if (before !== null) current = screenAtFraction(before, screens);
    else {
      const start = options.startAt ?? 0;
      current =
        start === "end"
          ? screens - 1
          : typeof start === "number"
            ? clampScreen(start, screens)
            : screenAtFraction(start.fraction, screens);
      initialized = true;
    }
    apply(false);
    emit();
  };

  const goTo = (screen: number) => {
    const target = clampScreen(screen, screensFor(pages, layout.cols));
    if (target === current) {
      apply(true);
      return;
    }
    current = target;
    apply(true);
    emit();
  };
  const next = () => {
    if (current >= screensFor(pages, layout.cols) - 1) {
      apply(true);
      options.onEdge?.("next");
    } else goTo(current + 1);
  };
  const prev = () => {
    if (current <= 0) {
      apply(true);
      options.onEdge?.("prev");
    } else goTo(current - 1);
  };

  // --- Sentuhan: geser untuk membalik, ketuk tepi kiri/kanan untuk mundur/maju -------------
  let startX = 0;
  let startY = 0;
  let dragging = false;
  let tracking = false;
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    tracking = true;
    dragging = false;
    startX = e.clientX;
    startY = e.clientY;
  };
  const onMove = (e: PointerEvent) => {
    if (!tracking || e.pointerType === "mouse") return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) < Math.abs(dy)) return;
      dragging = true;
    }
    flow.classList.add("is-dragging");
    flow.style.transform = `translate3d(${-current * layout.step * layout.cols + dx}px,0,0)`;
  };
  const onUp = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    if (dragging) {
      dragging = false;
      if (dx <= -SWIPE_MIN_PX) next();
      else if (dx >= SWIPE_MIN_PX) prev();
      else apply(true);
      return;
    }
    if (Math.abs(dx) > DRAG_START_PX || Math.abs(e.clientY - startY) > DRAG_START_PX) return;
    if ((e.target as Element | null)?.closest?.(INTERACTIVE)) return;
    const rect = viewport.getBoundingClientRect();
    const x = (e.clientX - rect.left) / Math.max(1, rect.width);
    if (x < 0.3) prev();
    else if (x > 0.7) next();
    else options.onTapCenter?.();
  };
  const onCancel = () => {
    tracking = false;
    if (dragging) {
      dragging = false;
      apply(true);
    }
  };

  const keyTarget = options.keyTarget ?? window;
  const onKey = (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest?.("input,textarea,select,[contenteditable=true]")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    }
  };

  // Gambar yang selesai dimuat dan huruf web dapat mengubah jumlah halaman.
  const onLoad = () => relayout();
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onLoad);

  viewport.addEventListener("pointerdown", onDown);
  viewport.addEventListener("pointermove", onMove);
  viewport.addEventListener("pointerup", onUp);
  viewport.addEventListener("pointercancel", onCancel);
  flow.addEventListener("load", onLoad, true);
  keyTarget.addEventListener("keydown", onKey);
  resize?.observe(viewport);
  relayout();
  void document.fonts?.ready.then(onLoad);

  return {
    next,
    prev,
    goTo,
    relayout,
    state,
    destroy: () => {
      destroyed = true;
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onCancel);
      flow.removeEventListener("load", onLoad, true);
      keyTarget.removeEventListener("keydown", onKey);
      resize?.disconnect();
    },
  };
}
