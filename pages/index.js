import { useState, useRef } from "react";
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
import {
  LOGO,
  PASTORS_PULPIT,
  CHURCH_FAMILY,
  BAPTISM_PHOTO,
  YOUTH_PHOTO,
  HERO_COVER,
  WORSHIP_PHOTO,
} from "../lib/media";
import SundayCountdown from "../components/SundayCountdown";
import Toast from "../components/Toast";
import AnnouncementModal from "../components/AnnouncementModal";
import {
  PlayIcon,
  PauseIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
  CloseIcon,
  DownloadIcon,
  UserIcon,
  CheckIcon,
  TelegramIcon,
  FacebookIcon,
  CopyIcon,
  ShareIcon,
} from "../components/Icons";

const CHURCH_VIDEOS = [
  {
    id: "worship",
    title: {
      en: "Sunday Worship Service & Praise",
      km: "ការថ្វាយបង្គំ និងការអធិស្ឋានថ្ងៃអាទិត្យ",
      ko: "주일 예배와 찬양",
      zh: "主日崇拜与赞美",
    },
    duration: "0:28",
    badge: {
      en: "Sunday Worship",
      km: "ការថ្វាយបង្គំ",
      ko: "주일 예배",
      zh: "主日崇拜",
    },
    src: "/videos/church-intro-480p.mp4",
    poster: "/images/hero-cover.jpg",
    description: {
      en: "Heartfelt praise and worship led by our ministry team in the main sanctuary with Hun Chet.",
      km: "ការថ្វាយបង្គំ និងការអធិស្ឋានចេញពីដួងចិត្ត ដឹកនាំដោយក្រុមព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត នៅក្នុងព្រះវិហារ។",
      ko: "본당에서 사역팀이 인도하는 진심 어린 찬양과 예배.",
      zh: "在主会堂由服侍团队带领发自内心的赞美与敬拜。",
    },
  },
  {
    id: "campus",
    title: {
      en: "Church Campus & Grounds Aerial Tour",
      km: "ទិដ្ឋភាពទូទៅនៃបរិវេណព្រះវិហារ",
      ko: "교회 부지 둘러보기",
      zh: "教会园区全景导览",
    },
    duration: "0:18",
    badge: {
      en: "Campus Tour",
      km: "បរិវេណព្រះវិហារ",
      ko: "교회 둘러보기",
      zh: "园区导览",
    },
    src: "/videos/church-campus.mp4",
    poster: "/images/church-campus-poster.jpg",
    description: {
      en: "Scenic aerial view of our church grounds, front gate, and fellowship pavilion in Trapaing Krasang, Phnom Penh.",
      km: "ទិដ្ឋភាពពីលើអាកាសនៃបរិវេណព្រះវិហារ ច្រកទ្វារ និងសាលាប្រកបគ្នានៅភូមិត្រពាំងក្រសាំង រាជធានីភ្នំពេញ។",
      ko: "프놈펜 뜨라뻬앙끄拉상에 있는 교회 부지와 친교 파빌리온 영상.",
      zh: "位于金边 Trapaing Krasang 的教会园区、正门及团契亭全景。",
    },
  },
];

const CHURCH_PHOTOS = [
  {
    src: PASTORS_PULPIT,
    title: {
      en: "Preaching the Word of Truth",
      km: "ការផ្សាយព្រះបន្ទូលនៃសេចក្តីពិត",
      ko: "진리의 말씀 선포",
      zh: "传扬真理之道",
    },
    description: {
      en: "Pastor Kim Jong Ho and Leader Hun Chet ministering and preaching together from the pulpit.",
      km: "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត ដឹកនាំ និងចែកចាយព្រះបន្ទូលរួមគ្នានៅលើវេទិកា។",
      ko: "김종호 목사와 훈 쳇 리더가 강단에서 함께 말씀을 전합니다.",
      zh: "金钟浩牧师与 Hun Chet 传道在讲台上共同传讲神的话语。",
    },
    badge: {
      en: "Pulpit Preaching",
      km: "ការផ្សាយព្រះបន្ទូល",
      ko: "목회자 설교",
      zh: "讲台讲道",
    },
  },
  {
    src: CHURCH_FAMILY,
    title: {
      en: "Our Church Family Gathered",
      km: "គ្រួសារព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត ជួបជុំគ្នា",
      ko: "함께 모인 교회 가족",
      zh: "齐聚一堂的教会大家庭",
    },
    description: {
      en: "All generations together in the sanctuary under the cross of Christ.",
      km: "មនុស្សគ្រប់ជំនាន់ជួបជុំគ្នាក្នុងព្រះវិហារក្រោមឈើឆ្កាងនៃព្រះគ្រីស្ទ។",
      ko: "그리스도의 십자가 아래 모든 세대가 예배당에 함께 모였습니다.",
      zh: "各世代在基督十字架下齐聚圣殿。",
    },
    badge: {
      en: "Sanctuary Family",
      km: "គ្រួសារក្នុងព្រះវិហារ",
      ko: "교회 가족",
      zh: "圣殿家庭",
    },
  },
  {
    src: BAPTISM_PHOTO,
    title: {
      en: "Church Family Baptism Celebration",
      km: "ពិធីបុណ្យជ្រមុជទឹកគ្រួសារក្រុមជំនុំ",
      ko: "교회 가족 세례식 축하",
      zh: "教会大家庭洗礼庆典",
    },
    description: {
      en: "Joyful celebration with our church family celebrating brothers and sisters receiving water baptism.",
      km: "អំណរដ៏អស្ចារ្យជាមួយគ្រួសារក្រុមជំនុំ ខណៈដែលបងប្អូនបានទទួលពិធីបុណ្យជ្រមុជទឹក។",
      ko: "온 교회 가족이 모여 물세례를 받고 새 생명을 얻은 성도들을 축하했습니다.",
      zh: "全教会欢聚庆祝弟兄姊妹受浸归入基督。",
    },
    badge: {
      en: "Water Baptism",
      km: "បុណ្យជ្រមុជទឹក",
      ko: "침례식",
      zh: "浸礼仪式",
    },
  },
  {
    src: YOUTH_PHOTO,
    title: {
      en: "Youth Fellowship Gathering",
      km: "ការជួបជុំយុវជន និងការបណ្តុះសិស្ស",
      ko: "청소년 연합 수련회",
      zh: "青年团契聚会",
    },
    description: {
      en: "Dozens of students, teachers, and leaders gathering for outdoor fellowship, worship, and discipleship.",
      km: "យុវជន លោកគ្រូអ្នកគ្រូ និងអ្នកដឹកនាំជាច្រើននាក់ ជួបជុំគ្នាក្នុងការប្រកបគ្នា ការថ្វាយបង្គំ និងអំណរ។",
      ko: "청소년과 리더들이 야외에서 함께 모여 드린 뜻깊은 수련회.",
      zh: "学生与青年领袖齐聚一堂敬拜并操练门徒。",
    },
    badge: {
      en: "Youth Ministry",
      km: "ព័ន្ធកិច្ចយុវជន",
      ko: "청소년부",
      zh: "青年事工",
    },
  },
];

const SERMON_KEYS = [
  {
    number: "01",
    title: {
      en: "Start with God's Word",
      km: "ចាប់ផ្តើមដោយព្រះបន្ទូលនៃព្រះ",
      ko: "하나님의 말씀으로 시작하라",
      zh: "以神的话语为始",
    },
    ref: "Psalm 119:105",
  },
  {
    number: "02",
    title: {
      en: "Dream Big with God",
      km: "មានក្តីសុបិនធំជាមួយព្រះ",
      ko: "하나님과 함께 큰 꿈을 꾸라",
      zh: "与神一同怀抱远大异象",
    },
    ref: "Jeremiah 29:11",
  },
  {
    number: "03",
    title: {
      en: "Build Character Through Diligence",
      km: "កសាងចរិតលក្ខណៈដោយការឧស្សាហ៍",
      ko: "성실함으로 성품을 빚으라",
      zh: "以勤勉塑造品格",
    },
    ref: "Colossians 3:23",
  },
  {
    number: "04",
    title: {
      en: "Choose Faith-Filled Words",
      km: "ជ្រើសរើសពាក្យសម្តីដែលពោរពេញដោយជំនឿ",
      ko: "믿음이 담긴 말을 선택하라",
      zh: "说充满信心的话语",
    },
    ref: "Proverbs 18:21",
  },
  {
    number: "05",
    title: {
      en: "Keep Your Eyes on Jesus",
      km: "សម្លឹងមើលទៅព្រះយេស៊ូវជានិច្ច",
      ko: "오직 예수님만 바라보라",
      zh: "定睛仰望耶稣",
    },
    ref: "Hebrews 12:2",
  },
];

const BANDS = [
  {
    key: "ministry",
    image: WORSHIP_PHOTO,
    href: "/gallery",
    badge: "Church Ministry",
  },
  {
    key: "teaching",
    image: PASTORS_PULPIT,
    href: "/articles",
    badge: "Biblical Devotionals",
  },
  {
    key: "outreach",
    image: YOUTH_PHOTO,
    href: "/about",
    badge: "Digital Outreach",
  },
];

const FEATURES = [
  { key: "gallery", image: CHURCH_FAMILY, href: "/gallery" },
  { key: "resource", image: "/images/one-to-one-disciple-circle.jpg", href: "/resource" },
  { key: "article", image: PASTORS_PULPIT, href: "/articles" },
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
  const locale = router.locale || "en";

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(CHURCH_VIDEOS[0]);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [isCopiedVerse, setIsCopiedVerse] = useState(false);
  const videoRef = useRef(null);

  const handleCopyVerse = (text, ref) => {
    const fullText = `"${text}" — ${ref}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        setIsCopiedVerse(true);
        setToastMessage(
          locale === "km"
            ? `បានចម្លងខគម្ពីរ ${ref}!`
            : `Copied scripture verse: ${ref}`
        );
        setTimeout(() => setIsCopiedVerse(false), 2500);
      });
    }
  };

  const handleShareVerse = async (text, ref) => {
    const fullText = `"${text}" — ${ref} • Hun Chet Ministry`;
    const url = typeof window !== "undefined" ? window.location.href : "https://hunchet.blog";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Verse of the Day — ${ref}`,
          text: fullText,
          url: url,
        });
        return;
      } catch (e) {
        // Fallback to Telegram
      }
    }
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(fullText)}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
    setToastMessage(
      locale === "km" ? "បើកការចែករំលែកតាម Telegram..." : "Opening Telegram share..."
    );
  };

  const leadPost = posts && posts.length > 0 ? posts[0] : null;
  const secondaryPosts = posts && posts.length > 1 ? posts.slice(1, 4) : [];

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

  const handleDownloadSundayCalendar = () => {
    if (typeof window === "undefined") return;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Hun Chet Ministry//Sunday Service//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Sunday Worship Service with Hun Chet (ការថ្វាយបង្គំថ្ងៃអាទិត្យ)",
      "DESCRIPTION:Sunday Worship: 10:00 AM – 11:30 AM | Sunday School: 10:00 AM – 11:00 AM | Small Groups: 1:00 PM – 2:00 PM. Meet us at Trapaing Krasang Village, Khan Por Senchey, Phnom Penh. Simultaneous Khmer and English translation available.",
      "LOCATION:Trapaing Krasang Village, Sangkat Trapeang Krasaing, Khan Por Senchey, Phnom Penh",
      "RRULE:FREQ=WEEKLY;BYDAY=SU",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "hun-chet-sunday-service.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareTelegram = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/articles`;
    const text = encodeURIComponent(
      `5 Keys to Living a Truly Great Life in Christ — Hun Chet Ministry\n\n` +
      `1. Start with God's Word (Ps 119:105)\n` +
      `2. Dream Big with God (Jer 29:11)\n` +
      `3. Build Character Through Diligence (Col 3:23)\n` +
      `4. Choose Faith-Filled Words (Prov 18:21)\n` +
      `5. Keep Eyes on Jesus (Heb 12:2)\n\n` +
      `Read full reflections at: ${url}`
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

  const currentScripture = scriptureData[locale] || scriptureData.en;

  const loc = (obj) => {
    if (!obj) return "";
    return obj[locale] || obj.en || "";
  };

  return (
    <>
      <Head>
        <title>Hun Chet — Faith, Scripture &amp; Pastoral Ministry</title>
        <meta
          name="description"
          content="Biblical teaching, pulpit preaching, and faith resources by Leader Hun Chet, Phnom Penh, Cambodia."
        />
        <meta property="og:title" content="Hun Chet — Faith &amp; Ministry" />
        <meta
          property="og:description"
          content="Biblical teaching, pulpit preaching, and faith resources by Leader Hun Chet."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={HERO_COVER} />
      </Head>

      <SiteHeader />

      {/* 1. HERO SECTION — Dynamic Worship Video Background & Stately Classic Typography */}
      <section className="hero">
        <div className="hero-video-wrap">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            poster={HERO_COVER}
            className="hero-video"
          >
            <source src="/videos/church-intro-480p.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="hero-vignette" />

        {/* Ambient Video Audio Controls */}
        <div className="hero-media-controls">
          <button
            type="button"
            onClick={toggleHeroMute}
            aria-label={isHeroMuted ? "Unmute worship sound" : "Mute worship sound"}
            className="hero-ctrl-btn"
          >
            {isHeroMuted ? (
              <>
                <VolumeOffIcon />
                <span>{locale === "km" ? "បើកសំឡេង" : "Sound On"}</span>
              </>
            ) : (
              <>
                <VolumeOnIcon style={{ color: "var(--gold)" }} />
                <span style={{ color: "var(--gold)" }}>{locale === "km" ? "សំឡេងបើក" : "Sound On"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleHeroPlay}
            aria-label={isHeroPlaying ? "Pause video" : "Play video"}
            className="hero-ctrl-btn"
            style={{ padding: "0.4rem" }}
          >
            {isHeroPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        <div className="hero-inner">
          <span className="hero-eyebrow-classic">
            {locale === "km"
              ? "ហ៊ុន ចិត្ត • ព័ន្ធកិច្ច និងការបង្រៀនព្រះបន្ទូល"
              : "Hun Chet • Faith, Scripture & Ministry"}
          </span>

          <h1 className="hero-title-classic">
            {locale === "km"
              ? "ចាក់ឬសក្នុងជំនឿ • ផ្សាយដំណឹងល្អនៃព្រះគ្រីស្ទ"
              : "Rooted in Faith. Proclaiming Christ across Cambodia."}
          </h1>

          <h2 className="hero-sub-classic">
            {locale === "km"
              ? "ការបង្រៀនព្រះបន្ទូល ការផ្សាយនៅលើវេទិកា និងការបណ្តុះសិស្សជំនាន់ក្រោយ"
              : "Biblical Exposition, Pastoral Preaching & Next-Gen Discipleship"}
          </h2>

          <div className="hero-divider-classic" />

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.12rem)",
              color: "#f1f5f9",
              maxWidth: "680px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            {locale === "km"
              ? "សូមស្វាគមន៍មកកាន់គេហទំព័រផ្លូវការរបស់លោកគ្រូ ហ៊ុន ចិត្ត — ដឹកនាំព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត (Hun Chet Ministry) ជាមួយការបង្រៀនព្រះគម្ពីរ ធនធានសៀវភៅ និងការលើកទឹកចិត្តសម្រាប់ដំណើរជំនឿរបស់អ្នក។"
              : "Official website of Leader Hun Chet — ministering and preaching in Phnom Penh, sharing scripture devotionals, digital media, and Christ-centered hope."}
          </p>

          <div className="hero-actions" style={{ gap: "1rem" }}>
            <Link href="/articles" className="btn btn-primary">
              {t("home.readArticles")} →
            </Link>

            <button
              type="button"
              onClick={() => {
                setSelectedVideo(CHURCH_VIDEOS[0]);
                setIsVideoModalOpen(true);
              }}
              className="btn btn-gold-glass"
            >
              <PlayIcon />
              <span>{locale === "km" ? "ទស្សនាវីដេអូក្រុមជំនុំ" : "Watch Church Video"}</span>
            </button>

            <Link href="/about" className="btn btn-outline-light">
              {t("home.aboutUs")}
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* 2. WEEKLY SUNDAY WORSHIP ANNOUNCEMENT BOX */}
        <div className="container" style={{ marginTop: "-2.5rem", position: "relative", zIndex: 10 }}>
          <div className="announcement-box">
            <div className="announcement-grid">
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--gold)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  <CalendarIcon style={{ width: 14, height: 14 }} />
                  {locale === "km" ? "ការជួបជុំប្រចាំសប្តាហ៍" : "Weekly Church Gathering"}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                    color: "var(--navy-dark)",
                    margin: "0 0 0.75rem",
                    lineHeight: 1.25,
                  }}
                >
                  {locale === "km"
                    ? "សូមអញ្ជើញចូលរួមថ្វាយបង្គំថ្ងៃអាទិត្យនេះ"
                    : "Join Us This Sunday for Worship & Fellowship"}
                </h3>
                <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  {locale === "km"
                    ? "ជួបជុំគ្នាជាមួយគ្រួសារព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត ក្រោមព្រះបន្ទូលនៃសេចក្តីពិត ការថ្វាយបង្គំដោយស្មោះ និងការប្រកបគ្នាយ៉ាងកក់ក្តៅ។"
                    : "Experience uplifting praise, faithful biblical preaching, and genuine fellowship with our church family in Phnom Penh."}
                </p>
              </div>

              <div className="announcement-meta">
                <div className="announcement-meta-item">
                  <div className="announcement-meta-icon">
                    <ClockIcon />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-dark)", fontSize: "0.95rem" }}>
                      {locale === "km" ? "ម៉ោងថ្វាយបង្គំ" : "Service Times"}
                    </strong>
                    <div style={{ fontSize: "0.88rem", color: "var(--text)" }}>
                      {locale === "km"
                        ? "ព្រឹកថ្ងៃអាទិត្យ 10:00 AM – 11:30 AM (ថ្វាយបង្គំធំ)"
                        : "Sunday Worship: 10:00 AM – 11:30 AM"}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--gold)", fontWeight: 600, marginTop: "2px" }}>
                      {locale === "km"
                        ? "មានការបកប្រែជាភាសាខ្មែរ និងអង់គ្លេស"
                        : "Khmer & English Translation Available"}
                    </div>
                  </div>
                </div>

                <div className="announcement-meta-item">
                  <div className="announcement-meta-icon">
                    <MapPinIcon />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--navy-dark)", fontSize: "0.95rem" }}>
                      {locale === "km" ? "ទីតាំងក្រុមជំនុំ" : "Location"}
                    </strong>
                    <div style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                      {locale === "km"
                        ? "ភូមិត្រពាំងក្រសាំង សង្កាត់ត្រពាំងក្រសាំង ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ"
                        : "Trapaing Krasang Village, Khan Por Senchey, Phnom Penh"}
                    </div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                      <a
                        href="https://maps.app.goo.gl/AzgD3Uan6RLAvyZ98"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "var(--navy)",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        {locale === "km" ? "បង្ហាញផ្លូវ" : "Get Directions"} <ArrowRightIcon style={{ width: 12, height: 12 }} />
                      </a>

                      <button
                        type="button"
                        onClick={handleDownloadSundayCalendar}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "var(--navy)",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <DownloadIcon style={{ width: 12, height: 12 }} />
                        {locale === "km" ? "ដាក់ក្នុងប្រតិទិន" : "Add to Calendar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVideo(CHURCH_VIDEOS[1]);
                          setIsVideoModalOpen(true);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "var(--gold)",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <PlayIcon style={{ width: 12, height: 12 }} />
                        {locale === "km" ? "វីដេអូបរិវេណព្រះវិហារ" : "Campus Tour"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique Live Sunday Gathering Countdown & 1-Click Calendar Sync */}
              <SundayCountdown onPlanVisit={() => setIsAnnouncementModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* 3. DAILY DEVOTION & SCRIPTURE BANNER */}
        <section className="devotion-banner">
          <div className="devotion-banner-bg" />
          <div className="container">
            <div className="devotion-inner">
              <div className="devotion-badge">
                <BookOpenIcon />
                <span>{currentScripture.tag}</span>
              </div>

              <blockquote className="devotion-quote">
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
                  paddingTop: "1rem",
                }}
              >
                <cite className="devotion-ref">— {currentScripture.ref}</cite>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => handleCopyVerse(currentScripture.text, currentScripture.ref)}
                    className="btn btn-secondary"
                    style={{
                      padding: "0.55rem 1.1rem",
                      fontSize: "0.74rem",
                      background: "rgba(255, 255, 255, 0.12)",
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                    }}
                  >
                    {isCopiedVerse ? (
                      <CheckIcon style={{ width: 14, height: 14, color: "var(--gold-light)" }} />
                    ) : (
                      <CopyIcon style={{ width: 14, height: 14 }} />
                    )}
                    <span>
                      {isCopiedVerse
                        ? locale === "km"
                          ? "បានចម្លង!"
                          : "Copied!"
                        : locale === "km"
                        ? "ចម្លងខគម្ពីរ"
                        : "Copy Verse"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShareVerse(currentScripture.text, currentScripture.ref)}
                    className="btn btn-secondary"
                    style={{
                      padding: "0.55rem 1.1rem",
                      fontSize: "0.74rem",
                      background: "rgba(255, 255, 255, 0.12)",
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                    }}
                  >
                    <ShareIcon style={{ width: 14, height: 14 }} />
                    <span>{locale === "km" ? "ចែករំលែក" : "Share"}</span>
                  </button>

                  <Link
                    href="/devotions"
                    className="btn btn-primary"
                    style={{ padding: "0.55rem 1.3rem", fontSize: "0.74rem" }}
                  >
                    <BookOpenIcon style={{ width: 14, height: 14, marginRight: "0.4rem" }} />
                    {locale === "km" ? "អានព្រះបន្ទូលប្រចាំថ្ងៃ" : "Read Daily Devotion"} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PASTORAL LEADERSHIP & PULPIT MINISTRY SPOTLIGHT */}
        <section className="section" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <div className="pulpit-grid">
              {/* Left: Framed Photo */}
              <div className="pulpit-frame">
                <div className="pulpit-frame-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PASTORS_PULPIT}
                    alt="Leader Hun Chet and Pastor Kim Jong Ho preaching from the pulpit"
                  />
                  <div className="pulpit-caption-bar">
                    <span className="pulpit-caption-title">
                      {locale === "km"
                        ? "ភាពជាអ្នកដឹកនាំលើវេទិកាផ្សាយព្រះបន្ទូល"
                        : "Pastoral Leadership at the Pulpit"}
                    </span>
                    <span className="pulpit-caption-sub">
                      {locale === "km"
                        ? "លោកគ្រូ ហ៊ុន ចិត្ត និងលោកគ្រូគង្វាល គីម ជុងហូ"
                        : "Leader Hun Chet & Senior Pastor Kim Jong Ho"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Narrative & Heart for Ministry */}
              <div>
                <span className="eyebrow" style={{ color: "var(--navy)", borderColor: "var(--gold)" }}>
                  {locale === "km" ? "ការត្រាស់ហៅ និងព័ន្ធកិច្ច" : "Calling & Pastoral Ministry"}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                    color: "var(--navy-dark)",
                    margin: "0 0 1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {locale === "km"
                    ? "ការផ្សាយដំណឹងល្អដោយសេចក្តីពិត និងជំនឿ"
                    : "Preaching the Gospel with Conviction & Truth"}
                </h2>

                <div className="hero-divider-classic" style={{ margin: "0 0 1.5rem" }} />

                <p style={{ color: "var(--text)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {locale === "km"
                    ? "លោកគ្រូ ហ៊ុន ចិត្ត បានបូជាជីវិត និងព័ន្ធកិច្ចក្នុងការបង្រៀនព្រះបន្ទូលដ៏ស្មោះត្រង់ ការបណ្តុះបណ្តាលសិស្ស និងការដឹកនាំយុវជនក្នុងព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត (Hun Chet Ministry)។ តាមរយៈការអធិប្បាយ ការនិពន្ធសៀវភៅ និងព័ន្ធកិច្ចឌីជីថល «មិត្តពិតកម្ពុជា» ព្រះបន្ទូលនៃព្រះត្រូវបានផ្សព្វផ្សាយទៅកាន់មនុស្សរាប់ពាន់នាក់នៅទូទាំងកម្ពុជា។"
                    : "Serving in pulpit preaching and ministry leadership alongside Senior Pastor Kim Jong Ho, Hun Chet is devoted to biblical clarity, discipleship of young leaders, and reaching the nation through digital media and theological literature."}
                </p>

                <div
                  className="pulpit-stats-strip"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    marginBottom: "1.75rem",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "1.5rem", color: "var(--navy-dark)", display: "block" }}>12+</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {locale === "km" ? "ឆ្នាំក្នុងព័ន្ធកិច្ច" : "Years Ministry"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ fontSize: "1.5rem", color: "var(--navy-dark)", display: "block" }}>50K+</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {locale === "km" ? "អ្នកទស្សនាប្រចាំខែ" : "Monthly Reach"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ fontSize: "1.5rem", color: "var(--navy-dark)", display: "block" }}>100+</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {locale === "km" ? "អត្ថបទ និងសារព្រះបន្ទូល" : "Articles & Sermons"}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/about" className="btn btn-primary">
                    {locale === "km" ? "ស្វែងយល់អំពីរឿងរ៉ាវរបស់យើង" : "Explore Our Story"} →
                  </Link>
                  <Link href="/gallery" className="btn btn-outline">
                    {locale === "km" ? "មើលកម្រងរូបភាព" : "View Church Gallery"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FEATURED SHORT SERMON (5 KEYS) SPOTLIGHT */}
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
                {locale === "km"
                  ? "សារព្រះបន្ទូលពិសេស • មាគ៌ាឆ្ពោះទៅកាន់គោលបំណងជីវិត"
                  : "Featured Short Sermon • A Path to Purpose"}
              </span>

              <h2 style={{ fontFamily: "var(--font-display)", color: "#ffffff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
                {locale === "km"
                  ? "គន្លឹះ ៥ យ៉ាងដើម្បីរស់នៅប្រកបដោយអត្ថន័យក្នុងព្រះគ្រីស្ទ"
                  : "5 Keys to Living a Truly Great Life in Christ"}
              </h2>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", color: "#cbd5e1", fontSize: "0.85rem" }}>
                <UserIcon style={{ width: 14, height: 14, color: "var(--gold)" }} />
                <span>{locale === "km" ? "អធិប្បាយដោយ៖" : "Preached by:"}</span>
                <strong style={{ color: "var(--gold)" }}>{locale === "km" ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}</strong>
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
                  {locale === "km" ? "គន្លឹះទាំង ៥ យ៉ាងសង្ខេប" : "The 5 Foundational Keys"}
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
                      {locale === "km" ? "ខគម្ពីរគោល" : "Foundational Verse"}
                    </span>
                  </div>

                  <blockquote>
                    {locale === "km"
                      ? "«ដ្បិតយើងដឹងពីគំនិតដែលយើងគិតពីឯងរាល់គ្នា គឺសុទ្ធតែជាគំនិតនៃសេចក្តីសុខសាន្ត មិនមែនជាគំនិតនៃសេចក្តីអាក្រក់ឡើយ ដើម្បីឲ្យឯងរាល់គ្នាមានសង្ឃឹមនៅចុងបំផុត»"
                      : "“For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.”"}
                  </blockquote>
                  <cite>— {locale === "km" ? "យេរេមា ២៩:១១" : "Jeremiah 29:11"}</cite>
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
                    {locale === "km" ? "អានអត្ថបទពេញលេញ និងចែកចាយ" : "Read Full Reflection & Share"}
                  </strong>
                  <p style={{ fontSize: "0.82rem", color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                    {locale === "km"
                      ? "ការបកស្រាយលម្អិតតាមព្រះគម្ពីរ ការអនុវត្តជាក់ស្តែង និងសំណួរពិចារណា។"
                      : "Complete with biblical exposition, practical daily applications, and reflection questions."}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                    <Link href="/articles" className="btn btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.72rem" }}>
                      {locale === "km" ? "អានអត្ថបទ" : "Read Article"} →
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

        {/* 6. CHURCH LIFE & AUTHENTIC PHOTO GALLERY */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ color: "var(--navy)", borderColor: "var(--gold)" }}>
                {locale === "km" ? "ជីវិតរួមគ្នាក្នុងជំនឿ" : "Church Life & Action"}
              </span>
              <h2>{locale === "km" ? "ទិដ្ឋភាពនៃព័ន្ធកិច្ច និងសហគមន៍" : "Our Church in Action"}</h2>
              <p style={{ maxWidth: "640px", margin: "0 auto" }}>
                {locale === "km"
                  ? "ទិដ្ឋភាពពិតនៃការថ្វាយបង្គំ ការអធិស្ឋាន ពិធីបុណ្យជ្រមុជទឹក និងការបណ្តុះសិស្សក្នុងព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
                  : "Authentic glimpses of worship, prayer, water baptism, and generational discipleship with Hun Chet."}
              </p>
              <div className="hero-divider-classic" style={{ margin: "1rem auto 0" }} />
            </div>

            <div className="anc-photo-grid">
              {CHURCH_PHOTOS.map((photo, idx) => (
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
                {locale === "km" ? "ចូលមើលកម្រងរូបភាពទាំងអស់" : "Explore Full Church Gallery"} →
              </Link>
            </div>
          </div>
        </section>

        {/* 7. RECENT ARTICLES (MAGAZINE SPOTLIGHT) */}
        <section className="section">
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
                    {locale === "km" ? "អត្ថបទពិសេស" : "Featured Reflection"}
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

        {/* 8. MINISTRY PILLARS (THE 3 CORE PILLARS) */}
        <section className="section section-alt">
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
                    <span className="pillar-link">{t(`band.${band.key}Cta`)} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 9. EXPLORE MULTIMEDIA & RESOURCES */}
        <section className="section">
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
                    <span className="feature-card-link">{t("common.explore")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. KINGDOM PARTNERSHIP & NEXT STEPS BANNER */}
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
                  {locale === "km" ? "ចូលរួមក្នុងកិច្ចការនគរព្រះ" : "Join Hands in the Gospel"}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    color: "#ffffff",
                    margin: "0 0 1rem",
                  }}
                >
                  {locale === "km"
                    ? "ត្រៀមខ្លួនដើម្បីដើរជាមួយគ្នាក្នុងដំណើរជំនឿ?"
                    : "Ready to partner with our ministry across Cambodia?"}
                </h2>

                <p style={{ color: "#cbd5e1", lineHeight: 1.7, margin: 0, fontSize: "1rem" }}>
                  {locale === "km"
                    ? "មិនថាអ្នកចង់ចូលរួមជាដៃគូអធិស្ឋាន គាំទ្រការបង្រៀនព្រះបន្ទូល ឬចង់សួរសំណួរអំពីសេចក្តីជំនឿ យើងរីករាយនឹងស្វាគមន៍អ្នក។"
                    : "Whether you wish to support biblical teaching, join us in prayer, or connect with our church family, we would love to hear from you."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flexShrink: 0 }}>
                <Link href="/partner-with-us" className="btn btn-primary">
                  {locale === "km" ? "ចូលរួមជាដៃគូ" : "Partner With Us"} →
                </Link>
                <a
                  href="https://t.me/+855966875886"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold-glass"
                >
                  <TelegramIcon style={{ width: 14, height: 14, marginRight: "0.4rem" }} />
                  <span>Telegram</span>
                </a>
                <Link href="/contact" className="btn btn-outline-light">
                  {t("home.getInTouch")}
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

      {/* FULL CHURCH VIDEO SHOWCASE MODAL */}
      {isVideoModalOpen && selectedVideo && (
        <div className="anc-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="anc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="anc-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", overflow: "hidden" }}>
                <PlayIcon style={{ width: 14, height: 14, color: "var(--gold)", flexShrink: 0 }} />
                <h3 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {loc(selectedVideo.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="anc-modal-close"
                aria-label="Close video player"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="anc-video-player-wrap">
              <video
                key={selectedVideo.id}
                autoPlay
                controls
                playsInline
                poster={selectedVideo.poster}
              >
                <source src={selectedVideo.src} type="video/mp4" />
              </video>
            </div>

            <div className="anc-video-playlist-bar">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {locale === "km" ? "ជ្រើសរើសវីដេអូទស្សនា៖" : "Select Video To Watch:"}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--gold)" }}>
                  {loc(selectedVideo.badge)} • {selectedVideo.duration}
                </span>
              </div>

              <div className="anc-playlist-grid">
                {CHURCH_VIDEOS.map((vid) => {
                  const isActive = vid.id === selectedVideo.id;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setSelectedVideo(vid)}
                      className={`anc-playlist-btn ${isActive ? "is-active" : ""}`}
                    >
                      <PlayIcon style={{ width: 14, height: 14, flexShrink: 0, fill: isActive ? "var(--navy-dark)" : "var(--gold)" }} />
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {loc(vid.title)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="anc-modal-footer">
              <div style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                <strong style={{ color: "#ffffff", display: "block" }}>{loc(selectedVideo.description)}</strong>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                  Trapaing Krasang Village, Khan Por Senchey, Phnom Penh
                </span>
              </div>

              <Link
                href="/about"
                onClick={() => setIsVideoModalOpen(false)}
                className="btn btn-primary"
                style={{ padding: "0.55rem 1.15rem", fontSize: "0.72rem", whiteSpace: "nowrap" }}
              >
                {locale === "km" ? "អំពីរឿងរ៉ាវយើង" : "Our Church Story"} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sunday Announcement & Service Flyer Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        locale={locale}
      />

      {/* Floating Luxury Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

      <SiteFooter />
    </>
  );
}
