import { Html, Head, Main, NextScript } from "next/document";
import { APPLE_ICON } from "../lib/media";

export default function Document() {
  return (
    <Html lang="km">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href={APPLE_ICON} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&family=Koh+Santepheap:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f2a5c" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
