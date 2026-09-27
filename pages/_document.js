import { Html, Head, Main, NextScript } from "next/document";
import { APPLE_ICON } from "../lib/media";

export default function Document(props) {
  // Follows the active locale so screen readers and Google get the right
  // language for the page they are actually on.
  const locale = props?.__NEXT_DATA__?.locale || "en";

  return (
    <Html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href={APPLE_ICON} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Suwannaphum:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0a192f" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
