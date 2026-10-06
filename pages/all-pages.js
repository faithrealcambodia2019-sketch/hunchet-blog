import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useLocale } from "../lib/i18n";
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
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <>
      <Head>
        <title>
          {isKm ? "បញ្ជីទំព័រទាំងអស់ — ហ៊ុន ចិត្ត" : "All Pages Directory — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "លិបិក្រម និងបញ្ជីធនធានពេញលេញនៃព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Complete sitemap and directory of Hun Chet ministry resources."
          }
        />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/history-prayer-fellowship.jpg"
          alt="Hun Chet Ministry"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "បណ្ដាញទំព័រ និងបញ្ជីធនធាន" : "Sitemap & Directory"}</span>
          </div>
          <h1 className="sanctuary-hero-title">
            {isKm ? "បញ្ជីទំព័រទាំងអស់" : "All Pages Directory"}
          </h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "លិបិក្រមពេញលេញនៃទំព័រព័ន្ធកិច្ច បណ្ណសារ និងជីវិតក្រុមជំនុំ"
              : "Complete Index of Ministry Pages, Archives, and Church Life"}
          </p>
          <p className="sanctuary-hero-lead">
            {isKm
              ? "ស្វែងរកផ្នែកនីមួយៗនៃព័ន្ធកិច្ច បណ្ណាល័យ និងបណ្ណសារផ្សាយព្រះបន្ទូលរបស់យើងយ៉ាងងាយស្រួល។"
              : "Easily discover every section of our ministry, library, and biblical preaching archives."}
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{pages.length}</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ទំព័រដែលបានចុះផ្សាយ" : "Published Pages"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ជំនឿ និងព័ន្ធកិច្ច" : "Faith & Ministry"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          {error && (
            <p className="error">
              {isKm ? "មិនអាចទាញយកទំព័របានទេ: " : "Couldn't load pages: "}
              {error}
            </p>
          )}

          <div className="category-grid">
            {pages.map((page) => {
              const title = stripHtml(page.title?.rendered) || page.slug;
              return (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="category-card"
                  style={{ borderTop: "3px solid var(--gold)", borderRadius: "var(--radius)" }}
                >
                  <span
                    className="category-card-name"
                    style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)" }}
                  >
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
              {isKm ? "ត្រឡប់ទៅទំព័រដើម" : "Return to Home"}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
