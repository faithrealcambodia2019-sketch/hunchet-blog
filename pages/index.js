import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";
import { LOGO } from "../lib/media";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const HERO_IMAGE = `${MEDIA}/bb8f0-img_0633.jpeg`;

const BANDS = [
  {
    key: "ministry",
    image: `${MEDIA}/5d72f-img_0564.jpeg`,
    href: "/gallery",
    badge: "Church Ministry",
  },
  {
    key: "teaching",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
    badge: "Biblical Devotionals",
  },
  {
    key: "outreach",
    image: `${MEDIA}/4262e-img_20251226_130309_154.jpeg`,
    href: "/about",
    badge: "Digital Outreach",
  },
];

const FEATURES = [
  { key: "gallery", image: `${MEDIA}/9fe4e-img_0972.jpeg`, href: "/gallery" },
  { key: "resource", image: `${MEDIA}/6ff1d-img_0266.jpeg`, href: "/resource" },
  { key: "article", image: `${MEDIA}/66666-img_0549.jpeg`, href: "/articles" },
];

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 4 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts = [], error }) {
  const router = useRouter();
  const t = useT();
  const description = t("home.sub");
  const locale = router.locale || "en";

  const leadPost = posts && posts.length > 0 ? posts[0] : null;
  const secondaryPosts = posts && posts.length > 1 ? posts.slice(1, 4) : [];

  const scriptureData = {
    km: {
      text: "«ចូរទីពឹងលើព្រះយេហូវ៉ាឲ្យអស់អំពីចិត្ត កុំឲ្យពឹងផ្អែកលើការយល់ដឹងរបស់ខ្លួនឡើយ នៅក្នុងគ្រប់ទាំងផ្លូវដែលឯងដើរ ចូរទទួលស្គាល់ទ្រង់ នោះទ្រង់នឹងតម្រង់អស់ទាំងផ្លូវច្រករបស់ឯង»",
      ref: "សុភាសិត ៣:៥-៦",
      tag: "ព្រះបន្ទូលលើកទឹកចិត្ត",
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

  const currentScripture = scriptureData[locale] || scriptureData.en;

  return (
    <>
      <Head>
        <title>Hun Chet — Faith, Scripture &amp; Ministry</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Hun Chet — Faith &amp; Ministry" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={HERO_IMAGE} />
      </Head>

      <SiteHeader />

      {/* World-Class Modern Editorial Hero */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="Hun Chet Faith & Ministry" className="hero-img" />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-pulse-dot" />
            <span>Faith • Scripture • Hope in Cambodia</span>
          </div>

          <h1>{t("home.title")}</h1>
          <p className="hero-sub">{t("home.sub")}</p>

          <div className="hero-actions">
            <Link href="/articles" className="btn btn-light">
              {t("home.readArticles")} →
            </Link>
            <Link href="/about" className="btn btn-outline-light">
              {t("home.aboutUs")}
            </Link>
          </div>

          {/* Quick Impact / Highlight Badges */}
          <div className="hero-highlights">
            <div className="hero-highlight-pill">
              <span className="hero-highlight-icon">📖</span>
              <div>
                <strong>{locale === "km" ? "អត្ថបទ និងការបង្រៀន" : "Biblical Teaching"}</strong>
                <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                  {locale === "km" ? "ជាភាសាខ្មែរ និងអង់គ្លេស" : "Scripture & Devotionals"}
                </div>
              </div>
            </div>

            <div className="hero-highlight-pill">
              <span className="hero-highlight-icon">⛪</span>
              <div>
                <strong>{locale === "km" ? "ក្រុមជំនុំ All Nations" : "All Nations Church"}</strong>
                <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                  {locale === "km" ? "រាជធានីភ្នំពេញ" : "Phnom Penh, Cambodia"}
                </div>
              </div>
            </div>

            <div className="hero-highlight-pill">
              <span className="hero-highlight-icon">🎥</span>
              <div>
                <strong>{locale === "km" ? "ព័ន្ធកិច្ចឌីជីថល" : "Digital Outreach"}</strong>
                <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                  {locale === "km" ? "វីដេអូ និងប្រព័ន្ធផ្សព្វផ្សាយ" : "Video & Media Ministry"}
                </div>
              </div>
            </div>

            <div className="hero-highlight-pill">
              <span className="hero-highlight-icon">🤝</span>
              <div>
                <strong>{locale === "km" ? "ចូលរួមជាដៃគូ" : "Partner With Us"}</strong>
                <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                  {locale === "km" ? "កសាងសហគមន៍ជំនឿ" : "Building the Kingdom"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Floating Scripture Banner */}
        <div className="container" style={{ position: "relative" }}>
          <div className="scripture-banner">
            <span className="scripture-banner-tag">
              <span>✦</span> {currentScripture.tag}
            </span>
            <blockquote>{currentScripture.text}</blockquote>
            <cite>{currentScripture.ref}</cite>
          </div>
        </div>

        {/* Section 1: Featured & Recent Articles (Magazine Spotlight) */}
        <section className="section section-alt" style={{ paddingTop: "2rem" }}>
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
                  <img
                    src={getFeaturedImage(leadPost)}
                    alt=""
                  />
                </div>
                <div className="featured-story-body">
                  <div className="featured-badge">
                    <span>★</span> {locale === "km" ? "អត្ថបទពិសេស" : "Featured Reflection"}
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
                  <span className="read-more">
                    {t("common.readMore")}
                  </span>
                </div>
              </Link>
            )}

            {/* Secondary Posts Grid */}
            {secondaryPosts.length > 0 && (
              <div className="post-grid">
                {secondaryPosts.map((post) => {
                  const image = getFeaturedImage(post);
                  return (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      className="post-card"
                    >
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

        {/* Section 2: Ministry Focus / What We Do (Modern 3 Pillars) */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.whatWeDo")}</span>
              <h2>{t("home.whatWeDoTitle")}</h2>
              <hr className="rule" />
            </div>

            <div className="pillars-grid">
              {BANDS.map((band) => (
                <Link key={band.key} href={band.href} className="pillar-card">
                  <div className="pillar-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={band.image} alt="" />
                    <span className="pillar-badge">{t(`band.${band.key}`)}</span>
                  </div>
                  <div className="pillar-body">
                    <h3>{t(`band.${band.key}Title`)}</h3>
                    <p>{t(`band.${band.key}Body`)}</p>
                    <span className="pillar-link">
                      {t(`band.${band.key}Cta`)} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Explore Multimedia & Resources */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.explore")}</span>
              <h2>{t("home.exploreTitle")}</h2>
              <hr className="rule" />
            </div>

            <div className="feature-grid">
              {FEATURES.map((f) => (
                <Link key={f.href} href={f.href} className="feature-card">
                  <div className="feature-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt="" />
                  </div>
                  <div className="feature-card-body">
                    <h3>{t(`feat.${f.key}`)}</h3>
                    <p>{t(`feat.${f.key}Desc`)}</p>
                    <span className="feature-card-link">
                      {t("common.explore")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Personal Welcome & Direct Connect Banner */}
        <section className="section" style={{ paddingBottom: "7rem" }}>
          <div className="container">
            <div className="connect-banner">
              <div className="connect-banner-inner">
                <div className="connect-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO} alt="Hun Chet" />
                </div>
                <div>
                  <span className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.5rem" }}>
                    {t("home.connect")}
                  </span>
                  <h2>{t("home.connectTitle")}</h2>
                  <p>{t("home.connectSub")}</p>
                </div>
                <div className="connect-channels">
                  <a
                    href="https://t.me/+855966875886"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-btn primary"
                  >
                    💬 Telegram
                  </a>
                  <a
                    href="https://www.facebook.com/hunchet2024/"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-btn"
                  >
                    📘 Facebook
                  </a>
                  <Link href="/contact" className="channel-btn">
                    💌 {t("home.getInTouch")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
