// English / Khmer strings for the site chrome and page copy.
// Khmer is written in plain, everyday wording rather than formal literary
// Khmer, so it reads easily for anyone. Korean and Simplified Chinese live
// in ./i18n-cjk. Articles keep whatever language they were published in.
import { useRouter } from "next/router";
import { ko, zh } from "./i18n-cjk";

export const LOCALES = [
  { code: "en", short: "EN", name: "English" },
  { code: "km", short: "ខ្មែរ", name: "ភាសាខ្មែរ" },
  { code: "ko", short: "한국어", name: "한국어" },
  { code: "zh", short: "中文", name: "简体中文" },
];

const strings = {
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.library": "Library",
    "nav.resource": "Resource",
    "nav.article": "Article",
    "nav.about": "About Us",
    "nav.partner": "Partner With Us",
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

    "home.eyebrow": "Hun Chet • Faith, Scripture & Ministry",
    "home.title": "Rooted in Faith. Proclaiming Christ across Cambodia.",
    "home.sub":
      "Biblical exposition, pastoral pulpit ministry, and next-generation discipleship at All Nations Church, Phnom Penh.",
    "home.readArticles": "Read Articles & Teaching",
    "home.aboutUs": "Our Story & Ministry",
    "home.whatWeDo": "What We Do",
    "home.whatWeDoTitle": "A ministry rooted in scripture, truth, and community",
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
      "Free to read and download — biblical study companions, theological archives, and bilingual reference texts for the Cambodian church.",
    "library.badge": "Theological Archive & Study Library",
    "library.readOnline": "Read online",
    "library.download": "Download",
    "library.back": "Library",
    "library.downloadPdf": "Download Full PDF",
    "library.noInlinePdf":
      "Your browser cannot display PDFs inline. You can still read this volume by downloading the document directly.",
    "library.filterAll": "All Works",
    "library.filterCommentary": "Commentary",
    "library.filterHistory": "Church History",
    "library.filterReference": "Dictionary & Reference",
    "library.filterDiscipleship": "Discipleship",
    "library.searchPlaceholder": "Search by title, author, or keyword...",
    "library.featuredBadge": "Featured Theological Archive",
    "library.readVolume": "Study & Read Online",
    "library.studyOverview": "Study Companion & Outline",
    "library.tableOfContents": "Table of Contents",
    "library.historicalContext": "Historical & Ministry Background",
    "library.keyHighlights": "Core Theological Highlights",
    "library.officialViewer": "Official PDF Document Archive",
    "library.openExternal": "Open Document",
    "library.allVolumes": "Archive Catalog",
    "library.noResults": "No books found matching your search query.",
    "library.resetFilter": "Reset search & filters",
    "library.statVolumes": "5 Study Volumes",
    "library.statAccess": "100% Free Public Ministry",
    "library.statBilingual": "Khmer & English Editions",
    "library.statDoctrinal": "Biblical & Doctrinally Sound",
    "library.pillar1Title": "Sound Biblical Doctrine",
    "library.pillar1Body": "Every volume is rooted in faithful exposition of Holy Scripture, upholding historic Christian truth.",
    "library.pillar2Title": "Free Ministry Distribution",
    "library.pillar2Body": "Provided freely without paywalls for pastors, church planters, seminary students, and growing believers.",
    "library.pillar3Title": "Bilingual Discipleship",
    "library.pillar3Body": "Equipping the Cambodian church with high-caliber Khmer and English texts to foster enduring spiritual depth.",

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

    "partner.eyebrow": "Give. Pray. Partner.",
    "partner.title": "Together, we can carry hope further",
    "partner.intro":
      "Your partnership helps create biblical teaching, strengthen digital ministry, and serve communities in Cambodia. Choose a giving path below—whether you are in Cambodia or anywhere in the world.",
    "partner.primaryCta": "Choose how to give",
    "partner.secondaryCta": "See your impact",
    "partner.trustLabel": "Giving information",
    "partner.trust.verified": "Verified giving instructions",
    "partner.trust.options": "Cambodia and worldwide options",
    "partner.trust.direct": "Direct support when you need it",
    "partner.impactEyebrow": "Why partner",
    "partner.impactTitle": "Your generosity strengthens the work",
    "partner.impactIntro":
      "Every gift—large or small—helps us serve with consistency, quality, and care.",
    "partner.impact.teaching.title": "Biblical teaching",
    "partner.impact.teaching.body":
      "Support clear, accessible teaching and faith resources for Khmer readers, churches, and emerging leaders.",
    "partner.impact.media.title": "Digital ministry",
    "partner.impact.media.body":
      "Help produce thoughtful videos, articles, and creative media that bring truth and encouragement online.",
    "partner.impact.outreach.title": "Community outreach",
    "partner.impact.outreach.body":
      "Strengthen practical ministry, local service, and relationships that care for people beyond the screen.",
    "partner.giveEyebrow": "Ways to give",
    "partner.giveTitle": "Choose the giving option that fits you",
    "partner.giveIntro":
      "Contact us through an official channel to receive the current, verified payment details for your location.",
    "partner.cambodia.label": "Giving in Cambodia",
    "partner.cambodia.title": "Local giving",
    "partner.cambodia.description":
      "Simple options for supporters giving from a Cambodian bank or mobile banking app.",
    "partner.cambodia.khqr": "KHQR or ABA Pay",
    "partner.cambodia.khqrNote": "Request the current verified QR code before sending.",
    "partner.cambodia.bank": "Local bank transfer",
    "partner.cambodia.bankNote": "Receive the approved account name and number directly.",
    "partner.cambodia.monthly": "Monthly partnership",
    "partner.cambodia.monthlyNote": "Arrange consistent monthly support with our team.",
    "partner.cambodia.cta": "Get Cambodia giving details",
    "partner.global.label": "Giving worldwide",
    "partner.global.title": "International giving",
    "partner.global.description":
      "Secure guidance for friends and partners supporting from outside Cambodia.",
    "partner.global.card": "Secure online giving",
    "partner.global.cardNote": "Ask for the approved digital option available in your country.",
    "partner.global.transfer": "International transfer",
    "partner.global.transferNote": "Request verified bank and transfer instructions directly.",
    "partner.global.monthly": "Recurring partnership",
    "partner.global.monthlyNote": "Talk with us about dependable ongoing support.",
    "partner.global.cta": "Get worldwide giving details",
    "partner.safetyTitle": "Give with confidence",
    "partner.safetyBody":
      "For your security, only use payment details confirmed through Hun Chet's official Telegram or Facebook Messenger. We will never ask for your password, PIN, or one-time verification code.",
    "partner.otherEyebrow": "More ways to partner",
    "partner.otherTitle": "Partnership is more than financial",
    "partner.otherIntro":
      "Your prayer, voice, and collaboration can open doors that a donation alone cannot.",
    "partner.other.pray.title": "Pray with us",
    "partner.other.pray.body":
      "Pray for wisdom, faithful teaching, open hearts, and lasting impact in Cambodia and beyond.",
    "partner.other.share.title": "Share the work",
    "partner.other.share.body":
      "Introduce these resources to your church, friends, or community and help more people find hope.",
    "partner.other.collaborate.title": "Collaborate",
    "partner.other.collaborate.body":
      "Invite Hun Chet to teach, create, consult, or partner on a ministry initiative.",
    "partner.finalEyebrow": "Start a conversation",
    "partner.finalTitle": "Have a question before you give?",
    "partner.finalBody":
      "We are glad to answer questions about the ministry, giving methods, or partnership opportunities.",
    "partner.finalCta": "Contact us",

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
    "nav.partner": "ចូលរួមជាមួយយើង",
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

    "home.eyebrow": "ហ៊ុន ចិត្ត • ព័ន្ធកិច្ច និងការបង្រៀនព្រះបន្ទូល",
    "home.title": "ចាក់ឬសក្នុងជំនឿ • ផ្សាយដំណឹងល្អនៃព្រះគ្រីស្ទ",
    "home.sub":
      "ការបង្រៀនព្រះគម្ពីរ ការផ្សាយនៅលើវេទិកា និងការបណ្តុះសិស្សជំនាន់ក្រោយ នៅក្រុមជំនុំអលណេសិន (All Nations Church)។",
    "home.readArticles": "អានអត្ថបទ និងការបង្រៀន",
    "home.aboutUs": "អំពីរឿងរ៉ាវ និងព័ន្ធកិច្ច",
    "home.whatWeDo": "អ្វីដែលយើងធ្វើ",
    "home.whatWeDoTitle": "ព័ន្ធកិច្ចដែលចាក់ឬសក្នុងព្រះបន្ទូល សេចក្តីពិត និងសហគមន៍",
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
    "library.title": "សៀវភៅ និងធនធានសិក្សាព្រះគម្ពីរ",
    "library.intro":
      "អានបាន និងទាញយកបានដោយឥតគិតថ្លៃ — ឯកសារជំនួយសិក្សាព្រះគម្ពីរ បណ្ណសារទេវវិទ្យា និងឯកសារយោងទ្វេភាសាសម្រាប់ក្រុមជំនុំកម្ពុជា។",
    "library.badge": "បណ្ណាល័យទេវវិទ្យា និងឯកសារសិក្សា",
    "library.readOnline": "អានតាមអនឡាញ",
    "library.download": "ទាញយក",
    "library.back": "បណ្ណាល័យ",
    "library.downloadPdf": "ទាញយកឯកសារ PDF ពេញលេញ",
    "library.noInlinePdf":
      "កម្មវិធីរុករករបស់អ្នកបើកឯកសារ PDF ដោយផ្ទាល់មិនបានទេ។ អ្នកនៅតែអាចទាញយកឯកសារនេះមកអានបានយ៉ាងងាយស្រួល។",
    "library.filterAll": "ស្នាដៃទាំងអស់",
    "library.filterCommentary": "អត្ថាធិប្បាយ",
    "library.filterHistory": "ប្រវត្តិក្រុមជំនុំ",
    "library.filterReference": "វចនានុក្រម និងឯកសារយោង",
    "library.filterDiscipleship": "ការបណ្តុះសិស្ស",
    "library.searchPlaceholder": "ស្វែងរកតាមចំណងជើង អ្នកនិពន្ធ ឬពាក្យគន្លឹះ...",
    "library.featuredBadge": "សៀវភៅលេចធ្លោប្រចាំបណ្ណាល័យ",
    "library.readVolume": "សិក្សា និងអានតាមអនឡាញ",
    "library.studyOverview": "ជំនួយការសិក្សា និងទិដ្ឋភាពទូទៅ",
    "library.tableOfContents": "មាតិកាសៀវភៅ",
    "library.historicalContext": "បរិបទប្រវត្តិសាស្ត្រ និងព័ន្ធកិច្ច",
    "library.keyHighlights": "ចំណុចសំខាន់ៗនៃការសិក្សាទេវវិទ្យា",
    "library.officialViewer": "ផ្ទាំងអានឯកសារ PDF ផ្លូវការ",
    "library.openExternal": "បើកឯកសារ",
    "library.allVolumes": "កាតាឡុកបណ្ណសារ",
    "library.noResults": "រកមិនឃើញសៀវភៅដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
    "library.resetFilter": "កំណត់ការស្វែងរក និងតម្រងឡើងវិញ",
    "library.statVolumes": "៥ ឯកសារសិក្សា",
    "library.statAccess": "ព័ន្ធកិច្ចចែករំលែកដោយឥតគិតថ្លៃ ១០០%",
    "library.statBilingual": "ការបោះពុម្ពជាភាសាខ្មែរ និងអង់គ្លេស",
    "library.statDoctrinal": "ស្របតាមព្រះគម្ពីរ និងការកែទម្រង់",
    "library.pillar1Title": "គោលលទ្ធិព្រះគម្ពីរដ៏ត្រឹមត្រូវ",
    "library.pillar1Body": "គ្រប់ឯកសារទាំងអស់ត្រូវបានចាក់គ្រឹះលើការពន្យល់ដ៏ស្មោះត្រង់នៃព្រះបន្ទូលបរិសុទ្ធ ដោយប្រកាន់ខ្ជាប់នូវសេចក្តីពិតគ្រីស្ទបរិស័ទ។",
    "library.pillar2Title": "ព័ន្ធកិច្ចចែករំលែកដោយឥតគិតថ្លៃ",
    "library.pillar2Body": "ផ្តល់ជូនដោយឥតគិតថ្លៃសម្រាប់គ្រូគង្វាល អ្នកត្រួសត្រាយក្រុមជំនុំ និស្សិតទេវវិទ្យា និងអ្នកជឿទាំងអស់ដែលចង់រីកចម្រើន។",
    "library.pillar3Title": "ការបណ្តុះសិស្សទ្វេភាសា",
    "library.pillar3Body": "បំពាក់បំប៉នក្រុមជំនុំកម្ពុជាជាមួយអត្ថបទភាសាខ្មែរ និងអង់គ្លេសប្រកបដោយគុណភាពខ្ពស់ ដើម្បីកសាងជម្រៅខាងវិញ្ញាណដ៏ស្ថិតស្ថេរ។",

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

    "partner.eyebrow": "ថ្វាយ · អធិស្ឋាន · ចូលរួម",
    "partner.title": "រួមគ្នា យើងអាចនាំក្តីសង្ឃឹមទៅបានកាន់តែឆ្ងាយ",
    "partner.intro":
      "ការចូលរួមរបស់អ្នក ជួយបង្កើតការបង្រៀនតាមព្រះគម្ពីរ ពង្រឹងកិច្ចការតាមអនឡាញ និងបម្រើសហគមន៍នៅកម្ពុជា។ សូមជ្រើសរើសវិធីថ្វាយខាងក្រោម មិនថាអ្នកនៅកម្ពុជា ឬនៅប្រទេសណាក៏ដោយ។",
    "partner.primaryCta": "ជ្រើសរើសវិធីថ្វាយ",
    "partner.secondaryCta": "មើលអត្ថប្រយោជន៍នៃការគាំទ្រ",
    "partner.trustLabel": "ព័ត៌មានអំពីការថ្វាយ",
    "partner.trust.verified": "ព័ត៌មានថ្វាយដែលបានបញ្ជាក់ត្រឹមត្រូវ",
    "partner.trust.options": "ជម្រើសនៅកម្ពុជា និងក្រៅប្រទេស",
    "partner.trust.direct": "មានអ្នកជួយឆ្លើយដោយផ្ទាល់",
    "partner.impactEyebrow": "ហេតុអ្វីគួរចូលរួម",
    "partner.impactTitle": "ចិត្តសប្បុរសរបស់អ្នក ពង្រឹងកិច្ចការនេះ",
    "partner.impactIntro":
      "រាល់ការថ្វាយ ទោះតិចឬច្រើន សុទ្ធតែជួយឱ្យយើងបម្រើបានទៀងទាត់ មានគុណភាព និងដោយយកចិត្តទុកដាក់។",
    "partner.impact.teaching.title": "ការបង្រៀនតាមព្រះគម្ពីរ",
    "partner.impact.teaching.body":
      "គាំទ្រការបង្រៀន និងធនធានជំនឿដែលងាយយល់ សម្រាប់អ្នកអានខ្មែរ ក្រុមជំនុំ និងអ្នកដឹកនាំជំនាន់ថ្មី។",
    "partner.impact.media.title": "កិច្ចការតាមអនឡាញ",
    "partner.impact.media.body":
      "ជួយផលិតវីដេអូ អត្ថបទ និងខ្លឹមសារច្នៃប្រឌិត ដែលនាំសេចក្តីពិត និងការលើកទឹកចិត្តទៅកាន់អនឡាញ។",
    "partner.impact.outreach.title": "ការបម្រើសហគមន៍",
    "partner.impact.outreach.body":
      "ពង្រឹងការបម្រើជាក់ស្តែង ការជួយក្នុងតំបន់ និងទំនាក់ទំនងដែលយកចិត្តទុកដាក់ចំពោះមនុស្សលើសពីអេក្រង់។",
    "partner.giveEyebrow": "វិធីថ្វាយ",
    "partner.giveTitle": "ជ្រើសរើសវិធីថ្វាយដែលសមស្របសម្រាប់អ្នក",
    "partner.giveIntro":
      "សូមទាក់ទងតាមបណ្តាញផ្លូវការរបស់យើង ដើម្បីទទួលព័ត៌មានបង់ប្រាក់បច្ចុប្បន្ន និងបានបញ្ជាក់ត្រឹមត្រូវសម្រាប់ទីតាំងរបស់អ្នក។",
    "partner.cambodia.label": "ថ្វាយនៅកម្ពុជា",
    "partner.cambodia.title": "ការថ្វាយក្នុងស្រុក",
    "partner.cambodia.description":
      "ជម្រើសងាយៗសម្រាប់អ្នកគាំទ្រដែលប្រើធនាគារ ឬកម្មវិធីធនាគារលើទូរស័ព្ទនៅកម្ពុជា។",
    "partner.cambodia.khqr": "KHQR ឬ ABA Pay",
    "partner.cambodia.khqrNote": "សូមស្នើសុំ QR ដែលបានបញ្ជាក់ត្រឹមត្រូវ មុនពេលផ្ញើប្រាក់។",
    "partner.cambodia.bank": "ផ្ទេរតាមធនាគារក្នុងស្រុក",
    "partner.cambodia.bankNote": "ទទួលឈ្មោះគណនី និងលេខគណនីដែលត្រឹមត្រូវដោយផ្ទាល់។",
    "partner.cambodia.monthly": "គាំទ្រប្រចាំខែ",
    "partner.cambodia.monthlyNote": "រៀបចំការគាំទ្រប្រចាំខែជាមួយក្រុមការងាររបស់យើង។",
    "partner.cambodia.cta": "ទទួលព័ត៌មានថ្វាយនៅកម្ពុជា",
    "partner.global.label": "ថ្វាយពីក្រៅប្រទេស",
    "partner.global.title": "ការថ្វាយអន្តរជាតិ",
    "partner.global.description":
      "ការណែនាំដែលមានសុវត្ថិភាព សម្រាប់មិត្តភក្តិ និងដៃគូដែលគាំទ្រពីក្រៅប្រទេសកម្ពុជា។",
    "partner.global.card": "ការថ្វាយតាមអនឡាញដោយសុវត្ថិភាព",
    "partner.global.cardNote": "សួររកជម្រើសឌីជីថលដែលអាចប្រើបាននៅក្នុងប្រទេសរបស់អ្នក។",
    "partner.global.transfer": "ផ្ទេរប្រាក់អន្តរជាតិ",
    "partner.global.transferNote": "ស្នើសុំព័ត៌មានធនាគារ និងវិធីផ្ទេរដែលបានបញ្ជាក់ត្រឹមត្រូវ។",
    "partner.global.monthly": "ចូលរួមគាំទ្រជាប្រចាំ",
    "partner.global.monthlyNote": "និយាយជាមួយយើងអំពីការគាំទ្រជាបន្តបន្ទាប់។",
    "partner.global.cta": "ទទួលព័ត៌មានថ្វាយពីក្រៅប្រទេស",
    "partner.safetyTitle": "ថ្វាយដោយទំនុកចិត្ត",
    "partner.safetyBody":
      "ដើម្បីសុវត្ថិភាព សូមប្រើតែព័ត៌មានបង់ប្រាក់ដែលបានបញ្ជាក់តាម Telegram ឬ Facebook Messenger ផ្លូវការរបស់ ហ៊ុន ជេត។ យើងមិនដែលស្នើសុំពាក្យសម្ងាត់ លេខ PIN ឬលេខកូដផ្ទៀងផ្ទាត់របស់អ្នកឡើយ។",
    "partner.otherEyebrow": "វិធីផ្សេងទៀតដើម្បីចូលរួម",
    "partner.otherTitle": "ការចូលរួម មិនមែនមានតែការថ្វាយប្រាក់ទេ",
    "partner.otherIntro":
      "ការអធិស្ឋាន សំឡេង និងការសហការរបស់អ្នក អាចបើកទ្វារដែលការថ្វាយប្រាក់តែមួយមុខមិនអាចធ្វើបាន។",
    "partner.other.pray.title": "អធិស្ឋានជាមួយយើង",
    "partner.other.pray.body":
      "អធិស្ឋានសម្រាប់ប្រាជ្ញា ការបង្រៀនដ៏ស្មោះត្រង់ ចិត្តដែលបើកទទួល និងផលផ្លែយូរអង្វែងនៅកម្ពុជា និងលើសពីនេះ។",
    "partner.other.share.title": "ចែករំលែកកិច្ចការ",
    "partner.other.share.body":
      "ណែនាំធនធានទាំងនេះទៅក្រុមជំនុំ មិត្តភក្តិ ឬសហគមន៍របស់អ្នក ដើម្បីជួយឱ្យមនុស្សកាន់តែច្រើនរកឃើញក្តីសង្ឃឹម។",
    "partner.other.collaborate.title": "សហការ",
    "partner.other.collaborate.body":
      "អញ្ជើញ ហ៊ុន ជេត ទៅបង្រៀន បង្កើតខ្លឹមសារ ផ្តល់យោបល់ ឬចូលរួមក្នុងគម្រោងកិច្ចការបម្រើ។",
    "partner.finalEyebrow": "ចាប់ផ្តើមការសន្ទនា",
    "partner.finalTitle": "មានសំណួរមុនពេលថ្វាយមែនទេ?",
    "partner.finalBody":
      "យើងរីករាយឆ្លើយសំណួរអំពីកិច្ចការ វិធីថ្វាយ ឬឱកាសចូលរួមជាដៃគូ។",
    "partner.finalCta": "ទាក់ទងមកយើង",

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

  ko,
  zh,
};

// Returns a t(key) function for the locale the visitor is currently on.
// Missing keys fall back to English rather than showing a raw key.
export function useT() {
  const { locale } = useRouter();
  const table = strings[locale] || strings.en;
  return (key) => table[key] ?? strings.en[key] ?? key;
}

export function useLocale() {
  const { locale } = useRouter();
  return locale || "en";
}

// Picks the right translation from a { en, km, ko, zh } pair on bilingual
// content records, falling back to English.
export function pick(value, locale) {
  if (value && typeof value === "object") {
    return value[locale] ?? value.en;
  }
  return value;
}
