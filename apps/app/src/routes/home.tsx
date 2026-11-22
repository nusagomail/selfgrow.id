import type { SubscriptionStatus } from "@selfgrow/shared";
import { activeTypeTab, availableTypeTabs } from "@selfgrow/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ToolCard } from "../components/tool-card";
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
  /** Ebook terbit yang isinya belum ada (D38). */
  comingSoon?: boolean;
  coverUrl: string | null;
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

/**
 * Kartu buku seperti di rak toko buku (D38): sampul tegak, judul, satu label akses.
 * Terkunci tetap bisa diklik: halaman konten menampilkan ajakan berlangganan.
 */
function ItemCard({ item }: { item: Item }) {
  const label = item.comingSoon
    ? { text: "Segera", cls: "soon" }
    : item.free
      ? { text: "Gratis", cls: "free" }
      : !item.locked && !item.freePreview
        ? null
        : item.freePreview && item.locked
          ? { text: "Bab 1 gratis", cls: "free" }
          : item.locked
            ? { text: "Terkunci", cls: "locked" }
            : null;
  if (item.type === "tool") return <ToolCard item={{ ...item, label }} />;
  const body = (
    <>
      <span className={`book-cover${item.coverUrl ? "" : " is-empty"}`}>
        {item.coverUrl ? (
          <img src={item.coverUrl} alt={`Sampul ${item.title}`} loading="lazy" decoding="async" />
        ) : (
          <span className="book-fallback">
            <span className="small">{TYPE_LABEL[item.type]}</span>
            <span className="strong">{item.title}</span>
          </span>
        )}
      </span>
      <span className="book-title">{item.title}</span>
      {label && (
        <span className={`book-label ${label.cls}`}>
          {label.cls === "locked" && (
            <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
              <path
                d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {label.text}
        </span>
      )}
    </>
  );
  const common = { className: "book-card", title: item.summary ?? item.title };
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

const SHELF_MAX = 12;
const TOOL_MAX = 6;

export function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState<string>("semua");
  const [jenis, setJenis] = useState<string | null>(null);

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
  // Satu jenis konten sekaligus (D44); rak kategori hanya berisi jenis itu.
  const allItems = sections.flatMap((s) => s.items);
  const tabs = availableTypeTabs(allItems);
  const tab = activeTypeTab(jenis, allItems);
  const filled = sections
    .map((s) => ({ ...s, items: tab ? s.items.filter((i) => i.type === tab.type) : s.items }))
    .filter((s) => s.items.length > 0);
  const shown = active === "semua" ? filled : filled.filter((s) => s.slug === active);
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

      {tabs.length > 1 && (
        <nav className="type-tabs" aria-label="Jenis konten">
          {tabs.map((t) => (
            <button
              key={t.param}
              type="button"
              className="type-tab"
              aria-pressed={tab?.type === t.type}
              onClick={() => {
                setJenis(t.param);
                setActive("semua");
              }}
            >
              {t.label} <span className="count">{t.count}</span>
            </button>
          ))}
        </nav>
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
              <div>
                <h2>{s.name}</h2>
                {s.hook && <p className="muted small">"{s.hook}"</p>}
              </div>
              {active === "semua" &&
                s.items.length > (tab?.type === "tool" ? TOOL_MAX : SHELF_MAX - 1) && (
                  <button
                    type="button"
                    className="linklike shelf-more"
                    onClick={() => setActive(s.slug)}
                  >
                    Lihat semua <span className="muted">{s.items.length}</span>
                  </button>
                )}
            </div>
            {/* Semua kategori: rak yang digulir ke samping. Satu kategori: grid sampul. Tool
                bukan buku (D49): selalu grid kartu lebar, enam per kategori di tampilan Semua. */}
            <div
              className={
                tab?.type === "tool"
                  ? active === "semua"
                    ? "book-shelf tool-shelf"
                    : "tool-grid"
                  : active === "semua"
                    ? "book-shelf"
                    : "book-grid"
              }
            >
              {(active === "semua"
                ? s.items.slice(0, tab?.type === "tool" ? TOOL_MAX : SHELF_MAX)
                : s.items
              ).map((i) => (
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
