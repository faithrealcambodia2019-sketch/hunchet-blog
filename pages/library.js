import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BOOKS } from "../lib/books";
import { useT, useLocale, pick } from "../lib/i18n";
import {
  BookOpenIcon,
  DownloadIcon,
  ArrowRightIcon,
  CheckIcon,
} from "../components/Icons";

export default function Library() {
  const t = useT();
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("library.filterAll") },
    { id: "commentary", label: t("library.filterCommentary") },
    { id: "history", label: t("library.filterHistory") },
    { id: "reference", label: t("library.filterReference") },
    { id: "discipleship", label: t("library.filterDiscipleship") },
  ];

  // Filtered books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Category filter
      if (activeCategory !== "all" && book.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleEn = (book.title?.en || "").toLowerCase();
        const titleKm = (book.title?.km || "").toLowerCase();
        const authorEn = (book.author?.en || "").toLowerCase();
        const authorKm = (book.author?.km || "").toLowerCase();
        const descEn = (book.desc?.en || "").toLowerCase();
        const descKm = (book.desc?.km || "").toLowerCase();
        const subtitle = (pick(book.subtitle, locale) || "").toLowerCase();

        const matches =
          titleEn.includes(query) ||
          titleKm.includes(query) ||
          authorEn.includes(query) ||
          authorKm.includes(query) ||
          descEn.includes(query) ||
          descKm.includes(query) ||
          subtitle.includes(query);

        if (!matches) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, locale]);

  // Featured book is Matthew Henry Commentary
  const featuredBook = useMemo(() => {
    return BOOKS.find((b) => b.featured) || BOOKS[0];
  }, []);

  const showFeatured =
    activeCategory === "all" && !searchQuery.trim() && featuredBook;

  return (
    <>
      <Head>
        <title>{`${t("library.title")} — ${locale === "km" ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("library.intro")} />
        <meta property="og:title" content={`${t("library.title")} — Hun Chet`} />
        <meta property="og:description" content={t("library.intro")} />
        <meta property="og:image" content="/images/sunday-school-hero.jpg" />
      </Head>

      <SiteHeader />

      {/* 1. STATELY HERO SECTION */}
      <section className="library-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/sunday-school-hero.jpg"
          alt=""
          className="library-hero-bg"
          aria-hidden="true"
        />
        <div className="library-hero-overlay" aria-hidden="true" />

        <div className="library-hero-content">
          <div className="library-badge-tag">
            <BookOpenIcon />
            <span>{t("library.badge")}</span>
          </div>

          <h1 className="library-hero-title">{t("library.title")}</h1>
          <p className="library-hero-sub">{t("library.intro")}</p>

          <div className="library-gold-divider" />

          <div className="library-stats-strip">
            <div className="library-stat-item">
              <span className="library-stat-dot" />
              <span>{t("library.statVolumes")}</span>
            </div>
            <div className="library-stat-item">
              <span className="library-stat-dot" />
              <span>{t("library.statAccess")}</span>
            </div>
            <div className="library-stat-item">
              <span className="library-stat-dot" />
              <span>{t("library.statBilingual")}</span>
            </div>
            <div className="library-stat-item">
              <span className="library-stat-dot" />
              <span>{t("library.statDoctrinal")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER & SEARCH NAVIGATION */}
      <div className="library-filter-bar">
        <div className="container">
          <div className="library-filter-row">
            {/* Category tabs */}
            <div className="library-category-tabs">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? BOOKS.length
                    : BOOKS.filter((b) => b.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`library-tab-btn ${isActive ? "is-active" : ""}`}
                  >
                    <span>{cat.label}</span>
                    <span className="library-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Realtime Search Input */}
            <div className="library-search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("library.searchPlaceholder")}
                className="library-search-input"
                aria-label={t("library.searchPlaceholder")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CATALOG SECTION */}
      <main className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          {/* FEATURED SPOTLIGHT CARD */}
          {showFeatured && (
            <div className="library-featured-card">
              <Link
                href={`/library/${featuredBook.slug}`}
                className="library-featured-cover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredBook.cover}
                  alt={pick(featuredBook.title, locale)}
                  loading="lazy"
                />
                <div className="library-featured-cover-text">
                  <span className="library-featured-cover-badge">
                    {t("library.featuredBadge")}
                  </span>
                  <h2 className="library-featured-cover-title">
                    {pick(featuredBook.title, locale)}
                  </h2>
                </div>
              </Link>

              <div className="library-featured-body">
                <div className="library-featured-meta-row">
                  <span className="library-meta-tag is-primary">
                    {pick(featuredBook.categoryLabel, locale)}
                  </span>
                  <span className="library-meta-tag">
                    {pick(featuredBook.lang, locale)}
                  </span>
                  <span className="library-meta-tag">{featuredBook.pages}</span>
                  <span className="library-meta-tag">
                    PDF · {featuredBook.size}
                  </span>
                </div>

                <h3 className="library-featured-title">
                  <Link
                    href={`/library/${featuredBook.slug}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {pick(featuredBook.title, locale)}
                  </Link>
                </h3>

                <p className="library-featured-author">
                  {pick(featuredBook.author, locale)}
                </p>

                <p className="library-featured-desc">
                  {pick(featuredBook.desc, locale)}
                </p>

                {featuredBook.highlights && (
                  <ul className="library-highlight-list">
                    {featuredBook.highlights.map((hl, i) => (
                      <li key={i} className="library-highlight-item">
                        <span className="library-highlight-bullet" />
                        <span>{pick(hl, locale)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="library-featured-actions">
                  <Link
                    href={`/library/${featuredBook.slug}`}
                    className="library-btn is-primary"
                  >
                    <BookOpenIcon />
                    <span>{t("library.readVolume")}</span>
                  </Link>
                  <a
                    className="library-btn"
                    href={featuredBook.file}
                    download
                  >
                    <DownloadIcon />
                    <span>
                      {t("library.downloadPdf")} ({featuredBook.size})
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* CATALOG HEADER & RESULT COUNT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.45rem",
                  color: "var(--navy)",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                {t("library.allVolumes")}
              </h2>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {filteredBooks.length} / {BOOKS.length} Volumes
            </span>
          </div>

          {/* BOOK CATALOG GRID */}
          {filteredBooks.length > 0 ? (
            <ul className="library-grid">
              {filteredBooks.map((book) => {
                const title = pick(book.title, locale);
                const subtitle = pick(book.subtitle, locale);
                const author = pick(book.author, locale);
                const categoryLabel = pick(book.categoryLabel, locale);
                const desc = pick(book.desc, locale);
                const href = `/library/${book.slug}`;

                return (
                  <li key={book.slug} className="library-card">
                    {/* Cover Header */}
                    <Link href={href} className="library-card-cover">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={book.cover} alt="" loading="lazy" />

                      <div className="library-card-badges">
                        <span className="library-pill-category">
                          {categoryLabel}
                        </span>
                        <span className="library-pill-format">PDF</span>
                      </div>

                      <div className="library-card-cover-info">
                        <h4 className="library-card-cover-title">{title}</h4>
                        {subtitle && (
                          <div className="library-card-cover-sub">
                            {subtitle}
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="library-card-body">
                      {author && (
                        <div className="library-card-author">{author}</div>
                      )}

                      <h3>
                        <Link href={href}>{title}</Link>
                      </h3>

                      {book.khmer && locale !== "km" && (
                        <p className="library-card-khmer">{book.khmer}</p>
                      )}

                      <p className="library-card-desc">{desc}</p>

                      <div className="library-card-meta-bar">
                        <span>{pick(book.lang, locale)}</span>
                        <span>{book.pages}</span>
                        <span>{book.size}</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="library-card-actions">
                      <Link href={href} className="library-btn is-primary">
                        <BookOpenIcon />
                        <span>{t("library.readOnline")}</span>
                      </Link>
                      <a
                        className="library-btn"
                        href={book.file}
                        download
                      >
                        <DownloadIcon />
                        <span>{t("library.download")}</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1.5rem",
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  margin: "0 0 1.25rem",
                }}
              >
                {t("library.noResults")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="library-btn is-primary"
              >
                {t("library.resetFilter")}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 4. MINISTRY ARCHIVAL PILLARS SECTION */}
      <section className="library-mission-banner">
        <div className="library-mission-grid">
          <div className="library-mission-col">
            <h4>{t("library.pillar1Title")}</h4>
            <p>{t("library.pillar1Body")}</p>
          </div>
          <div className="library-mission-col">
            <h4>{t("library.pillar2Title")}</h4>
            <p>{t("library.pillar2Body")}</p>
          </div>
          <div className="library-mission-col">
            <h4>{t("library.pillar3Title")}</h4>
            <p>{t("library.pillar3Body")}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
