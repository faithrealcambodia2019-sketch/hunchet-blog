import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { MEDIA, PORTRAIT } from "../lib/media";
import { useT } from "../lib/i18n";

const TIMELINE = [
  { year: "2013", image: `${MEDIA}/3e318-480881109_1312891476600123_6738146868473818701_n.jpg` },
  { year: "2019", image: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg` },
  { year: "2021", image: `${MEDIA}/a631c-481577673_1321022952453642_5665127949675965574_n.jpg` },
  { year: "2024", image: `${MEDIA}/cddf7-481059789_1321611435728127_993577711556320171_n.jpg` },
  { year: "2025", image: `${MEDIA}/bb8f0-img_0633.jpeg` },
];

const VALUES = ["1", "2", "3", "4"];

const STATS = [
  { num: "12+", key: "about.stat1" },
  { num: "5", key: "about.stat2" },
  { num: "2", key: "about.stat3" },
];

export default function About() {
  const t = useT();
  const description = t("about.intro");

  return (
    <>
      <Head>
        <title>{`${t("about.title")} — Hun Chet`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About Hun Chet" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h1>{t("about.title")}</h1>
          <p>{t("about.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-portrait-wrap">
            <div className="story-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PORTRAIT} alt="Hun Chet" />
            </div>
          </div>

          <div className="story-lede">
            <p>{t("about.quote")}</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
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

      <section className="section section-navy">
        <div className="container">
          <div className="stat-row">
            {STATS.map((s) => (
              <div key={s.key}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{t(s.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section section-alt">
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
