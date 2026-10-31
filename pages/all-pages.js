import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import { useLocale } from "../lib/i18n";
import { getPages } from "../lib/wordpress";

function stripHtml(html) {
  return (html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function getStaticProps() {
  try {
    const pages = await getPages();
    return { props: { pages }, revalidate: 60 };
  } catch (err) {
    return { props: { pages: [], error: err.message }, revalidate: 60 };
  }
}

export default function AllPages({ pages, error }) {
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <div className="oc-site">
      <Head>
        <title>
          {isKm ? "បញ្ជីទំព័រទាំងអស់ — ហ៊ុន ចិត្ត" : "All Pages Directory — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "លិបិក្រម និងបញ្ជីធនធានពេញលេញនៃព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Complete sitemap and directory of Hun Chet ministry resources."
          }
        />
      </Head>

      <SiteHeader />

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/history-prayer-fellowship.jpg"
          kicker={isKm ? "បណ្ដាញទំព័រ និងបញ្ជីធនធាន" : "SITEMAP & DIRECTORY"}
          title={isKm ? "បញ្ជីទំព័រទាំងអស់" : "ALL PAGES"}
          subtitle={
            isKm
              ? "លិបិក្រមពេញលេញនៃទំព័រព័ន្ធកិច្ច បណ្ណសារ និងជីវិតក្រុមជំនុំ"
              : "Complete Index of Ministry Pages, Archives, and Church Life"
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: isKm ? "បញ្ជីទំព័រ" : "All Pages" },
          ]}
          stats={[
            { number: pages.length, label: isKm ? "ទំព័រដែលបានចុះផ្សាយ" : "Published Pages" },
            { number: "Hun Chet", label: isKm ? "ជំនឿ និងព័ន្ធកិច្ច" : "Faith & Ministry" },
          ]}
        />

        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            {error && (
              <p style={{ color: "#e53e3e", textAlign: "center", marginBottom: "2rem" }}>
                {isKm ? "មិនអាចទាញយកទំព័របានទេ: " : "Couldn't load pages: "}
                {error}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {pages.map((page) => {
                const title = stripHtml(page.title?.rendered) || page.slug;
                return (
                  <Link
                    key={page.id}
                    href={`/${page.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "1.75rem",
                      background: "#fbfbf9",
                      border: "1px solid #dcdfda",
                      borderRadius: 0,
                      textDecoration: "none",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#141716",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      {title}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "monospace",
                        color: "#64748b",
                      }}
                    >
                      /{page.slug}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link href="/" className="oc-button oc-solid">
                <span>{isKm ? "ត្រឡប់ទៅទំព័រដើម" : "RETURN TO HOME"}</span>
              </Link>
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
