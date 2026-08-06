import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { BOOKS, bookBySlug } from "../../lib/books";

export async function getStaticPaths() {
  return {
    paths: BOOKS.map((b) => ({ params: { slug: b.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { book: bookBySlug(params.slug) } };
}

export default function BookReader({ book }) {
  return (
    <>
      <Head>
        <title>{book.title} — Hun Chet</title>
        <meta name="description" content={book.desc} />
      </Head>

      <SiteHeader />

      <main className="reader">
        <div className="container">
          <nav className="reader-crumbs">
            <Link href="/library">← Library</Link>
          </nav>

          <div className="reader-head">
            <div>
              <h1>{book.title}</h1>
              {book.khmer && <p className="book-khmer">{book.khmer}</p>}
              <span className="book-meta">
                {book.lang} · PDF · {book.size}
              </span>
            </div>
            <a className="book-btn is-primary" href={book.file} download>
              Download
            </a>
          </div>

          <div className="reader-frame">
            <object data={book.file} type="application/pdf">
              <div className="reader-fallback">
                <p>
                  Your browser can&apos;t display PDFs inline. You can still
                  read this book by downloading it.
                </p>
                <a className="book-btn is-primary" href={book.file} download>
                  Download the PDF
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
