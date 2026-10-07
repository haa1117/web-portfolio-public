"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/site";
import { GithubIcon } from "./icons";
import { Reveal, SectionHeading } from "./Reveal";

const SITES = [
  {
    name: "Future Watch",
    url: site.sites.futurewatch,
    host: "futurewatch.co",
    img: "/sites/futurewatch.jpg",
    kind: "Product studio",
    github: "https://github.com/haa1117/future-watch-public",
    blurb:
      "The home of the app portfolio — a React + TypeScript site with a live, admin-managed app registry, per-app privacy pages, store badges and smooth Framer Motion storytelling.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Cloudflare R2"],
    accent: "#22d3ee",
  },
  {
    name: "FW Global",
    url: site.sites.fwglobal,
    host: "fwglobal.co",
    img: "/sites/fwglobal.jpg",
    kind: "AI company site",
    github: "https://github.com/haa1117/fw-global-public",
    blurb:
      "A dark, editorial marketing site for an AI-agents company, featuring the Kalendra scheduling platform, careers and a scroll-driven narrative with a custom motion system.",
    stack: ["React", "TypeScript", "Tailwind", "Scroll reveals", "SEO"],
    accent: "#8b5cf6",
  },
];

function BrowserCard({ s, i }: { s: (typeof SITES)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 120, damping: 16 });
  const sy = useSpring(y, { stiffness: 120, damping: 16 });
  const rx = useTransform(sy, [0, 1], [6, -6]);
  const ry = useTransform(sx, [0, 1], [-8, 8]);
  const imgY = useTransform(sy, [0, 1], ["0%", "-6%"]);
  const flip = i % 2 === 1;

  return (
    <Reveal>
      <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.a
          ref={ref}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="Visit"
          className="group relative block [perspective:1200px]"
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            x.set((e.clientX - r.left) / r.width);
            y.set((e.clientY - r.top) / r.height);
          }}
          onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
        >
          <div className="absolute -inset-6 rounded-[40px] opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: s.accent }} />
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="glass beam relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.06] px-4 py-1 font-mono text-[11px] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" /> {s.host}
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.div style={{ y: imgY }} className="absolute inset-0 h-[112%] w-full">
                <Image src={s.img} alt={`${s.name} website`} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.a>

        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: s.accent }}>
            <span className="text-white/35">0{i + 1}</span>
            <span className="h-px w-10" style={{ background: s.accent }} />
            {s.kind}
          </div>
          <h3 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">{s.name}</h3>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{s.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/65">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="group/l inline-flex items-center gap-3 text-sm font-semibold text-white"
          >
            <span className="relative">
              Visit {s.host}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover/l:scale-x-100" style={{ background: s.accent }} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition group-hover/l:rotate-45 group-hover/l:border-transparent" style={{ ["--c" as string]: s.accent }}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          {s.github && (
            <a href={s.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition hover:border-white/40 hover:text-white">
              <GithubIcon className="h-4 w-4" /> Source on GitHub
            </a>
          )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Websites() {
  return (
    <section id="websites" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow="Websites"
          title="Websites designed and built end to end."
          gradientFrom={1}
          blurb="Two live company websites — a multi-platform app studio and an AI company — each with its own identity, motion language and codebase. The HIK Textiles site is in Featured work above."
        />
        <div className="space-y-28 md:space-y-40">
          {SITES.map((s, i) => <BrowserCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
