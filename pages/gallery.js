import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { ALBUMS } from "../lib/media";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const albums = useMemo(
    () => (filter === "all" ? ALBUMS : ALBUMS.filter((a) => a.id === filter)),
    [filter]
  );

  // Flat, ordered list matching what is currently on screen, so the lightbox
  // arrows walk through exactly the photos the visitor can see.
  const flat = useMemo(
    () =>
      albums.flatMap((album) =>
        album.photos.map((photo) => ({
          ...photo,
          album: album.name,
          years: album.years,
        }))
      ),
    [albums]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % flat.length)),
    [flat.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i - 1 + flat.length) % flat.length
      ),
    [flat.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, close, next, prev]);

  const active = lightboxIndex === null ? null : flat[lightboxIndex];
  let running = 0;

  return (
    <>
      <Head>
        <title>Gallery — Hun Chet</title>
        <meta
          name="description"
          content="A visual record of ministry, worship, teaching and outreach — from Doung Preng New Hope Church to All Nations Church."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Photography</span>
          <h1>Gallery</h1>
          <p>
            More than a decade of worship, teaching, and service — captured
            along the way.
          </p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <p className="gallery-intro">
            Every photograph here comes from real ministry: Sunday services,
            classrooms, film sets, and the communities we have been sent to
            serve. Select an album, or click any photo to view it full size.
          </p>

          <div className="gallery-filters">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "filter-chip is-active" : "filter-chip"}
            >
              All
            </button>
            {ALBUMS.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => setFilter(album.id)}
                className={
                  filter === album.id ? "filter-chip is-active" : "filter-chip"
                }
              >
                {album.name}
              </button>
            ))}
          </div>

          {albums.map((album) => (
            <section className="album" key={album.id}>
              <div className="album-head">
                <h2>{album.name}</h2>
                <span className="album-years">{album.years}</span>
                <p className="album-note">{album.note}</p>
              </div>

              <div className="gallery-grid">
                {album.photos.map((photo) => {
                  const index = running;
                  running += 1;
                  return (
                    <button
                      type="button"
                      key={photo.src}
                      className={
                        photo.size === "wide"
                          ? "gallery-item is-wide"
                          : "gallery-item"
                      }
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Open photo: ${photo.caption}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.src} alt={photo.caption} loading="lazy" />
                      <span className="gallery-caption">{photo.caption}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button
            type="button"
            className="lb-btn lb-close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="lb-btn lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="lb-btn lb-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <figure
            className="lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.caption} />
            <figcaption className="lightbox-cap">
              {active.caption}
              <span className="lightbox-meta">
                {active.album} · {active.years}
              </span>
            </figcaption>
          </figure>

          <span className="lb-count">
            {lightboxIndex + 1} / {flat.length}
          </span>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
