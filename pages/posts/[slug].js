import Head from "next/head";
import Link from "next/link";
import { getAllSlugs, getPostBySlug, getFeaturedImage } from "../../lib/wordpress";

export async function getStaticPaths() {
  let slugs = [];
  try {
    slugs = await getAllSlugs();
  } catch (err) {
    // If WordPress is unreachable at build time, fall back to on-demand rendering.
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { post }, revalidate: 60 };
}

export default function Post({ post }) {
  const image = getFeaturedImage(post);

  return (
    <>
      <Head>
        <title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </Head>
      <main className="container">
        <Link href="/">← Back to all posts</Link>
        <article>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="post-hero" />
          )}
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
    </>
  );
}
