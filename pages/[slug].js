import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getAllPageSlugs, getPageBySlug, cleanContentHtml } from "../lib/wordpress";

const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "categories",
  "articles",
  "resource",
  "gallery",
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
        <title>{plainTitle} — All Nations Church & Hun Chet</title>
      </Head>

      <SiteHeader />

      <main className="container" style={{ paddingBottom: "5rem" }}>
        <div className="reading-room-breadcrumbs" style={{ marginTop: "2.5rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: "var(--navy-dark)", fontWeight: 700 }}>{plainTitle}</span>
        </div>

        <article className="post-page" style={{ paddingTop: "0.5rem" }}>
          <header className="reading-room-header">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: 1.25,
                color: "var(--navy-dark)",
                margin: "0 0 1rem",
              }}
            >
              {plainTitle}
            </h1>
          </header>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div style={{ marginTop: "3.5rem" }}>
            <Link href="/" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
              ← Return to Home
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
