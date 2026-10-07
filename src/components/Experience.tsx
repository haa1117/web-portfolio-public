"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { experience, type Experience as Job } from "@/data/cv";
import { Reveal, SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

function Tags({ tags, featured }: { tags: string[]; featured?: boolean }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
            featured ? "border-neon/30 bg-neon/[0.07] text-neon" : "border-white/12 bg-white/[0.03] text-white/65"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const f = job.featured;
  return (
    <TiltCard max={f ? 3 : 4} glow={f ? "rgba(34,211,238,0.18)" : "rgba(167,139,250,0.14)"} className={`glass rounded-3xl ${f ? "beam beam-on p-6 sm:p-9" : "p-6 sm:p-7"}`}>
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{job.dates}</span>
          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-lime ring-1 ring-lime/30">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Current
            </span>
          )}
        </div>
        <h3 className={`mt-3 font-display font-bold text-white ${f ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
          {job.href ? (
            <a href={job.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition hover:text-neon">
              {job.company}
              <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:rotate-45 group-hover:text-neon" aria-hidden />
            </a>
          ) : (
            job.company
          )}
        </h3>
        <p className={`mt-1 font-mono text-xs uppercase tracking-[0.18em] ${f ? "text-neon" : "text-violet"}`}>{job.domain}</p>
        <ul className={`mt-5 space-y-3 leading-relaxed ${f ? "text-[15px] text-white/75 sm:text-base" : "text-sm text-white/65"}`}>
          {job.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${f ? "bg-neon" : "bg-white/35"}`} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Tags tags={job.tags} featured={f} />
      </div>
    </TiltCard>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section id="experience" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where the work has been done."
          gradientFrom={3}
          blurb="Current work on Android products at Future Watch, earlier AI/ML and data work, and business-analysis experience before that."
        />
        <div className="relative">
          <div className="absolute bottom-0 left-[9px] top-2 w-px bg-white/10 md:left-[11px]" />
          <motion.div className="absolute left-[9px] top-2 w-px origin-top bg-gradient-to-b from-neon via-violet to-magenta shadow-[0_0_12px_#22d3ee] md:left-[11px]" style={{ height: "calc(100% - 0.5rem)", scaleY: h }} />
          <ol ref={ref} className="space-y-8 md:space-y-10">
            {experience.map((job, i) => (
              <li key={job.company} className="relative pl-9 md:pl-14">
                <motion.span
                  className={`absolute left-0 top-7 z-10 -translate-x-0 rounded-full border-2 bg-void md:left-0 ${job.featured ? "h-5 w-5 border-neon shadow-[0_0_14px_#22d3ee] md:h-6 md:w-6" : "h-[1.1rem] w-[1.1rem] border-white/40 md:h-[1.4rem] md:w-[1.4rem]"}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, margin: "-60px 0px -60px 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
                <Reveal delay={i === 0 ? 0 : 0.05}>
                  <Card job={job} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
