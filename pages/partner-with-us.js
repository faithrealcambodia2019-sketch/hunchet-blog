import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { useT } from "../lib/i18n";

export default function PartnerWithUs() {
  const t = useT();

  return (
    <>
      <Head>
        <title>{`${t("partner.title")} — Hun Chet`}</title>
        <meta name="description" content={t("partner.intro")} />
      </Head>

      <SiteHeader />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("partner.eyebrow")}</span>
          <h1>{t("partner.title")}</h1>
          <p>{t("partner.intro")}</p>
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
