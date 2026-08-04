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
        <title>Topics — hunchet.blog</title>
        <meta name="description" content="Browse hunchet.blog posts by topic." />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="page-header">
          <h1>Browse by topic</h1>
          <p>Find posts grouped by theme.</p>
        </section>

        {error && (
          <p className="error">Couldn&apos;t load topics: {error}</p>
        )}

        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="category-card"
            >
              <span className="category-card-name">{cat.name}</span>
              <span className="category-card-count">
                {cat.count} {cat.count === 1 ? "post" : "posts"}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
