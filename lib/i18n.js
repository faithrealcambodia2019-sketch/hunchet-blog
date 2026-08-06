// English / Khmer strings for the site chrome and page copy.
// Khmer is written in plain, everyday wording rather than formal literary
// Khmer, so it reads easily for anyone. Articles keep whatever language
// they were published in.
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

    "common.readMore": "Read more →",
    "common.explore": "Explore →",
    "common.loadError": "Couldn't load posts from WordPress:",

    "footer.tagline":
      "Sharing the Gospel through biblical encouragement, Christian teaching, prayer, and ministry content that points hearts to Jesus Christ.",
    "footer.explore": "Explore",
    "footer.getInTouch": "Get in Touch",
    "footer.topics": "Topics",
    "footer.sendMessage": "Send a message",
    "footer.rights": "All rights reserved.",

    "home.eyebrow": "Welcome to hunchet.blog",
    "home.title": "Encouragement and truth for every season of faith",
    "home.sub":
      "Biblical teaching, prayer, and honest reflection — written from the heart in Khmer, and shared here for anyone who needs hope.",
    "home.readArticles": "Read Articles",
    "home.aboutUs": "About Us",
    "home.whatWeDo": "What we do",
    "home.whatWeDoTitle": "A ministry rooted in scripture and community",
    "home.latest": "Latest",
    "home.recent": "Recent Articles",
    "home.recentSub":
      "New reflections on faith, scripture, and everyday life.",
    "home.viewAll": "View All Articles",
    "home.explore": "Explore",
    "home.exploreTitle": "Find what you're looking for",
    "home.connect": "Connect",
    "home.connectTitle":
      "Questions, prayer requests, or just want to say hello?",
    "home.connectSub":
      "Reach out any time — by phone, Telegram, or Facebook.",
    "home.getInTouch": "Get in Touch",

    "band.ministry": "Ministry",
    "band.ministryTitle": "Leading a community that grows in Christ",
    "band.ministryBody":
      "Serving as Ministry Lead at All Nations Church — directing community outreach, Sunday services, and building a strong spiritual and digital presence for the church family.",
    "band.ministryCta": "See the Gallery",
    "band.teaching": "Teaching",
    "band.teachingTitle": "Scripture that speaks to everyday life",
    "band.teachingBody":
      "Devotionals, biblical teaching, and honest reflection written in Khmer — on faith, prayer, forgiveness, mental health, and walking with God through real difficulty.",
    "band.teachingCta": "Read Articles",
    "band.outreach": "Outreach",
    "band.outreachTitle": "Faith put into action",
    "band.outreachBody":
      "Taking the Gospel beyond Sunday through community service, local support initiatives, and hands-on ministry work across Cambodia.",
    "band.outreachCta": "About the Ministry",

    "feat.gallery": "Gallery",
    "feat.galleryDesc":
      "Photos and milestones from ministry, worship, and community life.",
    "feat.resource": "Resource",
    "feat.resourceDesc":
      "Videos, books, and encouragement gathered in one place.",
    "feat.article": "Article",
    "feat.articleDesc": "Every reflection and teaching post, newest first.",

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

    "articles.eyebrow": "Writing",
    "articles.title": "Article",
    "articles.intro":
      "Reflections, devotionals, and biblical teaching — all in one place.",
    "articles.empty": "No posts yet — check back soon.",

    "contact.eyebrow": "Connect",
    "contact.title": "Get in Touch",
    "contact.intro":
      "Questions, prayer requests, or just want to say hello? Reach out through any of the channels below.",

    "about.eyebrow": "Our Story",
    "about.title": "About Us",
    "about.intro":
      "A ministry built on scripture, prayer, and a heart for the Cambodian church.",
    "about.quote":
      "\u201CI did not set out to build anything. I set out to serve one church well — and God kept widening the room.\u201D",
    "about.lifeStory": "Life Story",
    "about.road": "The road so far",
    "about.stat1": "Years in ministry",
    "about.stat2": "Years teaching church history",
    "about.stat3": "Churches served",
    "about.guides": "What guides this",
    "about.believe": "What we believe about the work",
    "about.seeGallery": "See the Gallery",
    "about.whoWrites": "Who writes here",
    "about.meet": "Meet Hun Chet",

    "tl.2013.title": "Where it began",
    "tl.2013.org": "Doung Preng New Hope Church",
    "tl.2013.body":
      "What started as simply showing up on Sundays grew into more than a decade of service — facilitating fellowship, helping lead worship, and learning what it means to carry the weight of other people's burdens in prayer.",
    "tl.2019.title": "Teaching the church its own history",
    "tl.2019.org": "Cambodia Presbyterian Theology Institute",
    "tl.2019.body":
      "Invited to lecture on Early Church History. Standing in front of future pastors and leaders taught me that the Cambodian church needs more than encouragement — it needs roots, and it needs to know the story it belongs to.",
    "tl.2021.title": "Taking the Gospel digital",
    "tl.2021.org": "CV — Content Specialist",
    "tl.2021.body":
      "Joined CV to build content strategy for digital ministry. Writing, filming, and directing short films — learning how to say something true about Jesus in the few seconds someone gives you while scrolling.",
    "tl.2024.title": "Sharing what we learned",
    "tl.2024.org": "EFC — Evangelical Fellowship of Cambodia",
    "tl.2024.body":
      "Presented CV's digital ministry model to pastors and church leaders from across the country. Closing a decade at Doung Preng the same year was hard, but it made room for what came next.",
    "tl.2025.title": "Leading a church, and writing for one",
    "tl.2025.org": "All Nations Church · CV",
    "tl.2025.body":
      "Now serving as Ministry Lead at All Nations Church — directing outreach, Sunday services, and the discipleship of a growing congregation — while working as a Social Media Specialist at CV on localized outreach to Buddhist communities. hunchet.blog is where both worlds meet.",

    "val.1.title": "Scripture first",
    "val.1.body":
      "Every article, sermon, and post starts with the text. Encouragement that isn't rooted in what God actually said doesn't hold weight when life gets hard.",
    "val.2.title": "Written in Khmer",
    "val.2.body":
      "Cambodians shouldn't have to read theology in a second language. Most of what is published here is written in Khmer, for Khmer readers.",
    "val.3.title": "Honest about difficulty",
    "val.3.body":
      "Grief, anxiety, failure, and doubt are not signs of weak faith. This is a place where those things get named rather than avoided.",
    "val.4.title": "For the whole church",
    "val.4.body":
      "From new believers to pastors and students — the goal is to equip anyone willing to take the next step in following Christ.",
  },

  km: {
    "nav.home": "ទំព័រដើម",
    "nav.gallery": "រូបភាព",
    "nav.library": "បណ្ណាល័យ",
    "nav.resource": "ធនធាន",
    "nav.article": "អត្ថបទ",
    "nav.about": "អំពីយើង",
    "nav.contact": "ទំនាក់ទំនង",
    "lang.switch": "ប្តូរភាសា",

    "common.readMore": "អានបន្ត →",
    "common.explore": "មើលបន្ថែម →",
    "common.loadError": "មិនអាចទាញអត្ថបទពី WordPress បានទេ៖",

    "footer.tagline":
      "យើងចែករំលែកដំណឹងល្អ តាមរយៈការលើកទឹកចិត្តតាមព្រះគម្ពីរ ការបង្រៀន ការអធិស្ឋាន និងខ្លឹមសារដែលនាំចិត្តមនុស្សទៅរកព្រះយេស៊ូវ។",
    "footer.explore": "មើលបន្ថែម",
    "footer.getInTouch": "ទំនាក់ទំនង",
    "footer.topics": "ប្រធានបទ",
    "footer.sendMessage": "ផ្ញើសារ",
    "footer.rights": "រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    "home.eyebrow": "សូមស្វាគមន៍មកកាន់ hunchet.blog",
    "home.title": "ការលើកទឹកចិត្ត និងសេចក្តីពិត សម្រាប់គ្រប់ពេលនៃជំនឿ",
    "home.sub":
      "ការបង្រៀនតាមព្រះគម្ពីរ ការអធិស្ឋាន និងការចែករំលែកដោយស្មោះ — សរសេរចេញពីចិត្តជាភាសាខ្មែរ សម្រាប់អ្នកណាដែលត្រូវការក្តីសង្ឃឹម។",
    "home.readArticles": "អានអត្ថបទ",
    "home.aboutUs": "អំពីយើង",
    "home.whatWeDo": "អ្វីដែលយើងធ្វើ",
    "home.whatWeDoTitle": "កិច្ចការបម្រើព្រះ ដែលឈរលើព្រះបន្ទូល និងសហគមន៍",
    "home.latest": "ថ្មីៗ",
    "home.recent": "អត្ថបទថ្មីៗ",
    "home.recentSub":
      "ការចែករំលែកថ្មីៗ អំពីជំនឿ ព្រះបន្ទូល និងជីវិតប្រចាំថ្ងៃ។",
    "home.viewAll": "មើលអត្ថបទទាំងអស់",
    "home.explore": "មើលបន្ថែម",
    "home.exploreTitle": "ស្វែងរកអ្វីដែលអ្នកចង់បាន",
    "home.connect": "ទាក់ទងមកយើង",
    "home.connectTitle":
      "មានសំណួរ ចង់ឱ្យអធិស្ឋានជូន ឬគ្រាន់តែចង់ជម្រាបសួរ?",
    "home.connectSub":
      "ទាក់ទងមកបានគ្រប់ពេល — តាមទូរស័ព្ទ Telegram ឬ Facebook។",
    "home.getInTouch": "ទាក់ទងមកយើង",

    "band.ministry": "កិច្ចការបម្រើព្រះ",
    "band.ministryTitle": "ដឹកនាំសហគមន៍ឱ្យរីកចម្រើនក្នុងព្រះគ្រីស្ទ",
    "band.ministryBody":
      "បម្រើជាប្រធានកិច្ចការនៅ All Nations Church — ដឹកនាំការចុះជួយសហគមន៍ ការថ្វាយបង្គំថ្ងៃអាទិត្យ និងកសាងក្រុមជំនុំឱ្យរឹងមាំ ទាំងខាងវិញ្ញាណ និងលើអនឡាញ។",
    "band.ministryCta": "មើលរូបភាព",
    "band.teaching": "ការបង្រៀន",
    "band.teachingTitle": "ព្រះបន្ទូលដែលនិយាយទៅកាន់ជីវិតប្រចាំថ្ងៃ",
    "band.teachingBody":
      "អត្ថបទលើកទឹកចិត្ត ការបង្រៀនតាមព្រះគម្ពីរ និងការចែករំលែកដោយស្មោះ សរសេរជាភាសាខ្មែរ — អំពីជំនឿ ការអធិស្ឋាន ការអភ័យទោស សុខភាពផ្លូវចិត្ត និងការដើរជាមួយព្រះក្នុងពេលលំបាក។",
    "band.teachingCta": "អានអត្ថបទ",
    "band.outreach": "ការចែកចាយដំណឹងល្អ",
    "band.outreachTitle": "ជំនឿដែលប្រែក្លាយជាទង្វើ",
    "band.outreachBody":
      "នាំដំណឹងល្អហួសពីថ្ងៃអាទិត្យ តាមរយៈការបម្រើសហគមន៍ គម្រោងជួយបងប្អូនក្នុងតំបន់ និងកិច្ចការជាក់ស្តែងនៅទូទាំងកម្ពុជា។",
    "band.outreachCta": "អំពីកិច្ចការនេះ",

    "feat.gallery": "រូបភាព",
    "feat.galleryDesc":
      "រូបភាព និងព្រឹត្តិការណ៍សំខាន់ៗ ពីកិច្ចការបម្រើព្រះ ការថ្វាយបង្គំ និងជីវិតសហគមន៍។",
    "feat.resource": "ធនធាន",
    "feat.resourceDesc":
      "វីដេអូ សៀវភៅ និងសេចក្តីលើកទឹកចិត្ត ប្រមូលនៅកន្លែងតែមួយ។",
    "feat.article": "អត្ថបទ",
    "feat.articleDesc": "អត្ថបទ និងការបង្រៀនទាំងអស់ ចាប់ពីថ្មីបំផុត។",

    "library.eyebrow": "បណ្ណាល័យ",
    "library.title": "សៀវភៅ និងធនធានសិក្សា",
    "library.intro":
      "អានបាន និងទាញយកបានដោយឥតគិតថ្លៃ — សម្រាប់អ្នកណាដែលចង់រីកចម្រើនក្នុងជំនឿ ទាំងជាភាសាខ្មែរ និងអង់គ្លេស។",
    "library.readOnline": "អានតាមអនឡាញ",
    "library.download": "ទាញយក",
    "library.back": "បណ្ណាល័យ",
    "library.downloadPdf": "ទាញយកឯកសារ PDF",
    "library.noInlinePdf":
      "កម្មវិធីរុករករបស់អ្នកបើកឯកសារ PDF ដោយផ្ទាល់មិនបានទេ។ អ្នកនៅតែអាចទាញយកវាមកអានបាន។",

    "resource.eyebrow": "ធនធាន",
    "resource.title": "មើល និងអាន",
    "resource.intro":
      "វីដេអូដែលមានអ្នកមើលច្រើនជាងគេទាំង ១០ ពី True Friend Cambodia ព្រមទាំងអត្ថបទលើកទឹកចិត្ត សៀវភៅ និងការបង្រៀន។",
    "resource.mostWatched": "មើលច្រើនជាងគេ",
    "resource.from": "ពី",
    "resource.ranked": "នៅលើ YouTube — តម្រៀបតាមចំនួនអ្នកមើល។",
    "resource.visitChannel": "ទស្សនាឆានែល",
    "resource.more": "មើលបន្ថែម",
    "resource.views": "ដងមើល",
    "resource.play": "បើកមើល",
    "resource.explore": "មើលបន្ថែម →",

    "card.articles": "អត្ថបទ និងសេចក្តីលើកទឹកចិត្ត",
    "card.articlesDesc":
      "ការចែករំលែកអំពីជំនឿ ព្រះបន្ទូល ការអធិស្ឋាន និងជីវិតប្រចាំថ្ងៃ។",
    "card.library": "បណ្ណាល័យ",
    "card.libraryDesc":
      "សៀវភៅ សៀវភៅពន្យល់ព្រះគម្ពីរ និងធនធានសិក្សា — អានតាមអនឡាញ ឬទាញយក។",
    "card.topics": "មើលតាមប្រធានបទ",
    "card.topicsDesc":
      "អត្ថបទចាត់តាមប្រធានបទ — ជំនឿ ការលើកទឹកចិត្ត ប្រវត្តិក្រុមជំនុំ និងច្រើនទៀត។",
    "card.contact": "ទាក់ទងមកយើង",
    "card.contactDesc":
      "សំណូមពរឱ្យអធិស្ឋានជូន សំណួរ ឬការអញ្ជើញឱ្យទៅចែករំលែក។",

    "articles.eyebrow": "ការសរសេរ",
    "articles.title": "អត្ថបទ",
    "articles.intro":
      "ការចែករំលែក អត្ថបទលើកទឹកចិត្ត និងការបង្រៀនតាមព្រះគម្ពីរ — នៅកន្លែងតែមួយ។",
    "articles.empty": "មិនទាន់មានអត្ថបទនៅឡើយទេ — សូមមកមើលម្តងទៀតឆាប់ៗ។",

    "contact.eyebrow": "ទាក់ទង",
    "contact.title": "ទាក់ទងមកយើង",
    "contact.intro":
      "មានសំណួរ ចង់ឱ្យអធិស្ឋានជូន ឬគ្រាន់តែចង់ជម្រាបសួរ? សូមទាក់ទងមកតាមមធ្យោបាយណាមួយខាងក្រោម។",

    "about.eyebrow": "រឿងរ៉ាវរបស់យើង",
    "about.title": "អំពីយើង",
    "about.intro":
      "កិច្ចការបម្រើព្រះ ដែលឈរលើព្រះបន្ទូល ការអធិស្ឋាន និងចិត្តស្រឡាញ់ក្រុមជំនុំកម្ពុជា។",
    "about.quote":
      "«ខ្ញុំមិនបានគិតថានឹងកសាងអ្វីធំដុំទេ។ ខ្ញុំគ្រាន់តែចង់បម្រើក្រុមជំនុំមួយឱ្យបានល្អ — ហើយព្រះបានបើកកន្លែងឱ្យធំទូលាយបន្តិចម្តងៗ។»",
    "about.lifeStory": "ដំណើរជីវិត",
    "about.road": "ដំណើរមកទល់ពេលនេះ",
    "about.stat1": "ឆ្នាំក្នុងកិច្ចការបម្រើព្រះ",
    "about.stat2": "ឆ្នាំបង្រៀនប្រវត្តិក្រុមជំនុំ",
    "about.stat3": "ក្រុមជំនុំដែលបានបម្រើ",
    "about.guides": "អ្វីដែលនាំផ្លូវយើង",
    "about.believe": "អ្វីដែលយើងជឿអំពីកិច្ចការនេះ",
    "about.seeGallery": "មើលរូបភាព",
    "about.whoWrites": "អ្នកសរសេរនៅទីនេះ",
    "about.meet": "ស្គាល់ ហ៊ុន ជេត",

    "tl.2013.title": "កន្លែងដែលចាប់ផ្តើម",
    "tl.2013.org": "ក្រុមជំនុំក្តីសង្ឃឹមថ្មី ដូងព្រែង",
    "tl.2013.body":
      "ចាប់ផ្តើមពីការមកចូលរួមថ្ងៃអាទិត្យធម្មតា ក្លាយទៅជាការបម្រើជាងដប់ឆ្នាំ — រៀបចំការជួបជុំ ជួយដឹកនាំការថ្វាយបង្គំ និងរៀនពីអត្ថន័យនៃការទទួលបន្ទុកអធិស្ឋានជូនអ្នកដទៃ។",
    "tl.2019.title": "បង្រៀនក្រុមជំនុំពីប្រវត្តិរបស់ខ្លួន",
    "tl.2019.org": "វិទ្យាស្ថានទេវវិទ្យាព្រេស្បីទេរៀនកម្ពុជា",
    "tl.2019.body":
      "បានទទួលការអញ្ជើញឱ្យបង្រៀនប្រវត្តិក្រុមជំនុំសម័យដើម។ ការឈរនៅមុខអ្នកគង្វាល និងអ្នកដឹកនាំនាពេលអនាគត បានបង្រៀនខ្ញុំថា ក្រុមជំនុំកម្ពុជាត្រូវការជាងការលើកទឹកចិត្ត — គឺត្រូវការឫសគល់ និងត្រូវដឹងពីរឿងរ៉ាវដែលខ្លួនជាផ្នែកមួយ។",
    "tl.2021.title": "នាំដំណឹងល្អទៅកាន់ពិភពអនឡាញ",
    "tl.2021.org": "CV — អ្នកជំនាញខ្លឹមសារ",
    "tl.2021.body":
      "ចូលរួមជាមួយ CV ដើម្បីរៀបចំខ្លឹមសារសម្រាប់កិច្ចការលើអនឡាញ។ សរសេរ ថត និងដឹកនាំវីដេអូខ្លីៗ — រៀនពីរបៀបនិយាយអំពីព្រះយេស៊ូវឱ្យបានពិត ក្នុងរយៈពេលពីរបីវិនាទី ដែលគេឱ្យយើងពេលគេកំពុងរំកិលមើលទូរស័ព្ទ។",
    "tl.2024.title": "ចែករំលែកអ្វីដែលយើងបានរៀន",
    "tl.2024.org": "EFC — សម្ព័ន្ធគ្រីស្ទបរិស័ទកម្ពុជា",
    "tl.2024.body":
      "បានបង្ហាញគំរូកិច្ចការលើអនឡាញរបស់ CV ដល់អ្នកគង្វាល និងអ្នកដឹកនាំក្រុមជំនុំពីទូទាំងប្រទេស។ ការបញ្ចប់ដប់ឆ្នាំនៅដូងព្រែងក្នុងឆ្នាំដដែលនោះពិតជាពិបាកចិត្ត ប៉ុន្តែវាបានបើកផ្លូវសម្រាប់អ្វីដែលមកបន្ទាប់។",
    "tl.2025.title": "ដឹកនាំក្រុមជំនុំ និងសរសេរសម្រាប់ក្រុមជំនុំ",
    "tl.2025.org": "All Nations Church · CV",
    "tl.2025.body":
      "ឥឡូវនេះបម្រើជាប្រធានកិច្ចការនៅ All Nations Church — ដឹកនាំការចែកចាយដំណឹងល្អ ការថ្វាយបង្គំថ្ងៃអាទិត្យ និងការបណ្តុះបណ្តាលបងប្អូនក្នុងក្រុមជំនុំដែលកំពុងរីកចម្រើន — ព្រមទាំងធ្វើការជាអ្នកជំនាញបណ្តាញសង្គមនៅ CV។ hunchet.blog គឺជាកន្លែងដែលពិភពទាំងពីរនេះជួបគ្នា។",

    "val.1.title": "ព្រះបន្ទូលមុនគេ",
    "val.1.body":
      "អត្ថបទ ធម្មទេសនា និងការចែករំលែកគ្រប់យ៉ាង ចាប់ផ្តើមពីព្រះបន្ទូល។ ការលើកទឹកចិត្តដែលមិនឈរលើអ្វីដែលព្រះមានបន្ទូល នឹងទ្រាំមិនបាននៅពេលជីវិតលំបាក។",
    "val.2.title": "សរសេរជាភាសាខ្មែរ",
    "val.2.body":
      "បងប្អូនខ្មែរមិនគួរត្រូវអានសេចក្តីបង្រៀនអំពីព្រះជាភាសាបរទេសទេ។ ភាគច្រើននៃអ្វីដែលចុះផ្សាយនៅទីនេះ សរសេរជាភាសាខ្មែរ សម្រាប់អ្នកអានខ្មែរ។",
    "val.3.title": "ស្មោះត្រង់អំពីភាពលំបាក",
    "val.3.body":
      "ទុក្ខសោក ការថប់បារម្ភ ការបរាជ័យ និងការសង្ស័យ មិនមែនជាសញ្ញាថាជំនឿខ្សោយទេ។ ទីនេះជាកន្លែងដែលរឿងទាំងនេះត្រូវបាននិយាយចេញ ជាជាងគេចវេស។",
    "val.4.title": "សម្រាប់ក្រុមជំនុំទាំងមូល",
    "val.4.body":
      "ចាប់ពីអ្នកជឿថ្មី រហូតដល់អ្នកគង្វាល និងនិស្សិត — គោលបំណងគឺជួយឱ្យអ្នកណាដែលចង់ដើរតាមព្រះគ្រីស្ទ អាចបោះជំហានបន្ទាប់បាន។",
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
