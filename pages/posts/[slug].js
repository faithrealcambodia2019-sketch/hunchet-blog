import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import AuthorCard from "../../components/AuthorCard";
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

function estimateReadingTime(text) {
  const words = (text || "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function Post({ post }) {
  const image = getFeaturedImage(post);
  const plainTitle = stripHtml(post.title.rendered);
  const description = getExcerptText(post, 160);
  const content = cleanContentHtml(post.content.rendered);
  const categories = getPostCategories(post);
  const readingTime = estimateReadingTime(stripHtml(post.content?.rendered || ""));

  return (
    <>
      <Head>
        <title>{`${plainTitle} — All Nations Church & Hun Chet`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={plainTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {image && <meta property="og:image" content={image} />}
      </Head>

      <SiteHeader />

      <main className="container">
        {/* Scholarly Breadcrumb Bar */}
        <div className="reading-room-breadcrumbs" style={{ marginTop: "2.5rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/articles">Articles</Link>
          {categories.length > 0 && (
            <>
              <span>/</span>
              <Link href={`/category/${categories[0].slug}`}>{categories[0].name}</Link>
            </>
          )}
          <span>/</span>
          <span style={{ color: "var(--navy-dark)", fontWeight: 700 }}>Reading Room</span>
        </div>

        <article className="post-page" style={{ paddingTop: "0.5rem" }}>
          {/* Article Header */}
          <header className="reading-room-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div className="reading-room-meta">
                <span className="reading-room-meta-item">
                  <time className="post-date">{formatDate(post.date)}</time>
                </span>
                <span>•</span>
                <span className="reading-room-meta-item" style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {readingTime}
                </span>
                <span>•</span>
                <span className="reading-room-meta-item">
                  Leader Hun Chet
                </span>
              </div>

              {categories.length > 0 && (
                <div className="category-pills">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="category-pill"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.22,
                color: "var(--navy-dark)",
                margin: "1rem 0 1rem",
              }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </header>

          {/* Featured Image */}
          {image && (
            <div style={{ marginBottom: "2.5rem", borderRadius: "var(--radius-lg)", overflow: "hidden", borderBottom: "3px solid var(--gold)", boxShadow: "var(--shadow-md)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}

          {/* Main Article Content */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Canonical Author Connection */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <span className="eyebrow" style={{ textAlign: "center", display: "block", marginBottom: "1rem" }}>
              About The Preacher & Writer
            </span>
            <AuthorCard />
          </div>

          {/* Navigation Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/articles" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
              ← Back to all articles
            </Link>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/library" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
                Study Library
              </Link>
              <Link href="/resource" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
                Video Archives
              </Link>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
