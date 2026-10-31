import { useLocale } from "../lib/i18n";

export default function SubpageHero({
  eyebrow,
  kicker,
  title,
  subtitle,
  bgImage = "/images/church-campus-poster.jpg",
  bgPosition = "center",
  bgOpacity = 0.95,
  badgeText,
  stats,
  breadcrumbs,
  children,
}) {
  const locale = useLocale();
  const isKm = locale === "km";
  const effectiveEyebrow = eyebrow || kicker;

  return (
    <section className="oc-subpage-hero">
      {/* Background full-bleed photography */}
      {bgImage && (
        <div
          className="oc-subpage-hero-bg"
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundPosition: bgPosition,
            opacity: bgOpacity,
          }}
        />
      )}

      {/* Cinematic scrim for sharp contrast & legibility */}
      <div className="oc-subpage-hero-scrim" />

      {/* Hero content container */}
      <div className="oc-subpage-hero-content">
        {/* Eyebrow / Kicker */}
        {effectiveEyebrow && (
          <div className="oc-eyebrow oc-light">
            {effectiveEyebrow}
          </div>
        )}

        {/* Title: Authentic One Church Bold Uppercase Sans */}
        {title && (
          <h1
            className={`oc-subpage-hero-title ${
              isKm ? "is-khmer" : ""
            }`}
          >
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`oc-subpage-hero-subtitle ${
              isKm ? "is-khmer" : ""
            }`}
          >
            {subtitle}
          </p>
        )}

        {badgeText && (
          <div className="oc-badge-pill">
            {badgeText}
          </div>
        )}

        {/* Stats Strip if provided */}
        {Array.isArray(stats) && stats.length > 0 && (
          <div className="oc-hero-stats">
            {stats.map((s, idx) => (
              <div key={idx} className="oc-hero-stat-item">
                <span className="oc-hero-stat-num">{s.num || s.number}</span>
                <span className="oc-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {children && <div className="oc-hero-actions">{children}</div>}
      </div>

      {/* Clean 1px bottom accent line */}
      <div className="oc-hero-bottom-line" />
    </section>
  );
}
