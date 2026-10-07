"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export const toast = (message: string) => window.dispatchEvent(new CustomEvent("ri-toast", { detail: message }));

export function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const h = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 2400);
    };
    window.addEventListener("ri-toast", h);
    return () => { window.removeEventListener("ri-toast", h); clearTimeout(t); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[250] flex justify-center px-4">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white shadow-[0_10px_40px_rgba(34,211,238,0.18)]"
          >
            <Check className="h-4 w-4 text-neon" /> {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
