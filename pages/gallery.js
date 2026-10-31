import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import { useT } from "../lib/i18n";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../lib/galleryData";
import {
  PlayIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpRight,
} from "../components/Icons";

export default function Gallery() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";
  const isKm = locale === "km";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const activeItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const loc = (obj) => {
    if (!obj) return "";
    return obj[locale] || obj.km || obj.en || "";
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    }
  }, [selectedIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    }
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <div className="oc-site">
      <Head>
        <title>
          {isKm
            ? "កម្រងរូបភាពព័ន្ធកិច្ច និងជីវិតក្រុមជំនុំ — ហ៊ុន ចិត្ត"
            : "Ministry & Church Gallery — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "ទិដ្ឋភាពពិតនៃការថ្វាយបង្គំ ការផ្សាយព្រះបន្ទូល ពិធីបុណ្យជ្រមុជទឹក យុវជន និងព័ន្ធកិច្ចឌីជីថលលោកគ្រូ ហ៊ុន ចិត្ត រាជធានីភ្នំពេញ។"
              : "Authentic photography and video records of Sunday worship, pastoral preaching, holy baptism, and next-gen youth ministry in Hun Chet Ministry, Phnom Penh."
          }
        />
        <meta
          property="og:title"
          content="Ministry & Church Gallery — Hun Chet"
        />
        <meta
          property="og:image"
          content="/images/pastors-pulpit.jpg"
        />
      </Head>

      <SiteHeader />

      {/* 1. ONE CHURCH HERO */}
      <SubpageHero
        bgImage="/images/youth-fellowship-2025-group.jpg"
        kicker={isKm ? "ជីវិតរួមគ្នា • រូបភាព និងវីដេអូ" : "LIFE TOGETHER • PHOTOS & VIDEOS"}
        title={isKm ? "កម្រងរូបភាពព័ន្ធកិច្ច" : "MINISTRY GALLERY"}
        subtitle={
          isKm
            ? "ទិដ្ឋភាពពិតនៃការថ្វាយបង្គំ ការផ្សាយព្រះបន្ទូលលើវេទិកា ពិធីបុណ្យជ្រមុជទឹក ការប្រកបគ្នារបស់យុវជន និងថ្នាក់រៀនព្រះគម្ពីរកុមារ នៅរាជធានីភ្នំពេញ។"
            : "Authentic glimpses of heartfelt worship, pastoral preaching from the pulpit, water baptism celebrations, and loving fellowship in Hun Chet Ministry."
        }
        breadcrumbs={[
          { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
          { label: isKm ? "កម្រងរូបភាព" : "Gallery" },
        ]}
        stats={[
          { number: "8", label: isKm ? "អាល់ប៊ុម" : "Albums" },
          { number: `${GALLERY_ITEMS.length}+`, label: isKm ? "រូបភាព និងវីដេអូ" : "Moments" },
          { number: "HD", label: isKm ? "កម្រិតច្បាស់" : "Resolution" },
        ]}
      />

      {/* 2. STICKY CATEGORY FILTER BAR */}
      <section className="oc-gallery-nav-bar" aria-label="Gallery categories">
        <div className="container">
          <div className="oc-gallery-nav-scroll">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedIndex(null);
                  }}
                  className={`oc-gallery-tab ${isActive ? "is-active" : ""}`}
                >
                  <span>{loc(cat.label)}</span>
                  <span className="oc-gallery-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CLEAN GALLERY GRID */}
      <main className="oc-section" style={{ background: "#fcfbf7", paddingBlock: "3.5rem" }}>
        <div className="container">
          {/* Quick Info Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #dcdfda",
              paddingBottom: "1rem",
              marginBottom: "2.5rem",
              fontSize: "12px",
              color: "#626868",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div>
              <span>{isKm ? "កំពុងបង្ហាញ៖ " : "SHOWING: "}</span>
              <strong style={{ color: "#141716", fontWeight: 700 }}>
                {filteredItems.length} {isKm ? "រូបភាព និងវីដេអូ" : "MOMENTS"}
              </strong>
            </div>
            <span style={{ fontSize: "11px", color: "#8e9595" }}>
              {isKm ? "ចុចលើរូបភាពដើម្បីមើលទំហំធំ ↗" : "CLICK ANY MOMENT TO ENLARGE ↗"}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="oc-gallery-grid">
            {filteredItems.map((item, idx) => {
              const isVideo = item.type === "video";
              const num = String(idx + 1).padStart(2, "0");

              return (
                <article
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="oc-gallery-card"
                >
                  {/* Media Thumbnail Box */}
                  <div className="oc-gallery-media-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={isVideo ? item.poster : item.src}
                      alt={loc(item.title)}
                      loading="lazy"
                    />

                    {/* Clean Kicker Badge (Number + Category) */}
                    <div className="oc-gallery-kicker">
                      {num} / {loc(item.badge)}
                    </div>

                    {/* Video Duration / Indicator */}
                    {isVideo && (
                      <>
                        <div className="oc-gallery-video-pill">
                          {item.duration || "VIDEO"}
                        </div>
                        <div className="oc-gallery-play-btn">
                          <div className="oc-gallery-play-icon">
                            <PlayIcon width={20} height={20} style={{ marginLeft: "2px", fill: "#141716", color: "#141716" }} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Content - Clean & Easy to Read */}
                  <div className="oc-gallery-card-content">
                    <div>
                      <h3 className="oc-gallery-card-title">
                        {loc(item.title)}
                      </h3>
                      <p className="oc-gallery-card-desc">
                        {loc(item.description)}
                      </p>
                    </div>

                    <div className="oc-gallery-card-footer">
                      <span style={{ color: "var(--oc-navy)", fontWeight: 700 }}>
                        {item.category.toUpperCase()}
                      </span>
                      <span className="oc-gallery-card-action">
                        <span>{isVideo ? (isKm ? "ទស្សនាវីដេអូ" : "WATCH VIDEO") : (isKm ? "មើលទំហំធំ" : "VIEW FULL")}</span>
                        <ArrowUpRight width={12} height={12} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. HIGH-RESOLUTION LIGHTBOX VIEWER */}
      {selectedIndex !== null && activeItem && (
        <div
          className="oc-lightbox-overlay"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="oc-lightbox-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="oc-lightbox-top">
              <div>
                <span className="oc-lightbox-kicker">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")} • {loc(activeItem.badge)}
                </span>
                <h3 className="oc-lightbox-title">
                  {loc(activeItem.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="oc-lightbox-close"
                aria-label="Close viewer"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>

            {/* Media Center */}
            <div className="oc-lightbox-media">
              {activeItem.type === "video" ? (
                <video
                  key={activeItem.id}
                  autoPlay
                  controls
                  playsInline
                  poster={activeItem.poster}
                  className="oc-lightbox-video"
                >
                  <source src={activeItem.src} type="video/mp4" />
                </video>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={loc(activeItem.title)}
                  className="oc-lightbox-img"
                />
              )}

              {/* Prev / Next controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="oc-lightbox-arrow oc-lightbox-prev"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon width={22} height={22} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="oc-lightbox-arrow oc-lightbox-next"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon width={22} height={22} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption Footer */}
            <div className="oc-lightbox-caption">
              <p className="oc-lightbox-desc">
                {loc(activeItem.description)}
              </p>
              <span className="oc-lightbox-hint">
                {isKm
                  ? "ប្រើគ្រាប់ចុចព្រួញ ← → ដើម្បីផ្លាស់ប្តូររូបភាព • ចុច ESC ដើម្បីបិទ"
                  : "Use ← → arrow keys to navigate • Press ESC to close"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. ONE CHURCH CONNECT BANNER */}
      <ConnectBanner />

      <SiteFooter />
    </div>
  );
}
