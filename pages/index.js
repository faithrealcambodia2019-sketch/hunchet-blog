import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useT } from "../lib/i18n";
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
    key: "ministry",
    image: `${MEDIA}/5d72f-img_0564.jpeg`,
    href: "/gallery",
  },
  {
    key: "teaching",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
  },
  {
    key: "outreach",
    image: `${MEDIA}/4262e-img_20251226_130309_154.jpeg`,
    href: "/about",
  },
];

const FEATURES = [
  { key: "gallery", image: `${MEDIA}/9fe4e-img_0972.jpeg`, href: "/gallery" },
  { key: "resource", image: `${MEDIA}/6ff1d-img_0266.jpeg`, href: "/resource" },
  { key: "article", image: `${MEDIA}/66666-img_0549.jpeg`, href: "/articles" },
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
  const t = useT();
  const description = t("home.sub");

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
          <span className="eyebrow">{t("home.eyebrow")}</span>
          <h1>{t("home.title")}</h1>
          <p className="hero-sub">{t("home.sub")}</p>
          <div className="hero-actions">
            <Link href="/articles" className="btn btn-light">
              {t("home.readArticles")}
            </Link>
            <Link href="/about" className="btn btn-outline-light">
              {t("home.aboutUs")}
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.whatWeDo")}</span>
              <h2>{t("home.whatWeDoTitle")}</h2>
              <hr className="rule" />
            </div>

            {BANDS.map((band, i) => (
              <div
                key={band.key}
                className={i % 2 === 1 ? "band band-reverse" : "band"}
              >
                <div className="band-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={band.image} alt="" />
                </div>
                <div className="band-body">
                  <span className="eyebrow">{t(`band.${band.key}`)}</span>
                  <h3>{t(`band.${band.key}Title`)}</h3>
                  <p>{t(`band.${band.key}Body`)}</p>
                  <Link href={band.href} className="btn btn-outline">
                    {t(`band.${band.key}Cta`)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.latest")}</span>
              <h2>{t("home.recent")}</h2>
              <p>{t("home.recentSub")}</p>
              <hr className="rule" />
            </div>

            {error && (
              <p className="error">
                {t("common.loadError")} {error}
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
                      <span className="read-more">{t("common.readMore")}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/articles" className="btn btn-primary">
                {t("home.viewAll")}
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.explore")}</span>
              <h2>{t("home.exploreTitle")}</h2>
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
                    <h3>{t(`feat.${f.key}`)}</h3>
                    <p>{t(`feat.${f.key}Desc`)}</p>
                    <span className="feature-card-link">
                      {t("common.explore")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-navy">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t("home.connect")}</span>
              <h2>{t("home.connectTitle")}</h2>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>
                {t("home.connectSub")}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Link href="/contact" className="btn btn-light">
                {t("home.getInTouch")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
