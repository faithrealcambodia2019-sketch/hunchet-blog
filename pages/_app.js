import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/extra.css";
import "../styles/library.css";
import "../styles/video.css";
import "../styles/motion.css";

// Elements that fade + rise into view as you scroll. Listed here rather than
// tagged in every page so the pages stay clean markup.
const REVEAL = [
  ".section-head",
  ".band",
  ".post-card",
  ".feature-card",
  ".value-card",
  ".category-card",
  ".book-card",
  ".video-card",
  ".tl-item",
  ".gallery-item",
  ".author-bio",
  ".album-head",
  ".stat-row > div",
  ".post-page > .post-content",
].join(",");

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Subtle shadow under the sticky header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-run per route so client-side navigations animate too.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(REVEAL));
    if (!els.length) return undefined;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    els.forEach((el, i) => {
      el.classList.add("reveal");
      // Stagger items within a row/grid, then reset so long lists don't drift.
      el.style.setProperty("--d", `${(i % 6) * 80}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [router.asPath]);

  return <Component {...pageProps} />;
}
