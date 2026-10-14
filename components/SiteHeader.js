import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  CloseIcon,
  CheckIcon,
  PhoneIcon,
  CalendarIcon,
  FacebookIcon,
} from "./Icons";

const LANG_DISPLAY = {
  km: "ខ្មែរ",
  en: "English",
  ko: "한국어",
  zh: "中文",
};

const STRINGS = {
  blogBadge: {
    km: "ប្លុកផ្ទាល់ខ្លួន",
    en: "Personal Blog",
    ko: "개인 블로그",
    zh: "个人博客",
  },
  topWelcome: {
    km: "សូមស្វាគមន៍មកកាន់ប្លុកផ្ទាល់ខ្លួនរបស់ ហ៊ុន ចិត្ត — ចែករំលែកព្រះបន្ទូល ជំនឿ និងជីវិត",
    en: "Welcome to Hun Chet's Personal Blog — Biblical Teaching, Faith & Reflections",
    ko: "훈 쳇 사역 리더의 개인 블로그 — 성경 강해, 믿음과 삶의 나눔",
    zh: "欢迎访问 Hun Chet 个人博客 — 圣经讲道、真理与生命见证",
  },
  authorName: {
    km: "ហ៊ុន ចិត្ត",
    en: "Hun Chet",
    ko: "훈 쳇",
    zh: "Hun Chet",
  },
  blogSubtitle: {
    km: "ប្លុកផ្ទាល់ខ្លួន • ជំនឿ & ការចែករំលែក",
    en: "Personal Blog • Faith & Writing",
    ko: "개인 블로그 • 믿음과 글",
    zh: "个人博客 • 信仰与写作",
  },
  readArticlesBtn: {
    km: "អានអត្ថបទ",
    en: "Read Articles",
    ko: "칼럼 읽기",
    zh: "阅读文章",
  },
  daily365: {
    km: "ព្រះបន្ទូល ៣៦៥ ថ្ងៃ",
    en: "365 Devotions",
    ko: "365일 말씀 묵상",
    zh: "365每日灵修",
  },
  contactAuthor: {
    km: "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត",
    en: "Contact Hun Chet",
    ko: "사역자에게 연락하기",
    zh: "联系作者",
  },
};

// 1. Hun Chet Personal Blog Top Bar
function TopBlogBar({ locale }) {
  const tStr = (key) => STRINGS[key]?.[locale] || STRINGS[key]?.km || STRINGS[key]?.en || "";

  return (
    <div className="top-church-bar">
      <div className="top-church-inner">
        {/* Left: Blog badge + Welcome text */}
        <div className="top-church-left">
          <span
            className="anc-btn-megaphone"
            aria-hidden="true"
            style={{ background: "rgba(184, 155, 94, 0.2)", color: "var(--gold)" }}
          >
            <span>{tStr("blogBadge")}</span>
          </span>
          <span className="anc-worship-text">{tStr("topWelcome")}</span>
        </div>

        {/* Right: 365 Devotions shortcut + Telegram */}
        <div className="top-church-right">
          <Link
            href="/devotions"
            className="anc-view-flyer-btn"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {tStr("daily365")}
          </Link>
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

  const current = LOCALES.find((l) => l.code === (router.locale || "km"));

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

// 3. Main Hun Chet Personal Blog Header Component
export default function SiteHeader() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tStr = (key) => STRINGS[key]?.[locale] || STRINGS[key]?.km || STRINGS[key]?.en || "";

  const isRouteActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
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
  }, [mobileOpen]);

  const authorName = tStr("authorName");
  const blogSubtitle = tStr("blogSubtitle");

  return (
    <>
      {/* 1. Hun Chet Personal Blog Top Notice Bar */}
      <TopBlogBar locale={locale} />

      {/* 2. Main Sticky Header */}
      <header className="site-header" role="banner">
        <div className="site-header-inner">
          {/* Logo & Author Personal Brand */}
          <Link href="/" className="site-logo" aria-label="Hun Chet - Personal Blog">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt={authorName} />
            </span>
            <span className="site-logo-text-group">
              <span className="site-logo-text">{authorName}</span>
              <span className="site-logo-sub">{blogSubtitle}</span>
            </span>
          </Link>

          {/* Desktop Navigation Menu for Personal Blog */}
          <nav className="site-nav desktop-nav" aria-label="Main Navigation">
            {/* 1. Home */}
            <Link
              href="/"
              className={`nav-link ${router.pathname === "/" ? "active" : ""}`}
            >
              {t("nav.home")}
            </Link>

            {/* 2. Articles */}
            <Link
              href="/articles"
              className={`nav-link ${isRouteActive("/articles") ? "active" : ""}`}
            >
              {t("nav.article")}
            </Link>

            {/* 3. Daily Devotions [365] */}
            <Link
              href="/devotions"
              className={`nav-link ${isRouteActive("/devotions") ? "active" : ""}`}
            >
              <span>{t("nav.devotions")}</span>
              <span className="nav-badge-365">365</span>
            </Link>

            {/* 4. Library */}
            <Link
              href="/library"
              className={`nav-link ${isRouteActive("/library") ? "active" : ""}`}
            >
              {t("nav.library")}
            </Link>

            {/* 5. Resource (Videos & Media) */}
            <Link
              href="/resource"
              className={`nav-link ${isRouteActive("/resource") ? "active" : ""}`}
            >
              {t("nav.resource")}
            </Link>

            {/* 6. Gallery */}
            <Link
              href="/gallery"
              className={`nav-link ${isRouteActive("/gallery") ? "active" : ""}`}
            >
              {t("nav.gallery")}
            </Link>

            {/* 7. About Me */}
            <Link
              href="/about"
              className={`nav-link ${isRouteActive("/about") ? "active" : ""}`}
            >
              {t("nav.about")}
            </Link>

            {/* 8. Contact */}
            <Link
              href="/contact"
              className={`nav-link ${isRouteActive("/contact") ? "active" : ""}`}
            >
              {t("nav.contact")}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitch />

            {/* Read Articles Quick CTA */}
            <Link
              href="/articles"
              className="btn btn-primary"
              style={{
                padding: "0.45rem 1.15rem",
                fontSize: "0.82rem",
                borderRadius: "999px",
                marginLeft: "0.25rem",
                boxShadow: "0 2px 8px rgba(184, 155, 94, 0.25)",
              }}
            >
              {tStr("readArticlesBtn")}
            </Link>
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

      {/* 3. Hun Chet Personal Blog Mobile Drawer */}
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
            {/* Drawer Top Header with Author Info */}
            <div className="mobile-drawer-top">
              <Link href="/" className="mobile-drawer-brand" onClick={() => setMobileOpen(false)}>
                <span className="brand-mark" style={{ width: 42, height: 42 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO} alt={authorName} />
                </span>
                <div>
                  <strong style={{ fontSize: "1.2rem", display: "block", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                    {authorName}
                  </strong>
                  <span style={{ fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                    {blogSubtitle}
                  </span>
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

            {/* Mobile Drawer Body */}
            <div className="anc-mobile-drawer-body">
              {/* Language Selector Pills */}
              <div className="anc-quick-bar" style={{ paddingBottom: "0.5rem" }}>
                <div className="anc-lang-pills" style={{ width: "100%", justifyContent: "space-between" }}>
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={router.asPath}
                      locale={l.code}
                      className={`anc-lang-pill ${locale === l.code ? "is-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                      style={{ flex: 1, textAlign: "center" }}
                    >
                      {LANG_DISPLAY[l.code] || l.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Personal Blog Navigation Links */}
              <div className="anc-nav-card">
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
                  href="/articles"
                  className={`anc-nav-link ${isRouteActive("/articles") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(184, 155, 94, 0.15)", color: "var(--gold)" }}>
                      <BookOpenIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.article")}</span>
                  </div>
                </Link>

                <Link
                  href="/devotions"
                  className={`anc-nav-link ${isRouteActive("/devotions") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(21, 58, 99, 0.1)", color: "#153a63" }}>
                      <CalendarIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.devotions")}</span>
                  </div>
                  <span className="anc-pill-badge" style={{ background: "#153a63", color: "#ffffff" }}>365</span>
                </Link>

                <Link
                  href="/library"
                  className={`anc-nav-link ${isRouteActive("/library") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7" }}>
                      <BookOpenIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.library")}</span>
                  </div>
                </Link>

                <Link
                  href="/resource"
                  className={`anc-nav-link ${isRouteActive("/resource") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
                      <PlayIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.resource")}</span>
                  </div>
                </Link>

                <Link
                  href="/gallery"
                  className={`anc-nav-link ${isRouteActive("/gallery") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(5, 150, 105, 0.1)", color: "#059669" }}>
                      <CameraIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.gallery")}</span>
                  </div>
                </Link>

                <Link
                  href="/about"
                  className={`anc-nav-link ${isRouteActive("/about") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#6366f1" }}>
                      <UserIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.about")}</span>
                  </div>
                </Link>

                <Link
                  href="/contact"
                  className={`anc-nav-link ${isRouteActive("/contact") ? "is-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="anc-nav-link-left">
                    <span className="anc-link-icon-box" style={{ background: "rgba(184, 155, 94, 0.15)", color: "var(--gold)" }}>
                      <PhoneIcon style={{ width: 14, height: 14 }} />
                    </span>
                    <span className="anc-link-title">{t("nav.contact")}</span>
                  </div>
                </Link>
              </div>

              {/* Direct Author Contact Footer */}
              <div className="anc-drawer-footer-card">
                <a
                  href="https://t.me/+855966875886"
                  target="_blank"
                  rel="noreferrer"
                  className="anc-bottom-telegram-btn"
                >
                  <TelegramIcon style={{ width: 15, height: 15 }} />
                  <span>Telegram (+855 96 687 5886)</span>
                </a>

                <a
                  href="https://www.facebook.com/hunchet2024/"
                  target="_blank"
                  rel="noreferrer"
                  className="anc-bottom-plan-btn"
                  style={{ textDecoration: "none", marginTop: "0.5rem" }}
                >
                  <FacebookIcon style={{ width: 15, height: 15, color: "#1877f2" }} />
                  <span>facebook.com/hunchet2024</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
