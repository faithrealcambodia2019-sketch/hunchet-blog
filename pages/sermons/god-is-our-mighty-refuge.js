import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ConnectBanner from "../../components/ConnectBanner";
import AuthorCard from "../../components/AuthorCard";
import { useLocale } from "../../lib/i18n";
import { SERMON_PSALM_46 } from "../../lib/sermonData";
import { SERMON_HTML } from "../../lib/sermonContentHtml";
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

  const pageTitle = `${sermon.title.km} — ${sermon.title.en} | Hun Chet`;
  const pageDesc = sermon.bigIdea.km;

  const handleCopyOutline = () => {
    const text = `
${sermon.title.km} (${sermon.title.en})
អត្ថបទគម្ពីរ៖ ${sermon.scripture.reference}
វាគ្មិន៖ ${sermon.preacher.name} (${sermon.dateFormatted.km})

គោលគំនិតសំខាន់ (Big Idea)៖
${sermon.bigIdea.km}

ចំណុចធំៗទាំង ៣៖
១. ${sermon.points[0].title} (${sermon.points[0].passage})
២. ${sermon.points[1].title} (${sermon.points[1].passage})
៣. ${sermon.points[2].title} (${sermon.points[2].passage})

អានធម្មទេសនាពេញលេញនៅ៖ https://www.hunchet.blog/sermons/god-is-our-mighty-refuge
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
        <link rel="canonical" href="https://www.hunchet.blog/sermons/god-is-our-mighty-refuge" />
      </Head>

      <SiteHeader />

      <main style={{ background: "#ffffff", paddingBottom: "4rem" }}>
        {/* 1. EDITORIAL SERMON HERO */}
        <section
          style={{
            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff",
            padding: "4.5rem 1.5rem 3.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="container" style={{ maxWidth: 920 }}>
            {/* Breadcrumbs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.65)",
                marginBottom: "1.75rem",
              }}
            >
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                {isKm ? "ទំព័រដើម" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/articles" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                {isKm ? "ធម្មទេសនា & អត្ថបទ" : "Sermons & Articles"}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--gold, #d4af37)" }}>
                {sermon.scripture.reference}
              </span>
            </div>

            {/* Badges Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
              <span
                style={{
                  background: "rgba(212, 175, 55, 0.2)",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  color: "#fef08a",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: "999px",
                }}
              >
                {isKm ? "ធម្មទេសនាថ្ងៃអាទិត្យ ០១ វិច្ឆិកា ២០២៦" : "Sunday Sermon • Nov 1, 2026"}
              </span>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#e2e8f0",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "4px 12px",
                  borderRadius: "999px",
                }}
              >
                {sermon.scripture.reference}
              </span>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#e2e8f0",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "999px",
                }}
              >
                {sermon.duration}
              </span>
            </div>

            {/* Sermon Title */}
            <h1
              style={{
                fontFamily: "var(--font-khmer), 'Koh Santepheap', sans-serif",
                fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#ffffff",
                margin: "0 0 1rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.4)",
              }}
            >
              {sermon.title.km}
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#cbd5e1",
                margin: "0 0 2rem",
                maxWidth: 820,
              }}
            >
              {sermon.subtitle.km}
            </p>

            {/* Preacher & Church Seal Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sermon.preacher.avatar}
                  alt={sermon.preacher.name}
                  width="48"
                  height="48"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #38bdf8",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <strong style={{ fontSize: "15px", color: "#ffffff", fontWeight: 700 }}>
                      {sermon.preacher.name}
                    </strong>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.454-1.52.185-3.175-.82-4.18s-2.66-1.274-4.18-.82C14.7 2.625 13.33 1.75 11.75 1.75S8.8 2.625 8.148 3.9c-1.52-.454-3.175-.185-4.18.82s-1.274 2.66-.82 4.18C1.875 9.55 1 10.92 1 12.5s.875 2.95 2.148 3.6c-.454 1.52-.185 3.175.82 4.18s2.66 1.274 4.18.82c.652 1.275 2.022 2.15 3.602 2.15s2.95-.875 3.602-2.15c1.52.454 3.175.185 4.18-.82s1.274-2.66.82-4.18c1.273-.65 2.148-2.02 2.148-3.6z" fill="#1D9BF0"/>
                      <path d="M10.25 16.5L6 12.25L7.414 10.836L10.25 13.672L16.586 7.336L18 8.75L10.25 16.5Z" fill="#FFFFFF"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                    {isKm ? "ក្រុមជំនុំ អលណេសិន រាជធានីភ្នំពេញ" : "All Nations Church, Phnom Penh"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginLeft: "auto", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleCopyOutline}
                  className="oc-button"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {copied ? <CheckIcon style={{ width: 14, height: 14 }} /> : <BookOpenIcon style={{ width: 14, height: 14 }} />}
                  <span>{copied ? (isKm ? "បានចម្លងរួចរាល់!" : "Copied!") : (isKm ? "ចម្លងគ្រោងអធិប្បាយ" : "Copy Outline")}</span>
                </button>

                <Link
                  href="/gallery"
                  className="oc-button"
                  style={{
                    background: "#d4af37",
                    color: "#0f172a",
                    border: "none",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 800,
                    textDecoration: "none",
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>{isKm ? "ទិដ្ឋភាពថ្វាយបង្គំ ០១ វិច្ឆិកា" : "Nov 1 Worship Photos"}</span>
                  <ArrowUpRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PULPIT PHOTOGRAPHIC BANNER */}
        <section style={{ maxWidth: 1040, margin: "-1.5rem auto 3rem", padding: "0 1.5rem" }}>
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
              background: "#0f172a",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/worship-2026-11-01-fellowship.jpg"
              alt="Leader Hun Chet preaching from Psalm 46:1-11 on God Is Our Mighty Refuge"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                padding: "1rem 1.5rem",
                background: "#0f172a",
                color: "#e2e8f0",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span>
                📷 <strong>ទិដ្ឋភាពវេទិកា៖</strong> លោកគ្រូ ហ៊ុន ចិត្ត ចែករំលែកព្រះបន្ទូលពីគម្ពីរទំនុកដំកើង ៤៦:១–១១ «ព្រះជាម្ចាស់ជាទីជម្រកដ៏រឹងមាំរបស់យើង» នាថ្ងៃអាទិត្យ ទី១ ខែវិច្ឆិកា ឆ្នាំ២០២៦
              </span>
              <Link href="/gallery" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 700, fontSize: "12px" }}>
                {isKm ? "មើលរូបថតទាំងអស់ ↗" : "View All Photos ↗"}
              </Link>
            </div>
          </div>
        </section>

        {/* 3. FULL SERMON MANUSCRIPT CONTENT */}
        <article className="container" style={{ maxWidth: 860, padding: "0 1.5rem" }}>
          <div
            dangerouslySetInnerHTML={{ __html: SERMON_HTML }}
            style={{
              fontFamily: "var(--font-khmer), 'Koh Santepheap', sans-serif",
            }}
          />

          {/* AUTHOR BIO CARD */}
          <div style={{ marginTop: "4rem", borderTop: "2px solid #e2e8f0", paddingTop: "3rem" }}>
            <AuthorCard />
          </div>

          {/* BACK TO ARTICLES / FELLOWSHIP LINKS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "2.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Link
              href="/articles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#1e3a8a",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              <span>← {isKm ? "ត្រឡប់ទៅកាន់អត្ថបទ & ធម្មទេសនាទាំងអស់" : "Back to All Articles"}</span>
            </Link>

            <Link
              href="/library/matthew-henry-commentary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              <span>{isKm ? "អត្ថាធិប្បាយព្រះគម្ពីរ Matthew Henry" : "Matthew Henry Bible Commentary"}</span>
              <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </article>

        {/* 4. CONNECT & PRAYER BANNER */}
        <div style={{ marginTop: "5rem" }}>
          <ConnectBanner />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
