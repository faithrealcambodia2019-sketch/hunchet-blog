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
    ? "ចូរឱ្យព្រះបន្ទូលព្រះបំភ្លឺគន្លងជីវិតរបស់អ្នក"
    : "Let God's Living Word Illuminate Your Path.";

  const defaultButton = isKm
    ? "ទំនាក់ទំនងតាម Telegram"
    : "Connect on Telegram";

  const effectiveEyebrow = eyebrow || defaultEyebrow;
  const effectiveTitle = title || defaultTitle;
  const effectiveButton = buttonText || defaultButton;

  return (
    <section className="oc-connect" id="connect">
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <p
          className="oc-eyebrow oc-light"
          style={{
            color: "rgba(255, 255, 255, 0.95)",
            marginBottom: "16px",
            fontSize: "13px",
            letterSpacing: isKm ? "normal" : "0.14em",
          }}
        >
          {effectiveEyebrow}
        </p>
        <h2
          style={{
            color: "#ffffff",
            textShadow: "0 2px 14px rgba(0, 0, 0, 0.75)",
            margin: "0 0 28px",
          }}
        >
          {effectiveTitle}
        </h2>
        {subtitle && (
          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "600px",
              margin: "-12px auto 30px",
              fontSize: "15px",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
        <div style={{ marginTop: "24px" }}>
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
      </div>
    </section>
  );
}
