import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { SearchIcon } from "../components/Icons";
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

export default function Articles({ posts, error }) {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <>
      <Head>
        <title>{`${t("articles.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("articles.intro")} />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/sermon-purpose-congregation.jpg"
          alt="Congregation in Worship — Hun Chet Ministry"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "បណ្ណសារព្រះបន្ទូល និងអត្ថបទទេសនា" : "Sanctuary Expositions & Sermons"}</span>
          </div>
          <h1 className="sanctuary-hero-title">{t("articles.title")}</h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "ការបង្រៀនព្រះបន្ទូល ការពន្យល់ព្រះគម្ពីរ និងការបណ្តុះបណ្តាលជីវិតគ្រីស្ទបរិស័ទ"
              : "Biblical Exegesis, Practical Christian Living, and Spiritual Guidance"}
          </p>
          <p className="sanctuary-hero-lead">{t("articles.intro")}</p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{posts.length}+</span>
              <span className="sanctuary-stat-label">
                {isKm ? "អត្ថបទ និងទេសនា" : "Published Articles"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Weekly</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ទេសនារៀងរាល់សប្តាហ៍" : "Sanctuary Sermons"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Bilingual</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ភាសាខ្មែរ និងអង់គ្លេស" : "Khmer & English"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Filter & Search Bar */}
      <div className="archive-filter-bar">
        <div className="container archive-filter-row">
          <div className="archive-tab-group">
            <button
              type="button"
              className={`archive-tab-btn ${activeCategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              {isKm ? "ទាំងអស់" : "All Articles"}
              <span className="archive-tab-count">({posts.length})</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`archive-tab-btn ${activeCategory === cat.slug ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
                <span className="archive-tab-count">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="archive-search-box">
            <SearchIcon className="archive-search-icon" />
            <input
              type="text"
              className="archive-search-input"
              placeholder={isKm ? "ស្វែងរកចំណងជើង ឬប្រធានបទ..." : "Search sermons & articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {error && (
            <p className="error">
              {t("common.loadError")} {error}
            </p>
          )}

          {!error && filteredPosts.length === 0 && (
            <div className="empty-state">
              <p>{isKm ? "មិនមានអត្ថបទត្រូវនឹងការស្វែងរកនេះទេ។" : "No articles found matching your criteria."}</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                style={{ marginTop: "1rem" }}
              >
                {isKm ? "កំណត់ឡើងវិញ" : "Clear Filters"}
              </button>
            </div>
          )}

          {/* Featured Spotlight Card */}
          {featuredPost && (
            <article className="article-spotlight-card">
              <div className="article-spotlight-thumb">
                <Link href={`/posts/${featuredPost.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getFeaturedImage(featuredPost)}
                    alt=""
                  />
                </Link>
              </div>
              <div className="article-spotlight-body">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span className="article-spotlight-tag">
                    {isKm ? "អត្ថបទទេសនាចម្បង" : "Featured Sermon"}
                  </span>
                  <time className="post-date">{formatDate(featuredPost.date)}</time>
                </div>
                <h2 className="article-spotlight-title">
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                    style={{ color: "inherit", textDecoration: "none" }}
                  />
                </h2>
                <p className="article-spotlight-excerpt">{getExcerptText(featuredPost, 220)}</p>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link href={`/posts/${featuredPost.slug}`} className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
                    {isKm ? "អានអត្ថបទពេញលេញ" : "Read Full Exposition"} →
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Remaining Posts */}
          {gridPosts.length > 0 && (
            <div className="post-grid">
              {gridPosts.map((post) => {
                const image = getFeaturedImage(post);
                const cats = getPostCategories(post);
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
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <time className="post-date">{formatDate(post.date)}</time>
                        {cats.length > 0 && (
                          <span className="category-pill" style={{ fontSize: "0.68rem", padding: "0.2rem 0.5rem" }}>
                            {cats[0].name}
                          </span>
                        )}
                      </div>
                      <h2
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p className="excerpt">{getExcerptText(post)}</p>
                      <span className="read-more">{t("common.readMore")} →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Cross-Ministry Exploration */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">{isKm ? "ធនធានបង្រៀនដទៃទៀត" : "More Ministry Resources"}</span>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)", margin: "0 0 1.5rem" }}>
            {isKm ? "ចូលទៅកាន់បណ្ណាល័យ និងវីដេអូបង្រៀន" : "Explore The Study Library & Video Archives"}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/library" className="btn btn-primary">
              {isKm ? "បណ្ណាល័យសៀវភៅ" : "Study Library & Books"}
            </Link>
            <Link href="/resource" className="btn btn-ghost">
              {isKm ? "វីដេអូ និងភាពយន្តដំណឹងល្អ" : "Video Archives"}
            </Link>
            <Link href="/gallery" className="btn btn-ghost">
              {isKm ? "វិចិត្រសាលរូបភាព" : "Photo Gallery"}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
