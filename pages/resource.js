import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const resources = [
  {
    title: "Devotionals & Articles",
    desc: "Reflections on faith, scripture, prayer, and everyday life.",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
  },
  {
    title: "Browse by Topic",
    desc: "Posts grouped by theme — faith, encouragement, church history, and more.",
    image: `${MEDIA}/66666-img_0549.jpeg`,
    href: "/categories",
  },
  {
    title: "Photo Gallery",
    desc: "Ministry moments, worship, outreach, and community milestones.",
    image: `${MEDIA}/9fe4e-img_0972.jpeg`,
    href: "/gallery",
  },
  {
    title: "Get in Touch",
    desc: "Prayer requests, questions, or an invitation to speak.",
    image: `${MEDIA}/6ff1d-img_0266.jpeg`,
    href: "/contact",
  },
];

export default function Resource() {
  return (
    <>
      <Head>
        <title>Resource — Hun Chet</title>
        <meta
          name="description"
          content="Resources, guides, and encouragement from Hun Chet's ministry."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Library</span>
          <h1>Resource</h1>
          <p>A starting point for devotionals, teaching, and encouragement.</p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="feature-grid">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="feature-card">
                <div className="feature-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" />
                </div>
                <div className="feature-card-body">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <span className="feature-card-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
