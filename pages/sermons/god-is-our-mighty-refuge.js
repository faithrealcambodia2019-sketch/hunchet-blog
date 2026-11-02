import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ConnectBanner from "../../components/ConnectBanner";
import AuthorCard from "../../components/AuthorCard";
import { SERMON_PSALM_46 } from "../../lib/sermonData";
import { SERMON_HTML, SERMON_HTML_EN } from "../../lib/sermonContentHtml";
import {
  ArrowRightIcon,
  ArrowUpRight,
  BookOpenIcon,
  CheckIcon,
} from "../../components/Icons";

export default function SermonGodOurRefuge() {
  const router = useRouter();
  const locale = router.locale || "km";
  const isKm = locale === "km";

  const sermon = SERMON_PSALM_46;
  const [copied, setCopied] = useState(false);

  const currentTitle = isKm ? sermon.title.km : sermon.title.en;
  const currentSubtitle = isKm ? sermon.subtitle.km : sermon.subtitle.en;
  const currentScriptureRef = isKm ? sermon.scripture.reference : sermon.scripture.referenceEn;
  const currentPreacher = isKm ? sermon.preacher.name : sermon.preacher.nameEn;
  const currentBigIdea = isKm ? sermon.bigIdea.km : sermon.bigIdea.en;

  const pageTitle = `${currentTitle} — ${currentScriptureRef} | Leader Hun Chet`;
  const pageDesc = currentSubtitle;

  const handleCopyOutline = () => {
    const text = isKm
      ? `
${sermon.title.km}
អត្ថបទគម្ពីរ៖ ${sermon.scripture.reference}
វាគ្មិន៖ ${sermon.preacher.name} (${sermon.dateFormatted.km})

គោលគំនិតសំខាន់ (Big Idea)៖
${sermon.bigIdea.km}

ចំណុចធំៗទាំង ៣៖
១. ${sermon.points[0].title} (${sermon.points[0].passage})
២. ${sermon.points[1].title} (${sermon.points[1].passage})
៣. ${sermon.points[2].title} (${sermon.points[2].passage})

អានអធិស្ឋានពេញលេញនៅ៖ https://www.hunchet.blog/sermons/god-is-our-mighty-refuge
      `.trim()
      : `
${sermon.title.en}
Scripture: ${sermon.scripture.referenceEn}
Preacher: ${sermon.preacher.nameEn} (${sermon.dateFormatted.en})

Central Truth (Big Idea):
${sermon.bigIdea.en}

Three Core Movements:
1. ${sermon.points[0].titleEn} (${sermon.points[0].passageEn})
2. ${sermon.points[1].titleEn} (${sermon.points[1].passageEn})
3. ${sermon.points[2].titleEn} (${sermon.points[2].passageEn})

Read Full Exposition at: https://www.hunchet.blog/en/sermons/god-is-our-mighty-refuge
      `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="oc-site">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={sermon.image} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://www.hunchet.blog${isKm ? "" : "/en"}/sermons/god-is-our-mighty-refuge`} />
      </Head>

      <SiteHeader />

      <main id="main-content" style={{ background: "#ffffff" }}>
        {/* ============================================================== */}
        {/* 1. ONE CHURCH CINEMATIC PHOTOGRAPHIC HERO                     */}
        {/* ============================================================== */}
        <section
          className="oc-photo-section oc-subpage-hero"
          style={{
            minHeight: "560px",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            padding: "140px 20px 85px",
            position: "relative",
          }}
          aria-labelledby="sermon-hero-title"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/worship-2026-11-01-fellowship.jpg"
            alt="Leader Hun Chet preaching Psalm 46"
            className="oc-section-photo"
            style={{
              filter: "brightness(0.68)",
              objectPosition: "center 42%",
            }}
          />

          <div style={{ maxWidth: "980px", margin: "0 auto", position: "relative", zIndex: 2, width: "100%" }}>
            {/* Breadcrumb Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: isKm ? "normal" : "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.75)",
                marginBottom: "20px",
              }}
            >
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.85)", textDecoration: "none" }}>
                {isKm ? "ទំព័រដើម" : "HOME"}
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}>/</span>
              <Link href="/articles" style={{ color: "rgba(255, 255, 255, 0.85)", textDecoration: "none" }}>
                {isKm ? "ការអធិស្ឋាន" : "PRAYER & SERMONS"}
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: "#fef08a" }}>
                {currentScriptureRef}
              </span>
            </div>

            {/* One Church Eyebrow */}
            <p
              className="oc-eyebrow oc-light"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "16px",
                letterSpacing: isKm ? "normal" : "0.2em",
                textTransform: "uppercase",
                fontSize: "12.5px",
                fontWeight: 700,
              }}
            >
              {isKm
                ? "ការអធិស្ឋានថ្ងៃអាទិត្យ • ០១ វិច្ឆិកា ២០២៦ • ទំនុកដំកើង ៤៦:១–១១"
                : "SUNDAY PRAYER • NOVEMBER 1, 2026 • PSALM 46:1–11"}
            </p>

            {/* Main Headline */}
            <h1
              id="sermon-hero-title"
              style={{
                color: "#ffffff",
                fontFamily: isKm ? "'Koh Santepheap', serif" : "Montserrat, 'Plus Jakarta Sans', sans-serif",
                fontSize: isKm ? "clamp(30px, 4.8vw, 56px)" : "clamp(32px, 5.2vw, 58px)",
                fontWeight: 800,
                lineHeight: isKm ? 1.45 : 1.15,
                letterSpacing: isKm ? "normal" : "0.04em",
                textTransform: isKm ? "none" : "uppercase",
                margin: "0 auto 20px",
                maxWidth: "920px",
                textShadow: "0 2px 18px rgba(0, 0, 0, 0.9), 0 6px 36px rgba(0, 0, 0, 0.75)",
              }}
            >
              {currentTitle}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                fontFamily: isKm ? "'Koh Santepheap', serif" : "inherit",
                fontSize: "clamp(15px, 1.6vw, 19px)",
                lineHeight: 1.75,
                maxWidth: "820px",
                margin: "0 auto 30px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {currentSubtitle}
            </p>

            {/* Preacher Seal Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(10, 20, 26, 0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                borderRadius: "999px",
                padding: "6px 18px 6px 8px",
                marginBottom: "32px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sermon.preacher.avatar}
                alt={currentPreacher}
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #8ec5e5" }}
              />
              <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: 700 }}>
                {currentPreacher}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block" }}>
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.454-1.52.185-3.175-.82-4.18s-2.66-1.274-4.18-.82C14.7 2.625 13.33 1.75 11.75 1.75S8.8 2.625 8.148 3.9c-1.52-.454-3.175-.185-4.18.82s-1.274 2.66-.82 4.18C1.875 9.55 1 10.92 1 12.5s.875 2.95 2.148 3.6c-.454 1.52-.185 3.175.82 4.18s2.66 1.274 4.18.82c.652 1.275 2.022 2.15 3.602 2.15s2.95-.875 3.602-2.15c1.52.454 3.175.185 4.18-.82s1.274-2.66.82-4.18c1.273-.65 2.148-2.02 2.148-3.6z" fill="#1D9BF0"/>
                <path d="M10.25 16.5L6 12.25L7.414 10.836L10.25 13.672L16.586 7.336L18 8.75L10.25 16.5Z" fill="#FFFFFF"/>
              </svg>
              <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px" }}>•</span>
              <span style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "12px" }}>
                {isKm ? "ក្រុមជំនុំ All Nations Church" : "All Nations Church Sanctuary"}
              </span>
            </div>

            {/* Dual One Church Hallmark Action Buttons */}
            <div className="oc-hero-actions">
              <button
                type="button"
                onClick={handleCopyOutline}
                className="oc-button oc-solid"
              >
                <span>{copied ? (isKm ? "បានចម្លងរួចរាល់!" : "COPIED!") : (isKm ? "ចម្លងគ្រោងអធិស្ឋាន" : "COPY OUTLINE")}</span>
                {copied ? <CheckIcon style={{ width: 13, height: 13 }} /> : <BookOpenIcon style={{ width: 13, height: 13 }} />}
              </button>

              <Link href="/gallery" className="oc-button oc-outline">
                <span>{isKm ? "ទិដ្ឋភាពថ្វាយបង្គំ" : "WORSHIP PHOTOS"}</span>
                <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 6 }} />
              </Link>
            </div>
          </div>

          <a className="oc-scroll-cue" href="#sermon-content" aria-label="Read Sermon Exposition">
            <span>{isKm ? "អានអត្ថបទពេញ" : "READ FULL TEXT"}</span>
            <span className="oc-chevron" aria-hidden="true" />
          </a>
        </section>

        {/* ============================================================== */}
        {/* 2. ONE CHURCH SIGNATURE SCRIPTURE CALLOUT STRIP               */}
        {/* ============================================================== */}
        <div
          style={{
            background: "#141716",
            color: "#ffffff",
            padding: "54px 7%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
          }}
          role="region"
          aria-label={isKm ? "ខគម្ពីរគោល" : "Key Scripture"}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: isKm ? "'Koh Santepheap', serif" : "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(16.5px, 1.8vw, 21.5px)",
                lineHeight: 1.8,
                color: "#ffffff",
                margin: "0 0 14px",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {isKm
                ? "«ព្រះទ្រង់ជាទីពឹងជ្រក និងជាកម្លាំងនៃយើងរាល់គ្នា ជាជំនួយដែលនៅជាប់ជាមួយជានិច្ច ក្នុងគ្រាមានសេចក្តីវេទនា។ ហេតុនោះ យើងខ្ញុំមិនខ្លាចឡើយ ទោះបើផែនដីផ្លាស់ប្តូរ និងភ្នំរលំរលាយទៅក្នុងកណ្តាលសមុទ្រក៏ដោយ។»"
                : "“God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea.”"}
            </p>
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: isKm ? "normal" : "0.22em",
                textTransform: "uppercase",
                color: "#8ec5e5",
              }}
            >
              {isKm ? "— ទំនុកដំកើង ៤៦:១–២ (ព្រះគម្ពីរខ្មែរ ១៩៥៤)" : "— PSALM 46:1–2 (HOLY SCRIPTURES)"}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 4-COLUMN ONE CHURCH METADATA QUICK STRIP                   */}
        {/* ============================================================== */}
        <div
          style={{
            background: "#f9faf8",
            borderBottom: "1px solid #dcdfda",
            padding: "24px 7%",
          }}
        >
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              fontSize: "13.5px",
            }}
          >
            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#626868", display: "block", marginBottom: 4 }}>
                {isKm ? "អត្ថបទព្រះគម្ពីរ" : "SCRIPTURE PASSAGE"}
              </span>
              <strong style={{ color: "#141716", fontSize: "14.5px" }}>{currentScriptureRef}</strong>
            </div>

            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#626868", display: "block", marginBottom: 4 }}>
                {isKm ? "វាគ្មិនអធិប្បាយ" : "EXPOSITOR"}
              </span>
              <strong style={{ color: "#141716", fontSize: "14.5px" }}>{currentPreacher}</strong>
            </div>

            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#626868", display: "block", marginBottom: 4 }}>
                {isKm ? "ទីតាំងថ្វាយបង្គំ" : "SANCTUARY"}
              </span>
              <strong style={{ color: "#141716", fontSize: "14.5px" }}>
                {isKm ? "All Nations Church ភ្នំពេញ" : "All Nations Church, Phnom Penh"}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#626868", display: "block", marginBottom: 4 }}>
                {isKm ? "គោលលទ្ធិជំនឿ" : "THEOLOGICAL CONFESSION"}
              </span>
              <strong style={{ color: "#141716", fontSize: "14.5px" }}>
                Westminster Standards (WCF 2.1, 5.1, 8.2)
              </strong>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. MAIN EDITORIAL CONTENT (ONE CHURCH WHITE CANVAS)           */}
        {/* ============================================================== */}
        <div id="sermon-content" style={{ maxWidth: "880px", margin: "0 auto", padding: "64px 20px 80px" }}>
          {/* Central Truth (Big Idea) Card */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #dcdfda",
              borderLeft: "5px solid #141716",
              borderRadius: "3px",
              padding: "24px 28px",
              marginBottom: "48px",
              boxShadow: "0 4px 18px rgba(20, 23, 22, 0.04)",
            }}
          >
            <span
              style={{
                fontFamily: isKm ? "'Koh Santepheap', serif" : "Montserrat, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#1c5080",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {isKm ? "គោលគំនិតសំខាន់ (BIG IDEA)" : "CENTRAL TRUTH (BIG IDEA)"}
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: isKm ? "'Koh Santepheap', serif" : "inherit",
                fontSize: "16.5px",
                lineHeight: 1.8,
                color: "#141716",
                fontWeight: 600,
              }}
            >
              {isKm ? `«${currentBigIdea}»` : `“${currentBigIdea}”`}
            </p>
          </div>

          {/* 3 Core Movements (One Church 3-Card Grid) */}
          <div style={{ marginBottom: "56px" }}>
            <h2
              style={{
                fontFamily: isKm ? "'Koh Santepheap', serif" : "Montserrat, 'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 700,
                color: "#141716",
                letterSpacing: isKm ? "normal" : "0.04em",
                textTransform: isKm ? "none" : "uppercase",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {isKm ? "ចំណុចធំៗទាំង ៣ នៃព្រះបន្ទូល" : "THREE CORE MOVEMENTS OF PSALM 46"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              {sermon.points.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dcdfda",
                    borderRadius: "3px",
                    padding: "20px 24px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "#1c5080",
                        textTransform: "uppercase",
                      }}
                    >
                      {isKm ? `ចំណុចទី ${pt.num}` : `MOVEMENT 0${idx + 1}`}
                    </span>
                    <span style={{ fontSize: "12px", color: "#626868", fontWeight: 600 }}>
                      {isKm ? pt.passage : pt.passageEn}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: isKm ? "'Koh Santepheap', serif" : "Montserrat, sans-serif",
                      fontSize: "17.5px",
                      fontWeight: 700,
                      color: "#141716",
                      lineHeight: 1.45,
                      margin: "0 0 8px",
                    }}
                  >
                    {isKm ? pt.title : pt.titleEn}
                  </h3>

                  <p style={{ margin: 0, fontSize: "14px", color: "#4c5351", lineHeight: 1.7 }}>
                    {isKm
                      ? pt.summary
                      : (idx === 0
                          ? "Earthly strongholds crumble, but God is our impenetrable rock fortress and ever-present helper."
                          : idx === 1
                            ? "Jerusalem had no physical river, for God Himself is the fountain of eternal peace and gladness for His people."
                            : "At Calvary, Christ absorbed the storm of wrath, broke the bow of death, and commands us to drop our striving and rest in Him.")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photographic Feature Inset */}
          <div
            style={{
              margin: "0 0 56px",
              border: "1px solid #dcdfda",
              borderRadius: "3px",
              overflow: "hidden",
              background: "#141716",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/worship-2026-11-01-congregation.jpg"
              alt="All Nations Church Sunday Worship"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                color: "#ffffff",
                fontSize: "13px",
              }}
            >
              <span>
                📷 <strong>{isKm ? "ទិដ្ឋភាពការថ្វាយបង្គំ៖" : "Sunday Worship:"}</strong>{" "}
                {isKm
                  ? "ក្រុមជំនុំ All Nations Church នាថ្ងៃអាទិត្យ ទី១ ខែវិច្ឆិកា ឆ្នាំ២០២៦"
                  : "Congregation gathering at All Nations Church, November 1, 2026"}
              </span>
              <Link
                href="/gallery"
                style={{
                  color: "#8ec5e5",
                  fontWeight: 700,
                  fontSize: "12px",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {isKm ? "មើលរូបថតទាំងអស់ ↗" : "VIEW ALL PHOTOS ↗"}
              </Link>
            </div>
          </div>

          {/* Full Expository Manuscript */}
          <article
            style={{
              fontFamily: isKm ? "'Koh Santepheap', serif" : "inherit",
              fontSize: "16.5px",
              lineHeight: 1.85,
              color: "#202424",
            }}
            dangerouslySetInnerHTML={{ __html: isKm ? SERMON_HTML : SERMON_HTML_EN }}
          />

          {/* Author Card */}
          <div style={{ marginTop: "64px", borderTop: "1px solid #dcdfda", paddingTop: "48px" }}>
            <AuthorCard />
          </div>

          {/* Next Steps Navigation Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "40px",
              paddingTop: "32px",
              borderTop: "1px solid #dcdfda",
            }}
          >
            <Link
              href="/articles"
              className="oc-button oc-outline-dark"
              style={{ minHeight: "44px", padding: "10px 22px" }}
            >
              <span>← {isKm ? "ត្រឡប់ទៅកាន់អត្ថបទ & ការអធិស្ឋានទាំងអស់" : "ALL ARTICLES & PRAYERS"}</span>
            </Link>

            <Link
              href="/library/matthew-henry-commentary"
              className="oc-button oc-solid"
              style={{ minHeight: "44px", padding: "10px 22px" }}
            >
              <span>{isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ MATTHEW HENRY" : "MATTHEW HENRY COMMENTARY"}</span>
              <ArrowRightIcon style={{ width: 13, height: 13, marginLeft: 6 }} />
            </Link>
          </div>
        </div>

        {/* 5. ONE CHURCH CONNECT BANNER */}
        <ConnectBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
