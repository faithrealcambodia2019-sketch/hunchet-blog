import { useEffect, useRef } from "react";
import Link from "next/link";
import { useT, useLocale, pick } from "../lib/i18n";
import {
  BookOpenIcon,
  DownloadIcon,
  CloseIcon,
  CheckIcon,
  ArrowRightIcon,
} from "./Icons";
import Book3D from "./Book3D";

/**
 * Open-Book Parchment Preview Modal ("Look Inside / បើកមើលសៀវភៅ")
 * Renders an open book spread with ivory parchment texture, spine gutter shadow,
 * table of contents on the left page, and selected excerpt + theological notes on the right page.
 */
export default function BookPreviewModal({ book, isOpen, onClose }) {
  const t = useT();
  const locale = useLocale();
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const title = pick(book.title, locale);
  const subtitle = pick(book.subtitle, locale);
  const author = pick(book.author, locale);
  const categoryLabel = pick(book.categoryLabel, locale);
  const desc = pick(book.desc, locale);
  const excerpt = pick(book.excerpt, locale);
  const historical = pick(book.historicalContext, locale);
  const pagesText = locale === "km" ? (book.pagesKm || book.pages) : book.pages;

  return (
    <div
      className="book-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
    >
      <div
        className="book-modal-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="book-modal-close-btn"
          aria-label={t("library.closePreview") || "Close"}
        >
          <CloseIcon />
        </button>

        {/* 2-PAGE SPREAD: OPEN PHYSICAL BOOK EXPERIENCE */}
        <div className="book-spread-wrap">
          {/* Top Hanging Silk Ribbon in the gutter */}
          <div
            className="book-spread-ribbon"
            style={{ backgroundColor: book.binding?.ribbon || "var(--gold)" }}
            aria-hidden="true"
          />

          {/* LEFT PAGE: ARCHIVAL CALL, COVER EMBLEM & TABLE OF CONTENTS */}
          <div className="book-page book-page-left">
            <div className="book-page-header">
              <span className="book-page-fol">{book.callNumber}</span>
              <span className="book-page-cat">{categoryLabel}</span>
              <span className="book-page-num">{pagesText}</span>
            </div>

            <div className="book-page-inner">
              <div className="book-page-mini-hero">
                <div className="book-page-cover-preview">
                  <Book3D book={book} size="sm" interactive={false} />
                </div>
                <div className="book-page-id-block">
                  <span className="book-page-vol-stamp">{book.volCode}</span>
                  <h2 className="book-page-title">{title}</h2>
                  {subtitle && <p className="book-page-subtitle">{subtitle}</p>}
                  <p className="book-page-author">{author}</p>
                  <p className="book-page-pub">{book.publishedYear} • {book.edition ? pick(book.edition, locale) : ""}</p>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="book-page-toc-section">
                <h4 className="book-page-section-title">
                  <span>{t("library.tableOfContents")}</span>
                </h4>

                {book.tableOfContents && book.tableOfContents.length > 0 ? (
                  <ol className="book-spread-toc-list">
                    {book.tableOfContents.map((toc, idx) => (
                      <li key={idx} className="book-spread-toc-item">
                        <span className="toc-sec-num">{toc.section}.</span>
                        <span className="toc-sec-name">{pick(toc.title, locale)}</span>
                        <span className="toc-sec-dots" aria-hidden="true" />
                        <span className="toc-sec-page">{toc.pages}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="book-page-desc">{desc}</p>
                )}
              </div>
            </div>

            <div className="book-page-footer">
              <span>HUN CHET THEOLOGICAL ARCHIVE</span>
              <span>•</span>
              <span>CAMBODIA</span>
            </div>
          </div>

          {/* CENTRAL BOOK GUTTER / SPINE FOLD */}
          <div className="book-spread-gutter" aria-hidden="true" />

          {/* RIGHT PAGE: EXCERPT, THEOLOGICAL HIGHLIGHTS & DIRECT ACTIONS */}
          <div className="book-page book-page-right">
            <div className="book-page-header">
              <span className="book-page-fol">{locale === "km" ? "ឯកសារសិក្សាព្រះគម្ពីរ" : "BIBLICAL STUDY COMPANION"}</span>
              <span className="book-page-num">PDF · {book.size}</span>
            </div>

            <div className="book-page-inner">
              {/* Selected Excerpt / Preface Opening */}
              {excerpt && (
                <div className="book-page-excerpt-box">
                  <div className="excerpt-quote-glyph" aria-hidden="true">“</div>
                  <h4 className="book-page-section-title" style={{ marginTop: 0 }}>
                    {locale === "km" ? "សម្រង់ព្រះបន្ទូល និងបុព្វកថាគន្លឹះ" : "Selected Opening Excerpt"}
                  </h4>
                  <blockquote className="book-page-quote">
                    {excerpt}
                  </blockquote>
                </div>
              )}

              {/* Study Description */}
              <div className="book-page-section">
                <h4 className="book-page-section-title">
                  {t("library.studyOverview")}
                </h4>
                <p className="book-page-desc">{desc}</p>
              </div>

              {/* Key Highlights */}
              {book.highlights && (
                <div className="book-page-section">
                  <h4 className="book-page-section-title">
                    {t("library.keyHighlights")}
                  </h4>
                  <ul className="book-spread-highlights">
                    {book.highlights.map((hl, idx) => (
                      <li key={idx}>
                        <span className="highlight-bullet">✓</span>
                        <span>{pick(hl, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Historical Context Note */}
              {historical && (
                <div className="book-spread-context">
                  <strong>{t("library.historicalContext")}:</strong> {historical}
                </div>
              )}
            </div>

            {/* Bottom Action Strip on Right Page */}
            <div className="book-page-actions-bar">
              <Link
                href={`/library/${book.slug}`}
                className="book-modal-btn is-primary"
                onClick={onClose}
              >
                <BookOpenIcon />
                <span>{t("library.readVolume")}</span>
              </Link>

              <a
                href={book.file}
                download
                className="book-modal-btn is-gold"
              >
                <DownloadIcon />
                <span>{t("library.downloadPdf")} ({book.size})</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="book-modal-btn is-ghost"
              >
                <span>{locale === "km" ? "បិទ" : "Close"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
