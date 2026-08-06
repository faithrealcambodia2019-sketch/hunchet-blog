/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // English is served at the root so every existing URL keeps working.
  // Khmer lives under /km. localeDetection is off so a shared link always
  // opens in the language it was shared in.
  i18n: {
    locales: ["en", "km"],
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
