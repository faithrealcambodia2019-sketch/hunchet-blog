// The library catalogue. PDFs are served from /public/books so readers never
// leave hunchet.blog — cover art is drawn from the ministry photography in
// lib/media.js rather than shipping separate artwork.
import { MEDIA } from "./media";

export const BOOKS = [
  {
    slug: "matthew-henry-commentary",
    title: "Matthew Henry's Bible Commentary",
    subtitle: "Concise commentary on the whole Bible",
    desc: "The classic verse-by-verse commentary, written in the early 1700s and still one of the most widely used study companions in the church today.",
    lang: "English",
    size: "14.7 MB",
    cover: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg?w=900`,
    file: "/books/eb84c-matthew-henrys-bible-commentary.pdf",
  },
  {
    slug: "matthew-henry-preface",
    title: "Preface to the First Volume",
    subtitle: "Matthew Henry's introduction",
    desc: "Matthew Henry's own introduction to the first volume of his commentary — how to come to Scripture with reverence, patience and understanding.",
    lang: "English",
    size: "0.7 MB",
    cover: `${MEDIA}/2d610-11.jpg?w=900`,
    file: "/books/efc37-mhc-preface-to-the-first-volume.pdf",
  },
  {
    slug: "khmer-english-dictionary",
    title: "Khmer–English Technical Dictionary",
    khmer: "វចនានុក្រម ខ្មែរ–អង់គ្លេស",
    subtitle: "Reference for study and translation",
    desc: "A reference dictionary of technical and theological terms, built for study and translation work between Khmer and English.",
    lang: "Khmer / English",
    size: "4.5 MB",
    cover: `${MEDIA}/3e85b-10.jpg?w=900`,
    file: "/books/7bcb1-finally-khmer-english-technical-dictionary.pdf",
  },
];

export function bookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) || null;
}
