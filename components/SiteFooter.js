import Link from "next/link";
import { LOGO } from "../lib/media";
import {
  PhoneIcon,
  TelegramIcon,
  FacebookIcon,
  MessengerIcon,
  GlobeIcon,
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
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <Link href="/" className="footer-brand">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Hun Chet" />
            </span>
            <span className="footer-brand-text">Hun Chet</span>
          </Link>
          <p>
            Sharing the Gospel through biblical encouragement, Christian
            teaching, prayer, and ministry content that points hearts to Jesus
            Christ.
          </p>

          <div className="social-row">
            {SOCIALS.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className="social-btn"
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li>
              <Link href="/articles">Article</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/library">Library</Link>
            </li>
            <li>
              <Link href="/resource">Resource</Link>
            </li>
            <li>
              <Link href="/categories">Topics</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="contact-list">
            <li>
              <a href="tel:0966875886">
                <span className="ci">
                  <PhoneIcon />
                </span>
                <span>096 687 5886</span>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/+855966875886"
                target="_blank"
                rel="noreferrer"
              >
                <span className="ci">
                  <TelegramIcon />
                </span>
                <span>Telegram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/hunchet2024/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="ci">
                  <FacebookIcon />
                </span>
                <span>facebook.com/hunchet2024</span>
              </a>
            </li>
            <li>
              <Link href="/contact">
                <span className="ci">
                  <GlobeIcon />
                </span>
                <span>Send a message</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} hunchet.blog — All rights reserved.</p>
      </div>
    </footer>
  );
}
