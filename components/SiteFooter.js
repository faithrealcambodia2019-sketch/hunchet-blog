import Link from "next/link";
import { Brand } from "./SiteHeader";
import { useT, useLocale } from "../lib/i18n";
import { ArrowUpRight, ArrowUp } from "./Icons";

export default function SiteFooter() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const LinkWithArrow = ({ children }) => (
    <span className="inline-flex items-center gap-1.5 group">
      <span>{children}</span>
      <ArrowUpRight width={12} height={12} style={{ display: "inline-block", color: "#70a9c6", marginLeft: 4 }} />
    </span>
  );

  return (
    <footer className="oc-footer" id="contact">
      <div className="oc-footer-grid">
        {/* Column 1: About & Brand */}
        <div className="oc-footer-about">
          <Brand locale={locale} />
          <p>
            {isKm ? (
              <>
                ចាក់ឬសក្នុងព្រះបន្ទូល។
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
          <ArrowUp width={12} height={12} style={{ color: "#70a9c6" }} />
        </button>
      </div>
    </footer>
  );
}
