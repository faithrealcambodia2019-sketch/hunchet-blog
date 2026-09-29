import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../lib/galleryData";
import {
  CameraIcon,
  PlayIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "../components/Icons";

export default function Gallery() {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "en";

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
    return obj[locale] || obj.en || "";
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

  // Prevent background scroll when lightbox is open
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
    <>
      <Head>
        <title>
          {locale === "km"
            ? "កម្រងរូបភាពព័ន្ធកិច្ច និងក្រុមជំនុំ — ហ៊ុន ចិត្ត"
            : "Ministry & Church Gallery — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            locale === "km"
              ? "ទិដ្ឋភាពពិតនៃការថ្វាយបង្គំ ការផ្សាយព្រះបន្ទូល ពិធីបុណ្យជ្រមុជទឹក យុវជន និងព័ន្ធកិច្ចឌីជីថលនៅក្រុមជំនុំអលណេសិន រាជធានីភ្នំពេញ។"
              : "Authentic photography and video records of Sunday worship, pastoral preaching, holy baptism, and next-gen youth ministry at All Nations Church, Phnom Penh."
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

      {/* 1. STATELY HERO SECTION */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/youth-fellowship-2025-group.jpg"
          alt="All Nations Church Family and Youth"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <CameraIcon style={{ width: 14, height: 14 }} />
            <span>
              {locale === "km"
                ? "ជីវិតរួមគ្នា • រូបភាព និងវីដេអូ"
                : "Life Together • Photos & Videos"}
            </span>
          </div>

          <h1 className="sanctuary-hero-title">
            {locale === "km"
              ? "កម្រងរូបភាពព័ន្ធកិច្ច និងក្រុមជំនុំ"
              : "Ministry & Church Gallery"}
          </h1>

          <p className="sanctuary-hero-subtitle">
            {locale === "km"
              ? "ក្រុមជំនុំអលណេសិន • ព័ន្ធកិច្ចឌីជីថល • ការបណ្តុះសិស្សជំនាន់ក្រោយ"
              : "All Nations Church • Digital Outreach • Generational Discipleship"}
          </p>

          <p className="sanctuary-hero-lead">
            {locale === "km"
              ? "ទិដ្ឋភាពពិតនៃការថ្វាយបង្គំ ការផ្សាយព្រះបន្ទូលលើវេទិកា ពិធីបុណ្យជ្រមុជទឹក ការប្រកបគ្នារបស់យុវជន និងថ្នាក់រៀនព្រះគម្ពីរកុមារ នៅរាជធានីភ្នំពេញ។"
              : "Authentic glimpses of heartfelt worship, pastoral preaching from the pulpit, water baptism celebrations, and loving fellowship at All Nations Church."}
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">8</span>
              <span className="sanctuary-stat-label">
                {locale === "km" ? "អាល់ប៊ុមព័ន្ធកិច្ច" : "Ministry Albums"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">48+</span>
              <span className="sanctuary-stat-label">
                {locale === "km" ? "រូបភាព និងវីដេអូពិត" : "Curated Photos"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">2013–2026</span>
              <span className="sanctuary-stat-label">
                {locale === "km" ? "ប្រវត្តិព័ន្ធកិច្ច" : "Ministry Timeline"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">HD</span>
              <span className="sanctuary-stat-label">
                {locale === "km" ? "គុណភាពច្បាស់" : "Full Resolution"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY FILTER BAR */}
      <nav className="gallery-nav-bar" aria-label="Gallery category filter">
        <div className="container">
          <div className="gallery-nav-scroll">
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
                  className={`gallery-tab-item ${isActive ? "is-active" : ""}`}
                >
                  <span>{loc(cat.label)}</span>
                  <span className="gallery-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. GALLERY GRID */}
      <main className="section" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
              fontSize: "0.82rem",
              color: "var(--muted)",
            }}
          >
            <div>
              <span>{locale === "km" ? "កំពុងបង្ហាញ៖ " : "Showing: "}</span>
              <strong style={{ color: "var(--navy)", fontWeight: 700 }}>
                {filteredItems.length} {locale === "km" ? "រូបភាព និងវីដេអូ" : "Moments"}
              </strong>
            </div>
            <span style={{ fontSize: "0.75rem" }}>
              {locale === "km" ? "ចុចលើរូបភាពដើម្បីមើលទំហំធំ" : "Click any moment to view full size"}
            </span>
          </div>

          <div className="gallery-cards-grid">
            {filteredItems.map((item, idx) => {
              const isVideo = item.type === "video";

              return (
                <article
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="gallery-media-card"
                >
                  <div className="gallery-thumb-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={isVideo ? item.poster : item.src}
                      alt={loc(item.title)}
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(11, 25, 44, 0.92) 0%, rgba(11, 25, 44, 0.2) 60%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Video Play Button Overlay */}
                    {isVideo && (
                      <div className="gallery-play-btn">
                        <div className="gallery-play-icon-box">
                          <PlayIcon style={{ width: 18, height: 18, fill: "var(--navy-dark)", marginLeft: "2px" }} />
                        </div>
                      </div>
                    )}

                    {/* Duration Badge for Videos */}
                    {isVideo && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0.6rem",
                          right: "0.6rem",
                          background: "rgba(0, 0, 0, 0.75)",
                          color: "#ffffff",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.45rem",
                          borderRadius: "2px",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {item.duration}
                      </div>
                    )}

                    {/* Category Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        left: "0.6rem",
                        background: "var(--gold)",
                        color: "var(--navy-dark)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "2px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {loc(item.badge)}
                    </div>

                    {/* Inside Thumbnail Title */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.6rem",
                        left: "0.75rem",
                        right: "0.75rem",
                        color: "#ffffff",
                        pointerEvents: "none",
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.92rem",
                          fontWeight: 700,
                          margin: 0,
                          lineHeight: 1.3,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {loc(item.title)}
                      </h4>
                      {item.title.km && locale !== "km" && (
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--gold)",
                            margin: "2px 0 0",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title.km}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="gallery-card-body">
                    <p>{loc(item.description)}</p>

                    <div className="gallery-card-footer">
                      <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
                        {item.category}
                      </span>
                      <span
                        style={{
                          color: "var(--navy)",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        {isVideo
                          ? (locale === "km" ? "ទស្សនាវីដេអូ" : "Watch Video")
                          : (locale === "km" ? "មើលទំហំធំ" : "View Full Size")}{" "}
                        <ArrowRightIcon style={{ width: 12, height: 12 }} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. INTERACTIVE LIGHTBOX MODAL */}
      {activeItem && (
        <div className="anc-modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div
            className="anc-modal-box"
            style={{ maxWidth: "940px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="anc-modal-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    padding: "0.2rem 0.55rem",
                    background: "var(--gold)",
                    color: "var(--navy-dark)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                >
                  {loc(activeItem.badge)}
                </span>
                <h3
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {loc(activeItem.title)}
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "var(--font-body)" }}>
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="anc-modal-close"
                  aria-label="Close lightbox"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Media Box */}
            <div
              style={{
                position: "relative",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "56vh",
                overflow: "hidden",
              }}
            >
              {activeItem.type === "video" ? (
                <video
                  key={activeItem.id}
                  autoPlay
                  controls
                  playsInline
                  poster={activeItem.poster}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                >
                  <source src={activeItem.src} type="video/mp4" />
                </video>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={loc(activeItem.title)}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              )}

              {/* Prev / Next Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "42px",
                      height: "42px",
                      borderRadius: "2px",
                      background: "rgba(0, 0, 0, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    aria-label="Previous item"
                  >
                    <ChevronLeftIcon style={{ width: 22, height: 22 }} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "42px",
                      height: "42px",
                      borderRadius: "2px",
                      background: "rgba(0, 0, 0, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    aria-label="Next item"
                  >
                    <ChevronRightIcon style={{ width: 22, height: 22 }} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Caption Footer */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                background: "#081322",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: "680px" }}>
                <p style={{ color: "#ffffff", fontSize: "0.92rem", margin: "0 0 0.25rem", lineHeight: 1.5 }}>
                  {loc(activeItem.description)}
                </p>
                {activeItem.title.km && locale !== "km" && (
                  <p style={{ color: "var(--gold)", fontSize: "0.8rem", margin: 0 }}>
                    {activeItem.title.km}
                  </p>
                )}
              </div>

              <Link
                href="/about"
                className="btn btn-primary"
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.72rem", whiteSpace: "nowrap" }}
              >
                {locale === "km" ? "អំពីរឿងរ៉ាវយើង" : "Our Church Story"} →
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
