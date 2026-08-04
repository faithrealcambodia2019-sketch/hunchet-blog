import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { MEDIA, PORTRAIT } from "../lib/media";

const TIMELINE = [
  {
    year: "2013",
    title: "Where it began",
    org: "Doung Preng New Hope Church",
    body:
      "What started as simply showing up on Sundays grew into more than a decade of service — facilitating fellowship, helping lead worship, and learning what it means to carry the weight of other people's burdens in prayer.",
    image: `${MEDIA}/3e318-480881109_1312891476600123_6738146868473818701_n.jpg`,
  },
  {
    year: "2019",
    title: "Teaching the church its own history",
    org: "Cambodia Presbyterian Theology Institute",
    body:
      "Invited to lecture on Early Church History. Standing in front of future pastors and leaders taught me that the Cambodian church needs more than encouragement — it needs roots, and it needs to know the story it belongs to.",
    image: `${MEDIA}/ef58f-481097535_1317882432767694_175058885625152371_n.jpg`,
  },
  {
    year: "2021",
    title: "Taking the Gospel digital",
    org: "CV — Content Specialist",
    body:
      "Joined CV to build content strategy for digital ministry. Writing, filming, and directing short films — learning how to say something true about Jesus in the few seconds someone gives you while scrolling.",
    image: `${MEDIA}/a631c-481577673_1321022952453642_5665127949675965574_n.jpg`,
  },
  {
    year: "2024",
    title: "Sharing what we learned",
    org: "EFC — Evangelical Fellowship of Cambodia",
    body:
      "Presented CV's digital ministry model to around 400 pastors and church leaders. Closing a decade at Doung Preng the same year was hard, but it made room for what came next.",
    image: `${MEDIA}/cddf7-481059789_1321611435728127_993577711556320171_n.jpg`,
  },
  {
    year: "2025",
    title: "Leading a church, and writing for one",
    org: "All Nations Church · CV",
    body:
      "Now serving as Ministry Lead at All Nations Church — directing outreach, Sunday services, and the discipleship of a growing congregation — while working as a Social Media Specialist at CV on localized outreach to Buddhist communities. hunchet.blog is where both worlds meet.",
    image: `${MEDIA}/bb8f0-img_0633.jpeg`,
  },
];

const VALUES = [
  {
    title: "Scripture first",
    body:
      "Every article, sermon, and post starts with the text. Encouragement that isn't rooted in what God actually said doesn't hold weight when life gets hard.",
  },
  {
    title: "Written in Khmer",
    body:
      "Cambodians shouldn't have to read theology in a second language. Most of what is published here is written in Khmer, for Khmer readers.",
  },
  {
    title: "Honest about difficulty",
    body:
      "Grief, anxiety, failure, and doubt are not signs of weak faith. This is a place where those things get named rather than avoided.",
  },
  {
    title: "For the whole church",
    body:
      "From new believers to pastors and students — the goal is to equip anyone willing to take the next step in following Christ.",
  },
];

export default function About() {
  const description =
    "The story behind hunchet.blog — from Doung Preng New Hope Church to leading All Nations Church, teaching church history, and building digital ministry in Cambodia.";

  return (
    <>
      <Head>
        <title>About Us — Hun Chet</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="About Hun Chet" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Story</span>
          <h1>About Us</h1>
          <p>
            A ministry built on scripture, prayer, and a heart for the Cambodian
            church.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-portrait-wrap">
            <div className="story-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PORTRAIT} alt="Hun Chet" />
            </div>
          </div>

          <div className="story-lede">
            <p>
              &ldquo;I did not set out to build anything. I set out to serve one
              church well — and God kept widening the room.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Life Story</span>
            <h2>The road so far</h2>
            <hr className="rule" />
          </div>

          <div className="timeline">
            {TIMELINE.map((item) => (
              <div className="tl-item" key={item.year}>
                <span className="tl-year">{item.year}</span>
                <h3>{item.title}</h3>
                <span className="tl-org">{item.org}</span>
                <p>{item.body}</p>
                <div className="tl-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <div className="stat-row">
            <div>
              <span className="stat-num">12+</span>
              <span className="stat-label">Years in ministry</span>
            </div>
            <div>
              <span className="stat-num">400</span>
              <span className="stat-label">Leaders reached at EFC</span>
            </div>
            <div>
              <span className="stat-num">5</span>
              <span className="stat-label">Years teaching church history</span>
            </div>
            <div>
              <span className="stat-num">2</span>
              <span className="stat-label">Churches served</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What guides this</span>
            <h2>What we believe about the work</h2>
            <hr className="rule" />
          </div>

          <div className="value-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/gallery" className="btn btn-primary">
              See the Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-narrow">
          <div className="section-head">
            <span className="eyebrow">Who writes here</span>
            <h2>Meet Hun Chet</h2>
            <hr className="rule" />
          </div>
          <AuthorCard />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
