/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Khmer is served at the root (/) as the primary language across all pages.
  // English, Korean, and Simplified Chinese live under /en, /ko, and /zh.
  i18n: {
    locales: ["km", "en", "ko", "zh"],
    defaultLocale: "km",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "hunchet.blog" },
    ],
  },
};

module.exports = nextConfig;
