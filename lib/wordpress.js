const WP_SITE = process.env.WP_SITE || "hunchet.blog";
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
