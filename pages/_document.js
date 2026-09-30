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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Hanuman:wght@400;700;900&family=Inter:wght@400;500;600;700&family=Kantumruy+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Koh+Santepheap:wght@300;400;700;900&family=Moul&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#15477a" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
