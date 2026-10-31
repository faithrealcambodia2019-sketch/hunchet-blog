import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ConnectBanner from "../components/ConnectBanner";
import { useT } from "../lib/i18n";
import { PORTRAIT } from "../lib/media";
import { getPosts, formatDate, getExcerptText } from "../lib/wordpress";
import { ArrowUpRight } from "../components/Icons";

const arrow = (
  <ArrowUpRight
    width={14}
    height={14}
    style={{ display: "inline-block", marginLeft: 6, verticalAlign: "-1px" }}
  />
);

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 6 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts = [], error }) {
  const router = useRouter();
  const t = useT();
  const locale = router.locale || "km";
  const isKm = locale === "km";
  const homeRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1000px)");
    let frame;
    const paint = () => {
      if (!reduced.matches && desktop.matches) {
        homeRef.current?.querySelectorAll(".oc-feature-banner").forEach((banner) => {
          const rect = banner.getBoundingClientRect();
          if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            banner.style.setProperty(
              "--parallax",
              `${Math.max(
                -35,
                Math.min(35, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.065)
              )}px`
            );
          }
        });
      }
      frame = undefined;
    };
    const scroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="oc-home" ref={homeRef}>
      <Head>
        <title>
          {isKm
            ? "លោកគ្រូ ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន & ការបង្រៀនព្រះបន្ទូល"
            : "Leader Hun Chet — Personal Blog & Biblical Teaching"}
        </title>
        <meta
          name="description"
          content={
            isKm
              ? "ប្លុកផ្ទាល់ខ្លួនរបស់លោកគ្រូ ហ៊ុន ចិត្ត — ចែករំលែកការបង្រៀនព្រះគម្ពីរ អត្ថបទសញ្ជឹងគិត ដំណើរជីវិត និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនខាងវិញ្ញាណ។"
              : "Personal blog of Leader Hun Chet — sharing biblical exposition, devotional writings, life journey reflections, and spiritual resources."
          }
        />
        <meta
          property="og:title"
          content={
            isKm
              ? "លោកគ្រូ ហ៊ុន ចិត្ត — ប្លុកផ្ទាល់ខ្លួន"
              : "Leader Hun Chet — Personal Blog"
          }
        />
        <meta
          property="og:description"
          content={
            isKm
              ? "ការបង្រៀនព្រះគម្ពីរ ការអធិប្បាយ និងធនធានជំនឿ ដោយលោកគ្រូ ហ៊ុន ចិត្ត។"
              : "Biblical teaching, devotional reflections, and spiritual resources by Leader Hun Chet."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={PORTRAIT} />
      </Head>

      <SiteHeader />

      <main id="main-content">
        {/* 1. HERO SECTION (Identical to All Nations Church Hero) */}
        <section className="oc-hero oc-photo-section" id="home" aria-labelledby="oc-hero-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="oc-section-photo oc-hero-photo"
            src="/images/hero-cover.jpg"
            width="1024"
            height="576"
            alt="Leader Hun Chet and congregation in Phnom Penh"
          />
          <div className="oc-hero-content">
            <p className="oc-eyebrow oc-light">
              {isKm ? "ភ្នំពេញ កម្ពុជា" : "Phnom Penh, Cambodia"}
              <span aria-hidden="true">/</span>
              {isKm ? "សូមស្វាគមន៍មកកាន់ប្លុកផ្លូវការ" : "Welcome to Personal Blog"}
            </p>
            <h1 id="oc-hero-title">
              {isKm ? (
                <>
                  ចាក់ឫសក្នុងព្រះបន្ទូល។
                  <br />
                  រស់ដើម្បីព្រះគ្រីស្ទ។
                </>
              ) : (
                <>
                  Rooted In Truth.
                  <br />
                  Living For Christ.
                </>
              )}
            </h1>
            <p className="oc-hero-khmer" lang="km">
              លោកគ្រូ ហ៊ុន ចិត្ត — ការបង្រៀនព្រះគម្ពីរ និងការបណ្តុះបណ្តាលសិស្សនៅកម្ពុជា
            </p>
            <div className="oc-hero-actions">
              <Link href="/articles" className="oc-button oc-outline">
                {isKm ? "អានអត្ថបទទាំងអស់" : "Explore Biblical Articles"}
                {arrow}
              </Link>
            </div>
          </div>
          <a
            className="oc-scroll-cue"
            href="#welcome"
            aria-label={isKm ? "ស្វែងយល់បន្ថែម" : "Discover more"}
          >
            <span>{isKm ? "ស្វែងយល់បន្ថែម" : "Come Together"}</span>
            <span className="oc-chevron" aria-hidden="true" />
          </a>
          <span className="oc-hero-side-note" lang="en" aria-hidden="true">
            EXPOSITORY PREACHING • BIBLICAL DISCIPLESHIP
          </span>
        </section>

        {/* 2. SUNDAY STRIP / QUICK BAR */}
        <div
          className="oc-sunday-strip"
          role="region"
          aria-label={isKm ? "ព័ត៌មានព័ន្ធកិច្ច" : "Ministry information"}
        >
          <p>
            <span className="oc-status-dot" aria-hidden="true" />
            {isKm ? "ការបង្រៀនព្រះបន្ទូល & ព័ន្ធកិច្ច" : "Biblical Teaching & Ministry"}
          </p>
          <p>
            {isKm ? "ទីតាំង" : "Location"}{" "}
            <strong>{isKm ? "ភ្នំពេញ កម្ពុជា" : "Phnom Penh, Cambodia"}</strong>
          </p>
          <p>
            {isKm ? "ភាសា" : "Languages"} <span className="oc-strip-divider">/</span>{" "}
            <strong>{isKm ? "ខ្មែរ • English • 한국어" : "Khmer, English & Korean"}</strong>
          </p>
          <Link href="/contact">
            {isKm ? "ទំនាក់ទំនង និងអធិស្ឋាន" : "Connect & Prayer"}
            {arrow}
          </Link>
        </div>

        {/* 3. WELCOME & WHO WE ARE */}
        <section className="oc-welcome oc-section" id="welcome">
          <p className="oc-eyebrow">
            {isKm ? "អំពីលោកគ្រូ ហ៊ុន ចិត្ត" : "About Leader Hun Chet"}
          </p>
          <h2>
            {isKm ? (
              <>
                សេចក្តីជំនឿដែល
                <br />
                ចាក់ឫសក្នុងព្រះបន្ទូល។
              </>
            ) : (
              <>
                Faith Rooted
                <br />
                in the Living Word.
              </>
            )}
          </h2>
          <p className="oc-section-copy">
            {isKm
              ? "មិនថាដំណើរជីវិតរបស់អ្នកយ៉ាងណា ឬអ្នកកំពុងស្វែងយល់ពីជំនឿលើព្រះយេស៊ូវគ្រីស្ទទេ ព្រះបន្ទូលព្រះជាចង្កៀងបំភ្លឺផ្លូវជានិច្ច។ ទីនេះជាកន្លែងកត់ត្រា និងចែករំលែកនូវសេចក្តីពិតនៃព្រះគម្ពីរ ការបង្រៀនស៊ីជម្រៅ ការបណ្តុះសិស្ស និងធនធានស្មារតីសម្រាប់ការរីកចម្រើនក្នុងព្រះគ្រីស្ទ។"
              : "Whatever your journey, wherever you are exploring faith in Jesus Christ, God's Word is a lamp to your feet. Here you will find biblically sound exegesis, pastoral writings, student discipleship insights, and spiritual resources for lasting growth."}
          </p>
          <p className="oc-khmer-caption" lang="km">
            ស្វាគមន៍មកកាន់គេហទំព័រផ្លូវការរបស់លោកគ្រូ ហ៊ុន ចិត្ត
          </p>
          <Link className="oc-text-link" href="/about">
            {isKm ? "ស្វែងយល់បន្ថែមអំពីដំណើរជីវិត" : "Learn more about my story"}
            {arrow}
          </Link>
        </section>

        {/* 4. THREE CURATED PILLAR CARDS (Signature All Nations Church Image Card Grid) */}
        <section className="oc-ministries oc-section" id="pillars">
          <div className="oc-section-heading">
            <p className="oc-eyebrow">
              {isKm ? "សរសរស្តម្ភនៃព័ន្ធកិច្ច" : "Core Foundations"}
            </p>
            <h2>{isKm ? "ការបង្រៀន និងធនធានជំនឿ" : "Teaching & Spiritual Resources"}</h2>
          </div>
          <div className="oc-ministry-grid">
            {/* Card 1: Articles */}
            <Link href="/articles" className="oc-image-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pastors-pulpit.jpg"
                alt="Biblical Articles and Exegesis"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">01</span>
                <h3>{isKm ? "អត្ថបទព្រះគម្ពីរ" : "Biblical Articles"}</h3>
                <p>
                  {isKm
                    ? "ការពន្យល់ព្រះគម្ពីរ ការបង្រៀនព្រះបន្ទូល និងការរស់នៅជាគ្រីស្ទបរិស័ទ។"
                    : "Verse-by-verse scriptural exegesis, sermon manuscripts, and Christian living."}
                </p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>

            {/* Card 2: 365 Devotions */}
            <Link href="/devotions" className="oc-image-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sermon-purpose-congregation.jpg"
                alt="365 Daily Devotion"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">02</span>
                <h3>{isKm ? "ការសញ្ជឹងគិត ៣៦៥ ថ្ងៃ" : "365 Devotions"}</h3>
                <p>
                  {isKm
                    ? "អាហារខាងវិញ្ញាណប្រចាំថ្ងៃ និងការអធិស្ឋានពីព្រះគម្ពីរខ្មែរ ១៩៥៤។"
                    : "Daily spiritual bread, prayer focus, and meditation from 1954 Khmer Scripture."}
                </p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>

            {/* Card 3: Library */}
            <Link href="/library" className="oc-image-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/all-nations-institute-campus.jpg"
                alt="Theological Library"
                loading="lazy"
              />
              <div className="oc-card-content">
                <span className="oc-card-number">03</span>
                <h3>{isKm ? "បណ្ណាល័យសៀវភៅ" : "Theological Library"}</h3>
                <p>
                  {isKm
                    ? "សៀវភៅពន្យល់ព្រះគម្ពីរ Matthew Henry និងមេរៀនបណ្តុះសិស្សជាភាសាខ្មែរ។"
                    : "Matthew Henry commentary, study handbooks, and discipleship curriculum."}
                </p>
                <span className="oc-card-arrow">↗</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 5. VISIT / SCRIPTURE DETAILS SECTION */}
        <section className="oc-visit oc-section" id="faith">
          <div className="oc-visit-intro">
            <p className="oc-eyebrow">
              {isKm ? "ព្រះបន្ទូលប្រចាំថ្ងៃ" : "Daily Scripture Spotlight"}
            </p>
            <h2>
              {isKm ? (
                <>
                  ចូរទីពឹងដល់
                  <br />
                  ព្រះយេហូវ៉ា។
                </>
              ) : (
                <>
                  Trust in the
                  <br />
                  Lord with all heart.
                </>
              )}
            </h2>
            <p>
              {isKm
                ? "«ចូរ​ទីពឹង​ដល់​ព្រះយេហូវ៉ា​ឲ្យ​អស់​អំពី​ចិត្ត កុំ​ឲ្យ​ពឹងផ្អែក​លើ​យោបល់​របស់​ខ្លួន​ឡើយ ត្រូវ​ឲ្យ​ទទួល​ស្គាល់​ទ្រង់​នៅ​គ្រប់​ទាំង​ផ្លូវ​ឯង នោះ​ទ្រង់​នឹង​តំរង់​អស់​ទាំង​ផ្លូវ​ច្រក​របស់​ឯង» — សុភាសិត ៣:៥-៦"
                : "“Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.” — Proverbs 3:5-6"}
            </p>
            <Link className="oc-button oc-solid" href="/devotions">
              {isKm ? "អានការសញ្ជឹងគិតថ្ងៃនេះ" : "Read Today's Devotion"}
              {arrow}
            </Link>
          </div>

          <div className="oc-visit-details">
            <div className="oc-detail-row">
              <span className="oc-detail-number">01</span>
              <div>
                <h3>{isKm ? "ការបង្រៀនព្រះគម្ពីរ" : "Biblical Exegesis"}</h3>
                <p>
                  {isKm
                    ? "ការពន្យល់ព្រះគម្ពីរជាប្រព័ន្ធ និងការបកស្រាយបទគម្ពីរយ៉ាងស៊ីជម្រៅ ដោយយោងតាមព្រះគម្ពីរភាសាខ្មែរ ១៩៥៤។"
                    : "Systematic exposition of scripture and biblical doctrine anchored in the 1954 Khmer text."}
                </p>
              </div>
            </div>

            <div className="oc-detail-row">
              <span className="oc-detail-number">02</span>
              <div>
                <h3>{isKm ? "ការបណ្តុះបណ្តាលសិស្ស" : "Next Gen Discipleship"}</h3>
                <p>
                  {isKm
                    ? "ការបណ្តុះបណ្តាលយុវជន សិស្ស និស្សិត និងអ្នកដឹកនាំជំនាន់ក្រោយ ដើម្បីបម្រើព្រះគ្រីស្ទនៅក្នុងសង្គមជាតិ។"
                    : "Equipping university students, youth, and next-generation leaders to serve Christ effectively."}
                </p>
              </div>
            </div>

            <div className="oc-detail-row">
              <span className="oc-detail-number">03</span>
              <div>
                <h3>{isKm ? "ធនធានបណ្ណាល័យឌីជីថល" : "Digital Library"}</h3>
                <p>
                  {isKm
                    ? "ការបកប្រែ និងរៀបរៀងសៀវភៅពន្យល់ព្រះគម្ពីរ ការសញ្ជឹងគិត ៣៦៥ ថ្ងៃ និងឯកសារជំនឿឥតគិតថ្លៃ។"
                    : "Digital preservation of commentaries, devotional handbooks, and free ministry downloads."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FEATURE BANNER WITH PARALLAX */}
        <section className="oc-feature-banner oc-photo-section">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="oc-section-photo"
            src="/images/worship-service.jpg"
            alt="Congregation worshipping in Phnom Penh"
            loading="lazy"
          />
          <div className="oc-banner-content">
            <p className="oc-eyebrow oc-light">
              {isKm ? "ការត្រាស់ហៅ និងបេសកកម្ម" : "A Calling to Serve"}
            </p>
            <h2>
              {isKm
                ? "បំពាក់បំប៉នពួកបរិសុទ្ធ សម្រាប់ការងារបម្រើព្រះ"
                : "Equipping the saints for the work of ministry."}
            </h2>
            <p>
              {isKm
                ? "«ដើម្បី​ឲ្យ​ពួក​បរិសុទ្ធ​បាន​គ្រប់លក្ខណៈ សម្រាប់​ការងារ​បម្រើ និង​សម្រាប់​ស្អាង​រូបកាយ​នៃ​ព្រះគ្រីស្ទ​ឡើង» — អេភេសូរ ៤:១២"
                : "“To equip his people for works of service, so that the body of Christ may be built up.” — Ephesians 4:12"}
            </p>
            <Link className="oc-button oc-outline" href="/about">
              {isKm ? "ស្វែងយល់បន្ថែមអំពីបេសកកម្ម" : "Discover our mission"}
              {arrow}
            </Link>
          </div>
        </section>

        {/* 7. RECENT ARTICLES / EXPLORE SECTION */}
        <section className="oc-explore oc-section" id="articles">
          <div>
            <p className="oc-eyebrow">
              {isKm ? "អត្ថបទថ្មីៗ" : "Latest Articles"}
            </p>
            <h2>
              {isKm ? (
                <>
                  អាន ពិចារណា
                  <br />
                  និងរីកចម្រើនជាមួយគ្នា។
                </>
              ) : (
                <>
                  Read, reflect,
                  <br />
                  and grow together.
                </>
              )}
            </h2>
            <p className="oc-section-copy" style={{ margin: "0 0 24px", maxWidth: "420px" }}>
              {isKm
                ? "ស្វែងរកអត្ថបទសញ្ជឹងគិត ការបង្រៀនព្រះបន្ទូល និងការឆ្លុះបញ្ចាំងជីវិតគ្រីស្ទបរិស័ទដែលទើបនឹងបោះពុម្ពផ្សាយ។"
                : "Explore recently published biblical teachings, pastoral reflections, and spiritual essays."}
            </p>
            <Link className="oc-text-link" href="/articles">
              {isKm ? "មើលអត្ថបទទាំងអស់" : "View all articles"}
              {arrow}
            </Link>
          </div>

          <div className="oc-explore-links">
            {posts && posts.length > 0 ? (
              posts.slice(0, 4).map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`}>
                  <div>
                    <small>{formatDate(post.date)}</small>
                    <strong dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </div>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>
                {isKm ? "មិនមានអត្ថបទថ្មីនៅឡើយទេ។" : "No recent articles available."}
              </p>
            )}
          </div>
        </section>

        {/* 8. CONNECT BANNER */}
        <ConnectBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
