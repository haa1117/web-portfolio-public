"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, Copy, Hash, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { toast } from "./Toaster";

type Item = { id: string; label: string; hint: string; icon: "hash" | "link" | "copy"; run: () => void };

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...nav.map((n) => ({
        id: n.id, label: `Go to ${n.label}`, hint: "section", icon: "hash" as const,
        run: () => document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      { id: "gh", label: "Open GitHub profile", hint: "external", icon: "link", run: () => window.open(site.social.github, "_blank") },
      { id: "li", label: "Open LinkedIn profile", hint: "external", icon: "link", run: () => window.open(site.social.linkedin, "_blank") },
      { id: "fw", label: "Visit futurewatch.co", hint: "external", icon: "link", run: () => window.open(site.sites.futurewatch, "_blank") },
      { id: "fwg", label: "Visit fwglobal.co", hint: "external", icon: "link", run: () => window.open(site.sites.fwglobal, "_blank") },
      { id: "hik", label: "Visit hiktextiles.com", hint: "external", icon: "link", run: () => window.open(site.sites.hik, "_blank") },
    ],
    [],
  );
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const choose = (i: Item | undefined) => { if (!i) return; setOpen(false); setTimeout(i.run, 120); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-start justify-center bg-void/70 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            className="glass beam beam-on w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_30px_120px_rgba(34,211,238,0.15)]"
            initial={{ scale: 0.94, y: -16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-neon" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter") choose(filtered[sel]);
                }}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/50">esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-white/40">No results</li>}
              {filtered.map((i, idx) => (
                <li key={i.id}>
                  <button
                    onMouseEnter={() => setSel(idx)}
                    onClick={() => choose(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      idx === sel ? "bg-white/[0.08] text-white" : "text-white/65"
                    }`}
                  >
                    {i.icon === "hash" ? <Hash className="h-4 w-4 text-violet" /> : i.icon === "copy" ? <Copy className="h-4 w-4 text-lime" /> : <ArrowUpRight className="h-4 w-4 text-neon" />}
                    <span className="flex-1">{i.label}</span>
                    <span className="font-mono text-[10px] text-white/35">{i.hint}</span>
                    {idx === sel && <CornerDownLeft className="h-3.5 w-3.5 text-white/50" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
