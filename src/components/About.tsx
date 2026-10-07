"use client";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { stats } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) { setV(0); return; } // reset so the count replays on every pass
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const TERMINAL = [
  { k: "name", v: `"${site.name}"` },
  { k: "role", v: `"${site.role}"` },
  { k: "builds", v: `["mobile apps", "tv apps", "web platforms", "ai systems"]` },
  { k: "platforms", v: `["Android", "iOS", "Android TV", "Apple TV"]` },
  { k: "projects", v: `${stats.projects}` },
  { k: "on_google_play", v: `${stats.play}` },
  { k: "obsessed_with", v: `"craft, performance, details"` },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <div ref={ref} className="glass beam beam-on overflow-hidden rounded-2xl font-mono text-[13px]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-white/40">~/hassan — zsh</span>
      </div>
      <div className="space-y-1 p-5 leading-7 text-white/70">
        <div><span className="text-lime">➜</span> <span className="text-neon">~</span> whoami --json</div>
        <div className="text-white/40">{"{"}</div>
        {TERMINAL.map((l, i) => (
          <motion.div
            key={l.k}
            className="pl-5"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: 0.5 + i * 0.22 }}
          >
            <span className="text-violet">"{l.k}"</span>: <span className="text-magenta">{l.v}</span>{i < TERMINAL.length - 1 ? "," : ""}
          </motion.div>
        ))}
        <div className="text-white/40">{"}"}</div>
        <div className="flex items-center gap-1 pt-1">
          <span className="text-lime">➜</span> <span className="text-neon">~</span>
          <span className="ml-1 inline-block h-4 w-2 animate-blink bg-white/70" />
        </div>
      </div>
    </div>
  );
}

export function About() {
  const metrics = [
    { n: stats.projects, s: "", label: "Projects", sub: "Apps, web platforms, AI & data and business systems" },
    { n: stats.play, s: "", label: "On Google Play", sub: "Mobile and Android TV apps with public store listings" },
    { n: stats.platforms, s: "", label: "Platforms", sub: "Android · iOS · Android TV · Apple TV" },
    { n: stats.websites, s: "", label: "Websites shipped", sub: "Product, studio, corporate and launch sites" },
  ];
  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" eyebrow="About" title="Engineer. Designer. Builder of whole products." gradientFrom={3} />
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-relaxed text-white/65">
            {site.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Mobile", "TV", "Web", "AI / ML", "Data", "DevOps", "UI Design"].map((t) => (
                  <span key={t} className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-white/70 transition hover:border-neon/60 hover:text-neon">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal x={30} y={0}>
            <Terminal />
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <TiltCard max={6} className="glass h-full rounded-2xl p-4 sm:p-6">
                <div className="relative z-10">
                  <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-gradient">
                    <CountUp to={m.n} suffix={m.s} />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white sm:mt-3">{m.label}</div>
                  <div className="mt-1 text-[11px] leading-relaxed text-white/45 sm:text-xs">{m.sub}</div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
