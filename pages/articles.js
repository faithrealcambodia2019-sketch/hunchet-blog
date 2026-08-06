import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 20 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Articles({ posts, error }) {
  const t = useT();

  return (
    <>
      <Head>
        <title>{`${t("articles.title")} — Hun Chet`}</title>
        <meta name="description" content={t("articles.intro")} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("articles.eyebrow")}</span>
          <h1>{t("articles.title")}</h1>
          <p>{t("articles.intro")}</p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          {error && (
            <p className="error">
              {t("common.loadError")} {error}
            </p>
          )}

          {!error && posts.length === 0 && (
            <p className="empty-state">{t("articles.empty")}</p>
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
                    <h2
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="excerpt">{getExcerptText(post)}</p>
                    <span className="read-more">{t("common.readMore")}</span>
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
