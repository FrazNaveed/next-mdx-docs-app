import { notFound } from "next/navigation";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
// import { CustomMDX } from "@/components/mdx";
import { getDocs } from "@/lib/utils";
import styles from "./page.module.css";
import Link from "next/link";

export function generateStaticParams() {
  const docs = getDocs();

  return docs.map((doc) => ({
    slug: doc.slug.split('/'),  // Split the slug into segments
  }));
}

export default async function Doc({
  params,
}: {
  params: Promise<{ slug: string[] }>;  // Expecting an array of segments
}) {
  const { slug } = await params; // Extract the slug array from params
  const slugPath = slug.join('/');  // Join the slug segments into a path string

  // Find the post based on the full path
  const doc = getDocs().find((doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <header>
        <nav>
          <Link href="/">👈 Go back home</Link>
        </nav>
      </header>
      <main>
        <h1 className={styles.postHeader}>{doc.metadata.title}</h1>
        {doc.metadata.description && (
          <p className={styles.description}>{doc.metadata.description}</p>
        )}
        <article>
          <MDXRemote source={doc.content} />
        </article>
      </main>
    </>
  );
}
