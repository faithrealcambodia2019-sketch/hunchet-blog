import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { PORTRAIT } from "../lib/media";
import { useT, useLocale } from "../lib/i18n";

const TIMELINE = [
  { year: "2013", image: "/images/history-school-community.jpg" },
  { year: "2019", image: "/images/history-prayer-fellowship.jpg" },
  { year: "2021", image: "/images/youth-fellowship-2025-group.jpg" },
  { year: "2024", image: "/images/history-sanctuary-worship.jpg" },
  { year: "2025", image: "/images/pastors-pulpit.jpg" },
];

const VALUES = ["1", "2", "3", "4"];

const STATS = [
  { num: "12+", key: "about.stat1" },
  { num: "5", key: "about.stat2" },
  { num: "2", key: "about.stat3" },
];

export default function About() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";
  const description = t("about.intro");

  return (
    <>
      <Head>
        <title>{`${t("about.title")} — All Nations Church & Hun Chet`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About Ministry Lead Hun Chet — All Nations Church" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/history-sanctuary-worship.jpg"
          alt="All Nations Church Sanctuary"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "ថ្នាក់ដឹកនាំ និងកិច្ចការបម្រើព្រះ" : "Ministry Leadership & Calling"}</span>
          </div>
          <h1 className="sanctuary-hero-title">{t("about.title")}</h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "លោកគ្រូ ហ៊ុន ចិត្ត — អ្នកដឹកនាំកិច្ចការបម្រើព្រះ ក្រុមជំនុំគ្រប់ប្រជាជាតិ"
              : "Leader Hun Chet — Ministry Lead & Preacher at All Nations Church"}
          </p>
          <p className="sanctuary-hero-lead">{description}</p>

          <div className="sanctuary-stat-strip">
            {STATS.map((s) => (
              <div className="sanctuary-stat-card" key={s.key}>
                <span className="sanctuary-stat-num">{s.num}</span>
                <span className="sanctuary-stat-label">{t(s.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Calling & Formal Portrait */}
      <section className="section">
        <div className="container">
          <div className="story-portrait-wrap">
            <div className="story-portrait" style={{ width: 180, height: 180, border: "4px solid var(--gold)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PORTRAIT} alt="Leader Hun Chet" />
            </div>
          </div>

          <div className="story-lede" style={{ maxWidth: 760, margin: "0 auto" }}>
            <p>{t("about.quote")}</p>
          </div>

          <div className="reading-scripture-box" style={{ maxWidth: 760, margin: "2.5rem auto 0" }}>
            <p>
              {isKm
                ? "«ដ្បិតចំពោះខ្ញុំ ការរស់នៅគឺសម្រាប់ព្រះគ្រីស្ទ ហើយការស្លាប់ទៅ នោះជាកម្រៃវិញ»"
                : "“For to me, to live is Christ and to die is gain.”"}
            </p>
            <span className="reading-scripture-ref">
              {isKm ? "ភីលីព ១:២១" : "Philippians 1:21"}
            </span>
          </div>
        </div>
      </section>

      {/* Pulpit Ministry & Senior Pastor Partnership */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="eyebrow">{isKm ? "វេទិកាទេសនា និងកិច្ចការគង្វាល" : "Pulpit & Pastoral Ministry"}</span>
            <h2>{isKm ? "កិច្ចការបម្រើព្រះរួមគ្នានៅលើវេទិកាទេសនា" : "Joint Pulpit Leadership at All Nations Church"}</h2>
            <hr className="rule" />
          </div>

          <div className="about-pulpit-spotlight">
            <div className="about-pulpit-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Pastor Kim Jong Ho and Leader Hun Chet preaching"
              />
            </div>
            <div className="about-pulpit-body">
              <span className="article-spotlight-tag">
                {isKm ? "ក្រុមជំនុំគ្រប់ប្រជាជាតិ" : "All Nations Church Pulpit"}
              </span>
              <h3>
                {isKm
                  ? "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត"
                  : "Senior Pastor Kim Jong Ho & Leader Hun Chet"}
              </h3>
              <p>
                {isKm
                  ? "ការបម្រើព្រះរួមគ្នាដោយស្មោះត្រង់ ក្នុងការប្រកាសព្រះបន្ទូល បង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សានុសិស្ស ដើម្បីពង្រឹងក្រុមជំនុំក្នុងរាជធានីភ្នំពេញ និងផ្សាយដំណឹងល្អទៅកាន់គ្រប់ប្រជាជាតិ។"
                  : "Faithfully ministering side-by-side in declaring God's Word, systematic biblical exposition, and raising up disciples to strengthen the local body in Phnom Penh and reach all nations."}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                <Link href="/contact" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
                  {isKm ? "ចូលរួមថ្វាយបង្គំ" : "Join Sunday Service"}
                </Link>
                <Link href="/resource" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
                  {isKm ? "ទស្សនាការបង្រៀន" : "Watch Sermons"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Journey Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("about.lifeStory")}</span>
            <h2>{t("about.road")}</h2>
            <hr className="rule" />
          </div>

          <div className="timeline">
            {TIMELINE.map((item) => {
              const title = t(`tl.${item.year}.title`);
              return (
                <div className="tl-item" key={item.year}>
                  <span className="tl-year">{item.year}</span>
                  <h3>{title}</h3>
                  <span className="tl-org">{t(`tl.${item.year}.org`)}</span>
                  <p>{t(`tl.${item.year}.body`)}</p>
                  <div className="tl-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={title} loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Theological Beliefs & Values */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("about.guides")}</span>
            <h2>{t("about.believe")}</h2>
            <hr className="rule" />
          </div>

          <div className="value-grid">
            {VALUES.map((n) => (
              <div className="value-card" key={n}>
                <h3>{t(`val.${n}.title`)}</h3>
                <p>{t(`val.${n}.body`)}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/gallery" className="btn btn-primary">
              {t("about.seeGallery")}
            </Link>
          </div>
        </div>
      </section>

      {/* Canonical Author Connection */}
      <section className="section">
        <div className="container-narrow">
          <div className="section-head">
            <span className="eyebrow">{t("about.whoWrites")}</span>
            <h2>{t("about.meet")}</h2>
            <hr className="rule" />
          </div>
          <AuthorCard />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
