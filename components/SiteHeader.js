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

function LanguageSwitch() {
  const router = useRouter();
  const t = useT();
  const current = router.locale || "en";

  return (
    <div className="lang-switch" role="group" aria-label={t("lang.switch")}>
      {LOCALES.map((l) => (
        <Link
          key={l.code}
          href={router.asPath}
          locale={l.code}
          hrefLang={l.code}
          lang={l.code}
          className={l.code === current ? "is-active" : ""}
          aria-current={l.code === current ? "true" : undefined}
          title={l.name}
        >
          {l.short}
        </Link>
      ))}
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
