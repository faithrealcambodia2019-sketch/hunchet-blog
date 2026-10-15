import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { PhoneIcon, TelegramIcon, FacebookIcon, GlobeIcon, MapPinIcon } from "../components/Icons";
import { useT, useLocale } from "../lib/i18n";
import { PORTRAIT } from "../lib/media";

export default function Contact() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <>
      <Head>
        <title>{`${isKm ? "ទំនាក់ទំនងលោកគ្រូ ហ៊ុន ចិត្ត" : "Contact Leader Hun Chet"} — ${isKm ? "ប្លុកផ្ទាល់ខ្លួន" : "Personal Blog"}`}</title>
        <meta
          name="description"
          content={
            isKm
              ? "ទាក់ទងលោកគ្រូ ហ៊ុន ចិត្ត ដោយផ្ទាល់ សម្រាប់ការប្រឹក្សាខាងវិញ្ញាណ សំណួរព្រះគម្ពីរ ការអញ្ជើញចែករំលែក ឬសំណើអធិស្ឋាន។"
              : "Connect directly with Leader Hun Chet for spiritual counseling, biblical inquiries, speaking invitations, or prayer requests."
          }
        />
      </Head>

      <SiteHeader />

      {/* Stately Personal Blog Hero — Clean Classic Editorial */}
      <section className="sanctuary-hero">
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "ការប្រឹក្សា និងការអធិស្ឋាន" : "Counseling & Prayer Requests"}</span>
          </div>
          <h1 className="sanctuary-hero-title">
            {isKm ? "ទំនាក់ទំនងលោកគ្រូ ហ៊ុន ចិត្ត" : "Contact Leader Hun Chet"}
          </h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "លោកគ្រូ ហ៊ុន ចិត្ត • ទំនាក់ទំនងដោយផ្ទាល់"
              : "Leader Hun Chet • Personal Fellowship"}
          </p>
          <p className="sanctuary-hero-lead">
            {isKm
              ? "ប្រសិនបើបងប្អូនមានសំណួរអំពីព្រះគម្ពីរ ត្រូវការការប្រឹក្សាខាងវិញ្ញាណ ឬចង់ឱ្យអធិស្ឋានជូន សូមកុំស្ទាក់ស្ទើរក្នុងការទាក់ទងមកខ្ញុំបាទ។"
              : "If you have biblical questions, need pastoral prayer, or would like to connect for ministry, please feel free to reach out directly."}
          </p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">096 687 5886</span>
              <span className="sanctuary-stat-label">
                {isKm ? "លេខទូរស័ព្ទផ្ទាល់" : "Direct Phone"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Telegram</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ផ្ញើសារផ្ទាល់ខ្លួន" : "Direct Message"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">{isKm ? "ភ្នំពេញ" : "Phnom Penh"}</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ទីតាំងបម្រើការងារ" : "Ministry Base"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Direct Contact Methods */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="eyebrow">
              {isKm ? "បណ្តាញទំនាក់ទំនង" : "Ways to Connect"}
            </span>
            <h2>{isKm ? "ជ្រើសរើសមធ្យោបាយទាក់ទង" : "Get in Touch Directly"}</h2>
            <hr className="rule" />
            <p style={{ maxWidth: 660, margin: "0.75rem auto 0", color: "var(--muted)" }}>
              {isKm
                ? "អ្នកអាចទាក់ទងមកខ្ញុំដោយផ្ទាល់តាមរយៈទូរស័ព្ទ Telegram ឬផ្ញើសារតាម Facebook។ ខ្ញុំនឹងឆ្លើយតបឱ្យបានឆាប់រហ័សបំផុត។"
                : "Feel free to reach out via phone, Telegram, or Facebook Messenger. I look forward to connecting with you."}
            </p>
          </div>

          <div className="contact-schedule-grid" style={{ maxWidth: 1000, margin: "0 auto" }}>
            {/* 1. Phone Card */}
            <div className="contact-schedule-card" style={{ textAlign: "center", padding: "2.5rem 1.75rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(184, 155, 94, 0.15)",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <PhoneIcon width="24" height="24" />
              </div>
              <span className="contact-schedule-badge">
                {isKm ? "ទូរស័ព្ទផ្ទាល់" : "Phone Call"}
              </span>
              <h3 style={{ margin: "0.5rem 0" }}>096 687 5886</h3>
              <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                {isKm
                  ? "ទំនាក់ទំនងតាមទូរស័ព្ទសម្រាប់កិច្ចការបន្ទាន់ ឬការសន្ទនាផ្ទាល់។"
                  : "Call directly for urgent ministry inquiries or direct personal conversation."}
              </p>
              <a href="tel:0966875886" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
                {isKm ? "ហៅទូរស័ព្ទឥឡូវនេះ" : "Call Now"}
              </a>
            </div>

            {/* 2. Telegram Card */}
            <div className="contact-schedule-card" style={{ textAlign: "center", padding: "2.5rem 1.75rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(14, 165, 233, 0.15)",
                  color: "#0ea5e9",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <TelegramIcon width="24" height="24" />
              </div>
              <span className="contact-schedule-badge" style={{ background: "rgba(14, 165, 233, 0.15)", color: "#0ea5e9" }}>
                Telegram
              </span>
              <h3 style={{ margin: "0.5rem 0" }}>+855 96 687 5886</h3>
              <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                {isKm
                  ? "ផ្ញើសារ Telegram ផ្ទាល់ខ្លួន សម្រាប់សំណួរ ឬការចែករំលែកឯកសារ។"
                  : "Send a direct message on Telegram for quick answers, prayer, or documents."}
              </p>
              <a
                href="https://t.me/+855966875886"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: "0.82rem", background: "#0ea5e9" }}
              >
                {isKm ? "ផ្ញើសារ Telegram" : "Open Telegram"}
              </a>
            </div>

            {/* 3. Facebook Card */}
            <div className="contact-schedule-card" style={{ textAlign: "center", padding: "2.5rem 1.75rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(24, 119, 242, 0.15)",
                  color: "#1877f2",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <FacebookIcon width="24" height="24" />
              </div>
              <span className="contact-schedule-badge" style={{ background: "rgba(24, 119, 242, 0.15)", color: "#1877f2" }}>
                Facebook Page
              </span>
              <h3 style={{ margin: "0.5rem 0" }}>Hun Chet</h3>
              <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                {isKm
                  ? "តាមដានទំព័រ Facebook ផ្លូវការ និងផ្ញើសារតាម Messenger។"
                  : "Follow official updates, new articles, and message directly via Messenger."}
              </p>
              <a
                href="https://www.facebook.com/hunchet2024/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: "0.82rem", background: "#1877f2" }}
              >
                {isKm ? "មើលទំព័រ Facebook" : "View Facebook"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Author Card & Fellowship */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-head" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow">{isKm ? "អំពីម្ចាស់ប្លុក" : "About the Author"}</span>
            <h2>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}</h2>
            <hr className="rule" />
          </div>

          <AuthorCard />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
