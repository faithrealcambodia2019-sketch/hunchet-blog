import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} hunchet.blog — written in WordPress,
        served by Vercel.
      </p>
      <p>
        <Link href="/all-pages">All Pages</Link>
      </p>
    </footer>
  );
}
