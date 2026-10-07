"use client";
import { useEffect, useState } from "react";

/** Seconds to wait before intro animations: long on first visit (preloader), short afterwards. null until known. */
export function useBootDelay() {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ri-boot") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setD(seen || reduce ? 0.1 : 3.0);
  }, []);
  return d;
}
