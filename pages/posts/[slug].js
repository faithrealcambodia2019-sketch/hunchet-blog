import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import AuthorCard from "../../components/AuthorCard";
import {
  getAllSlugs,
  getPostBySlug,
  getFeaturedImage,
  cleanContentHtml,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../../lib/wordpress";

export async function getStaticPaths() {
  let slugs = [];
  try {
    slugs = await getAllSlugs();
  } catch (err) {
    // If WordPress is unreachable at build time, fall back to on-demand rendering.
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { post }, revalidate: 60 };
}

function stripHtml(html) {
  return (html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export default function Post({ post }) {
  const image = getFeaturedImage(post);
  const plainTitle = stripHtml(post.title.rendered);
  const description = getExcerptText(post, 160);
  const content = cleanContentHtml(post.content.rendered);
  const categories = getPostCategories(post);

  return (
    <>
      <Head>
        <title>{plainTitle} — Hun Chet</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={plainTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {image && <meta property="og:image" content={image} />}
      </Head>

      <SiteHeader />

      <main className="container">
        <Link href="/articles" className="back-link">
          ← All articles
        </Link>

        <article className="post-page">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="post-hero" />
          )}
          <time className="post-date">{formatDate(post.date)}</time>
          {categories.length > 0 && (
            <div className="category-pills" style={{ marginTop: "0.5rem" }}>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="category-pill"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div style={{ marginTop: "3.5rem" }}>
            <AuthorCard />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
