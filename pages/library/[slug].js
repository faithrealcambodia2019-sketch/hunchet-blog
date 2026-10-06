import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { BOOKS, bookBySlug } from "../../lib/books";
import { useT, useLocale, pick } from "../../lib/i18n";
import {
  BookOpenIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "../../components/Icons";

export async function getStaticPaths({ locales }) {
  const paths = [];
  BOOKS.forEach((b) => {
    (locales || ["km"]).forEach((locale) => {
      paths.push({ params: { slug: b.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const book = bookBySlug(params.slug);
  return {
    props: {
      book,
      relatedBooks: BOOKS.filter((b) => b.slug !== params.slug).slice(0, 3),
    },
  };
}

export default function BookReader({ book, relatedBooks }) {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  if (!book) return null;

  const title = pick(book.title, locale);
  const subtitle = pick(book.subtitle, locale);
  const author = pick(book.author, locale);
  const categoryLabel = pick(book.categoryLabel, locale);
  const desc = pick(book.desc, locale);
  const edition = pick(book.edition, locale);
  const historical = pick(book.historicalContext, locale);

  return (
    <>
      <Head>
        <title>{`${title} — ${isKm ? "បណ្ណាល័យទេវវិទ្យា ហ៊ុន ចិត្ត" : "Hun Chet Theological Library"}`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={`${title} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={book.cover} />
      </Head>

      <SiteHeader />

      <main className="reader-page-container">
        <div className="container">
          {/* 1. READER TOOLBAR */}
          <div className="reader-toolbar">
            <Link href="/library" className="reader-back-link">
              <ChevronLeftIcon style={{ width: 14, height: 14 }} />
              <span>{t("library.allVolumes")}</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="library-meta-tag is-primary">
                {categoryLabel}
              </span>
              <span className="library-meta-tag">
                {pick(book.lang, locale)}
              </span>
              <a
                className="library-btn is-gold"
                href={book.file}
                download
              >
                <DownloadIcon />
                <span>
                  {t("library.downloadPdf")} ({book.size})
                </span>
              </a>
            </div>
          </div>

          {/* 2. BOOK HEADING */}
          <div className="reader-book-heading">
            <h1 className="reader-book-title">{title}</h1>
            {subtitle && (
              <p
                style={{
                  fontFamily: "var(--font-khmer)",
                  fontSize: "1.1rem",
                  color: "#4a5568",
                  margin: "0 0 0.5rem",
                  lineHeight: 1.8,
                }}
              >
                {subtitle}
              </p>
            )}
            {author && <div className="reader-book-author">{author}</div>}
          </div>

          {/* 3. TWO-COLUMN SCHOLARLY READING LAYOUT */}
          <div className="reader-layout">
            {/* LEFT COLUMN: COMPANION & TABLE OF CONTENTS */}
            <aside className="reader-sidebar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={title}
                className="reader-sidebar-cover"
                loading="lazy"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  paddingBottom: "1.25rem",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "0.8rem",
                  color: "#4a5568",
                }}
              >
                <div>
                  <strong>{t("library.format")}:</strong>{" "}
                  {isKm ? "បណ្ណសារឌីជីថល PDF" : "PDF Digital Archive"}
                </div>
                <div>
                  <strong>{t("library.pages")}:</strong> {book.pages}
                </div>
                <div>
                  <strong>{t("library.fileSize")}:</strong> {book.size}
                </div>
                {edition && (
                  <div>
                    <strong>{t("library.edition")}:</strong> {edition}
                  </div>
                )}
              </div>

              <h4>{t("library.studyOverview")}</h4>
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  color: "#4a5568",
                  margin: "0 0 1.25rem",
                }}
              >
                {desc}
              </p>

              {/* Table of Contents */}
              {book.tableOfContents && (
                <>
                  <h4>{t("library.tableOfContents")}</h4>
                  <ul className="reader-toc-list">
                    {book.tableOfContents.map((toc, i) => (
                      <li key={i} className="reader-toc-item">
                        <span className="reader-toc-num">{toc.section}.</span>
                        <span style={{ flex: 1 }}>{pick(toc.title, locale)}</span>
                        {toc.pages && (
                          <span className="reader-toc-pages">{toc.pages}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Core Highlights */}
              {book.highlights && (
                <>
                  <h4>{t("library.keyHighlights")}</h4>
                  <ul className="library-highlight-list" style={{ marginBottom: "1.5rem" }}>
                    {book.highlights.map((hl, i) => (
                      <li key={i} className="library-highlight-item">
                        <span className="library-highlight-bullet" />
                        <span>{pick(hl, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Historical Context */}
              {historical && (
                <>
                  <h4>{t("library.historicalContext")}</h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: "#64748b",
                      margin: 0,
                    }}
                  >
                    {historical}
                  </p>
                </>
              )}

              {/* Related Volumes */}
              {relatedBooks && relatedBooks.length > 0 && (
                <>
                  <h4>{t("library.allVolumes")}</h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {relatedBooks.map((rb) => (
                      <li key={rb.slug}>
                        <Link
                          href={`/library/${rb.slug}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.82rem",
                            color: "var(--navy)",
                            textDecoration: "none",
                            fontWeight: 600,
                          }}
                        >
                          <ArrowRightIcon style={{ width: 12, height: 12, color: "var(--gold)" }} />
                          <span>{pick(rb.title, locale)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </aside>

            {/* RIGHT COLUMN: DOCUMENT VIEWER */}
            <section className="reader-main-frame">
              <div className="reader-frame-topbar">
                <div className="reader-frame-title">
                  <BookOpenIcon />
                  <span>{t("library.officialViewer")}</span>
                </div>

                <div className="reader-frame-actions">
                  <a href={book.file} target="_blank" rel="noopener noreferrer">
                    <span>{t("library.openExternal")}</span>
                  </a>
                  <a href={book.file} download>
                    <DownloadIcon />
                    <span>{t("library.download")}</span>
                  </a>
                </div>
              </div>

              {/* PDF OBJECT VIEWER WITH RICH FALLBACK */}
              <object
                data={book.file}
                type="application/pdf"
                className="reader-object-box"
              >
                <div className="reader-fallback-box">
                  <BookOpenIcon />
                  <h3>{title}</h3>
                  <p>{t("library.noInlinePdf")}</p>
                  <a
                    className="library-btn is-primary"
                    href={book.file}
                    download
                  >
                    <DownloadIcon />
                    <span>
                      {t("library.downloadPdf")} ({book.size})
                    </span>
                  </a>
                </div>
              </object>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
