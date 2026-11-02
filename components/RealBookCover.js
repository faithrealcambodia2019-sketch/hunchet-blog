import { useLocale, pick } from "../lib/i18n";

/**
 * Authentic 3D Hardcover Book Component
 * Renders as a true physical leather hardcover tome:
 * - 3D paper text block / page edges on the fore-edge with layered paper grain and board square overhang
 * - Curved cylindrical spine with 4 3D raised leather bands (hubbed spine) & gold fillet lines
 * - Woven fabric headband tab at the head of the spine
 * - Deep French groove (hinge joint crease)
 * - Tactile fine leather texture with burnished edge vignette
 * - Hot-stamped debossed gold foil Oxford double frame with corner diamonds
 * - Classical Cinzel / Lora serif typography for author & title (NEVER truncated with ellipsis)
 * - Authentic Koh Santepheap font for Khmer titles
 * - Multi-layer ambient and contact floor shadow
 */
export default function RealBookCover({
  book,
  size = "sm", // "sm" (card: ~120x168) | "md" (modal/portal: ~144x202) | "lg" (reader/hero: ~196x274)
  className = "",
  style = {},
  onClick = null,
}) {
  const locale = useLocale();
  const isKm = locale === "km";

  if (!book) return null;

  // Author label - always full string, never truncated
  const rawAuthor =
    book.authorCover ||
    (book.author
      ? typeof book.author === "object"
        ? pick(book.author, locale)
        : book.author
      : "HUN CHET");
  const authorName =
    typeof rawAuthor === "object" ? pick(rawAuthor, locale) : (rawAuthor || "HUN CHET");
  const formattedAuthor = String(authorName).toUpperCase();

  // Book title for stamp box
  const rawTitle = book.coverTitle || book.title;
  const title = typeof rawTitle === "object" ? pick(rawTitle, locale) : rawTitle;

  const coverColor = book.coverColor || "linear-gradient(135deg, #18233c 0%, #0c1524 100%)";
  const spineColor = book.spineColor || "#080e18";
  const goldColor = book.goldColor || "#d4af37";
  const volCode = book.volCode || null;

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
      <div className="real-book-chassis">
        {/* 1. Curved 3D Spine */}
        <div className="real-book-spine" aria-hidden="true">
          <div className="real-spine-cylinder-highlight" />
          <div className="real-spine-ribs">
            <span className="real-spine-rib"><span className="rib-gold" /></span>
            <span className="real-spine-rib"><span className="rib-gold" /></span>
            <span className="real-spine-rib"><span className="rib-gold" /></span>
            <span className="real-spine-rib"><span className="rib-gold" /></span>
          </div>
          <div className="real-spine-headband" />
        </div>

        {/* 2. Deep French Groove (Hinge Joint Crease) */}
        <div className="real-book-crease" aria-hidden="true" />

        {/* 3. Front Hardcover Board Face */}
        <div className="real-book-face">
          {/* Leather Grain & Burnished Vignette */}
          <div className="real-book-leather-texture" aria-hidden="true" />

          {/* Hot-Stamped Gold Foil Plaque / Oxford Double Frame */}
          <div className="real-book-stamp-box">
            <div className="real-book-stamp-inner">
              {/* Corner Diamond Accents */}
              <span className="stamp-corner corner-tl">◆</span>
              <span className="stamp-corner corner-tr">◆</span>
              <span className="stamp-corner corner-bl">◆</span>
              <span className="stamp-corner corner-br">◆</span>

              {/* Author in Classical Typography */}
              <span
                className="real-book-stamp-author"
                style={{
                  fontFamily: isKm
                    ? "'Koh Santepheap', sans-serif"
                    : "'Cinzel', 'Lora', Georgia, serif",
                }}
              >
                {formattedAuthor}
              </span>

              {/* Gold Filigree Ornament Divider */}
              <div className="real-book-stamp-divider" aria-hidden="true">
                <span className="stamp-divider-line" />
                <span className="stamp-divider-gem">❖</span>
                <span className="stamp-divider-line" />
              </div>

              {/* Title with Debossed Foil Effect */}
              <h4
                className="real-book-stamp-title"
                style={{
                  fontFamily: isKm
                    ? "'Koh Santepheap', sans-serif"
                    : "'Cinzel', 'Lora', Georgia, serif",
                }}
              >
                {title}
              </h4>

              {/* Volume / Callout if present */}
              {volCode && (
                <span className="real-book-stamp-vol">{volCode}</span>
              )}
            </div>
          </div>

          {/* Realistic Surface Specular Light Sheen */}
          <div className="real-book-glare" aria-hidden="true" />
        </div>

        {/* 4. Page Block Edge (Compressed Paper Pages with Hardcover Square Overhang) */}
        <div className="real-book-pages-block" aria-hidden="true">
          <div className="pages-edge-lines" />
        </div>
      </div>

      {/* 5. Realistic Ambient & Floor Drop Shadow */}
      <div className="real-book-ground-shadow" aria-hidden="true" />
    </div>
  );
}
