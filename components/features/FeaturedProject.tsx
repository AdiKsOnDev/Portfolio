"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui";
import { getProjectSlug } from "@/lib/data";
import type { Project } from "@/types";

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <section className="bg-muted py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <FadeIn delay={0} className="lg:col-span-3 text-center md:text-left">
            <div className="relative mb-6 flex aspect-video items-center justify-center overflow-hidden border border-muted-border bg-foreground/5 transition-all duration-300 hover:border-accent/50">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 3rem), 60vw"
                  className="object-cover"
                />
              ) : (
                <span className="text-secondary text-xs uppercase">Preview</span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs uppercase tracking-wider text-secondary">
                {project.tags.slice(0, 3).join(" / ")}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-4">
              {project.title}
            </h2>
            <p className="text-secondary text-sm mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <Link
                href={`/projects/${getProjectSlug(project)}`}
                className="inline-flex items-center gap-2 text-sm text-accent transition-all duration-300 hover:underline"
              >
                Project Details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm font-sans inline-flex items-center gap-2 hover:underline transition-all duration-300"
                >
                  <span className="text-xs">&lt;&gt;</span>
                  Repository
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm font-sans inline-flex items-center gap-2 hover:underline transition-all duration-300"
                >
                  Live Demo
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={150} className="lg:col-span-2">
            <div className="bg-card border border-muted-border p-6 transition-all duration-300 hover:border-accent/50">
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs uppercase tracking-wider text-accent">
                  {project.category}
                </span>
                <span className="text-xs uppercase tracking-wider text-secondary bg-muted px-2 py-1">
                  {project.status.replace("-", " ")}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                {project.longDescription.slice(0, 200)}...
              </p>
              <dl className="space-y-4 border-t border-muted-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary">
                    Language
                  </dt>
                  <dd className="font-mono text-sm text-foreground">
                    {project.tags.slice(0, 3).join(" / ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary">
                    Year
                  </dt>
                  <dd className="font-serif text-foreground">{project.year}</dd>
                </div>
              </dl>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
