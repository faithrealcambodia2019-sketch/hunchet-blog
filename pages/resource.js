import { useState, useMemo, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { VIDEOS, CHANNEL_URL } from "../lib/videos";
import { useT, useLocale, pick } from "../lib/i18n";
import {
  PlayIcon,
  CloseIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CameraIcon,
  PhoneIcon,
} from "../components/Icons";

const CORE_RESOURCES = [
  {
    key: "devotions",
    title: {
      en: "Daily Devotions & 365 Sanctuary",
      km: "ព្រះបន្ទូលប្រចាំថ្ងៃ & ទីជម្រក ៣៦៥ ថ្ងៃ",
      ko: "매일 묵상과 365일 안식처",
      zh: "每日灵修与365天圣经安息地",
    },
    desc: {
      en: "Verbatim 1954 Old Khmer Version scripture, daily reflections, application questions, and pastoral prayers.",
      km: "ព្រះគម្ពីរខ្មែរបកប្រែចាស់ ១៩៥៤ Verbatim ការពិចារណា សំណួរអនុវត្ត និងសេចក្តីអធិស្ឋានប្រចាំថ្ងៃ។",
      ko: "1954 크메르어 고역 성경 원문 묵상, 나눔 질문 및 매일의 목회 기도문.",
      zh: "1954高棉传统圣经原文经文、每日灵修省思、生活应用与教牧代祷。",
    },
    image: "/images/open-bible-morning.jpg",
    href: "/devotions",
    badge: "Daily Bread",
  },
  {
    key: "library",
    title: {
      en: "Theological Library & Books",
      km: "បណ្ណាល័យទេវវិទ្យា និងសៀវភៅ",
      ko: "신학 도서관 및 성경 주석",
      zh: "神学图书馆与圣经注释",
    },
    desc: {
      en: "Verse-by-verse Matthew Henry commentaries, historical theology lectures, and bilingual reference dictionaries.",
      km: "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី មេរៀនប្រវត្តិក្រុមជំនុំ និងវចនានុក្រមបច្ចេកទេសទ្វេភាសា។",
      ko: "매튜 헨리 주석, 교회사 강의록 및 이중언어 전문 용어 사전.",
      zh: "马太亨利逐节注释、教会历史讲义教程与双语参考词典。",
    },
    image: "/images/bible-class-grade12-teaching.jpg",
    href: "/library",
    badge: "Study Library",
  },
  {
    key: "articles",
    title: {
      en: "Devotionals & Articles",
      km: "អត្ថបទ និងសេចក្តីលើកទឹកចិត្ត",
      ko: "묵상과 목회 칼럼",
      zh: "灵修短文与信仰省思",
    },
    desc: {
      en: "Biblical reflections on prayer, faith in hardship, Christian living, and pastoral encouragement.",
      km: "ការចែករំលែកអំពីការអធិស្ឋាន ជំនឿចំកណ្តាលការលំបាក ជីវិតគ្រីស្ទបរិស័ទ និងសេចក្តីលើកទឹកចិត្ត។",
      ko: "기도, 고난 속의 믿음, 그리스도인의 삶과 목회적 격려를 담은 묵상.",
      zh: "关于祷告、苦难中的信心、基督徒行事为人与教牧关怀的真理省思。",
    },
    image: "/images/one-to-one-disciple-prayer.jpg",
    href: "/articles",
    badge: "Writing",
  },
  {
    key: "gallery",
    title: {
      en: "Ministry & Church Gallery",
      km: "កម្រងរូបភាពព័ន្ធកិច្ច និងព្រះវិហារ",
      ko: "사역 및 교회 사진 갤러리",
      zh: "宣教事工与教会相册",
    },
    desc: {
      en: "Authentic photography of Sunday worship, holy baptism, next-gen youth, and discipleship life.",
      km: "រូបភាពពិតនៃការថ្វាយបង្គំ ពិធីបុណ្យជ្រមុជទឹក យុវជនជំនាន់ក្រោយ និងជីវិតបណ្តុះសិស្ស។",
      ko: "주일 예배, 성례 세례식, 다음 세대 청년 모임과 제자양육의 생생한 현장.",
      zh: "主日崇拜、洗礼圣礼、青年团契与门徒生活的真实影像记录。",
    },
    image: "/images/pastors-pulpit.jpg",
    href: "/gallery",
    badge: "Photography",
  },
  {
    key: "contact",
    title: {
      en: "Prayer Line & Fellowship",
      km: "ការអធិស្ឋាន និងការប្រកបគ្នា",
      ko: "기도 요청 및 교제 안내",
      zh: "代祷热线与交通联系",
    },
    desc: {
      en: "Reach out for personal prayer support, questions on scripture, or church visiting arrangements.",
      km: "ទាក់ទងមកយើងសម្រាប់ការអធិស្ឋានគាំទ្រ សំណួរអំពីព្រះគម្ពីរ ឬការរៀបចំមកទស្សនាព្រះវិហារ។",
      ko: "개인 기도 요청, 말씀에 관한 질문, 또는 주일 방문 계획을 위해 언제든 연락 주세요.",
      zh: "欢迎随时联络，提交个人代祷事项、圣经疑问咨询或安排主日访会行程。",
    },
    image: "/images/history-prayer-fellowship.jpg",
    href: "/contact",
    badge: "Connect",
  },
];

export default function Resource() {
  const t = useT();
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingInlineId, setPlayingInlineId] = useState(null);
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  const categories = [
    { id: "all", label: t("resource.filterAll") },
    { id: "films", label: t("resource.filterFilms") },
    { id: "worship", label: t("resource.filterWorship") },
    { id: "teaching", label: t("resource.filterTeaching") },
    { id: "questions", label: t("resource.filterQuestions") },
  ];

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((video) => {
      // Category filter
      if (activeCategory !== "all" && video.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleEn = (video.title?.en || "").toLowerCase();
        const titleKm = (video.title?.km || "").toLowerCase();
        const subEn = (video.subtitle?.en || "").toLowerCase();
        const subKm = (video.subtitle?.km || "").toLowerCase();
        const descEn = (video.description?.en || "").toLowerCase();
        const descKm = (video.description?.km || "").toLowerCase();

        const matches =
          titleEn.includes(query) ||
          titleKm.includes(query) ||
          subEn.includes(query) ||
          subKm.includes(query) ||
          descEn.includes(query) ||
          descKm.includes(query);

        if (!matches) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Featured video is the primary spotlight (e.g. "Love Can Change Everything")
  const featuredVideo = useMemo(() => {
    return VIDEOS.find((v) => v.featured) || VIDEOS[0];
  }, []);

  const showFeatured =
    activeCategory === "all" && !searchQuery.trim() && featuredVideo;

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && activeModalVideo) {
        setActiveModalVideo(null);
      }
    },
    [activeModalVideo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (activeModalVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalVideo]);

  return (
    <>
      <Head>
        <title>{`${t("resource.eyebrow")} — Hun Chet`}</title>
        <meta name="description" content={t("resource.intro")} />
        <meta
          property="og:title"
          content={`${t("resource.title")} — Hun Chet`}
        />
        <meta property="og:description" content={t("resource.intro")} />
        <meta property="og:image" content="/images/worship-service.jpg" />
      </Head>

      <SiteHeader />

      {/* 1. STATELY HERO SECTION */}
      <section className="resource-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/worship-service.jpg"
          alt=""
          className="resource-hero-bg"
          aria-hidden="true"
        />
        <div className="resource-hero-overlay" aria-hidden="true" />

        <div className="resource-hero-content">
          <div className="resource-badge-tag">
            <PlayIcon />
            <span>{t("resource.badge")}</span>
          </div>

          <h1 className="resource-hero-title">{t("resource.title")}</h1>
          <p className="resource-hero-sub">{t("resource.intro")}</p>

          <div className="resource-gold-divider" />

          <div className="resource-stats-strip">
            <div className="resource-stat-item">
              <span className="resource-stat-dot" />
              <span>{t("resource.statVideos")}</span>
            </div>
            <div className="resource-stat-item">
              <span className="resource-stat-dot" />
              <span>{t("resource.statViews")}</span>
            </div>
            <div className="resource-stat-item">
              <span className="resource-stat-dot" />
              <span>{t("resource.statProduction")}</span>
            </div>
            <div className="resource-stat-item">
              <span className="resource-stat-dot" />
              <span>{t("resource.statFree")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER & SEARCH BAR */}
      <div className="resource-filter-bar">
        <div className="container">
          <div className="resource-filter-row">
            {/* Category tabs */}
            <div className="resource-category-tabs">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? VIDEOS.length
                    : VIDEOS.filter((v) => v.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`resource-tab-btn ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="resource-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Realtime Search Input */}
            <div className="resource-search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("resource.searchPlaceholder")}
                className="resource-search-input"
                aria-label={t("resource.searchPlaceholder")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN PRODUCTIONS CATALOG */}
      <main className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          {/* FEATURED SPOTLIGHT CARD */}
          {showFeatured && (
            <div className="resource-featured-card">
              <div className="resource-featured-media">
                {playingInlineId === featuredVideo.id ? (
                  featuredVideo.type === "local" ? (
                    <video
                      autoPlay
                      controls
                      playsInline
                      poster={featuredVideo.poster}
                    >
                      <source src={featuredVideo.src} type="video/mp4" />
                    </video>
                  ) : (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?autoplay=1`}
                      title={pick(featuredVideo.title, locale)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : (
                  <button
                    type="button"
                    className="resource-featured-poster"
                    onClick={() => setPlayingInlineId(featuredVideo.id)}
                    aria-label={`${t("resource.play")}: ${pick(
                      featuredVideo.title,
                      locale
                    )}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredVideo.poster}
                      alt={pick(featuredVideo.title, locale)}
                      loading="lazy"
                    />
                    <span className="resource-featured-play-btn">
                      <PlayIcon />
                    </span>
                  </button>
                )}
              </div>

              <div className="resource-featured-body">
                <div className="resource-featured-meta-row">
                  <span className="resource-meta-tag is-primary">
                    {t("resource.featuredBadge")}
                  </span>
                  <span className="resource-meta-tag">
                    {pick(featuredVideo.categoryLabel, locale)}
                  </span>
                  <span className="resource-meta-tag">
                    {featuredVideo.duration}
                  </span>
                  <span className="resource-meta-tag">
                    {featuredVideo.views} {t("resource.views")}
                  </span>
                </div>

                <h2 className="resource-featured-title">
                  {pick(featuredVideo.title, locale)}
                </h2>

                <p className="resource-featured-sub">
                  {pick(featuredVideo.subtitle, locale)}
                </p>

                <p className="resource-featured-desc">
                  {pick(featuredVideo.description, locale)}
                </p>

                <div className="resource-featured-actions">
                  <button
                    type="button"
                    onClick={() => setActiveModalVideo(featuredVideo)}
                    className="resource-btn is-primary"
                  >
                    <PlayIcon />
                    <span>{t("resource.watchNow")}</span>
                  </button>

                  {featuredVideo.youtubeUrl && (
                    <a
                      className="resource-btn is-gold"
                      href={featuredVideo.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t("resource.watchOnYoutube")}</span>
                      <ArrowRightIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CATALOG HEADER & RESULT COUNT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.45rem",
                  color: "var(--navy)",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                {t("resource.mostWatched")}
              </h2>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {filteredVideos.length} / {VIDEOS.length} Productions
            </span>
          </div>

          {/* VIDEO CATALOG GRID */}
          {filteredVideos.length > 0 ? (
            <ul className="resource-grid">
              {filteredVideos.map((video, idx) => {
                const title = pick(video.title, locale);
                const subtitle = pick(video.subtitle, locale);
                const categoryLabel = pick(video.categoryLabel, locale);
                const isPlaying = playingInlineId === video.id;

                return (
                  <li key={video.id} className="resource-card">
                    {/* Media Container */}
                    <div className="resource-card-media">
                      {isPlaying ? (
                        video.type === "local" ? (
                          <video
                            autoPlay
                            controls
                            playsInline
                            poster={video.poster}
                          >
                            <source src={video.src} type="video/mp4" />
                          </video>
                        ) : (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )
                      ) : (
                        <button
                          type="button"
                          className="resource-poster-btn"
                          onClick={() => setPlayingInlineId(video.id)}
                          aria-label={`${t("resource.play")}: ${title}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={video.poster}
                            alt={title}
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (!img.dataset.fallback && video.id.length === 11) {
                                img.dataset.fallback = "1";
                                img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                              }
                            }}
                          />

                          <div className="resource-card-badges">
                            <span className="resource-rank-pill">
                              #{idx + 1}
                            </span>
                            <span className="resource-category-pill">
                              {categoryLabel}
                            </span>
                          </div>

                          <span className="resource-card-play-btn">
                            <PlayIcon />
                          </span>

                          {video.duration && (
                            <span className="resource-card-duration">
                              {video.duration}
                            </span>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="resource-card-body">
                      <div className="resource-card-category">
                        {categoryLabel}
                      </div>

                      <h3>{title}</h3>

                      {subtitle && (
                        <p className="resource-card-sub">{subtitle}</p>
                      )}

                      <div className="resource-card-meta-bar">
                        <span>
                          {video.views} {t("resource.views")}
                        </span>
                        <span>
                          {video.type === "local"
                            ? "All Nations Church"
                            : "True Friend Cambodia"}
                        </span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="resource-card-actions">
                      <button
                        type="button"
                        onClick={() => setActiveModalVideo(video)}
                        className="resource-btn is-primary"
                      >
                        <PlayIcon />
                        <span>{t("resource.play")}</span>
                      </button>

                      {video.youtubeUrl ? (
                        <a
                          className="resource-btn"
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>YouTube</span>
                          <ArrowRightIcon />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayingInlineId(video.id)}
                          className="resource-btn"
                        >
                          <span>Play Inline</span>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1.5rem",
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  margin: "0 0 1.25rem",
                }}
              >
                {t("resource.noResults")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="resource-btn is-primary"
              >
                {t("resource.resetFilter")}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 4. CORE MINISTRY STUDY HUB SECTION */}
      <section className="resource-hub-section">
        <div className="container">
          <div className="resource-hub-head">
            <h2>{t("resource.more")}</h2>
            <p>{t("resource.moreSub")}</p>
            <div className="resource-gold-divider" />
          </div>

          <div className="resource-hub-grid">
            {CORE_RESOURCES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="resource-hub-card"
              >
                <div className="resource-hub-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={pick(item.title, locale)}
                    loading="lazy"
                  />
                </div>
                <div className="resource-hub-body">
                  <h3>{pick(item.title, locale)}</h3>
                  <p>{pick(item.desc, locale)}</p>
                  <span className="resource-hub-link">
                    <span>{t("resource.explore")}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION & YOUTUBE CHANNEL BANNER */}
      <section className="resource-mission-banner">
        <div className="container">
          <div className="resource-mission-content">
            <h3>{t("resource.missionTitle")}</h3>
            <p>{t("resource.missionBody")}</p>
            <a
              className="resource-btn is-gold"
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
            >
              <PlayIcon />
              <span>{t("resource.missionBtn")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. CINEMATIC VIDEO MODAL PLAYER */}
      {activeModalVideo && (
        <div
          className="resource-modal-overlay"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="resource-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resource-modal-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  overflow: "hidden",
                }}
              >
                <PlayIcon
                  style={{
                    width: 14,
                    height: 14,
                    color: "var(--gold)",
                    flexShrink: 0,
                  }}
                />
                <h3>{pick(activeModalVideo.title, locale)}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalVideo(null)}
                className="resource-modal-close"
                aria-label="Close video player"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="resource-modal-player">
              {activeModalVideo.type === "local" ? (
                <video
                  autoPlay
                  controls
                  playsInline
                  poster={activeModalVideo.poster}
                >
                  <source src={activeModalVideo.src} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.id}?autoplay=1`}
                  title={pick(activeModalVideo.title, locale)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
