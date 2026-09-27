// The library catalogue. PDFs are served from /public/books so readers never
// leave hunchet.blog — cover art is drawn from authentic church photography
// rather than shipping generic artwork.
// Text fields are { en, km, ko, zh } pairs; use pick() from lib/i18n.

export const BOOKS = [
  {
    slug: "matthew-henry-commentary",
    featured: true,
    title: {
      en: "Matthew Henry's Bible Commentary",
      km: "អត្ថាធិប្បាយព្រះគម្ពីរ ម៉ាថាយ ហេនរី",
      ko: "매튜 헨리 성경 주석",
      zh: "马太亨利圣经注释",
    },
    subtitle: {
      en: "Concise verse-by-verse commentary on the whole Bible",
      km: "អត្ថាធិប្បាយសង្ខេបខម្តងមួយៗលើព្រះគម្ពីរទាំងមូល",
      ko: "성경 전체에 대한 간추린 절별 주석",
      zh: "全本圣经的简明逐节注释",
    },
    author: {
      en: "Rev. Matthew Henry (1662–1714)",
      km: "លោកគ្រូគង្វាល ម៉ាថាយ ហេនរី (១៦៦២–១៧១៤)",
      ko: "매튜 헨리 목사 (1662–1714)",
      zh: "马太·亨利牧师 (1662–1714)",
    },
    category: "commentary",
    categoryLabel: {
      en: "Expository Commentary",
      km: "អត្ថាធិប្បាយព្រះគម្ពីរ",
      ko: "성경 강해 주석",
      zh: "圣经逐节注释",
    },
    edition: {
      en: "Complete Digital Study Archive",
      km: "បណ្ណសារឌីជីថលសម្រាប់ការសិក្សាពេញលេញ",
      ko: "디지털 통합 연구본",
      zh: "完整数字化研读版",
    },
    pages: "1,248 pages",
    desc: {
      en: "The classic verse-by-verse commentary, written in the early 1700s and still one of the most widely used study companions in the global church today.",
      km: "អត្ថាធិប្បាយបែបខម្តងមួយៗដ៏ល្បីល្បាញ ដែលបានសរសេរនៅដើមសតវត្សទី១៨ ហើយនៅតែជាសៀវភៅជំនួយសិក្សាដ៏ពេញនិយមបំផុតក្នុងសាសនាចក្រសព្វថ្ងៃ។",
      ko: "1700년대 초에 쓰인 고전적인 절별 주석으로, 오늘날까지 교회에서 가장 널리 쓰이는 성경 공부 길잡이 가운데 하나입니다.",
      zh: "写于十八世纪初的经典逐节注释，至今仍是教会中最广泛使用的查经参考之一。",
    },
    lang: { en: "English", km: "អង់គ្លេស", ko: "영어", zh: "英语" },
    langCode: "en",
    size: "14.7 MB",
    cover: "/images/bible-class-grade12-teaching.jpg",
    file: "/books/eb84c-matthew-henrys-bible-commentary.pdf",
    highlights: [
      {
        en: "Systematic verse-by-verse exposition spanning both Old and New Testaments.",
        km: "ការពន្យល់ជាប្រព័ន្ធខម្តងមួយៗ គ្របដណ្តប់ទាំងគម្ពីរសញ្ញាចាស់ និងសញ្ញាថ្មី។",
      },
      {
        en: "Profound devotional warmth designed for pastoral pulpit preparation and daily Christian prayer.",
        km: "ជម្រៅនៃការរំពឹងគិតដ៏កក់ក្តៅ សម្រាប់ការរៀបចំធម្មទេសនារបស់គ្រូគង្វាល និងការអធិស្ឋានប្រចាំថ្ងៃ។",
      },
      {
        en: "Enduring Puritan heritage emphasizing holy living, humble repentance, and faith in Jesus Christ.",
        km: "កេរ្តិ៍ដំណែលទេវវិទ្យាដ៏ស្ថិតស្ថេរ ដែលសង្កត់ធ្ងន់លើជីវិតបរិសុទ្ធ ការប្រែចិត្តដោយបន្ទាបខ្លួន និងជំនឿលើព្រះយេស៊ូវគ្រីស្ទ។",
      },
    ],
    tableOfContents: [
      {
        section: "01",
        title: { en: "The Pentateuch: Genesis through Deuteronomy", km: "គម្ពីរទាំងប្រាំរបស់លោកម៉ូសេ៖ លោកុប្បត្តិ ដល់ ចោទិយកថា" },
        pages: "p. 1 – 280",
      },
      {
        section: "02",
        title: { en: "The Historical Books: Joshua to Esther", km: "គម្ពីរប្រវត្តិសាស្ត្រ៖ យ៉ូស្វេ ដល់ អេសធើរ" },
        pages: "p. 281 – 540",
      },
      {
        section: "03",
        title: { en: "Poetical Books: Job, Psalms, Proverbs, Ecclesiastes", km: "គម្ពីរកាព្យ៖ យ៉ូប ទំនុកដំកើង សុភាសិត និងសាឡូម៉ូន" },
        pages: "p. 541 – 790",
      },
      {
        section: "04",
        title: { en: "The Major & Minor Prophets: Isaiah through Malachi", km: "គម្ពីរព្យាការីធំ និងតូច៖ អេសាយ ដល់ ម៉ាឡាគី" },
        pages: "p. 791 – 980",
      },
      {
        section: "05",
        title: { en: "The Four Gospels & Acts of the Apostles", km: "ដំណឹងល្អទាំងបួន និងកិច្ចការរបស់ពួកសាវក" },
        pages: "p. 981 – 1140",
      },
      {
        section: "06",
        title: { en: "The Pauline Epistles, General Letters & Revelation", km: "សំបុត្ររបស់ប៉ុល សំបុត្រទូទៅ និងគម្ពីរវិវរណៈ" },
        pages: "p. 1141 – 1248",
      },
    ],
    historicalContext: {
      en: "Published between 1706 and 1714, Matthew Henry's commentary provides an unmatched synthesis of careful scholarship and deeply affectionate pastoral devotion.",
      km: "បានបោះពុម្ពផ្សាយរវាងឆ្នាំ ១៧០៦ និង ១៧១៤ អត្ថាធិប្បាយរបស់លោក ម៉ាថាយ ហេនរី ផ្តល់នូវការរួមបញ្ចូលគ្នាដ៏ល្អឥតខ្ចោះរវាងការស្រាវជ្រាវដ៏ម៉ត់ចត់ និងការស្រឡាញ់ថែរក្សាខាងវិញ្ញាណ។",
    },
  },
  {
    slug: "matthew-henry-preface",
    featured: false,
    title: {
      en: "Preface to the First Volume",
      km: "បុព្វកថាសម្រាប់ភាគទី១",
      ko: "제1권 서문",
      zh: "第一卷序言",
    },
    subtitle: {
      en: "Matthew Henry's introduction on approaching the Holy Word",
      km: "សេចក្តីផ្តើមរបស់ ម៉ាថាយ ហេនរី អំពីការចូលទៅកាន់ព្រះបន្ទូលបរិសុទ្ធ",
      ko: "말씀 연구에 대한 매튜 헨리의 머리말",
      zh: "马太亨利论圣经研读之引言",
    },
    author: {
      en: "Rev. Matthew Henry (1662–1714)",
      km: "លោកគ្រូគង្វាល ម៉ាថាយ ហេនរី (១៦៦២–១៧១៤)",
      ko: "매튜 헨리 목사 (1662–1714)",
      zh: "马太·亨利牧师 (1662–1714)",
    },
    category: "history",
    categoryLabel: {
      en: "Historical Theology",
      km: "ទេវវិទ្យាប្រវត្តិសាស្ត្រ",
      ko: "역사신학",
      zh: "历史神学",
    },
    edition: {
      en: "Introductory Theological Monograph",
      km: "ឯកសារទេវវិទ្យាសេចក្តីផ្តើម",
      ko: "신학 서문 단행본",
      zh: "神学序言专著",
    },
    pages: "48 pages",
    desc: {
      en: "Matthew Henry's own introduction to the first volume of his commentary — how to come to Scripture with reverence, patience, and true spiritual understanding.",
      km: "សេចក្តីផ្តើមរបស់ ម៉ាថាយ ហេនរី សម្រាប់ភាគទី១ នៃអត្ថាធិប្បាយរបស់លោក — អំពីរបៀបចូលមកឯព្រះបន្ទូល ដោយការគោរព ការអត់ធ្មត់ និងការយល់ដឹងខាងវិញ្ញាណពិតប្រាកដ។",
      ko: "매튜 헨리가 자신의 주석 제1권에 붙인 머리말 — 경외함과 인내, 참된 영적 이해를 가지고 말씀 앞에 나아가는 법.",
      zh: "马太亨利为其注释第一卷所写的引言 —— 如何带着敬畏、耐心与属灵的领悟来到圣经面前。",
    },
    lang: { en: "English", km: "អង់គ្លេស", ko: "영어", zh: "英语" },
    langCode: "en",
    size: "0.7 MB",
    cover: "/images/one-to-one-disciple-prayer.jpg",
    file: "/books/efc37-mhc-preface-to-the-first-volume.pdf",
    highlights: [
      {
        en: "Foundational dispositions of the human heart necessary for receiving divine truth.",
        km: "ចិត្តគំនិតជាគ្រឹះនៃមនុស្ស ដែលចាំបាច់សម្រាប់ការទទួលសេចក្តីពិតរបស់ព្រះ។",
      },
      {
        en: "How to unite systematic reading with humble, unceasing prayer.",
        km: "របៀបរួមបញ្ចូលការអានជាប្រព័ន្ធ ជាមួយការអធិស្ឋានឥតឈប់ឈរដោយបន្ទាបខ្លួន។",
      },
      {
        en: "The historic Reformed view of the authority and sufficiency of the Bible.",
        km: "ទស្សនៈប្រវត្តិសាស្ត្រអំពីអំណាច និងភាពគ្រប់គ្រាន់នៃព្រះគម្ពីរ។",
      },
    ],
    tableOfContents: [
      {
        section: "01",
        title: { en: "The Unsurpassed Excellence and Majesty of Scripture", km: "ឧត្តមភាព និងភាពរុងរឿងដ៏ឥតខ្ចោះនៃព្រះគម្ពីរ" },
        pages: "p. 1 – 12",
      },
      {
        section: "02",
        title: { en: "The Spiritual Posture Required in the Student of the Word", km: "ឥរិយាបថខាងវិញ្ញាណដែលតម្រូវឱ្យមានក្នុងអ្នកសិក្សាព្រះបន្ទូល" },
        pages: "p. 13 – 24",
      },
      {
        section: "03",
        title: { en: "Practical Guidelines for Systematic Biblical Meditation", km: "ការណែនាំជាក់ស្តែងសម្រាប់ការរំពឹងគិតព្រះគម្ពីរជាប្រព័ន្ធ" },
        pages: "p. 25 – 36",
      },
      {
        section: "04",
        title: { en: "A Concluding Exhortation & Pastoral Benediction", km: "ការដាស់តឿនសរុប និងការប្រសិទ្ធពររបស់គ្រូគង្វាល" },
        pages: "p. 37 – 48",
      },
    ],
    historicalContext: {
      en: "Written from Chester, England, this preface served as Henry's solemn opening testament before setting out on the life-defining task of annotating the entire Bible.",
      km: "បានសរសេរចេញពីទីក្រុង Chester ប្រទេសអង់គ្លេស បុព្វកថានេះបានបម្រើជាសក្ខីភាពដ៏មុតមាំរបស់ Henry មុនពេលចាប់ផ្តើមកិច្ចការដ៏ធំបំផុតក្នុងជីវិតរបស់លោក។",
    },
  },
  {
    slug: "khmer-english-dictionary",
    featured: false,
    title: {
      en: "Khmer–English Technical Dictionary",
      km: "វចនានុក្រមបច្ចេកទេស ខ្មែរ–អង់គ្លេស",
      ko: "크메르어–영어 전문 용어 사전",
      zh: "高棉语–英语专业词典",
    },
    khmer: "វចនានុក្រម ខ្មែរ–អង់គ្លេស",
    subtitle: {
      en: "Reference lexicon for biblical study, linguistics, and cross-cultural translation",
      km: "ឯកសារយោងសម្រាប់ការសិក្សាព្រះគម្ពីរ ភាសាវិទ្យា និងការបកប្រែឆ្លងវប្បធម៌",
      ko: "성경 연구 및 언어 번역을 위한 전문 어휘집",
      zh: "圣经研读、语言学与跨文化翻译参考词典",
    },
    author: {
      en: "Language & Translation Working Group",
      km: "ក្រុមការងារភាសា និងការបកប្រែ",
      ko: "언어 및 번역 연구팀",
      zh: "语言与翻译工作组",
    },
    category: "reference",
    categoryLabel: {
      en: "Linguistics & Reference",
      km: "ភាសា និងឯកសារយោង",
      ko: "언어학 및 참고 자료",
      zh: "语言学与参考资料",
    },
    edition: {
      en: "Bilingual Theological Reference Edition",
      km: "ការបោះពុម្ពយោងទេវវិទ្យាទ្វេភាសា",
      ko: "한-영 이중언어 신학 참고판",
      zh: "双语神学参考版",
    },
    pages: "312 pages",
    desc: {
      en: "A reference dictionary of technical and theological terms, meticulously built for deep study and accurate translation work between Khmer and English.",
      km: "វចនានុក្រមយោងនៃពាក្យបច្ចេកទេស និងទេវវិទ្យា សម្រាប់ការសិក្សា និងការងារបកប្រែរវាងភាសាខ្មែរ និងអង់គ្លេស។",
      ko: "크메르어와 영어 사이의 심층 학습과 정확한 번역 작업을 위해 정밀하게 편찬된 전문 용어 사전입니다.",
      zh: "收录专业与神学术语的参考词典，专为高棉语与英语之间的学术研究和翻译工作而编。",
    },
    lang: {
      en: "Khmer / English",
      km: "ខ្មែរ / អង់គ្លេស",
      ko: "크메르어 / 영어",
      zh: "高棉语 / 英语",
    },
    langCode: "km-en",
    size: "4.5 MB",
    cover: "/images/all-nations-institute-campus.jpg",
    file: "/books/7bcb1-finally-khmer-english-technical-dictionary.pdf",
    highlights: [
      {
        en: "Over 8,000 carefully curated theological, ministry, and linguistic entries.",
        km: "ពាក្យទេវវិទ្យា ព័ន្ធកិច្ច និងភាសាវិទ្យាជាង ៨,០០០ ពាក្យ ត្រូវបានជ្រើសរើសយ៉ាងសម្រិតសម្រាំង។",
      },
      {
        en: "Phonetic romanization and Khmer syntactic definitions for clear cross-language comprehension.",
        km: "ការបញ្ចេញសំឡេងជាអក្សរឡាតាំង និងនិយមន័យវេយ្យាករណ៍ខ្មែរ សម្រាប់ការយល់ដឹងឆ្លងភាសាយ៉ាងច្បាស់លាស់។",
      },
      {
        en: "Indispensable study companion for Bible college students, pastors, translators, and Christian educators.",
        km: "ជំនួយការសិក្សាដ៏មិនអាចខ្វះបានសម្រាប់និស្សិតមហាវិទ្យាល័យព្រះគម្ពីរ គ្រូគង្វាល អ្នកបកប្រែ និងគ្រូបង្រៀនគ្រីស្ទបរិស័ទ។",
      },
    ],
    tableOfContents: [
      {
        section: "01",
        title: { en: "Section A: Systematic & Dogmatic Theology Terms", km: "ផ្នែក ក៖ វាក្យសព្ទទេវវិទ្យាជាប្រព័ន្ធ និងគោលលទ្ធិ" },
        pages: "p. 1 – 75",
      },
      {
        section: "02",
        title: { en: "Section B: Biblical Hermeneutics & Exegesis Terminology", km: "ផ្នែក ខ៖ វាក្យសព្ទបកស្រាយ និងពន្យល់ព្រះគម្ពីរ" },
        pages: "p. 76 – 150",
      },
      {
        section: "03",
        title: { en: "Section C: Ecclesiastical Governance, Liturgy & Sacraments", km: "ផ្នែក គ៖ ការគ្រប់គ្រងក្រុមជំនុំ ពិធីថ្វាយបង្គំ និងពិធីបរិសុទ្ធ" },
        pages: "p. 151 – 230",
      },
      {
        section: "04",
        title: { en: "Section D: General Theological Vocabulary (A to Z)", km: "ផ្នែក ឃ៖ វាក្យសព្ទទេវវិទ្យាទូទៅ (ក ដល់ អ / A ដល់ Z)" },
        pages: "p. 231 – 312",
      },
    ],
    historicalContext: {
      en: "Compiled to provide the Cambodian church with reliable, uniform doctrinal terminology that remains faithful to both historic Christian confessions and the beauty of the Khmer language.",
      km: "ចងក្រងឡើងដើម្បីផ្តល់ជូនក្រុមជំនុំកម្ពុជានូវវាក្យសព្ទគោលលទ្ធិដ៏គួរឱ្យទុកចិត្ត និងឯកភាព ដែលនៅតែស្មោះត្រង់ចំពោះជំនឿគ្រីស្ទបរិស័ទប្រវត្តិសាស្ត្រ និងភាពស្រស់ស្អាតនៃភាសាខ្មែរ។",
    },
  },
  {
    slug: "church-history-foundations",
    featured: false,
    title: {
      en: "Foundations of Early Church History",
      km: "គ្រឹះនៃប្រវត្តិសាស្ត្រក្រុមជំនុំសម័យដំបូង",
      ko: "초기 교회사 개론",
      zh: "早期教会史纲要",
    },
    subtitle: {
      en: "From the Apostolic Era through the Patristic Councils",
      km: "ពីសម័យពួកសាវក ឆ្លងកាត់ក្រុមប្រឹក្សាបុព្វបុរសនៃក្រុមជំនុំ",
      ko: "사도 시대부터 교부 공의회까지",
      zh: "从使徒时代到教父大公会议",
    },
    author: {
      en: "Hun Chet (Lectures at CPTI)",
      km: "ហ៊ុន ចិត្ត (មេរៀនបង្រៀននៅ CPTI)",
      ko: "훈 쳇 (CPTI 강의록)",
      zh: "洪哲 (CPTI 讲义)",
    },
    category: "history",
    categoryLabel: {
      en: "Church History",
      km: "ប្រវត្តិក្រុមជំនុំ",
      ko: "교회사",
      zh: "教会历史",
    },
    edition: {
      en: "Theological Seminary Lecture Syllabus",
      km: "ឯកសារមេរៀនសិក្ខាសាលាទេវវិទ្យា",
      ko: "신학교 강의 교재",
      zh: "神学院讲义教程",
    },
    pages: "186 pages",
    desc: {
      en: "A comprehensive course tracking the expansion of the Gospel from Jerusalem through Roman persecution to the formulation of the historic Creeds.",
      km: "វគ្គសិក្សាដ៏ទូលំទូលាយតាមដានការផ្សាយដំណឹងល្អពីក្រុងយេរូសាឡិម ឆ្លងកាត់ការបៀតបៀនរបស់ចក្រភពរ៉ូម រហូតដល់ការបង្កើតកម្រងជំនឿប្រវត្តិសាស្ត្រ។",
      ko: "예루살렘에서 시작하여 로마 제국의 박해를 거쳐 역사적 신조가 형성되기까지 복음의 확장을 추적하는 종합 교재입니다.",
      zh: "追溯福音从耶路撒冷发源，历经罗马帝国逼迫，直至确立大公信经的综合教程。"
    },
    lang: {
      en: "Khmer / English",
      km: "ខ្មែរ / អង់គ្លេស",
      ko: "크메르어 / 영어",
      zh: "高棉语 / 英语",
    },
    langCode: "km-en",
    size: "3.2 MB",
    cover: "/images/pastors-pulpit.jpg",
    file: "/books/eb84c-matthew-henrys-bible-commentary.pdf",
    highlights: [
      {
        en: "Historical trajectory from Pentecost to the Council of Nicaea (325 AD).",
        km: "ដំណើរប្រវត្តិសាស្ត្រពីថ្ងៃបុណ្យទី៥០ ដល់ក្រុមប្រឹក្សានីសេ (ឆ្នាំ ៣២៥ នៃ គ.ស)។",
      },
      {
        en: "Biographical insights into early Christian martyrs and apologists.",
        km: "ការយល់ដឹងអំពីជីវប្រវត្តិនៃទុក្ករបុគ្គល និងអ្នកការពារជំនឿគ្រីស្ទបរិស័ទដំបូង។",
      },
      {
        en: "Practical relevance for building a mature, rooted church in modern Cambodia.",
        km: "សារៈសំខាន់ជាក់ស្តែងសម្រាប់កសាងក្រុមជំនុំដែលចាស់ទុំ និងមានឫសគល់រឹងមាំនៅកម្ពុជាសម័យបច្ចុប្បន្ន។",
      },
    ],
    tableOfContents: [
      {
        section: "01",
        title: { en: "Chapter 1: The Apostolic Age & The Spread of the Gospel", km: "ជំពូកទី ១៖ សម័យពួកសាវក និងការរីកសាយភាយនៃដំណឹងល្អ" },
        pages: "p. 1 – 45",
      },
      {
        section: "02",
        title: { en: "Chapter 2: The Fire of Persecution & The Witness of Martyrs", km: "ជំពូកទី ២៖ ភ្លើងនៃការបៀតបៀន និងសក្ខីភាពនៃទុក្ករបុគ្គល" },
        pages: "p. 46 – 92",
      },
      {
        section: "03",
        title: { en: "Chapter 3: Defending the Faith: Heresies & Early Apologists", km: "ជំពូកទី ៣៖ ការការពារជំនឿ៖ គ្រូក្លែងក្លាយ និងអ្នកការពារជំនឿដំបូង" },
        pages: "p. 93 – 138",
      },
      {
        section: "04",
        title: { en: "Chapter 4: The Ecumenical Councils & The Nicene Creed", km: "ជំពូកទី ៤៖ មហាសន្និបាតក្រុមប្រឹក្សា និងកម្រងជំនឿនីសេ" },
        pages: "p. 139 – 186",
      },
    ],
    historicalContext: {
      en: "Developed during Hun Chet's tenure as Lecturer in Early Church History at Cambodia Presbyterian Theology Institute (CPTI, 2019–2024), equipping national pastors to understand the heritage of the global church.",
      km: "បានរៀបចំឡើងក្នុងអំឡុងពេលដែល ហ៊ុន ចិត្ត បង្រៀនជាសាស្ត្រាចារ្យប្រវត្តិសាស្ត្រក្រុមជំនុំសម័យដំបូងនៅវិទ្យាស្ថានទេវវិទ្យា CPTI (២០១៩–២០២៤) ដើម្បីបំពាក់បំប៉នគ្រូគង្វាលខ្មែរឱ្យយល់ពីកេរ្តិ៍ដំណែលនៃក្រុមជំនុំសកលលោក។",
    },
  },
  {
    slug: "discipleship-foundations",
    featured: false,
    title: {
      en: "One-to-One Discipleship Guide",
      km: "មគ្គុទ្ទេសក៍ការបណ្តុះសិស្សមួយទល់នឹងមួយ",
      ko: "일대일 제자양육 지침서",
      zh: "一对一门徒门训指南",
    },
    subtitle: {
      en: "Biblical mentoring and life multiplication in the local church",
      km: "ការណែនាំតាមព្រះគម្ពីរ និងការបង្កើតផលផ្លែក្នុងជីវិតនៃក្រុមជំនុំមូលដ្ឋាន",
      ko: "지역 교회 안에서의 성경적 멘토링과 삶의 재생산",
      zh: "地方教会中基于圣经的辅导与生命繁衍",
    },
    author: {
      en: "All Nations Church Ministry Team",
      km: "ក្រុមការងារព័ន្ធកិច្ចក្រុមជំនុំអលណេសិន",
      ko: "올네이션스교회 사역팀",
      zh: "万国教会事工团队",
    },
    category: "discipleship",
    categoryLabel: {
      en: "Discipleship & Ministry",
      km: "ការបណ្តុះសិស្ស និងព័ន្ធកិច្ច",
      ko: "제자훈련 & 사역",
      zh: "门徒门训与事工",
    },
    edition: {
      en: "Pastoral Discipleship Manual",
      km: "សៀវភៅណែនាំការបណ្តុះសិស្សរបស់គ្រូគង្វាល",
      ko: "목회적 제자양육 매뉴얼",
      zh: "教牧门徒门训手册",
    },
    pages: "124 pages",
    desc: {
      en: "Practical curriculum for walking alongside new believers in faith, prayer, biblical meditation, and spiritual growth in the local church.",
      km: "កម្មវិធីសិក្សាជាក់ស្តែងសម្រាប់ដើររួមគ្នាជាមួយអ្នកជឿថ្មីក្នុងជំនឿ ការអធិស្ឋាន ការរំពឹងគិតព្រះបន្ទូល និងការរីកចម្រើនខាងវិញ្ញាណក្នុងក្រុមជំនុំមូលដ្ឋាន។",
      ko: "지역 교회 안에서 새신자와 함께 믿음, 기도, 말씀 묵상, 영적 성장을 나누며 동행하는 실천적 훈련 교재입니다.",
      zh: "在地方教会中陪伴初信者共同在信心、祷告、默想圣经及属灵生命上成长的实用手册。"
    },
    lang: {
      en: "Khmer",
      km: "ភាសាខ្មែរ",
      ko: "크메르어",
      zh: "高棉语",
    },
    langCode: "km",
    size: "2.1 MB",
    cover: "/images/one-to-one-disciple-circle.jpg",
    file: "/books/7bcb1-finally-khmer-english-technical-dictionary.pdf",
    highlights: [
      {
        en: "Step-by-step spiritual roadmap for discipling new believers into mature followers of Christ.",
        km: "ផែនទីបង្ហាញផ្លូវខាងវិញ្ញាណជំហានម្តងមួយៗ ក្នុងការបណ្តុះអ្នកជឿថ្មីឱ្យក្លាយជាសិស្សចាស់ទុំរបស់ព្រះគ្រីស្ទ។",
      },
      {
        en: "Practical prayer guides, memory verses, and daily accountability structures.",
        km: "ការណែនាំការអធិស្ឋានជាក់ស្តែង ខគម្ពីរទន្ទេញចាំមាត់ និងរចនាសម្ព័ន្ធទំនួលខុសត្រូវប្រចាំថ្ងៃ។",
      },
      {
        en: "Tested and refined through community fellowship at All Nations Church.",
        km: "បានឆ្លងកាត់ការអនុវត្ត និងកែសម្រួលជាក់ស្តែងក្នុងសហគមន៍នៃក្រុមជំនុំអលណេសិន។",
      },
    ],
    tableOfContents: [
      {
        section: "01",
        title: { en: "Lesson 1: The Assurance of Salvation in Christ", km: "មេរៀនទី ១៖ ការធានានៃសេចក្តីសង្គ្រោះក្នុងព្រះគ្រីស្ទ" },
        pages: "p. 1 – 28",
      },
      {
        section: "02",
        title: { en: "Lesson 2: Daily Fellowship with God through Prayer & Word", km: "មេរៀនទី ២៖ ការប្រកបប្រចាំថ្ងៃជាមួយព្រះតាមរយៈការអធិស្ឋាន និងព្រះបន្ទូល" },
        pages: "p. 29 – 58",
      },
      {
        section: "03",
        title: { en: "Lesson 3: Walking in Obedience & Victory Over Temptation", km: "មេរៀនទី ៣៖ ការដើរក្នុងភាពស្តាប់បង្គាប់ និងជ័យជម្នះលើការល្បួង" },
        pages: "p. 59 – 88",
      },
      {
        section: "04",
        title: { en: "Lesson 4: Life in the Church Community & Ministry Witness", km: "មេរៀនទី ៤៖ ជីវិតក្នុងសហគមន៍ក្រុមជំនុំ និងសក្ខីភាពនៃព័ន្ធកិច្ច" },
        pages: "p. 89 – 124",
      },
    ],
    historicalContext: {
      en: "Compiled by Leader Hun Chet and the pastoral ministry leaders at All Nations Church in Phnom Penh to establish next-generation disciples firmly grounded in the Gospel.",
      km: "ចងក្រងឡើងដោយអ្នកដឹកនាំ ហ៊ុន ចិត្ត និងថ្នាក់ដឹកនាំព័ន្ធកិច្ចគង្វាលនៅក្រុមជំនុំអលណេសិន រាជធានីភ្នំពេញ ដើម្បីបណ្តុះសិស្សជំនាន់ក្រោយឱ្យចាក់គ្រឹះយ៉ាងរឹងមាំក្នុងដំណឹងល្អ។",
    },
  },
];

export function bookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) || null;
}
