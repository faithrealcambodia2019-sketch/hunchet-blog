import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getFeaturedImage,
  getExcerptText,
  formatDate,
} from "../../lib/wordpress";

export async function getStaticPaths() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch (err) {
    // fall back to on-demand rendering if WordPress is unreachable at build time
  }

  return {
    paths: categories.map((cat) => ({ params: { slug: cat.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return { notFound: true, revalidate: 60 };
  }

  const posts = await getPostsByCategory(category.id);

  return { props: { category, posts }, revalidate: 60 };
}

export default function CategoryPage({ category, posts }) {
  return (
    <>
      <Head>
        <title>{`${category.name} — All Nations Church & Hun Chet`}</title>
        <meta name="description" content={`Biblical expositions and articles on ${category.name}.`} />
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
            <span>Topic Archives</span>
          </div>
          <h1 className="sanctuary-hero-title">{category.name}</h1>
          <p className="sanctuary-hero-subtitle">
            Sanctuary Sermons and Biblical Expositions
          </p>
          <p className="sanctuary-hero-lead">
            Explore {posts.length} {posts.length === 1 ? "article" : "articles"} in this category.
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{posts.length}</span>
              <span className="sanctuary-stat-label">Published Articles</span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Topic</span>
              <span className="sanctuary-stat-label">{category.name}</span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Church</span>
              <span className="sanctuary-stat-label">All Nations Church</span>
            </div>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <Link href="/categories" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
              ← All Topics
            </Link>
            <Link href="/articles" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>
              All Articles →
            </Link>
          </div>

          <div className="post-grid">
            {posts.map((post) => {
              const image = getFeaturedImage(post);
              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="post-card"
                >
                  <div className="post-thumb-wrap">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt="" className="post-thumb" />
                    ) : (
                      <div className="post-thumb post-thumb-placeholder">
                        <span>H</span>
                      </div>
                    )}
                  </div>
                  <div className="post-card-body">
                    <time className="post-date">{formatDate(post.date)}</time>
                    <h2
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="excerpt">{getExcerptText(post)}</p>
                    <span className="read-more">Read Exposition →</span>
                  </div>
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
