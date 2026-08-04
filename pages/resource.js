import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const resources = [
  {
    title: "Devotionals & Articles",
    desc: "Reflections on faith, scripture, and everyday life.",
    href: "/articles",
  },
  {
    title: "Browse by Topic",
    desc: "Find posts grouped by theme — faith, prayer, encouragement, and more.",
    href: "/categories",
  },
  {
    title: "Photo Gallery",
    desc: "A look back at ministry moments and milestones.",
    href: "/gallery",
  },
  {
    title: "Get in Touch",
    desc: "Prayer requests, questions, or just to say hello.",
    href: "/contact",
  },
];

export default function Resource() {
  return (
    <>
      <Head>
        <title>Resource — hunchet.blog</title>
        <meta
          name="description"
          content="Resources, guides, and encouragement from hunchet.blog."
        />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="page-header">
          <h1>Resource</h1>
          <p>A starting point for devotionals, teaching, and encouragement.</p>
        </section>

        <div className="category-grid">
          {resources.map((r) => (
            <Link key={r.href} href={r.href} className="category-card">
              <span className="category-card-name">{r.title}</span>
              <span className="category-card-count">{r.desc}</span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
