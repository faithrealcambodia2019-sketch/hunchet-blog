import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES, useT } from "../lib/i18n";
import AnnouncementModal from "./AnnouncementModal";
import {
  GlobeIcon,
  TelegramIcon,
  BookOpenIcon,
  UserIcon,
  CameraIcon,
  PlayIcon,
  MapPinIcon,
  HeartIcon,
  ChevronDownIcon,
  CloseIcon,
  CheckIcon,
  MegaphoneIcon,
  CompassIcon,
  PhoneIcon,
  CalendarIcon,
} from "./Icons";

const LANG_DISPLAY = {
  en: "English",
  km: "ខ្មែរ",
  ko: "한국어",
  zh: "中文",
};

const STRINGS = {
  announcementBadge: {
    en: "Announcement",
    km: "សេចក្ដីប្រកាស",
    ko: "공지",
    zh: "教会通告",
  },
  worshipText: {
    en: "Sunday Sanctuary Worship at 8:30 AM — join us this week!",
    km: "កម្មវិធីថ្វាយបង្គំថ្ងៃអាទិត្យ វេលាម៉ោង ៨:៣០ ព្រឹក — ចូលរួមសប្តាហ៍នេះជាមួយពួកយើង!",
    ko: "주일 예배 오전 8:30 — 이번 주에 함께 예배드려요!",
    zh: "主日崇拜 8:30 AM — 欢迎这周与我们同心敬拜！",
  },
  viewFlyer: {
    en: "View Flyer",
    km: "មើលសេចក្ដីប្រកាស",
    ko: "전단지 보기",
    zh: "查看通告单",
  },
  planVisit: {
    en: "Plan Visit",
    km: "គ្រោងមកជួប",
    ko: "방문 계획",
    zh: "计划来访",
  },
  planSundayText: {
    en: "Plan Your Visit This Sunday: 8:30 AM",
    km: "គ្រោងមកជួបថ្ងៃអាទិត្យនេះ: ៨:៣០ ព្រឹក",
    ko: "이번 주일 방문 계획하기 (8:30 AM)",
    zh: "计划本主日来访：上午 8:30",
  },
  welcomeKicker: {
    en: "Welcome & First Steps",
    km: "ស្វាគមន៍ & ជំហានដំបូង",
    ko: "환영합니다",
    zh: "欢迎新朋友",
  },
  churchName: {
    en: "Hun Chet",
    km: "Hun Chet",
    ko: "Hun Chet",
    zh: "Hun Chet",
  },
  churchSubtitle: {
    en: "Faith & Ministry",
    km: "ជំនឿ និងព័ន្ធកិច្ច",
    ko: "믿음과 사역",
    zh: "信仰与事工",
  },
  telegramHotline: {
    en: "Pastoral Telegram Hotline",
    km: "ទាក់ទងគ្រូគង្វាលតាម Telegram",
    ko: "목회 상담 텔레그램",
    zh: "教牧 Telegram 专线",
  },
};

const NAV_GROUPS = {
  about: {
    label: {
      en: "About",
      km: "អំពីយើង",
      ko: "교회 소개",
      zh: "关于我们",
    },
    items: [
      {
        href: "/about",
        icon: "compass",
        title: {
          en: "Our Story & Calling",
          km: "ដំណើររឿង និងការត្រាស់ហៅ",
          ko: "교회 이야기와 사명",
          zh: "教会异象与使命",
        },
        desc: {
          en: "Vision, mission & Gospel roots in Phnom Penh",
          km: "ចក្ខុវិស័យ បេសកកម្ម និងប្រវត្តិក្រុមជំនុំ",
          ko: "비전, 사명 및 프놈펜 복음 사역",
          zh: "异象、使命与金边福音事工",
        },
      },
      {
        href: "/about#leadership",
        icon: "user",
        title: {
          en: "Pastors & Leadership",
          km: "គ្រូគង្វាល និងថ្នាក់ដឹកនាំ",
          ko: "목회자와 리더십",
          zh: "教牧与同工团队",
        },
        desc: {
          en: "Senior Pastor Kim Jong Ho & Leader Hun Chet",
          km: "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត",
          ko: "김종호 담임목사 & 훈 쳇 사역 리더",
          zh: "金钟浩主任牧师与 Hun Chet 传道",
        },
      },
      {
        href: "/about#beliefs",
        icon: "book",
        title: {
          en: "What We Believe & Heritage",
          km: "ជំនឿ និងគោលលទ្ធិ",
          ko: "우리의 신앙과 교리",
          zh: "信条与历史传承",
        },
        desc: {
          en: "Historic orthodox faith & 1954 Khmer Bible",
          km: "ជំនឿគ្រីស្ទបរិស័ទពិត និងព្រះគម្ពីរ ១៩៥៤",
          ko: "정통 기독교 신앙과 1954 크메르 성경",
          zh: "历史正统信仰与1954高棉圣经",
        },
      },
    ],
  },
  teaching: {
    label: {
      en: "Word & Devotion",
      km: "ព្រះបន្ទូល & ការបង្រៀន",
      ko: "말씀과 묵상",
      zh: "真理讲道",
    },
    items: [
      {
        href: "/devotions",
        icon: "book",
        badge: "365",
        title: {
          en: "Daily Devotions (365 Days)",
          km: "ការសញ្ជឹងគិតប្រចាំថ្ងៃ (៣៦៥ ថ្ងៃ)",
          ko: "매일 말씀 묵상 (365일)",
          zh: "每日灵修（365天）",
        },
        desc: {
          en: "Daily Bread, 500 verses & prayer altar",
          km: "ព្រះបន្ទូលប្រចាំថ្ងៃ និងអាសនៈអធិស្ឋាន",
          ko: "생명의 떡, 500구절 암송 및 기도",
          zh: "每日灵粮、500金句与祷告祭坛",
        },
      },
      {
        href: "/resource",
        icon: "video",
        title: {
          en: "Sermons & Media",
          km: "វីដេអូ និងធនធាន",
          ko: "영상 설교 & 미디어",
          zh: "影音与讲道",
        },
        desc: {
          en: "Sunday worship recordings & video messages",
          km: "ការថ្វាយបង្គំ និងវីដេអូបង្រៀន",
          ko: "주일 예배 영상 및 설교 비디오",
          zh: "主日崇拜实况与讲道影片",
        },
      },
      {
        href: "/library",
        icon: "book",
        title: {
          en: "Theological Library",
          km: "បណ្ណាល័យសៀវភៅ",
          ko: "신학 도서관",
          zh: "神学图书馆",
        },
        desc: {
          en: "Christian books & digital study PDFs",
          km: "សៀវភៅគ្រីស្ទបរិស័ទ និងឯកសារ PDF",
          ko: "기독교 서적 및 디지털 아카이브",
          zh: "属灵书籍与电子文献",
        },
      },
      {
        href: "/articles",
        icon: "doc",
        title: {
          en: "Articles & Exegesis",
          km: "អត្ថបទ និងទេសនា",
          ko: "설교 및 칼럼",
          zh: "讲道与专文",
        },
        desc: {
          en: "Pastoral exegesis & theological commentary",
          km: "ការពន្យល់ព្រះគម្ពីរ និងការលើកទឹកចិត្ត",
          ko: "목회적 성경 강해와 영적 권면",
          zh: "教牧解经、教义与属灵劝勉",
        },
      },
    ],
  },
  churchLife: {
    label: {
      en: "Connect & Life",
      km: "ជីវិតក្រុមជំនុំ",
      ko: "교제 및 갤러리",
      zh: "教会生活",
    },
    items: [
      {
        href: "/gallery",
        icon: "camera",
        title: {
          en: "Ministry Photo Gallery",
          km: "កម្រងរូបភាពព័ន្ធកិច្ច",
          ko: "사역 갤러리",
          zh: "事工画廊",
        },
        desc: {
          en: "Worship, water baptism & youth photos",
          km: "ទិដ្ឋភាពថ្វាយបង្គំ បុណ្យជ្រមុជទឹក និងយុវជន",
          ko: "주일 예배, 세례식, 청년부 사진",
          zh: "主日崇拜、洗礼与青年团契实景",
        },
      },
      {
        href: "/partner-with-us",
        icon: "heart",
        title: {
          en: "Kingdom Partnership",
          km: "ចូលរួមចំណែកក្នុងព្រះរាជ្យ",
          ko: "사역 동역하기",
          zh: "与我们同工",
        },
        desc: {
          en: "Support Gospel outreach & discipleship",
          km: "ចូលរួមចំណែកពង្រីកដំណឹងល្អ",
          ko: "복음 전도와 제자 양육 동역",
          zh: "支持福音外展与门徒训练",
        },
      },
    ],
  },
};

function NavIcon({ type }) {
  if (type === "compass") return <CompassIcon style={{ width: 16, height: 16 }} />;
  if (type === "book") return <BookOpenIcon style={{ width: 16, height: 16 }} />;
  if (type === "video") return <PlayIcon style={{ width: 14, height: 14, marginLeft: 2 }} />;
  if (type === "user") return <UserIcon style={{ width: 16, height: 16 }} />;
  if (type === "camera") return <CameraIcon style={{ width: 16, height: 16 }} />;
  if (type === "heart") return <HeartIcon style={{ width: 15, height: 15 }} />;
  return <CheckIcon style={{ width: 16, height: 16 }} />;
}

// 1. All Nations Church Top Announcement Notice Bar
function TopChurchBar({ locale, onOpenFlyer }) {
  const tStr = (key) => STRINGS[key]?.[locale] || STRINGS[key]?.en || "";

  return (
    <div className="top-church-bar">
      <div className="top-church-inner">
        {/* Left: Announcement pill + Worship schedule */}
        <div className="top-church-left">
          <span className="anc-btn-megaphone" aria-hidden="true">
            <MegaphoneIcon style={{ width: 13, height: 13 }} />
            <span>{tStr("announcementBadge")}</span>
          </span>
          <span className="anc-worship-text">{tStr("worshipText")}</span>
        </div>

        {/* Right: View Flyer + Telegram Hotline + Switcher */}
        <div className="top-church-right">
          <button
            type="button"
            onClick={onOpenFlyer}
            className="anc-view-flyer-btn"
          >
            {tStr("viewFlyer")}
          </button>
          <span className="top-church-sep" aria-hidden="true">•</span>
          <a
            href="https://t.me/+855966875886"
            target="_blank"
            rel="noreferrer"
            className="top-church-link"
          >
            <TelegramIcon style={{ width: 13, height: 13, marginRight: 4 }} />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// 2. Language Switcher Dropdown
function LanguageSwitch() {
  const router = useRouter();
  const t = useT();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const current = LOCALES.find((l) => l.code === (router.locale || "en"));

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang-switch" ref={wrapRef}>
      <button
        type="button"
        className="lang-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("lang.switch")}
      >
        <GlobeIcon />
        <span lang={current && current.code}>{current && current.short}</span>
        <span className="lang-caret" aria-hidden="true" />
      </button>

      {open && (
        <ul className="lang-menu">
          {LOCALES.map((l) => (
            <li key={l.code}>
              <Link
                href={router.asPath}
                locale={l.code}
                hrefLang={l.code}
                lang={l.code}
                className={current && l.code === current.code ? "is-active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 3. Main All Nations Church Style Site Header Component
export default function SiteHeader() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "en";

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  // Mobile drawer accordion states
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileTeachingOpen, setMobileTeachingOpen] = useState(false);
  const [mobileConnectOpen, setMobileConnectOpen] = useState(false);

  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loc = (obj) => {
    if (!obj) return "";
    return obj[locale] || obj.en || "";
  };

  const isRouteActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [router.asPath, router.locale]);

  // Lock body and html scroll when mobile drawer is active
  useEffect(() => {
    if (mobileOpen) {
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBodyOverflow;
        document.documentElement.style.overflow = origHtmlOverflow;
      };
    }
    return undefined;
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Hover handlers with debounce for desktop dropdowns
  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const tStr = (key) => STRINGS[key]?.[locale] || STRINGS[key]?.en || "";

  const churchName = tStr("churchName");
  const churchSubtitle = tStr("churchSubtitle");
  const planVisitLabel = tStr("planVisit");
  const planSundayText = tStr("planSundayText");
  const welcomeKicker = tStr("welcomeKicker");
  const telegramHotlineText = tStr("telegramHotline");

  const isAboutActive = ["/about"].some((p) => isRouteActive(p));
  const isTeachingActive = ["/devotions", "/articles", "/library", "/resource"].some((p) => isRouteActive(p));
  const isConnectActive = ["/gallery", "/partner-with-us"].some((p) => isRouteActive(p));

  return (
    <>
      {/* 1. All Nations Church Top Notice Bar */}
      <TopChurchBar
        locale={locale}
        onOpenFlyer={() => setIsAnnouncementModalOpen(true)}
      />

      {/* 2. Main Sticky Navigation Header */}
      <header className="site-header">
        <div className="site-header-inner">
          {/* Logo & Pastor Hun Chet Personal Ministry Brand */}
          <Link href="/" className="site-logo" aria-label="Hun Chet - Faith & Ministry">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt={churchName} />
            </span>
            <span className="site-logo-text-group">
              <span className="site-logo-text">{churchName}</span>
              <span className="site-logo-sub">{churchSubtitle}</span>
            </span>
          </Link>

          {/* Desktop Navigation Menu (All Nations Church Structure) */}
          <nav className="site-nav desktop-nav" aria-label="Main Navigation">
            {/* 1. Home */}
            <Link
              href="/"
              className={`nav-link ${isRouteActive("/") ? "active" : ""}`}
            >
              {t("nav.home")}
            </Link>

            {/* 2. About Dropdown */}
            <div
              className={`nav-dropdown-wrap ${openDropdown === "about" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link ${isAboutActive ? "active" : ""}`}
                onClick={() => setOpenDropdown((prev) => (prev === "about" ? null : "about"))}
                aria-haspopup="true"
                aria-expanded={openDropdown === "about"}
              >
                <span>{loc(NAV_GROUPS.about.label)}</span>
                <ChevronDownIcon className="nav-dropdown-caret" style={{ width: 14, height: 14 }} />
              </button>

              <div className="nav-dropdown-menu">
                {NAV_GROUPS.about.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-item ${isRouteActive(item.href) ? "active" : ""}`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="nav-dropdown-icon">
                      <NavIcon type={item.icon} />
                    </span>
                    <span className="nav-dropdown-text">
                      <strong className="nav-dropdown-title">{loc(item.title)}</strong>
                      <span className="nav-dropdown-desc">{loc(item.desc)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Word & Devotion Dropdown */}
            <div
              className={`nav-dropdown-wrap ${openDropdown === "teaching" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("teaching")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link ${isTeachingActive ? "active" : ""}`}
                onClick={() => setOpenDropdown((prev) => (prev === "teaching" ? null : "teaching"))}
                aria-haspopup="true"
                aria-expanded={openDropdown === "teaching"}
              >
                <span>{loc(NAV_GROUPS.teaching.label)}</span>
                <span className="nav-badge-pill" style={{ marginLeft: 4 }}>365</span>
                <ChevronDownIcon className="nav-dropdown-caret" style={{ width: 14, height: 14 }} />
              </button>

              <div className="nav-dropdown-menu">
                {NAV_GROUPS.teaching.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-item ${isRouteActive(item.href) ? "active" : ""}`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="nav-dropdown-icon">
                      <NavIcon type={item.icon} />
                    </span>
                    <span className="nav-dropdown-text">
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <strong className="nav-dropdown-title">{loc(item.title)}</strong>
                        {item.badge && <span className="nav-badge-pill">{item.badge}</span>}
                      </span>
                      <span className="nav-dropdown-desc">{loc(item.desc)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Connect & Church Life Dropdown */}
            <div
              className={`nav-dropdown-wrap ${openDropdown === "churchLife" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("churchLife")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link ${isConnectActive ? "active" : ""}`}
                onClick={() => setOpenDropdown((prev) => (prev === "churchLife" ? null : "churchLife"))}
                aria-haspopup="true"
                aria-expanded={openDropdown === "churchLife"}
              >
                <span>{loc(NAV_GROUPS.churchLife.label)}</span>
                <ChevronDownIcon className="nav-dropdown-caret" style={{ width: 14, height: 14 }} />
              </button>

              <div className="nav-dropdown-menu">
                {NAV_GROUPS.churchLife.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-item ${isRouteActive(item.href) ? "active" : ""}`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="nav-dropdown-icon">
                      <NavIcon type={item.icon} />
                    </span>
                    <span className="nav-dropdown-text">
                      <strong className="nav-dropdown-title">{loc(item.title)}</strong>
                      <span className="nav-dropdown-desc">{loc(item.desc)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 5. Contact */}
            <Link
              href="/contact"
              className={`nav-link ${isRouteActive("/contact") ? "active" : ""}`}
            >
              {t("nav.contact")}
            </Link>

            {/* Primary Action Button: Plan Visit */}
            <button
              type="button"
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="btn-plan-visit"
            >
              <CalendarIcon style={{ width: 14, height: 14 }} />
              <span>{planVisitLabel}</span>
            </button>

            {/* Language Switcher */}
            <LanguageSwitch />
          </nav>

          {/* Mobile Header Actions (Language Switcher + Hamburger) */}
          <div className="mobile-header-actions">
            <LanguageSwitch />
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <CloseIcon style={{ width: 22, height: 22 }} />
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. All Nations Church Card-Grouped Mobile Drawer */}
      {mounted && typeof document !== "undefined" && mobileOpen && createPortal(
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className="mobile-drawer-sheet anc-style-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="mobile-drawer-top">
              <Link href="/" className="mobile-drawer-brand" onClick={() => setMobileOpen(false)}>
                <span className="brand-mark" style={{ width: 36, height: 36 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO} alt={churchName} />
                </span>
                <div>
                  <strong style={{ fontSize: "1.15rem", display: "block", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>{churchName}</strong>
                  <span style={{ fontSize: "0.62rem", color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>{churchSubtitle}</span>
                </div>
              </Link>

              <button
                type="button"
                className="mobile-drawer-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation drawer"
              >
                <CloseIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Mobile Drawer Body (Slate Canvas with White Cards) */}
            <div className="anc-mobile-drawer-body">
              {/* Quick Actions Bar: Language Pills + Plan Visit CTA */}
              <div className="anc-quick-bar">
                <div className="anc-lang-pills">
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={router.asPath}
                      locale={l.code}
                      className={`anc-lang-pill ${locale === l.code ? "is-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {LANG_DISPLAY[l.code] || l.name}
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setIsAnnouncementModalOpen(true);
                  }}
                  className="anc-quick-plan-btn"
                >
                  <CalendarIcon style={{ width: 13, height: 13 }} />
                  <span>{planVisitLabel}</span>
                </button>
              </div>

              {/* Section 1: Welcome & First Steps Card */}
              <div className="anc-nav-card">
                <span className="anc-card-kicker">{welcomeKicker}</span>

                <Link
                  href="/"
                  className={`anc-nav-link ${router.pathname === "/" ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(17, 43, 74, 0.08)", color: "var(--navy)" }}>
                      <CheckIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.home")}</span>
                  </div>
                </Link>

                <Link
                  href="/devotions"
                  className={`anc-nav-link ${router.pathname.startsWith("/devotions") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(184, 155, 94, 0.15)", color: "var(--gold)" }}>
                      <BookOpenIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{loc(NAV_GROUPS.teaching.items[0].title)}</span>
                  </div>
                  <span className="anc-pill-badge">365</span>
                </Link>
              </div>

              {/* Section 2: About Our Church (Collapsible Accordion Card) */}
              <div className="anc-nav-card anc-accordion-card">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="anc-accordion-header"
                  aria-expanded={mobileAboutOpen}
                >
                  <span className="anc-accordion-left">
                    <CompassIcon style={{ width: 16, height: 16, color: "var(--navy)" }} />
                    <span>{loc(NAV_GROUPS.about.label)}</span>
                  </span>
                  <ChevronDownIcon className={`anc-accordion-chevron ${mobileAboutOpen ? "is-open" : ""}`} />
                </button>

                {mobileAboutOpen && (
                  <div className="anc-accordion-body">
                    {NAV_GROUPS.about.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`anc-sub-link ${isRouteActive(item.href) ? "is-active" : ""}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <strong className="anc-sub-link-title">{loc(item.title)}</strong>
                        <span className="anc-sub-link-desc">{loc(item.desc)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 3: Word & Spiritual Life (Collapsible Accordion Card) */}
              <div className="anc-nav-card anc-accordion-card">
                <button
                  type="button"
                  onClick={() => setMobileTeachingOpen(!mobileTeachingOpen)}
                  className="anc-accordion-header"
                  aria-expanded={mobileTeachingOpen}
                >
                  <span className="anc-accordion-left">
                    <BookOpenIcon style={{ width: 16, height: 16, color: "var(--gold)" }} />
                    <span>{loc(NAV_GROUPS.teaching.label)}</span>
                  </span>
                  <ChevronDownIcon className={`anc-accordion-chevron ${mobileTeachingOpen ? "is-open" : ""}`} />
                </button>

                {mobileTeachingOpen && (
                  <div className="anc-accordion-body">
                    {NAV_GROUPS.teaching.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`anc-sub-link ${isRouteActive(item.href) ? "is-active" : ""}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <strong className="anc-sub-link-title">{loc(item.title)}</strong>
                        <span className="anc-sub-link-desc">{loc(item.desc)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Connect & Church Life (Collapsible Accordion Card) */}
              <div className="anc-nav-card anc-accordion-card">
                <button
                  type="button"
                  onClick={() => setMobileConnectOpen(!mobileConnectOpen)}
                  className="anc-accordion-header"
                  aria-expanded={mobileConnectOpen}
                >
                  <span className="anc-accordion-left">
                    <CameraIcon style={{ width: 16, height: 16, color: "#059669" }} />
                    <span>{loc(NAV_GROUPS.churchLife.label)}</span>
                  </span>
                  <ChevronDownIcon className={`anc-accordion-chevron ${mobileConnectOpen ? "is-open" : ""}`} />
                </button>

                {mobileConnectOpen && (
                  <div className="anc-accordion-body">
                    {NAV_GROUPS.churchLife.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`anc-sub-link ${isRouteActive(item.href) ? "is-active" : ""}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <strong className="anc-sub-link-title">{loc(item.title)}</strong>
                        <span className="anc-sub-link-desc">{loc(item.desc)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 5: Contact Link Card */}
              <div className="anc-nav-card">
                <Link
                  href="/contact"
                  className={`anc-nav-link ${isRouteActive("/contact") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7" }}>
                      <PhoneIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.contact")}</span>
                  </div>
                </Link>
              </div>

              {/* Section 6: Plan Your Visit Sanctuary Card */}
              <div className="anc-drawer-footer-card">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setIsAnnouncementModalOpen(true);
                  }}
                  className="anc-bottom-plan-btn"
                >
                  <CalendarIcon style={{ width: 16, height: 16, color: "var(--gold)" }} />
                  <span>{planSundayText}</span>
                </button>

                <a
                  href="https://t.me/+855966875886"
                  target="_blank"
                  rel="noreferrer"
                  className="anc-bottom-telegram-btn"
                >
                  <TelegramIcon style={{ width: 15, height: 15 }} />
                  <span>{telegramHotlineText}</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 4. Announcement / Plan Visit Lightbox Flyer Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
