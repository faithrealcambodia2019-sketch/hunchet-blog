import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { useT } from "../lib/i18n";

export default function Contact() {
  const t = useT();

  return (
    <>
      <Head>
        <title>{`${t("contact.title")} — Hun Chet`}</title>
        <meta name="description" content={t("contact.intro")} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.intro")}</p>
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
