import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getPages } from "../lib/wordpress";

function stripHtml(html) {
  return (html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function getStaticProps() {
  try {
    const pages = await getPages();
    return { props: { pages }, revalidate: 60 };
  } catch (err) {
    return { props: { pages: [], error: err.message }, revalidate: 60 };
  }
}

export default function AllPages({ pages, error }) {
  return (
    <>
      <Head>
        <title>All Pages Directory — All Nations Church & Hun Chet</title>
        <meta
          name="description"
          content="Complete sitemap and directory of All Nations Church resources."
        />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/history-prayer-fellowship.jpg"
          alt="All Nations Church Ministry"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>Sitemap & Directory</span>
          </div>
          <h1 className="sanctuary-hero-title">All Pages Directory</h1>
          <p className="sanctuary-hero-subtitle">
            Complete Index of Ministry Pages, Archives, and Church Life
          </p>
          <p className="sanctuary-hero-lead">
            Easily discover every section of our ministry, library, and biblical preaching archives.
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{pages.length}</span>
              <span className="sanctuary-stat-label">Published Pages</span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">All Nations</span>
              <span className="sanctuary-stat-label">Church Campus</span>
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          {error && <p className="error">Couldn&apos;t load pages: {error}</p>}

          <div className="category-grid">
            {pages.map((page) => {
              const title = stripHtml(page.title?.rendered) || page.slug;
              return (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="category-card"
                  style={{ borderTop: "3px solid var(--gold)", borderRadius: "2px" }}
                >
                  <span className="category-card-name" style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)" }}>
                    {title}
                  </span>
                  <span className="category-card-count" style={{ color: "var(--muted)" }}>
                    /{page.slug}
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
