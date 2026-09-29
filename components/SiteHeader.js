import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES, useT } from "../lib/i18n";
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
} from "./Icons";

const NAV_GROUPS = {
  teaching: {
    label: {
      en: "Word & Teaching",
      km: "ការបង្រៀន & ព្រះបន្ទូល",
      ko: "말씀과 강해",
      zh: "真理讲道",
    },
    items: [
      {
        href: "/articles",
        icon: "doc",
        title: {
          en: "Articles & Sermons",
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
      {
        href: "/library",
        icon: "book",
        title: {
          en: "Theological Library",
          km: "បណ្ណាល័យសៀវភៅ",
          ko: "신학 도ស서관",
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
        href: "/resource",
        icon: "video",
        title: {
          en: "Media & Sermons",
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
    ],
  },
  churchLife: {
    label: {
      en: "Church Life",
      km: "ជីវិតក្រុមជំនុំ",
      ko: "교회 안내",
      zh: "教会生活",
    },
    items: [
      {
        href: "/about",
        icon: "user",
        title: {
          en: "Leadership & Calling",
          km: "ថ្នាក់ដឹកនាំ & ប្រវត្តិ",
          ko: "목회자 소개 및 역사",
          zh: "教牧团队与历史",
        },
        desc: {
          en: "Leader Hun Chet & Senior Pastor Kim Jong Ho",
          km: "លោកគ្រូ ហ៊ុន ចិត្ត និងលោកគ្រូគង្វាល គីម ជុងហូ",
          ko: "훈 쳇 리더와 김종호 담임목사",
          zh: "Hun Chet 传道与金钟浩主任牧师",
        },
      },
      {
        href: "/gallery",
        icon: "camera",
        title: {
          en: "Ministry Gallery",
          km: "កម្រងរូបភាព",
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
    ],
  },
};

function NavIcon({ type }) {
  if (type === "book") return <BookOpenIcon style={{ width: 16, height: 16 }} />;
  if (type === "video") return <PlayIcon style={{ width: 14, height: 14, marginLeft: 2 }} />;
  if (type === "user") return <UserIcon style={{ width: 16, height: 16 }} />;
  if (type === "camera") return <CameraIcon style={{ width: 16, height: 16 }} />;
  return <CheckIcon style={{ width: 16, height: 16 }} />;
}

// 1. Top Utility Sanctuary Notice Bar
function TopUtilityBar({ locale }) {
  const worshipText = {
    en: "All Nations Church Phnom Penh • Sunday Sanctuary Worship 8:30 AM",
    km: "ក្រុមជំនុំ អល ណេសិន ភ្នំពេញ • ការថ្វាយបង្គំថ្ងៃអាទិត្យ ម៉ោង ៨:៣០ ព្រឹក",
    ko: "올네이션스 교회 • 주일 예배 8:30 AM (프놈펜)",
    zh: "万民教会 • 主日崇拜 8:30 AM（金边）",
  }[locale] || "All Nations Church Phnom Penh • Sunday Sanctuary Worship 8:30 AM";

  const hotlineText = {
    en: "Pastoral Hotline",
    km: "ទំនាក់ទំនងគ្រូគង្វាល",
    ko: "목회 상담",
    zh: "教牧专线",
  }[locale] || "Pastoral Hotline";

  return (
    <div className="top-utility-bar">
      <div className="top-utility-inner">
        <div className="top-utility-left">
          <span className="top-utility-church-seal" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </span>
          <span className="top-utility-text">{worshipText}</span>
        </div>

        <div className="top-utility-right">
          <span className="top-utility-location">
            <MapPinIcon style={{ width: 12, height: 12, marginRight: 4 }} />
            Phnom Penh, Cambodia
          </span>
          <span className="top-utility-sep" aria-hidden="true">•</span>
          <a
            href="https://t.me/+855966875886"
            target="_blank"
            rel="noreferrer"
            className="top-utility-link"
          >
            <TelegramIcon style={{ width: 13, height: 13, marginRight: 4 }} />
            <span>{hotlineText}: +855 96 687 5886</span>
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

  // Close on outside click or Escape
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

// 3. Main Professional Site Header Component
export default function SiteHeader() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "en";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

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

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  const devotionsBadge = {
    en: "365 Days",
    km: "៣៦៥ ថ្ងៃ",
    ko: "365일",
    zh: "365天",
  }[locale] || "365 Days";

  const partnerBtnLabel = {
    en: "Partner with Us",
    km: "ចូលរួមជាមួយយើង",
    ko: "사역 동역하기",
    zh: "与我们同工",
  }[locale] || "Partner with Us";

  const subTitleText = {
    en: "Faith & Ministry • All Nations Church",
    km: "ជំនឿ និងព័ន្ធកិច្ច • ក្រុមជំនុំអលណេសិន",
    ko: "믿음과 사역 • 올네이션스교회",
    zh: "信仰与事工 • 万民教会",
  }[locale] || "Faith & Ministry • All Nations Church";

  return (
    <>
      {/* 1. Stately Top Utility Sanctuary Bar */}
      <TopUtilityBar locale={locale} />

      {/* 2. Main Sticky Navigation Header */}
      <header className="site-header">
        <div className="site-header-inner">
          {/* Logo & Pastoral Calling Crest */}
          <Link href="/" className="site-logo">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Hun Chet" />
            </span>
            <span>
              <span className="site-logo-text">Hun Chet</span>
              <span className="site-logo-sub">{subTitleText}</span>
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="site-nav desktop-nav" aria-label="Main Navigation">
            {/* Home */}
            <Link
              href="/"
              className={`nav-link ${isRouteActive("/") ? "active" : ""}`}
            >
              {t("nav.home")}
            </Link>

            {/* Daily Devotions (with glowing badge) */}
            <Link
              href="/devotions"
              className={`nav-link ${isRouteActive("/devotions") ? "active" : ""}`}
            >
              <span>{t("nav.devotions")}</span>
              <span className="nav-badge-pill">{devotionsBadge}</span>
            </Link>

            {/* Dropdown 1: Word & Teaching */}
            <div
              className={`nav-dropdown-wrap ${openDropdown === "teaching" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("teaching")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link ${
                  ["/articles", "/library", "/resource"].some((p) => isRouteActive(p)) ? "active" : ""
                }`}
                onClick={() => setOpenDropdown((prev) => (prev === "teaching" ? null : "teaching"))}
                aria-haspopup="true"
                aria-expanded={openDropdown === "teaching"}
              >
                <span>{loc(NAV_GROUPS.teaching.label)}</span>
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
                      <strong className="nav-dropdown-title">{loc(item.title)}</strong>
                      <span className="nav-dropdown-desc">{loc(item.desc)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown 2: Church Life */}
            <div
              className={`nav-dropdown-wrap ${openDropdown === "churchLife" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("churchLife")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link ${
                  ["/about", "/gallery"].some((p) => isRouteActive(p)) ? "active" : ""
                }`}
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

            {/* Worship Times & Contact */}
            <Link
              href="/contact"
              className={`nav-link ${isRouteActive("/contact") ? "active" : ""}`}
            >
              {t("nav.contact")}
            </Link>

            {/* Call to Action: Partner With Us */}
            <Link href="/partner-with-us" className="btn-nav-partner">
              <HeartIcon />
              <span>{partnerBtnLabel}</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitch />
          </nav>

          {/* Mobile Header Actions (Lang + Hamburger) */}
          <div className="mobile-header-actions">
            <LanguageSwitch />
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile navigation"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* 3. Luxury Mobile Slide-Over Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
            <div
              className="mobile-drawer-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top Header */}
              <div className="mobile-drawer-top">
                <Link href="/" className="mobile-drawer-brand" onClick={() => setMobileOpen(false)}>
                  <span className="brand-mark" style={{ width: 34, height: 34 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="" />
                  </span>
                  <div>
                    <strong style={{ fontSize: "1.05rem", display: "block", lineHeight: 1.1 }}>Hun Chet</strong>
                    <span style={{ fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.08em" }}>All Nations Church</span>
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

              {/* 1-Tap Quick Language Selector Pills */}
              <div className="mobile-drawer-lang-bar">
                {LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={router.asPath}
                    locale={l.code}
                    className={`mobile-drawer-lang-btn ${locale === l.code ? "is-active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.short} • {l.name}
                  </Link>
                ))}
              </div>

              {/* Categorized Drawer Navigation */}
              <div className="mobile-drawer-content">
                {/* Section 1: Home & Daily Bread */}
                <div className="mobile-drawer-group">
                  <span className="mobile-drawer-kicker">
                    {locale === "km" ? "ព្រះបន្ទូលប្រចាំថ្ងៃ" : "Daily Bread & Sanctuary"}
                  </span>

                  <Link
                    href="/"
                    className={`mobile-drawer-item ${router.pathname === "/" ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="mobile-drawer-item-left">
                      <span className="mobile-drawer-item-icon">
                        <CheckIcon style={{ width: 14, height: 14 }} />
                      </span>
                      <div>
                        <strong className="mobile-drawer-item-text">{t("nav.home")}</strong>
                        <span className="mobile-drawer-item-sub">
                          {locale === "km" ? "ទំព័រដើម និងព័ត៌មានទូទៅ" : "Sanctuary overview & welcome"}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/devotions"
                    className={`mobile-drawer-item ${isRouteActive("/devotions") ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="mobile-drawer-item-left">
                      <span className="mobile-drawer-item-icon">
                        <BookOpenIcon style={{ width: 15, height: 15 }} />
                      </span>
                      <div>
                        <strong className="mobile-drawer-item-text">{t("nav.devotions")}</strong>
                        <span className="mobile-drawer-item-sub">
                          {locale === "km" ? "៣៦៥ ថ្ងៃ & ៥០០ ខគម្ពីរ ១៩៥៤" : "365-Day journey & 500 verses"}
                        </span>
                      </div>
                    </div>
                    <span className="nav-badge-pill" style={{ flexShrink: 0 }}>
                      {devotionsBadge}
                    </span>
                  </Link>
                </div>

                {/* Section 2: Biblical Teaching & Media */}
                <div className="mobile-drawer-group">
                  <span className="mobile-drawer-kicker">
                    {loc(NAV_GROUPS.teaching.label)}
                  </span>

                  {NAV_GROUPS.teaching.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-drawer-item ${isRouteActive(item.href) ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="mobile-drawer-item-left">
                        <span className="mobile-drawer-item-icon">
                          <NavIcon type={item.icon} />
                        </span>
                        <div>
                          <strong className="mobile-drawer-item-text">{loc(item.title)}</strong>
                          <span className="mobile-drawer-item-sub">{loc(item.desc)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Section 3: Church Life & Heritage */}
                <div className="mobile-drawer-group">
                  <span className="mobile-drawer-kicker">
                    {loc(NAV_GROUPS.churchLife.label)}
                  </span>

                  {NAV_GROUPS.churchLife.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-drawer-item ${isRouteActive(item.href) ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="mobile-drawer-item-left">
                        <span className="mobile-drawer-item-icon">
                          <NavIcon type={item.icon} />
                        </span>
                        <div>
                          <strong className="mobile-drawer-item-text">{loc(item.title)}</strong>
                          <span className="mobile-drawer-item-sub">{loc(item.desc)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/contact"
                    className={`mobile-drawer-item ${isRouteActive("/contact") ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="mobile-drawer-item-left">
                      <span className="mobile-drawer-item-icon">
                        <MapPinIcon style={{ width: 14, height: 14 }} />
                      </span>
                      <div>
                        <strong className="mobile-drawer-item-text">{t("nav.contact")}</strong>
                        <span className="mobile-drawer-item-sub">
                          {locale === "km" ? "ម៉ោងថ្វាយបង្គំ & ទីតាំងក្រុមជំនុំ" : "Sunday 8:30 AM & Campus Directions"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Section 4: Kingdom Partnership */}
                <div className="mobile-drawer-group">
                  <span className="mobile-drawer-kicker">
                    {locale === "km" ? "ការចូលរួមចំណែកក្នុងព្រះរាជ្យ" : "Kingdom Stewardship"}
                  </span>

                  <Link
                    href="/partner-with-us"
                    className={`mobile-drawer-item ${isRouteActive("/partner-with-us") ? "active" : ""}`}
                    style={{ borderColor: "var(--gold)", background: "rgba(184, 155, 94, 0.06)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="mobile-drawer-item-left">
                      <span className="mobile-drawer-item-icon" style={{ background: "var(--gold)", color: "#081424" }}>
                        <HeartIcon style={{ width: 14, height: 14 }} />
                      </span>
                      <div>
                        <strong className="mobile-drawer-item-text" style={{ color: "var(--navy-dark)" }}>
                          {partnerBtnLabel}
                        </strong>
                        <span className="mobile-drawer-item-sub">
                          {locale === "km" ? "ចូលរួមចំណែកពង្រីកដំណឹងល្អ" : "Support Gospel outreach & discipleship"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Pastoral Contact Footer Card */}
                <div className="mobile-drawer-footer-card">
                  <strong className="mobile-drawer-footer-title">
                    {locale === "km" ? "ចូលរួមថ្វាយបង្គំថ្ងៃអាទិត្យ" : "Join Sunday Service: 8:30 AM"}
                  </strong>
                  <p className="mobile-drawer-footer-desc">
                    {locale === "km"
                      ? "សូមស្វាគមន៍មកកាន់ក្រុមជំនុំអលណេសិន រាជធានីភ្នំពេញ។"
                      : "All Nations Church Campus, Trapaing Krasang, Phnom Penh."}
                  </p>
                  <a
                    href="https://t.me/+855966875886"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-drawer-telegram-btn"
                  >
                    <TelegramIcon style={{ width: 15, height: 15 }} />
                    <span>{locale === "km" ? "ទាក់ទងគ្រូគង្វាលតាម Telegram" : "Pastoral Telegram Hotline"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
