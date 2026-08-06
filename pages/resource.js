import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { VIDEOS, CHANNEL_URL } from "../lib/videos";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const resources = [
  {
    title: "Devotionals & Articles",
    desc: "Reflections on faith, scripture, prayer, and everyday life.",
    image: `${MEDIA}/e5ee6-img_0270.jpeg`,
    href: "/articles",
  },
  {
    title: "Library",
    desc: "Books, commentaries and study resources — read online or download.",
    image: `${MEDIA}/2d610-11.jpg`,
    href: "/library",
  },
  {
    title: "Browse by Topic",
    desc: "Posts grouped by theme — faith, encouragement, church history, and more.",
    image: `${MEDIA}/66666-img_0549.jpeg`,
    href: "/categories",
  },
  {
    title: "Get in Touch",
    desc: "Prayer requests, questions, or an invitation to speak.",
    image: `${MEDIA}/6ff1d-img_0266.jpeg`,
    href: "/contact",
  },
];

function VideoCard({ video, rank }) {
  const [playing, setPlaying] = useState(false);

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
            aria-label={`Play ${video.en}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
            <span className="video-rank">{rank}</span>
            <span className="video-views">{video.views} views</span>
            <span className="video-play-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="video-body">
        <h3>{video.title}</h3>
        <p>{video.en}</p>
      </div>
    </li>
  );
}

export default function Resource() {
  return (
    <>
      <Head>
        <title>Resource — Hun Chet</title>
        <meta
          name="description"
          content="Watch the most-viewed videos from True Friend Cambodia, plus devotionals, books and teaching from Hun Chet's ministry."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Resource</span>
          <h1>Watch &amp; Read</h1>
          <p>
            The ten most-watched videos from True Friend Cambodia, plus
            devotionals, books and teaching.
          </p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="section-head">
            <h2>Most watched</h2>
            <p>
              From{" "}
              <a href={CHANNEL_URL} target="_blank" rel="noreferrer">
                True Friend Cambodia
              </a>{" "}
              on YouTube — ranked by views.
            </p>
          </div>

          <ul className="video-grid">
            {VIDEOS.map((video, i) => (
              <VideoCard key={video.id} video={video} rank={i + 1} />
            ))}
          </ul>

          <div className="video-cta">
            <a
              className="book-btn is-primary"
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
            >
              Visit the channel
            </a>
          </div>
        </div>
      </main>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>More to explore</h2>
          </div>

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
      </section>

      <SiteFooter />
    </>
  );
}
