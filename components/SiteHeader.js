import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES, useT } from "../lib/i18n";
import {
  GlobeIcon,
  CloseIcon,
  TelegramIcon,
  ArrowRightIcon,
} from "./Icons";

export function Brand({ locale }) {
  const isKm = locale === "km";
  return (
    <Link
      href="/"
      className="oc-brand"
      aria-label="Hun Chet Personal Blog Home"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="oc-brand-logo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Hun Chet Brand Mark" width="44" height="44" />
      </span>
      <span className="oc-brand-divider" aria-hidden="true" />
      <span className="oc-brand-text">
        <strong className="oc-brand-title">HUN CHET</strong>
        <small className="oc-brand-subtitle">
          {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត • ប្លុកផ្ទាល់ខ្លួន" : "Personal Blog & Ministry"}
        </small>
      </span>
    </Link>
  );
}

// Language Switcher Dropdown
function LanguageSwitch({ isScrolled, isHome }) {
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
    <div className="oc-lang-switch" ref={wrapRef}>
      <button
        type="button"
        className="oc-lang-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("lang.switch")}
      >
        <GlobeIcon style={{ width: 14, height: 14 }} />
        <span>{current ? current.short : "KM"}</span>
        <span className="oc-caret" aria-hidden="true" />
      </button>

      {open && (
        <ul className="oc-lang-menu">
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

export default function SiteHeader() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";
  const isKm = locale === "km";
  const isHome = router.pathname === "/";

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath, router.locale]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("oc-menu-open");
      return () => document.body.classList.remove("oc-menu-open");
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/articles", label: t("nav.article") },
    { href: "/devotions", label: t("nav.devotions") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/library", label: t("nav.library") },
    { href: "/resource", label: t("nav.resource") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isLinkActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`oc-header ${isHome ? "oc-header-home" : ""} ${
          scrolled || !isHome || mobileOpen ? "oc-scrolled" : ""
        }`}
        role="banner"
      >
        <nav className="oc-nav" aria-label="Main Navigation">
          <Brand locale={locale} />

          {/* Desktop Nav Links */}
          <div className="oc-nav-desktop">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`oc-nav-link ${isLinkActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitch isScrolled={scrolled} isHome={isHome} />

            {/* Sharp One Church CTA Button */}
            <Link href="/articles" className="oc-nav-cta">
              <span>{isKm ? "អានអត្ថបទ" : "Read Articles"}</span>
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="oc-nav-mobile-toggle">
            <LanguageSwitch isScrolled={scrolled} isHome={isHome} />
            <button
              type="button"
              className="oc-menu-button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/* One Church Minimalist Mobile Drawer */}
      {mounted && typeof document !== "undefined" && mobileOpen && createPortal(
        <div
          className="oc-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="oc-mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="oc-mobile-drawer-head">
              <Brand locale={locale} />
              <button
                type="button"
                className="oc-mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div className="oc-mobile-drawer-body">
              <ul className="oc-mobile-nav-list">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`oc-mobile-link ${isLinkActive(item.href) ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Language Pills in Mobile Drawer */}
              <div className="oc-mobile-lang-row">
                <span className="oc-eyebrow" style={{ marginBottom: "0.5rem" }}>
                  {isKm ? "ជ្រើសរើសភាសា" : "Language"}
                </span>
                <div className="oc-mobile-lang-pills">
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={router.asPath}
                      locale={l.code}
                      className={`oc-lang-pill ${locale === l.code ? "is-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer CTA */}
              <div className="oc-mobile-drawer-actions">
                <Link
                  href="/articles"
                  className="oc-button oc-solid"
                  style={{ width: "100%", textAlign: "center" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Explore Articles"}</span>
                </Link>

                <a
                  href="https://t.me/+855966875886"
                  target="_blank"
                  rel="noreferrer"
                  className="oc-button oc-outline-dark"
                  style={{ width: "100%", textAlign: "center", marginTop: "0.75rem" }}
                >
                  <TelegramIcon style={{ width: 14, height: 14, marginRight: 8 }} />
                  <span>Telegram</span>
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
