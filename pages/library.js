import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BOOKS } from "../lib/books";

export default function Library() {
  return (
    <>
      <Head>
        <title>Library — Hun Chet</title>
        <meta
          name="description"
          content="Free books, commentaries, and study resources from Hun Chet's ministry — read online or download."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Library</span>
          <h1>Books &amp; Study Resources</h1>
          <p>
            Free to read and download — written and gathered for anyone growing
            in faith, in Khmer and in English.
          </p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <ul className="book-grid">
            {BOOKS.map((book) => (
              <li key={book.slug} className="book-card">
                <Link href={`/library/${book.slug}`} className="book-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={book.cover} alt="" loading="lazy" />
                  <span className="book-badge">PDF</span>
                  <span className="book-cover-text">
                    <span className="book-cover-title">{book.title}</span>
                    <span className="book-cover-sub">{book.subtitle}</span>
                  </span>
                </Link>

                <div className="book-body">
                  <h3>
                    <Link href={`/library/${book.slug}`}>{book.title}</Link>
                  </h3>
                  {book.khmer && <p className="book-khmer">{book.khmer}</p>}
                  <p className="book-desc">{book.desc}</p>
                  <span className="book-meta">
                    {book.lang} · {book.size}
                  </span>
                </div>

                <div className="book-actions">
                  <Link
                    href={`/library/${book.slug}`}
                    className="book-btn is-primary"
                  >
                    Read online
                  </Link>
                  <a className="book-btn" href={book.file} download>
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
