import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGO } from "../lib/media";
import { LOCALES } from "../lib/i18n";
import { SearchIcon, ArrowUpRight, ChevronDownIcon } from "./Icons";

export function Brand({ locale }) {
  const isKm = locale === "km";
  return (
    <Link
      href="/"
      className="oc-brand"
      aria-label="Hun Chet Blog Home"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="oc-brand-seal" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Hun Chet" width="44" height="44" />
        <span className="oc-seal-tick" aria-hidden="true" title="Verified">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.454-1.52.185-3.175-.82-4.18s-2.66-1.274-4.18-.82C14.7 2.625 13.33 1.75 11.75 1.75S8.8 2.625 8.148 3.9c-1.52-.454-3.175-.185-4.18.82s-1.274 2.66-.82 4.18C1.875 9.55 1 10.92 1 12.5s.875 2.95 2.148 3.6c-.454 1.52-.185 3.175.82 4.18s2.66 1.274 4.18.82c.652 1.275 2.022 2.15 3.602 2.15s2.95-.875 3.602-2.15c1.52.454 3.175.185 4.18-.82s1.274-2.66.82-4.18c1.273-.65 2.148-2.02 2.148-3.6z" fill="#1D9BF0"/>
            <path d="M10.25 16.5L6 12.25L7.414 10.836L10.25 13.672L16.586 7.336L18 8.75L10.25 16.5Z" fill="#FFFFFF"/>
          </svg>
        </span>
      </span>
      <span className="oc-brand-divider" aria-hidden="true" />
      <span className="oc-brand-text">
        <strong className="oc-brand-title" lang="en">HUN CHET</strong>
        <small className="oc-brand-subtitle" lang={isKm ? "km" : "en"}>
          {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "PASTORAL MINISTRY"}
        </small>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const locale = router.locale || "km";
  const isKm = locale === "km";
  const isHome = router.pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and any open details dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    if (headerRef.current) {
      const details = headerRef.current.querySelectorAll("details.oc-dropdown[open]");
      details.forEach((d) => d.removeAttribute("open"));
    }
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

  // Close open dropdowns when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        const details = headerRef.current.querySelectorAll("details.oc-dropdown[open]");
        details.forEach((d) => d.removeAttribute("open"));
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    if (headerRef.current) {
      const details = headerRef.current.querySelectorAll("details.oc-dropdown[open]");
      details.forEach((d) => d.removeAttribute("open"));
    }
  };

  const navArticles = {
    label: {
      km: "អត្ថបទ",
      en: "Articles",
      ko: "말씀 칼럼",
      zh: "文章专栏",
    },
    items: [
      {
        href: "/articles",
        label: { km: "អត្ថបទទាំងអស់", en: "All Articles", ko: "전체 칼럼", zh: "所有文章" },
        badge: "ALL",
      },
      {
        href: "/categories",
        label: { km: "រុករកតាមប្រធានបទ", en: "Browse Topics & Categories", ko: "주제별 모아보기", zh: "按分类浏览" },
        badge: "TOPICS",
      },
      {
        isDivider: true,
        title: { km: "ប្រធានបទអត្ថបទ", en: "CATEGORIES", ko: "주제 카테고리", zh: "分类目录" },
      },
      {
        href: "/articles?cat=salvation",
        label: { km: "ដំណឹងល្អ & សេចក្តីសង្គ្រោះ", en: "Gospel & Salvation", ko: "복음과 구원", zh: "福音与救恩" },
      },
      {
        href: "/articles?cat=christian-living",
        label: { km: "ជីវិតគ្រីស្ទបរិស័ទ", en: "Christian Living", ko: "그리스도인의 삶", zh: "基督徒的生活" },
      },
      {
        href: "/articles?cat=prayer",
        label: { km: "ការអធិស្ឋាន & ជំនឿ", en: "Prayer & Faith", ko: "기도와 신앙", zh: "祷告与信心" },
      },
      {
        href: "/articles?cat=biography",
        label: { km: "គំរូនៃជំនឿ & បេសកកម្ម", en: "Heroes of Faith", ko: "신앙의 위인과 선교", zh: "信心伟人与宣教" },
      },
      {
        href: "/articles?cat=character",
        label: { km: "ចរិតលក្ខណៈ & សីលធម៌", en: "Character & Sanctification", ko: "성품과 성화", zh: "品格与成圣" },
      },
      {
        href: "/articles?cat=pastoral-care",
        label: { km: "ការព្យាបាលចិត្ត & ការថែទាំ", en: "Pastoral Care & Healing", ko: "치유와 돌봄", zh: "心灵医治与关怀" },
      },
    ],
  };

  const navResources = {
    label: {
      km: "ព្រះបន្ទូល & ធនធាន",
      en: "Word & Resources",
      ko: "말씀과 자료",
      zh: "圣道与资源",
    },
    items: [
      {
        href: "/devotions",
        label: { km: "ព្រះបន្ទូលប្រចាំថ្ងៃ ៣៦៥", en: "365 Daily Devotions", ko: "365 매일 묵상", zh: "365每日灵修" },
        sub: { km: "ខគម្ពីរ និងការសញ្ជឹងគិតប្រចាំថ្ងៃ", en: "Daily Scripture & reflections", ko: "매일 성경 구절", zh: "每日经文灵修" },
      },
      {
        href: "/library",
        label: { km: "បណ្ណាល័យ Matthew Henry", en: "Theological Library", ko: "매튜 헨리 신학 도서관", zh: "马太亨利神学图书馆" },
        sub: { km: "គម្ពីរបកស្រាយ និងសៀវភៅជំនឿ", en: "Commentaries & Biblical books", ko: "성경 주석과 신앙 도서", zh: "圣经注释与属灵书籍" },
      },
      {
        href: "/resource",
        label: { km: "វីដេអូបង្រៀន & ធម្មទេសនា", en: "Video Sermons & Teaching", ko: "설교 영상과 강의", zh: "讲道影片与教学" },
        sub: { km: "ការបង្រៀនព្រះបន្ទូលតាមប្រព័ន្ធឌីជីថល", en: "Digital video expositions", ko: "디지털 말씀 영상", zh: "数码讲道影音" },
      },
      {
        href: "/gallery",
        label: { km: "រូបភាពព័ន្ធកិច្ច", en: "Ministry Photo Gallery", ko: "사역 갤러리", zh: "事工图库" },
        sub: { km: "ទិដ្ឋភាពនៃការបម្រើព្រះ និងការជួបជុំ", en: "Moments of worship & service", ko: "예배와 교제의 순간들", zh: "崇拜与事奉时刻" },
      },
    ],
  };

  const navAbout = {
    label: {
      km: "អំពីយើង",
      en: "About",
      ko: "소개",
      zh: "关于",
    },
    items: [
      {
        href: "/about",
        label: { km: "ដំណើរជីវិត & ការត្រាស់ហៅ", en: "Story & Calling", ko: "사역 여정과 부르심", zh: "生命故事与呼召" },
        sub: { km: "ស្វែងយល់ពីលោកគ្រូ ហ៊ុន ចិត្ត", en: "About Leader Hun Chet", ko: "훈 쳇 리더 소개", zh: "了解洪杰导师" },
      },
      {
        href: "/partner-with-us",
        label: { km: "ចូលរួមជាដៃគូព័ន្ធកិច្ច", en: "Partner With Us", ko: "사역 파트너십", zh: "与我们同工" },
        sub: { km: "អធិស្ឋាន និងគាំទ្រព័ន្ធកិច្ច", en: "Support the ongoing work", ko: "사역 후원 및 기도 동역", zh: "支持与祷告同工" },
      },
      {
        href: "/contact",
        label: { km: "ទំនាក់ទំនង & សំណូមពរអធិស្ឋាន", en: "Contact & Prayer", ko: "연락처 및 기도 요청", zh: "联系与代祷" },
        sub: { km: "ទូរស័ព្ទ តេឡេក្រាម ទីតាំង", en: "Phone, Telegram & Location", ko: "전화, 텔레그램, 위치", zh: "电话、电报与地址" },
      },
    ],
  };

  const isArticlesActive =
    router.pathname.startsWith("/articles") ||
    router.pathname.startsWith("/categories") ||
    router.pathname.startsWith("/category") ||
    router.pathname.startsWith("/posts");

  const isResourcesActive = ["/devotions", "/library", "/resource", "/gallery"].some((p) =>
    router.pathname.startsWith(p)
  );

  const isAboutActive = ["/about", "/partner-with-us", "/contact"].some((p) =>
    router.pathname.startsWith(p)
  );

  const getT = (obj) => {
    if (!obj) return "";
    return obj[locale] || obj.km || obj.en || "";
  };

  const renderDropdown = (data, isActive) => (
    <details className="oc-dropdown" name="oc-navigation">
      <summary
        style={{
          borderBottom: isActive ? "2px solid currentColor" : "none",
          fontWeight: isActive ? 700 : 600,
        }}
      >
        <span>{getT(data.label)}</span>
        <ChevronDownIcon width={10} height={10} style={{ marginLeft: 2 }} />
      </summary>
      <div className="oc-dropdown-panel" role="menu">
        {data.items.map((item, idx) => {
          if (item.isDivider) {
            return (
              <div key={`divider-${idx}`} className="oc-dropdown-divider">
                {getT(item.title)}
              </div>
            );
          }
          const isItemActive = router.asPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              role="menuitem"
              aria-current={isItemActive ? "page" : undefined}
            >
              <div className="oc-dropdown-link-inner">
                <span style={{ fontWeight: isItemActive ? 700 : 500 }}>
                  {getT(item.label)}
                </span>
                {item.badge && (
                  <span className="oc-dropdown-badge">{item.badge}</span>
                )}
              </div>
              {item.sub && (
                <span className="oc-dropdown-sub">{getT(item.sub)}</span>
              )}
            </Link>
          );
        })}
      </div>
    </details>
  );

  return (
    <>
      <a className="oc-skip-link" href="#main-content">
        {isKm ? "ចូលទៅកាន់មាតិកា" : "Skip to content"}
      </a>

      <header
        ref={headerRef}
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
            {/* 1. Home Link */}
            <Link
              href="/"
              onClick={closeAll}
              aria-current={router.pathname === "/" ? "page" : undefined}
            >
              {isKm ? "ទំព័រដើម" : locale === "ko" ? "홈" : locale === "zh" ? "首页" : "Home"}
            </Link>

            {/* 2. Articles & Categories Sub Drop */}
            {renderDropdown(navArticles, isArticlesActive)}

            {/* 3. Word & Resources Sub Drop */}
            {renderDropdown(navResources, isResourcesActive)}

            {/* 4. About & Ministry Sub Drop */}
            {renderDropdown(navAbout, isAboutActive)}

            {/* CTA Wireframe Button */}
            <Link
              href="/articles"
              className="oc-nav-cta"
              onClick={closeAll}
            >
              <span>{isKm ? "អានអត្ថបទ" : "Read Articles"}</span>
              <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 6, verticalAlign: "-1px" }} />
            </Link>

            {/* Language Switcher & Search */}
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
                onClick={closeAll}
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
