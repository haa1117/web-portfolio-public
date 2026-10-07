"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/** Decrypts `text` character-by-character. Call `run()` to (re)play. */
export function useScramble(text: string, { delay = 0, speed = 28 } = {}) {
  const [out, setOut] = useState(text);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    let frame = 0;
    const total = text.length * 3;
    const tick = () => {
      const revealed = Math.floor(frame / 3);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") s += " ";
        else if (i < revealed) s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      frame++;
      if (frame <= total + 1) {
        timer.current = setTimeout(() => {
          raf.current = requestAnimationFrame(tick);
        }, speed);
      } else setOut(text);
    };
    tick();
  }, [text, speed]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(run, delay);
    return () => {
      clearTimeout(t);
      if (timer.current) clearTimeout(timer.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, delay]);

  return { text: out, run };
}
