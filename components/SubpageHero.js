import { useLocale } from "../lib/i18n";

export default function SubpageHero({
  eyebrow,
  kicker,
  title,
  subtitle,
  bgImage = "/images/church-campus-poster.jpg",
  bgPosition = "center",
  bgOpacity = 0.92,
  badgeText,
  stats,
  breadcrumbs,
  children,
}) {
  const locale = useLocale();
  const isKm = locale === "km";
  const effectiveEyebrow = eyebrow || kicker;

  return (
    <section
      className="oc-subpage-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0e1116",
        color: "#ffffff",
        minHeight: "380px",
      }}
    >
      {/* Background photo - full bleed cinematic photography */}
      {bgImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${bgImage}')`,
            backgroundPosition: bgPosition,
            backgroundSize: "cover",
            opacity: bgOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Clean cinematic scrim for perfect contrast & readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14, 17, 22, 0.72) 0%, rgba(14, 17, 22, 0.48) 50%, rgba(14, 17, 22, 0.88) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero content container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "960px",
          margin: "0 auto",
          padding: "135px 24px 65px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Eyebrow / Kicker */}
        {effectiveEyebrow && (
          <p
            className="oc-eyebrow oc-light"
            style={{
              marginBottom: "12px",
              color: "rgba(255, 255, 255, 0.85)",
              letterSpacing: "0.2em",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {effectiveEyebrow}
          </p>
        )}

        {/* Title: Authentic One Church Bold Uppercase Sans */}
        {title && (
          <h1
            style={{
              fontFamily: isKm ? "'Koh Santepheap', sans-serif" : "Montserrat, sans-serif",
              fontSize: "clamp(28px, 4.2vw, 52px)",
              fontWeight: 800,
              lineHeight: isKm ? 1.45 : 1.15,
              textTransform: "uppercase",
              letterSpacing: isKm ? "0" : "0.03em",
              color: "#ffffff",
              margin: "0 0 16px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.6)",
            }}
          >
            {title}
          </h1>
        )}

        {/* Subtitle: Clean & Readable */}
        {subtitle && (
          <p
            style={{
              fontFamily: isKm ? "'Koh Santepheap', sans-serif" : "Montserrat, sans-serif",
              fontSize: "clamp(14px, 1.3vw, 17px)",
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "680px",
              margin: "0 auto 20px",
              textShadow: "0 1px 6px rgba(0, 0, 0, 0.6)",
            }}
          >
            {subtitle}
          </p>
        )}

        {badgeText && (
          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.9)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {badgeText}
          </div>
        )}

        {/* Hero Stats */}
        {stats && stats.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "28px",
              flexWrap: "wrap",
              marginTop: "16px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              width: "100%",
              maxWidth: "540px",
            }}
          >
            {stats.map((s, idx) => (
              <div key={idx} style={{ textAlign: "center", minWidth: "90px" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.1,
                  }}
                >
                  {s.num || s.number}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {children && <div style={{ marginTop: "24px" }}>{children}</div>}
      </div>

      {/* Clean 1px bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      />
    </section>
  );
}
