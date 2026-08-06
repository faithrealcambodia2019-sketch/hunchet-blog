// English / Khmer strings for the site chrome and page copy.
// Articles keep whatever language they were published in.
import { useRouter } from "next/router";

export const LOCALES = [
  { code: "en", short: "EN", name: "English" },
  { code: "km", short: "ខ្មែរ", name: "ភាសាខ្មែរ" },
];

const strings = {
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.library": "Library",
    "nav.resource": "Resource",
    "nav.article": "Article",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "lang.switch": "Change language",

    "footer.tagline":
      "Sharing the Gospel through biblical encouragement, Christian teaching, prayer, and ministry content that points hearts to Jesus Christ.",
    "footer.explore": "Explore",
    "footer.getInTouch": "Get in Touch",
    "footer.topics": "Topics",
    "footer.sendMessage": "Send a message",
    "footer.rights": "All rights reserved.",

    "library.eyebrow": "Library",
    "library.title": "Books & Study Resources",
    "library.intro":
      "Free to read and download — written and gathered for anyone growing in faith, in Khmer and in English.",
    "library.readOnline": "Read online",
    "library.download": "Download",
    "library.back": "Library",
    "library.downloadPdf": "Download the PDF",
    "library.noInlinePdf":
      "Your browser can't display PDFs inline. You can still read this book by downloading it.",

    "resource.eyebrow": "Resource",
    "resource.title": "Watch & Read",
    "resource.intro":
      "The ten most-watched videos from True Friend Cambodia, plus devotionals, books and teaching.",
    "resource.mostWatched": "Most watched",
    "resource.from": "From",
    "resource.ranked": "on YouTube — ranked by views.",
    "resource.visitChannel": "Visit the channel",
    "resource.more": "More to explore",
    "resource.views": "views",
    "resource.play": "Play",
    "resource.explore": "Explore →",

    "card.articles": "Devotionals & Articles",
    "card.articlesDesc":
      "Reflections on faith, scripture, prayer, and everyday life.",
    "card.library": "Library",
    "card.libraryDesc":
      "Books, commentaries and study resources — read online or download.",
    "card.topics": "Browse by Topic",
    "card.topicsDesc":
      "Posts grouped by theme — faith, encouragement, church history, and more.",
    "card.contact": "Get in Touch",
    "card.contactDesc":
      "Prayer requests, questions, or an invitation to speak.",
  },

  km: {
    "nav.home": "ទំព័រដើម",
    "nav.gallery": "វិចិត្រសាល",
    "nav.library": "បណ្ណាល័យ",
    "nav.resource": "ធនធាន",
    "nav.article": "អត្ថបទ",
    "nav.about": "អំពីយើង",
    "nav.contact": "ទំនាក់ទំនង",
    "lang.switch": "ប្តូរភាសា",

    "footer.tagline":
      "ចែករំលែកដំណឹងល្អ តាមរយៈការលើកទឹកចិត្តតាមព្រះគម្ពីរ ការបង្រៀនគ្រីស្ទបរិស័ទ ការអធិស្ឋាន និងខ្លឹមសារបម្រើព្រះ ដែលនាំដួងចិត្តទៅរកព្រះយេស៊ូវគ្រីស្ទ។",
    "footer.explore": "រុករក",
    "footer.getInTouch": "ទំនាក់ទំនង",
    "footer.topics": "ប្រធានបទ",
    "footer.sendMessage": "ផ្ញើសារ",
    "footer.rights": "រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    "library.eyebrow": "បណ្ណាល័យ",
    "library.title": "សៀវភៅ និងធនធានសិក្សា",
    "library.intro":
      "អាចអាន និងទាញយកដោយឥតគិតថ្លៃ — សរសេរ និងប្រមូលសម្រាប់អ្នកដែលកំពុងលូតលាស់ក្នុងជំនឿ ទាំងជាភាសាខ្មែរ និងអង់គ្លេស។",
    "library.readOnline": "អានតាមអនឡាញ",
    "library.download": "ទាញយក",
    "library.back": "បណ្ណាល័យ",
    "library.downloadPdf": "ទាញយកឯកសារ PDF",
    "library.noInlinePdf":
      "កម្មវិធីរុករករបស់អ្នកមិនអាចបង្ហាញឯកសារ PDF ដោយផ្ទាល់បានទេ។ អ្នកនៅតែអាចអានសៀវភៅនេះបាន ដោយទាញយកវា។",

    "resource.eyebrow": "ធនធាន",
    "resource.title": "មើល និងអាន",
    "resource.intro":
      "វីដេអូដែលមានអ្នកមើលច្រើនជាងគេទាំង ១០ ពី True Friend Cambodia ព្រមទាំងអត្ថបទលើកទឹកចិត្ត សៀវភៅ និងការបង្រៀន។",
    "resource.mostWatched": "មើលច្រើនជាងគេ",
    "resource.from": "ពី",
    "resource.ranked": "នៅលើ YouTube — តម្រៀបតាមចំនួនអ្នកមើល។",
    "resource.visitChannel": "ទស្សនាឆានែល",
    "resource.more": "រុករកបន្ថែម",
    "resource.views": "ដងមើល",
    "resource.play": "បើកមើល",
    "resource.explore": "រុករក →",

    "card.articles": "អត្ថបទ និងសេចក្តីលើកទឹកចិត្ត",
    "card.articlesDesc":
      "ការឆ្លុះបញ្ចាំងអំពីជំនឿ ព្រះបន្ទូល ការអធិស្ឋាន និងជីវិតប្រចាំថ្ងៃ។",
    "card.library": "បណ្ណាល័យ",
    "card.libraryDesc":
      "សៀវភៅ អត្ថាធិប្បាយ និងធនធានសិក្សា — អានតាមអនឡាញ ឬទាញយក។",
    "card.topics": "រុករកតាមប្រធានបទ",
    "card.topicsDesc":
      "អត្ថបទចាត់តាមប្រធានបទ — ជំនឿ ការលើកទឹកចិត្ត ប្រវត្តិសាសនាចក្រ និងច្រើនទៀត។",
    "card.contact": "ទំនាក់ទំនង",
    "card.contactDesc":
      "សំណូមពរអធិស្ឋាន សំណួរ ឬការអញ្ជើញឱ្យធ្វើបទអធិប្បាយ។",
  },
};

// Returns a t(key) function for the locale the visitor is currently on.
// Missing Khmer keys fall back to English rather than showing a raw key.
export function useT() {
  const { locale } = useRouter();
  const table = strings[locale] || strings.en;
  return (key) => table[key] ?? strings.en[key] ?? key;
}

export function useLocale() {
  const { locale } = useRouter();
  return locale || "en";
}

// Picks the right half of a { en, km } pair on bilingual content records.
export function pick(value, locale) {
  if (value && typeof value === "object") {
    return value[locale] ?? value.en;
  }
  return value;
}
