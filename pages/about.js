import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import AuthorCard from "../components/AuthorCard";
import { PORTRAIT } from "../lib/media";
import { useT, useLocale } from "../lib/i18n";
import { ArrowRightIcon } from "../components/Icons";

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
    <div className="oc-site">
      <Head>
        <title>{`${t("about.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About Ministry Lead Hun Chet" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      {/* 1. ONE CHURCH HERO */}
      <SubpageHero
        eyebrow={isKm ? "ថ្នាក់ដឹកនាំ និងកិច្ចការបម្រើព្រះ" : "Ministry Leadership & Calling"}
        title={t("about.title")}
        subtitle={
          isKm
            ? "លោកគ្រូ ហ៊ុន ចិត្ត — អ្នកដឹកនាំកិច្ចការបម្រើព្រះ ការបង្រៀនព្រះបន្ទូល និងការបណ្តុះសិស្សជំនាន់ក្រោយនៅរាជធានីភ្នំពេញ។"
            : "Leader Hun Chet — Ministry Lead, Preacher, and Discipleship Leader in Phnom Penh."
        }
        bgImage="/images/history-sanctuary-worship.jpg"
        stats={STATS.map((s) => ({ num: s.num, label: t(s.key) }))}
      />

      {/* 2. SCRIPTURE ANCHOR & PERSONAL STATEMENT */}
      <section className="bg-[#fcfbf9] border-b border-[#dcdfda] py-16 sm:py-20">
        <div className="oc-section py-0">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="oc-eyebrow">
              {isKm ? "គោលការណ៍គ្រឹះនៃជីវិត" : "Life Motto & Scriptural Anchor"}
            </p>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#141716] leading-snug">
              {isKm
                ? "«ដ្បិត​ឯ​ខ្ញុំ ដែល​ខ្ញុំ​រស់​នៅ នោះ​គឺ​សំរាប់​ព្រះគ្រីស្ទ​ទេ ហើយ​ដែល​ស្លាប់​ទៅ នោះ​ជា​កំរៃ​វិញ»"
                : "“For to me to live is Christ, and to die is gain.”"}
            </blockquote>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#1c5080]">
              — {isKm ? "ភីលីព ១:២១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤" : "Philippians 1:21 • 1954 Khmer Bible"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. MINISTRY CALLING & BIOGRAPHY (2-COL) */}
      <section className="oc-section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="oc-about-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT}
                alt="Leader Hun Chet"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p className="oc-eyebrow">
              {isKm ? "ជីវប្រវត្តិ និងការត្រាស់ហៅ" : "Calling & Biography"}
            </p>
            <h2 className="oc-heading-xl">
              {isKm ? "ការបម្រើព្រះ និងការប្រកាសព្រះបន្ទូល" : "Preaching the Truth with Conviction"}
            </h2>
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.8, margin: 0 }}>
              {description}
            </p>
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.8, margin: 0 }}>
              {t("about.quote")}
            </p>

            <div style={{ paddingTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/articles" className="oc-button oc-solid">
                <span>{isKm ? "អានអត្ថបទ និងទេសនា" : "Read Articles & Sermons"}</span>
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </Link>
              <Link href="/contact" className="oc-button oc-outline-dark">
                <span>{isKm ? "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត" : "Get In Touch"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PULPIT PREACHING & TEACHING FEATURE */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #dcdfda", borderBottom: "1px solid #dcdfda", padding: "4.5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p className="oc-eyebrow">
                {isKm ? "វេទិកាទេសនា និងការបង្រៀន" : "Pulpit Exegesis & Teaching"}
              </p>
              <h2 className="oc-heading-xl">
                {isKm ? "ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះសិស្ស" : "Biblical Exposition & Next-Gen Discipleship"}
              </h2>
              <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.8, margin: 0 }}>
                {isKm
                  ? "ការបម្រើព្រះដោយស្មោះត្រង់ ក្នុងការប្រកាសព្រះបន្ទូល បង្រៀនព្រះគម្ពីរជាប្រព័ន្ធ និងការបណ្តុះបណ្តាលសិស្សានុសិស្ស ដើម្បីពង្រឹងជំនឿដល់អ្នកជឿ និងផ្សាយដំណឹងល្អនៃព្រះគ្រីស្ទ។"
                  : "Faithfully declaring God's Word, systematic biblical exposition, and raising up disciples to strengthen believers and proclaim the Gospel of Jesus Christ in Cambodia."}
              </p>
              <div style={{ paddingTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <Link href="/articles" className="oc-button oc-solid">
                  <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Explore Articles"}</span>
                  <ArrowRightIcon style={{ width: 12, height: 12 }} />
                </Link>
                <Link href="/resource" className="oc-button oc-outline-dark">
                  <span>{isKm ? "ទស្សនាវីដេអូ" : "Watch Videos"}</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="oc-about-pulpit-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pastors-pulpit.jpg"
                  alt="Leader Hun Chet preaching from the pulpit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HISTORICAL JOURNEY TIMELINE (One Church Clean Cards) */}
      <section className="oc-section" style={{ background: "#fcfbf7" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 3.5rem" }}>
            <p className="oc-eyebrow">
              {t("about.lifeStory")}
            </p>
            <h2 className="oc-heading-xl">
              {t("about.road")}
            </h2>
          </div>

          <div className="oc-about-timeline-grid">
            {TIMELINE.map((item) => {
              const title = t(`tl.${item.year}.title`);
              return (
                <article
                  key={item.year}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dcdfda",
                    borderRadius: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "#f4f5f3", borderBottom: "1px solid #dcdfda" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--oc-teal)", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                        {item.year} • {t(`tl.${item.year}.org`)}
                      </span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#141716", margin: "0 0 0.75rem" }}>
                        {title}
                      </h3>
                      <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                        {t(`tl.${item.year}.body`)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CORE THEOLOGICAL VALUES (One Church Numbered Cards) */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #dcdfda", borderBottom: "1px solid #dcdfda", padding: "4.5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 3.5rem" }}>
            <p className="oc-eyebrow">
              {t("about.guides")}
            </p>
            <h2 className="oc-heading-xl">
              {t("about.believe")}
            </h2>
          </div>

          <div className="oc-about-values-grid">
            {VALUES.map((n) => (
              <div
                key={n}
                className="oc-about-value-box"
              >
                <div>
                  <span style={{ fontSize: "11.5px", fontWeight: 800, color: "var(--oc-teal)", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                    0{n} / VALUE
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.18rem", fontWeight: 700, textTransform: "uppercase", color: "#141716", margin: "0 0 0.75rem" }}>
                    {t(`val.${n}.title`)}
                  </h3>
                  <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: 1.7, margin: 0 }}>
                    {t(`val.${n}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AUTHOR CONNECTION & BIO */}
      <section className="oc-section">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="oc-eyebrow">
              {t("about.whoWrites")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141716]">
              {t("about.meet")}
            </h2>
          </div>
          <AuthorCard />
        </div>
      </section>

      {/* 8. ONE CHURCH CONNECT BANNER */}
      <ConnectBanner />

      <SiteFooter />
    </div>
  );
}
