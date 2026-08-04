import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";

const MEDIA = "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — Hun Chet</title>
        <meta
          name="description"
          content="About Hun Chet — ministry, teaching, and a life given to sharing the Gospel."
        />
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

      <main className="section">
        <div className="container">
          <div className="band">
            <div className="band-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${MEDIA}/5d72f-img_0564.jpeg`} alt="" />
            </div>
            <div className="band-body">
              <span className="eyebrow">Purpose</span>
              <h3>Pointing hearts to Jesus Christ</h3>
              <p>
                hunchet.blog exists to make biblical truth accessible in Khmer —
                through devotionals, teaching, and honest writing about faith in
                everyday life. Whether you are new to the faith or have walked
                with God for decades, this is a place to find encouragement.
              </p>
              <p>
                Alongside writing, the ministry includes leading Sunday
                services, discipling believers, and serving the wider community
                through outreach.
              </p>
            </div>
          </div>

          <div className="band band-reverse">
            <div className="band-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${MEDIA}/e5ee6-img_0270.jpeg`} alt="" />
            </div>
            <div className="band-body">
              <span className="eyebrow">Ministry</span>
              <h3>Serving the local church</h3>
              <p>
                Ministry Lead at All Nations Church, directing community
                outreach and Sunday worship. Previously more than a decade of
                service at Doung Preng New Hope Church, and lecturer in Early
                Church History at the Cambodia Presbyterian Theology Institute.
              </p>
              <Link href="/gallery" className="btn btn-outline">
                See the Gallery
              </Link>
            </div>
          </div>
        </div>
      </main>

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
