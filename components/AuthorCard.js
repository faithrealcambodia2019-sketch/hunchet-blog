import { useT } from "../lib/i18n";

export default function AuthorCard() {
  const t = useT();

  return (
    <div className="author-bio">
      <div className="author-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/d3270-untitled-design-1-1.png"
          alt="Hun Chet"
        />
      </div>
      <div className="author-text">
        <strong>Hun Chet</strong>
        <span>{t("footer.tagline")}</span>
        <div className="author-social-links">
          <a href="tel:0966875886" className="author-btn btn-phone">
            096 687 5886
          </a>
          <a
            href="https://t.me/+855966875886"
            target="_blank"
            rel="noreferrer"
            className="author-btn btn-telegram"
          >
            Telegram
          </a>
          <a
            href="https://www.facebook.com/hunchet2024/"
            target="_blank"
            rel="noreferrer"
            className="author-btn btn-facebook"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
