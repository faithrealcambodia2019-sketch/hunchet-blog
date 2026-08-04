import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 3 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts, error }) {
  const description =
    "Reflections on faith, scripture, and everyday life from hunchet.blog.";

  return (
    <>
      <Head>
        <title>hunchet.blog — Faith &amp; Reflections</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="hunchet.blog" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="home-hero">
          <p className="home-hero-eyebrow">Welcome to hunchet.blog</p>
          <h1>Faith, scripture, and everyday reflections</h1>
          <p className="home-hero-sub">
            Written from the heart in Khmer — encouragement, prayer, and
            biblical teaching for everyday life.
          </p>
          <div className="home-hero-actions">
            <Link href="/articles" className="btn btn-light">
              Read Articles
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
        </section>

        {error && (
          <p className="error">
            Couldn&apos;t load posts from WordPress: {error}
          </p>
        )}

        <section className="home-section">
          <div className="home-section-header">
            <h2>Latest Articles</h2>
            <Link href="/articles" className="section-link">
              View all →
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
                    {getPostCategories(post).length > 0 && (
                      <div className="category-pills">
                        {getPostCategories(post).map((cat) => (
                          <span key={cat.id} className="category-pill">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <p className="excerpt">{getExcerptText(post)}</p>
                    <span className="read-more">Read more →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-header">
            <h2>Explore</h2>
          </div>
          <div className="category-grid">
            <Link href="/gallery" className="category-card">
              <span className="category-card-name">Gallery</span>
              <span className="category-card-count">
                Photos &amp; ministry moments
              </span>
            </Link>
            <Link href="/resource" className="category-card">
              <span className="category-card-name">Resource</span>
              <span className="category-card-count">
                Guides &amp; encouragement
              </span>
            </Link>
            <Link href="/articles" className="category-card">
              <span className="category-card-name">Article</span>
              <span className="category-card-count">
                All posts &amp; devotionals
              </span>
            </Link>
            <Link href="/categories" className="category-card">
              <span className="category-card-name">Topics</span>
              <span className="category-card-count">Browse by theme</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
