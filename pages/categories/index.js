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
  return (
    <>
      <Head>
        <title>Topics — Hun Chet</title>
        <meta name="description" content="Browse articles by topic." />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Browse</span>
          <h1>Topics</h1>
          <p>Find writing grouped by theme.</p>
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
              >
                <span className="category-card-name">{cat.name}</span>
                <span className="category-card-count">
                  {cat.count} {cat.count === 1 ? "article" : "articles"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
