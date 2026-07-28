"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getContact } from "@/lib/data";
import { Mail, Copy, Check } from "lucide-react";
import { FadeIn, useNotification } from "@/components/ui";

// The address is kept base64-encoded in the source so scrapers don't harvest
// it; it's only decoded in the browser when a visitor asks to see it.
const ENCODED_EMAIL = "YWRpbC1ibG9nLmRpc2FycmF5OTg2QHBhc3NtYWlsLm5ldAo=";
const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-";
const PLACEHOLDER = "I am not a Scraper";

function decodeEmail(): string {
  try {
    // .trim() drops the trailing newline baked into the encoded value
    return atob(ENCODED_EMAIL).trim();
  } catch {
    return "";
  }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveals `target` with a left-to-right "decrypting" scramble once `active`
 * becomes true, calling `onDone` a single time when the reveal finishes.
 * Returns "" while idle so the caller can show a placeholder instead.
 */
function useScramble(target: string, active: boolean, onDone: () => void) {
  const [text, setText] = useState("");
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || !target) {
      doneRef.current = false;
      return;
    }

    doneRef.current = false;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setText(target);
      onDone();
    };

    if (prefersReducedMotion()) {
      const timer = window.setTimeout(finish, 0);
      return () => window.clearTimeout(timer);
    }

    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const out = target
        .split("")
        .map((ch, i) => {
          const local = progress * target.length - i; // wave position at char i
          if (local >= 1) return ch; // locked in
          if (local > 0)
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          return " "; // not yet reached — keep width stable
        })
        .join("");
      setText(out);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, onDone]);

  return text;
}

export function Contact() {
  const contact = getContact();
  const email = decodeEmail();
  const { notify } = useNotification();

  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      notify("Email copied to clipboard");
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify("Failed to copy email", "error");
    }
  }, [email, notify]);

  const scrambled = useScramble(email, revealed, copy);

  useEffect(
    () => () => {
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    },
    []
  );

  const handleClick = () => {
    if (!revealed) setRevealed(true); // first click: reveal (auto-copies on finish)
    else copy(); // afterwards: copy again
  };

  const hint = !revealed
    ? "Click to reveal & copy my email"
    : copied
      ? "Copied to clipboard"
      : "Click again to copy";

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <FadeIn>
            <span className="text-xs uppercase tracking-wider text-accent font-sans mb-8 block">
              Contact
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-6">
              Get in touch
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              {contact.availability.message}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <button
              type="button"
              onClick={handleClick}
              aria-label={revealed ? "Copy email address" : "Reveal email address"}
              className="group inline-flex max-w-full items-center gap-3 border border-muted-border bg-card px-5 py-4 text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent sm:px-8"
            >
              <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
              <span className="min-w-0 break-all text-left font-mono text-base sm:text-lg">
                {revealed ? scrambled : PLACEHOLDER}
              </span>
              {revealed && (
                <span className="flex-shrink-0 text-secondary transition-colors group-hover:text-accent">
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </span>
              )}
            </button>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mt-3 text-xs text-secondary" aria-live="polite">
              {hint}
            </p>
            <div className="mt-4 text-xs text-secondary">
              Response time: {contact.availability.responseTime} ·{" "}
              {contact.workingHours.hours} ({contact.workingHours.timezone})
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
