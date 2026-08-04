import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
  getPosts,
  getFeaturedImage,
  getExcerptText,
  getPostCategories,
  formatDate,
} from "../lib/wordpress";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const HERO_IMAGE = `${MEDIA}/bb8f0-img_0633.jpeg`;

const BANDS = [
  {
    eyebrow: "Ministry",
    title: "Leading a community that grows in Christ",
    body:
      "Serving as Ministry Lead at All Nations Church — directing community outreach, Sunday services, and building a strong spiritual and digital presence for the church family.",
    image: `${MEDIA}/5d72f-img_0564.jpeg`,
    href: "/gallery",
    cta: "See the Gallery",
  },
  {
    eyebrow: "Teaching",
    title: "Scripture that speaks to everyday life",
    body:
      "Devotionals, biblical teaching, and honest reflection written in Khmer — on faith, prayer, forgiveness, mental health, and walking with God through real difficulty.",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
    cta: "Read Articles",
  },
  {
    eyebrow: "Outreach",
    title: "Faith put into action",
    body:
      "Taking the Gospel beyond Sunday through community service, local support initiatives, and hands-on ministry work across Cambodia.",
    image: `${MEDIA}/4262e-img_20251226_130309_154.jpeg`,
    href: "/about",
    cta: "About the Ministry",
  },
];

const FEATURES = [
  {
    title: "Gallery",
    desc: "Photos and milestones from ministry, worship, and community life.",
    image: `${MEDIA}/9fe4e-img_0972.jpeg`,
    href: "/gallery",
  },
  {
    title: "Resource",
    desc: "Guides, devotionals, and encouragement gathered in one place.",
    image: `${MEDIA}/6ff1d-img_0266.jpeg`,
    href: "/resource",
  },
  {
    title: "Article",
    desc: "Every reflection and teaching post, newest first.",
    image: `${MEDIA}/66666-img_0549.jpeg`,
    href: "/articles",
  },
];

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 3 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts, error }) {
  const description =
    "Biblical encouragement, Christian teaching, and ministry from Hun Chet — written in Khmer, shared with everyone.";

  return (
    <>
      <Head>
        <title>Hun Chet — Faith, Scripture &amp; Ministry</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Hun Chet — Faith &amp; Ministry" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={HERO_IMAGE} />
      </Head>

      <SiteHeader />

      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="" className="hero-img" />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <span className="eyebrow">Welcome to hunchet.blog</span>
          <h1>Encouragement and truth for every season of faith</h1>
          <p className="hero-sub">
            Biblical teaching, prayer, and honest reflection — written from the
            heart in Khmer, and shared here for anyone who needs hope.
          </p>
          <div className="hero-actions">
            <Link href="/articles" className="btn btn-light">
              Read Articles
            </Link>
            <Link href="/about" className="btn btn-outline-light">
              About Us
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">What we do</span>
              <h2>A ministry rooted in scripture and community</h2>
              <hr className="rule" />
            </div>

            {BANDS.map((band, i) => (
              <div
                key={band.title}
                className={i % 2 === 1 ? "band band-reverse" : "band"}
              >
                <div className="band-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={band.image} alt="" />
                </div>
                <div className="band-body">
                  <span className="eyebrow">{band.eyebrow}</span>
                  <h3>{band.title}</h3>
                  <p>{band.body}</p>
                  <Link href={band.href} className="btn btn-outline">
                    {band.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Latest</span>
              <h2>Recent Articles</h2>
              <p>New reflections on faith, scripture, and everyday life.</p>
              <hr className="rule" />
            </div>

            {error && (
              <p className="error">
                Couldn&apos;t load posts from WordPress: {error}
              </p>
            )}

            <div className="post-grid">
              {posts.map((post) => {
                const image = getFeaturedImage(post);
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
                      <time className="post-date">{formatDate(post.date)}</time>
                      {getPostCategories(post).length > 0 && (
                        <div className="category-pills">
                          {getPostCategories(post).map((cat) => (
                            <span key={cat.id} className="category-pill">
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                      <p className="excerpt">{getExcerptText(post)}</p>
                      <span className="read-more">Read more →</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/articles" className="btn btn-primary">
                View All Articles
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Explore</span>
              <h2>Find what you&apos;re looking for</h2>
              <hr className="rule" />
            </div>

            <div className="feature-grid">
              {FEATURES.map((f) => (
                <Link key={f.href} href={f.href} className="feature-card">
                  <div className="feature-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt="" />
                  </div>
                  <div className="feature-card-body">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                    <span className="feature-card-link">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-navy">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Connect</span>
              <h2>Questions, prayer requests, or just want to say hello?</h2>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>
                Reach out any time — by phone, Telegram, or Facebook.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Link href="/contact" className="btn btn-light">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
