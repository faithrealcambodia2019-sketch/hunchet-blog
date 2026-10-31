import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import { useLocale } from "../lib/i18n";
import { getAllPageSlugs, getPageBySlug, cleanContentHtml } from "../lib/wordpress";

const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "categories",
  "articles",
  "resource",
  "gallery",
  "devotions",
  "partner-with-us",
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
  const locale = useLocale();
  const isKm = locale === "km";
  const plainTitle = stripHtml(page.title?.rendered) || page.slug;
  const content = cleanContentHtml(page.content?.rendered || "");

  return (
    <div className="oc-site">
      <Head>
        <title>{plainTitle} — Hun Chet</title>
      </Head>

      <SiteHeader />

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/history-prayer-fellowship.jpg"
          kicker={isKm ? "ទំព័រព័ត៌មាន" : "PAGE ARCHIVE"}
          title={plainTitle}
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: plainTitle },
          ]}
        />

        <div className="container" style={{ maxWidth: 860, paddingBlock: "4rem" }}>
          <article
            className="post-content"
            style={{
              fontSize: "1.08rem",
              lineHeight: 1.85,
              color: "#2d3748",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid #dcdfda" }}>
            <Link href="/" className="oc-button oc-solid">
              <span>{isKm ? "← ត្រឡប់ទៅទំព័រដើម" : "← RETURN TO HOME"}</span>
            </Link>
          </div>
        </div>

        {/* ONE CHURCH CONNECT BANNER */}
        <ConnectBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
