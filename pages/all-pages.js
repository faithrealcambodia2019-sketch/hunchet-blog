import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getPages } from "../lib/wordpress";

function stripHtml(html) {
  return (html || "").replace(/<[^>]+>/g, "").trim();
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
        <title>All Pages — hunchet.blog</title>
        <meta name="description" content="Every page from hunchet.blog, all in one place." />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="page-header">
          <h1>All pages</h1>
          <p>Every page carried over from the WordPress site.</p>
        </section>

        {error && <p className="error">Couldn&apos;t load pages: {error}</p>}

        <div className="category-grid">
          {pages.map((page) => {
            const title = stripHtml(page.title?.rendered) || page.slug;
            return (
              <Link key={page.id} href={`/${page.slug}`} className="category-card">
                <span className="category-card-name">{title}</span>
              </Link>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
