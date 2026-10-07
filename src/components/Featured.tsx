"use client";
import { motion } from "framer-motion";
import { Check, Link2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { flagships, type Project } from "@/lib/data";
import { Chips, ProjectLinks, StatusBadge } from "./ProjectBits";
import { Reveal, SectionHeading } from "./Reveal";

const ACCENT: Record<string, string> = {
  "kalendra-website": "#fb923c",
  "kalendra-ai": "#f97316",
  hearthboard: "#facc15",
  "al-noor": "#34d399",
  "hik-textiles": "#a3e635",
};
const HOST: Record<string, string> = {
  "kalendra-website": "getkalendra.com",
  "al-noor": "app-eight-brown-88.vercel.app",
  "hik-textiles": "hiktextiles.com",
};

const featured = flagships;

/** Desktop browser frame with a thumbnail switcher (web flagships). */
function BrowserVisual({ p, accent }: { p: Project; accent: string }) {
  const all = [p.media.hero!, ...p.media.shots];
  const multi = all.length > 1;
  const [i, setI] = useState(0);
  const cur = all[i];
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[40px] opacity-25 blur-3xl" style={{ background: accent }} />
      <div className="glass relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto flex max-w-[70%] items-center gap-2 truncate rounded-md bg-white/[0.06] px-4 py-1 font-mono text-[0.6875rem] text-white/65">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" /> {HOST[p.id]}
          </span>
        </div>
        <div className="relative" style={{ aspectRatio: `${cur.w} / ${cur.h}` }}>
          <Image key={cur.src} src={cur.src} alt={`${p.name} screenshot ${i + 1} of ${all.length}`} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" />
        </div>
      </div>
      {multi && <ul className="relative mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(all.length, 5)}, minmax(0, 1fr))` }} aria-label={`${p.name} screenshots`}>
        {all.map((s, k) => (
          <li key={s.src}>
            <button
              onClick={() => setI(k)}
              aria-label={`Show ${p.name} screenshot ${k + 1}`}
              aria-pressed={k === i}
              className={`relative block w-full overflow-hidden rounded-lg ring-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${k === i ? "opacity-100 ring-2" : "opacity-55 ring-white/15 hover:opacity-90"}`}
              style={{ aspectRatio: "16 / 10", ...(k === i ? { ["--tw-ring-color" as string]: accent } : {}) }}
            >
              <Image src={s.src} alt="" fill sizes="120px" className="object-cover object-top" />
            </button>
          </li>
        ))}
      </ul>}
    </div>
  );
}

/** Three Play-listing phone graphics in a fan (mobile flagships). */
function PhoneVisual({ p, accent }: { p: Project; accent: string }) {
  const s = p.media.shots.slice(0, 3);
  const order = [s[1], s[0], s[2]].filter(Boolean);
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="absolute inset-x-8 inset-y-10 rounded-full opacity-30 blur-3xl" style={{ background: accent }} />
      <div className="relative flex items-end justify-center gap-2 sm:gap-4">
        {order.map((img, k) => {
          const center = k === 1;
          return (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ delay: 0.1 * k, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/15 ${center ? "z-10 w-[40%]" : "w-[30%] mb-4 sm:mb-8"}`}
              style={{ aspectRatio: `${img.w} / ${img.h}` }}
            >
              <Image src={img.src} alt={`${p.name} Google Play graphic ${k + 1}`} fill sizes="(min-width:1024px) 220px, 40vw" className="object-cover" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FlagshipBlock({ p, i }: { p: Project; i: number }) {
  const accent = ACCENT[p.id] ?? "#22d3ee";
  const web = p.id === "kalendra-website" || p.id === "al-noor" || p.id === "hik-textiles";
  const flip = i % 2 === 1;
  return (
    <Reveal>
      <article id={`featured-${p.id}`} aria-labelledby={`t-${p.id}`} className="glass rounded-[28px] p-5 sm:p-8 lg:p-12">
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {web ? <BrowserVisual p={p} accent={accent} /> : <PhoneVisual p={p} accent={accent} />}

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em]" style={{ color: accent }}>
              <span className="text-white/50">0{i + 1}</span>
              <span className="h-px w-8" style={{ background: accent }} />
              {p.id === "hik-textiles" ? "Website" : "Flagship"}
              <StatusBadge status={p.status} />
            </div>
            <h3 id={`t-${p.id}`} className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">{p.name}</h3>
            <p className="mt-3 text-lg font-medium leading-snug text-white/85 md:text-xl">{p.tagline}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/65">{p.summary}</p>

            {p.relation && (
              <p className="mt-5 flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-sm leading-relaxed text-white/70">
                <Link2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} /> <span>{p.relation}</span>
              </p>
            )}

            <h4 className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/55">What it does</h4>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {p.features.slice(0, 4).map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.8125rem] leading-snug text-white/70">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} /> {f}
                </li>
              ))}
            </ul>

            {p.highlights.length > 0 && (
              <>
                <h4 className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/55">Engineering highlights</h4>
                <ul className="mt-3 space-y-2">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="border-l-2 pl-3 text-[0.8125rem] leading-snug text-white/65" style={{ borderColor: `${accent}88` }}>{h}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-7 space-y-3">
              <Chips items={p.platforms} tone="platform" />
              <Chips items={p.stack} />
            </div>
            <div className="mt-8"><ProjectLinks p={p} size="lg" /></div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Featured() {
  return (
    <section id="featured" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Featured work"
          title="Five projects, built end to end."
          gradientFrom={2}
          blurb="A calendar assistant and its launch site, a social widget app, a ledger system that replaced a spreadsheet, and a corporate site for a yarn manufacturer. Each links to the live product or store listing and, where there is a portfolio repo, its source."
        />
        <div className="space-y-8 md:space-y-12">
          {featured.map((p, i) => <FlagshipBlock key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
