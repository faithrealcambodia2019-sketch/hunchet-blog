import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Hun Chet</title>
        <meta
          name="description"
          content="Get in touch with Hun Chet — phone, Telegram, and Facebook."
        />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Connect</span>
          <h1>Get in Touch</h1>
          <p>
            Questions, prayer requests, or just want to say hello? Reach out
            through any of the channels below.
          </p>
        </div>
      </section>

      <main className="section">
        <div className="container-narrow">
          <AuthorCard />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
