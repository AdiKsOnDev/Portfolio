import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Adil Alizada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-6 py-24">
      <div className="w-full border-y border-muted-border py-16 text-center sm:py-20">
        <div
          aria-label="Error 404"
          className="flex items-center justify-center font-serif text-[clamp(7rem,22vw,16rem)] font-bold leading-[0.75] text-foreground"
        >
          <span aria-hidden="true">4</span>
          <Image
            src="/logo.png"
            alt=""
            width={641}
            height={565}
            aria-hidden="true"
            className="mx-[0.03em] h-[0.68em] w-auto"
          />
          <span aria-hidden="true">4</span>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-accent">
            Page not found
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            This route leads nowhere.
          </h1>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-secondary">
            The page may have moved, or the address may be incorrect. You can head home
            or continue reading from the blog.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 text-xs uppercase tracking-wider text-accent-foreground transition-opacity hover:opacity-90"
            >
              Return home
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-muted-border px-4 py-2 text-xs uppercase tracking-wider text-secondary transition-colors hover:border-accent/50 hover:text-foreground"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
