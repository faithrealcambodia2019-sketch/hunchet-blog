import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { useT } from "../lib/i18n";
import { LOGO, PORTRAIT, HERO_COVER } from "../lib/media";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";
import {
  BookOpenIcon,
  PlayIcon,
  CloseIcon,
  ArrowRightIcon,
  TelegramIcon,
  UserIcon,
  PhoneIcon,
  FacebookIcon,
  CalendarIcon,
  CheckIcon,
} from "../components/Icons";

const SERMON_KEYS = [
  {
    number: "1",
    ref: "ទំនុកតម្កើង ១១៩:១០៥",
    title: {
      km: "ចាប់ផ្តើមជាមួយព្រះបន្ទូលព្រះ (God's Word First)",
      en: "Start with God's Word First",
      ko: "하나님의 말씀으로 시작하기",
      zh: "以神的话语为起点",
    },
  },
  {
    number: "2",
    ref: "យេរេមា ២៩:១១",
    title: {
      km: "មានក្តីសុបិនធំជាមួយព្រះ (Dream Big with God)",
      en: "Dream Big with God",
      ko: "하나님과 함께 큰 꿈을 꾸기",
      zh: "与神同行，心存盼望",
    },
  },
  {
    number: "3",
    ref: "កូឡូស ៣:២៣",
    title: {
      km: "កសាងចរិតលក្ខណៈតាមរយៈការឧស្សាហ៍ (Build Character Through Diligence)",
      en: "Build Character Through Diligence",
      ko: "성실함으로 인격 세우기",
      zh: "以勤勉塑造基督品格",
    },
  },
  {
    number: "4",
    ref: "សុភាសិត ១៨:២១",
    title: {
      km: "ជ្រើសរើសពាក្យសម្តីដែលពោរពេញដោយជំនឿ (Faith-Filled Words)",
      en: "Choose Faith-Filled Words",
      ko: "믿음이 담긴 말 선택하기",
      zh: "选用满有信心的话语",
    },
  },
  {
    number: "5",
    ref: "ហេព្រើរ ១២:២",
    title: {
      km: "សម្លឹងមើលទៅព្រះយេស៊ូវជានិច្ច (Keep Eyes on Jesus)",
      en: "Keep Your Eyes on Jesus",
      ko: "예수님께 시선을 고정하기",
      zh: "定睛仰望主耶稣",
    },
  },
];

const LIFE_PHOTOS = [
  {
    src: "/images/pastors-pulpit.jpg",
    title: { km: "ការបង្រៀនលើវេទិកា", en: "Pulpit Teaching", ko: "강단 사역", zh: "讲台宣道" },
    badge: { km: "ព្រះបន្ទូល", en: "Preaching", ko: "설교", zh: "讲道" },
    description: { km: "ការចែករំលែកព្រះបន្ទូល និងការពន្យល់ព្រះគម្ពីរយ៉ាងស៊ីជម្រៅ។", en: "Preaching and biblical exegesis.", ko: "말씀 선포", zh: "传讲真道" },
  },
  {
    src: "/images/bible-class-grade12-teaching.jpg",
    title: { km: "ថ្នាក់សិក្សាព្រះគម្ពីរ", en: "Bible Study Class", ko: "성경 공부", zh: "查经研读" },
    badge: { km: "ការបណ្តុះសិស្ស", en: "Discipleship", ko: "제자 양육", zh: "门徒训练" },
    description: { km: "ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សជំនាន់ក្រោយ។", en: "Teaching and discipling the next generation.", ko: "다음 세대 제자 훈련", zh: "培训年轻一代门徒" },
  },
  {
    src: "/images/history-prayer-fellowship.jpg",
    title: { km: "ការអធិស្ឋាន និងការប្រកបគ្នា", en: "Prayer & Fellowship", ko: "기도와 교제", zh: "祷告团契" },
    badge: { km: "ការអធិស្ឋាន", en: "Prayer", ko: "기도", zh: "同心祷告" },
    description: { km: "ពេលនៃការអធិស្ឋាន និងការលើកទឹកចិត្តគ្នាទៅវិញទៅមក។", en: "A time of earnest prayer and mutual encouragement.", ko: "기도와 교제의 시간", zh: "恒切祷告与互勉" },
  },
  {
    src: "/images/youth-fellowship-2025-group.jpg",
    title: { km: "ក្រុមយុវជន និងការរួបរួម", en: "Youth Discipleship", ko: "청년 모임", zh: "青年聚会" },
    badge: { km: "យុវជន", en: "Youth", ko: "청년부", zh: "青年团契" },
    description: { km: "ការកសាងជំនឿ និងការបណ្តុះបណ្តាលយុវជនគ្រីស្ទបរិស័ទ។", en: "Equipping young people in Christ.", ko: "청년들의 믿음 성장", zh: "造就属灵青年" },
  },
];

const BANDS = [
  {
    key: "teaching",
    href: "/articles",
    image: "/images/bible-class-grade12-teaching.jpg",
  },
  {
    key: "ministry",
    href: "/about",
    image: "/images/hun-chet.jpg",
  },
  {
    key: "outreach",
    href: "/library",
    image: "/images/open-bible-morning.jpg",
  },
];

const FEATURES = [
  {
    key: "article",
    href: "/articles",
    image: "/images/bible-class-grade12-teaching.jpg",
  },
  {
    key: "resource",
    href: "/resource",
    image: "/images/worship-service.jpg",
  },
  {
    key: "gallery",
    href: "/gallery",
    image: "/images/history-prayer-fellowship.jpg",
  },
];

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 7 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts = [], error }) {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";
  const isKm = locale === "km";

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const leadPost = posts && posts.length > 0 ? posts[0] : null;
  const secondaryPosts = posts && posts.length > 1 ? posts.slice(1, 4) : [];

  const handleShareTelegram = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/articles`;
    const text = encodeURIComponent(
      `គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ — ប្លុកផ្ទាល់ខ្លួន ហ៊ុន ចិត្ត\n\n` +
      `១. ចាប់ផ្តើមជាមួយព្រះបន្ទូលព្រះ (ទំនុកតម្កើង ១១៩:១០៥)\n` +
      `២. មានក្តីសុបិនធំជាមួយព្រះ (យេរេមា ២៩:១១)\n` +
      `៣. កសាងចរិតលក្ខណៈតាមរយៈការឧស្សាហ៍ (កូឡូស ៣:២៣)\n` +
      `៤. ជ្រើសរើសពាក្យសម្តីដែលពោរពេញដោយជំនឿ (សុភាសិត ១៨:២១)\n` +
      `៥. សម្លឹងមើលទៅព្រះយេស៊ូវជានិច្ច (ហេព្រើរ ១២:២)\n\n` +
      `អានអត្ថបទពេញលេញនៅ៖ ${url}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
  };

  const scriptureData = {
    km: {
      text: "«ចូរទីពឹងលើព្រះយេហូវ៉ាឲ្យអស់អំពីចិត្ត កុំឲ្យពឹងផ្អែកលើការយល់ដឹងរបស់ខ្លួនឡើយ នៅក្នុងគ្រប់ទាំងផ្លូវដែលឯងដើរ ចូរទទួលស្គាល់ទ្រង់ នោះទ្រង់នឹងតម្រង់អស់ទាំងផ្លូវច្រករបស់ឯង»",
      ref: "សុភាសិត ៣:៥-៦",
      tag: "ព្រះបន្ទូលលើកទឹកចិត្តប្រចាំថ្ងៃ",
    },
    en: {
      text: "“Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.”",
      ref: "Proverbs 3:5-6",
      tag: "Daily Scripture Word",
    },
    ko: {
      text: "“너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라”",
      ref: "잠언 3:5-6",
      tag: "오늘의 성경 말씀",
    },
    zh: {
      text: "“你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。”",
      ref: "箴言 3:5-6",
      tag: "今日圣经经文",
    },
  };

  const currentScripture = scriptureData[locale] || scriptureData.km || scriptureData.en;

  const loc = (obj) => {
    if (!obj) return "";
    return obj[locale] || obj.km || obj.en || "";
  };

  return (
    <>
      <Head>
        <title>
          {isKm
            ? "ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន & ការបង្រៀនព្រះបន្ទូល"
            : "Hun Chet — Personal Blog & Biblical Teaching"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "ប្លុកផ្ទាល់ខ្លួនរបស់លោកគ្រូ ហ៊ុន ចិត្ត — ចែករំលែកការបង្រៀនព្រះគម្ពីរ អត្ថបទសញ្ជឹងគិត ដំណើរជីវិត និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនខាងវិញ្ញាណ។"
              : "Personal blog of Leader Hun Chet — sharing biblical exposition, devotional writings, life journey, and spiritual resources."
          }
        />
        <meta
          property="og:title"
          content={
            isKm
              ? "ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន"
              : "Hun Chet — Personal Blog"
          }
        />
        <meta
          property="og:description"
          content={
            isKm
              ? "ការបង្រៀនព្រះគម្ពីរ ការអធិប្បាយ និងធនធានជំនឿ ដោយលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Biblical teaching, devotional reflections, and spiritual resources by Leader Hun Chet."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      {/* 1. EXECUTIVE SPLIT HERO */}
      <section className="hero-editorial">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/open-bible-morning.jpg"
          alt="Hun Chet Personal Blog"
          className="hero-editorial-bg"
        />
        <div className="hero-editorial-scrim" />

        <div className="container" style={{ width: "100%" }}>
          <div className="hero-split-grid">
            {/* Left Column: Author Narrative & Mission */}
            <div className="hero-editorial-content">
              <div className="hero-editorial-eyebrow">
                <span className="hero-eyebrow-dot" />
                <span>
                  {isKm
                    ? "លោកគ្រូ ហ៊ុន ចិត្ត • ប្លុកផ្ទាល់ខ្លួនផ្លូវការ"
                    : "Leader Hun Chet • Official Personal Blog"}
                </span>
              </div>

              <h1 className="hero-editorial-title">
                {isKm ? (
                  <>
                    ចាក់ឬសក្នុងជំនឿ •{" "}
                    <span className="gold-accent">ចែករំលែកសេចក្តីពិតនៃព្រះគ្រីស្ទ</span>
                  </>
                ) : (
                  <>
                    Rooted in Faith.{" "}
                    <span className="gold-accent">Sharing Christ-Centered Truth.</span>
                  </>
                )}
              </h1>

              <p className="hero-editorial-sub">
                {isKm
                  ? "ការបង្រៀនព្រះគម្ពីរ អត្ថបទសញ្ជឹងគិត ដំណើរជីវិត និងការបណ្តុះសិស្ស"
                  : "Biblical Exposition, Pastoral Reflections, Life Lessons & Discipleship"}
              </p>

              <div className="hero-editorial-divider" />

              <p className="hero-editorial-lede">
                {isKm
                  ? "សូមស្វាគមន៍មកកាន់ប្លុកផ្ទាល់ខ្លួនរបស់ខ្ញុំ។ ទីនេះជាកន្លែងកត់ត្រា និងចែករំលែកនូវសេចក្តីពិតនៃព្រះបន្ទូល ការពន្យល់ព្រះគម្ពីរ ការរៀនសូត្រពីជីវិត និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនក្នុងព្រះគ្រីស្ទ។"
                  : "Welcome to my personal blog. A space dedicated to sharing biblical exposition, theological writings, life experiences, and resources for spiritual growth."}
              </p>

              <div className="hero-editorial-actions">
                <Link
                  href="/articles"
                  className="btn btn-primary"
                  style={{
                    padding: "0.85rem 1.85rem",
                    fontSize: "0.9rem",
                    boxShadow: "0 6px 20px rgba(184, 155, 94, 0.4)",
                  }}
                >
                  {isKm ? "អានអត្ថបទទាំងអស់" : "Explore All Articles"} →
                </Link>

                <Link
                  href="/devotions"
                  className="btn btn-gold-glass"
                  style={{ padding: "0.85rem 1.5rem", fontSize: "0.9rem" }}
                >
                  <BookOpenIcon style={{ width: 16, height: 16, marginRight: "0.45rem", color: "var(--gold)" }} />
                  <span>{isKm ? "ព្រះបន្ទូល ៣៦៥ ថ្ងៃ" : "365 Devotions"}</span>
                </Link>

                <Link
                  href="/about"
                  className="btn btn-outline-light"
                  style={{ padding: "0.85rem 1.5rem", fontSize: "0.9rem" }}
                >
                  {isKm ? "អំពីខ្ញុំ" : "About Me"}
                </Link>
              </div>

              <div className="hero-cred-strip">
                <div className="hero-cred-item">
                  <span className="cred-icon">📖</span>
                  <span>{isKm ? "ព្រះគម្ពីរជាគ្រឹះ" : "Scripture First"}</span>
                </div>
                <div className="hero-cred-item">
                  <span className="cred-icon">✍️</span>
                  <span>{isKm ? "អត្ថបទ & ការបង្រៀន" : "Articles & Exegesis"}</span>
                </div>
                <div className="hero-cred-item">
                  <span className="cred-icon">🇰🇭</span>
                  <span>{isKm ? "ធនធានជាភាសាខ្មែរ" : "Khmer Theological Resources"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Author Profile Card */}
            <div>
              <div className="hero-executive-card">
                <div className="hero-exec-avatar-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PORTRAIT}
                    alt="Leader Hun Chet"
                    className="hero-exec-avatar"
                  />
                  <div className="hero-exec-badge-verified" title="Verified Author">
                    <CheckIcon style={{ width: 14, height: 14 }} />
                  </div>
                </div>

                <h3 className="hero-exec-name">
                  {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}
                </h3>

                <span className="hero-exec-role">
                  {isKm ? "អ្នកនិពន្ធ • អ្នកចែករំលែកព្រះបន្ទូល" : "Author & Preacher"}
                </span>

                <p className="hero-exec-bio">
                  {isKm
                    ? "បម្រើការងារជាអ្នកផលិតមាតិកាឌីជីថល (CV) និងដឹកនាំការបង្រៀនព្រះបន្ទូល ការបណ្តុះសិស្ស និងការផ្សាយដំណឹងល្អក្នុងប្រទេសកម្ពុជា។"
                    : "Serving in Christian media content strategy and passionate about biblical preaching, discipleship, and sharing hope."}
                </p>

                <div className="hero-exec-verse">
                  <p>
                    {isKm
                      ? "«ដ្បិតចំពោះខ្ញុំ ការរស់នៅគឺសម្រាប់ព្រះគ្រីស្ទ ហើយការស្លាប់ទៅ នោះជាកម្រៃវិញ»"
                      : "“For to me, to live is Christ and to die is gain.”"}
                  </p>
                  <cite>{isKm ? "— ភីលីព ១:២១" : "— Philippians 1:21"}</cite>
                </div>

                <div className="hero-exec-actions">
                  <a
                    href="https://t.me/+855966875886"
                    target="_blank"
                    rel="noreferrer"
                    className="author-btn btn-telegram"
                    style={{ padding: "0.55rem 1.15rem", fontSize: "0.82rem" }}
                  >
                    <TelegramIcon width="14" height="14" />
                    <span>Telegram</span>
                  </a>
                  <a
                    href="tel:0966875886"
                    className="author-btn btn-phone"
                    style={{ padding: "0.55rem 1.15rem", fontSize: "0.82rem" }}
                  >
                    <PhoneIcon width="14" height="14" />
                    <span>096 687 5886</span>
                  </a>
                </div>

                <div className="hero-exec-seal">
                  <CheckIcon style={{ width: 13, height: 13, color: "var(--gold)" }} />
                  <span>{isKm ? "គេហទំព័រប្លុកផ្ទាល់ខ្លួនផ្លូវការ • hunchet.blog" : "Official Personal Blog • hunchet.blog"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* 2. ILLUMINATED DAILY DEVOTION SCRIPTURE CARD */}
        <section style={{ background: "#ffffff", padding: "3.5rem 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div className="devotion-illuminated-card">
              <span className="devotion-quote-watermark" aria-hidden="true">«</span>

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div className="devotion-badge">
                    <BookOpenIcon />
                    <span>{currentScripture.tag}</span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {isKm ? "ខគម្ពីរលើកទឹកចិត្ត" : "Scripture of the Day"}
                  </span>
                </div>

                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.18rem, 2.6vw, 1.7rem)",
                    lineHeight: 1.65,
                    color: "#ffffff",
                    margin: "0 0 1.5rem",
                    fontWeight: 600,
                  }}
                >
                  {currentScripture.text}
                </blockquote>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <cite style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--gold)", fontStyle: "normal", fontWeight: 700 }}>
                    — {currentScripture.ref}
                  </cite>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={handleShareTelegram}
                      style={{
                        background: "rgba(14, 165, 233, 0.2)",
                        border: "1px solid rgba(14, 165, 233, 0.4)",
                        color: "#38bdf8",
                        padding: "0.55rem 1.15rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <TelegramIcon style={{ width: 14, height: 14 }} />
                      <span>{isKm ? "ចែករំលែកលើ Telegram" : "Share to Telegram"}</span>
                    </button>

                    <Link
                      href="/devotions"
                      className="btn btn-primary"
                      style={{ padding: "0.55rem 1.25rem", fontSize: "0.78rem" }}
                    >
                      <BookOpenIcon style={{ width: 14, height: 14, marginRight: "0.35rem" }} />
                      {isKm ? "អានព្រះបន្ទូល ៣៦៥ ថ្ងៃ" : "Explore 365 Devotions"} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AUTHOR WELCOME & HEART OF THE BLOG */}
        <section className="section" style={{ background: "#ffffff", padding: "5rem 0" }}>
          <div className="container">
            <div className="welcome-editorial-grid">
              {/* Left Column: Authentic Pulpit Ministry Photo Frame */}
              <div>
                <div className="welcome-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/pastors-pulpit.jpg"
                    alt="Leader Hun Chet Pulpit Teaching"
                  />
                  <div className="welcome-photo-badge">
                    <strong>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត លើវេទិកាទេសនា" : "Leader Hun Chet in the Pulpit"}</strong>
                    <span>{isKm ? "ការចែករំលែកព្រះបន្ទូល និងការពន្យល់ព្រះគម្ពីរ" : "Biblical Exegesis & Proclamation"}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mission and Pillars of the Blog */}
              <div>
                <span className="eyebrow" style={{ color: "var(--navy)", borderColor: "var(--gold)", marginBottom: "0.85rem" }}>
                  {isKm ? "សារស្វាគមន៍ពីម្ចាស់ប្លុក" : "Author Welcome & Mission"}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)",
                    color: "var(--navy-dark)",
                    margin: "0 0 1rem",
                    lineHeight: 1.28,
                  }}
                >
                  {isKm
                    ? "ហេតុអ្វីបានជាខ្ញុំបង្កើតប្លុកនេះ?"
                    : "Why I Write and Share This Ministry"}
                </h2>

                <div className="hero-editorial-divider" style={{ margin: "0 0 1.5rem" }} />

                <p style={{ color: "var(--text)", lineHeight: 1.85, fontSize: "1.02rem", marginBottom: "1.25rem" }}>
                  {isKm
                    ? "ខ្ញុំជឿជាក់ថា សេចក្តីជំនឿពិតត្រូវតែចាក់ឬសយ៉ាងរឹងមាំនៅក្នុងព្រះបន្ទូលនៃព្រះគម្ពីរ។ ជនជាតិខ្មែរគ្រប់រូបគួរតែមានឱកាសអាន សិក្សា និងយល់ដឹងនូវគោលលទ្ធិព្រះគម្ពីរយ៉ាងស៊ីជម្រៅជាភាសាកំណើតរបស់ខ្លួន។"
                    : "I believe enduring faith must be anchored in the inspired Word of God. Cambodian believers deserve rich, authentic theological teaching and devotional companions written with depth in their native Khmer language."}
                </p>

                <p style={{ color: "var(--text)", lineHeight: 1.85, fontSize: "1.02rem", marginBottom: "1.75rem" }}>
                  {isKm
                    ? "ប្លុក hunchet.blog នេះ ជាកន្លែងដែលខ្ញុំចែករំលែករាល់អត្ថបទស្រាវជ្រាវ ធម្មទេសនា ព្រះបន្ទូលប្រចាំថ្ងៃ និងសៀវភៅបណ្ណាល័យដោយឥតគិតថ្លៃ ដើម្បីបំពាក់បំប៉នគ្រូគង្វាល និស្សិតព្រះគម្ពីរ និងអ្នកជឿគ្រប់រូប។"
                    : "This blog is freely provided for pastors, seminary students, and everyday believers who desire to grow deeper in Christ and advance the Gospel across our nation."}
                </p>

                {/* 3 Pillars List */}
                <div className="welcome-pillar-grid">
                  <div className="welcome-pillar-card">
                    <strong>📖 {isKm ? "ព្រះគម្ពីរជាគ្រឹះ" : "Scripture First"}</strong>
                    <span>{isKm ? "គ្រប់ការបង្រៀនទាំងអស់ផ្តើមចេញពីព្រះបន្ទូលពិត។" : "Grounded directly in biblical text."}</span>
                  </div>

                  <div className="welcome-pillar-card">
                    <strong>🇰🇭 {isKm ? "សរសេរជាភាសាខ្មែរ" : "Written in Khmer"}</strong>
                    <span>{isKm ? "អត្ថបទ និងសៀវភៅគុណភាពខ្ពស់សម្រាប់ប្រជាជនកម្ពុជា។" : "High-caliber theological literature for Khmer readers."}</span>
                  </div>

                  <div className="welcome-pillar-card">
                    <strong>🎁 {isKm ? "ចែករំលែកដោយឥតគិតថ្លៃ" : "Freely Shared"}</strong>
                    <span>{isKm ? "ផ្តល់ជូនដោយឥតគិតថ្លៃ ដើម្បីកសាងពួកជំនុំ។" : "Freely available to enrich and equip the Church."}</span>
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <Link href="/about" className="btn btn-primary" style={{ padding: "0.75rem 1.65rem", fontSize: "0.88rem" }}>
                    {isKm ? "ស្វែងយល់អំពីរឿងរ៉ាវរបស់ខ្ញុំ" : "Read My Full Testimony"} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURED TEACHING: 5 KEYS TO LIVING IN CHRIST */}
        <section className="sermon-spotlight-box">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.35rem 0.95rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(184, 155, 94, 0.2)",
                  border: "1px solid rgba(184, 155, 94, 0.4)",
                  color: "var(--gold)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                <BookOpenIcon style={{ width: 14, height: 14 }} />
                {isKm
                  ? "សារព្រះបន្ទូលពិសេស • មាគ៌ាឆ្ពោះទៅកាន់គោលបំណងជីវិត"
                  : "Featured Reflection • A Path to Purpose"}
              </span>

              <h2 style={{ fontFamily: "var(--font-display)", color: "#ffffff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
                {isKm
                  ? "គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ"
                  : "5 Keys to Living a Truly Great Life in Christ"}
              </h2>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", color: "#cbd5e1", fontSize: "0.85rem" }}>
                <UserIcon style={{ width: 14, height: 14, color: "var(--gold)" }} />
                <span>{isKm ? "អត្ថបទដោយ៖" : "Written by:"}</span>
                <strong style={{ color: "var(--gold)" }}>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}</strong>
              </div>

              <div className="hero-divider-classic" style={{ margin: "1rem auto 0" }} />
            </div>

            <div className="sermon-spotlight-grid">
              {/* Left: 5 Keys List */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                  }}
                >
                  {isKm ? "គន្លឹះទាំង ៥ យ៉ាងសង្ខេប" : "The 5 Foundational Keys"}
                </h3>

                <div>
                  {SERMON_KEYS.map((k) => (
                    <Link key={k.number} href="/articles" className="sermon-key-item">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <span className="sermon-key-num">{k.number}</span>
                        <div>
                          <strong style={{ display: "block", fontSize: "0.95rem" }}>{loc(k.title)}</strong>
                          <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontFamily: "var(--font-display)" }}>
                            {k.ref}
                          </span>
                        </div>
                      </div>
                      <ArrowRightIcon style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right: Scripture Highlight & Telegram Share */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="sermon-quote-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      Jeremiah 29:11
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      {isKm ? "ខគម្ពីរគោល" : "Foundational Verse"}
                    </span>
                  </div>

                  <blockquote>
                    {isKm
                      ? "«ដ្បិតយើងដឹងពីគំនិតដែលយើងគិតពីឯងរាល់គ្នា គឺសុទ្ធតែជាគំនិតនៃសេចក្តីសុខសាន្ត មិនមែនជាគំនិតនៃសេចក្តីអាក្រក់ឡើយ ដើម្បីឲ្យឯងរាល់គ្នាមានសង្ឃឹមនៅចុងបំផុត»"
                      : "“For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.”"}
                  </blockquote>
                  <cite>— {isKm ? "យេរេមា ២៩:១១" : "Jeremiah 29:11"}</cite>
                </div>

                <div
                  style={{
                    background: "rgba(184, 155, 94, 0.12)",
                    border: "1px solid rgba(184, 155, 94, 0.3)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <strong style={{ fontSize: "0.95rem", color: "#ffffff" }}>
                    {isKm ? "អានអត្ថបទពេញលេញ និងចែករំលែក" : "Read Full Reflection & Share"}
                  </strong>
                  <p style={{ fontSize: "0.82rem", color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                    {isKm
                      ? "ការបកស្រាយលម្អិតតាមព្រះគម្ពីរ ការអនុវត្តជាក់ស្តែង និងសំណួរពិចារណា។"
                      : "Complete with biblical exposition, practical daily applications, and reflection questions."}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                    <Link href="/articles" className="btn btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.75rem" }}>
                      {isKm ? "អានអត្ថបទទាំងអស់" : "Read Articles"} →
                    </Link>
                    <button
                      type="button"
                      onClick={handleShareTelegram}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.6rem 1.1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(14, 165, 233, 0.2)",
                        border: "1px solid rgba(14, 165, 233, 0.4)",
                        color: "#38bdf8",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <TelegramIcon style={{ width: 14, height: 14 }} />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RECENT BLOG POSTS & ARTICLES */}
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.latest")}</span>
              <h2>{t("home.recent")}</h2>
              <p>{t("home.recentSub")}</p>
              <hr className="rule" />
            </div>

            {error && (
              <p className="error">
                {t("common.loadError")} {error}
              </p>
            )}

            {/* Spotlight Lead Post */}
            {leadPost && (
              <Link href={`/posts/${leadPost.slug}`} className="featured-story">
                <div className="featured-story-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getFeaturedImage(leadPost)} alt="" />
                </div>
                <div className="featured-story-body">
                  <div className="featured-badge">
                    {isKm ? "អត្ថបទថ្មីពិសេស" : "Featured Article"}
                  </div>
                  <time className="post-date">{formatDate(leadPost.date)}</time>
                  {getPostCategories(leadPost).length > 0 && (
                    <div className="category-pills" style={{ marginTop: "0.4rem" }}>
                      {getPostCategories(leadPost).map((cat) => (
                        <span key={cat.id} className="category-pill">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: leadPost.title.rendered,
                    }}
                  />
                  <p>{getExcerptText(leadPost)}</p>
                  <span className="read-more">{t("common.readMore")}</span>
                </div>
              </Link>
            )}

            {/* Secondary Posts Grid */}
            {secondaryPosts.length > 0 && (
              <div className="post-grid">
                {secondaryPosts.map((post) => {
                  const image = getFeaturedImage(post);
                  return (
                    <Link key={post.id} href={`/posts/${post.slug}`} className="post-card">
                      <div className="post-thumb-wrap">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={image} alt="" className="post-thumb" />
                        ) : (
                          <div className="post-thumb post-thumb-placeholder">
                            <span>H</span>
                          </div>
                        )}
                      </div>
                      <div className="post-card-body">
                        <time className="post-date">{formatDate(post.date)}</time>
                        {getPostCategories(post).length > 0 && (
                          <div className="category-pills">
                            {getPostCategories(post).map((cat) => (
                              <span key={cat.id} className="category-pill">
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <p className="excerpt">{getExcerptText(post)}</p>
                        <span className="read-more">{t("common.readMore")}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link href="/articles" className="btn btn-primary">
                {t("home.viewAll")} →
              </Link>
            </div>
          </div>
        </section>

        {/* 6. DIGITAL THEOLOGICAL LIBRARY SPOTLIGHT */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ color: "var(--navy)", borderColor: "var(--gold)" }}>
                {t("library.eyebrow")}
              </span>
              <h2>{t("library.title")}</h2>
              <p style={{ maxWidth: 680, margin: "0 auto" }}>
                {t("library.intro")}
              </p>
              <div className="hero-divider-classic" style={{ margin: "1rem auto 0" }} />
            </div>

            <div
              style={{
                maxWidth: 880,
                margin: "0 auto",
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bible-class-grade12-teaching.jpg"
                  alt="Matthew Henry Commentary"
                  style={{
                    width: "100%",
                    borderRadius: "var(--radius)",
                    borderBottom: "3px solid var(--gold)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {isKm ? "សៀវភៅណែនាំពិសេស" : "Featured Study Volume"}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)", fontSize: "1.5rem", margin: "0.5rem 0" }}>
                  {isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី" : "Matthew Henry's Bible Commentary"}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {isKm
                    ? "អត្ថាធិប្បាយសង្ខេបខម្តងមួយៗលើព្រះគម្ពីរទាំងមូល ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល និងអ្នកជឿទាំងអស់ដែលចង់រីកចម្រើនក្នុងព្រះបន្ទូល។"
                    : "The classic verse-by-verse commentary, provided freely for pastors, leaders, and growing believers."}
                </p>

                <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                  <Link href="/library/matthew-henry-commentary" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
                    {isKm ? "អាន និងទាញយក PDF" : "Read & Download PDF"} →
                  </Link>
                  <Link href="/library" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
                    {isKm ? "មើលសៀវភៅទាំងអស់" : "View All Volumes"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. AUTHENTIC LIFE & MINISTRY MOMENTS */}
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ color: "var(--navy)", borderColor: "var(--gold)" }}>
                {t("feat.gallery")}
              </span>
              <h2>{isKm ? "ទិដ្ឋភាពនៃជីវិត និងការបម្រើព្រះ" : "Moments from Life & Ministry"}</h2>
              <p style={{ maxWidth: "640px", margin: "0 auto" }}>
                {isKm
                  ? "រូបភាពពិតនៃការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស យុវជន និងសកម្មភាពព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
                  : "Authentic glimpses of teaching, youth discipleship, and ministry moments with Hun Chet."}
              </p>
              <div className="hero-divider-classic" style={{ margin: "1rem auto 0" }} />
            </div>

            <div className="anc-photo-grid">
              {LIFE_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  className="anc-photo-card"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="anc-photo-thumb-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={loc(photo.title)} loading="lazy" />
                    <span className="anc-photo-badge">{loc(photo.badge)}</span>
                    <div className="anc-photo-title-bar">
                      <span className="anc-photo-title">{loc(photo.title)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/gallery" className="btn btn-primary">
                {isKm ? "ចូលមើលកម្រងរូបភាពទាំងអស់" : "Explore Photo Gallery"} →
              </Link>
            </div>
          </div>
        </section>

        {/* 8. DIRECT AUTHOR CONNECT BANNER */}
        <section className="anc-partnership-banner">
          <div className="container">
            <div className="anc-partnership-inner">
              <div style={{ maxWidth: "620px" }}>
                <span
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {isKm ? "ភ្ជាប់ទំនាក់ទំនងផ្ទាល់" : "Direct Connection"}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    color: "#ffffff",
                    margin: "0 0 1rem",
                  }}
                >
                  {isKm
                    ? "មានសំណួរ ឬចង់ឱ្យអធិស្ឋានជូន?"
                    : "Have Questions or Prayer Requests?"}
                </h2>

                <p style={{ color: "#cbd5e1", lineHeight: 1.7, margin: 0, fontSize: "1rem" }}>
                  {isKm
                    ? "លោកគ្រូ ហ៊ុន ចិត្ត រីករាយនឹងឆ្លើយតប និងអធិស្ឋានជូនបងប្អូនទាំងអស់គ្នា។ អ្នកអាចទាក់ទងមកខ្ញុំដោយផ្ទាល់តាមរយៈទូរស័ព្ទ Telegram ឬផ្ញើសារតាម Facebook។"
                    : "I would be honored to pray for you, answer your biblical questions, or connect with you directly via Telegram, Facebook, or phone."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flexShrink: 0 }}>
                <a
                  href="https://t.me/+855966875886"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <TelegramIcon style={{ width: 14, height: 14 }} />
                  <span>Telegram</span>
                </a>

                <a
                  href="tel:0966875886"
                  className="btn btn-gold-glass"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <PhoneIcon width="14" height="14" />
                  <span>096 687 5886</span>
                </a>

                <Link href="/contact" className="btn btn-outline-light">
                  {t("nav.contact")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="anc-modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="anc-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="anc-modal-close"
              aria-label="Close photo preview"
            >
              <CloseIcon />
            </button>

            <div className="anc-lightbox-content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedPhoto.src} alt={loc(selectedPhoto.title)} />
            </div>

            <div className="anc-lightbox-info">
              <span
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.6rem",
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                {loc(selectedPhoto.badge)}
              </span>
              <h3>{loc(selectedPhoto.title)}</h3>
              <p>{loc(selectedPhoto.description)}</p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
