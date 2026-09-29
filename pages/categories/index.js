import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { getCategories } from "../../lib/wordpress";

export async function getStaticProps() {
  try {
    const categories = await getCategories();
    return { props: { categories }, revalidate: 60 };
  } catch (err) {
    return { props: { categories: [], error: err.message }, revalidate: 60 };
  }
}

export default function Categories({ categories, error }) {
  const totalArticles = categories.reduce((acc, cat) => acc + (cat.count || 0), 0);

  return (
    <>
      <Head>
        <title>Topics & Sermon Categories — All Nations Church & Hun Chet</title>
        <meta name="description" content="Browse All Nations Church sermon archives and articles by topic." />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/sermon-purpose-congregation.jpg"
          alt="All Nations Church Sanctuary"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>Theological Themes & Topics</span>
          </div>
          <h1 className="sanctuary-hero-title">Browse Topics</h1>
          <p className="sanctuary-hero-subtitle">
            Systematic Biblical Teaching Grouped by Theological Subject
          </p>
          <p className="sanctuary-hero-lead">
            Explore sermons, devotions, and practical expositions organized for deep discipleship.
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{categories.length}</span>
              <span className="sanctuary-stat-label">Active Topics</span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{totalArticles}+</span>
              <span className="sanctuary-stat-label">Total Articles</span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">All Nations</span>
              <span className="sanctuary-stat-label">Church Teaching</span>
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          {error && <p className="error">Couldn&apos;t load topics: {error}</p>}

          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="category-card"
                style={{ borderTop: "3px solid var(--gold)", borderRadius: "var(--radius)" }}
              >
                <span className="category-card-name" style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)" }}>
                  {cat.name}
                </span>
                <span className="category-card-count" style={{ color: "var(--muted)" }}>
                  {cat.count} {cat.count === 1 ? "article" : "articles"}
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginTop: "0.75rem" }}>
                  Explore Expositions →
                </span>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/articles" className="btn btn-primary">
              View All Articles & Sermons
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
