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
        <title>All Pages — Hun Chet</title>
        <meta
          name="description"
          content="Every page from the site, all in one place."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Index</span>
          <h1>All Pages</h1>
          <p>Every page carried over from the WordPress site.</p>
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
                >
                  <span className="category-card-name">{title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
