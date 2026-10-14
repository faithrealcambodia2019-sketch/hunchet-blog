import { useLocale, pick } from "../lib/i18n";

/**
 * Real Physical Hardcover Book Component
 * Matches the exact design from user screenshot (crop_green_book.png):
 * - Upright rectangular book standing with luxury soft drop-shadow
 * - Dark leather spine with 3 horizontal gold ribs (dividing 4 sections)
 * - Rich leather cover color (Forest Green, Royal Navy, Burgundy, etc.)
 * - Realistic spine crease / hinge indentation
 * - Gold rectangular stamped label box in upper third with author & title
 */
export default function RealBookCover({
  book,
  size = "sm", // "sm" (card: 116x164) | "md" (modal: 148x210) | "lg" (reader: 185x260)
  className = "",
  style = {},
  onClick = null,
}) {
  const locale = useLocale();
  const isKm = locale === "km";

  if (!book) return null;

  // Author label
  const rawAuthor = book.authorCover || (book.author ? (typeof book.author === "object" ? pick(book.author, locale) : book.author) : "HUN CHET");
  const authorName = typeof rawAuthor === "object" ? pick(rawAuthor, locale) : (rawAuthor || "HUN CHET");
  const formattedAuthor = String(authorName).toUpperCase();

  // Book title for stamp box
  const rawTitle = book.coverTitle || book.title;
  const title = typeof rawTitle === "object" ? pick(rawTitle, locale) : rawTitle;

  const coverColor = book.coverColor || "linear-gradient(135deg, #185a35 0%, #0e3b22 100%)";
  const spineColor = book.spineColor || "#0b141e";
  const goldColor = book.goldColor || "#d4af37";

  return (
    <div
      className={`real-book-cover size-${size} ${className}`}
      style={{
        "--cover-bg": coverColor,
        "--spine-bg": spineColor,
        "--gold-accent": goldColor,
        ...style,
      }}
      onClick={onClick}
      role="img"
      aria-label={`${formattedAuthor} - ${title}`}
    >
      {/* 1. Left Spine with 3 Horizontal Gold Ribs */}
      <div className="real-book-spine" aria-hidden="true">
        <span className="real-spine-rib" />
        <span className="real-spine-rib" />
        <span className="real-spine-rib" />
      </div>

      {/* 2. Spine Crease / Hinge Shadow */}
      <div className="real-book-crease" aria-hidden="true" />

      {/* 3. Cover Face with Gold Boxed Stamp */}
      <div className="real-book-face">
        <div className="real-book-stamp-box">
          <span className="real-book-stamp-author">{formattedAuthor}</span>
          <div className="real-book-stamp-divider" aria-hidden="true" />
          <h4
            className="real-book-stamp-title"
            style={{
              fontFamily: isKm ? "var(--font-khmer), sans-serif" : "var(--font-english), sans-serif",
            }}
          >
            {title}
          </h4>
        </div>
      </div>

      {/* 4. Realistic Surface Glare */}
      <div className="real-book-glare" aria-hidden="true" />
    </div>
  );
}
