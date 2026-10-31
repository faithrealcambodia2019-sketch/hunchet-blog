import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ConnectBanner from "../components/ConnectBanner";
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
  PlayIcon,
  PauseIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowUpRight,
  TelegramIcon,
} from "../components/Icons";
import { BOOKS } from "../lib/books";
import RealBookCover from "../components/RealBookCover";

const SERMON_KEYS = [
  {
    number: "01",
    ref: "ទំនុកតម្កើង ១១៩:១០៥",
    title: {
      km: "ចាប់ផ្តើមជាមួយព្រះបន្ទូលព្រះ (God's Word First)",
      en: "Start with God's Word First",
      ko: "하나님의 말씀으로 시작하기",
      zh: "以神的话语为起点",
    },
    desc: {
      km: "ព្រះបន្ទូលព្រះជាចង្កៀងបំភ្លឺផ្លូវ និងជាពន្លឺបំភ្លឺគន្លងជីវិតរបស់អ្នកជឿជានិច្ច។",
      en: "God's Word is a lamp to guide our feet and a light for our path.",
      ko: "주의 말씀은 내 발의 등이요 내 길에 빛이니이다.",
      zh: "你的话是我脚前的灯，是我路上的光。",
    },
  },
  {
    number: "02",
    ref: "យេរេមា ២៩:១១",
    title: {
      km: "មានក្តីសុបិនធំជាមួយព្រះ (Dream Big with God)",
      en: "Dream Big with God",
      ko: "하나님과 함께 큰 꿈을 꾸기",
      zh: "与神同行，心存盼望",
    },
    desc: {
      km: "ព្រះមានផែនការនៃសេចក្តីសុខសាន្ត មិនមែនជាសេចក្តីអាក្រក់ ដើម្បីឱ្យយើងមានសង្ឃឹមនៅចុងបំផុត។",
      en: "God has plans to prosper you and not to harm you, plans to give you hope and a future.",
      ko: "너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라.",
      zh: "我知道我向你们所怀的意念是赐平安的意念，不是降灾祸的意念。",
    },
  },
  {
    number: "03",
    ref: "កូឡូស ៣:២៣",
    title: {
      km: "កសាងចរិតលក្ខណៈតាមរយៈការឧស្សាហ៍ (Diligence & Character)",
      en: "Build Character Through Diligence",
      ko: "성실함으로 인격 세우기",
      zh: "以勤勉塑造基督品格",
    },
    desc: {
      km: "ធ្វើការអ្វីក៏ដោយ ត្រូវធ្វើឱ្យអស់ពីចិត្ត ដូចជាធ្វើថ្វាយព្រះអម្ចាស់ មិនមែនថ្វាយមនុស្សឡើយ។",
      en: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      ko: "무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라.",
      zh: "无论做什么，都要从心里做，像是给主做的，不是给人做的。",
    },
  },
  {
    number: "04",
    ref: "សុភាសិត ១៨:២១",
    title: {
      km: "ជ្រើសរើសពាក្យសម្តីដែលពោរពេញដោយជំនឿ (Faith-Filled Words)",
      en: "Choose Faith-Filled Words",
      ko: "믿음이 담긴 말 선택하기",
      zh: "选用满有信心的话语",
    },
    desc: {
      km: "សេចក្តីស្លាប់ និងជីវិត គឺនៅក្នុងអំណាចនៃអណ្តាត។ ពាក្យសម្តីនៃជំនឿបង្កើតឡើងនូវជីវិត។",
      en: "Death and life are in the power of the tongue. Speak words of grace and faith.",
      ko: "죽고 사는 것이 혀의 힘에 달렸나니 혀를 쓰기 좋아하는 자는 혀의 fruit을 먹으리라.",
      zh: "生死在舌头的权下，喜爱它的，必吃它所结的果子。",
    },
  },
  {
    number: "05",
    ref: "ហេព្រើរ ១២:២",
    title: {
      km: "សម្លឹងមើលទៅព្រះយេស៊ូវជានិច្ច (Keep Eyes on Jesus)",
      en: "Keep Your Eyes on Jesus",
      ko: "예수님께 시선을 고정하기",
      zh: "定睛仰望主耶稣",
    },
    desc: {
      km: "សម្លឹងមើលទៅព្រះយេស៊ូវ ដែលជាមេផ្តើម និងជាមេសម្រេចនៃសេចក្តីជំនឿរបស់យើង។",
      en: "Fixing our eyes on Jesus, the pioneer and perfecter of faith.",
      ko: "믿음의 주요 또 온전하게 하시는 이인 예수를 바라보자.",
      zh: "仰望为我们信心创始成终的耶稣。",
    },
  },
];

const LIFE_PHOTOS = [
  {
    src: "/images/pastors-pulpit.jpg",
    title: { km: "ការបង្រៀនលើវេទិកា", en: "Pulpit Preaching", ko: "강단 사역", zh: "讲台宣道" },
    badge: { km: "ព្រះបន្ទូល", en: "Preaching", ko: "설교", zh: "讲道" },
    description: {
      km: "ការចែករំលែកព្រះបន្ទូល និងការពន្យល់ព្រះគម្ពីរយ៉ាងស៊ីជម្រៅ ដោយលោកគ្រូ គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត។",
      en: "Preaching and biblical exegesis with Pastor Kim Jong Ho and Leader Hun Chet.",
      ko: "김종호 목사와 훈 쳇 리더의 강단 사역",
      zh: "传讲真道",
    },
  },
  {
    src: "/images/bible-class-grade12-teaching.jpg",
    title: { km: "ថ្នាក់សិក្សាព្រះគម្ពីរ", en: "Bible Study Class", ko: "성경 공부", zh: "查经研读" },
    badge: { km: "ការបណ្តុះសិស្ស", en: "Discipleship", ko: "제자 양육", zh: "门徒训练" },
    description: {
      km: "ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សជំនាន់ក្រោយ។",
      en: "Teaching and discipling the next generation in God's truth.",
      ko: "다음 세대 제자 훈련",
      zh: "培训年轻一代门徒",
    },
  },
  {
    src: "/images/history-prayer-fellowship.jpg",
    title: { km: "ការអធិស្ឋាន និងការប្រកបគ្នា", en: "Prayer & Fellowship", ko: "기도와 교제", zh: "祷告团契" },
    badge: { km: "ការអធិស្ឋាន", en: "Prayer", ko: "기도", zh: "同心祷告" },
    description: {
      km: "ពេលនៃការអធិស្ឋាន និងការលើកទឹកចិត្តគ្នាទៅវិញទៅមកក្នុងព្រះគ្រីស្ទ។",
      en: "Earnest prayer, mutual encouragement, and spiritual fellowship in Christ.",
      ko: "기도와 교제의 시간",
      zh: "恒切祷告与互勉",
    },
  },
  {
    src: "/images/youth-fellowship-2025-group.jpg",
    title: { km: "ក្រុមយុវជន និងការរួបរួម", en: "Youth Discipleship", ko: "청년 모임", zh: "青年团契" },
    badge: { km: "យុវជន", en: "Youth", ko: "청년부", zh: "青年团契" },
    description: {
      km: "ការកសាងជំនឿ និងការបណ្តុះបណ្តាលយុវជនគ្រីស្ទបរិស័ទសម្រាប់អនាគត។",
      en: "Equipping young people in Christ for Cambodia's future.",
      ko: "청년들의 믿음 성장",
      zh: "造就属灵青年",
    },
  },
];

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 6 });
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
  const videoRef = useRef(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  const toggleHeroPlay = () => {
    if (videoRef.current) {
      if (isHeroPlaying) {
        videoRef.current.pause();
        setIsHeroPlaying(false);
      } else {
        videoRef.current.play();
        setIsHeroPlaying(true);
      }
    }
  };

  const toggleHeroMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isHeroMuted;
      setIsHeroMuted(!isHeroMuted);
    }
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
    <div className="oc-site">
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
              : "Personal blog of Leader Hun Chet — sharing biblical exposition, devotional writings, life journey reflections, and spiritual resources."
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

      <main id="main-content">
        {/* 1. HERO SECTION (All Nations Church Visual Architecture) */}
        <section className="oc-hero oc-photo-section" id="home" aria-labelledby="oc-hero-title">
          {/* Background Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            poster="/images/hero-cover.jpg"
            className="oc-section-photo oc-hero-photo"
          >
            <source src="/videos/church-intro-480p.mp4" type="video/mp4" />
          </video>

          {/* Video Audio & Playback Controls Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "32px",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(10, 20, 24, 0.82)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <button
              type="button"
              onClick={toggleHeroMute}
              aria-label={isHeroMuted ? "Turn audio on" : "Mute audio"}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: 0,
                fontSize: "11px",
              }}
            >
              {isHeroMuted ? (
                <>
                  <VolumeOffIcon style={{ width: 13, height: 13 }} />
                  <span>{isKm ? "សំឡេងបិទ" : "Muted"}</span>
                </>
              ) : (
                <>
                  <VolumeOnIcon style={{ width: 13, height: 13, color: "#70a9c6" }} />
                  <span>{isKm ? "សំឡេងបើក" : "Sound On"}</span>
                </>
              )}
            </button>

            <span style={{ opacity: 0.3 }}>|</span>

            <button
              type="button"
              onClick={toggleHeroPlay}
              aria-label={isHeroPlaying ? "Pause video" : "Play video"}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              {isHeroPlaying ? (
                <PauseIcon style={{ width: 13, height: 13 }} />
              ) : (
                <PlayIcon style={{ width: 13, height: 13, color: "#70a9c6" }} />
              )}
            </button>
          </div>

          {/* Hero Content */}
          <div className="oc-hero-content">
            <p className="oc-eyebrow oc-light">
              {isKm ? "ភ្នំពេញ កម្ពុជា" : "Phnom Penh, Cambodia"}
              <span aria-hidden="true">/</span>
              {isKm ? "គេហទំព័រផ្លូវការ • លោកគ្រូ ហ៊ុន ចិត្ត" : "Official Website • Leader Hun Chet"}
            </p>

            <h1 id="oc-hero-title">
              {isKm ? (
                <>
                  ចាក់ឬសក្នុងព្រះបន្ទូល។
                  <br />
                  រស់ដើម្បីព្រះគ្រីស្ទ។
                </>
              ) : (
                <>
                  Rooted In Truth.
                  <br />
                  Living For Christ.
                </>
              )}
            </h1>

            <p className="oc-hero-khmer" lang="km">
              {isKm
                ? "លោកគ្រូ ហ៊ុន ចិត្ត — ការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនក្នុងព្រះគ្រីស្ទ"
                : "Leader Hun Chet — Biblical Exegesis, Discipleship, and Resources for Spiritual Maturity"}
            </p>

            <div className="oc-hero-actions">
              <Link href="/articles" className="oc-button oc-outline">
                <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Explore Articles"}</span>
                <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 6 }} />
              </Link>
            </div>
          </div>

          <a className="oc-scroll-cue" href="#foundations" aria-label="Explore Foundations">
            <span>{isKm ? "ស្វែងយល់បន្ថែម" : "Explore"}</span>
            <span className="oc-chevron" aria-hidden="true" />
          </a>

          <span className="oc-hero-side-note" lang="en" aria-hidden="true">
            EXPOSITORY PREACHING • BIBLICAL DISCIPLESHIP
          </span>
        </section>

        {/* 2. ALL NATIONS CHURCH QUICK BAR */}
        <div
          className="oc-sunday-strip"
          role="region"
          aria-label={isKm ? "ព័ត៌មានព័ន្ធកិច្ច" : "Ministry information"}
        >
          <p>
            <span className="oc-status-dot" aria-hidden="true" />
            {isKm ? "ការបង្រៀនព្រះបន្ទូល & ព័ន្ធកិច្ច" : "Biblical Teaching & Ministry"}
          </p>
          <p>
            {isKm ? "ទីតាំង" : "Location"}{" "}
            <strong>{isKm ? "ភ្នំពេញ កម្ពុជា" : "Phnom Penh, Cambodia"}</strong>
          </p>
          <p>
            {isKm ? "ភាសា" : "Languages"} <span className="oc-strip-divider">/</span>{" "}
            <strong>{isKm ? "ខ្មែរ • English • 한국어" : "Khmer, English & Korean"}</strong>
          </p>
          <Link href="/contact">
            {isKm ? "ទំនាក់ទំនង និងអធិស្ឋាន" : "Connect & Prayer"}
            <ArrowUpRight width={12} height={12} style={{ display: "inline-block", marginLeft: 4 }} />
          </Link>
        </div>

        {/* 3. 4 CORE FOUNDATIONS PHOTOGRAPHIC GRID (Styled like ANC) */}
        <section className="oc-section" id="foundations" style={{ background: "#ffffff", borderBottom: "1px solid #dcdfda" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
            <p className="oc-eyebrow">
              {isKm ? "ស្វែងរកធនធាន និងព័ន្ធកិច្ច" : "Explore Ministry & Faith"}
            </p>
            <h2>
              {isKm ? "ផ្នែកសំខាន់ៗនៃគេហទំព័រ" : "Core Foundations"}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Card 1: Articles */}
            <Link href="/articles" className="oc-image-card" style={{ aspectRatio: "4/3.5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Articles & Sermons"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">01</span>
                <h3>{isKm ? "អត្ថបទបង្រៀន" : "Articles"}</h3>
                <p>{isKm ? "ការបកស្រាយព្រះគម្ពីរ និងការបង្រៀនជីវិតគ្រីស្ទបរិស័ទ។" : "Scripture exposition and practical Christian living."}</p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>

            {/* Card 2: 365 Devotions */}
            <Link href="/devotions" className="oc-image-card" style={{ aspectRatio: "4/3.5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/worship-service.jpg"
                alt="365 Daily Devotion"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">02</span>
                <h3>{isKm ? "ការសញ្ជឹងគិត ៣៦៥ ថ្ងៃ" : "365 Devotions"}</h3>
                <p>{isKm ? "អាហារខាងវិញ្ញាណប្រចាំថ្ងៃពីព្រះគម្ពីរខ្មែរ ១៩៥៤។" : "Daily spiritual bread from the 1954 Khmer Bible."}</p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>

            {/* Card 3: Library */}
            <Link href="/library" className="oc-image-card" style={{ aspectRatio: "4/3.5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/all-nations-institute-campus.jpg"
                alt="Theological Library"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">03</span>
                <h3>{isKm ? "បណ្ណាល័យសៀវភៅ" : "Library"}</h3>
                <p>{isKm ? "អត្ថាធិប្បាយ Matthew Henry និងសៀវភៅបណ្តុះសិស្ស។" : "Matthew Henry commentaries and study handbooks."}</p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>

            {/* Card 4: Gallery */}
            <Link href="/gallery" className="oc-image-card" style={{ aspectRatio: "4/3.5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/youth-fellowship-2025-group.jpg"
                alt="Ministry Gallery"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">04</span>
                <h3>{isKm ? "កម្រងរូបភាព" : "Gallery"}</h3>
                <p>{isKm ? "ទិដ្ឋភាពពិតនៃការបង្រៀន និងការប្រកបគ្នាក្នុងព្រះគ្រីស្ទ។" : "Authentic moments of ministry and fellowship."}</p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 4. DAILY SCRIPTURE SPOTLIGHT (One Church Minimalist Clean Band) */}
        <section
          style={{
            backgroundColor: "#fcfbf7",
            borderBottom: "1px solid #dcdfda",
            padding: "85px 7%",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p className="oc-eyebrow">{currentScripture.tag}</p>
            <blockquote
              style={{
                fontFamily: isKm ? "'Koh Santepheap', sans-serif" : "Montserrat, sans-serif",
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 600,
                color: "#141716",
                lineHeight: 1.45,
                margin: "0 0 1.5rem",
              }}
            >
              {currentScripture.text}
            </blockquote>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "2rem",
              }}
            >
              — {currentScripture.ref}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/devotions" className="oc-button oc-solid">
                <span>{isKm ? "អានព្រះបន្ទូលថ្ងៃនេះ" : "Today's Devotion"}</span>
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </Link>
              <a
                href="https://t.me/+855966875886"
                target="_blank"
                rel="noreferrer"
                className="oc-button oc-outline-dark"
              >
                <TelegramIcon style={{ width: 14, height: 14, marginRight: 6 }} />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </section>

        {/* 5. MISSION & CALLING (All Nations Church 2-Column Clean Editorial) */}
        <section className="oc-section" style={{ borderBottom: "1px solid #dcdfda" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <p className="oc-eyebrow">
                {isKm ? "រឿងរ៉ាវ និងបេសកកម្ម" : "Story & Calling"}
              </p>
              <h2>
                {isKm ? (
                  <>
                    ចាក់ឫសក្នុងព្រះបន្ទូល
                    <br />
                    និងការកសាងជំនឿ។
                  </>
                ) : (
                  <>
                    Rooted In Scripture,
                    <br />
                    Growing In Faith.
                  </>
                )}
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "15px", marginBottom: "1rem" }}>
                {isKm
                  ? "ខ្ញុំជឿជាក់ថា សេចក្តីជំនឿពិតត្រូវតែចាក់ឫសយ៉ាងរឹងមាំនៅក្នុងព្រះបន្ទូលនៃព្រះគម្ពីរ។ បងប្អូនជនជាតិខ្មែរគ្រប់រូប គួរតែមានឱកាសអាន សិក្សា និងយល់ដឹងនូវគោលលទ្ធិព្រះគម្ពីរយ៉ាងស៊ីជម្រៅជាភាសាកំណើតរបស់យើង។"
                  : "Enduring faith must be anchored in the inspired Word of God. Cambodian believers deserve rich, authentic theological teaching and devotional companions written with depth in their native Khmer language."}
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "15px", marginBottom: "2rem" }}>
                {isKm
                  ? "បម្រើការជាអ្នកដឹកនាំកិច្ចការបម្រើព្រះ — ដឹកនាំការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្សយុវជន និងការកសាងធនធានស្មារតីឌីជីថល ដើម្បីបំពាក់បំប៉នគ្រីស្ទបរិស័ទជំនាន់ក្រោយ។"
                  : "Serving as Ministry Lead in Phnom Penh — directing biblical teaching, student discipleship, and building digital resources to equip the next generation."}
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/about" className="oc-button oc-solid">
                  <span>{isKm ? "អានរឿងរ៉ាវពេញលេញ" : "Read Full Story"}</span>
                  <ArrowRightIcon style={{ width: 12, height: 12 }} />
                </Link>
                <Link href="/contact" className="oc-button oc-outline-dark">
                  <span>{isKm ? "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត" : "Get In Touch"}</span>
                </Link>
              </div>
            </div>

            <div>
              <div
                style={{
                  border: "1px solid #dcdfda",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  backgroundColor: "#f5f4f0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pastors-pulpit.jpg"
                  alt="Pastor Kim Jong Ho and Leader Hun Chet preaching from the pulpit"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. 5 KEYS TO LIVING A TRULY GREAT LIFE IN CHRIST (Numbered Clean Cards) */}
        <section style={{ backgroundColor: "#ffffff", padding: "90px 7%", borderBottom: "1px solid #dcdfda" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto 3.5rem", textAlign: "center" }}>
            <p className="oc-eyebrow">
              {isKm ? "សារព្រះបន្ទូលសង្ខេប • មាគ៌ាជីវិត" : "Biblical Wisdom • Life Principles"}
            </p>
            <h2>
              {isKm
                ? "គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ"
                : "5 Keys to Living a Truly Great Life in Christ"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.7, margin: "0.75rem auto 0" }}>
              {isKm
                ? "យោងតាមព្រះគម្ពីរខ្មែរបកប្រែចាស់ ១៩៥៤ — គោលការណ៍គ្រឹះសម្រាប់ការលូតលាស់ខាងវិញ្ញាណ និងការរស់នៅប្រចាំថ្ងៃ។"
                : "Biblical foundational principles from the 1954 Khmer Scripture for spiritual maturity and everyday purpose."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              maxWidth: "1140px",
              margin: "0 auto",
            }}
          >
            {SERMON_KEYS.map((item) => (
              <div
                key={item.number}
                style={{
                  backgroundColor: "#fcfbf7",
                  border: "1px solid #dcdfda",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.number} / KEY
                  </span>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#141716",
                      marginBottom: "0.75rem",
                      lineHeight: 1.35,
                    }}
                  >
                    {loc(item.title)}
                  </h3>
                  <p
                    style={{
                      color: "#4a5568",
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {loc(item.desc)}
                  </p>
                </div>
                <div
                  style={{
                    paddingTop: "0.85rem",
                    borderTop: "1px solid #e2e8f0",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {item.ref} • ព្រះគម្ពីរខ្មែរ ១៩៥៤
                </div>
              </div>
            ))}

            {/* Final CTA Card */}
            <div
              style={{
                backgroundColor: "#141716",
                color: "#ffffff",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#8ec5e5",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  DEVOTION / REFLECTION
                </span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {isKm ? "ស្វែងយល់អត្ថបទពេញលេញ" : "Read The Full Exposition"}
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {isKm
                    ? "ការបកស្រាយលម្អិតតាមព្រះគម្ពីរ ការអនុវត្តជាក់ស្តែង និងសំណួរពិចារណាសម្រាប់ការរីកចម្រើនក្នុងជំនឿ។"
                    : "Dive deeper into scriptural applications, pastoral insights, and reflection questions."}
                </p>
              </div>
              <Link
                href="/articles"
                className="oc-button oc-outline"
                style={{ width: "fit-content" }}
              >
                <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Read Articles"}</span>
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. RECENT ARTICLES (Clean 3-Column Editorial Grid) */}
        <section className="oc-section" id="articles">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
            <p className="oc-eyebrow">
              {isKm ? "អត្ថបទ និងការបង្រៀនថ្មីៗ" : "Latest Articles & Teachings"}
            </p>
            <h2>
              {isKm ? "អត្ថបទសញ្ជឹងគិត & ការបង្រៀនព្រះបន្ទូល" : "Reflections & Biblical Teaching"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.7, margin: "0.75rem auto 0" }}>
              {isKm
                ? "ស្វែងរកអត្ថបទថ្មីៗស្តីពីការបង្រៀនព្រះគម្ពីរ ជីវិតគ្រីស្ទបរិស័ទ ភាពជាអ្នកដឹកនាំ និងការលូតលាស់ខាងវិញ្ញាណ។"
                : "Explore newly published writings on scripture exposition, discipleship, and spiritual life."}
            </p>
          </div>

          {error && (
            <p style={{ textAlign: "center", color: "#dc2626" }}>
              {t("common.loadError")} {error}
            </p>
          )}

          {posts && posts.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              {posts.slice(0, 3).map((post) => {
                const image = getFeaturedImage(post);
                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #dcdfda",
                      borderRadius: 0,
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    }}
                  >
                    <div style={{ aspectRatio: "16/10", overflow: "hidden", background: "#f5f4f0", borderBottom: "1px solid #dcdfda" }}>
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#141716",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "2rem",
                            fontWeight: 700,
                          }}
                        >
                          H
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {formatDate(post.date)}
                        </span>
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "#141716",
                            margin: "0 0 0.75rem",
                          }}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: 1.65, margin: "0 0 1.25rem" }}>
                          {getExcerptText(post, 120)}
                        </p>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: "#141716",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          paddingTop: "0.85rem",
                          borderTop: "1px solid #eef0eb",
                        }}
                      >
                        <span>{isKm ? "អានអត្ថបទពេញលេញ" : "READ FULL ARTICLE"}</span>
                        <ArrowRightIcon style={{ width: 12, height: 12 }} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/articles" className="oc-button oc-outline-dark">
              <span>{isKm ? "មើលអត្ថបទទាំងអស់" : "View All Articles"}</span>
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </section>

        {/* 8. THEOLOGICAL LIBRARY (Matthew Henry Commentary & 3D Book Feature) */}
        <section style={{ backgroundColor: "#fcfbf7", borderTop: "1px solid #dcdfda", padding: "90px 7%" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ background: "#ffffff", border: "1px solid #dcdfda", padding: "clamp(2rem, 4vw, 4rem)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "45px",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <RealBookCover book={BOOKS[0]} size="lg" />
                </div>

                <div>
                  <p className="oc-eyebrow">
                    {isKm ? "បណ្ណាល័យទេវវិទ្យាឌីជីថល • ធនធានសិក្សា" : "Digital Theological Library"}
                  </p>
                  <h2>
                    {isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី" : "Matthew Henry's Commentary"}
                  </h2>
                  <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "15px", marginBottom: "2rem" }}>
                    {isKm
                      ? "អត្ថាធិប្បាយសង្ខេបខម្តងមួយៗលើព្រះគម្ពីរទាំងមូល ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល និស្សិតព្រះគម្ពីរ និងអ្នកជឿទាំងអស់ដែលចង់រីកចម្រើនក្នុងព្រះបន្ទូល។"
                      : "The classic verse-by-verse commentary, provided freely for pastors, teachers, and believers across Cambodia in high quality PDF format."}
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Link href="/library/matthew-henry-commentary" className="oc-button oc-solid">
                      <span>{isKm ? "អាន និងទាញយក PDF" : "Read & Download PDF"}</span>
                      <ArrowRightIcon style={{ width: 12, height: 12 }} />
                    </Link>
                    <Link href="/library" className="oc-button oc-outline-dark">
                      <span>{isKm ? "ចូលមើលសៀវភៅទាំង ៧ ក្បាល" : "View All Volumes"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. AUTHENTIC MINISTRY MOMENTS (Clean Gallery Showcase) */}
        <section className="oc-section" style={{ borderTop: "1px solid #dcdfda" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
            <p className="oc-eyebrow">
              {isKm ? "ទិដ្ឋភាពនៃជីវិត និងការបម្រើព្រះ" : "Life Together In Christ"}
            </p>
            <h2>
              {isKm ? "សកម្មភាពនៃការបង្រៀន និងការប្រកបគ្នា" : "Moments from Life & Ministry"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.7, margin: "0.75rem auto 0" }}>
              {isKm
                ? "រូបភាពពិតនៃការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស យុវជន និងការអធិស្ឋានរបស់លោកគ្រូ ហ៊ុន ចិត្ត។"
                : "Authentic glimpses of worship, teaching, prayer, and discipleship in Cambodia."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {LIFE_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dcdfda",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f5f4f0" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={loc(photo.title)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: "1rem", borderTop: "1px solid #dcdfda" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {loc(photo.badge)}
                  </span>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#141716",
                      margin: 0,
                    }}
                  >
                    {loc(photo.title)}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/gallery" className="oc-button oc-outline-dark">
              <span>{isKm ? "ចូលមើលកម្រងរូបភាពទាំងអស់" : "Explore Full Gallery"}</span>
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </section>

        {/* 10. CONNECT BANNER */}
        <ConnectBanner />
      </main>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            style={{
              maxWidth: "800px",
              width: "100%",
              background: "#ffffff",
              border: "1px solid #dcdfda",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", aspectRatio: "16/10", background: "#000000" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.src}
                alt={loc(selectedPhoto.title)}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  padding: "8px",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                <CloseIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {loc(selectedPhoto.badge)}
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, textTransform: "uppercase", color: "#141716", margin: "0 0 0.5rem" }}>
                {loc(selectedPhoto.title)}
              </h3>
              <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: 1.65, margin: 0 }}>
                {loc(selectedPhoto.description)}
              </p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
