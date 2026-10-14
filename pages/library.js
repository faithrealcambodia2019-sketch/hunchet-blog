import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BOOKS } from "../lib/books";
import { useT, useLocale, pick } from "../lib/i18n";
import Book3D from "../components/Book3D";
import BookPreviewModal from "../components/BookPreviewModal";
import {
  BookOpenIcon,
  DownloadIcon,
  ArrowRightIcon,
  CheckIcon,
  SearchIcon,
} from "../components/Icons";

export default function Library() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("shelf"); // "shelf" | "catalog"
  const [previewBook, setPreviewBook] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categories = [
    { id: "all", label: t("library.filterAll") },
    { id: "commentary", label: t("library.filterCommentary") },
    { id: "history", label: t("library.filterHistory") },
    { id: "reference", label: t("library.filterReference") },
    { id: "discipleship", label: t("library.filterDiscipleship") },
  ];

  // Open Preview Modal
  const handleOpenPreview = (book) => {
    setPreviewBook(book);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

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
        const callNum = (book.callNumber || "").toLowerCase();

        const matches =
          titleEn.includes(query) ||
          titleKm.includes(query) ||
          authorEn.includes(query) ||
          authorKm.includes(query) ||
          descEn.includes(query) ||
          descKm.includes(query) ||
          subtitle.includes(query) ||
          callNum.includes(query);

        if (!matches) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, locale]);

  // Featured book (Matthew Henry Commentary)
  const featuredBook = useMemo(() => {
    return BOOKS.find((b) => b.featured) || BOOKS[0];
  }, []);

  const showFeatured =
    activeCategory === "all" && !searchQuery.trim() && featuredBook;

  return (
    <>
      <Head>
        <title>{`${t("library.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
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

      {/* 2. STICKY FILTER, SEARCH & VIEW SWITCHER */}
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

            {/* View Switcher: Bookshelf vs Catalog */}
            <div className="library-view-switcher">
              <button
                type="button"
                onClick={() => setViewMode("shelf")}
                className={`library-view-btn ${viewMode === "shelf" ? "is-active" : ""}`}
                aria-label={t("library.shelfView")}
                title={t("library.shelfView")}
              >
                <BookOpenIcon />
                <span>{t("library.shelfView")}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("catalog")}
                className={`library-view-btn ${viewMode === "catalog" ? "is-active" : ""}`}
                aria-label={t("library.catalogView")}
                title={t("library.catalogView")}
              >
                <span>☰</span>
                <span>{t("library.catalogView")}</span>
              </button>
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

      {/* 3. MAIN CATALOG & BOOKSHELF SECTION */}
      <main className="section" style={{ background: "var(--bg-alt)", minHeight: "60vh" }}>
        <div className="container">
          {/* FEATURED SPOTLIGHT CARD (With authentic 3D Book on the left) */}
          {showFeatured && (
            <div className="library-featured-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem 1.5rem",
                  background: "linear-gradient(135deg, #091523 0%, #040910 100%)",
                }}
              >
                <Book3D
                  book={featuredBook}
                  size="lg"
                  onClick={() => handleOpenPreview(featuredBook)}
                />
              </div>

              <div className="library-featured-body">
                <div className="library-featured-meta-row">
                  <span className="library-meta-tag is-primary">
                    {pick(featuredBook.categoryLabel, locale)}
                  </span>
                  <span className="library-meta-tag">
                    {featuredBook.callNumber}
                  </span>
                  <span className="library-meta-tag">
                    {pick(featuredBook.lang, locale)}
                  </span>
                  <span className="library-meta-tag">
                    {isKm ? (featuredBook.pagesKm || featuredBook.pages) : featuredBook.pages}
                  </span>
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
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(featuredBook)}
                    className="library-btn is-gold"
                  >
                    <BookOpenIcon />
                    <span>{t("library.lookInside")}</span>
                  </button>
                  <Link
                    href={`/library/${featuredBook.slug}`}
                    className="library-btn is-primary"
                  >
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

          {/* SECTION HEADER: TITLE & RESULT COUNT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border)",
              flexWrap: "wrap",
              gap: "1rem",
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
                {viewMode === "shelf" ? t("library.shelfView") : t("library.allVolumes")}
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
              {filteredBooks.length} / {BOOKS.length} {isKm ? "កម្រងសៀវភៅ" : "Volumes"}
            </span>
          </div>

          {/* VIEW MODE 1: AUTHENTIC 3D BOOKSHELF SHOWCASE */}
          {filteredBooks.length > 0 && viewMode === "shelf" && (
            <div className="bookshelf-showcase">
              <div className="bookshelf-header-bar">
                <div className="bookshelf-title-wrap">
                  <div className="bookshelf-brass-crest">
                    <BookOpenIcon />
                  </div>
                  <div>
                    <h3 className="bookshelf-title-text">{t("library.shelfView")}</h3>
                    <p className="bookshelf-notice-text">{t("library.shelfNotice")}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode("catalog")}
                  className="bookshelf-action-btn"
                  style={{ alignSelf: "center" }}
                >
                  <span>{isKm ? "មើលបែបកាតាឡុកលម្អិត" : "Switch to Detailed Catalog"} →</span>
                </button>
              </div>

              {/* Shelf row with standing 3D physical volumes */}
              <div className="bookshelf-row">
                {filteredBooks.map((book) => {
                  const title = pick(book.title, locale);
                  const author = pick(book.author, locale);
                  const pagesText = isKm ? (book.pagesKm || book.pages) : book.pages;

                  return (
                    <div key={book.slug} className="bookshelf-unit">
                      {/* Physical 3D Book standing upright */}
                      <Book3D
                        book={book}
                        size="md"
                        onClick={() => handleOpenPreview(book)}
                      />

                      {/* Hardwood shelf board underneath */}
                      <div className="bookshelf-wooden-board" aria-hidden="true" />

                      {/* Under-shelf title plaque & actions */}
                      <div className="bookshelf-unit-plaque">
                        <div className="bookshelf-plaque-meta">
                          {book.callNumber} • {pagesText}
                        </div>
                        <h4 className="bookshelf-plaque-title">{title}</h4>
                        <div className="bookshelf-plaque-actions">
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(book)}
                            className="bookshelf-action-btn"
                            title={t("library.lookInside")}
                          >
                            <BookOpenIcon style={{ width: 12, height: 12 }} />
                            <span>{t("library.lookInside")}</span>
                          </button>
                          <Link
                            href={`/library/${book.slug}`}
                            className="bookshelf-action-btn is-read"
                            title={t("library.readOnline")}
                          >
                            <span>{t("library.readOnline")}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Brass shelf rail at bottom */}
              <div className="bookshelf-brass-rail">
                <span>{t("library.shelfBrassTag")}</span>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: DETAILED STUDY CATALOG (3D Book + In-depth Notes) */}
          {filteredBooks.length > 0 && viewMode === "catalog" && (
            <ul className="library-catalog-grid">
              {filteredBooks.map((book) => {
                const title = pick(book.title, locale);
                const subtitle = pick(book.subtitle, locale);
                const author = pick(book.author, locale);
                const categoryLabel = pick(book.categoryLabel, locale);
                const desc = pick(book.desc, locale);
                const pagesText = isKm ? (book.pagesKm || book.pages) : book.pages;
                const href = `/library/${book.slug}`;

                return (
                  <li key={book.slug} className="library-catalog-card">
                    {/* Left: 3D Physical Book */}
                    <div className="catalog-book-anchor">
                      <Book3D
                        book={book}
                        size="md"
                        onClick={() => handleOpenPreview(book)}
                      />
                    </div>

                    {/* Right: Detailed Study Metadata & Actions */}
                    <div className="catalog-info-col">
                      <div className="catalog-meta-row">
                        <span className="library-meta-tag is-primary">
                          {categoryLabel}
                        </span>
                        <span className="library-meta-tag">
                          {book.callNumber}
                        </span>
                        <span className="library-meta-tag">
                          {pick(book.lang, locale)}
                        </span>
                        <span className="library-meta-tag">
                          {pagesText}
                        </span>
                        <span className="library-meta-tag">
                          PDF · {book.size}
                        </span>
                      </div>

                      <h3 className="catalog-title">
                        <Link href={href}>{title}</Link>
                      </h3>

                      {subtitle && (
                        <p className="catalog-subtitle">{subtitle}</p>
                      )}

                      {author && (
                        <div className="catalog-author">{author}</div>
                      )}

                      <p className="catalog-desc">{desc}</p>

                      {/* Highlights */}
                      {book.highlights && (
                        <ul className="library-highlight-list" style={{ marginBottom: "1.25rem" }}>
                          {book.highlights.slice(0, 2).map((hl, i) => (
                            <li key={i} className="library-highlight-item">
                              <span className="library-highlight-bullet" />
                              <span>{pick(hl, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="catalog-actions-row">
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(book)}
                          className="library-btn is-gold"
                        >
                          <BookOpenIcon />
                          <span>{t("library.lookInside")}</span>
                        </button>
                        <Link href={href} className="library-btn is-primary">
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
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* EMPTY STATE */}
          {filteredBooks.length === 0 && (
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

      {/* 5. OPEN-BOOK STUDY PREVIEW MODAL */}
      <BookPreviewModal
        book={previewBook}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />

      <SiteFooter />
    </>
  );
}
