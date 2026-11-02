import { useState } from "react";
import Link from "next/link";
import { Brand } from "./SiteHeader";
import { useT, useLocale } from "../lib/i18n";
import { ArrowUpRight, ArrowUp } from "./Icons";

export default function SiteFooter() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const LinkWithArrow = ({ children }) => (
    <span className="inline-flex items-center gap-1.5 group">
      <span>{children}</span>
      <ArrowUpRight width={12} height={12} style={{ display: "inline-block", color: "#8ec5e5", marginLeft: 4 }} />
    </span>
  );

  return (
    <footer className="oc-footer" id="contact">
      {/* 1. ONE CHURCH SIGNATURE NEWSLETTER BAR */}
      <div className="oc-footer-newsletter">
        <div className="oc-footer-newsletter-text">
          <h2>{isKm ? "ព្រឹត្តិបត្រព័ត៌មាន & ព្រះបន្ទូល" : "NEWSLETTER"}</h2>
          <p>
            {isKm
              ? "ទទួលការលើកទឹកចិត្តប្រចាំសប្តាហ៍ ការបង្រៀនព្រះគម្ពីរ និងធនធានស្មារតីតាមអ៊ីមែល"
              : "Sign up with your email address to receive updates, devotionals, and biblical teaching."}
          </p>
        </div>

        {newsletterSubscribed ? (
          <div style={{ color: "#fef08a", fontSize: "14px", fontWeight: 600 }}>
            {isKm
              ? "✓ សូមអរគុណសម្រាប់ការចុះឈ្មោះ! យើងនឹងផ្ញើព្រឹត្តិបត្រទៅកាន់អ្នក។"
              : "✓ Thank you for subscribing! You are now connected."}
          </div>
        ) : (
          <form className="oc-footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={isKm ? "អាសយដ្ឋានអ៊ីមែលរបស់អ្នក..." : "Email Address"}
              className="oc-footer-newsletter-input"
              aria-label={isKm ? "អាសយដ្ឋានអ៊ីមែល" : "Email Address"}
            />
            <button type="submit" className="oc-button oc-solid" style={{ minHeight: "44px", padding: "11px 24px" }}>
              <span>{isKm ? "ចុះឈ្មោះ" : "SIGN UP"}</span>
            </button>
          </form>
        )}
      </div>

      {/* 2. ONE CHURCH LOCATION AND SERVICE TIMES BANNER */}
      <div className="oc-footer-service-times">
        <div>
          <h3>{isKm ? "ទីតាំង និងម៉ោងថ្វាយបង្គំ" : "LOCATION AND SERVICE TIMES"}</h3>
          <p>
            {isKm
              ? "All Nations Church Sanctuary • ភូមិត្រពាំងក្រសាំង សង្កាត់ត្រពាំងក្រសាំង រាជធានីភ្នំពេញ"
              : "All Nations Church Sanctuary • Trapeang Krasang, Phnom Penh, Cambodia"}
          </p>
          <p style={{ marginTop: "4px", color: "rgba(255, 255, 255, 0.95)", fontWeight: 600 }}>
            {isKm ? "រៀងរាល់ព្រឹកថ្ងៃអាទិត្យ ម៉ោង ១០:០០ ព្រឹក" : "Sundays at 10:00 AM (Phnom Penh Time)"}
          </p>
        </div>
        <Link href="/contact" className="oc-button oc-outline" style={{ minHeight: "42px", padding: "10px 22px" }}>
          <span>{isKm ? "ព័ត៌មានការថ្វាយបង្គំ" : "Plan Your Visit"}</span>
          <ArrowUpRight width={12} height={12} style={{ display: "inline-block", marginLeft: 6 }} />
        </Link>
      </div>

      {/* 3. 4-COLUMN ONE CHURCH FOOTER NAVIGATION */}
      <div className="oc-footer-grid">
        {/* Column 1: About & Brand */}
        <div className="oc-footer-about">
          <Brand locale={locale} />
          <p>
            {isKm ? (
              <>
                ចាក់ឫសក្នុងព្រះបន្ទូល។
                <br />
                រស់នៅដើម្បីព្រះគ្រីស្ទ។
              </>
            ) : (
              <>
                Rooted in the Word of God.
                <br />
                Living for Christ in Cambodia.
              </>
            )}
          </p>
          <div className="oc-social-links" style={{ marginTop: 18 }}>
            <a
              href="https://www.facebook.com/hunchet2024/"
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <LinkWithArrow>Facebook</LinkWithArrow>
            </a>
            <a
              href="https://t.me/+855966875886"
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <LinkWithArrow>Telegram</LinkWithArrow>
            </a>
          </div>
        </div>

        {/* Column 2: Explore & Teachings */}
        <div>
          <h3>{isKm ? "ស្វែងរកព្រះបន្ទូល" : "Biblical Writings"}</h3>
          <p style={{ margin: 0, marginBottom: 12 }}>
            <Link href="/articles" style={{ display: "block", marginBottom: 8 }}>
              <LinkWithArrow>{isKm ? "អត្ថបទបង្រៀនព្រះគម្ពីរ" : "Articles & Exegesis"}</LinkWithArrow>
            </Link>
            <Link href="/devotions" style={{ display: "block", marginBottom: 8 }}>
              <LinkWithArrow>{isKm ? "ការសញ្ជឹងគិត ៣៦៥ ថ្ងៃ" : "365 Daily Devotions"}</LinkWithArrow>
            </Link>
            <Link href="/library" style={{ display: "block", marginBottom: 8 }}>
              <LinkWithArrow>{isKm ? "បណ្ណាល័យសៀវភៅ" : "Theological Library"}</LinkWithArrow>
            </Link>
            <Link href="/gallery" style={{ display: "block" }}>
              <LinkWithArrow>{isKm ? "រូបភាព និងព័ន្ធកិច្ច" : "Ministry Photos"}</LinkWithArrow>
            </Link>
          </p>
        </div>

        {/* Column 3: Ministry & Mission */}
        <div>
          <h3>{isKm ? "អំពីលោកគ្រូ ហ៊ុន ចិត្ត" : "Ministry & Mission"}</h3>
          <address>
            {isKm
              ? "ភូមិត្រពាំងក្រសាំង សង្កាត់ត្រពាំងក្រសាំង ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ"
              : "Phnom Penh, Cambodia"}
          </address>
          <Link href="/about" style={{ display: "block", marginBottom: 8 }}>
            <LinkWithArrow>{isKm ? "ជីវប្រវត្តិ និងការត្រាស់ហៅ" : "Story & Calling"}</LinkWithArrow>
          </Link>
          <Link href="/partner-with-us" style={{ display: "block" }}>
            <LinkWithArrow>{isKm ? "ចូលរួមជាដៃគូព័ន្ធកិច្ច" : "Partner With Us"}</LinkWithArrow>
          </Link>
        </div>

        {/* Column 4: Contact & Prayer */}
        <div>
          <h3>{isKm ? "ទំនាក់ទំនង" : "Say Hello"}</h3>
          <a href="tel:+855966875886" style={{ display: "block", marginBottom: 8 }}>
            +855 96 687 5886
          </a>
          <a href="mailto:hunchet2024@gmail.com" style={{ display: "block", marginBottom: 12 }}>
            hunchet2024@gmail.com
          </a>
          <Link href="/contact" style={{ display: "block", marginBottom: 8 }}>
            <LinkWithArrow>{isKm ? "ផ្ញើសំណើអធិស្ឋាន" : "Contact & Prayer Requests"}</LinkWithArrow>
          </Link>
          <Link href="/resource" style={{ display: "block" }}>
            <LinkWithArrow>{isKm ? "ទាញយកធនធានឥតគិតថ្លៃ" : "Free Resources"}</LinkWithArrow>
          </Link>
        </div>
      </div>

      {/* 4. FOOTER BOTTOM */}
      <div className="oc-footer-bottom">
        <p>
          © {new Date().getFullYear()} Hun Chet. {isKm ? "រក្សាសិទ្ធិគ្រប់យ៉ាង។" : "All rights reserved."}
        </p>
        <p>
          {isKm
            ? "ព្រះគម្ពីរភាសាខ្មែរ ១៩៥៤ • ផ្សាយព្រះបន្ទូលព្រះដ៏មានជីវិត"
            : "1954 Khmer Holy Bible • Preaching the Living Word"}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "11.5px",
            padding: 0,
          }}
        >
          <span>{isKm ? "ទៅលើវិញ" : "Back to Top"}</span>
          <ArrowUp width={12} height={12} style={{ color: "#8ec5e5" }} />
        </button>
      </div>
    </footer>
  );
}
