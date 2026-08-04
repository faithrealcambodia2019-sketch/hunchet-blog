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
        <title>{category.name} — hunchet.blog</title>
        <meta
          name="description"
          content={`Posts about ${category.name} on hunchet.blog.`}
        />
      </Head>

      <SiteHeader />

      <main className="container">
        <Link href="/categories" className="back-link">
          ← All topics
        </Link>

        <section className="page-header">
          <h1>{category.name}</h1>
          <p>
            {posts.length} {posts.length === 1 ? "post" : "posts"} in this
            topic.
          </p>
        </section>

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
