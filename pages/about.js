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
        <title>{`${t("about.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About Ministry Lead Hun Chet" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/history-sanctuary-worship.jpg"
          alt="Hun Chet Ministry Sanctuary"
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
              ? "លោកគ្រូ ហ៊ុន ចិត្ត — អ្នកដឹកនាំកិច្ចការបម្រើព្រះ និងការបង្រៀនព្រះបន្ទូល"
              : "Leader Hun Chet — Ministry Lead & Preacher"}
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
                ? "«ដ្បិត​ឯ​ខ្ញុំ ដែល​ខ្ញុំ​រស់​នៅ នោះ​គឺ​សំរាប់​ព្រះគ្រីស្ទ​ទេ ហើយ​ដែល​ស្លាប់​ទៅ នោះ​ជា​កំរៃ​វិញ»"
                : "“For to me to live is Christ, and to die is gain.”"}
            </p>
            <span className="reading-scripture-ref">
              {isKm ? "ភីលីព ១:២១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤" : "Philippians 1:21 • 1954 Khmer Bible"}
            </span>
          </div>
        </div>
      </section>

      {/* Preaching Ministry & Biblical Exposition */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="eyebrow">{isKm ? "វេទិកាទេសនា និងការបង្រៀន" : "Preaching & Teaching Ministry"}</span>
            <h2>{isKm ? "កិច្ចការបម្រើព្រះ និងការប្រកាសព្រះបន្ទូល" : "Preaching the Truth with Conviction"}</h2>
            <hr className="rule" />
          </div>

          <div className="about-pulpit-spotlight">
            <div className="about-pulpit-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Leader Hun Chet preaching from the pulpit"
              />
            </div>
            <div className="about-pulpit-body">
              <span className="article-spotlight-tag">
                {isKm ? "វេទិកាទេសនា និងការបង្រៀន" : "Pulpit Exegesis & Teaching"}
              </span>
              <h3>
                {isKm
                  ? "ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះសិស្ស"
                  : "Biblical Exposition & Next-Gen Discipleship"}
              </h3>
              <p>
                {isKm
                  ? "ការបម្រើព្រះដោយស្មោះត្រង់ ក្នុងការប្រកាសព្រះបន្ទូល បង្រៀនព្រះគម្ពីរជាប្រព័ន្ធ និងការបណ្តុះបណ្តាលសិស្សានុសិស្ស ដើម្បីពង្រឹងជំនឿដល់អ្នកជឿ និងផ្សាយដំណឹងល្អនៃព្រះគ្រីស្ទ។"
                  : "Faithfully declaring God's Word, systematic biblical exposition, and raising up disciples to strengthen believers and proclaim the Gospel of Jesus Christ."}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                <Link href="/articles" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
                  {isKm ? "អានអត្ថបទ និងទេសនា" : "Read Articles & Sermons"} →
                </Link>
                <Link href="/resource" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
                  {isKm ? "ទស្សនាវីដេអូ" : "Watch Videos"}
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
