import type { SubscriptionStatus } from "@selfgrow/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ApiError, api, goToStorefront } from "../lib/api";

type ItemType = "ebook" | "tool" | "template" | "program";
type Item = {
  type: ItemType;
  slug: string;
  title: string;
  summary: string | null;
  freePreview: boolean;
  /** Ditandai gratis di Studio: terbuka untuk semua user login (D35). */
  free: boolean;
  locked: boolean;
};
type Section = { slug: string; name: string; hook: string | null; items: Item[] };
type Reading = {
  slug: string;
  title: string;
  chapterId: string;
  chapterTitle: string | null;
  chapterNumber: number;
  totalChapters: number;
  percent: number;
};
type HomeData = {
  firstName: string;
  subscription: SubscriptionStatus;
  continueReading: Reading[];
  sections: Section[];
  uncategorized: Item[];
};

const TYPE_LABEL: Record<ItemType, string> = {
  ebook: "Ebook",
  tool: "Tool",
  template: "Template",
  program: "Program",
};

/** Kartu konten. Terkunci tetap bisa diklik: halaman konten menampilkan ajakan berlangganan. */
function ItemCard({ item }: { item: Item }) {
  const common = { className: `item-card${item.locked ? " is-locked" : ""}` };
  const body = (
    <>
      <span className="item-top">
        <span className={`type-tag ${item.type}`}>{TYPE_LABEL[item.type]}</span>
        {item.locked ? (
          <span className="lock-tag" title="Untuk pelanggan">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Terkunci
          </span>
        ) : item.free ? (
          <span className="free-tag">Gratis</span>
        ) : item.freePreview ? (
          <span className="free-tag">Bab gratis</span>
        ) : null}
      </span>
      <span className="item-title">{item.title}</span>
      {item.summary && <span className="item-summary">{item.summary}</span>}
    </>
  );
  switch (item.type) {
    case "ebook":
      return (
        <Link to="/baca/$slug" params={{ slug: item.slug }} {...common}>
          {body}
        </Link>
      );
    case "tool":
      return (
        <Link to="/tools/$slug" params={{ slug: item.slug }} {...common}>
          {body}
        </Link>
      );
    case "template":
      return (
        <Link to="/template/$slug" params={{ slug: item.slug }} {...common}>
          {body}
        </Link>
      );
    default:
      return (
        <Link to="/program/$slug" params={{ slug: item.slug }} {...common}>
          {body}
        </Link>
      );
  }
}

export function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState<string>("semua");

  useEffect(() => {
    api<HomeData>("/home")
      .then(setData)
      .catch((e) => {
        // Belum login: tampilkan etalase (penawaran & kategori), bukan halaman masuk (D34).
        if (e instanceof ApiError && e.status === 401)
          goToStorefront(() => navigate({ to: "/masuk", replace: true }));
        else setError(true);
      });
  }, [navigate]);

  const sections = useMemo(() => {
    if (!data) return [];
    const all = [...data.sections];
    if (data.uncategorized.length)
      all.push({ slug: "lainnya", name: "Lainnya", hook: null, items: data.uncategorized });
    return all;
  }, [data]);

  if (error) return <main className="page error">Gagal memuat. Muat ulang halaman.</main>;
  if (!data) {
    return (
      <main className="page page-wide">
        <div className="skeleton" aria-busy="true">
          <div />
          <div />
          <div />
        </div>
      </main>
    );
  }

  const sub = data.subscription;
  const filled = sections.filter((s) => s.items.length > 0);
  const shown =
    active === "semua" ? filled : sections.filter((s) => s.slug === active && s.items.length > 0);
  const totalItems = filled.reduce((n, s) => n + s.items.length, 0);

  return (
    <main className="page page-wide home">
      <section className="home-hero">
        <div>
          <h1>Halo, {data.firstName}</h1>
          <p className="muted">Mau bertumbuh di bagian mana hari ini?</p>
        </div>
        {sub.adminView === "visitor" ? (
          <p className="banner">
            Kamu sedang melihat sebagai <b>pengunjung tanpa langganan</b>.{" "}
            <Link to="/akun">Ubah di Profil</Link>
          </p>
        ) : !sub.active ? (
          <p className="banner">
            Kamu belum berlangganan. Konten berlabel <b>Gratis</b> dan <b>Bab gratis</b> bisa
            langsung dipakai; sisanya terbuka setelah berlangganan.
          </p>
        ) : sub.inGracePeriod ? (
          <p className="banner warn">Langgananmu sudah jatuh tempo. Segera perpanjang.</p>
        ) : null}
      </section>

      {data.continueReading.length > 0 && (
        <section className="shelf-section">
          <h2>Lanjutkan membaca</h2>
          <div className="continue-grid">
            {data.continueReading.map((r) => (
              <Link
                key={r.slug}
                to="/baca/$slug/$chapterId"
                params={{ slug: r.slug, chapterId: r.chapterId }}
                className="continue-card"
              >
                <span className="item-title">{r.title}</span>
                <span className="muted small">
                  Bab {r.chapterNumber} dari {r.totalChapters}
                  {r.chapterTitle ? ` · ${r.chapterTitle}` : ""}
                </span>
                <span
                  className="progress"
                  role="progressbar"
                  aria-valuenow={r.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${r.percent}%` }} />
                </span>
                <span className="small strong">{r.percent}% selesai</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav className="cat-chips" aria-label="Kategori">
        <button
          type="button"
          className="chip"
          aria-pressed={active === "semua"}
          onClick={() => setActive("semua")}
        >
          Semua <span className="count">{totalItems}</span>
        </button>
        {filled.map((s) => (
          <button
            key={s.slug}
            type="button"
            className="chip"
            aria-pressed={active === s.slug}
            onClick={() => setActive(s.slug)}
          >
            {s.name} <span className="count">{s.items.length}</span>
          </button>
        ))}
      </nav>

      {shown.length === 0 ? (
        <div className="empty-state">
          <h2>Konten sedang disiapkan</h2>
          <p className="muted">
            {active === "semua"
              ? "Belum ada konten yang terbit. Ebook, tool, dan template baru akan muncul di sini."
              : "Belum ada konten di kategori ini. Coba kategori lain."}
          </p>
        </div>
      ) : (
        shown.map((s) => (
          <section key={s.slug} className="shelf-section">
            <div className="shelf-head">
              <h2>{s.name}</h2>
              {s.hook && <p className="muted small">"{s.hook}"</p>}
            </div>
            <div className="item-grid">
              {s.items.map((i) => (
                <ItemCard key={`${i.type}-${i.slug}`} item={i} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

/** Rute lama /perpustakaan: sekarang menyatu dengan Beranda. */
export function LibraryRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/", replace: true });
  }, [navigate]);
  return null;
}
