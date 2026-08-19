"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate, type Heading } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <h4 className="text-xs uppercase tracking-wider text-secondary mb-4">
        On This Page
      </h4>
      <ul className="border-l border-muted-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <button
                onClick={() => {
                  const element = document.getElementById(heading.id);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setActiveId(heading.id);
                }}
                title={heading.text}
                className={`-ml-px block w-full border-l-2 py-1.5 text-left text-sm leading-snug transition-colors line-clamp-2 ${
                  heading.level === 3 ? "pl-7" : "pl-4"
                } ${
                  isActive
                    ? "border-accent text-accent font-medium"
                    : "border-transparent text-secondary hover:border-muted-border hover:text-foreground"
                }`}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileTableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <details className="group border-y border-muted-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xs uppercase tracking-wider text-secondary">
        On This Page
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <nav aria-label="Table of contents" className="pb-4">
        <ul className="space-y-1 border-l border-muted-border">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block py-1.5 text-sm leading-snug text-secondary transition-colors hover:text-foreground ${
                  heading.level === 3 ? "pl-7" : "pl-4"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}

interface PostMetadataProps {
  post: BlogPost;
  compact?: boolean;
}

export function PostMetadata({ post, compact = false }: PostMetadataProps) {
  return (
    <div className={compact ? "grid grid-cols-3 gap-4 text-center" : "space-y-6"}>
      <div>
        <span className="text-xs uppercase tracking-wider text-secondary block mb-1">
          Published
        </span>
        <span className="font-serif text-sm text-foreground">
          {formatDate(post.publishedAt)}
        </span>
      </div>
      <div>
        <span className="text-xs uppercase tracking-wider text-secondary block mb-1">
          Reading Time
        </span>
        <span className="font-serif italic text-sm text-accent">
          {post.readTime}
        </span>
      </div>
      <div>
        <span className="text-xs uppercase tracking-wider text-secondary block mb-1">
          Topic
        </span>
        <span className="font-serif italic text-sm text-foreground">
          {post.category}
        </span>
      </div>
    </div>
  );
}
