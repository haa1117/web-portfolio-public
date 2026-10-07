"use client";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { SocialIcons } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] px-5 pb-10 pt-16 md:px-10">
      <div aria-hidden className="pointer-events-none select-none text-center font-display text-[clamp(5rem,22vw,22rem)] font-black leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(148,163,255,0.14)]">
        HASSAN
      </div>
      <div className="relative mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-5 font-mono text-xs text-white/40 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <SocialIcons />
          <span>© {new Date().getFullYear()} {site.name}. Designed &amp; built by hand.</span>
        </div>
        <span className="hidden md:inline">Press <kbd className="rounded border border-white/15 px-1.5 py-0.5">⌘</kbd> <kbd className="rounded border border-white/15 px-1.5 py-0.5">K</kbd> to navigate</span>
        <motion.button
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/70 transition hover:border-neon hover:text-neon"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </footer>
  );
}
