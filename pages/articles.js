import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
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

  return (
    <>
      <Head>
        <title>{`${t("articles.title")} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}`}</title>
        <meta name="description" content={t("articles.intro")} />
      </Head>

      <SiteHeader />

      {/* 1. ONE CHURCH HERO */}
      <SubpageHero
        eyebrow={isKm ? "អត្ថបទ និងការបង្រៀនព្រះគម្ពីរ" : "Biblical Articles & Exegesis"}
        title={t("articles.title")}
        subtitle={
          isKm
            ? "ការពន្យល់ព្រះគម្ពីរ ការបង្រៀនព្រះបន្ទូល និងការបណ្តុះបណ្តាលជីវិតគ្រីស្ទបរិស័ទជាភាសាខ្មែរ ដោយលោកគ្រូ ហ៊ុន ចិត្ត។"
            : "Biblical exegesis, practical Christian living, and theological writings by Leader Hun Chet."
        }
        bgImage="/images/sermon-purpose-congregation.jpg"
        stats={[
          { num: `${posts.length}+`, label: isKm ? "អត្ថបទទាំងអស់" : "Articles" },
          { num: "Weekly", label: isKm ? "បច្ចុប្បន្នភាព" : "Cadence" },
          { num: "1954", label: isKm ? "ព្រះគម្ពីរខ្មែរ" : "Scripture" },
        ]}
      />

      {/* 2. FILTER & SEARCH BAR (One Church Clean Minimalist) */}
      <div className="bg-white border-b border-[#dcdfda] sticky top-[88px] z-30 py-4 shadow-xs">
        <div className="oc-section py-0 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeCategory === "all"
                  ? "bg-[#141716] text-white border-[#141716]"
                  : "bg-white text-[#626868] border-[#dcdfda] hover:border-[#141716]"
              }`}
            >
              {isKm ? "ទាំងអស់" : "All"} ({posts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat.slug
                    ? "bg-[#141716] text-white border-[#141716]"
                    : "bg-white text-[#626868] border-[#dcdfda] hover:border-[#141716]"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <SearchIcon className="w-4 h-4 text-[#626868] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={isKm ? "ស្វែងរកអត្ថបទ ឬប្រធានបទ..." : "Search articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#dcdfda] text-xs focus:outline-none focus:border-[#141716] bg-[#fcfbf9]"
            />
          </div>
        </div>
      </div>

      {/* 3. ARTICLES DIRECTORY */}
      <main className="oc-section">
        {error && (
          <p style={{ textAlign: "center", color: "#dc2626", padding: "2rem" }}>
            {t("common.loadError")} {error}
          </p>
        )}

        {!error && filteredPosts.length === 0 && (
          <div className="text-center py-24 bg-white border border-[#dcdfda] p-8 max-w-lg mx-auto">
            <p className="text-stone-600 mb-4">
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
              <span>{isKm ? "កំណត់ឡើងវិញ" : "Clear Filters"}</span>
            </button>
          </div>
        )}

        {/* 3-Column One Church Card Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const image = getFeaturedImage(post);
              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="oc-card group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 border-b border-[#dcdfda]">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#141716] flex items-center justify-center text-white text-3xl font-bold">
                        H
                      </div>
                    )}
                  </div>
                  <div className="oc-card-body">
                    <span className="text-xs font-bold text-[#1c5080] tracking-[0.16em] uppercase block mb-2">
                      {formatDate(post.date)}
                    </span>
                    <h3
                      className="oc-card-title group-hover:text-[#1c5080] transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="oc-card-sub line-clamp-3">
                      {getExcerptText(post)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#141716] group-hover:text-[#1c5080] pt-2 border-t border-[#dcdfda]">
                      <span>{isKm ? "អានអត្ថបទពេញលេញ" : "Read Full Article"}</span>
                      <ArrowRightIcon style={{ width: 12, height: 12 }} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* 4. ONE CHURCH CONNECT BANNER */}
      <ConnectBanner />

      <SiteFooter />
    </>
  );
}
