import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT, useLocale } from "../lib/i18n";

const TELEGRAM_URL = "https://t.me/+855966875886";
const MESSENGER_URL = "https://m.me/hunchet2024";

const IMPACT_AREAS = ["teaching", "media", "outreach"];
const CAMBODIA_METHODS = ["khqr", "bank", "monthly"];
const GLOBAL_METHODS = ["card", "transfer", "monthly"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function GivingCard({ region, methods, href, externalLabel, featured = false }) {
  const t = useT();

  return (
    <article className={`giving-card${featured ? " giving-card-featured" : ""}`} style={{ borderRadius: "var(--radius-lg)", borderTop: "3px solid var(--gold)" }}>
      <div className="giving-card-head">
        <span className="giving-region" style={{ color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          {t(`partner.${region}.label`)}
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)", margin: "0.5rem 0" }}>
          {t(`partner.${region}.title`)}
        </h3>
        <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.65 }}>
          {t(`partner.${region}.description`)}
        </p>
      </div>

      <ul className="giving-methods" style={{ margin: "1.5rem 0" }}>
        {methods.map((method) => (
          <li key={method} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1rem" }}>
            <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>
              <CheckIcon />
            </span>
            <span>
              <strong style={{ display: "block", color: "var(--navy-dark)", fontSize: "0.95rem" }}>
                {t(`partner.${region}.${method}`)}
              </strong>
              <small style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                {t(`partner.${region}.${method}Note`)}
              </small>
            </span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={featured ? "btn btn-primary" : "btn btn-ghost"}
        style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
      >
        {t(`partner.${region}.cta`)}
        <span aria-hidden="true" style={{ marginLeft: 6 }}>→</span>
        <span className="sr-only"> {externalLabel}</span>
      </a>
    </article>
  );
}

export default function PartnerWithUs() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <>
      <Head>
        <title>{`${t("partner.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("partner.intro")} />
      </Head>

      <SiteHeader />

      <main className="partner-page">
        {/* Stately Sanctuary Hero */}
        <section className="sanctuary-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/church-family.jpg"
            alt="Hun Chet Ministry Family"
            className="sanctuary-hero-bg"
          />
          <div className="sanctuary-hero-overlay" />
          <div className="sanctuary-hero-content">
            <div className="sanctuary-badge-tag">
              <span>{isKm ? "ការចូលរួមចំណែកក្នុងព្រះរាជ្យព្រះ" : "Kingdom Mission & Stewardship"}</span>
            </div>
            <h1 className="sanctuary-hero-title">{t("partner.title")}</h1>
            <p className="sanctuary-hero-subtitle">
              {isKm
                ? "ការរួមចំណែកពង្រីកដំណឹងល្អ ការបង្រៀនព្រះបន្ទូល និងការបម្រើសហគមន៍ក្នុងប្រទេសកម្ពុជា"
                : "Advancing the Gospel, Biblical Teaching, and Christian Outreach Across Cambodia"}
            </p>
            <p className="sanctuary-hero-lead">{t("partner.intro")}</p>

            <div className="sanctuary-stat-strip">
              <div className="sanctuary-stat-card">
                <span className="sanctuary-stat-num">Kingdom</span>
                <span className="sanctuary-stat-label">
                  {isKm ? "បេសកកម្មដំណឹងល្អ" : "Gospel Mission"}
                </span>
              </div>
              <div className="sanctuary-stat-card">
                <span className="sanctuary-stat-num">100%</span>
                <span className="sanctuary-stat-label">
                  {isKm ? "ភាពស្មោះត្រង់ និងតម្លាភាព" : "Faithful Stewardship"}
                </span>
              </div>
              <div className="sanctuary-stat-card">
                <span className="sanctuary-stat-num">Hun Chet</span>
                <span className="sanctuary-stat-label">
                  {isKm ? "ព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត" : "Ministry Stewardship"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner / Impact Pillars */}
        <section className="section" id="impact">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow">{t("partner.impactEyebrow")}</span>
              <h2>{t("partner.impactTitle")}</h2>
              <hr className="rule" />
              <p style={{ maxWidth: 660, margin: "0.75rem auto 0", color: "var(--muted)" }}>
                {t("partner.impactIntro")}
              </p>
            </div>

            <div className="value-grid" style={{ marginTop: "2.5rem" }}>
              {IMPACT_AREAS.map((area, index) => (
                <article className="value-card" key={area}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)", marginBottom: "0.5rem" }}>
                    0{index + 1}
                  </span>
                  <h3>{t(`partner.impact.${area}.title`)}</h3>
                  <p>{t(`partner.impact.${area}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ways to Give Section */}
        <section className="section section-alt" id="give">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow">{t("partner.giveEyebrow")}</span>
              <h2>{t("partner.giveTitle")}</h2>
              <hr className="rule" />
              <p style={{ maxWidth: 660, margin: "0.75rem auto 0", color: "var(--muted)" }}>
                {t("partner.giveIntro")}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginTop: "2.5rem" }}>
              <GivingCard region="cambodia" methods={CAMBODIA_METHODS} href={TELEGRAM_URL} externalLabel="Telegram" featured />
              <GivingCard region="global" methods={GLOBAL_METHODS} href={MESSENGER_URL} externalLabel="Messenger" />
            </div>

            <aside style={{ maxWidth: 720, margin: "3rem auto 0", padding: "1.5rem 1.75rem", background: "#ffffff", border: "1px solid var(--border)", borderLeft: "3px solid var(--gold)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ color: "var(--gold)", marginTop: "2px" }}>
                <CheckIcon />
              </div>
              <div>
                <strong style={{ display: "block", color: "var(--navy-dark)", fontSize: "1rem", marginBottom: "0.25rem" }}>
                  {t("partner.safetyTitle")}
                </strong>
                <p style={{ color: "var(--text)", fontSize: "0.92rem", lineHeight: 1.65, margin: 0 }}>
                  {t("partner.safetyBody")}
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Other Ways to Partner */}
        <section className="section">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow">{t("partner.otherEyebrow")}</span>
              <h2>{t("partner.otherTitle")}</h2>
              <hr className="rule" />
              <p style={{ maxWidth: 660, margin: "0.75rem auto 0", color: "var(--muted)" }}>
                {t("partner.otherIntro")}
              </p>
            </div>

            <div className="value-grid" style={{ marginTop: "2.5rem" }}>
              {["pray", "share", "collaborate"].map((way) => (
                <article className="value-card" key={way}>
                  <h3>{t(`partner.other.${way}.title`)}</h3>
                  <p>{t(`partner.other.${way}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Bar */}
        <section className="section section-navy" style={{ borderTop: "8px solid var(--gold)", textAlign: "center", padding: "4rem 1.5rem" }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{t("partner.finalEyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#ffffff", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", margin: "0.75rem 0" }}>
              {t("partner.finalTitle")}
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              {t("partner.finalBody")}
            </p>
            <Link href="/contact" className="btn btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "0.92rem" }}>
              {t("partner.finalCta")} →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
