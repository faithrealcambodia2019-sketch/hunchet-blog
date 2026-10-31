import Link from "next/link";
import { useLocale, useT } from "../lib/i18n";
import { TelegramIcon, ArrowRightIcon } from "./Icons";

export default function ConnectBanner({
  eyebrow,
  title,
  subtitle,
  buttonText,
  buttonLink = "https://t.me/+855966875886",
  isExternal = true,
}) {
  const locale = useLocale();
  const t = useT();
  const isKm = locale === "km";

  const defaultEyebrow = isKm
    ? "ទំនាក់ទំនង និងការប្រកបគ្នា"
    : "Connect & Prayer • Phnom Penh";

  const defaultTitle = isKm
    ? "ជំពូកថ្មីនៃជីវិតរបស់អ្នក ចាប់ផ្តើមពីការស្វាគមន៍មួយ"
    : "Your Next Chapter Starts With A Hello.";

  const defaultSubtitle = isKm
    ? "មិនថាអ្នកត្រូវការការអធិស្ឋាន ការប្រឹក្សាខាងវិញ្ញាណ ឬចង់ដឹងបន្ថែមអំពីព្រះបន្ទូលព្រះទេ — ខ្ញុំបាទរីករាយនឹងជជែក និងអធិស្ឋានជាមួយអ្នក។"
    : "Whether you need pastoral prayer, spiritual mentorship, or want to explore God's Word — we would love to connect with you.";

  const defaultButton = isKm
    ? "ទំនាក់ទំនងតាម Telegram"
    : "Connect on Telegram";

  return (
    <section className="oc-connect">
      <div className="oc-connect-inner">
        <p className="oc-eyebrow oc-light">
          {eyebrow || defaultEyebrow}
        </p>
        <h2 className="oc-connect-title">
          {title || defaultTitle}
        </h2>
        <p className="oc-connect-sub">
          {subtitle || defaultSubtitle}
        </p>
        <div className="oc-connect-actions">
          {isExternal ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noreferrer"
              className="oc-button oc-outline"
            >
              <TelegramIcon style={{ width: 15, height: 15, marginRight: 8 }} />
              <span>{buttonText || defaultButton}</span>
            </a>
          ) : (
            <Link href={buttonLink} className="oc-button oc-outline">
              <span>{buttonText || defaultButton}</span>
            </Link>
          )}

          <Link href="/contact" className="oc-button oc-outline-white">
            <span>{isKm ? "ផ្ញើសារ / សំណើអធិស្ឋាន" : "Send Message / Prayer"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
