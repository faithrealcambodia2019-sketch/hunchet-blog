// Central list of ministry photography, sourced from the WordPress media
// library. Keeping the URLs in one place means the gallery, life story,
// homepage and article fallbacks all stay in sync.

export const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

export const LOGO = "/images/hun-chet.jpg";
export const PORTRAIT = "/images/hun-chet.jpg";
export const CHURCH_LOGO = "/logo.png";
export const HERO_COVER = "/images/hero-cover.jpg";
export const PASTORS_PULPIT = "/images/pastors-pulpit.jpg";
export const CHURCH_FAMILY = "/images/church-family.jpg";
export const BAPTISM_PHOTO = "/images/baptism-2026-family-group.jpg";
export const YOUTH_PHOTO = "/images/youth-fellowship-2025-group.jpg";
export const WORSHIP_PHOTO = "/images/worship-service.jpg";

// Full portrait (head to shoulders, uncropped)
export const FAVICON = "/favicon.svg";
export const APPLE_ICON = "/images/hun-chet.jpg";

export const ALBUMS = [
  {
    id: "anc",
    name: "Hun Chet Ministry",
    years: "2025 — Present",
    note: "Leading worship, discipleship and outreach as Ministry Lead.",
    photos: [
      { src: "/images/pastors-pulpit.jpg", caption: "Pastor Kim Jong Ho and Leader Hun Chet preaching from the pulpit", size: "wide" },
      { src: "/images/church-family.jpg", caption: "Hun Chet Ministry family gathered together in worship" },
      { src: "/images/baptism-2026-family-group.jpg", caption: "Church family celebrating holy water baptism", size: "wide" },
      { src: "/images/baptism-2026-water-immersion.jpg", caption: "Senior Pastor Kim and Leader Hun Chet baptizing believers in Christ" },
      { src: "/images/worship-service.jpg", caption: "Sunday worship and heartfelt praise in the sanctuary" },
      { src: "/images/youth-fellowship-2025-group.jpg", caption: "Youth fellowship gathering, outdoor praise and discipleship", size: "wide" },
      { src: "/images/sunday-school-community.jpg", caption: "Sunday School & Kids Ministry community" },
      { src: "/images/history-prayer-fellowship.jpg", caption: "Prayer & discipleship fellowship" },
      { src: "/images/hero-cover.jpg", caption: "Praise and worship team leading the sanctuary" },
      { src: `${MEDIA}/5d72f-img_0564.jpeg`, caption: "Serving as Ministry Lead" },
    ],
  },
  {
    id: "cv",
    name: "CV — Digital Ministry",
    years: "2021 — Present",
    note: "Content Specialist, then Social Media Specialist for localized outreach.",
    photos: [
      { src: `${MEDIA}/8539d-cv-12.jpg`, caption: "Content Specialist — building the foundation" },
      { src: `${MEDIA}/28c79-cv-14.jpg`, caption: "Social Media Specialist, Buddhist outreach team" },
      { src: `${MEDIA}/cddf7-481059789_1321611435728127_993577711556320171_n.jpg`, caption: "Sharing the digital ministry model at EFC", size: "wide" },
      { src: `${MEDIA}/2da36-14.jpg`, caption: "Presenting to pastors and church leaders" },
      { src: `${MEDIA}/a631c-481577673_1321022952453642_5665127949675965574_n.jpg`, caption: "Directing a short film" },
      { src: `${MEDIA}/a0ab0-481471242_1321022945786976_5359368866106775056_n.jpg`, caption: "On set" },
      { src: `${MEDIA}/9cd16-12.jpg`, caption: "Filming for digital outreach" },
      { src: `${MEDIA}/bd941-13.jpg`, caption: "With the production crew" },
      { src: `${MEDIA}/b148b-15.jpg`, caption: "Behind the scenes" },
    ],
  },
  {
    id: "doungpreng",
    name: "Doung Preng New Hope Church",
    years: "2013 — 2024",
    note: "More than a decade of fellowship, worship and ministry service.",
    photos: [
      { src: `${MEDIA}/3e318-480881109_1312891476600123_6738146868473818701_n.jpg`, caption: "Doung Preng New Hope Church", size: "wide" },
      { src: `${MEDIA}/58af6-607212187_1549137416308860_1554347355792842993_n.jpg`, caption: "Church fellowship" },
      { src: `${MEDIA}/68a15-4.jpg`, caption: "Worship gathering" },
      { src: `${MEDIA}/22101-5.jpg`, caption: "Serving together" },
      { src: `${MEDIA}/1c3f2-8.jpg`, caption: "The church family" },
    ],
  },
  {
    id: "teaching",
    name: "Theology Institute",
    years: "2019 — 2024",
    note: "Lecturer in Early Church History, Cambodia Presbyterian Theology Institute.",
    photos: [
      { src: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg`, caption: "Lecturing on Early Church History", size: "wide" },
      { src: `${MEDIA}/2d610-11.jpg`, caption: "In the classroom" },
      { src: `${MEDIA}/3e85b-10.jpg`, caption: "Equipping future Christian leaders" },
    ],
  },
];

// Flat list used for article fallbacks when a post has no featured image.
export const FALLBACK_IMAGES = [
  `${MEDIA}/e5ee6-img_0270.jpeg`,
  `${MEDIA}/9fe4e-img_0972.jpeg`,
  `${MEDIA}/6ff1d-img_0266.jpeg`,
  `${MEDIA}/66666-img_0549.jpeg`,
  `${MEDIA}/bb8f0-img_0633.jpeg`,
  `${MEDIA}/3e9ab-1.jpg`,
  `${MEDIA}/1c3f2-8.jpg`,
  `${MEDIA}/68a15-4.jpg`,
];

export function fallbackImageFor(key) {
  const str = String(key ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}
