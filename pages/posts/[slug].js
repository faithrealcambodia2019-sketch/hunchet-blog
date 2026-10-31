import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ConnectBanner from "../../components/ConnectBanner";
import AuthorCard from "../../components/AuthorCard";
import { useLocale } from "../../lib/i18n";
import {
  getAllSlugs,
  getPostBySlug,
  getFeaturedImage,
  cleanContentHtml,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../../lib/wordpress";

export async function getStaticPaths() {
  let slugs = [];
  try {
    slugs = await getAllSlugs();
  } catch (err) {
    // If WordPress is unreachable at build time, fall back to on-demand rendering.
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { post }, revalidate: 60 };
}

function stripHtml(html) {
  return (html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function estimateReadingTime(text, isKm = false) {
  const words = (text || "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return isKm ? `${minutes} នាទីនៃការអាន` : `${minutes} min read`;
}

export default function Post({ post }) {
  const locale = useLocale();
  const isKm = locale === "km";
  const image = getFeaturedImage(post);
  const plainTitle = stripHtml(post.title.rendered);
  const description = getExcerptText(post, 160);
  const content = cleanContentHtml(post.content.rendered);
  const categories = getPostCategories(post);
  const readingTime = estimateReadingTime(
    stripHtml(post.content?.rendered || ""),
    isKm
  );

  return (
    <div className="oc-site">
      <Head>
        <title>{`${plainTitle} — Hun Chet`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={plainTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {image && <meta property="og:image" content={image} />}
      </Head>

      <SiteHeader />

      <main style={{ background: "#ffffff", paddingBottom: "4rem" }}>
        {/* EDITORIAL ARTICLE HERO / HEADER */}
        <div style={{ background: "#141716", color: "#ffffff", padding: "4rem 1.5rem 3.5rem" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            {/* Breadcrumb Bar */}
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
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "1.75rem",
              }}
            >
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                {isKm ? "ទំព័រដើម" : "HOME"}
              </Link>
              <span>/</span>
              <Link href="/articles" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                {isKm ? "អត្ថបទ" : "ARTICLES"}
              </Link>
              {categories.length > 0 && (
                <>
                  <span>/</span>
                  <Link href={`/category/${categories[0].slug}`} style={{ color: "var(--oc-teal)", textDecoration: "none" }}>
                    {categories[0].name.toUpperCase()}
                  </Link>
                </>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "1rem",
              }}
            >
              <time style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {formatDate(post.date)}
              </time>
              <span>•</span>
              <span style={{ color: "var(--oc-teal)", fontWeight: 700 }}>
                {readingTime}
              </span>
              <span>•</span>
              <span>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#ffffff",
                margin: "0",
              }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>
        </div>

        <div className="container" style={{ maxWidth: 860, paddingTop: "3rem" }}>
          {/* Featured Image */}
          {image && (
            <div
              style={{
                marginBottom: "3rem",
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid #dcdfda",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}

          {/* Main Article Content */}
          <article
            className="post-content"
            style={{
              fontSize: "1.08rem",
              lineHeight: 1.85,
              color: "#2d3748",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Author Connection */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid #dcdfda",
            }}
          >
            <span
              className="oc-eyebrow"
              style={{ textAlign: "center", display: "block", marginBottom: "1.5rem" }}
            >
              {isKm ? "អំពីម្ចាស់ប្លុក និងអ្នកនិពន្ធ" : "ABOUT THE AUTHOR"}
            </span>
            <AuthorCard />
          </div>

          {/* Navigation Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid #dcdfda",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link href="/articles" className="oc-button oc-solid">
              <span>{isKm ? "← ត្រឡប់ទៅកាន់អត្ថបទទាំងអស់" : "← BACK TO ALL ARTICLES"}</span>
            </Link>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link href="/library" className="oc-button oc-outline-dark">
                <span>{isKm ? "បណ្ណាល័យ" : "LIBRARY"}</span>
              </Link>
              <Link href="/resource" className="oc-button oc-outline-dark">
                <span>{isKm ? "វីដេអូ" : "VIDEOS"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ONE CHURCH CONNECT BANNER */}
        <div style={{ marginTop: "4rem" }}>
          <ConnectBanner />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
