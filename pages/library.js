import { useState, useMemo, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import { BOOKS } from "../lib/books";
import { ALL_RESOURCES, RESOURCE_FORMATS } from "../lib/libraryResources";
import { useT, useLocale, pick } from "../lib/i18n";
import Book3D from "../components/Book3D";
import RealBookCover from "../components/RealBookCover";
import BookPreviewModal from "../components/BookPreviewModal";
import {
  BookOpenIcon,
  DownloadIcon,
  SearchIcon,
  BookmarkIcon,
  PlayIcon,
  PauseIcon,
  LayersIcon,
  HeadphonesIcon,
  FileTextIcon,
  FlameIcon,
  TempleIcon,
  CompassIcon,
  PlusIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
} from "../components/Icons";

export default function Library() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  // Navigation State
  const [activeNav, setActiveNav] = useState("discover"); // "discover" | "saved" | "bible"
  const [activeFormatPill, setActiveFormatPill] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("portal"); // "portal" | "bookshelf"

  // Saved / Bookmarked Items (initialized with 2 items to match the screenshot!)
  const [savedIds, setSavedIds] = useState(["book-world-history", "audio-guidance-amra-phou"]);

  // Modals & Audio Player State
  const [previewBook, setPreviewBook] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCopiedVerse, setIsCopiedVerse] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const audioRef = useRef(null);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hunchet_saved_resources");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("hunchet_saved_resources", JSON.stringify(next));
      } catch (err) {
        // ignore
      }
      return next;
    });
  };

  // Audio Playback
  const handlePlayAudio = (item, e) => {
    if (e) e.stopPropagation();
    if (activeAudio?.id === item.id) {
      if (isPlayingAudio) {
        audioRef.current?.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current?.play();
        setIsPlayingAudio(true);
      }
    } else {
      setActiveAudio(item);
      setIsPlayingAudio(true);
    }
  };

  // Open Book Preview Modal
  const handleOpenPreview = (book) => {
    setPreviewBook(book);
    setIsPreviewOpen(true);
  };

  // Copy Verse of the Day
  const handleCopyVerse = () => {
    const text = "« ព្រះបន្ទូលទ្រង់ជាចង្កៀងបំភ្លឺផ្លូវខ្ញុំ ហើយជាពន្លឺបំភ្លឺដំណើរខ្ញុំ ។ » — ទំនុកតម្កើង ១១៩:១០៥ (ព្រះគម្ពីរខ្មែរ ១៩៥៤)";
    navigator.clipboard.writeText(text);
    setIsCopiedVerse(true);
    setTimeout(() => setIsCopiedVerse(false), 2000);
  };

  // Filtered Resources
  const filteredResources = useMemo(() => {
    return ALL_RESOURCES.filter((item) => {
      // 1. My Library Tab Filter (Saved Items)
      if (activeNav === "saved" && !savedIds.includes(item.id)) {
        return false;
      }

      // 2. Format Pill Filter
      if (activeFormatPill !== "all") {
        if (activeFormatPill === "pdf" && item.type !== "book") return false;
        if (activeFormatPill === "article" && item.type !== "article") return false;
        if (activeFormatPill === "video" && item.type !== "video") return false;
        if (activeFormatPill === "audio" && item.type !== "audio") return false;
        if (activeFormatPill === "matthew-henry" && item.category !== "matthew-henry") return false;
        if (activeFormatPill === "history" && item.category !== "history") return false;
      }

      // 3. Category Filter from Left Sidebar
      if (selectedCategory !== "all") {
        if (item.category !== selectedCategory) return false;
      }

      // 4. Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleEn = (item.title?.en || "").toLowerCase();
        const titleKm = (item.title?.km || "").toLowerCase();
        const authorEn = (item.author?.en || "").toLowerCase();
        const authorKm = (item.author?.km || "").toLowerCase();
        const descEn = (item.desc?.en || "").toLowerCase();
        const descKm = (item.desc?.km || "").toLowerCase();
        const transEn = (item.translator?.en || "").toLowerCase();
        const transKm = (item.translator?.km || "").toLowerCase();

        const matches =
          titleEn.includes(query) ||
          titleKm.includes(query) ||
          authorEn.includes(query) ||
          authorKm.includes(query) ||
          descEn.includes(query) ||
          descKm.includes(query) ||
          transEn.includes(query) ||
          transKm.includes(query);

        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === "title") {
        const titleA = (a.title?.en || a.title?.km || "").toLowerCase();
        const titleB = (b.title?.en || b.title?.km || "").toLowerCase();
        return titleA.localeCompare(titleB);
      }
      return 0; // default newest
    });
  }, [activeNav, activeFormatPill, selectedCategory, searchQuery, sortOrder, savedIds]);

  // Statistics
  const statTotal = ALL_RESOURCES.length;
  const statBooks = ALL_RESOURCES.filter((r) => r.type === "book").length;
  const statArticles = ALL_RESOURCES.filter((r) => r.type === "article").length;
  const statVideos = ALL_RESOURCES.filter((r) => r.type === "video").length;
  const statAudio = ALL_RESOURCES.filter((r) => r.type === "audio").length;

  return (
    <div className="oc-site">
      <Head>
        <title>{`${isKm ? "បណ្ណាល័យធនធានទេវវិទ្យា" : "Theological Library & Resources"} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content="Free biblical study companions, theological archives, audio teachings, and bilingual reference texts." />
        <meta property="og:title" content="Theological Library & Resources — Hun Chet" />
        <meta property="og:description" content="Free biblical study companions, theological archives, and audio teachings." />
        <meta property="og:image" content="/images/sunday-school-hero.jpg" />
      </Head>

      <SiteHeader />

      {/* Audio element for playback */}
      {activeAudio && (
        <audio
          ref={audioRef}
          src={activeAudio.file}
          autoPlay
          onPlay={() => setIsPlayingAudio(true)}
          onPause={() => setIsPlayingAudio(false)}
          onEnded={() => setIsPlayingAudio(false)}
        />
      )}

      {/* 1. ONE CHURCH HERO */}
      <SubpageHero
        eyebrow={isKm ? "បណ្ណាល័យទេវវិទ្យាឌីជីថល • ធនធានសិក្សា" : "Theological Library & Digital Resources"}
        title={isKm ? "បណ្ណាល័យសៀវភៅ និងអត្ថបទជំនឿ" : "Theological Library & Bible Volumes"}
        subtitle={
          isKm
            ? "សៀវភៅទេវវិទ្យាជាភាសាខ្មែរ អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី និងធនធានសំឡេងសម្រាប់អ្នកជឿ និងគ្រូគង្វាលគ្រប់រូប។"
            : "Free biblical study companions, theological archives, commentaries, audio teachings, and bilingual reference texts."
        }
        bgImage="/images/all-nations-institute-campus.jpg"
        stats={[
          { num: `${statBooks}`, label: isKm ? "សៀវភៅ" : "Books" },
          { num: `${statAudio}`, label: isKm ? "សំឡេង" : "Audio" },
          { num: "PDF", label: isKm ? "ទាញយកឥតគិតថ្លៃ" : "Free Download" },
        ]}
      />

      {/* MAIN 3-COLUMN PORTAL DASHBOARD */}
      <main className="portal-page-wrap">
        <div className="container" style={{ maxWidth: 1280 }}>
          <div className="portal-layout-grid">
            
            {/* =========================================================
                1. LEFT SIDEBAR: MY LIBRARY, BROWSE FORMATS, CATEGORIES
                ========================================================= */}
            <aside className="portal-left-sidebar" aria-label="Library Navigation">
              {/* Group 1: My Library */}
              <div className="portal-sidebar-group">
                <h3 className="portal-group-heading">
                  {isKm ? "បណ្ណាល័យរបស់ខ្ញុំ" : "My Library"}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("discover");
                    setSelectedCategory("all");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${activeNav === "discover" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon">
                    <CompassIcon />
                  </span>
                  <span>{isKm ? "រុករកទូទៅ" : "Discover"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("saved");
                    setSelectedCategory("all");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${activeNav === "saved" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon">
                    <BookmarkIcon />
                  </span>
                  <span>{isKm ? "បានរក្សាទុក" : "Saved Items"}</span>
                  <span className="portal-nav-badge">{savedIds.length}</span>
                </button>

                <Link
                  href="/devotions"
                  className="portal-nav-item"
                  style={{ color: "#2563eb", fontWeight: 600 }}
                >
                  <span className="portal-nav-icon">
                    <BookOpenIcon />
                  </span>
                  <span>{isKm ? "ស្ទូឌីយោព្រះគម្ពីរ • ព្រះគម្ពីរ" : "Bible Studio • ព្រះគម្ពីរ"}</span>
                </Link>
              </div>

              {/* Group 2: Browse Formats */}
              <div className="portal-sidebar-group">
                <h3 className="portal-group-heading">
                  {isKm ? "ទម្រង់ឯកសារ" : "Browse Formats"}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("discover");
                    setActiveFormatPill("pdf");
                    setSelectedCategory("all");
                  }}
                  className={`portal-nav-item ${activeFormatPill === "pdf" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#ea580c" }}>
                    <FileTextIcon />
                  </span>
                  <span>{isKm ? "សៀវភៅ PDF & មេរៀន" : "PDF Books & Studies"}</span>
                  <span className="portal-nav-badge">{statBooks}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("discover");
                    setActiveFormatPill("article");
                    setSelectedCategory("all");
                  }}
                  className={`portal-nav-item ${activeFormatPill === "article" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#16a34a" }}>
                    <BookOpenIcon />
                  </span>
                  <span>{isKm ? "អត្ថបទ & ធម្មទេសនា" : "Articles & Devotionals"}</span>
                  <span className="portal-nav-badge">{statArticles}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("discover");
                    setActiveFormatPill("video");
                    setSelectedCategory("all");
                  }}
                  className={`portal-nav-item ${activeFormatPill === "video" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#dc2626" }}>
                    <PlayIcon />
                  </span>
                  <span>{isKm ? "វីដេអូ & សេចក្តីលើកទឹកចិត្ត" : "Inspiration & Videos"}</span>
                  <span className="portal-nav-badge">{statVideos}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav("discover");
                    setActiveFormatPill("audio");
                    setSelectedCategory("all");
                  }}
                  className={`portal-nav-item ${activeFormatPill === "audio" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#9333ea" }}>
                    <HeadphonesIcon />
                  </span>
                  <span>{isKm ? "សម្លេង & ផតខាស" : "Podcasts & Audio"}</span>
                  <span className="portal-nav-badge">{statAudio}</span>
                </button>
              </div>

              {/* Group 3: Categories */}
              <div className="portal-sidebar-group">
                <h3 className="portal-group-heading">
                  {isKm ? "ជំពូក & ប្រធានបទ" : "Categories"}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("inspiration");
                    setActiveNav("discover");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${selectedCategory === "inspiration" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#e11d48" }}>
                    <FlameIcon />
                  </span>
                  <span>{isKm ? "សេចក្តីលើកទឹកចិត្ត" : "Inspiration"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("matthew-henry");
                    setActiveNav("discover");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${selectedCategory === "matthew-henry" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#2563eb" }}>
                    <BookOpenIcon />
                  </span>
                  <span>{isKm ? "ម៉ាថាយ ហេនរី" : "Matthew Henry"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("history");
                    setActiveNav("discover");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${selectedCategory === "history" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#b45309" }}>
                    <TempleIcon />
                  </span>
                  <span>{isKm ? "ប្រវត្តិក្រុមជំនុំ & ពិភពលោក" : "Church History"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("theology");
                    setActiveNav("discover");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${selectedCategory === "theology" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#0d9488" }}>
                    <FileTextIcon />
                  </span>
                  <span>{isKm ? "ទេវវិទ្យា & វចនានុក្រម" : "Theology"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("discipleship");
                    setActiveNav("discover");
                    setActiveFormatPill("all");
                  }}
                  className={`portal-nav-item ${selectedCategory === "discipleship" ? "is-active" : ""}`}
                >
                  <span className="portal-nav-icon" style={{ color: "#4f46e5" }}>
                    <CompassIcon />
                  </span>
                  <span>{isKm ? "ការបណ្តុះសិស្ស" : "Discipleship"}</span>
                </button>
              </div>
            </aside>

            {/* =========================================================
                2. CENTER MAIN COLUMN: RECOMMENDED RESOURCES FEED
                ========================================================= */}
            <section className="portal-main-col">
              {/* Header Title & CTA Row */}
              <div className="portal-main-header">
                <div className="portal-header-text">
                  <h1>
                    {activeNav === "saved"
                      ? (isKm ? "ធនធានដែលអ្នកបានរក្សាទុក" : "Saved Resources")
                      : (isKm ? "ធនធានណែនាំសម្រាប់អ្នក" : "Recommended for you")}
                  </h1>
                  <p>
                    {isKm
                      ? "ធនធានផ្សាយដោយ លោកគ្រូ ហ៊ុន ចិត្ត និងក្រុមការងារព័ន្ធកិច្ច"
                      : "Resources published by the Faith In community"}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {/* View Mode Toggle (Portal vs Bookshelf) */}
                  <button
                    type="button"
                    onClick={() => setViewMode(viewMode === "portal" ? "bookshelf" : "portal")}
                    className="portal-pill-btn"
                    title={viewMode === "portal" ? "Switch to 3D Bookshelf View" : "Switch to Portal View"}
                  >
                    <BookOpenIcon />
                    <span>{viewMode === "portal" ? (isKm ? "ធ្នើសៀវភៅ 3D" : "Bookshelf") : (isKm ? "ទម្រង់ផតថល" : "Portal")}</span>
                  </button>

                  {/* Publish / Request Resource CTA */}
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(true)}
                    className="portal-publish-btn"
                  >
                    <PlusIcon />
                    <span>{isKm ? "ស្នើសុំធនធាន" : "Publish resource"}</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Filter Pills */}
              <div className="portal-pills-bar">
                {RESOURCE_FORMATS.map((pill) => {
                  const isActive = activeFormatPill === pill.id && selectedCategory === "all";
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => {
                        setActiveFormatPill(pill.id);
                        setSelectedCategory("all");
                        setActiveNav("discover");
                      }}
                      className={`portal-pill-btn ${isActive ? "is-active" : ""}`}
                    >
                      {pill.id === "all" && <LayersIcon />}
                      {pill.id === "matthew-henry" && <BookOpenIcon />}
                      {pill.id === "history" && <TempleIcon />}
                      {pill.id === "pdf" && <FileTextIcon />}
                      {pill.id === "article" && <BookOpenIcon />}
                      {pill.id === "video" && <PlayIcon />}
                      {pill.id === "audio" && <HeadphonesIcon />}
                      <span>{pick(pill.label, locale)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Sort Controls Row */}
              <div className="portal-search-row">
                <div className="portal-search-wrapper">
                  <span className="portal-search-icon">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isKm ? "ស្វែងរកចំណងជើង អ្នកនិពន្ធ អ្នកបកប្រែ..." : "Search titles, authors, translators..."}
                    className="portal-search-input"
                    aria-label="Search resources"
                  />
                </div>

                <div className="portal-sort-wrapper">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="portal-sort-select"
                    aria-label="Sort resources"
                  >
                    <option value="newest">{isKm ? "ថ្មីបំផុត" : "Newest first"}</option>
                    <option value="title">{isKm ? "តាមចំណងជើង (A-Z)" : "Title A–Z"}</option>
                  </select>

                  <span className="portal-count-tag">
                    {filteredResources.length} {isKm ? "ធនធាន" : "resources"}
                  </span>
                </div>
              </div>

              {/* VIEW 1: AUTHENTIC 3D BOOKSHELF VIEW (TOGGLEABLE) */}
              {viewMode === "bookshelf" && (
                <div className="bookshelf-showcase" style={{ marginBottom: "2rem" }}>
                  <div className="bookshelf-header-bar">
                    <div className="bookshelf-title-wrap">
                      <div className="bookshelf-brass-crest">
                        <BookOpenIcon />
                      </div>
                      <div>
                        <h3 className="bookshelf-title-text">{t("library.shelfView")}</h3>
                        <p className="bookshelf-notice-text">{t("library.shelfNotice")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bookshelf-row">
                    {BOOKS.map((book) => {
                      const title = pick(book.title, locale);
                      const author = pick(book.author, locale);
                      return (
                        <div key={book.slug} className="bookshelf-unit">
                          <div
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}
                            onClick={() => handleOpenPreview(book)}
                            title={isKm ? "ចុចដើម្បីបើកមើលសៀវភៅ" : "Click to look inside book"}
                          >
                            <RealBookCover book={book} size="md" />
                          </div>
                          <div className="bookshelf-wooden-board" aria-hidden="true" />
                          <div className="bookshelf-unit-plaque">
                            <div className="bookshelf-plaque-meta">{book.callNumber}</div>
                            <h4 className="bookshelf-plaque-title">{title}</h4>
                            <div className="bookshelf-plaque-actions">
                              <button
                                type="button"
                                onClick={() => handleOpenPreview(book)}
                                className="bookshelf-action-btn"
                              >
                                <BookOpenIcon style={{ width: 12, height: 12 }} />
                                <span>{t("library.lookInside")}</span>
                              </button>
                              <Link href={`/library/${book.slug}`} className="bookshelf-action-btn is-read">
                                <span>{t("library.readOnline")}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bookshelf-brass-rail">
                    <span>{t("library.shelfBrassTag")}</span>
                  </div>
                </div>
              )}

              {/* VIEW 2: PORTAL RESOURCE CARDS GRID (DEFAULT) */}
              {filteredResources.length > 0 ? (
                <ul className="portal-cards-grid">
                  {filteredResources.map((item) => {
                    const title = pick(item.title, locale);
                    const author = pick(item.author, locale);
                    const translator = item.translator ? pick(item.translator, locale) : null;
                    const isSaved = savedIds.includes(item.id);

                    return (
                      <li key={item.id} className="portal-resource-card">
                        {/* 1. CARD TOP HALF VISUAL */}
                        {item.type === "audio" && (
                          <div
                            className="portal-card-preview is-audio"
                            onClick={(e) => handlePlayAudio(item, e)}
                            style={{ cursor: "pointer" }}
                            title="Click to play audio"
                          >
                            <div className="portal-audio-icon-wrap">
                              {isPlayingAudio && activeAudio?.id === item.id ? (
                                <PauseIcon />
                              ) : (
                                <HeadphonesIcon />
                              )}
                            </div>
                            <h4 className="portal-audio-inner-title">{title}</h4>
                            <span className="portal-audio-badge-overlay">AUDIO</span>
                          </div>
                        )}

                        {item.type === "book" && item.bookData && (
                          <div
                            className="portal-card-preview is-book"
                            onClick={() => handleOpenPreview(item.bookData)}
                            style={{ cursor: "pointer" }}
                            title={isKm ? "ចុចដើម្បីបើកមើលសៀវភៅ" : "Click to preview book"}
                          >
                            <div className="portal-book-real-wrap">
                              <RealBookCover book={item.bookData} size="sm" />
                            </div>
                          </div>
                        )}

                        {item.type === "article" && (
                          <Link
                            href={item.href || "/articles"}
                            className="portal-card-preview is-article"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="portal-article-quote-glyph">“</div>
                            <p className="portal-article-preview-title">{title}</p>
                          </Link>
                        )}

                        {item.type === "video" && (
                          <div className="portal-card-preview is-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.poster} alt={title} loading="lazy" />
                            {item.youtubeUrl ? (
                              <a
                                href={item.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="portal-video-play-btn"
                                aria-label={`Play ${title}`}
                              >
                                <PlayIcon style={{ width: 18, height: 18, marginLeft: 2 }} />
                              </a>
                            ) : (
                              <div className="portal-video-play-btn">
                                <PlayIcon style={{ width: 18, height: 18, marginLeft: 2 }} />
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. CARD BOTTOM HALF INFO */}
                        <div className="portal-card-info">
                          <h4 className="portal-card-title">
                            {item.type === "book" && item.bookData ? (
                              <Link href={`/library/${item.bookData.slug}`}>{title}</Link>
                            ) : item.type === "article" ? (
                              <Link href={item.href || "/articles"}>{title}</Link>
                            ) : (
                              <span>{title}</span>
                            )}
                          </h4>

                          <div className="portal-card-author">
                            {isKm ? `ដោយ ${author}` : `By ${author}`}
                          </div>

                          {translator && (
                            <div className="portal-card-translator">
                              {translator}
                            </div>
                          )}

                          {/* Card Meta Row */}
                          <div className="portal-card-meta-bar">
                            <span className={`portal-format-tag tag-${item.type}`}>
                              {item.format}
                            </span>

                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                              {item.type === "book" && item.bookData && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenPreview(item.bookData)}
                                  className="portal-bookmark-btn"
                                  title={isKm ? "បើកមើលសៀវភៅ" : "Look Inside"}
                                >
                                  <BookOpenIcon style={{ width: 15, height: 15 }} />
                                </button>
                              )}

                              {item.type === "audio" && (
                                <button
                                  type="button"
                                  onClick={(e) => handlePlayAudio(item, e)}
                                  className="portal-bookmark-btn"
                                  title="Play audio"
                                >
                                  {isPlayingAudio && activeAudio?.id === item.id ? (
                                    <PauseIcon style={{ width: 15, height: 15 }} />
                                  ) : (
                                    <PlayIcon style={{ width: 15, height: 15 }} />
                                  )}
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(item.id, e)}
                                className={`portal-bookmark-btn ${isSaved ? "is-saved" : ""}`}
                                title={isSaved ? "Remove from Saved" : "Save resource"}
                                aria-label="Bookmark"
                              >
                                <BookmarkIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3.5rem 1.5rem",
                    background: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <p style={{ fontSize: "1rem", color: "#64748b", margin: "0 0 1rem" }}>
                    {isKm
                      ? "រកមិនឃើញធនធានដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។"
                      : "No resources found matching your current filter."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNav("discover");
                      setActiveFormatPill("all");
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="portal-publish-btn"
                  >
                    <span>{isKm ? "កំណត់ឡើងវិញទាំងអស់" : "Reset all filters"}</span>
                  </button>
                </div>
              )}
            </section>

            {/* =========================================================
                3. RIGHT SIDEBAR: VERSE OF THE DAY & LIBRARY AT A GLANCE
                ========================================================= */}
            <aside className="portal-right-sidebar" aria-label="Library Overview">
              {/* Widget 1: Verse of the Day */}
              <div className="portal-widget-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <h3 className="portal-verse-title" style={{ margin: 0 }}>
                    {isKm ? "ខគម្ពីរប្រចាំថ្ងៃ" : "Verse of the Day"}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopyVerse}
                    className="portal-bookmark-btn"
                    title={isCopiedVerse ? "Copied!" : "Copy Verse"}
                  >
                    {isCopiedVerse ? <CheckIcon style={{ color: "#16a34a" }} /> : <CopyIcon />}
                  </button>
                </div>

                <blockquote className="portal-verse-quote">
                  « ព្រះបន្ទូលទ្រង់ជាចង្កៀងបំភ្លឺផ្លូវខ្ញុំ ហើយជាពន្លឺបំភ្លឺដំណើរខ្ញុំ ។ »
                </blockquote>

                <p className="portal-verse-ref">
                  PSALM 119:105 • {isKm ? "ព្រះគម្ពីរខ្មែរ ១៩៥៤" : "1954 KHMER BIBLE"}
                </p>
              </div>

              {/* Widget 2: Library at a glance */}
              <div className="portal-widget-card">
                <div className="portal-stats-header">
                  <LayersIcon />
                  <h3 className="portal-stats-title">
                    {isKm ? "ស្ថិតិបណ្ណាល័យសង្ខេប" : "Library at a glance"}
                  </h3>
                </div>

                <ul className="portal-stats-list">
                  <li className="portal-stat-row">
                    <span>{isKm ? "ធនធានសរុប" : "Resources"}</span>
                    <span className="portal-stat-val">{statTotal}</span>
                  </li>
                  <li className="portal-stat-row">
                    <span>{isKm ? "សៀវភៅ PDF" : "PDF books"}</span>
                    <span className="portal-stat-val">{statBooks}</span>
                  </li>
                  <li className="portal-stat-row">
                    <span>{isKm ? "អត្ថបទ & ធម្មទេសនា" : "Articles"}</span>
                    <span className="portal-stat-val">{statArticles}</span>
                  </li>
                  <li className="portal-stat-row">
                    <span>{isKm ? "វីដេអូ & សេចក្តីលើកទឹកចិត្ត" : "Inspiration"}</span>
                    <span className="portal-stat-val">{statVideos}</span>
                  </li>
                  <li className="portal-stat-row">
                    <span>{isKm ? "សម្លេង & ផតខាស" : "Audio"}</span>
                    <span className="portal-stat-val">{statAudio}</span>
                  </li>
                  <li className="portal-stat-row">
                    <span>{isKm ? "បានរក្សាទុកដោយអ្នក" : "Saved by you"}</span>
                    <span className="portal-stat-val" style={{ color: "#2563eb" }}>
                      {savedIds.length}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Footer Links (Matching Screenshot) */}
              <div className="portal-footer-links">
                <div>
                  <Link href="/about">{isKm ? "អំពីខ្ញុំ" : "About"}</Link> •{" "}
                  <Link href="/contact">{isKm ? "ជំនួយ" : "Help Center"}</Link> •{" "}
                  <Link href="/devotions">{isKm ? "ឯកជនភាព" : "Privacy"}</Link> •{" "}
                  <Link href="/library">{isKm ? "លក្ខខណ្ឌ" : "Terms"}</Link>
                </div>
                <div style={{ marginTop: "0.35rem" }}>
                  Faith In Corporation © 2026
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* FLOATING AUDIO PLAYER BAR */}
      {activeAudio && (
        <div className="portal-audio-player-bar">
          <div className="portal-audio-icon-wrap" style={{ width: 36, height: 36, margin: 0 }}>
            <HeadphonesIcon style={{ width: 18, height: 18 }} />
          </div>

          <div className="portal-audio-track-info">
            <h5 className="portal-audio-track-title">{pick(activeAudio.title, locale)}</h5>
            <p className="portal-audio-track-author">{pick(activeAudio.author, locale)} • {activeAudio.duration}</p>
          </div>

          <button
            type="button"
            onClick={(e) => handlePlayAudio(activeAudio, e)}
            className="portal-video-play-btn"
            style={{ width: 36, height: 36 }}
            aria-label="Play/Pause"
          >
            {isPlayingAudio ? <PauseIcon style={{ width: 16, height: 16 }} /> : <PlayIcon style={{ width: 16, height: 16, marginLeft: 2 }} />}
          </button>

          <button
            type="button"
            onClick={() => {
              audioRef.current?.pause();
              setActiveAudio(null);
              setIsPlayingAudio(false);
            }}
            className="portal-bookmark-btn"
            style={{ color: "#ffffff" }}
            aria-label="Close Player"
          >
            <CloseIcon style={{ width: 16, height: 16 }} />
          </button>
        </div>
      )}

      {/* OPEN PHYSICAL BOOK PREVIEW MODAL */}
      <BookPreviewModal
        book={previewBook}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* PUBLISH / REQUEST RESOURCE MODAL */}
      {isPublishModalOpen && (
        <div
          className="book-modal-backdrop"
          onClick={() => setIsPublishModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="book-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 520, background: "#ffffff", borderRadius: 12, padding: "2rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a", fontWeight: 700 }}>
                {isKm ? "ស្នើសុំ ឬចែករំលែកធនធាន" : "Request or Share Resource"}
              </h3>
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="portal-bookmark-btn"
              >
                <CloseIcon />
              </button>
            </div>

            <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {isKm
                ? "តើអ្នកចង់ស្នើសុំឯកសារសិក្សាព្រះគម្ពីរ សៀវភៅ ឬចង់ចែករំលែកធនធានជាមួយបណ្ណាល័យទេវវិទ្យា ហ៊ុន ចិត្ត? សូមផ្ញើសារមកកាន់លោកគ្រូ ហ៊ុន ចិត្ត តាម Telegram ឬទូរស័ព្ទ។"
                : "Would you like to request a theological study text or share a resource with Leader Hun Chet? Reach out directly via Telegram or telephone."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="https://t.me/hunchet"
                target="_blank"
                rel="noopener noreferrer"
                className="portal-publish-btn"
                style={{ justifyContent: "center", padding: "0.75rem" }}
              >
                <span>{isKm ? "ផ្ញើសារតាម Telegram ផ្លូវការ" : "Message on Official Telegram"}</span>
              </a>
              <Link
                href="/contact"
                className="portal-pill-btn"
                style={{ justifyContent: "center", padding: "0.75rem" }}
                onClick={() => setIsPublishModalOpen(false)}
              >
                <span>{isKm ? "ទំព័រទំនាក់ទំនង & សំណូមពរ" : "Visit Contact Page"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ONE CHURCH CONNECT BANNER */}
      <ConnectBanner />

      <SiteFooter />
    </div>
  );
}
