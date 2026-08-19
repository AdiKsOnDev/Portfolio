"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeaturedProject, getProjectSlug } from "@/lib/data";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui";

export function CurrentWork() {
  const project = getFeaturedProject();

  if (!project) return null;

  return (
    <section className="bg-muted py-24">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
        <FadeIn>
          <span className="text-xs uppercase tracking-wider text-accent font-sans mb-8 block">
            Current Work
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={100}>
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
                {project.title}
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-8">
                {project.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href={`/projects/${getProjectSlug(project)}`}
                  className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-xs uppercase tracking-wider text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
                >
                  View Project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
                  >
                    <Github className="w-4 h-4" />
                    View Repository
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.links.documentation && (
                  <a
                    href={project.links.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-muted-border text-secondary px-6 py-3 text-sm uppercase tracking-wider hover:border-accent/50 hover:text-foreground transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Documentation
                  </a>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative overflow-hidden border border-muted-border bg-card transition-all duration-300">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  sizes="(max-width: 1024px) calc(100vw - 3rem), 50vw"
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="aspect-video flex items-center justify-center bg-muted">
                  <span className="text-secondary text-sm uppercase">Preview</span>
                </div>
              )}
              <div className="p-4 border-t border-muted-border">
                <span className="text-xs text-secondary font-mono">
                  {project.tags.slice(0, 3).join(" / ")}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
