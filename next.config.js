/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // English is served at the root so every existing URL keeps working.
  // Khmer, Korean and Simplified Chinese live under /km, /ko and /zh.
  // localeDetection is off so a shared link always opens in the language
  // it was shared in.
  i18n: {
    locales: ["en", "km", "ko", "zh"],
    defaultLocale: "en",
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
