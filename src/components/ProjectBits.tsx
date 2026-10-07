"use client";
import { ArrowUpRight, Briefcase, Brain, Gamepad2, Globe2, Smartphone } from "lucide-react";
import Image from "next/image";
import { statusLabel, type GroupId, type Project, type Status } from "@/lib/data";
import { AppleIcon, GithubIcon } from "./icons";

function PlayLogo({ className = "h-4 w-4" }: { className?: string }) {
  return <Image src="/google-play.webp" alt="" width={96} height={96} className={className} />;
}

const statusStyle: Record<Status, string> = {
  store: "bg-lime/10 text-lime ring-lime/30",
  live: "bg-neon/10 text-neon ring-neon/30",
  build: "bg-white/[0.07] text-white/75 ring-white/15",
  unreleased: "bg-violet/15 text-[#c4b5fd] ring-violet/35",
};

export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider ring-1 backdrop-blur-md ${statusStyle[status]} ${className}`}>
      {(status === "store" || status === "live") && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {statusLabel[status]}
    </span>
  );
}

export const groupIcon: Record<GroupId, typeof Globe2> = {
  apps: Smartphone,
  games: Gamepad2,
  ai: Brain,
  biz: Briefcase,
  web: Globe2,
};

/** Project icon (store icon where one exists, otherwise a category glyph). */
export function ProjectIcon({ p, size = 44 }: { p: Project; size?: number }) {
  const G = groupIcon[p.group];
  return p.media.icon ? (
    <Image src={p.media.icon} alt={`${p.name} icon`} width={size} height={size} className="shrink-0 rounded-[22%] ring-1 ring-white/15" style={{ width: `${size / 16}rem`, height: `${size / 16}rem` }} />
  ) : (
    <span className="flex shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br from-neon/20 to-violet/20 text-neon ring-1 ring-white/15" style={{ width: `${size / 16}rem`, height: `${size / 16}rem` }}>
      <G className="h-1/2 w-1/2" />
    </span>
  );
}

const btn =
  "inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon";

export function ProjectLinks({ p, size = "sm" }: { p: Project; size?: "sm" | "lg" }) {
  const pad = size === "lg" ? "!px-5 !py-3 !text-sm" : "";
  const { live, play, appStore, github } = p.links;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {live && (
        <a href={live} target="_blank" rel="noreferrer" className={`${btn} ${pad} bg-white text-void hover:bg-neon`}>
          {p.id === "al-noor" ? "Open live app" : "Live site"} <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
      {play && (
        <a href={play} target="_blank" rel="noreferrer" aria-label={`${p.name} on Google Play`} className={`${btn} ${pad} ${live ? "border border-white/20 text-white hover:border-lime hover:text-lime" : "bg-white text-void hover:bg-lime"}`}>
          <PlayLogo className="h-4 w-4" /> Google Play
        </a>
      )}
      {appStore && (
        <a href={appStore} target="_blank" rel="noreferrer" aria-label={`${p.name} on the App Store`} className={`${btn} ${pad} border border-white/20 text-white hover:border-white/60`}>
          <AppleIcon className="h-4 w-4" /> {p.platforms.some((x) => /apple tv/i.test(x)) ? "App Store · Apple TV" : "App Store"}
        </a>
      )}
      {github && (
      <a href={github} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className={`${btn} ${pad} border border-white/20 text-white/85 hover:border-white/60 hover:text-white`}>
        <GithubIcon className="h-4 w-4" /> GitHub
      </a>
      )}
    </div>
  );
}

export function Chips({ items, tone = "stack" }: { items: string[]; tone?: "stack" | "platform" }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className={
            tone === "platform"
              ? "rounded-md border border-white/15 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wide text-white/70"
              : "rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[0.6875rem] text-white/75 ring-1 ring-white/[0.08]"
          }
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Card cover. Wide hero when the project has one (store feature graphic or a
 * desktop/TV screenshot); otherwise a row of phone screenshots at their native aspect ratio.
 */
export function Cover({ p, sizes }: { p: Project; sizes: string }) {
  const { hero, shots } = p.media;
  if (hero) {
    return (
      <div className="relative aspect-[2/1] overflow-hidden bg-ink">
        <Image src={hero.src} alt={`${p.name} — ${p.links.play ? "Google Play store graphic" : "screenshot"}`} fill sizes={sizes} className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
    );
  }
  const phones = shots.slice(0, 3);
  return (
    <div className="relative flex aspect-[2/1] items-start justify-center gap-3 overflow-hidden bg-gradient-to-b from-[#12162b] to-ink px-4 pt-5">
      {phones.map((s, i) => (
        <Image key={s.src} src={s.src} alt={`${p.name} screen ${i + 1}`} width={s.w} height={s.h} sizes="140px" className="h-[125%] w-auto max-w-none rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-2" style={{ height: "125%", width: "auto" }} />
      ))}
    </div>
  );
}
