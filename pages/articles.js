import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import { SearchIcon, ArrowRightIcon } from "../components/Icons";
import { useT, useLocale } from "../lib/i18n";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 30 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Articles({ posts = [], error }) {
  const router = useRouter();
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync category from query string (?cat=salvation)
  useEffect(() => {
    if (router.query.cat) {
      setActiveCategory(router.query.cat);
    }
  }, [router.query.cat]);

  // Extract all unique categories
  const categories = useMemo(() => {
    const map = new Map();
    posts.forEach((post) => {
      const cats = getPostCategories(post);
      cats.forEach((c) => {
        if (!map.has(c.slug)) {
          map.set(c.slug, { slug: c.slug, name: c.name, count: 0 });
        }
        map.get(c.slug).count += 1;
      });
    });
    return Array.from(map.values());
  }, [posts]);

  // Filtered posts based on category and search
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        getPostCategories(post).some((c) => c.slug === activeCategory);

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const title = (post.title?.rendered || "").toLowerCase();
      const excerpt = getExcerptText(post).toLowerCase();
      return title.includes(q) || excerpt.includes(q);
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="oc-site">
      <Head>
        <title>{`${t("articles.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("articles.intro")} />
      </Head>

      <SiteHeader />

      <main>
        {/* 1. ONE CHURCH HERO */}
        <SubpageHero
          eyebrow={isKm ? "អត្ថបទ និងការបង្រៀនព្រះគម្ពីរ" : "BIBLICAL ARTICLES & EXEGESIS"}
          title={t("articles.title")}
          subtitle={
            isKm
              ? "ការពន្យល់ព្រះគម្ពីរ ការបង្រៀនព្រះបន្ទូល និងការបណ្តុះបណ្តាលជីវិតគ្រីស្ទបរិស័ទជាភាសាខ្មែរ ដោយលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Biblical exegesis, practical Christian living, and theological writings by Leader Hun Chet."
          }
          bgImage="/images/sermon-purpose-congregation.jpg"
          stats={[
            { number: `${posts.length}+`, label: isKm ? "អត្ថបទទាំងអស់" : "Articles" },
            { number: "Weekly", label: isKm ? "បច្ចុប្បន្នភាព" : "Cadence" },
            { number: "1954", label: isKm ? "ព្រះគម្ពីរខ្មែរ" : "Scripture" },
          ]}
        />

        {/* 2. FILTER & SEARCH BAR (One Church Clean Minimalist) */}
        <div
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #dcdfda",
            position: "sticky",
            top: "76px",
            zIndex: 30,
            padding: "1rem 0",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Category Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                style={{
                  padding: "8px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: 0,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeCategory === "all" ? "#141716" : "#ffffff",
                  color: activeCategory === "all" ? "#ffffff" : "#626868",
                  border: activeCategory === "all" ? "1px solid #141716" : "1px solid #dcdfda",
                }}
              >
                {isKm ? "ទាំងអស់" : "ALL"} ({posts.length})
              </button>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    style={{
                      padding: "8px 16px",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      borderRadius: 0,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: isActive ? "#141716" : "#ffffff",
                      color: isActive ? "#ffffff" : "#626868",
                      border: isActive ? "1px solid #141716" : "1px solid #dcdfda",
                    }}
                  >
                    {cat.name} ({cat.count})
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  pointerEvents: "none",
                  width: "16px",
                  height: "16px",
                }}
              >
                <SearchIcon width={16} height={16} style={{ width: 16, height: 16, flexShrink: 0 }} />
              </span>
              <input
                type="text"
                placeholder={isKm ? "ស្វែងរកអត្ថបទ..." : "Search articles..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "36px",
                  paddingRight: "14px",
                  background: "#fbfbf9",
                  border: "1px solid #dcdfda",
                  borderRadius: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#141716",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* 3. ARTICLES DIRECTORY */}
        <section className="oc-section" style={{ background: "#ffffff", paddingBlock: "4rem" }}>
          <div className="container">
            {error && (
              <p style={{ textAlign: "center", color: "#dc2626", padding: "2rem" }}>
                {t("common.loadError")} {error}
              </p>
            )}

            {!error && filteredPosts.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "#fbfbf9",
                  border: "1px solid #dcdfda",
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
              >
                <p style={{ color: "#64748b", fontSize: "1rem", margin: "0 0 1.5rem" }}>
                  {isKm
                    ? "មិនមានអត្ថបទត្រូវនឹងការស្វែងរកនេះទេ។"
                    : "No articles found matching your criteria."}
                </p>
                <button
                  type="button"
                  className="oc-button oc-solid"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                >
                  <span>{isKm ? "កំណត់ឡើងវិញ" : "CLEAR FILTERS"}</span>
                </button>
              </div>
            )}

            {/* 3-Column One Church Card Grid */}
            {filteredPosts.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "32px",
                }}
              >
                {filteredPosts.map((post) => {
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
                        transition: "border-color 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16 / 10",
                          background: "#141716",
                          overflow: "hidden",
                        }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "#141716",
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

                      <div
                        style={{
                          padding: "1.75rem",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "var(--oc-teal)",
                              display: "block",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {formatDate(post.date)}
                          </span>
                          <h3
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
                          <p
                            style={{
                              color: "#4a5568",
                              fontSize: "0.92rem",
                              lineHeight: 1.65,
                              margin: "0 0 1.25rem",
                            }}
                          >
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
                            gap: "6px",
                            paddingTop: "0.85rem",
                            borderTop: "1px solid #eef0eb",
                          }}
                        >
                          <span>{isKm ? "អានអត្ថបទពេញលេញ" : "READ FULL ARTICLE"}</span>
                          <ArrowRightIcon style={{ width: 12, height: 12 }} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 4. ONE CHURCH CONNECT BANNER */}
        <ConnectBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
