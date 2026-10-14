import Link from "next/link";
import { useLocale, pick } from "../lib/i18n";

/**
 * Authentic 3D Library Book Component
 * Features realistic hardcover leather/cloth binding, debossed gold-foil framing,
 * left spine hinge crease with volume ridges, silk bookmark ribbon, stacked page block,
 * and 3D hover perspective tilt.
 */
export default function Book3D({
  book,
  size = "md", // "sm" | "md" | "lg"
  showRibbon = true,
  interactive = true,
  onClick = null,
  href = null,
  className = "",
}) {
  const locale = useLocale();

  if (!book) return null;

  const title = pick(book.title, locale);
  const subtitle = pick(book.subtitle, locale);
  const author = pick(book.author, locale);
  const categoryLabel = pick(book.categoryLabel, locale);
  const binding = book.binding || {
    bg: "linear-gradient(145deg, #0d2038 0%, #06101d 100%)",
    accent: "#e5c378",
    accentLight: "#fceed1",
    spine: "#071526",
    ribbon: "#b91c1c",
    spineTextColor: "#e5c378",
    pagesThickness: 28,
  };

  const linkHref = href || `/library/${book.slug}`;

  const bookContent = (
    <div
      className={`book-3d-root book-size-${size} ${interactive ? "is-interactive" : ""} ${className}`}
      style={{
        "--book-bg": binding.bg,
        "--book-accent": binding.accent,
        "--book-accent-light": binding.accentLight || "#fff",
        "--book-spine-bg": binding.spine,
        "--book-ribbon-color": binding.ribbon || "var(--gold)",
        "--book-spine-text": binding.spineTextColor || binding.accent,
        "--book-pages-w": `${binding.pagesThickness || 24}px`,
      }}
    >
      <div className="book-3d-chassis">
        {/* 1. SILK BOOKMARK RIBBON */}
        {showRibbon && (
          <div className="book-silk-ribbon" aria-hidden="true">
            <span className="book-ribbon-cut" />
          </div>
        )}

        {/* 2. PHYSICAL BOOK COVER */}
        <div className="book-cover-card">
          {/* Left Spine Crease & Ridges */}
          <div className="book-spine-hinge" aria-hidden="true">
            <div className="book-spine-band band-1" />
            <div className="book-spine-band band-2" />
            <div className="book-spine-band band-3" />
            <div className="book-spine-band band-4" />
            <span className="book-spine-vert-code">{book.volCode || book.callNumber}</span>
          </div>

          {/* Front Face Hardcover */}
          <div className="book-cover-surface">
            {/* Double Inset Gold Foil Border with Corner Accents */}
            <div className="book-foil-frame">
              <span className="book-corner-gem top-left">◆</span>
              <span className="book-corner-gem top-right">◆</span>
              <span className="book-corner-gem btm-left">◆</span>
              <span className="book-corner-gem btm-right">◆</span>

              {/* Cover Header */}
              <div className="book-header-strip">
                <span className="book-call-tag">{book.callNumber}</span>
                <span className="book-vol-tag">{book.volCode}</span>
              </div>

              {/* Cover Sacred Cross Emblem */}
              <div className="book-emblem-wrap" aria-hidden="true">
                <div className="book-cross-icon">✝</div>
                <div className="book-emblem-halo" />
              </div>

              {/* Book Title Block */}
              <div className="book-title-container">
                <h3 className="book-foil-title">{title}</h3>
                {subtitle && <p className="book-foil-subtitle">{subtitle}</p>}
              </div>

              {/* Classic Ornamental Divider */}
              <div className="book-ornament-divider" aria-hidden="true">
                <span className="ornament-line" />
                <span className="ornament-glyph">❖</span>
                <span className="ornament-line" />
              </div>

              {/* Cover Bottom Seal & Imprint */}
              <div className="book-footer-strip">
                <p className="book-author-stamp">{author}</p>
                <div className="book-meta-stamp">
                  <span>{locale === "km" ? (book.pagesKm || book.pages) : book.pages}</span>
                  <span className="stamp-bullet">•</span>
                  <span>{book.publishedYear || "DIGITAL ARCHIVE"}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Glass / Light Sheen */}
            <div className="book-glare-overlay" aria-hidden="true" />
          </div>

          {/* 3. 3D RIGHT PAGES BLOCK (Realistic Stacked Paper) */}
          <div className="book-pages-edge" aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="book-3d-button"
        aria-label={`Open preview of ${title}`}
      >
        {bookContent}
      </button>
    );
  }

  return (
    <Link href={linkHref} className="book-3d-link" aria-label={`Read ${title}`}>
      {bookContent}
    </Link>
  );
}
