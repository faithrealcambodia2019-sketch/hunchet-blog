import { useState, useMemo, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT, useLocale, pick } from "../lib/i18n";
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  SearchIcon,
  PlayIcon,
  PauseIcon,
  CopyIcon,
  BookmarkIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TelegramIcon,
  UserIcon,
  CloseIcon,
} from "../components/Icons";
import {
  YEAR_MONTHS,
  YEAR_DEVOTIONS_365,
  getTodayDevotion,
  getDevotionByDayOfYear,
  getDevotionByDate,
  calculateYearProgress,
} from "../lib/yearDevotionsData";
import {
  FAMOUS_KHMER_CATEGORIES,
  FAMOUS_KHMER_VERSES,
} from "../lib/famousKhmerVersesData";

const STRINGS = {
  heroEyebrow: {
    en: "All Nations Church Phnom Penh • Daily Bread",
    km: "ក្រុមជំនុំ អល ណេសិន ភ្នំពេញ • ព្រះបន្ទូលប្រចាំថ្ងៃ",
    ko: "프놈펜 올네이션스 교회 • 매일의 양식",
    zh: "金边万民教会 • 每日旷野吗哪",
  },
  heroTitle: {
    en: "Daily Devotions & 365 Scripture Sanctuary",
    km: "ព្រះបន្ទូលប្រចាំថ្ងៃ និងទីជម្រកព្រះគម្ពីរ ៣៦៥ ថ្ងៃ",
    ko: "매일 묵상과 365일 성경 안식처",
    zh: "每日灵修与365天圣经安息地",
  },
  heroSub: {
    en: "Verbatim 1954/1962 Old Khmer Version scripture, daily biblical reflections, life applications, and pastoral prayers for quiet time and discipleship.",
    km: "ព្រះគម្ពីរភាសាខ្មែរបកប្រែចាស់ ១៩៥៤ Verbatim ការពិចារណាព្រះបន្ទូល សំណួរអនុវត្ត និងសេចក្តីអធិស្ឋានប្រចាំថ្ងៃ សម្រាប់ជីវិតស្ងប់ស្ងាត់ និងការបណ្តុះសិស្ស។",
    ko: "1954/1962 크메르어 고역 성경 원문과 묵상, 나눔 질문 및 목회 기도문.",
    zh: "1954/1962高棉语传统圣经原文经文、每日默想、应用省思与教牧祷告。",
  },
  tabToday: {
    en: "Today's Devotion",
    km: "ព្រះបន្ទូលថ្ងៃនេះ",
    ko: "오늘의 묵상",
    zh: "今日灵修",
  },
  tabCalendar: {
    en: "365-Day Journey",
    km: "ដំណើរជីវិត ៣៦៥ ថ្ងៃ",
    ko: "365일 묵상 여정",
    zh: "365天灵修历程",
  },
  tabVerses: {
    en: "500 Famous Verses",
    km: "៥០០ ខគម្ពីរល្បីៗ",
    ko: "500 구절 성경 말씀",
    zh: "500节经典金句",
  },
  btnListen: {
    en: "Listen Audio",
    km: "ស្តាប់ព្រះបន្ទូល",
    ko: "말씀 듣기",
    zh: "聆听圣经",
  },
  btnStop: {
    en: "Stop Audio",
    km: "បញ្ឈប់សម្លេង",
    ko: "정지",
    zh: "停止播放",
  },
  btnCopy: {
    en: "Copy Scripture",
    km: "ចម្លងព្រះបន្ទូល",
    ko: "말씀 복사",
    zh: "复制经文",
  },
  btnShareTelegram: {
    en: "Telegram",
    km: "Telegram",
    ko: "텔레그램",
    zh: "Telegram",
  },
  btnMarkRead: {
    en: "Mark as Read",
    km: "សម្គាល់ថាបានអាន",
    ko: "읽음 표시",
    zh: "标记已读",
  },
  btnReadCompleted: {
    en: "Completed",
    km: "បានអានរួច",
    ko: "완료됨",
    zh: "已完成",
  },
  btnPrev: {
    en: "← Previous Day",
    km: "← ថ្ងៃមុន",
    ko: "← 이전 날",
    zh: "← 前一天",
  },
  btnNext: {
    en: "Next Day →",
    km: "ថ្ងៃបន្ទាប់ →",
    ko: "다음 날 →",
    zh: "后一天 →",
  },
  btnTodayJump: {
    en: "Jump to Today",
    km: "ត្រឡប់មកថ្ងៃនេះ",
    ko: "오늘로 이동",
    zh: "回到今天",
  },
  reflectionTitle: {
    en: "Biblical Reflection & Meditation",
    km: "ការពិចារណា និងការរំពឹងគិត",
    ko: "말씀 묵상과 교훈",
    zh: "真理默想与反思",
  },
  pastorInsight: {
    en: "Leader Hun Chet's Pastoral Exposition",
    km: "ការពិចារណា និងពន្លឺព្រះបន្ទូល • លោកគ្រូ ហ៊ុន ចិត្ត",
    ko: "훈 쳇 목회자 강해와 묵상",
    zh: "洪哲牧者解经与默想",
  },
  keyTruth: {
    en: "Foundational Truth",
    km: "សេចក្តីពិតគ្រឹះ",
    ko: "핵심 진리",
    zh: "核心真理",
  },
  applicationTitle: {
    en: "Practical Life Application",
    km: "សំណួរអនុវត្តជីវិត",
    ko: "삶의 적용과 실천",
    zh: "生活应用与问答",
  },
  prayerTitle: {
    en: "Guided Pastoral Prayer",
    km: "សេចក្តីអធិស្ឋានដឹកនាំ",
    ko: "목회자 인도 기도문",
    zh: "教牧导引祷告",
  },
  amenSeal: {
    en: "In Jesus' Holy Name, Amen.",
    km: "ក្នុងព្រះនាមព្រះអម្ចាស់យេស៊ូវគ្រីស្ទ អាម៉ែន។",
    ko: "예수 그리스도의 이름으로 기도합니다. 아멘.",
    zh: "奉主耶稣基督圣名祈求，阿们。",
  },
  progressTitle: {
    en: "Annual Spiritual Journey Progress",
    km: "វឌ្ឍនភាពដំណើរខាងវិញ្ញាណប្រចាំឆ្នាំ",
    ko: "연간 묵상 여정 진행 현황",
    zh: "年度属灵成长进度",
  },
  searchPlaceholder: {
    en: "Search 500 verses by reference, keyword, or book...",
    km: "ស្វែងរកខគម្ពីរ តាមជំពូក ខ ឬពាក្យគន្លឹះ...",
    ko: "성경 구절, 키워드 또는 본문 검색...",
    zh: "搜索经文出处、关键词或章节...",
  },
  showMore: {
    en: "Load More Verses",
    km: "បង្ហាញខគម្ពីរបន្ថែម",
    ko: "말씀 더 보기",
    zh: "加载更多经文",
  },
  openDevotion: {
    en: "Open Devotion",
    km: "មើលការពិចារណា",
    ko: "묵상 보기",
    zh: "查看灵修",
  },
  langAll: {
    en: "All Translations",
    km: "គ្រប់ភាសា",
    ko: "모든 번역",
    zh: "全部语言",
  },
  langKm: {
    en: "Khmer (1954)",
    km: "ភាសាខ្មែរ (១៩៥៤)",
    ko: "크메르어 (1954)",
    zh: "高棉语 (1954)",
  },
  langEn: {
    en: "English (WEB)",
    km: "អង់គ្លេស (WEB)",
    ko: "영어 (WEB)",
    zh: "英语 (WEB)",
  },
  langKo: {
    en: "Korean (한국어)",
    km: "កូរ៉េ (한국어)",
    ko: "한국어",
    zh: "韩语",
  },
  dayPreviewTitle: {
    en: "Selected Day Scripture Preview",
    km: "មើលព្រះបន្ទូលសង្ខេបនៃថ្ងៃជ្រើសរើស",
    ko: "선택한 날짜 말씀 미리보기",
    zh: "所选日期经文预览",
  },
  readFullDevotion: {
    en: "Read Full Day Devotion →",
    km: "អានការពិចារណាពេញលេញ →",
    ko: "전체 묵상 읽기 →",
    zh: "阅读完整灵修 →",
  },
};

export default function DevotionsPage() {
  const t = useT();
  const locale = useLocale();

  // Active navigation states
  const [activeTab, setActiveTab] = useState("today"); // 'today' | 'calendar' | 'verses'
  const [currentDevotion, setCurrentDevotion] = useState(() => getTodayDevotion());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [previewDay, setPreviewDay] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleVersesCount, setVisibleVersesCount] = useState(24);
  const [completedDays, setCompletedDays] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeScriptureLang, setActiveScriptureLang] = useState("all"); // 'all' | 'km' | 'en' | 'ko'

  // Initialize client-side state
  useEffect(() => {
    const today = getTodayDevotion();
    setCurrentDevotion(today);
    setSelectedMonth(today.month || 1);
    setPreviewDay(today);

    try {
      const saved = localStorage.getItem("anc_devotions_completed");
      if (saved) {
        setCompletedDays(JSON.parse(saved));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Toast timer
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Audio speech synthesis cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop audio on tab change
  const handleTabChange = (tab) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setActiveTab(tab);
  };

  // Toggle mark as read
  const handleToggleRead = (id) => {
    const next = completedDays.includes(id)
      ? completedDays.filter((item) => item !== id)
      : [...completedDays, id];
    setCompletedDays(next);
    try {
      localStorage.setItem("anc_devotions_completed", JSON.stringify(next));
    } catch {
      // ignore
    }
    setToastMessage(
      next.includes(id)
        ? pick(
            {
              en: "Marked day as completed in your spiritual journey.",
              km: "បានកត់ត្រាការអានរួចរាល់ក្នុងដំណើររបស់អ្នក។",
              ko: "오늘의 묵상을 완료로 표시했습니다.",
              zh: "已标记今日灵修已完成。",
            },
            locale
          )
        : pick(
            {
              en: "Mark removed.",
              km: "បានលុបការសម្គាល់។",
              ko: "완료 표시가 취소되었습니다.",
              zh: "已取消完成标记。",
            },
            locale
          )
    );
  };

  // Copy scripture
  const handleCopyScripture = (dev) => {
    if (!dev) return;
    const ref = dev.verse?.ref?.km || dev.verse?.ref?.en || "";
    const km = dev.verse?.text?.km || "";
    const en = dev.verse?.text?.en || "";
    const shareText = `【${ref}】\n\n${km}\n\n${en}\n\nAll Nations Church Phnom Penh • Daily Devotion`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(shareText);
      setToastMessage(
        pick(
          {
            en: "Scripture copied to clipboard!",
            km: "បានចម្លងព្រះបន្ទូលរួចរាល់!",
            ko: "성경 구절이 클립보드에 복사되었습니다!",
            zh: "经文已复制到剪贴板！",
          },
          locale
        )
      );
    }
  };

  // Share to Telegram
  const handleShareTelegram = (dev) => {
    if (!dev) return;
    const ref = dev.verse?.ref?.km || dev.verse?.ref?.en || "";
    const km = dev.verse?.text?.km || "";
    const en = dev.verse?.text?.en || "";
    const text = `📖 ព្រះបន្ទូលប្រចាំថ្ងៃ • All Nations Church\n【${ref}】\n\n«${km}»\n\n“${en}”\n\nដឹកនាំដោយលោកគ្រូ ហ៊ុន ចិត្ត (Leader Hun Chet)`;
    const url = typeof window !== "undefined" ? window.location.href : "https://hunchet.org/devotions";
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Copy individual verse
  const handleCopyVerse = (v) => {
    if (!v) return;
    const ref = v.ref?.km || v.ref?.en || "";
    const km = v.text?.km || "";
    const en = v.text?.en || "";
    const shareText = `【${ref}】\n\n${km}\n\n${en}\n\n1954 Old Khmer Version • All Nations Church`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(shareText);
      setToastMessage(
        pick(
          {
            en: "Verse copied to clipboard!",
            km: "បានចម្លងខគម្ពីររួចរាល់!",
            ko: "성경 말씀이 복사되었습니다!",
            zh: "金句已复制到剪贴板！",
          },
          locale
        )
      );
    }
  };

  // Audio Play / Pause
  const handleToggleAudio = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setToastMessage(
        pick(
          {
            en: "Audio playback is not supported on this browser.",
            km: "កម្មវិធីរុករកនេះមិនគាំទ្រការចាក់សម្លេងឡើយ។",
            ko: "이 브라우저에서는 음성 읽기를 지원하지 않습니다.",
            zh: "当前浏览器不支持语音播报功能。",
          },
          locale
        )
      );
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = currentDevotion.verse?.text?.en || "";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Jump to specific day
  const handleSelectDay = (dayOfYear, shouldScroll = true) => {
    const target = getDevotionByDayOfYear(dayOfYear);
    if (target) {
      setCurrentDevotion(target);
      setPreviewDay(target);
      setActiveTab("today");
      if (shouldScroll && typeof window !== "undefined") {
        window.scrollTo({ top: 380, behavior: "smooth" });
      }
    }
  };

  // Previous & Next navigation
  const handlePrevDay = () => {
    const cur = currentDevotion.dayOfYear || 1;
    const prev = cur > 1 ? cur - 1 : 365;
    handleSelectDay(prev);
  };

  const handleNextDay = () => {
    const cur = currentDevotion.dayOfYear || 1;
    const next = cur < 365 ? cur + 1 : 1;
    handleSelectDay(next);
  };

  const handleJumpToday = () => {
    const today = getTodayDevotion();
    setCurrentDevotion(today);
    setPreviewDay(today);
  };

  // Filter 500 verses
  const filteredVerses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAMOUS_KHMER_VERSES.filter((v) => {
      const matchCat =
        activeCategory === "all" || v.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const kmRef = (v.ref?.km || "").toLowerCase();
      const enRef = (v.ref?.en || "").toLowerCase();
      const kmText = (v.text?.km || "").toLowerCase();
      const enText = (v.text?.en || "").toLowerCase();
      return (
        kmRef.includes(q) ||
        enRef.includes(q) ||
        kmText.includes(q) ||
        enText.includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const displayedVerses = useMemo(() => {
    return filteredVerses.slice(0, visibleVersesCount);
  }, [filteredVerses, visibleVersesCount]);

  // Statistics
  const progress = useMemo(() => {
    return calculateYearProgress(completedDays);
  }, [completedDays]);

  const activeMonthData = useMemo(() => {
    return (
      YEAR_MONTHS.find((m) => m.month === selectedMonth) || YEAR_MONTHS[0]
    );
  }, [selectedMonth]);

  const isTodayActive = useMemo(() => {
    const today = getTodayDevotion();
    return currentDevotion?.dayOfYear === today.dayOfYear;
  }, [currentDevotion]);

  const isCurrentCompleted = useMemo(() => {
    return completedDays.includes(currentDevotion?.id);
  }, [completedDays, currentDevotion]);

  return (
    <>
      <Head>
        <title>{`${pick(STRINGS.heroTitle, locale)} — Hun Chet • All Nations Church`}</title>
        <meta
          name="description"
          content={pick(STRINGS.heroSub, locale)}
        />
        <meta
          property="og:title"
          content={`${pick(STRINGS.heroTitle, locale)} — Hun Chet`}
        />
        <meta
          property="og:description"
          content={pick(STRINGS.heroSub, locale)}
        />
        <meta property="og:image" content="/images/open-bible-morning.jpg" />
      </Head>

      <SiteHeader />

      {/* 1. STATELY HERO BANNER */}
      <section className="devotion-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/open-bible-morning.jpg"
          alt="Sanctuary Devotions"
          className="devotion-hero-bg"
          aria-hidden="true"
        />
        <div className="devotion-hero-overlay" aria-hidden="true" />

        <div className="devotion-hero-content">
          <div className="devotion-badge-tag">
            <BookOpenIcon />
            <span>{pick(STRINGS.heroEyebrow, locale)}</span>
          </div>

          <h1 className="devotion-hero-title">
            {pick(STRINGS.heroTitle, locale)}
          </h1>
          <p className="devotion-hero-sub">
            {pick(STRINGS.heroSub, locale)}
          </p>

          <div className="devotion-gold-divider" />

          <div className="devotion-stats-strip">
            <div className="devotion-stat-item">
              <span className="devotion-stat-dot" />
              <span>365 Daily Bread Journeys</span>
            </div>
            <div className="devotion-stat-item">
              <span className="devotion-stat-dot" />
              <span>1954 Verbatim Old Khmer</span>
            </div>
            <div className="devotion-stat-item">
              <span className="devotion-stat-dot" />
              <span>Audio Scripture Listening</span>
            </div>
            <div className="devotion-stat-item">
              <span className="devotion-stat-dot" />
              <span>Guided Pastoral Prayers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FLOATING TABS CONTROLLER */}
      <nav className="devotion-tabs-bar" aria-label="Devotions Navigation">
        <div className="container devotion-tabs-container">
          <div className="devotion-tabs-list">
            <button
              type="button"
              className={`devotion-tab-btn ${
                activeTab === "today" ? "is-active" : ""
              }`}
              onClick={() => handleTabChange("today")}
            >
              <ClockIcon />
              <span>{pick(STRINGS.tabToday, locale)}</span>
              {isTodayActive && <span className="devotion-stat-dot" style={{ background: "var(--gold)" }} />}
            </button>

            <button
              type="button"
              className={`devotion-tab-btn ${
                activeTab === "calendar" ? "is-active" : ""
              }`}
              onClick={() => handleTabChange("calendar")}
            >
              <CalendarIcon />
              <span>{pick(STRINGS.tabCalendar, locale)}</span>
              <span className="devotion-tab-badge">
                {progress.percentage}%
              </span>
            </button>

            <button
              type="button"
              className={`devotion-tab-btn ${
                activeTab === "verses" ? "is-active" : ""
              }`}
              onClick={() => handleTabChange("verses")}
            >
              <BookOpenIcon />
              <span>{pick(STRINGS.tabVerses, locale)}</span>
              <span className="devotion-tab-badge">
                500
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MAIN TAB CONTENT */}
      <main className="container devotion-main-container">
        {/* ========================================================
            TAB 1: TODAY'S / SELECTED DEVOTION
           ======================================================== */}
        {activeTab === "today" && currentDevotion && (
          <article className="devotion-today-card">
            {/* Sanctuary Header info */}
            <div className="devotion-today-header">
              <div className="devotion-date-tag">
                <CalendarIcon />
                <span>
                  {currentDevotion.dateFull} • Day {currentDevotion.dayOfYear} of 365
                </span>
              </div>
              <div className="devotion-topic-tag">
                <BookOpenIcon style={{ width: 14, height: 14, color: "var(--gold)" }} />
                <span>{currentDevotion.theme?.km || currentDevotion.theme?.en || "Daily Meditation"}</span>
              </div>
            </div>

            {/* Action Buttons Toolbar with Soundwave Audio & Telegram */}
            <div className="devotion-actions-row">
              <div className="devotion-actions-left">
                <button
                  type="button"
                  className={`devotion-action-btn ${isPlayingAudio ? "is-active" : ""}`}
                  onClick={handleToggleAudio}
                  title="Listen to scripture reading in English"
                >
                  {isPlayingAudio ? <PauseIcon /> : <PlayIcon />}
                  <span>
                    {isPlayingAudio
                      ? pick(STRINGS.btnStop, locale)
                      : pick(STRINGS.btnListen, locale)}
                  </span>
                  {isPlayingAudio && (
                    <span className="devotion-soundwave" aria-hidden="true">
                      <span className="devotion-soundwave-bar" />
                      <span className="devotion-soundwave-bar" />
                      <span className="devotion-soundwave-bar" />
                      <span className="devotion-soundwave-bar" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className="devotion-action-btn"
                  onClick={() => handleCopyScripture(currentDevotion)}
                  title="Copy scripture and reference"
                >
                  <CopyIcon />
                  <span>{pick(STRINGS.btnCopy, locale)}</span>
                </button>
              </div>

              <div className="devotion-actions-right">
                <button
                  type="button"
                  className="devotion-action-btn"
                  onClick={() => handleShareTelegram(currentDevotion)}
                  title="Share devotion to Telegram"
                  style={{ color: "#0ea5e9" }}
                >
                  <TelegramIcon />
                  <span>{pick(STRINGS.btnShareTelegram, locale)}</span>
                </button>

                <button
                  type="button"
                  className={`devotion-action-btn ${
                    isCurrentCompleted ? "is-active" : ""
                  }`}
                  onClick={() => handleToggleRead(currentDevotion.id)}
                  title="Record completion in your annual journey"
                >
                  {isCurrentCompleted ? <CheckIcon /> : <BookmarkIcon />}
                  <span>
                    {isCurrentCompleted
                      ? pick(STRINGS.btnReadCompleted, locale)
                      : pick(STRINGS.btnMarkRead, locale)}
                  </span>
                </button>
              </div>
            </div>

            {/* THE ILLUMINATED SCRIPTURE SHOWCASE (FOCAL PIECE) */}
            <section className="devotion-scripture-showcase" aria-label="Scripture Passage">
              <div className="devotion-watermark-quote" aria-hidden="true">“</div>

              <div className="devotion-scripture-top-bar">
                <div className="devotion-scripture-ref-seal">
                  <span>«</span>
                  <strong>{currentDevotion.verse?.ref?.km || currentDevotion.verse?.ref?.en}</strong>
                  {currentDevotion.verse?.ref?.en && (
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      • {currentDevotion.verse?.ref?.en}
                    </span>
                  )}
                  <span>»</span>
                </div>

                {/* Multi-language Selector Pills */}
                <div className="devotion-lang-pills">
                  <button
                    type="button"
                    className={`devotion-lang-pill ${activeScriptureLang === "all" ? "is-active" : ""}`}
                    onClick={() => setActiveScriptureLang("all")}
                  >
                    {pick(STRINGS.langAll, locale)}
                  </button>
                  <button
                    type="button"
                    className={`devotion-lang-pill ${activeScriptureLang === "km" ? "is-active" : ""}`}
                    onClick={() => setActiveScriptureLang("km")}
                  >
                    {pick(STRINGS.langKm, locale)}
                  </button>
                  <button
                    type="button"
                    className={`devotion-lang-pill ${activeScriptureLang === "en" ? "is-active" : ""}`}
                    onClick={() => setActiveScriptureLang("en")}
                  >
                    {pick(STRINGS.langEn, locale)}
                  </button>
                  {currentDevotion.verse?.text?.ko && (
                    <button
                      type="button"
                      className={`devotion-lang-pill ${activeScriptureLang === "ko" ? "is-active" : ""}`}
                      onClick={() => setActiveScriptureLang("ko")}
                    >
                      {pick(STRINGS.langKo, locale)}
                    </button>
                  )}
                </div>
              </div>

              {/* Primary 1954 Old Khmer Verbatim Scripture */}
              {(activeScriptureLang === "all" || activeScriptureLang === "km") && (
                <blockquote className="devotion-scripture-quote">
                  «{currentDevotion.verse?.text?.km}»
                </blockquote>
              )}

              {/* Secondary Bilingual Deck */}
              {(activeScriptureLang === "all" || activeScriptureLang === "en" || activeScriptureLang === "ko") && (
                <div className="devotion-scripture-bilingual">
                  {(activeScriptureLang === "all" || activeScriptureLang === "en") && currentDevotion.verse?.text?.en && (
                    <div className="devotion-trans-card">
                      <span className="devotion-trans-label">World English Bible / ESV</span>
                      <p className="devotion-scripture-en">
                        “{currentDevotion.verse?.text?.en}”
                      </p>
                    </div>
                  )}

                  {(activeScriptureLang === "all" || activeScriptureLang === "ko") && currentDevotion.verse?.text?.ko && (
                    <div className="devotion-trans-card">
                      <span className="devotion-trans-label">Korean Revised Version • 한국어 성경</span>
                      <p className="devotion-scripture-ko">
                        {currentDevotion.verse?.text?.ko}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* PASTORAL REFLECTION & LIFE APPLICATION GRID */}
            <div className="devotion-reflection-grid">
              {/* Left: Biblical Truth & Pastoral Exposition */}
              <div className="devotion-reflection-card">
                <div className="devotion-card-header">
                  <UserIcon />
                  <h4>{pick(STRINGS.pastorInsight, locale)}</h4>
                </div>

                <div className="devotion-key-truth-box">
                  <span className="devotion-key-truth-label">{pick(STRINGS.keyTruth, locale)}</span>
                  <p className="devotion-key-truth-text">
                    {currentDevotion.reflection?.keyTruth?.[locale === "km" ? "km" : "en"] ||
                      currentDevotion.reflection?.keyTruth?.km}
                  </p>
                </div>

                <div className="devotion-points-list">
                  {currentDevotion.reflection?.points?.map((pt, idx) => (
                    <div key={idx} className="devotion-point-item">
                      <span className="devotion-point-num">{idx + 1}</span>
                      <span>{pt[locale === "km" ? "km" : "en"] || pt.km}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Practical Life Application Questions */}
              <div className="devotion-reflection-card">
                <div className="devotion-card-header">
                  <CheckIcon />
                  <h4>{pick(STRINGS.applicationTitle, locale)}</h4>
                </div>

                <div className="devotion-app-list">
                  {currentDevotion.applicationQuestions?.map((q, idx) => (
                    <div key={idx} className="devotion-app-card">
                      <span className="devotion-app-badge">Q{idx + 1}</span>
                      <p className="devotion-app-text">
                        {q[locale === "km" ? "km" : "en"] || q.km}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GUIDED LITURGICAL ALTAR PRAYER */}
            {currentDevotion.guidedPrayer && (
              <section className="devotion-prayer-card" aria-label="Pastoral Guided Prayer">
                <div className="devotion-prayer-emblem" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>

                <h4>{pick(STRINGS.prayerTitle, locale)}</h4>

                <p className="devotion-prayer-quote">
                  «{currentDevotion.guidedPrayer[locale === "km" ? "km" : "en"] ||
                    currentDevotion.guidedPrayer.km}»
                </p>

                {locale !== "en" && currentDevotion.guidedPrayer.en && (
                  <p className="devotion-prayer-en">
                    “{currentDevotion.guidedPrayer.en}”
                  </p>
                )}

                <div className="devotion-prayer-seal">
                  {pick(STRINGS.amenSeal, locale)}
                </div>
              </section>
            )}

            {/* BOTTOM DAY NAVIGATION STEPPER */}
            <div className="devotion-nav-strip">
              <button
                type="button"
                className="devotion-nav-btn"
                onClick={handlePrevDay}
              >
                <ChevronLeftIcon />
                <span>{pick(STRINGS.btnPrev, locale)}</span>
              </button>

              {!isTodayActive && (
                <button
                  type="button"
                  className="devotion-nav-btn"
                  onClick={handleJumpToday}
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                >
                  <ClockIcon />
                  <span>{pick(STRINGS.btnTodayJump, locale)}</span>
                </button>
              )}

              <button
                type="button"
                className="devotion-nav-btn"
                onClick={handleNextDay}
              >
                <span>{pick(STRINGS.btnNext, locale)}</span>
                <ChevronRightIcon />
              </button>
            </div>
          </article>
        )}

        {/* ========================================================
            TAB 2: 365-DAY CALENDAR JOURNEY
           ======================================================== */}
        {activeTab === "calendar" && (
          <section className="devotion-calendar-view" aria-label="365-Day Devotional Journey">
            {/* Spiritual Progress Dashboard */}
            <div className="devotion-progress-box">
              <div className="devotion-progress-header">
                <span>{pick(STRINGS.progressTitle, locale)}</span>
                <span className="devotion-progress-stats">
                  <CheckIcon style={{ width: 14, height: 14 }} />
                  {progress.completedCount} / {progress.total} Days ({progress.percentage}%)
                </span>
              </div>
              <div className="devotion-progress-bar-wrap">
                <div
                  className="devotion-progress-bar"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            {/* Horizontal Months Selector Carousel */}
            <div className="devotion-months-grid" role="tablist">
              {YEAR_MONTHS.map((m) => {
                const isActive = selectedMonth === m.month;
                return (
                  <button
                    key={m.month}
                    type="button"
                    className={`devotion-month-btn ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => {
                      setSelectedMonth(m.month);
                      const firstDay = getDevotionByDate(m.month, 1);
                      setPreviewDay(firstDay);
                    }}
                  >
                    {m.name.km} ({m.name.en})
                  </button>
                );
              })}
            </div>

            {/* Active Month Theme Spotlight */}
            <div className="devotion-theme-banner">
              <div className="devotion-theme-badge">
                Month {activeMonthData.month} Spiritual Focus • {activeMonthData.name.en}
              </div>
              <h3 className="devotion-theme-title">
                {activeMonthData.theme[locale === "km" ? "km" : "en"] ||
                  activeMonthData.theme.km}
              </h3>
              <p className="devotion-theme-desc">
                {activeMonthData.description?.[locale === "km" ? "km" : "en"] ||
                  activeMonthData.description?.km ||
                  activeMonthData.description?.en}
              </p>
            </div>

            {/* Month Days Matrix */}
            <div className="devotion-days-grid">
              {Array.from({ length: activeMonthData.days }, (_, i) => i + 1).map((d) => {
                const item = getDevotionByDate(selectedMonth, d);
                const isSelected = previewDay?.id === item.id;
                const isCompleted = completedDays.includes(item.id);
                const isToday =
                  new Date().getMonth() + 1 === selectedMonth &&
                  new Date().getDate() === d;

                return (
                  <button
                    key={d}
                    type="button"
                    className={`devotion-day-btn ${
                      isSelected ? "is-active" : ""
                    } ${isCompleted ? "is-completed" : ""} ${
                      isToday ? "is-today" : ""
                    }`}
                    onClick={() => setPreviewDay(item)}
                    title={`Day ${d}: ${item.verse?.ref?.km || ""}`}
                  >
                    <span>{d}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Day Scripture Spotlight Drawer */}
            {previewDay && (
              <div className="devotion-day-spotlight">
                <div className="devotion-day-spotlight-left">
                  <div className="devotion-day-spotlight-date">
                    {previewDay.dateFull} • Day {previewDay.dayOfYear} of 365
                  </div>
                  <div className="devotion-day-spotlight-ref">
                    {previewDay.verse?.ref?.km} • {previewDay.verse?.ref?.en}
                  </div>
                  <p className="devotion-day-spotlight-snippet">
                    «{previewDay.verse?.text?.km}»
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSelectDay(previewDay.dayOfYear, true)}
                  >
                    {pick(STRINGS.readFullDevotion, locale)}
                  </button>

                  <button
                    type="button"
                    className={`devotion-action-btn ${completedDays.includes(previewDay.id) ? "is-active" : ""}`}
                    onClick={() => handleToggleRead(previewDay.id)}
                  >
                    <CheckIcon />
                    <span>
                      {completedDays.includes(previewDay.id)
                        ? pick(STRINGS.btnReadCompleted, locale)
                        : pick(STRINGS.btnMarkRead, locale)}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TAB 3: 500 FAMOUS SCRIPTURE VERSES
           ======================================================== */}
        {activeTab === "verses" && (
          <section className="devotion-verses-view" aria-label="500 Famous Bible Verses">
            {/* Search Input Suite */}
            <div className="devotion-search-row">
              <div className="devotion-search-input-wrap">
                <SearchIcon />
                <input
                  type="text"
                  className="devotion-search-input"
                  placeholder={pick(STRINGS.searchPlaceholder, locale)}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleVersesCount(24);
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute",
                      right: "1.25rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--muted)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label="Clear search"
                  >
                    <CloseIcon style={{ width: 16, height: 16 }} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="devotion-category-pills">
              {FAMOUS_KHMER_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const label =
                  cat.label[locale] || cat.label.en || cat.label.km;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`devotion-cat-pill ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setVisibleVersesCount(24);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="devotion-results-count">
              Showing {displayedVerses.length} of {filteredVerses.length} verses
            </div>

            {/* Verses Cards Grid */}
            <div className="devotion-verses-grid">
              {displayedVerses.map((v) => (
                <div key={v.id} className="devotion-verse-card">
                  <div>
                    <div className="devotion-verse-head">
                      <span className="devotion-verse-num">
                        #{v.kmNum || v.id}
                      </span>
                      <span className="devotion-verse-cat-pill">
                        {v.category}
                      </span>
                    </div>

                    <div className="devotion-verse-ref">
                      {v.ref?.km} • {v.ref?.en}
                    </div>

                    <p className="devotion-verse-text-km">
                      «{v.text?.km}»
                    </p>

                    <p className="devotion-verse-text-en">
                      “{v.text?.en}”
                    </p>
                  </div>

                  <div className="devotion-verse-footer">
                    <button
                      type="button"
                      className="devotion-verse-action-btn"
                      onClick={() => handleCopyVerse(v)}
                    >
                      <CopyIcon />
                      <span>{pick(STRINGS.btnCopy, locale)}</span>
                    </button>

                    <button
                      type="button"
                      className="devotion-verse-action-btn"
                      onClick={() => {
                        const targetDev = YEAR_DEVOTIONS_365.find(
                          (item) => item.verseId === v.id
                        );
                        if (targetDev) {
                          handleSelectDay(targetDev.dayOfYear);
                        } else {
                          handleSelectDay(1);
                        }
                      }}
                    >
                      <span>{pick(STRINGS.openDevotion, locale)}</span>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {displayedVerses.length < filteredVerses.length && (
              <div className="devotion-load-more-wrap">
                <button
                  type="button"
                  className="devotion-load-more-btn"
                  onClick={() =>
                    setVisibleVersesCount((prev) => prev + 24)
                  }
                >
                  <BookOpenIcon style={{ width: 16, height: 16 }} />
                  <span>{pick(STRINGS.showMore, locale)}</span>
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* 4. MINISTRY SANCTUARY CROSS-LINK SECTION */}
      <section className="devotion-crosslink-section">
        <div className="container">
          <h3 className="devotion-crosslink-title">
            All Nations Church Ministry Sanctuary
          </h3>
          <p className="devotion-crosslink-sub">
            Explore our sermon archives, theological library, and video productions.
          </p>

          <div className="devotion-crosslink-grid">
            <Link href="/library" className="devotion-crosslink-card">
              <div>
                <h4>Theological Library</h4>
                <p>
                  Verse-by-verse Matthew Henry commentaries, historical theology lectures, and bilingual reference dictionaries.
                </p>
              </div>
              <span className="devotion-crosslink-link">
                Open Library <ArrowRightIcon />
              </span>
            </Link>

            <Link href="/resource" className="devotion-crosslink-card">
              <div>
                <h4>Gospel Videos & Media</h4>
                <p>
                  Watch gospel short films, sanctuary worship, and biblical teaching productions from True Friend Ministry.
                </p>
              </div>
              <span className="devotion-crosslink-link">
                Watch Productions <ArrowRightIcon />
              </span>
            </Link>

            <Link href="/articles" className="devotion-crosslink-card">
              <div>
                <h4>Articles & Pastoral Writing</h4>
                <p>
                  Biblical reflections on prayer, persevering faith in hardship, Christian walk, and discipleship.
                </p>
              </div>
              <span className="devotion-crosslink-link">
                Read Articles <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="devotion-toast" role="status">
          <CheckIcon style={{ width: 16, height: 16, color: "var(--gold)" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
