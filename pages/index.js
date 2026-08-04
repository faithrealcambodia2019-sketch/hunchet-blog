import Head from "next/head";
import Link from "next/link";
import { getPosts, getFeaturedImage } from "../lib/wordpress";

export async function getStaticProps() {
  try {
    const posts = await getPosts({ perPage: 10 });
    return { props: { posts }, revalidate: 60 };
  } catch (err) {
    return { props: { posts: [], error: err.message }, revalidate: 60 };
  }
}

export default function Home({ posts, error }) {
  return (
    <>
      <Head>
        <title>hunchet.blog</title>
      </Head>
      <main className="container">
        <header className="site-header">
          <h1>hunchet.blog</h1>
          <p>Powered by WordPress, hosted on Vercel</p>
        </header>

        {error && (
          <p className="error">
            Couldn&apos;t load posts from WordPress: {error}
          </p>
        )}

        <div className="post-grid">
          {posts.map((post) => {
            const image = getFeaturedImage(post);
            return (
              <article key={post.id} className="post-card">
                {image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" className="post-thumb" />
                )}
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link href={`/posts/${post.slug}`}>Read more →</Link>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
