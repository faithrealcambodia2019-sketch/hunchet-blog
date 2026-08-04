// Central list of ministry photography, sourced from the WordPress media
// library. Keeping the URLs in one place means the gallery, life story,
// homepage and article fallbacks all stay in sync.

export const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

export const LOGO = `${MEDIA}/d3270-untitled-design-1-1.png`;
export const PORTRAIT = LOGO;

export const ALBUMS = [
  {
    id: "anc",
    name: "All Nations Church",
    years: "2025 — Present",
    note: "Leading worship, discipleship and outreach as Ministry Lead.",
    photos: [
      { src: `${MEDIA}/bb8f0-img_0633.jpeg`, caption: "The church family gathered together", size: "wide" },
      { src: `${MEDIA}/5d72f-img_0564.jpeg`, caption: "Serving as Ministry Lead" },
      { src: `${MEDIA}/e5ee6-img_0270.jpeg`, caption: "Sunday worship service" },
      { src: `${MEDIA}/9fe4e-img_0972.jpeg`, caption: "Fellowship after the service" },
      { src: `${MEDIA}/6ff1d-img_0266.jpeg`, caption: "Vision and direction for the ministry teams" },
      { src: `${MEDIA}/66666-img_0549.jpeg`, caption: "Growing the mission" },
      { src: `${MEDIA}/4262e-img_20251226_130309_154.jpeg`, caption: "Community outreach" },
      { src: `${MEDIA}/8f09d-16.jpg`, caption: "Community leadership" },
      { src: `${MEDIA}/6a306-535178627_819039420446993_6069438993850481496_n.jpg`, caption: "A gathering of believers" },
      { src: `${MEDIA}/3e9ab-1.jpg`, caption: "Times of worship" },
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
      { src: `${MEDIA}/2da36-14.jpg`, caption: "Presenting to around 400 pastors and leaders" },
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
