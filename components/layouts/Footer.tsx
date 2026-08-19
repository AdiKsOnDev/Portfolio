import Link from "next/link";
import { getProfile } from "@/lib/data";

export function Footer() {
  const profile = getProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-muted-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-secondary hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-secondary hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/blog"
              className="text-xs uppercase tracking-wider text-secondary hover:text-foreground transition-colors"
            >
              Archive
            </Link>
          </div>

          <span className="text-center text-xs uppercase tracking-wider text-secondary sm:text-right">
            © {currentYear} {profile.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
