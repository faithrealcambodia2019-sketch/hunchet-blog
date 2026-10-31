import { useState } from "react";
import Link from "next/link";
import { Brand } from "./SiteHeader";
import { useT, useLocale } from "../lib/i18n";
import {
  PhoneIcon,
  TelegramIcon,
  FacebookIcon,
  MessengerIcon,
  ArrowRightIcon,
} from "./Icons";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/hunchet2024/",
    Icon: FacebookIcon,
    external: true,
  },
  {
    label: "Messenger",
    href: "https://m.me/hunchet2024",
    Icon: MessengerIcon,
    external: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/+855966875886",
    Icon: TelegramIcon,
    external: true,
  },
  { label: "Phone", href: "tel:0966875886", Icon: PhoneIcon },
];

export default function SiteFooter() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="oc-footer" id="footer">
      {/* 1. Newsletter / Devotional Subscription Touchpoint (One Church Signature) */}
      <div className="oc-footer-newsletter-wrap">
        <div className="oc-footer-newsletter">
          <p className="oc-eyebrow oc-light">
            {isKm ? "ព្រឹត្តិបត្រព្រះបន្ទូល • ទទួលការលើកទឹកចិត្ត" : "Newsletter • Stay Encouraged"}
          </p>
          <h2 className="oc-footer-newsletter-title">
            {isKm ? "ទទួលព្រះបន្ទូល និងអត្ថបទថ្មីៗ" : "Receive Biblical Writings & Exhortations"}
          </h2>
          <p className="oc-footer-newsletter-sub">
            {isKm
              ? "ចុះឈ្មោះដើម្បីទទួលអត្ថបទបង្រៀនព្រះគម្ពីរ ការសញ្ជឹងគិតប្រចាំថ្ងៃ និងធនធានជំនឿថ្មីៗពីលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Subscribe to receive biblically grounded teachings, pastoral reflections, and newly released resources."}
          </p>

          {subscribed ? (
            <div className="oc-newsletter-success">
              ✓ {isKm ? "សូមអរព្រះគុណ! យើងបានកត់ត្រាអ៊ីមែលរបស់អ្នកហើយ។" : "Thank you for subscribing! May God bless you richly."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="oc-newsletter-form">
              <input
                type="email"
                placeholder={isKm ? "បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក..." : "Enter your email address..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="oc-newsletter-input"
              />
              <button type="submit" className="oc-newsletter-btn">
                <span>{isKm ? "ជាវព្រឹត្តិបត្រ" : "Subscribe"}</span>
                <ArrowRightIcon style={{ width: 13, height: 13 }} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="oc-footer-divider" />

      {/* 2. Multi-Column Navigation & Info */}
      <div className="oc-footer-grid">
        {/* Brand & Author Info */}
        <div className="oc-footer-col oc-footer-brand-col">
          <Brand locale={locale} />
          <p className="oc-footer-about-text">
            {isKm
              ? "គេហទំព័រផ្ទាល់ខ្លួនរបស់លោកគ្រូ ហ៊ុន ចិត្ត។ ឧទ្ទិសដល់ការផ្សាយព្រះបន្ទូលព្រះដ៏មានជីវិត ការបង្រៀនព្រះគម្ពីរ ការបណ្តុះសិស្ស និងការកសាងជំនាន់ក្រោយសម្រាប់ព្រះគ្រីស្ទ។"
              : "Personal website of Leader Hun Chet. Dedicated to preaching the living Word of God, sound biblical exposition, student discipleship, and Christ-like leadership."}
          </p>
          <div className="oc-footer-socials">
            {SOCIALS.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className="oc-social-icon-btn"
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="oc-footer-col">
          <h3 className="oc-footer-heading">{isKm ? "ស្វែងរកគេហទំព័រ" : "Explore"}</h3>
          <ul className="oc-footer-link-list">
            <li>
              <Link href="/">{t("nav.home")}</Link>
            </li>
            <li>
              <Link href="/articles">{t("nav.article")}</Link>
            </li>
            <li>
              <Link href="/devotions">{t("nav.devotions")}</Link>
            </li>
            <li>
              <Link href="/gallery">{t("nav.gallery")}</Link>
            </li>
            <li>
              <Link href="/library">{t("nav.library")}</Link>
            </li>
            <li>
              <Link href="/resource">{t("nav.resource")}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Ministry & Mission */}
        <div className="oc-footer-col">
          <h3 className="oc-footer-heading">{isKm ? "ព័ន្ធកិច្ច និងជំនឿ" : "Ministry & Mission"}</h3>
          <ul className="oc-footer-link-list">
            <li>
              <Link href="/about">{isKm ? "អំពីលោកគ្រូ ហ៊ុន ចិត្ត" : "About Hun Chet"}</Link>
            </li>
            <li>
              <Link href="/partner-with-us">{isKm ? "ចូលរួមជាដៃគូ" : "Partner With Us"}</Link>
            </li>
            <li>
              <a href="https://t.me/+855966875886" target="_blank" rel="noreferrer">
                {isKm ? "ក្រុម Telegram យុវជន" : "Youth Telegram Community"}
              </a>
            </li>
            <li>
              <Link href="/categories">{isKm ? "ប្រធានបទព្រះគម្ពីរ" : "Biblical Topics"}</Link>
            </li>
            <li>
              <Link href="/all-pages">{isKm ? "ផែនទីគេហទំព័រ" : "Sitemap"}</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div className="oc-footer-col">
          <h3 className="oc-footer-heading">{isKm ? "ទំនាក់ទំនង" : "Get In Touch"}</h3>
          <address className="oc-footer-address">
            {isKm
              ? "ភូមិត្រពាំងក្រសាំង សង្កាត់ត្រពាំងក្រសាំង ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ"
              : "Trapeang Krasang, Khan Por Senchey, Phnom Penh, Cambodia"}
          </address>
          <div className="oc-footer-contact-links">
            <a href="tel:+855966875886" className="oc-footer-contact-item">
              +855 96 687 5886
            </a>
            <a href="mailto:hunchet2024@gmail.com" className="oc-footer-contact-item">
              hunchet2024@gmail.com
            </a>
            <Link href="/contact" className="oc-footer-contact-link">
              <span>{isKm ? "ទំព័រទំនាក់ទំនង & អធិស្ឋាន →" : "Contact & Prayer Page →"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="oc-footer-bottom">
        <div className="oc-footer-bottom-inner">
          <p>© {new Date().getFullYear()} Hun Chet. {isKm ? "រក្សាសិទ្ធិគ្រប់យ៉ាង។" : "All rights reserved."}</p>
          <p className="oc-footer-motto">
            {isKm ? "ចាក់ឬសក្នុងព្រះបន្ទូល • រស់ដើម្បីព្រះគ្រីស្ទ" : "Rooted in the Word • Living for Christ"}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="oc-back-to-top"
          >
            <span>{isKm ? "ត្រឡប់ទៅលើវិញ ↑" : "Back to Top ↑"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
