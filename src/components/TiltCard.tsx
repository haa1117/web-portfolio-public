"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** 3D tilt + cursor-following spotlight. */
export function TiltCard({
  children,
  className = "",
  max = 9,
  glow = "rgba(34,211,238,0.18)",
  onClick,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: string;
  onClick?: () => void;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${glow}, transparent 60%)`;
  const Comp = as === "article" ? motion.article : motion.div;

  return (
    <Comp
      ref={ref as never}
      onClick={onClick}
      className={`group relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e: React.MouseEvent) => {
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
        mx.set(-300);
        my.set(-300);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spot }}
      />
      {children}
    </Comp>
  );
}
