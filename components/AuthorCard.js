import { useT, useLocale } from "../lib/i18n";
import { LOGO } from "../lib/media";
import { PhoneIcon, TelegramIcon, FacebookIcon } from "./Icons";

export default function AuthorCard() {
  const t = useT();
  const locale = useLocale();
  const isKm = locale === "km";

  return (
    <div className="author-bio">
      <div className="author-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO}
          alt={isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}
        />
      </div>
      <div className="author-text">
        <strong>{isKm ? "លោកគ្រូ ហ៊ុន ចិត្ត" : "Hun Chet"}</strong>
        <span>{t("footer.tagline")}</span>
        <div className="author-social-links">
          <a href="tel:0966875886" className="author-btn btn-phone">
            <PhoneIcon width="14" height="14" />
            <span>096 687 5886</span>
          </a>
          <a
            href="https://t.me/+855966875886"
            target="_blank"
            rel="noreferrer"
            className="author-btn btn-telegram"
          >
            <TelegramIcon width="14" height="14" />
            <span>Telegram</span>
          </a>
          <a
            href="https://www.facebook.com/hunchet2024/"
            target="_blank"
            rel="noreferrer"
            className="author-btn btn-facebook"
          >
            <FacebookIcon width="14" height="14" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
