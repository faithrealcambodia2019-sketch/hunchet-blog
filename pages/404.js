import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import { useLocale } from "../lib/i18n";
import { ArrowUpRight } from "../components/Icons";

export default function Custom404() {
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <div className="oc-site">
      <Head>
        <title>{isKm ? "រកមិនឃើញទំព័រ — ហ៊ុន ចិត្ត" : "Page Not Found — Hun Chet"}</title>
      </Head>

      <SiteHeader />

      <main>
        <SubpageHero
          bgImage="/images/pastors-pulpit.jpg"
          kicker="404 ERROR"
          title={isKm ? "រកមិនឃើញទំព័រ" : "Page Not Found"}
          subtitle={
            isKm
              ? "ទំព័រដែលលោកអ្នកកំពុងស្វែងរក មិនមាន ឬត្រូវបានផ្លាស់ប្តូរទីតាំង។"
              : "The page you are looking for does not exist or has been moved."
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: "404" },
          ]}
          stats={[
            { number: "404", label: isKm ? "កំហុស" : "Error" },
            { number: "24/7", label: isKm ? "បម្រើព្រះ" : "Ministry" },
            { number: "Hun Chet", label: isKm ? "គេហទំព័រ" : "Website" },
          ]}
        />

        <section className="oc-section" style={{ background: "#ffffff", paddingBlock: "5rem", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <span className="oc-eyebrow" style={{ display: "block", marginBottom: "1rem" }}>
              {isKm ? "សូមអភ័យទោស" : "We're Sorry"}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: "#141716",
                margin: "0 0 1.25rem",
              }}
            >
              {isKm ? "តើលោកអ្នកចង់ទៅកាន់ទីណា?" : "Where would you like to go?"}
            </h2>
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.75, margin: "0 0 2.5rem" }}>
              {isKm
                ? "សូមជ្រើសរើសផ្នែកណាមួយខាងក្រោម ដើម្បីបន្តដំណើរការអាន ឬរុករកធនធានព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
                : "Please select an option below to continue exploring Leader Hun Chet's ministry resources and biblical teachings."}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/" className="oc-button oc-solid">
                <span>{isKm ? "ត្រឡប់ទៅទំព័រដើម" : "Return to Home"}</span>
                <ArrowUpRight width={12} height={12} />
              </Link>
              <Link href="/articles" className="oc-button oc-outline-dark">
                <span>{isKm ? "អានអត្ថបទទាំងអស់" : "Browse Articles"}</span>
              </Link>
              <Link href="/devotions" className="oc-button oc-outline-dark">
                <span>{isKm ? "ព្រះបន្ទូលប្រចាំថ្ងៃ" : "Daily Devotions"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
