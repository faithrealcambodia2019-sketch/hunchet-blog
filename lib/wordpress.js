import { fallbackImageFor } from "./media";

const WP_SITE = process.env.WP_SITE || "hunchetblog.wordpress.com";
const API_BASE = `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}`;

async function wpFetch(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 }, // ISR-friendly if you switch to the App Router later
  });

  if (!res.ok) {
    throw new Error(`WordPress API request failed (${res.status}): ${path}`);
  }

  return res.json();
}

// Fetch a page of posts, embedding featured images/author/categories.
export async function getPosts({ page = 1, perPage = 10 } = {}) {
  return wpFetch(`/posts?_embed&page=${page}&per_page=${perPage}`);
}

// Fetch a single post by slug.
export async function getPostBySlug(slug) {
  const posts = await wpFetch(`/posts?_embed&slug=${encodeURIComponent(slug)}`);
  return posts[0] || null;
}

// Fetch all post slugs (used for static generation).
export async function getAllSlugs() {
  const posts = await wpFetch(`/posts?per_page=100&_fields=slug`);
  return posts.map((p) => p.slug);
}

// Featured image when WordPress has one; otherwise a stable ministry photo so
// no article card or article hero is ever left blank.
export function getFeaturedImage(post) {
  const featured = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (featured) return featured;
  return fallbackImageFor(post?.slug || post?.id);
}

// Some posts were pasted into WordPress with a raw CSS block sitting in front
// of the actual markup (instead of being wrapped in a <style> tag). WordPress
// also mangles "--" into an HTML dash entity inside that text, so the CSS
// can't be trusted or safely replayed. We strip that leading junk and rely on
// our own stylesheet (which targets the same class names the markup uses,
// e.g. .fyi-article-wrapper, .prayer-box, .scripture-card) to render it well.
export function cleanContentHtml(html) {
  if (!html) return "";
  let out = html;

  const wrapperIndex = out.indexOf("<div");
  if (wrapperIndex > 0) {
    const preamble = out.slice(0, wrapperIndex);
    const looksLikeCss = preamble.includes("{") && preamble.includes(":");
    if (looksLikeCss) {
      out = out.slice(wrapperIndex);
    }
  }

  // Some pages were built with a client-side <script> block that WordPress's
  // content filter stripped out, leaving the raw JS behind as plain visible
  // text at the end of the page. Cut the content off before that leaks in.
  const scriptMarkers = [
    "function renderApp(",
    "function renderLightbox(",
    "function bindEvents(",
    "document.getElementById(",
    "document.querySelectorAll(",
    "window.addEventListener(",
    "const galleryTriggers",
    "const lightbox =",
    "const state = {",
  ];
  let cutIndex = -1;
  for (const marker of scriptMarkers) {
    const idx = out.indexOf(marker);
    if (idx !== -1 && (cutIndex === -1 || idx < cutIndex)) cutIndex = idx;
  }
  if (cutIndex !== -1) {
    const safeCut = out.lastIndexOf("<", cutIndex);
    out = out.slice(0, safeCut > 0 ? safeCut : cutIndex);
  }

  // Strip duplicate legacy article-hero blocks embedded in WordPress HTML
  out = out.replace(/<section\b[^>]*class=["'][^"']*\barticle-hero\b[^"']*["'][\s\S]*?<\/section>/gi, "");

  // Strip duplicate author-bio blocks embedded in legacy WordPress content
  // so only the canonical, localized Next.js <AuthorCard /> is displayed.
  while (true) {
    const start = out.search(/<div[^>]*class=["'][^"']*\bauthor-bio\b[^"']*["']/i);
    if (start === -1) break;

    let depth = 0;
    const divRegex = /<\/?div\b[^>]*>/gi;
    divRegex.lastIndex = start;
    let m;
    let end = -1;
    while ((m = divRegex.exec(out)) !== null) {
      if (m[0].startsWith("</")) {
        depth--;
        if (depth === 0) {
          end = divRegex.lastIndex;
          break;
        }
      } else {
        depth++;
      }
    }

    if (end !== -1) {
      out = out.slice(0, start) + out.slice(end);
    } else {
      const fallbackEnd = out.indexOf("</div>", start);
      out = fallbackEnd !== -1 ? out.slice(0, start) + out.slice(fallbackEnd + 6) : out.slice(0, start);
      break;
    }
  }

  return out;
}

function decodeEntities(text) {
  return text
    .replace(/&#8211;/g, "-")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

// A clean, plain-text excerpt for post cards / meta descriptions, generated
// from the real content rather than WordPress's auto excerpt (which inherits
// the same leaked-CSS problem as above).
export function getExcerptText(post, maxLength = 160) {
  const html = cleanContentHtml(post.content?.rendered || "");
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// Authentic theological & sermon categories for Hun Chet Ministry
export const DEFAULT_CATEGORIES = [
  {
    id: 101,
    name: "ដំណឹងល្អ & សេចក្តីសង្គ្រោះ",
    nameEn: "Gospel & Salvation",
    nameKo: "복음과 구원",
    nameZh: "福音与救恩",
    slug: "salvation",
    description: "ការបង្រៀនអំពីព្រះគុណ សេចក្តីសង្គ្រោះ និងការប្រោសលោះក្នុងព្រះគ្រីស្ទ",
    count: 2,
  },
  {
    id: 102,
    name: "ជីវិតគ្រីស្ទបរិស័ទ",
    nameEn: "Christian Living",
    nameKo: "그리스도인의 삶",
    nameZh: "基督徒的生活",
    slug: "christian-living",
    description: "ការដើរតាមព្រះយេស៊ូវ ការរស់នៅប្រចាំថ្ងៃ និងការប្រុងប្រយ័ត្នក្នុងសង្គម",
    count: 3,
  },
  {
    id: 103,
    name: "ការអធិស្ឋាន & ជំនឿ",
    nameEn: "Prayer & Spiritual Life",
    nameKo: "기도와 신앙",
    nameZh: "祷告与信心",
    slug: "prayer",
    description: "ការស្វែងរកព្រះក្នុងគ្រាលំបាក ជីវិតអធិស្ឋាន និងការទុកចិត្តលើព្រះ",
    count: 1,
  },
  {
    id: 104,
    name: "គំរូនៃជំនឿ & បេសកកម្ម",
    nameEn: "Heroes of Faith & Missions",
    nameKo: "신앙의 위인과 선교",
    nameZh: "信心伟人与宣教",
    slug: "biography",
    description: "ជីវប្រវត្តិនៃអ្នកដើរតាមព្រះគ្រីស្ទ និងការលះបង់ដើម្បីដំណឹងល្អ",
    count: 2,
  },
  {
    id: 105,
    name: "ចរិតលក្ខណៈ & សីលធម៌",
    nameEn: "Character & Sanctification",
    nameKo: "성품과 성화",
    nameZh: "品格与成圣",
    slug: "character",
    description: "ការកែប្រែចិត្តគំនិត ការនិយាយស្តី និងភាពបរិសុទ្ធក្នុងជីវិត",
    count: 1,
  },
  {
    id: 106,
    name: "ការព្យាបាលចិត្ត & ការថែទាំ",
    nameEn: "Pastoral Care & Healing",
    nameKo: "치유와 돌봄",
    nameZh: "心灵医治与关怀",
    slug: "pastoral-care",
    description: "ការព្យាបាលរបួសផ្លូវចិត្ត ការលួងលោម និងការថែទាំខាងវិញ្ញាណ",
    count: 1,
  },
];

const POST_CATEGORY_MAP = {
  2398: [
    { id: 101, name: "ដំណឹងល្អ & សេចក្តីសង្គ្រោះ", slug: "salvation" },
    { id: 102, name: "ជីវិតគ្រីស្ទបរិស័ទ", slug: "christian-living" },
  ],
  2394: [
    { id: 105, name: "ចរិតលក្ខណៈ & សីលធម៌", slug: "character" },
    { id: 102, name: "ជីវិតគ្រីស្ទបរិស័ទ", slug: "christian-living" },
  ],
  2389: [
    { id: 102, name: "ជីវិតគ្រីស្ទបរិស័ទ", slug: "christian-living" },
  ],
  750: [
    { id: 104, name: "គំរូនៃជំនឿ & បេសកកម្ម", slug: "biography" },
  ],
  735: [
    { id: 104, name: "គំរូនៃជំនឿ & បេសកកម្ម", slug: "biography" },
  ],
  712: [
    { id: 103, name: "ការអធិស្ឋាន & ជំនឿ", slug: "prayer" },
  ],
  635: [
    { id: 101, name: "ដំណឹងល្អ & សេចក្តីសង្គ្រោះ", slug: "salvation" },
  ],
  2279: [
    { id: 106, name: "ការព្យាបាលចិត្ត & ការថែទាំ", slug: "pastoral-care" },
  ],
};

// Categories with at least one published post.
export async function getCategories() {
  try {
    const cats = await wpFetch(`/categories?per_page=100`);
    const valid = cats.filter((c) => c.count > 0 && c.slug !== "uncategorized");
    if (valid.length > 0) return valid;
  } catch (err) {
    // fallback to default categories
  }
  return DEFAULT_CATEGORIES;
}

export async function getCategoryBySlug(slug) {
  try {
    const cats = await wpFetch(`/categories?slug=${encodeURIComponent(slug)}`);
    if (cats && cats.length > 0 && cats[0].slug !== "uncategorized") {
      return cats[0];
    }
  } catch (err) {
    // fallback
  }
  return DEFAULT_CATEGORIES.find((c) => c.slug === slug) || null;
}

export async function getPostsByCategory(categoryId, { page = 1, perPage = 20 } = {}) {
  try {
    const posts = await wpFetch(`/posts?_embed&categories=${categoryId}&page=${page}&per_page=${perPage}`);
    if (posts && posts.length > 0) return posts;
  } catch (err) {
    // fallback
  }

  // If numeric category matches our DEFAULT_CATEGORIES, filter from all posts
  const allPosts = await getPosts({ perPage: 50 });
  return allPosts.filter((post) => {
    const cats = getPostCategories(post);
    return cats.some((c) => c.id === categoryId || c.slug === categoryId);
  });
}

// Real (non-"Uncategorized") categories attached to a post, from the _embed data,
// with graceful fallback to thematic mapping when WordPress has only "uncategorized".
export function getPostCategories(post) {
  const terms = post?._embedded?.["wp:term"]?.[0] || [];
  const realTerms = terms.filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
  if (realTerms.length > 0) return realTerms;

  // Check fallback mapping by ID or slug
  const idMap = POST_CATEGORY_MAP[post?.id];
  if (idMap) return idMap;

  const slug = post?.slug || "";
  if (slug.includes("eric-liddell") || slug.includes("735")) {
    return [{ id: 104, name: "គំរូនៃជំនឿ & បេសកកម្ម", slug: "biography" }];
  }
  if (slug.includes("សេចក្តីសង្គ្រោះ") || slug.includes("%e1%9e%9f%e1%9f%81%e1%9e%85%e1%9e%80%e1%9f%92%e1%9e%8f%e1%9e%b8")) {
    return [{ id: 101, name: "ដំណឹងល្អ & សេចក្តីសង្គ្រោះ", slug: "salvation" }];
  }
  if (slug.includes("អធិស្ឋាន") || slug.includes("%e1%9e%a2%e1%9e%92%e1%9e%b7%e1%9e%9f%e1%9f%92%e1%9e%8b")) {
    return [{ id: 103, name: "ការអធិស្ឋាន & ជំនឿ", slug: "prayer" }];
  }
  if (slug.includes("និយាយដើម") || slug.includes("%e1%9e%93%e1%9e%b7%e1%9e%99%e1%9e%b6%e1%9e%99")) {
    return [{ id: 105, name: "ចរិតលក្ខណៈ & សីលធម៌", slug: "character" }];
  }
  if (slug.includes("បណ្តាញសង្គម") || slug.includes("%e1%9e%94%e1%9e%8e%e1%9f%92%e1%9e%8a%e1%9e%b6%e1%9e%89")) {
    return [{ id: 102, name: "ជីវិតគ្រីស្ទបរិស័ទ", slug: "christian-living" }];
  }
  if (slug === "blog" || slug.includes("trauma")) {
    return [{ id: 106, name: "ការព្យាបាលចិត្ត & ការថែទាំ", slug: "pastoral-care" }];
  }

  return [{ id: 102, name: "ជីវិតគ្រីស្ទបរិស័ទ", slug: "christian-living" }];
}

// WordPress "Pages" (as opposed to blog posts) — About, Contact, and the many
// other static pages that live on the WordPress.com site.
export async function getPages() {
  return wpFetch(`/pages?per_page=100&status=publish`);
}

export async function getAllPageSlugs() {
  const pages = await wpFetch(`/pages?per_page=100&status=publish&_fields=slug`);
  return pages.map((p) => p.slug);
}

export async function getPageBySlug(slug) {
  const pages = await wpFetch(
    `/pages?status=publish&slug=${encodeURIComponent(slug)}`
  );
  return pages[0] || null;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
