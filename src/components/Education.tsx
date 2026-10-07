"use client";
import { ArrowUpRight, Award, GraduationCap, Trophy } from "lucide-react";
import { useState } from "react";
import { GithubIcon } from "./icons";
import { aitchison, agroScan, COURSES_SHOWN, earlierProjects, giki, leadership } from "@/data/cv";
import { Reveal, SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

const chip = "rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[12px] text-white/70";

export function Education() {
  const [all, setAll] = useState(false);
  const courses = all ? giki.courses : giki.courses.slice(0, COURSES_SHOWN);
  return (
    <section id="education" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="08" eyebrow="Education" title="Data science foundations, applied." gradientFrom={2} blurb="A BS in Data Science, a final-year AI + IoT project, and earlier data and ML work behind the shipped products above." />

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <TiltCard max={4} glow="rgba(34,211,238,0.14)" className="glass beam h-full rounded-3xl p-7 sm:p-9">
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon/10 text-neon ring-1 ring-white/15"><GraduationCap className="h-6 w-6" /></span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{giki.dates}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">{giki.degree}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{giki.school}</p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Key coursework</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {courses.map((c) => <span key={c} className={chip}>{c}</span>)}
                </div>
                {giki.courses.length > COURSES_SHOWN && (
                  <button onClick={() => setAll(!all)} aria-expanded={all} className="mt-4 font-mono text-xs text-neon underline-offset-4 hover:underline">
                    {all ? "Show fewer" : `Show all ${giki.courses.length} courses`}
                  </button>
                )}
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08}>
            <TiltCard max={4} glow="rgba(167,139,250,0.14)" className="glass h-full rounded-3xl p-7 sm:p-9">
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10 text-violet ring-1 ring-white/15"><GraduationCap className="h-6 w-6" /></span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{aitchison.dates}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-white">{aitchison.school}</h3>
                <p className="mt-2 text-sm text-white/65">{aitchison.degree}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {aitchison.subjects.map((s) => <span key={s} className={chip}>{s}</span>)}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal><h3 className="mb-6 font-display text-2xl font-bold text-white md:text-3xl">Final-year project &amp; earlier data/AI projects</h3></Reveal>
          <Reveal>
            <TiltCard max={3} glow="rgba(163,230,53,0.14)" className="glass beam beam-on rounded-3xl p-7 sm:p-9">
              <div className="relative z-10 grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">{agroScan.tag}</p>
                  <h4 className="mt-3 font-display text-3xl font-bold text-white">{agroScan.name}</h4>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/70">{agroScan.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{agroScan.tags.map((t) => <span key={t} className={chip}>{t}</span>)}</div>
                </div>
                <div className="space-y-4">
                  {agroScan.github && (
                    <a href={agroScan.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neon hover:text-neon">
                      <GithubIcon className="h-4 w-4" /> Public repository <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" aria-hidden />
                    </a>
                  )}
                  {agroScan.note && <p className="text-xs leading-relaxed text-white/50">{agroScan.note}</p>}
                </div>
              </div>
            </TiltCard>
          </Reveal>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {earlierProjects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <TiltCard max={5} glow="rgba(167,139,250,0.14)" className="glass h-full rounded-2xl p-6">
                  <div className="relative z-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">{p.tag}</p>
                    <h4 className="mt-2 font-display text-lg font-bold text-white">{p.name}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white/55">{t}</span>)}</div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Reveal><h3 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-white md:text-3xl"><Trophy className="h-6 w-6 text-neon" aria-hidden /> Leadership &amp; activities</h3></Reveal>
          <Reveal>
            <ul className="glass divide-y divide-white/[0.07] rounded-3xl px-5 py-2 sm:px-8">
              {leadership.map((a) => (
                <li key={a.org + a.title} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-white"><Award className="h-4 w-4 shrink-0 text-violet" aria-hidden />{a.title} <span className="font-normal text-white/50">· {a.org}</span></p>
                    {a.note && <p className="mt-1 pl-6 text-sm leading-relaxed text-white/55">{a.note}</p>}
                  </div>
                  <span className="pl-6 font-mono text-xs text-white/45 sm:pl-0 sm:text-right">{a.when}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
