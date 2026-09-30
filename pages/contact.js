import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AuthorCard from "../components/AuthorCard";
import { PhoneIcon, TelegramIcon, FacebookIcon } from "../components/Icons";
import { useT, useLocale } from "../lib/i18n";

export default function Contact() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <>
      <Head>
        <title>{`${t("contact.title")} — Hun Chet`}</title>
        <meta name="description" content={t("contact.intro")} />
      </Head>

      <SiteHeader />

      {/* Stately Sanctuary Hero */}
      <section className="sanctuary-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/all-nations-institute-campus.jpg"
          alt="Sanctuary Campus"
          className="sanctuary-hero-bg"
        />
        <div className="sanctuary-hero-overlay" />
        <div className="sanctuary-hero-content">
          <div className="sanctuary-badge-tag">
            <span>{isKm ? "វិទ្យាស្ថាន និងកន្លែងថ្វាយបង្គំព្រះ" : "Sanctuary & Campus Ministry"}</span>
          </div>
          <h1 className="sanctuary-hero-title">{t("contact.title")}</h1>
          <p className="sanctuary-hero-subtitle">
            {isKm
              ? "ការថ្វាយបង្គំព្រះ ការអធិស្ឋាន និងការទាក់ទងកិច្ចការបម្រើព្រះ"
              : "Sanctuary Worship, Midweek Prayer, and Pastoral Inquiries"}
          </p>
          <p className="sanctuary-hero-lead">{t("contact.intro")}</p>

          <div className="sanctuary-stat-strip">
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">10:00 AM</span>
              <span className="sanctuary-stat-label">
                {isKm ? "ថ្វាយបង្គំថ្ងៃអាទិត្យ" : "Sunday Sanctuary Worship"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">6:30 PM</span>
              <span className="sanctuary-stat-label">
                {isKm ? "អធិស្ឋានរៀងរាល់ថ្ងៃពុធ" : "Wednesday Midweek Prayer"}
              </span>
            </div>
            <div className="sanctuary-stat-card">
              <span className="sanctuary-stat-num">Phnom Penh</span>
              <span className="sanctuary-stat-label">
                {isKm ? "រាជធានីភ្នំពេញ" : "Institute Campus Location"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Sanctuary Worship & Gathering Schedule */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="eyebrow">
              {isKm ? "កម្មវិធីថ្វាយបង្គំប្រចាំសប្តាហ៍" : "Weekly Schedule"}
            </span>
            <h2>{isKm ? "កម្មវិធីជួបជុំ និងថ្វាយបង្គំព្រះ" : "Sanctuary Gatherings & Worship"}</h2>
            <hr className="rule" />
            <p style={{ maxWidth: 660, margin: "0.75rem auto 0", color: "var(--muted)" }}>
              {isKm
                ? "យើងសូមស្វាគមន៍បងប្អូនទាំងអស់គ្នាដោយក្តីរីករាយ មកចូលរួមថ្វាយបង្គំ ស្តាប់ព្រះបន្ទូល និងប្រកបគ្នាដោយក្តីស្រឡាញ់នៃព្រះគ្រីស្ទ។"
                : "You are warmly welcome to join us in person for heartfelt worship, biblical expository preaching, and Christian fellowship."}
            </p>
          </div>

          <div className="contact-schedule-grid">
            <div className="contact-schedule-card">
              <span className="contact-schedule-badge">
                {isKm ? "ការថ្វាយបង្គំធំ" : "Main Service"}
              </span>
              <h3>{isKm ? "ការថ្វាយបង្គំព្រះថ្ងៃអាទិត្យ" : "Sunday Morning Worship"}</h3>
              <span className="contact-schedule-time">10:00 AM – 11:30 AM</span>
              <p>
                {isKm
                  ? "ការច្រៀងសរសើរតម្កើងព្រះ ការអធិស្ឋាន និងការស្តាប់ព្រះបន្ទូលយ៉ាងស៊ីជម្រៅ (ភាសាខ្មែរ និងអង់គ្លេស)។"
                  : "Congregational praise, pastoral prayer, and biblical expository preaching with bilingual translation."}
              </p>
            </div>

            <div className="contact-schedule-card">
              <span className="contact-schedule-badge">
                {isKm ? "ក្រុមយុវជន" : "Youth & Discipleship"}
              </span>
              <h3>{isKm ? "ក្រុមប្រកបយុវជន និងសិស្ស" : "Youth Fellowship & Bible Study"}</h3>
              <span className="contact-schedule-time">1:30 PM – 3:30 PM</span>
              <p>
                {isKm
                  ? "ការជួបជុំយុវជន ការបង្កើតក្រុមតូចរៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្ស ១ ទល់ ១ យ៉ាងជិតស្និទ្ធ។"
                  : "Dynamic youth praise, small-group discipleship circles, and personal spiritual mentorship."}
              </p>
            </div>

            <div className="contact-schedule-card">
              <span className="contact-schedule-badge">
                {isKm ? "ការអធិស្ឋាន" : "Midweek Prayer"}
              </span>
              <h3>{isKm ? "ការជួបជុំអធិស្ឋានកណ្តាលសប្តាហ៍" : "Wednesday Prayer & Exegesis"}</h3>
              <span className="contact-schedule-time">6:30 PM – 8:00 PM</span>
              <p>
                {isKm
                  ? "ការរួបរួមចិត្តអធិស្ឋានទូលអង្វរសម្រាប់ប្រទេសជាតិ ក្រុមគ្រួសារ និងការរៀនព្រះបន្ទូលជំពូកដកស្រង់។"
                  : "United intercession for Cambodia, personal healing prayer, and verse-by-verse scriptural study."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Location & Pastoral Leadership */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="eyebrow">
              {isKm ? "ទីតាំង និងការទាក់ទង" : "Campus & Contact"}
            </span>
            <h2>{isKm ? "ទីតាំងក្រុមជំនុំ និងអ្នកដឹកនាំ" : "Church Campus & Leadership"}</h2>
            <hr className="rule" />
          </div>

          <div className="contact-info-grid">
            {/* Campus Card */}
            <div className="contact-campus-card">
              <div className="contact-campus-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/all-nations-institute-campus.jpg"
                  alt="Sanctuary Campus"
                />
              </div>
              <div className="contact-campus-body">
                <h3>{isKm ? "វិទ្យាស្ថាន និងកន្លែងថ្វាយបង្គំព្រះ" : "Institute & Sanctuary Campus"}</h3>
                <p>
                  {isKm
                    ? "ទីតាំងស្ថិតក្នុងរាជធានីភ្នំពេញ មានចំណតយានយន្តធំទូលាយ បរិយាកាសស្ងប់ស្ងាត់ និងក្រុមការងារទទួលស្វាគមន៍ដោយភាពកក់ក្តៅ។"
                    : "Located on the institute campus in Phnom Penh, offering secure parking, serene sanctuary grounds, and a friendly welcome team."}
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <a
                    href="https://t.me/+855966875886"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "0.82rem", padding: "0.6rem 1.2rem", display: "inline-flex", alignItems: "center" }}
                  >
                    <TelegramIcon width="14" height="14" style={{ marginRight: 6 }} />
                    {isKm ? "សួរព័ត៌មានតាម Telegram" : "Inquire via Telegram"}
                  </a>
                  <a
                    href="tel:0966875886"
                    className="btn btn-ghost"
                    style={{ fontSize: "0.82rem", padding: "0.6rem 1.2rem", display: "inline-flex", alignItems: "center" }}
                  >
                    <PhoneIcon width="14" height="14" style={{ marginRight: 6 }} />
                    096 687 5886
                  </a>
                </div>
              </div>
            </div>

            {/* Ministry Lead Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="contact-schedule-card" style={{ borderTopColor: "var(--navy)" }}>
                <span className="contact-schedule-badge">
                  {isKm ? "អ្នកដឹកនាំកិច្ចការបម្រើព្រះ" : "Ministry Lead"}
                </span>
                <h3>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត (Hun Chet)" : "Leader Hun Chet"}</h3>
                <p style={{ marginBottom: "1.25rem" }}>
                  {isKm
                    ? "ចែករំលែកដំណឹងល្អ ដឹកនាំការថ្វាយបង្គំ បង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សក្នុងព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត។"
                    : "Ministry Lead serving in preaching, discipleship, and gospel communication in Hun Chet Ministry."}
                </p>
                <AuthorCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link Hub */}
      <section className="section" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">{isKm ? "ស្វែងយល់បន្ថែម" : "Explore Further"}</span>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy-dark)", margin: "0 0 1.5rem" }}>
            {isKm ? "ធនធាន និងកិច្ចការបម្រើព្រះដទៃទៀត" : "More Ministry Resources & Life"}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/library" className="btn btn-ghost">
              {isKm ? "បណ្ណាល័យសៀវភៅ" : "Study Library"}
            </Link>
            <Link href="/resource" className="btn btn-ghost">
              {isKm ? "វីដេអូ និងធនធាន" : "Video Archives"}
            </Link>
            <Link href="/gallery" className="btn btn-ghost">
              {isKm ? "វិចិត្រសាលរូបភាព" : "Photo Gallery"}
            </Link>
            <Link href="/about" className="btn btn-primary">
              {isKm ? "អំពីយើង" : "About Our Story"}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
