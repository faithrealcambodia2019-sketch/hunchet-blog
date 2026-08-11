import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";

const TELEGRAM_URL = "https://t.me/+855966875886";
const MESSENGER_URL = "https://m.me/hunchet2024";

const IMPACT_AREAS = ["teaching", "media", "outreach"];
const CAMBODIA_METHODS = ["khqr", "bank", "monthly"];
const GLOBAL_METHODS = ["card", "transfer", "monthly"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

function GivingCard({ region, methods, href, externalLabel, featured = false }) {
  const t = useT();

  return (
    <article className={`giving-card${featured ? " giving-card-featured" : ""}`}>
      <div className="giving-card-head">
        <span className="giving-region">{t(`partner.${region}.label`)}</span>
        <h3>{t(`partner.${region}.title`)}</h3>
        <p>{t(`partner.${region}.description`)}</p>
      </div>

      <ul className="giving-methods">
        {methods.map((method) => (
          <li key={method}>
            <span className="giving-check"><CheckIcon /></span>
            <span>
              <strong>{t(`partner.${region}.${method}`)}</strong>
              <small>{t(`partner.${region}.${method}Note`)}</small>
            </span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={featured ? "partner-btn partner-btn-primary" : "partner-btn partner-btn-dark"}
      >
        {t(`partner.${region}.cta`)}
        <span aria-hidden="true">→</span>
        <span className="sr-only"> {externalLabel}</span>
      </a>
    </article>
  );
}

export default function PartnerWithUs() {
  const t = useT();

  return (
    <>
      <Head>
        <title>{`${t("partner.title")} — Hun Chet`}</title>
        <meta name="description" content={t("partner.intro")} />
      </Head>

      <SiteHeader />

      <main className="partner-page">
        <section className="partner-hero">
          <div className="partner-hero-glow" aria-hidden="true" />
          <div className="container partner-hero-inner">
            <span className="partner-kicker">{t("partner.eyebrow")}</span>
            <h1>{t("partner.title")}</h1>
            <p>{t("partner.intro")}</p>
            <div className="partner-hero-actions">
              <a href="#give" className="partner-btn partner-btn-primary">
                {t("partner.primaryCta")} <span aria-hidden="true">↓</span>
              </a>
              <a href="#impact" className="partner-btn partner-btn-ghost">
                {t("partner.secondaryCta")}
              </a>
            </div>

            <div className="partner-trust-row" aria-label={t("partner.trustLabel")}>
              {["verified", "options", "direct"].map((item) => (
                <div key={item}>
                  <CheckIcon />
                  <span>{t(`partner.trust.${item}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section" id="impact">
          <div className="container">
            <div className="partner-section-head">
              <span className="partner-kicker partner-kicker-dark">{t("partner.impactEyebrow")}</span>
              <h2>{t("partner.impactTitle")}</h2>
              <p>{t("partner.impactIntro")}</p>
            </div>

            <div className="partner-impact-grid">
              {IMPACT_AREAS.map((area, index) => (
                <article className="partner-impact-card" key={area}>
                  <span className="impact-number">0{index + 1}</span>
                  <h3>{t(`partner.impact.${area}.title`)}</h3>
                  <p>{t(`partner.impact.${area}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section partner-give-section" id="give">
          <div className="container">
            <div className="partner-section-head">
              <span className="partner-kicker partner-kicker-dark">{t("partner.giveEyebrow")}</span>
              <h2>{t("partner.giveTitle")}</h2>
              <p>{t("partner.giveIntro")}</p>
            </div>

            <div className="partner-giving-grid">
              <GivingCard region="cambodia" methods={CAMBODIA_METHODS} href={TELEGRAM_URL} externalLabel="Telegram" featured />
              <GivingCard region="global" methods={GLOBAL_METHODS} href={MESSENGER_URL} externalLabel="Messenger" />
            </div>

            <aside className="partner-safety-note">
              <div className="safety-icon" aria-hidden="true">✓</div>
              <div>
                <strong>{t("partner.safetyTitle")}</strong>
                <p>{t("partner.safetyBody")}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="partner-section partner-other-section">
          <div className="container">
            <div className="partner-section-head">
              <span className="partner-kicker partner-kicker-dark">{t("partner.otherEyebrow")}</span>
              <h2>{t("partner.otherTitle")}</h2>
              <p>{t("partner.otherIntro")}</p>
            </div>

            <div className="partner-other-grid">
              {["pray", "share", "collaborate"].map((way) => (
                <article key={way}>
                  <span aria-hidden="true">{way === "pray" ? "✦" : way === "share" ? "↗" : "◎"}</span>
                  <h3>{t(`partner.other.${way}.title`)}</h3>
                  <p>{t(`partner.other.${way}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-final">
          <div className="container partner-final-inner">
            <div>
              <span className="partner-kicker">{t("partner.finalEyebrow")}</span>
              <h2>{t("partner.finalTitle")}</h2>
              <p>{t("partner.finalBody")}</p>
            </div>
            <Link href="/contact" className="partner-btn partner-btn-primary">
              {t("partner.finalCta")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
