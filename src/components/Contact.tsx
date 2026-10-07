"use client";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { stats } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";
import { SOCIALS } from "./SocialLinks";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index="07" eyebrow="Contact" title="Let's build something remarkable." gradientFrom={2} blurb="Have a product idea, an app to ship or a site to elevate? Connect on LinkedIn or browse the projects on GitHub." />

        <Reveal>
          <div className="space-y-4">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="glass beam group flex items-center gap-5 rounded-2xl p-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/15">
                <Briefcase className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Projects</span>
                <span className="mt-1 block font-display text-lg font-semibold text-white">{stats.projects} projects · {stats.play} on Google Play</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:rotate-45 group-hover:text-neon" />
            </a>

            <div className="glass rounded-2xl p-3">
              <span className="mb-1 block px-3 pt-2 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-white/55">Find me online</span>
              <ul>
                {SOCIALS.map(({ name, handle, href, Icon }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer me" className="group flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white ring-1 ring-white/15"><Icon className="h-5 w-5" /></span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white">{name}</span>
                        <span className="block font-mono text-xs text-white/60">{handle}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/50 transition group-hover:rotate-45 group-hover:text-neon" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass flex items-center gap-3 rounded-2xl p-5 text-sm text-white/55">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-lime" />
              </span>
              Open to project enquiries and collaborations
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
