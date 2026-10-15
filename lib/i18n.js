// English / Khmer strings for the site chrome and page copy.
// Khmer is written in plain, everyday wording rather than formal literary
// Khmer, so it reads easily for anyone. Korean and Simplified Chinese live
// in ./i18n-cjk. Articles keep whatever language they were published in.
import { useRouter } from "next/router";
import { ko, zh } from "./i18n-cjk";

export const LOCALES = [
  { code: "km", short: "ខ្មែរ", name: "ភាសាខ្មែរ" },
  { code: "en", short: "EN", name: "English" },
  { code: "ko", short: "한국어", name: "한국어" },
  { code: "zh", short: "中文", name: "简体中文" },
];

const strings = {
  en: {
    "nav.home": "Home",
    "nav.devotions": "Devotions",
    "nav.gallery": "Gallery",
    "nav.library": "Library",
    "nav.resource": "Resource",
    "nav.article": "Article",
    "nav.about": "About Me",
    "nav.partner": "Partner With Us",
    "nav.contact": "Contact",
    "lang.switch": "Change language",

    "common.readMore": "Read more →",
    "common.explore": "Explore →",
    "common.loadError": "Couldn't load posts from WordPress:",

    "footer.tagline":
      "Hun Chet's Personal Blog — Sharing biblical reflections, Christian teachings, prayer, and life lessons that point hearts to Jesus Christ.",
    "footer.explore": "Explore",
    "footer.getInTouch": "Get in Touch",
    "footer.topics": "Topics",
    "footer.sendMessage": "Send a message",
    "footer.rights": "All rights reserved.",

    "home.eyebrow": "Hun Chet's Personal Blog • Faith, Writing & Ministry",
    "home.title": "Rooted in Faith. Sharing Truth & Hope.",
    "home.sub":
      "Biblical expositions, personal reflections, devotional writings, and spiritual resources by Leader Hun Chet, Phnom Penh.",
    "home.readArticles": "Read Articles & Teachings",
    "home.aboutUs": "About Hun Chet",
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
      "Serving as Ministry Lead with Hun Chet — directing community outreach, Sunday services, and building a strong spiritual and digital presence.",
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
    "library.format": "Format",
    "library.pages": "Pages",
    "library.fileSize": "File Size",
    "library.edition": "Edition",
    "library.shelfView": "Bookshelf Showcase",
    "library.catalogView": "Detailed Catalog",
    "library.lookInside": "Look Inside",
    "library.quickPreview": "Quick Preview",
    "library.closePreview": "Close Preview",
    "library.viewToggle": "View Mode",
    "library.shelfBrassTag": "Hun Chet Theological Library • Free Public Archive",
    "library.shelfNotice": "Click any book to open the table of contents & study preview.",


    "post.readingRoom": "Reading Room",
    "post.minRead": "min read",
    "post.authorPreacher": "About The Preacher & Writer",
    "post.backAll": "← Back to all articles",
    "post.studyLibrary": "Study Library",
    "post.videoArchives": "Video Archives",

    "resource.eyebrow": "Resource",
    "resource.title": "Digital Media & Video Archives",
    "resource.intro":
      "Proclaiming Christ through short films, biblical teaching, sanctuary worship, and discipleship media across Cambodia.",
    "resource.badge": "Media Ministry & Video Archives",
    "resource.mostWatched": "Video & Media Productions",
    "resource.from": "Produced by",
    "resource.ranked": "and Hun Chet Ministry — free to watch and share.",
    "resource.visitChannel": "Visit YouTube Channel",
    "resource.more": "Explore Core Ministry Resources",
    "resource.moreSub": "Deepen your knowledge of scripture, discover library books, and connect with the ministry.",
    "resource.views": "views",
    "resource.play": "Watch video",
    "resource.explore": "Explore archive →",
    "resource.filterAll": "All Productions",
    "resource.filterFilms": "Gospel Short Films",
    "resource.filterWorship": "Sanctuary Worship",
    "resource.filterTeaching": "Biblical Teaching",
    "resource.filterQuestions": "Life Questions & Apologetics",
    "resource.searchPlaceholder": "Search videos by title, topic, or keyword...",
    "resource.featuredBadge": "Featured Ministry Production",
    "resource.watchNow": "Watch Production",
    "resource.watchOnYoutube": "Watch on YouTube",
    "resource.statVideos": "12 Video Productions",
    "resource.statViews": "100K+ Viewers Reached",
    "resource.statProduction": "True Friend & CV Ministry",
    "resource.statFree": "100% Free Public Access",
    "resource.noResults": "No videos found matching your search.",
    "resource.resetFilter": "Reset search & filters",
    "resource.missionTitle": "Digital Ministry with Eternal Purpose",
    "resource.missionBody":
      "Reaching people right where they are across Cambodia through honest storytelling, sound biblical exposition, and pastoral discipleship.",
    "resource.missionBtn": "Subscribe to YouTube Channel",

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

    "about.eyebrow": "Personal Story & Calling",
    "about.title": "About Me",
    "about.intro":
      "Personal journey, calling, and ministry dedicated to scripture, truth, and the Cambodian church.",
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
    "tl.2025.title": "Leading a ministry, and writing for one",
    "tl.2025.org": "Hun Chet Ministry · CV",
    "tl.2025.body":
      "Now serving as Ministry Lead — directing outreach, Sunday services, and the discipleship of a growing congregation — while working as a Social Media Specialist at CV on localized outreach to Buddhist communities. hunchet.blog is where both worlds meet.",

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
    "nav.devotions": "ព្រះបន្ទូលប្រចាំថ្ងៃ",
    "nav.gallery": "រូបភាព",
    "nav.library": "បណ្ណាល័យ",
    "nav.resource": "ធនធាន",
    "nav.article": "អត្ថបទ",
    "nav.about": "អំពីខ្ញុំ",
    "nav.partner": "ចូលរួមជាមួយយើង",
    "nav.contact": "ទំនាក់ទំនង",
    "lang.switch": "ប្តូរភាសា",

    "common.readMore": "អានបន្ត →",
    "common.explore": "មើលបន្ថែម →",
    "common.loadError": "មិនអាចទាញអត្ថបទពី WordPress បានទេ៖",

    "footer.tagline":
      "ប្លុកផ្ទាល់ខ្លួនរបស់លោកគ្រូ ហ៊ុន ចិត្ត — ចែករំលែកព្រះបន្ទូល ជំនឿ និងការបណ្តុះសិស្ស ដើម្បីនាំចិត្តមនុស្សទៅរកព្រះយេស៊ូវ។",
    "footer.explore": "មើលបន្ថែម",
    "footer.getInTouch": "ទំនាក់ទំនង",
    "footer.topics": "ប្រធានបទ",
    "footer.sendMessage": "ផ្ញើសារ",
    "footer.rights": "រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    "home.eyebrow": "លោកគ្រូ ហ៊ុន ចិត្ត • ប្លុកផ្ទាល់ខ្លួនផ្លូវការ",
    "home.title": "ចាក់ឬសក្នុងជំនឿ • ចែករំលែកសេចក្តីពិតនៃព្រះគ្រីស្ទ",
    "home.sub":
      "ការបង្រៀនព្រះគម្ពីរ អត្ថបទសញ្ជឹងគិត ដំណើរជីវិត និងការបណ្តុះសិស្ស ក្នុងប្លុកផ្ទាល់ខ្លួនរបស់លោកគ្រូ ហ៊ុន ចិត្ត។",
    "home.readArticles": "អានអត្ថបទ និងការបង្រៀន",
    "home.aboutUs": "ស្វែងយល់បន្ថែមអំពីខ្ញុំ",
    "home.whatWeDo": "បេសកកម្ម និងការបម្រើព្រះ",
    "home.whatWeDoTitle": "ចាក់ឬសក្នុងព្រះបន្ទូល រីកចម្រើនក្នុងជំនឿ និងបម្រើដោយក្តីស្រឡាញ់",
    "home.latest": "ថ្មីៗ",
    "home.recent": "អត្ថបទថ្មីៗ",
    "home.recentSub":
      "ការចែករំលែកថ្មីៗ អំពីជំនឿ ព្រះបន្ទូល និងជីវិតប្រចាំថ្ងៃ។",
    "home.viewAll": "មើលអត្ថបទទាំងអស់",
    "home.explore": "មើលបន្ថែម",
    "home.exploreTitle": "ធនធានសិក្សា និងការស្វែងយល់បន្ថែម",
    "home.connect": "ទាក់ទងមកខ្ញុំបាទ",
    "home.connectTitle":
      "ការប្រឹក្សាខាងវិញ្ញាណ និងសំណូមពរអធិស្ឋាន",
    "home.connectSub":
      "ខ្ញុំបាទរីករាយនឹងស្វាគមន៍ និងអធិស្ឋានជូនបងប្អូនជានិច្ច តាមរយៈ Telegram ឬទូរស័ព្ទផ្ទាល់។",
    "home.getInTouch": "ទាក់ទងមកខ្ញុំបាទ",

    "band.ministry": "កិច្ចការបម្រើព្រះ",
    "band.ministryTitle": "ដឹកនាំសហគមន៍ឱ្យរីកចម្រើនក្នុងព្រះគ្រីស្ទ",
    "band.ministryBody":
      "បម្រើជាអ្នកដឹកនាំកិច្ចការព័ន្ធកិច្ច — ដឹកនាំការចុះជួយសហគមន៍ ការថ្វាយបង្គំថ្ងៃអាទិត្យ និងកសាងព័ន្ធកិច្ចឱ្យរឹងមាំ ទាំងខាងវិញ្ញាណ និងលើអនឡាញ។",
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
    "library.format": "ទម្រង់ឯកសារ",
    "library.pages": "ចំនួនទំព័រ",
    "library.fileSize": "ទំហំឯកសារ",
    "library.edition": "ការបោះពុម្ព",
    "library.shelfView": "ធ្នើសៀវភៅបណ្ណាល័យ",
    "library.catalogView": "កាតាឡុកសិក្សា",
    "library.lookInside": "បើកមើលសៀវភៅ",
    "library.quickPreview": "អានសាកល្បង",
    "library.closePreview": "បិទផ្ទាំងមើល",
    "library.viewToggle": "របៀបបង្ហាញ",
    "library.shelfBrassTag": "បណ្ណាល័យទេវវិទ្យា ហ៊ុន ចិត្ត • បណ្ណសារឥតគិតថ្លៃ",
    "library.shelfNotice": "សូមចុចលើសៀវភៅណាមួយ ដើម្បីបើកមើលមាតិកា អានសាកល្បង ឬទាញយក។",


    "post.readingRoom": "បន្ទប់អានព្រះបន្ទូល",
    "post.minRead": "នាទីអាន",
    "post.authorPreacher": "អំពីអ្នកទេសនា និងអ្នកនិពន្ធ",
    "post.backAll": "← ត្រឡប់ទៅកាន់អត្ថបទទាំងអស់",
    "post.studyLibrary": "បណ្ណាល័យសិក្សា",
    "post.videoArchives": "បណ្ណសារវីដេអូ",

    "resource.eyebrow": "ធនធាន",
    "resource.title": "ធនធានវីដេអូ និងការផ្សាយដំណឹងល្អ",
    "resource.intro":
      "កម្រងវីដេអូដំណឹងល្អ ខ្សែភាពយន្តខ្លី និងការបង្រៀនព្រះគម្ពីរ ដើម្បីលើកទឹកចិត្ត និងកសាងជីវិតជំនឿ។",
    "resource.badge": "វីដេអូ និងមាតិកាផ្សាយដំណឹងល្អ",
    "resource.mostWatched": "វីដេអូ និងសារដំណឹងល្អ",
    "resource.from": "ផលិតដោយ",
    "resource.ranked": "និងការចែករំលែករបស់លោកគ្រូ ហ៊ុន ចិត្ត — ទស្សនា និងចែករំលែកដោយឥតគិតថ្លៃ។",
    "resource.visitChannel": "ទស្សនាឆានែល YouTube",
    "resource.more": "រុករកធនធានព័ន្ធកិច្ចសំខាន់ៗ",
    "resource.moreSub": "ពង្រីកការយល់ដឹងពីព្រះគម្ពីរ ស្វែងរកសៀវភៅបណ្ណាល័យ និងភ្ជាប់ទំនាក់ទំនងជាមួយព័ន្ធកិច្ច។",
    "resource.views": "ដងមើល",
    "resource.play": "ទស្សនាវីដេអូ",
    "resource.explore": "រុករកបណ្ណសារ →",
    "resource.filterAll": "វីដេអូទាំងអស់",
    "resource.filterFilms": "ភាពយន្តខ្លីដំណឹងល្អ",
    "resource.filterWorship": "ការថ្វាយបង្គំក្នុងព្រះវិហារ",
    "resource.filterTeaching": "ការបង្រៀនព្រះគម្ពីរ",
    "resource.filterQuestions": "សំណួរជីវិត និងជំនឿ",
    "resource.searchPlaceholder": "ស្វែងរកវីដេអូតាមចំណងជើង ប្រធានបទ ឬពាក្យគន្លឹះ...",
    "resource.featuredBadge": "វីដេអូដំណឹងល្អពិសេស",
    "resource.watchNow": "ទស្សនាឥឡូវនេះ",
    "resource.watchOnYoutube": "ទស្សនានៅលើ YouTube",
    "resource.statVideos": "១២ វីដេអូដំណឹងល្អ",
    "resource.statViews": "អ្នកទស្សនាជាង ១០ ម៉ឺននាក់",
    "resource.statProduction": "សហការជាមួយ True Friend & CV",
    "resource.statFree": "បើកទូលាយដោយឥតគិតថ្លៃ ១០០%",
    "resource.noResults": "រកមិនឃើញវីដេអូដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
    "resource.resetFilter": "កំណត់ការស្វែងរក និងតម្រងឡើងវិញ",
    "resource.missionTitle": "ការផ្សាយដំណឹងល្អតាមប្រព័ន្ធឌីជីថល",
    "resource.missionBody":
      "ចែករំលែកសេចក្តីពិតនៃព្រះគ្រីស្ទដល់បងប្អូនខ្មែរគ្រប់ទីកន្លែង តាមរយៈការនិទានរឿងដ៏ស្មោះត្រង់ ការពន្យល់ព្រះបន្ទូល និងការបណ្តុះសិស្ស។",
    "resource.missionBtn": "ជាវឆានែល YouTube ផ្លូវការ",

    "card.articles": "អត្ថបទ និងសេចក្តីលើកទឹកចិត្ត",
    "card.articlesDesc":
      "ការចែករំលែកអំពីជំនឿ ព្រះបន្ទូល ការអធិស្ឋាន និងជីវិតប្រចាំថ្ងៃ។",
    "card.library": "បណ្ណាល័យ",
    "card.libraryDesc":
      "សៀវភៅ សៀវភៅពន្យល់ព្រះគម្ពីរ និងធនធានសិក្សា — អានតាមអនឡាញ ឬទាញយក។",
    "card.topics": "មើលតាមប្រធានបទ",
    "card.topicsDesc":
      "អត្ថបទចាត់តាមប្រធានបទ — ជំនឿ ការលើកទឹកចិត្ត ប្រវត្តិក្រុមជំនុំ និងច្រើនទៀត។",
    "card.contact": "ទំនាក់ទំនងលោកគ្រូ ហ៊ុន ចិត្ត",
    "card.contactDesc":
      "សំណូមពរឱ្យអធិស្ឋានជូន សំណួរ ឬការអញ្ជើញឱ្យទៅចែករំលែក។",

    "articles.eyebrow": "ការបង្រៀន និងអត្ថបទ",
    "articles.title": "អត្ថបទ",
    "articles.intro":
      "អត្ថបទបង្រៀនព្រះគម្ពីរ ការពន្យល់ព្រះបន្ទូល និងការលើកទឹកចិត្តសម្រាប់ដំណើរជីវិតគ្រីស្ទបរិស័ទ។",
    "articles.empty": "មិនទាន់មានអត្ថបទនៅឡើយទេ — សូមមកមើលម្តងទៀតឆាប់ៗ។",

    "contact.eyebrow": "ទំនាក់ទំនង",
    "contact.title": "ទំនាក់ទំនងលោកគ្រូ ហ៊ុន ចិត្ត",
    "contact.intro":
      "ប្រសិនបើបងប្អូនមានសំណួរអំពីព្រះគម្ពីរ ត្រូវការការប្រឹក្សាខាងវិញ្ញាណ ឬចង់ឱ្យអធិស្ឋានជូន សូមកុំស្ទាក់ស្ទើរក្នុងការទាក់ទងមកខ្ញុំបាទ។",

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
      "ដើម្បីសុវត្ថិភាព សូមប្រើតែព័ត៌មានដែលបានបញ្ជាក់តាម Telegram ឬ Facebook ផ្លូវការរបស់លោកគ្រូ ហ៊ុន ចិត្ត។ យើងខ្ញុំមិនដែលស្នើសុំលេខសម្ងាត់ លេខ PIN ឬលេខកូដផ្ទៀងផ្ទាត់ផ្ទាល់ខ្លួនរបស់បងប្អូនឡើយ។",
    "partner.otherEyebrow": "វិធីផ្សេងទៀតដើម្បីចូលរួម",
    "partner.otherTitle": "ការចូលរួម មិនមែនមានតែការថ្វាយប្រាក់ទេ",
    "partner.otherIntro":
      "ការអធិស្ឋាន ការចែករំលែកបន្ត និងការសហការរបស់បងប្អូន សុទ្ធតែជាកម្លាំងចិត្តដ៏ធំធេងសម្រាប់កិច្ចការបម្រើព្រះ។",
    "partner.other.pray.title": "អធិស្ឋានជាមួយយើងខ្ញុំ",
    "partner.other.pray.body":
      "សូមជួយអធិស្ឋានសម្រាប់ប្រាជ្ញា ការបង្រៀនព្រះបន្ទូលដោយស្មោះត្រង់ និងការបើកផ្លូវក្នុងការផ្សាយដំណឹងល្អនៅកម្ពុជា។",
    "partner.other.share.title": "ចែករំលែកព្រះបន្ទូល",
    "partner.other.share.body":
      "ណែនាំធនធាន និងអត្ថបទទាំងនេះទៅកាន់ក្រុមជំនុំ មិត្តភក្តិ ឬក្រុមគ្រួសារ ដើម្បីនាំក្តីសង្ឃឹមទៅកាន់មនុស្សជាច្រើនទៀត។",
    "partner.other.collaborate.title": "ការសហការក្នុងព័ន្ធកិច្ច",
    "partner.other.collaborate.body":
      "អញ្ជើញលោកគ្រូ ហ៊ុន ចិត្ត ទៅចូលរួមចែករំលែកព្រះបន្ទូល បង្រៀនព្រះគម្ពីរ ឬសហការក្នុងគម្រោងកិច្ចការបម្រើព្រះ។",
    "partner.finalEyebrow": "ទំនាក់ទំនងសាកសួរ",
    "partner.finalTitle": "មានសំណួរអំពីការចូលរួមចំណែក?",
    "partner.finalBody":
      "ខ្ញុំបាទរីករាយនឹងឆ្លើយតបនូវរាល់សំណួរទាក់ទងនឹងកិច្ចការបម្រើព្រះ ឬឱកាសនៃការសហការជាមួយគ្នា។",
    "partner.finalCta": "ទាក់ទងមកខ្ញុំបាទ",

    "about.eyebrow": "ដំណើរជីវិត និងការត្រាស់ហៅ",
    "about.title": "អំពីខ្ញុំ",
    "about.intro":
      "ដំណើរជីវិត ការត្រាស់ហៅក្នុងកិច្ចការបម្រើព្រះ និងបេះដូងដ៏ស្មោះត្រង់ចំពោះការរីកចម្រើននៃក្រុមជំនុំនៅកម្ពុជា។",
    "about.quote":
      "«ខ្ញុំមិនដែលគិតចង់ធ្វើអ្វីឱ្យធំដុំនោះឡើយ។ ខ្ញុំគ្រាន់តែប្រាថ្នាចង់បម្រើព្រះ និងបង្រៀនព្រះបន្ទូលទ្រង់ឱ្យបានស្មោះត្រង់បំផុត ហើយព្រះអម្ចាស់ទ្រង់ផ្ទាល់ជាអ្នកបើកផ្លូវ និងពង្រីកព្រំដែនបន្តិចម្តងៗ។»",
    "about.lifeStory": "ដំណើរជីវិត",
    "about.road": "ដំណើរនៃការបម្រើព្រះ",
    "about.stat1": "ឆ្នាំក្នុងកិច្ចការបម្រើព្រះ",
    "about.stat2": "ឆ្នាំបង្រៀនប្រវត្តិក្រុមជំនុំ",
    "about.stat3": "ក្រុមជំនុំដែលបានបម្រើ",
    "about.guides": "គោលការណ៍ជីវិត",
    "about.believe": "អ្វីដែលខ្ញុំជឿ និងប្រកាន់ខ្ជាប់",
    "about.seeGallery": "មើលរូបភាពនៃការបម្រើ",
    "about.whoWrites": "អ្នកនិពន្ធផ្លូវការ",
    "about.meet": "ស្គាល់លោកគ្រូ ហ៊ុន ចិត្ត",

    "tl.2013.title": "កន្លែងដែលចាប់ផ្តើមដំបូង",
    "tl.2013.org": "ក្រុមជំនុំក្តីសង្ឃឹមថ្មី ដូងព្រែង",
    "tl.2013.body":
      "ចាប់ផ្តើមពីការចូលរួមថ្វាយបង្គំថ្ងៃអាទិត្យ ក្លាយទៅជាការបម្រើព្រះយ៉ាងស្មោះត្រង់ជាងដប់ឆ្នាំ — ជួយរៀបចំការជួបជុំ ដឹកនាំការថ្វាយបង្គំ និងរៀនទទួលបន្ទុកអធិស្ឋានជូនអ្នកដទៃ។",
    "tl.2019.title": "បង្រៀនប្រវត្តិក្រុមជំនុំដល់អ្នកដឹកនាំជំនាន់ក្រោយ",
    "tl.2019.org": "វិទ្យាស្ថានទេវវិទ្យាព្រេស្បីទេរៀនកម្ពុជា",
    "tl.2019.body":
      "បានទទួលការអញ្ជើញឱ្យបង្រៀនមុខវិជ្ជាប្រវត្តិក្រុមជំនុំសម័យដើម។ ការឈរនៅចំពោះមុខអ្នកគង្វាល និងអ្នកដឹកនាំនាពេលអនាគត បានបង្រៀនខ្ញុំថា ក្រុមជំនុំកម្ពុជាត្រូវការចាក់ឬសក្នុងសេចក្តីពិត និងយល់ដឹងពីប្រវត្តិសាស្ត្រជំនឿដ៏រឹងមាំ។",
    "tl.2021.title": "ការផ្សាយដំណឹងល្អតាមប្រព័ន្ធឌីជីថល",
    "tl.2021.org": "Christian Vision (CV) — ផ្នែកផលិតមាតិកាឌីជីថល",
    "tl.2021.body":
      "ចូលរួមជាមួយអង្គការ Christian Vision (CV) ដើម្បីដឹកនាំយុទ្ធសាស្ត្រមាតិកាផ្សាយដំណឹងល្អតាមប្រព័ន្ធឌីជីថល។ សរសេរ ផលិត និងដឹកនាំវីដេអូខ្លីៗ — ដោយរៀនចែករំលែកសេចក្តីពិតនៃព្រះយេស៊ូវគ្រីស្ទឱ្យប៉ះដល់ចិត្តមនុស្សក្នុងសម័យបច្ចេកវិទ្យា។",
    "tl.2024.title": "ការចែករំលែកបទពិសោធន៍ដល់អ្នកដឹកនាំក្រុមជំនុំ",
    "tl.2024.org": "EFC — សម្ព័ន្ធគ្រីស្ទបរិស័ទកម្ពុជា",
    "tl.2024.body":
      "បានចែករំលែកគំរូកិច្ចការផ្សាយដំណឹងល្អលើអនឡាញរបស់ CV ដល់អ្នកគង្វាល និងអ្នកដឹកនាំក្រុមជំនុំមកពីទូទាំងប្រទេសកម្ពុជា។ ការបញ្ចប់ការបម្រើជាងដប់ឆ្នាំនៅដូងព្រែងក្នុងឆ្នាំដដែល បានបើកផ្លូវឆ្ពោះទៅកាន់ដំណាក់កាលថ្មីនៃការបម្រើ។",
    "tl.2025.title": "ដឹកនាំកិច្ចការបម្រើព្រះ និងការចែករំលែកព្រះបន្ទូល",
    "tl.2025.org": "កិច្ចការបម្រើព្រះ លោកគ្រូ ហ៊ុន ចិត្ត • CV",
    "tl.2025.body":
      "បច្ចុប្បន្នដឹកនាំកិច្ចការបង្រៀនព្រះបន្ទូល ការផ្សាយដំណឹងល្អ និងការបណ្តុះសិស្ស — ព្រមទាំងបម្រើការងារផលិតមាតិកានៅ CV។ គេហទំព័រ hunchet.blog នេះត្រូវបានបង្កើតឡើងដើម្បីកត់ត្រា និងចែករំលែកសេចក្តីពិតទាំងអស់នេះដល់បងប្អូន។",

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
// Defaults to Khmer, falling back to English rather than showing a raw key.
export function useT() {
  const { locale } = useRouter();
  const currentLocale = locale || "km";
  const table = strings[currentLocale] || strings.km || strings.en;
  return (key) => table[key] ?? strings.km[key] ?? strings.en[key] ?? key;
}

export function useLocale() {
  const { locale } = useRouter();
  return locale || "km";
}

// Picks the right translation from a { en, km, ko, zh } pair on bilingual
// content records, prioritizing the requested locale, falling back to Khmer, then English.
export function pick(value, locale) {
  if (value && typeof value === "object") {
    const loc = locale || "km";
    return value[loc] ?? value.km ?? value.en;
  }
  return value;
}
