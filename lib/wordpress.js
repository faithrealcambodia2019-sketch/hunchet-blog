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

export function getFeaturedImage(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
  );
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

// Categories with at least one published post.
export async function getCategories() {
  const cats = await wpFetch(`/categories?per_page=100`);
  return cats.filter((c) => c.count > 0 && c.slug !== "uncategorized");
}

export async function getCategoryBySlug(slug) {
  const cats = await wpFetch(`/categories?slug=${encodeURIComponent(slug)}`);
  return cats[0] || null;
}

export async function getPostsByCategory(categoryId, { page = 1, perPage = 20 } = {}) {
  return wpFetch(`/posts?_embed&categories=${categoryId}&page=${page}&per_page=${perPage}`);
}

// Real (non-"Uncategorized") categories attached to a post, from the _embed data.
export function getPostCategories(post) {
  const terms = post?._embedded?.["wp:term"]?.[0] || [];
  return terms.filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
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
