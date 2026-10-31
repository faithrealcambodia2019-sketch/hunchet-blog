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
  TelegramIcon,
  UserIcon,
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
      ko: "죽고 사는 것이 혀의 힘에 달렸나니 혀를 쓰기 좋아하는 자는 혀의 열매를 먹으리라.",
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

      {/* 1. HERO SECTION — One Church Signature Cinematic Full-Bleed Atmospheric Hero */}
      <section className="oc-home-hero">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isHeroMuted}
          playsInline
          poster="/images/hero-cover.jpg"
          className="oc-home-hero-video"
        >
          <source src="/videos/church-intro-480p.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Scrim */}
        <div className="oc-home-hero-scrim" />

        {/* Video Audio & Playback Controls Badge */}
        <div className="oc-home-hero-controls">
          <button
            type="button"
            onClick={toggleHeroMute}
            aria-label={isHeroMuted ? "Turn audio on" : "Mute audio"}
            className="oc-hero-control-btn"
          >
            {isHeroMuted ? (
              <>
                <VolumeOffIcon style={{ width: 13, height: 13 }} />
                <span>{isKm ? "សំឡេងបិទ" : "Muted"}</span>
              </>
            ) : (
              <>
                <VolumeOnIcon style={{ width: 13, height: 13, color: "#38bdf8" }} />
                <span>{isKm ? "សំឡេងបើក" : "Sound On"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleHeroPlay}
            aria-label={isHeroPlaying ? "Pause video" : "Play video"}
            className="oc-hero-control-btn"
            style={{ padding: "6px 8px" }}
          >
            {isHeroPlaying ? (
              <PauseIcon style={{ width: 13, height: 13 }} />
            ) : (
              <PlayIcon style={{ width: 13, height: 13 }} />
            )}
          </button>
        </div>

        {/* Hero Content (One Church Bold Uppercase Sans) */}
        <div className="oc-home-hero-content">
          <p className="oc-eyebrow oc-light" style={{ marginBottom: "0.75rem" }}>
            {isKm ? "គេហទំព័រផ្លូវការ • លោកគ្រូ ហ៊ុន ចិត្ត" : "Official Website • Leader Hun Chet"}
          </p>

          <h1
            className={`oc-home-hero-title ${isKm ? "is-khmer" : ""}`}
          >
            {isKm ? "ចាក់ឬសក្នុងព្រះបន្ទូល" : "Rooted In Truth."}
            <br />
            {isKm ? "រស់ដើម្បីព្រះគ្រីស្ទ" : "Living For Christ."}
          </h1>

          <p
            className={`oc-home-hero-desc ${isKm ? "is-khmer" : ""}`}
          >
            {isKm
              ? "សូមស្វាគមន៍មកកាន់គេហទំព័រផ្ទាល់ខ្លួនរបស់ខ្ញុំបាទ ហ៊ុន ចិត្ត។ ទីនេះជាកន្លែងកត់ត្រា និងចែករំលែកនូវសេចក្តីពិតនៃព្រះបន្ទូល ការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនក្នុងព្រះគ្រីស្ទ។"
              : "Welcome to my personal blog. A space dedicated to faithful biblical exposition, theological writings, life journey reflections, and resources for spiritual maturity."}
          </p>

          <div className="oc-home-hero-actions">
            <Link href="/articles" className="oc-button oc-white">
              <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Explore Articles"}</span>
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </Link>

            <Link href="/devotions" className="oc-button oc-outline">
              <BookOpenIcon style={{ width: 14, height: 14, marginRight: 4 }} />
              <span>{isKm ? "ព្រះបន្ទូល ៣៦៥ ថ្ងៃ" : "365 Devotions"}</span>
            </Link>

            <Link href="/about" className="oc-button oc-outline">
              <span>{isKm ? "អំពីលោកគ្រូ ហ៊ុន ចិត្ត" : "About Me"}</span>
            </Link>
          </div>
        </div>

        {/* Clean bottom line */}
        <div className="oc-home-hero-divider" />
      </section>

      {/* 2. ONE CHURCH SIGNATURE 4-CARD PHOTOGRAPHIC GRID (Overlay Badges) */}
      <section className="bg-white border-b border-[#dcdfda] py-14 sm:py-20">
        <div className="oc-section py-0">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="oc-eyebrow">
              {isKm ? "ស្វែងរកធនធាន និងព័ន្ធកិច្ច" : "Explore Ministry & Faith"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
              {isKm ? "ផ្នែកសំខាន់ៗនៃគេហទំព័រ" : "Core Foundations"}
            </h2>
          </div>

          <div className="oc-photo-grid">
            {/* Card 1: Articles */}
            <Link href="/articles" className="oc-photo-card group">
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Articles & Sermons"
                className="oc-photo-card-img"
                loading="lazy"
              />
              <span className="oc-card-badge-overlay oc-badge-teal">
                {isKm ? "អត្ថបទបង្រៀន" : "Articles"}
              </span>
            </Link>

            {/* Card 2: 365 Devotions */}
            <Link href="/devotions" className="oc-photo-card group">
              <img
                src="/images/worship-service.jpg"
                alt="365 Daily Devotion"
                className="oc-photo-card-img"
                loading="lazy"
              />
              <span className="oc-card-badge-overlay oc-badge-navy">
                {isKm ? "ព្រះបន្ទូល ៣៦៥ ថ្ងៃ" : "365 Devotions"}
              </span>
            </Link>

            {/* Card 3: Library */}
            <Link href="/library" className="oc-photo-card group">
              <img
                src="/images/all-nations-institute-campus.jpg"
                alt="Theological Library"
                className="oc-photo-card-img"
                loading="lazy"
              />
              <span className="oc-card-badge-overlay oc-badge-charcoal">
                {isKm ? "បណ្ណាល័យសៀវភៅ" : "Library"}
              </span>
            </Link>

            {/* Card 4: Gallery */}
            <Link href="/gallery" className="oc-photo-card group">
              <img
                src="/images/youth-fellowship-2025-group.jpg"
                alt="Ministry Gallery"
                className="oc-photo-card-img"
                loading="lazy"
              />
              <span className="oc-card-badge-overlay oc-badge-teal">
                {isKm ? "កម្រងរូបភាព" : "Gallery"}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DAILY SCRIPTURE SPOTLIGHT (One Church Editorial Band) */}
      <section className="bg-[#fcfbf9] border-b border-[#dcdfda] py-16 sm:py-24">
        <div className="oc-section py-0">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <p className="oc-eyebrow">
              {currentScripture.tag}
            </p>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#141716] leading-snug">
              {currentScripture.text}
            </blockquote>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#1c5080]">
              — {currentScripture.ref}
            </p>
            <div className="pt-4 flex justify-center gap-3">
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
        </div>
      </section>

      {/* 4. MISSION & CALLING (One Church 2-Column Editorial) */}
      <section className="oc-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="oc-eyebrow">
              {isKm ? "រឿងរ៉ាវ និងបេសកកម្ម" : "Story & Calling"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
              {isKm ? "ចាក់ឫសក្នុងព្រះបន្ទូល និងការកសាងជំនឿ" : "Rooted In Scripture, Growing In Faith"}
            </h2>
            <p className="text-[#626868] text-base leading-relaxed">
              {isKm
                ? "ខ្ញុំជឿជាក់ថា សេចក្តីជំនឿពិតត្រូវតែចាក់ឫសយ៉ាងរឹងមាំនៅក្នុងព្រះបន្ទូលនៃព្រះគម្ពីរ។ បងប្អូនជនជាតិខ្មែរគ្រប់រូប គួរតែមានឱកាសអាន សិក្សា និងយល់ដឹងនូវគោលលទ្ធិព្រះគម្ពីរយ៉ាងស៊ីជម្រៅជាភាសាកំណើតរបស់យើង។"
                : "Enduring faith must be anchored in the inspired Word of God. Cambodian believers deserve rich, authentic theological teaching and devotional companions written with depth in their native Khmer language."}
            </p>
            <p className="text-[#626868] text-base leading-relaxed">
              {isKm
                ? "បម្រើការជាអ្នកដឹកនាំកិច្ចការបម្រើព្រះនៅក្រុមជំនុំអលណេសិន — ដឹកនាំការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្សយុវជន និងការកសាងធនធានស្មារតីឌីជីថល ដើម្បីបំពាក់បំប៉នគ្រីស្ទបរិស័ទជំនាន់ក្រោយ។"
                : "Serving as Ministry Lead at All Nations Church in Phnom Penh — directing biblical teaching, student discipleship, and building digital resources to equip the next generation."}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/about" className="oc-button oc-solid">
                <span>{isKm ? "អានរឿងរ៉ាវពេញលេញ" : "Read Full Story"}</span>
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </Link>
              <Link href="/contact" className="oc-button oc-outline-dark">
                <span>{isKm ? "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត" : "Get In Touch"}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#dcdfda]">
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Pastor Kim Jong Ho and Leader Hun Chet preaching from the pulpit"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5 KEYS TO LIVING A TRULY GREAT LIFE (One Church Numbered Cards) */}
      <section className="bg-white border-y border-[#dcdfda] py-16 sm:py-24">
        <div className="oc-section py-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="oc-eyebrow">
              {isKm ? "សារព្រះបន្ទូលសង្ខេប • មាគ៌ាជីវិត" : "Biblical Wisdom • Life Principles"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
              {isKm
                ? "គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ"
                : "5 Keys to Living a Truly Great Life in Christ"}
            </h2>
            <p className="text-[#626868] text-sm sm:text-base leading-relaxed mt-2">
              {isKm
                ? "យោងតាមព្រះគម្ពីរខ្មែរបកប្រែចាស់ ១៩៥៤ — គោលការណ៍គ្រឹះសម្រាប់ការលូតលាស់ខាងវិញ្ញាណ និងការរស់នៅប្រចាំថ្ងៃ។"
                : "Biblical foundational principles from the 1954 Khmer Scripture for spiritual maturity and everyday purpose."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERMON_KEYS.map((item) => (
              <div
                key={item.number}
                className="bg-[#fcfbf7] border border-[#dcdfda] p-8 flex flex-col justify-between hover:border-[#141716] transition-all"
              >
                <div>
                  <span className="text-xs font-bold text-[#1c5080] tracking-[0.2em] uppercase block mb-3">
                    {item.number} / KEY
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#141716] mb-2">
                    {loc(item.title)}
                  </h3>
                  <p className="text-[#626868] text-sm leading-relaxed mb-4">
                    {loc(item.desc)}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#dcdfda] text-xs font-semibold text-[#1c5080]">
                  {item.ref} • ព្រះគម្ពីរខ្មែរ ១៩៥៤
                </div>
              </div>
            ))}

            {/* Final CTA Card */}
            <div className="bg-[#141716] text-white p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-white/70 tracking-[0.2em] uppercase block mb-3">
                  DEVOTION / REFLECTION
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                  {isKm ? "ស្វែងយល់អត្ថបទពេញលេញ" : "Read The Full Exposition"}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {isKm
                    ? "ការបកស្រាយលម្អិតតាមព្រះគម្ពីរ ការអនុវត្តជាក់ស្តែង និងសំណួរពិចារណាសម្រាប់ការរីកចម្រើនក្នុងជំនឿ។"
                    : "Dive deeper into scriptural applications, pastoral insights, and reflection questions."}
                </p>
              </div>
              <Link href="/articles" className="oc-button oc-white" style={{ width: "fit-content" }}>
                <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Read Articles"}</span>
                <ArrowRightIcon style={{ width: 12, height: 12 }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENT ARTICLES (One Church Editorial Cards) */}
      <section className="oc-section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="oc-eyebrow">
            {isKm ? "អត្ថបទ និងការបង្រៀនថ្មីៗ" : "Latest Articles & Teachings"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
            {isKm ? "អត្ថបទសញ្ជឹងគិត & ការបង្រៀនព្រះបន្ទូល" : "Reflections & Biblical Teaching"}
          </h2>
          <p className="text-[#626868] text-sm sm:text-base leading-relaxed mt-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => {
              const image = getFeaturedImage(post);
              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="oc-card group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 border-b border-[#dcdfda]">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#141716] flex items-center justify-center text-white text-3xl font-bold">
                        H
                      </div>
                    )}
                  </div>
                  <div className="oc-card-body">
                    <span className="text-xs font-bold text-[#1c5080] tracking-[0.16em] uppercase block mb-2">
                      {formatDate(post.date)}
                    </span>
                    <h3
                      className="oc-card-title group-hover:text-[#1c5080] transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="oc-card-sub line-clamp-3">
                      {getExcerptText(post)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#141716] group-hover:text-[#1c5080] pt-2 border-t border-[#dcdfda]">
                      <span>{isKm ? "អានអត្ថបទពេញលេញ" : "Read Full Article"}</span>
                      <ArrowRightIcon style={{ width: 12, height: 12 }} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/articles" className="oc-button oc-outline-dark">
            <span>{isKm ? "មើលអត្ថបទទាំងអស់" : "View All Articles"}</span>
            <ArrowRightIcon style={{ width: 12, height: 12 }} />
          </Link>
        </div>
      </section>

      {/* 7. THEOLOGICAL LIBRARY (One Church Clean Feature) */}
      <section className="bg-white border-t border-[#dcdfda] py-16 sm:py-24">
        <div className="oc-section py-0">
          <div className="bg-[#fcfbf7] border border-[#dcdfda] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <RealBookCover book={BOOKS[0]} size="lg" />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <p className="oc-eyebrow">
                  {isKm ? "បណ្ណាល័យទេវវិទ្យាឌីជីថល • ធនធានសិក្សា" : "Digital Theological Library"}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
                  {isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី" : "Matthew Henry's Commentary"}
                </h2>
                <p className="text-[#626868] text-base leading-relaxed">
                  {isKm
                    ? "អត្ថាធិប្បាយសង្ខេបខម្តងមួយៗលើព្រះគម្ពីរទាំងមូល ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល និស្សិតព្រះគម្ពីរ និងអ្នកជឿទាំងអស់ដែលចង់រីកចម្រើនក្នុងព្រះបន្ទូល។"
                    : "The classic verse-by-verse commentary, provided freely for pastors, teachers, and believers across Cambodia in high quality PDF format."}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
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

      {/* 8. AUTHENTIC MINISTRY MOMENTS (Clean Gallery Showcase) */}
      <section className="bg-[#fcfbf9] border-t border-[#dcdfda] py-16 sm:py-24">
        <div className="oc-section py-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="oc-eyebrow">
              {isKm ? "ទិដ្ឋភាពនៃជីវិត និងការបម្រើព្រះ" : "Life Together In Christ"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141716]">
              {isKm ? "សកម្មភាពនៃការបង្រៀន និងការប្រកបគ្នា" : "Moments from Life & Ministry"}
            </h2>
            <p className="text-[#626868] text-sm sm:text-base leading-relaxed mt-2">
              {isKm
                ? "រូបភាពពិតនៃការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស យុវជន និងការអធិស្ឋានរបស់លោកគ្រូ ហ៊ុន ចិត្ត។"
                : "Authentic glimpses of worship, teaching, prayer, and discipleship in Cambodia."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFE_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#dcdfda] overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={photo.src}
                    alt={loc(photo.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 border-t border-[#dcdfda]">
                  <span className="text-xs font-bold text-[#1c5080] tracking-[0.16em] uppercase block mb-1">
                    {loc(photo.badge)}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-[#141716]">
                    {loc(photo.title)}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery" className="oc-button oc-outline-dark">
              <span>{isKm ? "ចូលមើលកម្រងរូបភាពទាំងអស់" : "Explore Full Gallery"}</span>
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. ONE CHURCH CONNECT BANNER */}
      <ConnectBanner />

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-3xl w-full bg-white border border-[#dcdfda] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={selectedPhoto.src}
                alt={loc(selectedPhoto.title)}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 bg-black/50 text-white hover:bg-black transition-colors"
                aria-label="Close"
              >
                <CloseIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#1c5080] tracking-[0.16em] uppercase block mb-1">
                {loc(selectedPhoto.badge)}
              </span>
              <h3 className="text-xl font-bold uppercase text-[#141716] mb-2">
                {loc(selectedPhoto.title)}
              </h3>
              <p className="text-[#626868] text-sm leading-relaxed">
                {loc(selectedPhoto.description)}
              </p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
