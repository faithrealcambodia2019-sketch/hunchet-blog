import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { BOOKS, bookBySlug } from "../../lib/books";
import { useT, useLocale, pick } from "../../lib/i18n";

export async function getStaticPaths({ locales }) {
  const paths = [];
  BOOKS.forEach((b) => {
    (locales || ["en"]).forEach((locale) => {
      paths.push({ params: { slug: b.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { book: bookBySlug(params.slug) } };
}

export default function BookReader({ book }) {
  const t = useT();
  const locale = useLocale();
  const title = pick(book.title, locale);
  const desc = pick(book.desc, locale);

  return (
    <>
      <Head>
        <title>{`${title} — Hun Chet`}</title>
        <meta name="description" content={desc} />
      </Head>

      <SiteHeader />

      <main className="reader">
        <div className="container">
          <nav className="reader-crumbs">
            <Link href="/library">← {t("library.back")}</Link>
          </nav>

          <div className="reader-head">
            <div>
              <h1>{title}</h1>
              {book.khmer && locale !== "km" && (
                <p className="book-khmer">{book.khmer}</p>
              )}
              <span className="book-meta">
                {pick(book.lang, locale)} · PDF · {book.size}
              </span>
            </div>
            <a className="book-btn is-primary" href={book.file} download>
              {t("library.download")}
            </a>
          </div>

          <div className="reader-frame">
            <object data={book.file} type="application/pdf">
              <div className="reader-fallback">
                <p>{t("library.noInlinePdf")}</p>
                <a className="book-btn is-primary" href={book.file} download>
                  {t("library.downloadPdf")}
                </a>
              </div>
            </object>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
