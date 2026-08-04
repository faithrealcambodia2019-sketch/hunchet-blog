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
    const posts = await getPosts({ perPage: 10 });
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
        <section className="hero-banner">
          <h1>Faith, scripture, and everyday reflections</h1>
          <p>Written from the heart in Khmer, published here for everyone.</p>
        </section>

        {error && (
          <p className="error">
            Couldn&apos;t load posts from WordPress: {error}
          </p>
        )}

        {!error && posts.length === 0 && (
          <p className="empty-state">No posts yet — check back soon.</p>
        )}

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
      </main>

      <SiteFooter />
    </>
  );
}
