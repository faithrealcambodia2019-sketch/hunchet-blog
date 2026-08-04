import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — hunchet.blog</title>
        <meta
          name="description"
          content="Get in touch with Hun Chet — phone, Telegram, and Facebook."
        />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="page-header">
          <h1>Get in touch</h1>
          <p>
            Questions, prayer requests, or just want to say hello? Reach out
            through any of the channels below.
          </p>
        </section>

        <AuthorCard />
      </main>

      <SiteFooter />
    </>
  );
}
