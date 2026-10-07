"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { groupLabel, groupOrder, library, type GroupId, type Project } from "@/lib/data";
import { useMounted } from "@/hooks/useMounted";
import { Chips, Cover, ProjectIcon, ProjectLinks, StatusBadge } from "./ProjectBits";
import { Reveal, SectionHeading } from "./Reveal";

const GROUP_BLURB: Record<GroupId, string> = {
  apps: "Utilities, wellness, finance and ambient apps with public Google Play listings.",
  games: "Phone and living-room games, plus an ambient TV display.",
  ai: "Machine-learning, retrieval, NLP and analytics builds — most are portfolio demos on fictional data.",
  biz: "Marketplace, ticketing, logistics and developer-platform builds.",
  web: "Company websites with live product registries and private admin consoles.",
};

type Filter = "all" | GroupId;

function Card({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-neon/40 focus-within:border-neon/40">
      <button onClick={() => onOpen(p)} aria-label={`${p.name}: view details`} className="relative block text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon">
        <Cover p={p} sizes="(min-width:1280px) 400px, (min-width:768px) 33vw, 100vw" />
        <StatusBadge status={p.status} className="absolute bottom-3 left-3 !bg-void/75" />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <ProjectIcon p={p} size={40} />
          <h3 className="font-display text-xl font-bold leading-tight text-white">{p.name}</h3>
        </div>
        <p className="mt-3 text-sm font-medium leading-snug text-white/85">{p.tagline}</p>
        <p className="mt-2 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-white/60">{p.summary}</p>
        <div className="mt-4 space-y-2">
          <Chips items={p.platforms.slice(0, 4)} tone="platform" />
          <Chips items={p.stack.slice(0, 4)} />
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
          <ProjectLinks p={p} />
        </div>
        <button onClick={() => onOpen(p)} className="mt-1 inline-flex min-h-11 items-center self-start font-mono text-[0.6875rem] uppercase tracking-wider text-neon underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon">
          Details &amp; screenshots
        </button>
      </div>
    </article>
  );
}

function Modal({ p, close }: { p: Project; close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const gallery = [...(p.media.hero ? [p.media.hero] : []), ...p.media.shots];
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; prev?.focus?.(); };
  }, [close]);

  return (
    <motion.div className="fixed inset-0 z-[150] flex items-center justify-center bg-void/80 p-3 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.div
        className="glass relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-void/90 p-6 shadow-[0_40px_140px_rgba(34,211,238,0.14)] sm:p-9"
        initial={{ y: 40, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={p.name}
      >
        <button ref={closeRef} onClick={close} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-void/70 text-white/80 transition hover:border-neon hover:text-neon" aria-label="Close details">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-4 pr-12">
          <ProjectIcon p={p} size={64} />
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{p.name}</h3>
            <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-widest text-neon">{groupLabel[p.group]}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          <Chips items={p.platforms} tone="platform" />
        </div>
        <p className="mt-5 text-base font-medium text-white/90">{p.tagline}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">{p.summary}</p>
        {p.caveat && <p className="mt-4 rounded-xl border border-violet/30 bg-violet/10 px-4 py-3 text-sm leading-relaxed text-[#ddd6fe]">{p.caveat}</p>}

        {gallery.length > 0 && (
          <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-3" role="region" aria-label={`${p.name} screenshots`} tabIndex={0}>
            {gallery.map((g, i) => (
              <Image key={g.src} src={g.src} alt={`${p.name} ${p.links.play ? "store graphic" : "screenshot"} ${i + 1}`} width={g.w} height={g.h} sizes="(min-width:768px) 420px, 80vw"
                className="h-56 w-auto max-w-none shrink-0 snap-start rounded-xl ring-1 ring-white/15 sm:h-64" style={{ height: undefined }} />
            ))}
          </div>
        )}

        <h4 className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/55">Features</h4>
        <ul className="mt-3 space-y-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-snug text-white/70"><Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" /> {f}</li>
          ))}
        </ul>
        <h4 className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/55">Stack</h4>
        <div className="mt-3"><Chips items={p.stack} /></div>
        <div className="mt-8"><ProjectLinks p={p} size="lg" /></div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Project | null>(null);
  const mounted = useMounted();

  // Lets other sections (e.g. Services) open a project's detail view by id.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = library.find((x) => x.id === (e as CustomEvent<string>).detail);
      if (p) setOpen(p);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  const tabs = useMemo(
    () => [{ id: "all" as Filter, label: "All", n: library.length }, ...groupOrder.map((g) => ({ id: g as Filter, label: groupLabel[g], n: library.filter((p) => p.group === g).length }))],
    [],
  );

  const query = q.trim().toLowerCase();
  const matches = useMemo(
    () =>
      library.filter((p) => {
        if (filter !== "all" && p.group !== filter) return false;
        if (!query) return true;
        return [p.name, p.tagline, p.summary, p.platforms.join(" "), p.stack.join(" "), groupLabel[p.group]].join(" ").toLowerCase().includes(query);
      }),
    [filter, query],
  );
  // Sectioned view for "All" without a search; flat grid otherwise.
  const sectioned = filter === "all" && !query;

  const grid = (list: Project[]) => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((p) => (
        <motion.div
          key={p.id}
          className="h-full"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card p={p} onOpen={setOpen} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="projects" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Project library"
          title={`${library.length} more projects, organised.`}
          gradientFrom={2}
          blurb="Published apps, games, AI and data builds, business systems and web platforms. Cards say plainly what each one is — store apps, live sites, or portfolio demos on fictional data."
        />

        {/* plain wrapper (not Reveal) so the toolbar can actually stick while the library scrolls */}
        <div className="contents">
          <div className="sticky top-20 z-30 -mx-2 mb-10 flex flex-col gap-3 rounded-2xl bg-void/80 px-2 py-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  aria-pressed={filter === t.id}
                  onClick={() => setFilter(t.id)}
                  className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${filter === t.id ? "bg-gradient-to-r from-neon to-violet text-void" : "border border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
                >
                  {t.label} <span className={`ml-1 font-mono text-[0.625rem] ${filter === t.id ? "text-void/70" : "text-white/50"}`}>{t.n}</span>
                </button>
              ))}
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Search projects</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…"
                className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-neon"
              />
            </label>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">{matches.length} projects shown</p>

        <div key={`${filter}|${query}`}>
          {matches.length === 0 && <p className="py-20 text-center text-white/60">No projects match “{q}”. Try a technology or platform, like Flutter or Android TV.</p>}
          {sectioned
            ? groupOrder.map((g) => {
                const list = library.filter((p) => p.group === g);
                return (
                  <div key={g} className="mb-16 last:mb-0">
                    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{groupLabel[g]}</h3>
                      <span className="font-mono text-xs text-neon">{list.length}</span>
                      <p className="basis-full text-sm text-white/60">{GROUP_BLURB[g]}</p>
                    </div>
                    {grid(list)}
                  </div>
                );
              })
            : grid(matches)}
        </div>

        <p className="mt-16 text-center text-sm text-white/55">Kalendra, Hearthboard and Al Noor are featured above.</p>
        {mounted && createPortal(<AnimatePresence>{open && <Modal p={open} close={() => setOpen(null)} />}</AnimatePresence>, document.body)}
      </div>
    </section>
  );
}
