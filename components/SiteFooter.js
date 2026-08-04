import Link from "next/link";
import { LOGO } from "../lib/media";

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
              <Link href="/resource">Resource</Link>
            </li>
            <li>
              <Link href="/categories">Topics</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/all-pages">All Pages</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <div className="footer-contact-item">
            <span>Phone</span>
            <a href="tel:0966875886">096 687 5886</a>
          </div>
          <div className="footer-contact-item">
            <span>Telegram</span>
            <a
              href="https://t.me/+855966875886"
              target="_blank"
              rel="noreferrer"
            >
              @hunchet
            </a>
          </div>
          <div className="footer-contact-item">
            <span>Facebook</span>
            <a
              href="https://www.facebook.com/hunchet2024/"
              target="_blank"
              rel="noreferrer"
            >
              facebook.com/hunchet2024
            </a>
          </div>
          <div className="footer-contact-item">
            <span>Web</span>
            <Link href="/contact">Send a message</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} hunchet.blog — All rights reserved.</p>
      </div>
    </footer>
  );
}
