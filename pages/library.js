import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.5 2H20a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A3.5 3.5 0 0 1 3 18.5v-13A3.5 3.5 0 0 1 6.5 2zM19 4H6.5A1.5 1.5 0 0 0 5 5.5v11.66c.46-.1.95-.16 1.5-.16H19V4zM6.5 19c-.83 0-1.5.67-1.5 1.5S5.67 22 6.5 22H19v-3H6.5z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1zM4 19a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

const books = [
  {
    title: "Foundation of Faith",
    khmer: "គ្រឹះនៃជំនឿ",
    desc: "A Khmer-language study on the foundations of Christian faith — who God is, what salvation means, and how to begin walking with Christ.",
    lang: "Khmer",
    file: `${MEDIA}/4f3f7-foundation-of-faithkhmer-edited.pdf`,
  },
  {
    title: "Matthew Henry's Bible Commentary",
    desc: "The classic verse-by-verse commentary on the whole Bible, written in the early 1700s and still one of the most widely used study companions.",
    lang: "English",
    file: `${MEDIA}/eb84c-matthew-henrys-bible-commentary.pdf`,
  },
  {
    title: "Preface to Matthew Henry's Commentary",
    desc: "Matthew Henry's own introduction to the first volume — how to read Scripture with reverence, patience, and understanding.",
    lang: "English",
    file: `${MEDIA}/efc37-mhc-preface-to-the-first-volume.pdf`,
  },
  {
    title: "Khmer–English Technical Dictionary",
    khmer: "វចនានុក្រម ខ្មែរ–អង់គ្លេស",
    desc: "A reference dictionary of technical and theological terms, for study and translation work between Khmer and English.",
    lang: "Khmer / English",
    file: `${MEDIA}/7bcb1-finally-khmer-english-technical-dictionary.pdf`,
  },
];

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
            {books.map((book) => (
              <li key={book.file} className="book-card">
                <span className="book-icon">
                  <BookIcon />
                </span>

                <div className="book-body">
                  <h3>{book.title}</h3>
                  {book.khmer && <p className="book-khmer">{book.khmer}</p>}
                  <p className="book-desc">{book.desc}</p>
                  <span className="book-meta">{book.lang} · PDF</span>
                </div>

                <div className="book-actions">
                  <a
                    className="book-btn is-primary"
                    href={book.file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read
                  </a>
                  <a className="book-btn" href={book.file} download>
                    <DownloadIcon />
                    <span>Download</span>
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
