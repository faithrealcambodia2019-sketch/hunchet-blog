import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";
import { PORTRAIT } from "../lib/media";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  formatDate,
} from "../lib/wordpress";
import {
  BookOpenIcon,
  CloseIcon,
  ArrowRightIcon,
  TelegramIcon,
  UserIcon,
  PhoneIcon,
} from "../components/Icons";
import { BOOKS } from "../lib/books";
import RealBookCover from "../components/RealBookCover";

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
    description: { km: "ការចែករំលែកព្រះបន្ទូល និងការពន្យល់ព្រះគម្ពីរយ៉ាងស៊ីជម្រៅ ដោយលោកគ្រូ គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត។", en: "Preaching and biblical exegesis with Pastor Kim Jong Ho and Leader Hun Chet.", ko: "김종호 목사와 훈 쳇 리더의 강단 사역", zh: "传讲真道" },
  },
  {
    src: "/images/bible-class-grade12-teaching.jpg",
    title: { km: "ថ្នាក់សិក្សាព្រះគម្ពីរ", en: "Bible Study Class", ko: "성경 공부", zh: "查经研读" },
    badge: { km: "ការបណ្តុះសិស្ស", en: "Discipleship", ko: "제자 양육", zh: "门徒训练" },
    description: { km: "ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សជំនាន់ក្រោយ។", en: "Teaching and discipling the next generation in God's truth.", ko: "다음 세대 제자 훈련", zh: "培训年轻一代门徒" },
  },
  {
    src: "/images/history-prayer-fellowship.jpg",
    title: { km: "ការអធិស្ឋាន និងការប្រកបគ្នា", en: "Prayer & Fellowship", ko: "기도와 교제", zh: "祷告团契" },
    badge: { km: "ការអធិស្ឋាន", en: "Prayer", ko: "기도", zh: "同心祷告" },
    description: { km: "ពេលនៃការអធិស្ឋាន និងការលើកទឹកចិត្តគ្នាទៅវិញទៅមកក្នុងព្រះគ្រីស្ទ។", en: "Earnest prayer, mutual encouragement, and spiritual fellowship in Christ.", ko: "기도와 교제의 시간", zh: "恒切祷告与互勉" },
  },
  {
    src: "/images/youth-fellowship-2025-group.jpg",
    title: { km: "ក្រុមយុវជន និងការរួបរួម", en: "Youth Discipleship", ko: "청년 모임", zh: "青年聚会" },
    badge: { km: "យុវជន", en: "Youth", ko: "청년부", zh: "青年团契" },
    description: { km: "ការកសាងជំនឿ និងការបណ្តុះបណ្តាលយុវជនគ្រីស្ទបរិស័ទសម្រាប់អនាគត។", en: "Equipping young people in Christ for Cambodia's future.", ko: "청년들의 믿음 성장", zh: "造就属灵青年" },
  },
];

export async function getStaticProps() {
  try {
    const sourcePosts = await getPosts({ perPage: 3 });
    // Only send the fields needed by homepage cards to the browser.
    const posts = sourcePosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      date: post.date,
      title: post.title,
      image: getFeaturedImage(post),
      summary: getExcerptText(post),
    }));
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
  const handleShareTelegram = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/articles`;
    const text = encodeURIComponent(
      `គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ — ប្លុកផ្ទាល់ខ្លួន លោកគ្រូ ហ៊ុន ចិត្ត\n\n` +
      `១. ចាប់ផ្តើមជាមួយព្រះបន្ទូលព្រះ (ទំនុកតម្កើង ១១៩:១០៥ • ព្រះគម្ពីរខ្មែរ ១៩៥៤)\n` +
      `២. មានក្តីសុបិនធំជាមួយព្រះ (យេរេមា ២៩:១១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤)\n` +
      `៣. កសាងចរិតលក្ខណៈតាមរយៈការឧស្សាហ៍ (កូឡូស ៣:២៣ • ព្រះគម្ពីរខ្មែរ ១៩៥៤)\n` +
      `៤. ជ្រើសរើសពាក្យសម្តីដែលពោរពេញដោយជំនឿ (សុភាសិត ១៨:២១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤)\n` +
      `៥. សម្លឹងមើលទៅព្រះយេស៊ូវជានិច្ច (ហេព្រើរ ១២:២ • ព្រះគម្ពីរខ្មែរ ១៩៥៤)\n\n` +
      `អានអត្ថបទពេញលេញនៅ៖ ${url}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
  };

  const scriptureData = {
    km: {
      text: "«ចូរ​ទីពឹង​ដល់​ព្រះយេហូវ៉ា​ឲ្យ​អស់​អំពី​ចិត្ត កុំ​ឲ្យ​ពឹងផ្អែក​លើ​យោបល់​របស់​ខ្លួន​ឡើយ ត្រូវ​ឲ្យ​ទទួល​ស្គាល់​ទ្រង់​នៅ​គ្រប់​ទាំង​ផ្លូវ​ឯង នោះ​ទ្រង់​នឹង​តំរង់​អស់​ទាំង​ផ្លូវ​ច្រក​របស់​ឯង»",
      ref: "សុភាសិត ៣:៥-៦ • ព្រះគម្ពីរខ្មែរ ១៩៥៤",
      tag: "ខគម្ពីរលើកទឹកចិត្តប្រចាំថ្ងៃ • ព្រះបន្ទូលព្រះ",
    },
    en: {
      text: "“Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.”",
      ref: "Proverbs 3:5-6 • 1954 Khmer Bible",
      tag: "Today's Devotion • Daily Bread",
    },
    ko: {
      text: "“너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라”",
      ref: "잠언 3:5-6 • 1954 크메르 성경",
      tag: "오늘의 말씀 • 영의 양식",
    },
    zh: {
      text: "“你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。”",
      ref: "箴言 3:5-6 • 1954 柬埔寨语圣经",
      tag: "今日经文 • 生命灵粮",
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
            ? "លោកគ្រូ ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន & ការបង្រៀនព្រះបន្ទូល"
            : "Leader Hun Chet — Personal Blog & Biblical Teaching"}
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
              ? "លោកគ្រូ ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន"
              : "Leader Hun Chet — Personal Blog"
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

      <a className="skip-link" href="#main-content">{isKm ? "ចូលទៅមាតិកា" : "Skip to content"}</a>
      <section className="professional-hero" aria-labelledby="hero-title">
        <div className="container professional-hero-grid">
          <div className="professional-hero-copy">
            <span className="professional-eyebrow">{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត • ជំនឿ និងជីវិត" : "HUN CHET · FAITH & LIFE"}</span>
            <h1 id="hero-title">{isKm ? "ចាក់ឬសក្នុងព្រះបន្ទូល" : "Rooted in Scripture. Growing in faith."}</h1>
            <p className="professional-hero-subtitle">{isKm ? "រស់នៅដើម្បីសិរីល្អនៃព្រះគ្រីស្ទ" : "Living for the glory of Christ."}</p>
            <p className="professional-hero-description">{isKm
              ? "សូមស្វាគមន៍។ ខ្ញុំបាទ ហ៊ុន ចិត្ត ចែករំលែកការបង្រៀនព្រះគម្ពីរ អត្ថបទសញ្ជឹងគិត និងធនធានជាភាសាខ្មែរ ដើម្បីជួយបងប្អូនរីកចម្រើនក្នុងជំនឿ និងការរស់នៅប្រចាំថ្ងៃ។"
              : "Welcome. I’m Hun Chet. Explore biblical teaching, thoughtful reflections, and free Khmer resources to help you grow in faith and everyday life."}</p>
            <div className="professional-hero-actions">
              <Link href="/articles" className="anc-btn-navy">{isKm ? "អានអត្ថបទ" : "Explore the articles"}<ArrowRightIcon style={{width:16,height:16}} /></Link>
              <Link href="/devotions" className="professional-text-link"><BookOpenIcon style={{width:18,height:18}} />{isKm ? "ព្រះបន្ទូលប្រចាំថ្ងៃ" : "Daily devotions"}</Link>
            </div>
            <div className="professional-hero-note">{isKm ? "ការបង្រៀនព្រះគម្ពីរ · ការបណ្តុះសិស្ស · ធនធានឥតគិតថ្លៃ" : "Biblical teaching · Discipleship · Free resources"}</div>
          </div>
          <figure className="professional-portrait">
            <img src={PORTRAIT} alt={isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"} fetchPriority="high" width="600" height="720" />
            <figcaption><span>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}</span><Link href="/about">{isKm ? "ស្វែងយល់អំពីខ្ញុំ" : "About my journey"} <span aria-hidden="true">↗</span></Link></figcaption>
          </figure>
        </div>
      </section>

      <main id="main-content" tabIndex={-1}>
        {/* 2. DAILY SCRIPTURE SPOTLIGHT STRIPE (All Nations Church Signature Devotion Banner) */}
        <section className="anc-scripture-stripe">
          <div
            className="anc-scripture-stripe-bg"
            style={{ backgroundImage: "url('/images/worship-service.jpg')" }}
          />

          <div className="anc-scripture-stripe-inner">
            <div className="anc-scripture-stripe-left">
              <div className="anc-scripture-pill">
                <BookOpenIcon style={{ width: 14, height: 14 }} />
                <span>{currentScripture.tag}</span>
              </div>

              <blockquote className="anc-scripture-quote">
                {currentScripture.text}
              </blockquote>

              <cite className="anc-scripture-ref">
                — {currentScripture.ref}
              </cite>
            </div>

            <div className="anc-scripture-stripe-right">
              <button
                type="button"
                onClick={handleShareTelegram}
                className="anc-btn-glass"
                style={{ padding: "0.75rem 1.25rem", fontSize: "0.75rem" }}
              >
                <TelegramIcon style={{ width: 14, height: 14, marginRight: "0.45rem", color: "#38bdf8" }} />
                <span>Telegram</span>
              </button>

              <Link
                href="/devotions"
                className="anc-btn-gold"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.75rem" }}
              >
                <span>{isKm ? "អានព្រះបន្ទូល ៣៦៥ ថ្ងៃ" : "Read Daily Devotion"}</span>
                <ArrowRightIcon style={{ width: 14, height: 14, marginLeft: "0.45rem" }} />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. RECENT ARTICLES & TEACHINGS — Classic Editorial Grid (Ministries Style) */}
        <section className="anc-articles-wrap">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3.5rem" }}>
              <span className="anc-kicker-gray">
                {isKm ? "អត្ថបទ និងការបង្រៀនថ្មីៗ" : "Latest Articles & Teachings"}
              </span>
              <h2 className="anc-title-serif">
                {isKm ? "អត្ថបទសញ្ជឹងគិត & ការបង្រៀនព្រះបន្ទូល" : "Reflections & Biblical Teaching"}
              </h2>
              <div className="anc-gold-bar" style={{ margin: "1rem auto 1.5rem" }} />
              <p style={{ color: "#475569", fontSize: "1.02rem", margin: 0 }}>
                {isKm
                  ? "ស្វែងរកអត្ថបទថ្មីៗស្តីពីការបង្រៀនព្រះគម្ពីរ ជីវិតគ្រីស្ទបរិស័ទ ភាពជាអ្នកដឹកនាំ និងការលូតលាស់ខាងវិញ្ញាណ។"
                  : "Explore articles on biblical exposition, Christian discipleship, leadership, and spiritual growth."}
              </p>
            </div>

            {error && (
              <p className="error" style={{ textAlign: "center", color: "#dc2626" }}>
                {t("common.loadError")}
              </p>
            )}

            {/* Posts Grid (3-column ministries style) */}
            {posts && posts.length > 0 && (
              <div className="anc-articles-grid">
                {posts.slice(0, 3).map((post) => {
                  const image = post.image;
                  return (
                    <Link key={post.id} href={`/posts/${post.slug}`} className="anc-art-card">
                      <div className="anc-art-thumb">
                        {image ? (
                          <img src={image} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontSize: "2rem", fontWeight: 700 }}>
                            H
                          </div>
                        )}
                      </div>
                      <span className="anc-art-date">{formatDate(post.date)}</span>
                      <h3
                        className="anc-art-title"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                      <p className="anc-art-excerpt">{post.summary}</p>
                      <span className="anc-art-link">
                        <span>{isKm ? "អានអត្ថបទពេញលេញ" : "Read Full Article"}</span>
                        <ArrowRightIcon style={{ width: 14, height: 14 }} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link href="/articles" className="anc-btn-outline-dark">
                {isKm ? "មើលអត្ថបទទាំងអស់" : "View All Articles"} →
              </Link>
            </div>
          </div>
        </section>

        {/* 3. WELCOME & PULPIT MINISTRY SECTION — Classic Framed Story */}
        <section className="anc-welcome-wrap">
          <div className="container">
            <div className="anc-welcome-layout">
              {/* Left Column: Mission Narrative & 3 Stately Pillars */}
              <div>
                <span className="anc-kicker-gray">
                  {isKm ? "សារស្វាគមន៍ & បេសកកម្ម" : "Welcome & Ministry Vision"}
                </span>

                <h2 className="anc-title-serif">
                  {isKm
                    ? "ចាក់ឬសក្នុងព្រះបន្ទូល និងការកសាងជំនឿ"
                    : "Rooted in Scripture, Growing in Faith"}
                </h2>

                <div className="anc-gold-rule-left" />

                <p className="anc-lead-p">
                  {isKm
                    ? "ខ្ញុំជឿជាក់ថា សេចក្តីជំនឿពិតត្រូវតែចាក់ឬសយ៉ាងរឹងមាំនៅក្នុងព្រះបន្ទូលនៃព្រះគម្ពីរ។ បងប្អូនជនជាតិខ្មែរគ្រប់រូប គួរតែមានឱកាសអាន សិក្សា និងយល់ដឹងនូវគោលលទ្ធិព្រះគម្ពីរយ៉ាងស៊ីជម្រៅជាភាសាកំណើតរបស់យើង។"
                    : "I believe enduring faith must be anchored in the inspired Word of God. Cambodian believers deserve rich, authentic theological teaching and devotional companions written with depth in their native Khmer language."}
                </p>

                {/* 3 Stately Pillars (All Nations Church Signature) */}
                <div>
                  <div className="anc-pillar-card">
                    <div className="anc-pillar-meta">
                      <span>{isKm ? "សសរស្តម្ភ ០១" : "Pillar 01"}</span>
                      <span>•</span>
                      <span>{isKm ? "ព្រះបន្ទូលជាគ្រឹះ" : "Biblical Foundation"}</span>
                    </div>
                    <h3 className="anc-pillar-h4">
                      {isKm ? "ការពន្យល់ព្រះគម្ពីរដ៏ស្មោះត្រង់" : "Faithful Biblical Exegesis"}
                    </h3>
                    <p className="anc-pillar-p">
                      {isKm
                        ? "គ្រប់អត្ថបទ និងការបង្រៀនទាំងអស់ផ្តើមចេញពីការពន្យល់ព្រះគម្ពីរដ៏ត្រឹមត្រូវ និងស្មោះត្រង់ យោងតាមព្រះគម្ពីរខ្មែរ ១៩៥៤។"
                        : "Every article and exposition is firmly grounded in faithful biblical hermeneutics and historic Christian orthodoxy."}
                    </p>
                  </div>

                  <div className="anc-pillar-card" style={{ borderLeftColor: "#112b4a" }}>
                    <div className="anc-pillar-meta">
                      <span>{isKm ? "សសរស្តម្ភ ០២" : "Pillar 02"}</span>
                      <span>•</span>
                      <span>{isKm ? "ការបង្រៀនជាប្រព័ន្ធ" : "Systematic Discipleship"}</span>
                    </div>
                    <h3 className="anc-pillar-h4">
                      {isKm ? "ការបណ្តុះបណ្តាលសិស្សជំនាន់ក្រោយ" : "Next-Generation Discipleship"}
                    </h3>
                    <p className="anc-pillar-p">
                      {isKm
                        ? "ការសិក្សាព្រះគម្ពីរជាប្រព័ន្ធ និងការបណ្តុះបណ្តាលសិស្សជំនាន់ក្រោយ ដើម្បីបំពាក់បំប៉នគ្រីស្ទបរិស័ទក្នុងការរស់នៅប្រចាំថ្ងៃ។"
                        : "Equipping young adults, students, and church leaders through systematic theology and practical Christian living."}
                    </p>
                  </div>

                  <div className="anc-pillar-card">
                    <div className="anc-pillar-meta">
                      <span>{isKm ? "សសរស្តម្ភ ០៣" : "Pillar 03"}</span>
                      <span>•</span>
                      <span>{isKm ? "ធនធានជាភាសាខ្មែរឥតគិតថ្លៃ" : "Free Khmer Resources"}</span>
                    </div>
                    <h3 className="anc-pillar-h4">
                      {isKm ? "បណ្ណាល័យសៀវភៅ និងធនធានស្មារតី" : "Digital Library & Spiritual Resources"}
                    </h3>
                    <p className="anc-pillar-p">
                      {isKm
                        ? "សៀវភៅទេវវិទ្យា អត្ថាធិប្បាយ និងធនធានស្មារតី ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់បងប្អូនជនជាតិខ្មែរគ្រប់រូប។"
                        : "Freely accessible commentaries, ebooks, and devotional writings to strengthen the local Cambodian church."}
                    </p>
                  </div>
                </div>

                {/* Pastoral Sign-off */}
                <div style={{ marginTop: "1.75rem", fontStyle: "italic", color: "#475569" }}>
                  <p style={{ margin: 0, fontSize: "0.92rem" }}>
                    {isKm ? "ដោយក្តីស្រឡាញ់ក្នុងព្រះគ្រីស្ទ," : "In Christ's grace,"}
                  </p>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.08rem", color: "#0f172a" }}>
                    {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}
                  </strong>
                </div>

                <div style={{ marginTop: "1.75rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/about" className="anc-btn-navy">
                    {isKm ? "ស្វែងយល់អំពីរឿងរ៉ាវរបស់ខ្ញុំ" : "Read My Full Story"} →
                  </Link>

                  <Link href="/contact" className="anc-btn-outline-dark">
                    {isKm ? "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត" : "Contact Me"}
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Media Card with Pulpit Teaching */}
              <div>
                <div className="anc-framed-card">
                  <div className="anc-framed-img-wrap">
                    <img
                      src="/images/pastors-pulpit.jpg"
                      alt="Pastor Kim Jong Ho and Leader Hun Chet preaching from the pulpit"
                    />
                    <div className="anc-framed-caption">
                      <h4>
                        {isKm
                          ? "លោកគ្រូ គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត លើវេទិកាទេសនា"
                          : "Pastor Kim Jong Ho & Leader Hun Chet in the Pulpit"}
                      </h4>
                      <p>
                        {isKm
                          ? "ការផ្សាយព្រះបន្ទូលនៃសេចក្តីពិត • ភូមិត្រពាំងក្រសាំង រាជធានីភ្នំពេញ"
                          : "Preaching the Word of Truth • Trapaing Krasang, Phnom Penh"}
                      </p>
                    </div>
                  </div>

                  <div className="anc-framed-quote">
                    <p>
                      {isKm
                        ? "«ដ្បិត​ឯ​ខ្ញុំ ដែល​ខ្ញុំ​រស់​នៅ នោះ​គឺ​សំរាប់​ព្រះគ្រីស្ទ​ទេ ហើយ​ដែល​ស្លាប់​ទៅ នោះ​ជា​កំរៃ​វិញ»"
                        : "“For to me to live is Christ, and to die is gain.”"}
                    </p>
                    <cite>
                      {isKm ? "— ភីលីព ១:២១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤" : "— Philippians 1:21 • 1954 Khmer Bible"}
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURED SHORT SERMON SPOTLIGHT — 5 Foundational Keys */}
        <section className="anc-sermon-section">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 3.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "2px",
                  background: "rgba(184, 155, 94, 0.15)",
                  border: "1px solid rgba(184, 155, 94, 0.4)",
                  color: "var(--gold)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                }}
              >
                <BookOpenIcon style={{ width: 14, height: 14 }} />
                {isKm
                  ? "សារព្រះបន្ទូលពិសេស • មាគ៌ាឆ្ពោះទៅកាន់គោលបំណងជីវិត"
                  : "Featured Short Sermon • A Path to Purpose"}
              </span>

              <h2 style={{ fontFamily: "var(--font-display)", color: "#ffffff", fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)", margin: "0 0 0.75rem" }}>
                {isKm
                  ? "គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ"
                  : "5 Keys to Living a Truly Great Life in Christ"}
              </h2>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#cbd5e1", fontSize: "0.85rem" }}>
                <UserIcon style={{ width: 14, height: 14, color: "var(--gold)" }} />
                <span>{isKm ? "អត្ថបទសញ្ជឹងគិតដោយ៖" : "Written by:"}</span>
                <strong style={{ color: "var(--gold)" }}>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}</strong>
              </div>

              <div className="anc-gold-bar" style={{ margin: "1.25rem auto 0" }} />
            </div>

            <div className="anc-sermon-grid">
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
                    marginBottom: "1.25rem",
                  }}
                >
                  {isKm ? "គន្លឹះទាំង ៥ យ៉ាងសង្ខេប" : "The 5 Foundational Keys"}
                </h3>

                <div>
                  {SERMON_KEYS.map((k) => (
                    <Link key={k.number} href="/articles" className="anc-key-card">
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span className="anc-key-num">
                          {isKm
                            ? ["១", "២", "៣", "៤", "៥"][parseInt(k.number, 10) - 1] || k.number
                            : k.number}
                        </span>
                        <div>
                          <strong style={{ display: "block", fontSize: "0.95rem", color: "#ffffff" }}>
                            {loc(k.title)}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--gold)", fontFamily: "var(--font-display)" }}>
                            {k.ref} • ព្រះគម្ពីរខ្មែរ ១៩៥៤
                          </span>
                        </div>
                      </div>
                      <ArrowRightIcon style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right: Scripture Highlight & Action */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="sermon-classic-quote-box">
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
                  <cite>— {isKm ? "យេរេមា ២៩:១១ • ព្រះគម្ពីរខ្មែរ ១៩៥៤" : "Jeremiah 29:11"}</cite>
                </div>

                <div
                  style={{
                    background: "rgba(184, 155, 94, 0.08)",
                    border: "1px solid rgba(184, 155, 94, 0.3)",
                    borderTop: "3px solid var(--gold)",
                    padding: "1.75rem",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <strong style={{ fontSize: "0.95rem", color: "#ffffff" }}>
                    {isKm ? "អានអត្ថបទពេញលេញ និងចែករំលែក" : "Read Full Reflection & Share"}
                  </strong>
                  <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                    {isKm
                      ? "ការបកស្រាយលម្អិតតាមព្រះគម្ពីរ ការអនុវត្តជាក់ស្តែង និងសំណួរពិចារណាសម្រាប់ការរីកចម្រើនក្នុងជំនឿ។"
                      : "Complete with biblical exposition, practical applications, and reflection questions."}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
                    <Link href="/articles" className="anc-btn-gold" style={{ padding: "0.75rem 1.4rem", fontSize: "0.75rem" }}>
                      {isKm ? "អានអត្ថបទទាំងអស់" : "Read Articles"} →
                    </Link>
                    <button
                      type="button"
                      onClick={handleShareTelegram}
                      className="anc-btn-glass"
                      style={{ padding: "0.75rem 1.25rem", fontSize: "0.75rem" }}
                    >
                      <TelegramIcon style={{ width: 14, height: 14, marginRight: "0.45rem", color: "#38bdf8" }} />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 3D THEOLOGICAL LIBRARY SPOTLIGHT — Preserving Realistic Books */}
        <section className="anc-library-wrap">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3.5rem" }}>
              <span style={{ color: "var(--gold)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                {isKm ? "បណ្ណាល័យទេវវិទ្យាឌីជីថល" : "Digital Theological Library"}
              </span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 3.8vw, 2.85rem)", fontWeight: 700, color: "#ffffff", margin: "0 0 1rem" }}>
                {isKm ? "បណ្ណាល័យសៀវភៅ និងអត្ថាធិប្បាយព្រះគម្ពីរ" : "Theological Library & Bible Commentaries"}
              </h2>
              <div className="anc-gold-bar" style={{ margin: "1rem auto 1.5rem" }} />
              <p style={{ color: "#cbd5e1", fontSize: "1.02rem", margin: 0 }}>
                {isKm
                  ? "បណ្ណាល័យសៀវភៅទេវវិទ្យាជាភាសាខ្មែរ រៀបចំជាទម្រង់ 3D ពិតៗ និងអាចទាញយកជា PDF ដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល និងអ្នកជឿទាំងអស់។"
                  : "Explore classic commentaries and theological works in Khmer, presented in interactive 3D and available for free PDF download."}
              </p>
            </div>

            {/* Featured Showcase */}
            <div className="anc-library-showcase">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RealBookCover book={BOOKS[0]} size="lg" />
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "0.5rem" }}>
                  {isKm ? "សៀវភៅណែនាំពិសេស • សិក្សាព្រះគម្ពីរ" : "Featured Study Volume"}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "#ffffff", fontSize: "1.65rem", margin: "0 0 1rem", lineHeight: 1.3 }}>
                  {isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី" : "Matthew Henry's Bible Commentary"}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#cbd5e1", lineHeight: 1.75, marginBottom: "1.75rem" }}>
                  {isKm
                    ? "អត្ថាធិប្បាយសង្ខេបខម្តងមួយៗលើព្រះគម្ពីរទាំងមូល ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល និស្សិតព្រះគម្ពីរ និងអ្នកជឿទាំងអស់ដែលចង់រីកចម្រើនក្នុងព្រះបន្ទូល។"
                    : "The classic verse-by-verse commentary, provided freely for pastors, leaders, and growing believers across Cambodia."}
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/library/matthew-henry-commentary" className="anc-btn-gold" style={{ padding: "0.75rem 1.5rem", fontSize: "0.78rem" }}>
                    {isKm ? "អាន និងទាញយក PDF" : "Read & Download PDF"} →
                  </Link>
                  <Link href="/library" className="anc-btn-glass" style={{ padding: "0.75rem 1.5rem", fontSize: "0.78rem" }}>
                    {isKm ? "ចូលមើលសៀវភៅទាំង ៧ ក្បាល" : "View All 7 Volumes"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. AUTHENTIC LIFE & MINISTRY MOMENTS (All Nations Church Signature Gallery Grid) */}
        <section style={{ padding: "5.5rem 0", background: "#fcfbf9", borderTop: "1px solid #e2dfd8" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3.5rem" }}>
              <span className="anc-kicker-gray">
                {isKm ? "ទិដ្ឋភាពនៃជីវិត និងការបម្រើព្រះ" : "Life Together in Christ"}
              </span>
              <h2 className="anc-title-serif">
                {isKm ? "សកម្មភាពនៃការបង្រៀន និងការប្រកបគ្នា" : "Moments from Life & Ministry"}
              </h2>
              <div className="anc-gold-bar" style={{ margin: "1rem auto 1.5rem" }} />
              <p style={{ color: "#475569", fontSize: "1.02rem", margin: 0 }}>
                {isKm
                  ? "រូបភាពពិតនៃការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស យុវជន និងការអធិស្ឋានរបស់លោកគ្រូ ហ៊ុន ចិត្ត។"
                  : "Authentic glimpses of worship, teaching, prayer, and discipleship in Cambodia."}
              </p>
            </div>

            <div className="anc-photo-grid">
              {LIFE_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  className="anc-photo-card"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="anc-photo-thumb-wrap">
                    <img src={photo.src} alt={loc(photo.title)} loading="lazy" />
                    <span className="anc-photo-badge">{loc(photo.badge)}</span>
                    <div className="anc-photo-title-bar">
                      <span className="anc-photo-title">{loc(photo.title)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/gallery" className="anc-btn-navy">
                {isKm ? "ចូលមើលកម្រងរូបភាពទាំងអស់" : "Explore Full Gallery"} →
              </Link>
            </div>
          </div>
        </section>

        {/* 8. DIRECT PASTORAL CONNECT BANNER (All Nations Church Signature Next Steps) */}
        <section className="anc-partnership-banner" style={{ borderBottom: "8px solid var(--gold)" }}>
          <div className="container">
            <div className="anc-partnership-inner">
              <div style={{ maxWidth: 640 }}>
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
                  {isKm ? "ភ្ជាប់ទំនាក់ទំនងផ្ទាល់" : "Direct Pastoral Connection"}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
                    color: "#ffffff",
                    margin: "0 0 1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {isKm
                    ? "មានសំណួរ ឬចង់ឱ្យអធិស្ឋានជូន?"
                    : "Have Questions or Need Prayer?"}
                </h2>

                <p style={{ color: "#cbd5e1", lineHeight: 1.75, margin: 0, fontSize: "1.02rem" }}>
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
                  className="anc-btn-gold"
                  style={{ padding: "0.85rem 1.6rem" }}
                >
                  <TelegramIcon style={{ width: 15, height: 15, marginRight: "0.5rem" }} />
                  <span>Telegram</span>
                </a>

                <a
                  href="tel:0966875886"
                  className="anc-btn-glass"
                  style={{ padding: "0.85rem 1.5rem" }}
                >
                  <PhoneIcon style={{ width: 15, height: 15, marginRight: "0.5rem", color: "var(--gold)" }} />
                  <span>096 687 5886</span>
                </a>

                <Link href="/contact" className="anc-btn-white" style={{ padding: "0.85rem 1.5rem" }}>
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
