"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useMounted";

/** Custom neon cursor: precise dot + lagging ring that morphs over interactive targets. */
export function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("a,button,[data-cursor],input,textarea,[role=button]");
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full border border-neon/70 font-mono text-[9px] uppercase tracking-widest text-void"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 76 : hover ? 54 : 34,
          height: label ? 76 : hover ? 54 : 34,
          backgroundColor: label ? "rgba(34,211,238,0.95)" : hover ? "rgba(34,211,238,0.16)" : "rgba(34,211,238,0)",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label}
      </motion.div>
    </>
  );
}
