import Link from "next/link";
import { useLocale } from "../lib/i18n";
import { ArrowUpRight } from "./Icons";

export default function ConnectBanner({
  eyebrow,
  title,
  subtitle,
  buttonText,
  buttonLink = "https://t.me/+855966875886",
  isExternal = true,
}) {
  const locale = useLocale();
  const isKm = locale === "km";

  const defaultEyebrow = isKm
    ? "យើងរីករាយនឹងជួប និងអធិស្ឋានសម្រាប់អ្នក"
    : "We'd Love to Connect & Pray With You";

  const defaultTitle = isKm
    ? "ចូរឲ្យព្រះបន្ទូលព្រះបំភ្លឺគន្លងជីវិតរបស់អ្នក"
    : "Let God's Living Word Illuminate Your Path.";

  const defaultButton = isKm
    ? "ទំនាក់ទំនងតាម Telegram"
    : "Connect on Telegram";

  const effectiveEyebrow = eyebrow || defaultEyebrow;
  const effectiveTitle = title || defaultTitle;
  const effectiveButton = buttonText || defaultButton;

  return (
    <section className="oc-connect">
      <p className="oc-eyebrow oc-light">{effectiveEyebrow}</p>
      <h2>{effectiveTitle}</h2>
      {subtitle && (
        <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "600px", margin: "-12px auto 30px", fontSize: "15px", lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
      <div>
        {isExternal ? (
          <a
            className="oc-button oc-outline"
            href={buttonLink}
            target="_blank"
            rel="noreferrer"
          >
            <span>{effectiveButton}</span>
            <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 8 }} />
          </a>
        ) : (
          <Link className="oc-button oc-outline" href={buttonLink}>
            <span>{effectiveButton}</span>
            <ArrowUpRight width={13} height={13} style={{ display: "inline-block", marginLeft: 8 }} />
          </Link>
        )}
      </div>
    </section>
  );
}
