import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import SubpageHero from "../../components/SubpageHero";
import ConnectBanner from "../../components/ConnectBanner";
import { useLocale } from "../../lib/i18n";
import { getCategories } from "../../lib/wordpress";

export async function getStaticProps() {
  try {
    const categories = await getCategories();
    return { props: { categories }, revalidate: 60 };
  } catch (err) {
    return { props: { categories: [], error: err.message }, revalidate: 60 };
  }
}

export default function Categories({ categories, error }) {
  const locale = useLocale();
  const isKm = locale === "km";
  const totalArticles = categories.reduce((acc, cat) => acc + (cat.count || 0), 0);

  return (
    <div className="oc-site">
      <Head>
        <title>
          {isKm
            ? "ប្រធានបទ និងប្រភេទធម្មទេសនា — ហ៊ុន ចិត្ត"
            : "Topics & Sermon Categories — Hun Chet"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "រុករកបណ្ណសារធម្មទេសនា និងអត្ថបទរបស់លោកគ្រូ ហ៊ុន ចិត្ត តាមប្រធានបទ។"
              : "Browse Hun Chet sermon archives and articles by topic."
          }
        />
      </Head>

      <SiteHeader />

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/sermon-purpose-congregation.jpg"
          kicker={isKm ? "ប្រធានបទ និងគោលលទ្ធិព្រះគម្ពីរ" : "THEOLOGICAL TOPICS"}
          title={isKm ? "រុករកតាមប្រធានបទ" : "TOPICS & CATEGORIES"}
          subtitle={
            isKm
              ? "ការបង្រៀនព្រះគម្ពីរជាប្រព័ន្ធ ចាត់តាមប្រធានបទទេវវិទ្យា"
              : "Systematic Biblical Teaching Grouped by Theological Subject"
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: isKm ? "ប្រធានបទ" : "Topics" },
          ]}
          stats={[
            { number: categories.length, label: isKm ? "ប្រធានបទសកម្ម" : "Active Topics" },
            { number: `${totalArticles}+`, label: isKm ? "អត្ថបទសរុប" : "Total Articles" },
            { number: "Hun Chet", label: isKm ? "ជំនឿ និងការបង្រៀន" : "Faith & Teaching" },
          ]}
        />

        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            {error && (
              <p style={{ color: "#e53e3e", textAlign: "center", marginBottom: "2rem" }}>
                {isKm ? "មិនអាចទាញយកប្រធានបទបានទេ: " : "Couldn't load topics: "}
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
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2rem",
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    borderRadius: 0,
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#141716",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      {cat.name}
                    </span>
                    <span style={{ color: "#64748b", fontSize: "0.88rem" }}>
                      {cat.count} {isKm ? "អត្ថបទ" : cat.count === 1 ? "article" : "articles"}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--oc-teal)",
                      marginTop: "1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{isKm ? "រុករកការបង្រៀន" : "EXPLORE TOPIC"}</span>
                    <span>→</span>
                  </span>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link href="/articles" className="oc-button oc-solid">
                <span>{isKm ? "មើលអត្ថបទ និងធម្មទេសនាទាំងអស់" : "VIEW ALL ARTICLES & SERMONS"}</span>
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
