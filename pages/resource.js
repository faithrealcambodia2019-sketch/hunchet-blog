import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { VIDEOS, CHANNEL_URL } from "../lib/videos";
import { useT, useLocale } from "../lib/i18n";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const resources = [
  {
    key: "articles",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
  },
  {
    key: "library",
    image: `${MEDIA}/2d610-11.jpg`,
    href: "/library",
  },
  {
    key: "topics",
    image: `${MEDIA}/66666-img_0549.jpeg`,
    href: "/categories",
  },
  {
    key: "contact",
    image: `${MEDIA}/6ff1d-img_0266.jpeg`,
    href: "/contact",
  },
];

function VideoCard({ video, rank, t, locale }) {
  const [playing, setPlaying] = useState(false);
  const heading = locale === "km" ? video.title : video.en;
  const sub = locale === "km" ? video.en : video.title;

  return (
    <li className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.en}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-play"
            onClick={() => setPlaying(true)}
            aria-label={`${t("resource.play")}: ${video.en}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              alt=""
              width="1280"
              height="720"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                }
              }}
            />
            <span className="video-rank">{rank}</span>
            <span className="video-play-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="video-body">
        <h3>{heading}</h3>
        <p className="video-sub">{sub}</p>
        <p className="video-meta">
          {video.views} {t("resource.views")}
        </p>
      </div>
    </li>
  );
}

export default function Resource() {
  const t = useT();
  const locale = useLocale();

  return (
    <>
      <Head>
        <title>{`${t("resource.eyebrow")} — Hun Chet`}</title>
        <meta name="description" content={t("resource.intro")} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("resource.eyebrow")}</span>
          <h1>{t("resource.title")}</h1>
          <p>{t("resource.intro")}</p>
        </div>
      </section>

      <main className="section video-section">
        <div className="container">
          <div className="section-head">
            <h2>{t("resource.mostWatched")}</h2>
            <p>
              {t("resource.from")}{" "}
              <a href={CHANNEL_URL} target="_blank" rel="noreferrer">
                True Friend Cambodia
              </a>{" "}
              {t("resource.ranked")}
            </p>
            <hr className="rule" />
          </div>

          <ul className="video-grid">
            {VIDEOS.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                rank={i + 1}
                t={t}
                locale={locale}
              />
            ))}
          </ul>

          <div className="video-cta">
            <a
              className="book-btn is-primary"
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t("resource.visitChannel")}
            </a>
          </div>
        </div>
      </main>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>{t("resource.more")}</h2>
            <hr className="rule" />
          </div>

          <div className="feature-grid">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="feature-card">
                <div className="feature-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" />
                </div>
                <div className="feature-card-body">
                  <h3>{t(`card.${r.key}`)}</h3>
                  <p>{t(`card.${r.key}Desc`)}</p>
                  <span className="feature-card-link">
                    {t("resource.explore")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
