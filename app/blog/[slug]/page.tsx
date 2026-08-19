import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/data";
import { getPostBySlug } from "@/lib/data/blog-content.server";
import { extractHeadings, type Heading } from "@/lib/utils";
import { ContinueReading } from "@/components/features";
import {
  MobileTableOfContents,
  PostMetadata,
  TableOfContents,
} from "@/components/features/PostSidebar";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Adil Alizada`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const headings: Heading[] = extractHeadings(post.content || "");

  return (
    <article className="mx-auto max-w-7xl px-6 pb-16 pt-16">
      <header className="mb-20 text-center lg:mb-32">
        <h1 className="mx-auto max-w-5xl font-serif text-5xl leading-tight text-foreground sm:text-6xl lg:text-7xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-lg italic text-secondary">
          {post.excerpt}
        </p>
        <div className="mt-8 lg:hidden">
          <PostMetadata post={post} compact />
        </div>
      </header>

      {post.coverImage && (
        <div className="mx-auto mb-16 aspect-video w-full max-w-5xl overflow-hidden border border-muted-border bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mb-10 lg:hidden">
        <MobileTableOfContents headings={headings} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,7fr)_minmax(0,2fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 mx-auto w-fit max-w-full">
            <TableOfContents headings={headings} />
          </div>
        </aside>

        <div>
          <BlogMarkdown content={post.content || ""} />

          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-muted-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-secondary border border-muted-border px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 mx-auto w-fit max-w-full space-y-6">
            <PostMetadata post={post} />
          </div>
        </aside>
      </div>

      <ContinueReading posts={allPosts} currentSlug={post.slug} />
    </article>
  );
}
