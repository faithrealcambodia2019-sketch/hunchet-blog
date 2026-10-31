import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import SubpageHero from "../../components/SubpageHero";
import ConnectBanner from "../../components/ConnectBanner";
import { useLocale } from "../../lib/i18n";
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
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <div className="oc-site">
      <Head>
        <title>{`${category.name} — Hun Chet`}</title>
        <meta
          name="description"
          content={
            isKm
              ? `អត្ថបទ និងធម្មទេសនាព្រះគម្ពីរអំពី ${category.name}។`
              : `Biblical expositions and articles on ${category.name}.`
          }
        />
      </Head>

      <SiteHeader />

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/sermon-purpose-congregation.jpg"
          kicker={isKm ? "បណ្ណសារប្រធានបទ" : "TOPIC ARCHIVES"}
          title={category.name}
          subtitle={
            isKm
              ? "អត្ថបទទេសនា និងការពន្យល់ព្រះបន្ទូលក្នុងព្រះវិហារ"
              : "Sanctuary Sermons and Biblical Expositions"
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: isKm ? "ប្រធានបទ" : "Topics", href: "/categories" },
            { label: category.name },
          ]}
          stats={[
            { number: posts.length, label: isKm ? "អត្ថបទដែលបានចុះផ្សាយ" : "Articles" },
            { number: "Topic", label: category.name },
            { number: "Hun Chet", label: isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Ministry" },
          ]}
        />

        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #dcdfda",
              }}
            >
              <Link href="/categories" className="oc-button oc-outline-dark" style={{ padding: "0.6rem 1.25rem", fontSize: "11px" }}>
                <span>{isKm ? "← ប្រធានបទទាំងអស់" : "← ALL TOPICS"}</span>
              </Link>
              <Link href="/articles" className="oc-button oc-outline-dark" style={{ padding: "0.6rem 1.25rem", fontSize: "11px" }}>
                <span>{isKm ? "អត្ថបទទាំងអស់ →" : "ALL ARTICLES →"}</span>
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              {posts.map((post) => {
                const image = getFeaturedImage(post);
                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "#ffffff",
                      border: "1px solid #dcdfda",
                      borderRadius: 0,
                      textDecoration: "none",
                      overflow: "hidden",
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16 / 10", background: "#141716", overflow: "hidden" }}>
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontFamily: "var(--font-display)",
                            fontSize: "2rem",
                            fontWeight: 800,
                          }}
                        >
                          HUN CHET
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                      <div>
                        <time style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oc-teal)", display: "block", marginBottom: "0.5rem" }}>
                          {formatDate(post.date)}
                        </time>
                        <h2
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "#141716",
                            margin: "0 0 0.75rem",
                          }}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: 1.65, margin: "0 0 1.25rem" }}>
                          {getExcerptText(post, 120)}
                        </p>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: "#141716",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span>{isKm ? "អានការពន្យល់" : "READ EXPOSITION"}</span>
                        <span>→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ONE CHURCH CONNECT BANNER */}
        <ConnectBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
