"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { stats } from "@/lib/data";
import { site } from "@/lib/site";

const LINES = [
  "boot  ▸ initialising hassan.alvi/portfolio",
  `load  ▸ ${stats.projects} projects · ${stats.platforms} platforms`,
  `load  ▸ ${stats.play} apps on Google Play`,
  `load  ▸ ${stats.websites} websites · web, AI & data systems`,
  "link  ▸ rendering interface",
  "done  ▸ welcome",
];

/** Boot-sequence intro. Plays once per browser session. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState(1);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ri-boot") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { setShow(false); return; }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      setLines(Math.min(LINES.length, 1 + Math.floor(eased * LINES.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        setShow(false);
        try { sessionStorage.setItem("ri-boot", "1"); } catch {}
      }, 260);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-void"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
              <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#g)" strokeWidth="1.5" strokeDasharray="6 10" />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <svg className="absolute inset-3 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="50" cy="50" r="46" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={289}
                  strokeDashoffset={289 - (289 * pct) / 100}
                  style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}
                />
              </svg>
              <span className="font-display text-3xl font-bold text-gradient">{site.initials}</span>
            </div>

            <div className="h-[132px] w-[min(88vw,420px)] font-mono text-[11px] leading-6 text-white/55 sm:text-xs">
              {LINES.slice(0, lines).map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i === lines - 1 ? 1 : 0.55, x: 0 }}
                  className={i === lines - 1 ? "text-neon" : ""}
                >
                  {l}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex w-[min(88vw,420px)] items-center gap-4">
              <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
                <div className="h-full bg-gradient-to-r from-neon to-violet shadow-[0_0_12px_#22d3ee]" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-10 text-right font-mono text-xs tabular-nums text-white/70">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
