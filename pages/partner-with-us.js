import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
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
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #dcdfda",
        borderRadius: 0,
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--oc-teal)",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          {t(`partner.${region}.label`)}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#141716",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.01em",
          }}
        >
          {t(`partner.${region}.title`)}
        </h3>
        <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 1.75rem" }}>
          {t(`partner.${region}.description`)}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", borderTop: "1px solid #eef0eb", paddingTop: "1.25rem" }}>
          {methods.map((method) => (
            <li key={method} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start", marginBottom: "1rem" }}>
              <span style={{ color: "var(--oc-teal)", marginTop: "3px", flexShrink: 0 }}>
                <CheckIcon />
              </span>
              <span>
                <strong style={{ display: "block", color: "#141716", fontSize: "0.92rem", fontWeight: 700 }}>
                  {t(`partner.${region}.${method}`)}
                </strong>
                <small style={{ color: "#64748b", fontSize: "0.84rem", lineHeight: 1.5 }}>
                  {t(`partner.${region}.${method}Note`)}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={featured ? "oc-button oc-solid" : "oc-button oc-outline-dark"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <span>{t(`partner.${region}.cta`)}</span>
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
    <div className="oc-site">
      <Head>
        <title>{`${t("partner.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("partner.intro")} />
      </Head>

      <SiteHeader />

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/church-family.jpg"
          kicker={isKm ? "ការចូលរួមចំណែកក្នុងព្រះរាជ្យព្រះ" : "KINGDOM STEWARDSHIP"}
          title={t("partner.title")}
          subtitle={
            isKm
              ? "ការរួមចំណែកពង្រីកដំណឹងល្អ ការបង្រៀនព្រះបន្ទូល និងការបម្រើសហគមន៍ក្នុងប្រទេសកម្ពុជា"
              : "Advancing the Gospel, Biblical Teaching, and Christian Outreach Across Cambodia"
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: t("partner.title") },
          ]}
          stats={[
            { number: "Kingdom", label: isKm ? "បេសកកម្មដំណឹងល្អ" : "Gospel Mission" },
            { number: "100%", label: isKm ? "ភាពស្មោះត្រង់ និងតម្លាភាព" : "Faithful Stewardship" },
            { number: "Hun Chet", label: isKm ? "ព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត" : "Ministry Stewardship" },
          ]}
        />

        {/* Why Partner / Impact Pillars */}
        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3rem" }}>
              <span className="oc-eyebrow">{t("partner.impactEyebrow")}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "#141716",
                  margin: "0 0 1rem",
                }}
              >
                {t("partner.impactTitle")}
              </h2>
              <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>
                {t("partner.impactIntro")}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {IMPACT_AREAS.map((area, index) => (
                <article
                  key={area}
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    borderRadius: 0,
                    padding: "2.25rem 2rem",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--oc-teal)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#141716",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {t(`partner.impact.${area}.title`)}
                  </h3>
                  <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                    {t(`partner.impact.${area}.body`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ways to Give Section */}
        <section className="oc-section" style={{ background: "#f4f5f3" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3rem" }}>
              <span className="oc-eyebrow">{t("partner.giveEyebrow")}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "#141716",
                  margin: "0 0 1rem",
                }}
              >
                {t("partner.giveTitle")}
              </h2>
              <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>
                {t("partner.giveIntro")}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
                maxWidth: 1040,
                margin: "0 auto",
              }}
            >
              <GivingCard
                region="cambodia"
                methods={CAMBODIA_METHODS}
                href={TELEGRAM_URL}
                externalLabel="Telegram"
                featured
              />
              <GivingCard
                region="global"
                methods={GLOBAL_METHODS}
                href={MESSENGER_URL}
                externalLabel="Messenger"
              />
            </div>

            {/* Faithful Stewardship Note */}
            <aside
              style={{
                maxWidth: 780,
                margin: "3rem auto 0",
                padding: "1.75rem 2rem",
                background: "#ffffff",
                border: "1px solid #dcdfda",
                borderRadius: 0,
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}
            >
              <div style={{ color: "var(--oc-teal)", marginTop: "3px", flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    color: "#141716",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.35rem",
                  }}
                >
                  {t("partner.safetyTitle")}
                </strong>
                <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: 1.7, margin: 0 }}>
                  {t("partner.safetyBody")}
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Other Ways to Partner */}
        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3rem" }}>
              <span className="oc-eyebrow">{t("partner.otherEyebrow")}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "#141716",
                  margin: "0 0 1rem",
                }}
              >
                {t("partner.otherTitle")}
              </h2>
              <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>
                {t("partner.otherIntro")}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {["pray", "share", "collaborate"].map((way) => (
                <article
                  key={way}
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    borderRadius: 0,
                    padding: "2.25rem 2rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#141716",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {t(`partner.other.${way}.title`)}
                  </h3>
                  <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                    {t(`partner.other.${way}.body`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ONE CHURCH CONNECT BANNER */}
        <ConnectBanner
          kicker={isKm ? "ទំនាក់ទំនងផ្ទាល់" : "GET IN TOUCH"}
          title={t("partner.finalTitle") || "JOIN US IN PRAYER & FELLOWSHIP"}
          subtitle={t("partner.finalBody")}
          contactHref="/contact"
          contactText={t("partner.finalCta") || "CONTACT US"}
          telegramHref={TELEGRAM_URL}
          telegramText="TELEGRAM"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
