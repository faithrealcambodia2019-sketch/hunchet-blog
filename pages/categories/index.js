import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { useLocale } from "../../lib/i18n";
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
  const locale = useLocale();
  const isKm = locale === "km";
  const totalArticles = categories.reduce((acc, cat) => acc + (cat.count || 0), 0);

  return (
    <>
      <Head>
        <title>
          {isKm
            ? "ប្រធានបទ និងប្រភេទធម្មទេសនា — ហ៊ុន ចិត្ត"
            : "Topics & Sermon Categories — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "រុករកបណ្ណសារធម្មទេសនា និងអត្ថបទរបស់លោកគ្រូ ហ៊ុន ចិត្ត តាមប្រធានបទ។"
              : "Browse Hun Chet sermon archives and articles by topic."
          }
        />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/sermon-purpose-congregation.jpg"
          alt="Hun Chet Ministry Sanctuary"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "ប្រធានបទ និងគោលលទ្ធិព្រះគម្ពីរ" : "Theological Themes & Topics"}</span>
          </div>
          <h1 className="sanctuary-hero-title">
            {isKm ? "រុករកតាមប្រធានបទ" : "Browse Topics"}
          </h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "ការបង្រៀនព្រះគម្ពីរជាប្រព័ន្ធ ចាត់តាមប្រធានបទទេវវិទ្យា"
              : "Systematic Biblical Teaching Grouped by Theological Subject"}
          </p>
          <p className="sanctuary-hero-lead">
            {isKm
              ? "រុករកធម្មទេសនា ព្រះបន្ទូលប្រចាំថ្ងៃ និងការពន្យល់ជាក់ស្តែងសម្រាប់ការបណ្តុះសិស្ស។"
              : "Explore sermons, devotions, and practical expositions organized for deep discipleship."}
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{categories.length}</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ប្រធានបទសកម្ម" : "Active Topics"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{totalArticles}+</span>
              <span className="sanctuary-stat-label">
                {isKm ? "អត្ថបទសរុប" : "Total Articles"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">
                {isKm ? "ហ៊ុន ចិត្ត" : "Hun Chet"}
              </span>
              <span className="sanctuary-stat-label">
                {isKm ? "ជំនឿ និងការបង្រៀន" : "Faith & Teaching"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          {error && (
            <p className="error">
              {isKm ? "មិនអាចទាញយកប្រធានបទបានទេ: " : "Couldn't load topics: "}
              {error}
            </p>
          )}

          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="category-card"
                style={{ borderTop: "3px solid var(--gold)", borderRadius: "var(--radius)" }}
              >
                <span
                  className="category-card-name"
                  style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)" }}
                >
                  {cat.name}
                </span>
                <span className="category-card-count" style={{ color: "var(--muted)" }}>
                  {cat.count} {isKm ? "អត្ថបទ" : cat.count === 1 ? "article" : "articles"}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--gold)",
                    marginTop: "0.75rem",
                  }}
                >
                  {isKm ? "រុករកការបង្រៀន →" : "Explore Expositions →"}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/articles" className="btn btn-primary">
              {isKm ? "មើលអត្ថបទ និងធម្មទេសនាទាំងអស់" : "View All Articles & Sermons"}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
