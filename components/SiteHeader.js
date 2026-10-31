import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES, useT } from "../lib/i18n";
import { SearchIcon, ArrowUpRight } from "./Icons";

export function Brand({ locale }) {
  const isKm = locale === "km";
  return (
    <Link
      href="/"
      className="oc-brand"
      aria-label="Hun Chet Blog Home"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="oc-brand-logo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Hun Chet" width="44" height="44" />
      </span>
      <span className="oc-brand-divider" aria-hidden="true" />
      <span className="oc-brand-text">
        <strong className="oc-brand-title" lang="en">HUN CHET</strong>
        <small className="oc-brand-khmer" lang="km">
          {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}
        </small>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";
  const isKm = locale === "km";
  const isHome = router.pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath, router.locale]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("oc-menu-open");
    } else {
      document.body.classList.remove("oc-menu-open");
    }
    return () => document.body.classList.remove("oc-menu-open");
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
      <a className="oc-skip-link" href="#main-content">
        {isKm ? "ចូលទៅកាន់មាតិកា" : "Skip to content"}
      </a>

      <header
        className={`oc-header ${isHome ? "oc-header-home" : ""} ${
          scrolled || !isHome || mobileOpen ? "oc-scrolled" : ""
        }`}
        role="banner"
      >
        <nav className="oc-nav" aria-label="Main navigation">
          <Brand locale={locale} />

          <button
            className="oc-menu-button"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="oc-site-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
          </button>

          <div
            className={`oc-nav-links ${mobileOpen ? "oc-nav-open" : ""}`}
            id="oc-site-menu"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isLinkActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/articles"
              className="oc-nav-cta"
              onClick={() => setMobileOpen(false)}
            >
              <span>{isKm ? "អានអត្ថបទ" : "Read Articles"}</span>
              <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 6, verticalAlign: "-1px" }} />
            </Link>

            <div className="oc-header-tools">
              <div className="oc-languages" role="group" aria-label="Language">
                {LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={router.asPath}
                    locale={l.code}
                    hrefLang={l.code}
                    lang={l.code}
                    aria-pressed={locale === l.code}
                    style={{
                      fontSize: "11.5px",
                      opacity: locale === l.code ? 1 : 0.75,
                      borderBottom: locale === l.code ? "1.5px solid currentColor" : "none",
                      fontWeight: locale === l.code ? 700 : 500,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      paddingBottom: "2px",
                      textDecoration: "none",
                    }}
                  >
                    {l.short}
                  </Link>
                ))}
              </div>

              <Link
                href="/articles"
                className="oc-search"
                aria-label={isKm ? "ស្វែងរកអត្ថបទ" : "Search articles"}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 28,
                  height: 28,
                  color: "inherit",
                }}
              >
                <SearchIcon width={14} height={14} />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
