export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} hunchet.blog — written in WordPress,
        served by Vercel.
      </p>
    </footer>
  );
}
