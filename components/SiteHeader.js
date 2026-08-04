import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo">
          <span className="site-logo-mark">H</span>
          <span className="site-logo-text">hunchet.blog</span>
        </Link>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <a href="https://hunchetblog.wordpress.com" target="_blank" rel="noreferrer">
            Write on WordPress
          </a>
        </nav>
      </div>
    </header>
  );
}
