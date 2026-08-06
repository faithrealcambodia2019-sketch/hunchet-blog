// The library catalogue. PDFs are served from /public/books so readers never
// leave hunchet.blog — cover art is drawn from the ministry photography in
// lib/media.js rather than shipping separate artwork.
// Text fields are { en, km } pairs; use pick() from lib/i18n.
import { MEDIA } from "./media";

export const BOOKS = [
  {
    slug: "matthew-henry-commentary",
    title: {
      en: "Matthew Henry's Bible Commentary",
      km: "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី",
    },
    subtitle: {
      en: "Concise commentary on the whole Bible",
      km: "អត្ថាធិប្បាយសង្ខេបលើព្រះគម្ពីរទាំងមូល",
    },
    desc: {
      en: "The classic verse-by-verse commentary, written in the early 1700s and still one of the most widely used study companions in the church today.",
      km: "អត្ថាធិប្បាយបែបខម្តងមួយៗដ៏ល្បីល្បាញ ដែលបានសរសេរនៅដើមសតវត្សទី១៨ ហើយនៅតែជាសៀវភៅជំនួយសិក្សាដ៏ពេញនិយមបំផុតក្នុងសាសនាចក្រសព្វថ្ងៃ។",
    },
    lang: { en: "English", km: "អង់គ្លេស" },
    size: "14.7 MB",
    cover: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg?w=900`,
    file: "/books/eb84c-matthew-henrys-bible-commentary.pdf",
  },
  {
    slug: "matthew-henry-preface",
    title: {
      en: "Preface to the First Volume",
      km: "បុព្វកថាសម្រាប់ភាគទី១",
    },
    subtitle: {
      en: "Matthew Henry's introduction",
      km: "សេចក្តីផ្តើមដោយ ម៉ាថាយ ហេនរី",
    },
    desc: {
      en: "Matthew Henry's own introduction to the first volume of his commentary — how to come to Scripture with reverence, patience and understanding.",
      km: "សេចក្តីផ្តើមរបស់ ម៉ាថាយ ហេនរី សម្រាប់ភាគទី១ នៃអត្ថាធិប្បាយរបស់លោក — អំពីរបៀបចូលមកឯព្រះបន្ទូល ដោយការគោរព ការអត់ធ្មត់ និងការយល់ដឹង។",
    },
    lang: { en: "English", km: "អង់គ្លេស" },
    size: "0.7 MB",
    cover: `${MEDIA}/2d610-11.jpg?w=900`,
    file: "/books/efc37-mhc-preface-to-the-first-volume.pdf",
  },
  {
    slug: "khmer-english-dictionary",
    title: {
      en: "Khmer–English Technical Dictionary",
      km: "វចនានុក្រមបច្ចេកទេស ខ្មែរ–អង់គ្លេស",
    },
    khmer: "វចនានុក្រម ខ្មែរ–អង់គ្លេស",
    subtitle: {
      en: "Reference for study and translation",
      km: "ឯកសារយោងសម្រាប់ការសិក្សា និងការបកប្រែ",
    },
    desc: {
      en: "A reference dictionary of technical and theological terms, built for study and translation work between Khmer and English.",
      km: "វចនានុក្រមយោងនៃពាក្យបច្ចេកទេស និងទេវវិទ្យា សម្រាប់ការសិក្សា និងការងារបកប្រែរវាងភាសាខ្មែរ និងអង់គ្លេស។",
    },
    lang: { en: "Khmer / English", km: "ខ្មែរ / អង់គ្លេស" },
    size: "4.5 MB",
    cover: `${MEDIA}/3e85b-10.jpg?w=900`,
    file: "/books/7bcb1-finally-khmer-english-technical-dictionary.pdf",
  },
];

export function bookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) || null;
}
