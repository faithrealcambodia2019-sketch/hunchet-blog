// The library catalogue. PDFs are served from /public/books so readers never
// leave hunchet.blog — cover art is drawn from the ministry photography in
// lib/media.js rather than shipping separate artwork.
// Text fields are { en, km, ko, zh } pairs; use pick() from lib/i18n.
import { MEDIA } from "./media";

export const BOOKS = [
  {
    slug: "matthew-henry-commentary",
    title: {
      en: "Matthew Henry's Bible Commentary",
      km: "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី",
      ko: "매튜 헨리 성경 주석",
      zh: "马太亨利圣经注释",
    },
    subtitle: {
      en: "Concise commentary on the whole Bible",
      km: "អត្ថាធិប្បាយសង្ខេបលើព្រះគម្ពីរទាំងមូល",
      ko: "성경 전체에 대한 간추린 주석",
      zh: "全本圣经的简明注释",
    },
    desc: {
      en: "The classic verse-by-verse commentary, written in the early 1700s and still one of the most widely used study companions in the church today.",
      km: "អត្ថាធិប្បាយបែបខម្តងមួយៗដ៏ល្បីល្បាញ ដែលបានសរសេរនៅដើមសតវត្សទី១៨ ហើយនៅតែជាសៀវភៅជំនួយសិក្សាដ៏ពេញនិយមបំផុតក្នុងសាសនាចក្រសព្វថ្ងៃ។",
      ko: "1700년대 초에 쓰인 고전적인 절별 주석으로, 오늘날까지 교회에서 가장 널리 쓰이는 성경 공부 길잡이 가운데 하나입니다.",
      zh: "写于十八世纪初的经典逐节注释，至今仍是教会中最广泛使用的查经参考之一。",
    },
    lang: { en: "English", km: "អង់គ្លេស", ko: "영어", zh: "英语" },
    size: "14.7 MB",
    cover: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg?w=900`,
    file: "/books/eb84c-matthew-henrys-bible-commentary.pdf",
  },
  {
    slug: "matthew-henry-preface",
    title: {
      en: "Preface to the First Volume",
      km: "បុព្វកថាសម្រាប់ភាគទី១",
      ko: "제1권 서문",
      zh: "第一卷序言",
    },
    subtitle: {
      en: "Matthew Henry's introduction",
      km: "សេចក្តីផ្តើមដោយ ម៉ាថាយ ហេនរី",
      ko: "매튜 헨리의 머리말",
      zh: "马太亨利的引言",
    },
    desc: {
      en: "Matthew Henry's own introduction to the first volume of his commentary — how to come to Scripture with reverence, patience and understanding.",
      km: "សេចក្តីផ្តើមរបស់ ម៉ាថាយ ហេនរី សម្រាប់ភាគទី១ នៃអត្ថាធិប្បាយរបស់លោក — អំពីរបៀបចូលមកឯព្រះបន្ទូល ដោយការគោរព ការអត់ធ្មត់ និងការយល់ដឹង។",
      ko: "매튜 헨리가 자신의 주석 제1권에 붙인 머리말 — 경외함과 인내, 이해를 가지고 말씀 앞에 나아가는 법.",
      zh: "马太亨利为其注释第一卷所写的引言 —— 如何带着敬畏、耐心与领悟来到圣经面前。",
    },
    lang: { en: "English", km: "អង់គ្លេស", ko: "영어", zh: "英语" },
    size: "0.7 MB",
    cover: `${MEDIA}/2d610-11.jpg?w=900`,
    file: "/books/efc37-mhc-preface-to-the-first-volume.pdf",
  },
  {
    slug: "khmer-english-dictionary",
    title: {
      en: "Khmer–English Technical Dictionary",
      km: "វចនានុក្រមបច្ចេកទេស ខ្មែរ–អង់គ្លេស",
      ko: "크메르어–영어 전문 용어 사전",
      zh: "高棉语–英语专业词典",
    },
    khmer: "វចនានុក្រម ខ្មែរ–អង់គ្លេស",
    subtitle: {
      en: "Reference for study and translation",
      km: "ឯកសារយោងសម្រាប់ការសិក្សា និងការបកប្រែ",
      ko: "학습과 번역을 위한 참고 자료",
      zh: "供学习与翻译使用的参考书",
    },
    desc: {
      en: "A reference dictionary of technical and theological terms, built for study and translation work between Khmer and English.",
      km: "វចនានុក្រមយោងនៃពាក្យបច្ចេកទេស និងទេវវិទ្យា សម្រាប់ការសិក្សា និងការងារបកប្រែរវាងភាសាខ្មែរ និងអង់គ្លេស។",
      ko: "크메르어와 영어 사이의 학습과 번역 작업을 위해 만들어진 전문 용어 및 신학 용어 사전입니다.",
      zh: "收录专业与神学术语的参考词典，专为高棉语与英语之间的学习和翻译工作而编。",
    },
    lang: {
      en: "Khmer / English",
      km: "ខ្មែរ / អង់គ្លេស",
      ko: "크메르어 / 영어",
      zh: "高棉语 / 英语",
    },
    size: "4.5 MB",
    cover: `${MEDIA}/3e85b-10.jpg?w=900`,
    file: "/books/7bcb1-finally-khmer-english-technical-dictionary.pdf",
  },
];

export function bookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) || null;
}
