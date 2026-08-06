import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES, useT } from "../lib/i18n";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/library", key: "nav.library" },
  { href: "/resource", key: "nav.resource" },
  { href: "/articles", key: "nav.article" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.6 15.6 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14A7.86 7.86 0 0 1 4 12c0-.69.1-1.36.26-2h3.38a16.5 16.5 0 0 0 0 4H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.07 16zm2.95-8H5.07a7.99 7.99 0 0 1 4.33-3.56A15.6 15.6 0 0 0 8.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82A13.7 13.7 0 0 1 12 19.96zM14.34 14H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4zm.26 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a7.99 7.99 0 0 1-4.33 3.56zM16.36 14a16.5 16.5 0 0 0 0-4h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}

function LanguageSwitch() {
  const router = useRouter();
  const t = useT();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const current = LOCALES.find((l) => l.code === (router.locale || "en"));

  // Close on outside click or Escape.
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

export default function SiteHeader() {
  const router = useRouter();
  const t = useT();

  const isActive = (href) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo">
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Hun Chet" />
          </span>
          <span>
            <span className="site-logo-text">Hun Chet</span>
            <span className="site-logo-sub">Faith &amp; Ministry</span>
          </span>
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {t(item.key)}
            </Link>
          ))}
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
