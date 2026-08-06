import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BOOKS } from "../lib/books";
import { useT, useLocale, pick } from "../lib/i18n";

export default function Library() {
  const t = useT();
  const locale = useLocale();

  return (
    <>
      <Head>
        <title>{`${t("library.eyebrow")} — Hun Chet`}</title>
        <meta name="description" content={t("library.intro")} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("library.eyebrow")}</span>
          <h1>{t("library.title")}</h1>
          <p>{t("library.intro")}</p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <ul className="book-grid">
            {BOOKS.map((book) => {
              const title = pick(book.title, locale);
              const href = `/library/${book.slug}`;

              return (
                <li key={book.slug} className="book-card">
                  <Link href={href} className="book-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.cover} alt="" loading="lazy" />
                    <span className="book-badge">PDF</span>
                    <span className="book-cover-text">
                      <span className="book-cover-title">{title}</span>
                      <span className="book-cover-sub">
                        {pick(book.subtitle, locale)}
                      </span>
                    </span>
                  </Link>

                  <div className="book-body">
                    <h3>
                      <Link href={href}>{title}</Link>
                    </h3>
                    {book.khmer && locale !== "km" && (
                      <p className="book-khmer">{book.khmer}</p>
                    )}
                    <p className="book-desc">{pick(book.desc, locale)}</p>
                    <span className="book-meta">
                      {pick(book.lang, locale)} · {book.size}
                    </span>
                  </div>

                  <div className="book-actions">
                    <Link href={href} className="book-btn is-primary">
                      {t("library.readOnline")}
                    </Link>
                    <a className="book-btn" href={book.file} download>
                      {t("library.download")}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
