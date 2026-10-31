import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SubpageHero from "../components/SubpageHero";
import ConnectBanner from "../components/ConnectBanner";
import AuthorCard from "../components/AuthorCard";
import { PhoneIcon, TelegramIcon, FacebookIcon, GlobeIcon, MapPinIcon, CheckIcon } from "../components/Icons";
import { useT, useLocale } from "../lib/i18n";

export default function Contact() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "prayer",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="oc-site">
      <Head>
        <title>{`${isKm ? "ទំនាក់ទំនង" : "Contact"} — ${isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Leader Hun Chet"}`}</title>
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

      <main>
        {/* ONE CHURCH SUBPAGE HERO */}
        <SubpageHero
          bgImage="/images/history-prayer-fellowship.jpg"
          kicker={isKm ? "ទំនាក់ទំនងផ្ទាល់" : "GET IN TOUCH"}
          title={isKm ? "ទំនាក់ទំនង" : "CONTACT"}
          subtitle={
            isKm
              ? "ការប្រឹក្សាខាងវិញ្ញាណ សំណួរព្រះគម្ពីរ ការអញ្ជើញចែករំលែក និងសំណើអធិស្ឋាន"
              : "Spiritual Guidance, Biblical Questions, Speaking Invitations & Prayer Requests"
          }
          breadcrumbs={[
            { label: isKm ? "ទំព័រដើម" : "Home", href: "/" },
            { label: isKm ? "ទំនាក់ទំនង" : "Contact" },
          ]}
          stats={[
            { number: "096 687 5886", label: isKm ? "ទូរស័ព្ទផ្ទាល់" : "Direct Phone" },
            { number: "Telegram", label: isKm ? "ផ្ញើសាររហ័ស" : "Fast Message" },
            { number: "Phnom Penh", label: isKm ? "រាជធានីភ្នំពេញ" : "Location" },
          ]}
        />

        {/* TWO-COLUMN CONTACT SECTION (ONE CHURCH LAYOUT) */}
        <section className="oc-section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "48px",
                alignItems: "start",
              }}
            >
              {/* LEFT COLUMN: CONTACT FORM */}
              <div
                style={{
                  background: "#fbfbf9",
                  border: "1px solid #dcdfda",
                  padding: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                <span className="oc-eyebrow">
                  {isKm ? "ផ្ញើសារមកកាន់យើងខ្ញុំ" : "SEND A MESSAGE"}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "#141716",
                    margin: "0 0 1rem",
                  }}
                >
                  {isKm ? "តើយើងអាចជួយអ្នកដោយរបៀបណា?" : "HOW CAN WE HELP YOU?"}
                </h2>
                <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 2rem" }}>
                  {isKm
                    ? "សូមបំពេញព័ត៌មានខាងក្រោម។ លោកគ្រូ ហ៊ុន ចិត្ត នឹងឆ្លើយតប និងអធិស្ឋានជូនអ្នកដោយផ្ទាល់។"
                    : "Fill out the form below. Leader Hun Chet or our ministry team will personally get back to you shortly."}
                </p>

                {submitted ? (
                  <div
                    style={{
                      padding: "2rem",
                      background: "rgba(74, 124, 135, 0.12)",
                      border: "1px solid var(--oc-teal)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: "var(--oc-teal)",
                        color: "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <CheckIcon />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#141716",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      {isKm ? "សារត្រូវបានផ្ញើដោយជោគជ័យ!" : "MESSAGE SENT SUCCESSFULLY!"}
                    </h3>
                    <p style={{ color: "#4a5568", fontSize: "0.92rem", margin: "0 0 1.5rem" }}>
                      {isKm
                        ? "អរព្រះគុណសម្រាប់ការទាក់ទងមកយើងខ្ញុំ។ យើងនឹងឆ្លើយតបយ៉ាងឆាប់រហ័ស។"
                        : "Thank you for reaching out. We will pray over your request and respond soon."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="oc-button oc-solid"
                    >
                      {isKm ? "ផ្ញើសារមួយទៀត" : "SEND ANOTHER MESSAGE"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "var(--font-display)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#141716",
                            marginBottom: "6px",
                          }}
                        >
                          {isKm ? "នាមខ្លួន" : "FIRST NAME"} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.firstName}
                          onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                          style={{
                            width: "100%",
                            height: "46px",
                            padding: "0 14px",
                            background: "#ffffff",
                            border: "1px solid #dcdfda",
                            borderRadius: 0,
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#141716",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "var(--font-display)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#141716",
                            marginBottom: "6px",
                          }}
                        >
                          {isKm ? "គោត្តនាម" : "LAST NAME"} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.lastName}
                          onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                          style={{
                            width: "100%",
                            height: "46px",
                            padding: "0 14px",
                            background: "#ffffff",
                            border: "1px solid #dcdfda",
                            borderRadius: 0,
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#141716",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "var(--font-display)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#141716",
                            marginBottom: "6px",
                          }}
                        >
                          {isKm ? "អ៊ីមែល" : "EMAIL ADDRESS"} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          style={{
                            width: "100%",
                            height: "46px",
                            padding: "0 14px",
                            background: "#ffffff",
                            border: "1px solid #dcdfda",
                            borderRadius: 0,
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#141716",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "var(--font-display)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#141716",
                            marginBottom: "6px",
                          }}
                        >
                          {isKm ? "លេខទូរស័ព្ទ / Telegram" : "PHONE / TELEGRAM"}
                        </label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          style={{
                            width: "100%",
                            height: "46px",
                            padding: "0 14px",
                            background: "#ffffff",
                            border: "1px solid #dcdfda",
                            borderRadius: 0,
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#141716",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#141716",
                          marginBottom: "6px",
                        }}
                      >
                        {isKm ? "ប្រធានបទ" : "SUBJECT"}
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        style={{
                          width: "100%",
                          height: "46px",
                          padding: "0 14px",
                          background: "#ffffff",
                          border: "1px solid #dcdfda",
                          borderRadius: 0,
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          color: "#141716",
                          outline: "none",
                        }}
                      >
                        <option value="prayer">{isKm ? "សំណើអធិស្ឋាន (Prayer Request)" : "Prayer Request"}</option>
                        <option value="bible">{isKm ? "សំណួរព្រះគម្ពីរ (Biblical Question)" : "Biblical Question"}</option>
                        <option value="counseling">{isKm ? "ការប្រឹក្សាខាងវិញ្ញាណ (Spiritual Guidance)" : "Spiritual Guidance"}</option>
                        <option value="speaking">{isKm ? "ការអញ្ជើញចែករំលែក (Speaking Invitation)" : "Speaking Invitation"}</option>
                        <option value="partnership">{isKm ? "ការចូលរួមចំណែក (Partnership & Support)" : "Partnership & Support"}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#141716",
                          marginBottom: "6px",
                        }}
                      >
                        {isKm ? "ខ្លឹមសារសារ" : "MESSAGE"} *
                      </label>
                      <textarea
                        required
                        rows="5"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          background: "#ffffff",
                          border: "1px solid #dcdfda",
                          borderRadius: 0,
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          color: "#141716",
                          outline: "none",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="oc-button oc-solid"
                      style={{ alignSelf: "flex-start", marginTop: "8px" }}
                    >
                      {isKm ? "ផ្ញើសារឥឡូវនេះ" : "SUBMIT MESSAGE"}
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: DIRECT TOUCHPOINTS */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <span className="oc-eyebrow">
                    {isKm ? "មធ្យោបាយទាក់ទងរហ័ស" : "DIRECT CHANNELS"}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: "#141716",
                      margin: "0 0 1.5rem",
                    }}
                  >
                    {isKm ? "ទំនាក់ទំនងផ្ទាល់ជាមួយលោកគ្រូ" : "CONNECT DIRECTLY"}
                  </h3>
                </div>

                {/* 1. Phone */}
                <div
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    padding: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "#141716",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PhoneIcon width="18" height="18" />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--oc-teal)",
                          display: "block",
                        }}
                      >
                        {isKm ? "ទូរស័ព្ទផ្ទាល់" : "PHONE CALL"}
                      </span>
                      <strong style={{ fontSize: "1.15rem", color: "#141716", fontFamily: "var(--font-display)" }}>
                        096 687 5886
                      </strong>
                    </div>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0 0 1rem" }}>
                    {isKm
                      ? "ទំនាក់ទំនងតាមទូរស័ព្ទសម្រាប់កិច្ចការបន្ទាន់ ឬការសន្ទនាផ្ទាល់។"
                      : "Direct pastoral line for urgent prayer and ministry conversations."}
                  </p>
                  <a href="tel:0966875886" className="oc-button oc-outline-dark" style={{ width: "100%", justifyContent: "center" }}>
                    <span>{isKm ? "ហៅទូរស័ព្ទឥឡូវនេះ" : "CALL NOW"}</span>
                  </a>
                </div>

                {/* 2. Telegram */}
                <div
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    padding: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "var(--oc-teal)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TelegramIcon width="18" height="18" />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--oc-teal)",
                          display: "block",
                        }}
                      >
                        TELEGRAM
                      </span>
                      <strong style={{ fontSize: "1.15rem", color: "#141716", fontFamily: "var(--font-display)" }}>
                        +855 96 687 5886
                      </strong>
                    </div>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0 0 1rem" }}>
                    {isKm
                      ? "ផ្ញើសារ Telegram ផ្ទាល់ខ្លួន សម្រាប់សំណួរ ឬការចែករំលែកឯកសារ។"
                      : "Send an instant message on Telegram for fast fellowship and prayer."}
                  </p>
                  <a
                    href="https://t.me/+855966875886"
                    target="_blank"
                    rel="noreferrer"
                    className="oc-button oc-solid"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{isKm ? "ផ្ញើសារ TELEGRAM" : "OPEN TELEGRAM"}</span>
                  </a>
                </div>

                {/* 3. Facebook & Messenger */}
                <div
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    padding: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "#1877f2",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FacebookIcon width="18" height="18" />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--oc-teal)",
                          display: "block",
                        }}
                      >
                        FACEBOOK
                      </span>
                      <strong style={{ fontSize: "1.15rem", color: "#141716", fontFamily: "var(--font-display)" }}>
                        Hun Chet Official
                      </strong>
                    </div>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0 0 1rem" }}>
                    {isKm
                      ? "តាមដានទំព័រ Facebook ផ្លូវការ និងផ្ញើសារតាម Messenger។"
                      : "Follow daily devotional updates and message via Facebook Messenger."}
                  </p>
                  <a
                    href="https://www.facebook.com/hunchet2024/"
                    target="_blank"
                    rel="noreferrer"
                    className="oc-button oc-outline-dark"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{isKm ? "មើលទំព័រ FACEBOOK" : "VIEW FACEBOOK"}</span>
                  </a>
                </div>

                {/* 4. Fellowship Location */}
                <div
                  style={{
                    background: "#fbfbf9",
                    border: "1px solid #dcdfda",
                    padding: "1.5rem 1.75rem",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ color: "var(--oc-teal)", marginTop: "2px", flexShrink: 0 }}>
                    <MapPinIcon width="20" height="20" />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "#141716", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                      {isKm ? "ទីតាំងប្រកបគ្នា និងការិយាល័យ" : "Ministry Location"}
                    </strong>
                    <p style={{ color: "#64748b", fontSize: "0.88rem", margin: 0, lineHeight: 1.6 }}>
                      {isKm
                        ? "រាជធានីភ្នំពេញ ប្រទេសកម្ពុជា • ទទួលស្វាគមន៍ដោយក្តីស្រឡាញ់"
                        : "Phnom Penh, Cambodia • Open for fellowship and discipleship"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHOR CARD & FELLOWSHIP */}
        <section className="oc-section" style={{ background: "#f4f5f3" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span className="oc-eyebrow">{isKm ? "អំពីម្ចាស់ប្លុក" : "ABOUT THE AUTHOR"}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "#141716",
                  margin: "0 0 0.5rem",
                }}
              >
                {isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "LEADER HUN CHET"}
              </h2>
            </div>

            <AuthorCard />
          </div>
        </section>

        {/* ONE CHURCH CONNECT BANNER */}
        <ConnectBanner
          kicker={isKm ? "អធិស្ឋាន និងការប្រកបគ្នា" : "PRAYER & FELLOWSHIP"}
          title={isKm ? "យើងរីករាយនឹងអធិស្ឋានជូនអ្នក" : "WE ARE HONORED TO PRAY WITH YOU"}
          subtitle={
            isKm
              ? "ប្រសិនបើលោកអ្នកមានសំណើអធិស្ឋាន ឬចង់ប្រកបគ្នាខាងវិញ្ញាណ សូមទាក់ទងមកយើងឥឡូវនេះ។"
              : "Whatever season of life you are walking through, we would love to stand with you in faith."
          }
          telegramHref="https://t.me/+855966875886"
          telegramText="TELEGRAM"
          contactHref="tel:0966875886"
          contactText={isKm ? "ហៅទូរស័ព្ទ" : "CALL DIRECT"}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
