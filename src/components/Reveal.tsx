"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  once = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal for headings. */
export function SplitHeading({
  text,
  className,
  gradientFrom,
}: {
  text: string;
  className?: string;
  /** word index from which the text uses the gradient */
  gradientFrom?: number;
}) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const word: Variants = {
    hidden: { y: "110%", rotate: 4, opacity: 0 },
    show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.9, ease } },
  };
  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            variants={word}
            className={`inline-block ${gradientFrom !== undefined && i >= gradientFrom ? "text-gradient-anim" : ""}`}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  gradientFrom,
  blurb,
}: {
  index: string;
  eyebrow: string;
  title: string;
  gradientFrom?: number;
  blurb?: string;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.28em] text-neon">
          <span className="text-white/40">{index}</span>
          <motion.span
            className="h-px w-16 origin-left bg-gradient-to-r from-neon to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease }}
          />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <SplitHeading
        text={title}
        gradientFrom={gradientFrom}
        className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
      />
      {blurb && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">{blurb}</p>
        </Reveal>
      )}
    </header>
  );
}
