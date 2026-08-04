import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";

export default function About() {
  return (
    <>
      <Head>
        <title>About — hunchet.blog</title>
        <meta
          name="description"
          content="About hunchet.blog — faith, scripture, and everyday reflections from Hun Chet."
        />
      </Head>

      <SiteHeader />

      <main className="container">
        <section className="page-header">
          <h1>About hunchet.blog</h1>
          <p>
            hunchet.blog is a personal space for reflections on faith,
            scripture, and everyday life — written in Khmer and shared here
            for anyone looking for encouragement.
          </p>
        </section>

        <AuthorCard />
      </main>

      <SiteFooter />
    </>
  );
}
