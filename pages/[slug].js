import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getAllPageSlugs, getPageBySlug, cleanContentHtml } from "../lib/wordpress";

// Slugs already handled by their own dedicated file under /pages, so we don't
// want this catch-all clobbering them (Next.js prefers static routes over
// dynamic ones automatically, but we skip generating duplicate static paths
// for these to keep the build clean).
const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "categories",
  "articles",
  "resource",
  "index",
  "404",
  "500",
]);

function stripHtml(html) {
  return (html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export async function getStaticPaths() {
  let slugs = [];
  try {
    slugs = await getAllPageSlugs();
  } catch (err) {
    // If WordPress is unreachable at build time, fall back to on-demand rendering.
  }

  return {
    paths: slugs
      .filter((slug) => !RESERVED_SLUGS.has(slug))
      .map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  if (RESERVED_SLUGS.has(params.slug)) {
    return { notFound: true };
  }

  const page = await getPageBySlug(params.slug);

  if (!page) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { page }, revalidate: 60 };
}

export default function WordPressPage({ page }) {
  const plainTitle = stripHtml(page.title?.rendered) || page.slug;
  const content = cleanContentHtml(page.content?.rendered || "");

  return (
    <>
      <Head>
        <title>{plainTitle} — hunchet.blog</title>
      </Head>

      <SiteHeader />

      <main className="container">
        <Link href="/" className="back-link">
          ← Back to home
        </Link>

        <article className="post-page">
          <h1>{plainTitle}</h1>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
