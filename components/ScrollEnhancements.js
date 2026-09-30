import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

export default function ScrollEnhancements() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      setVisible(currentScroll > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <>
      {/* 1. Global Architectural Reading Progress Hairline */}
      <div
        className="reading-progress-bar"
        style={{
          transform: `scaleX(${scrollProgress})`,
        }}
        aria-hidden="true"
      />

      {/* 2. Floating Circular Back-To-Top Button with Radial Progress Ring */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top-btn ${visible ? "is-visible" : ""}`}
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <svg
          className="scroll-progress-ring"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* Background track circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="scroll-ring-track"
          />
          {/* Animated progress indicator circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="scroll-ring-fill"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <span className="scroll-btn-icon">
          <ArrowUpIcon style={{ width: 18, height: 18 }} />
        </span>
      </button>
    </>
  );
}
