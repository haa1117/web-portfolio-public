"use client";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Briefcase, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/site";
import { projects, stats } from "@/lib/data";
import { useBootDelay } from "@/hooks/useBootDelay";
import { useScramble } from "@/hooks/useScramble";
import { useTyped } from "@/hooks/useTyped";
import { Magnetic } from "./Magnetic";
import { SocialIcons } from "./SocialLinks";

const ease = [0.22, 1, 0.36, 1] as const;

const ORBIT = ["Flutter", "React", "Swift", "Python", "Next.js", "TypeScript", "FastAPI", "Docker"];

function HeroInner({ delay }: { delay: number }) {
  const first = useScramble("Hassan", { delay: delay * 1000 + 100 });
  const last = useScramble("Ali Alvi", { delay: delay * 1000 + 450 });
  const role = useTyped(site.roles);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const px = useTransform(smx, [-1, 1], [-18, 18]);
  const py = useTransform(smy, [-1, 1], [-14, 14]);
  const px2 = useTransform(smx, [-1, 1], [26, -26]);
  const py2 = useTransform(smy, [-1, 1], [20, -20]);

  const ICON_IDS = ["kalendra-ai", "hearthboard", "ledgerwise", "pulse-burnout", "2d-turbo-racing", "tranquil", "minesweeper", "resetta"];
  const icons = ICON_IDS.map((id) => projects.find((p) => p.id === id)!).filter((p) => p?.media.icon);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:pt-32 md:px-10"
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* HUD corner brackets */}
      {["left-5 top-24 border-l border-t", "right-5 top-24 border-r border-t", "bottom-8 left-5 border-b border-l", "bottom-8 right-5 border-b border-r"].map((c) => (
        <motion.span
          key={c}
          aria-hidden
          className={`absolute hidden h-8 w-8 border-neon/40 md:block ${c}`}
          initial={{ opacity: 0, scale: 1.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.9, ease }}
        />
      ))}

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease }}
            className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-lime" />
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_#a3e635]" />
            </span>
            Portfolio · {new Date().getFullYear()}
          </motion.div>

          <h1 className="font-display text-[clamp(3.4rem,11vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="glitch block"
                data-text={first.text}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay, duration: 1, ease }}
                onMouseEnter={first.run}
              >
                {first.text}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span
                className="glitch text-gradient-anim block"
                data-text={last.text}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: delay + 0.12, duration: 1, ease }}
                onMouseEnter={last.run}
              >
                {last.text}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.45, duration: 0.9, ease }}
            className="mt-7 flex items-center gap-3 font-mono text-base text-neon sm:text-lg"
          >
            <span className="text-white/35">{">"}</span>
            <span>{role}</span>
            <span className="h-5 w-[2px] animate-blink bg-neon" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.6, duration: 0.9, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.75, duration: 0.9, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#featured"
                data-cursor="View"
                onClick={(e) => { e.preventDefault(); document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-void"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon to-violet transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">Explore my work</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="glass flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white transition hover:border-neon/50"
              >
                <Briefcase className="h-4 w-4" /> All projects
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.9, duration: 0.9, ease }}
            className="mt-6 flex items-center gap-4"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-white/55">Find me on</span>
            <SocialIcons />
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1, duration: 1 }}
            className="mt-10 grid max-w-xl grid-cols-3 sm:mt-14 gap-6 border-t border-white/10 pt-6"
          >
            {[
              [stats.projects, "Projects"],
              [stats.play, "On Google Play"],
              [stats.websites, "Websites"],
            ].map(([n, l]) => (
              <div key={l as string}>
                <dt className="font-display text-3xl font-bold text-white">{n}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* holographic identity core */}
        <motion.div style={{ y: yArt, opacity: fade }} className="relative mx-auto flex aspect-square w-full max-w-[19.5rem] sm:max-w-[32.5rem] items-center justify-center [container-type:inline-size]">
          <motion.div style={{ x: px, y: py }} className="absolute inset-0">
            <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-neon/30" />
            <div className="absolute inset-[16%] animate-spin-reverse rounded-full border border-violet/30" />
            <div className="absolute inset-[26%] animate-spin-slow rounded-full border border-dotted border-magenta/30 [animation-duration:22s]" />
          </motion.div>

          {/* orbiting stack chips */}
          <div className="absolute inset-0 animate-spin-slow [animation-duration:55s]">
            {ORBIT.map((t, i) => {
              const a = (i / ORBIT.length) * 360;
              return (
                <div key={t} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${a}deg) translateY(calc(-1 * 43cqw))` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <div className="animate-spin-reverse [animation-duration:55s]">
                      <span className="glass -ml-8 -mt-3 block whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] text-white/75 max-md:hidden">{t}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* core */}
          <motion.div style={{ x: px2, y: py2 }} className="relative flex h-[48%] w-[48%] items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-neon/40 via-violet/35 to-magenta/30 blur-3xl" />
            <div className="beam beam-on glass relative flex h-full w-full animate-float items-center justify-center rounded-full">
              <div className="absolute inset-3 rounded-full border border-white/10" />
              <div className="absolute inset-0 animate-spin-slow rounded-full [animation-duration:12s]">
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_16px_#22d3ee]" />
              </div>
              <div className="absolute inset-[7px] overflow-hidden rounded-full ring-1 ring-white/20">
                <div role="img" aria-label={site.name} className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neon/25 via-violet/25 to-magenta/25 font-display text-[clamp(3rem,9cqw,5.5rem)] font-bold tracking-tight text-white">{site.initials}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-neon/10 mix-blend-overlay" />
              </div>
            </div>
          </motion.div>

          {/* floating app icon chips */}
          {icons.slice(0, 4).map((a, i) => {
            const pos = ["left-[2%] top-[14%]", "right-[0%] top-[26%]", "left-[6%] bottom-[16%]", "right-[8%] bottom-[8%]"][i];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.9 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }}
                className={`absolute ${pos}`}
              >
                <div className="animate-float" style={{ animationDelay: `${i * -1.4}s` }}>
                  <div className="glass rounded-2xl p-1.5 shadow-[0_10px_40px_rgba(139,92,246,0.25)]">
                    <Image src={a.media.icon!} alt={`${a.name} app icon`} width={56} height={56} className="h-12 w-12 rounded-xl sm:h-14 sm:w-14" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 1.3, duration: 0.9, ease }}
            className="glass absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-mono text-[11px] text-white/75"
          >
            <Sparkles className="h-3.5 w-3.5 text-neon" />
            {stats.play} apps on Google Play
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-neon xl:flex"
        aria-label="Scroll down"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-2">
          <motion.span className="h-1.5 w-1 rounded-full bg-neon" animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
        </span>
        <ArrowDown className="sr-only" />
      </motion.a>
    </section>
  );
}

export function Hero() {
  const delay = useBootDelay();
  if (delay === null) return <section id="home" className="min-h-screen" />;
  return <HeroInner delay={delay} />;
}
