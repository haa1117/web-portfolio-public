"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useBootDelay } from "@/hooks/useBootDelay";

export function Nav({ onPalette }: { onPalette: () => void }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bootDelay = useBootDelay();

  useEffect(() => {
    // Active section = the last section whose top has passed ~40% down the viewport.
    // Looked up by id on every pass, so it keeps working when the hero is swapped in after the preloader.
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const line = window.innerHeight * 0.4;
      let current: string = nav[0].id;
      for (const n of nav) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }
      if (window.scrollY < 80) current = nav[0].id;
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = nav[nav.length - 1].id;
      setActive(current);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // sections mount after the preloader finishes, so re-check once layout settles
    const t = setTimeout(update, 1500);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={bootDelay === null ? { y: -90, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ delay: bootDelay ?? 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-[110] flex justify-center px-4"
      >
        <nav
          className={`glass flex items-center bg-void/75 gap-1 rounded-full py-1.5 pl-3 pr-1.5 transition-all duration-500 ${
            scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(34,211,238,0.12)]" : ""
          }`}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); go("home"); }} className="mr-2 flex items-center gap-2 pr-2" aria-label="Home">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon/30 to-violet/30 font-display text-xs font-bold text-white ring-1 ring-white/15">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <Image src="/hassan.webp" alt={site.name} width={64} height={64} className="h-full w-full scale-[1.7] object-cover object-[50%_22%]" />
              </span>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_#a3e635]" />
            </span>
          </a>

          <ul className="hidden items-center lg:flex">
            {nav.map((n) => (
              <li key={n.id} className="relative">
                <a
                  href={`#${n.id}`}
                  onClick={(e) => { e.preventDefault(); go(n.id); }}
                  className={`relative z-10 block px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    active === n.id ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={onPalette}
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 font-mono text-[11px] text-white/60 transition hover:border-neon/50 hover:text-white lg:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" /> K
          </button>
          <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-full text-white lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[130] flex flex-col overflow-y-auto bg-void/95 px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button onClick={() => setOpen(false)} className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <ul className="my-auto flex flex-col gap-1 py-6">
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <button onClick={() => go(n.id)} className="flex w-full items-baseline gap-4 py-2 text-left font-display text-4xl font-bold text-white [@media(max-height:560px)]:py-1 [@media(max-height:560px)]:text-2xl">
                    <span className="font-mono text-xs text-neon">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
