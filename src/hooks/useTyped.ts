"use client";
import { useEffect, useState } from "react";

/** Types and erases through `words` forever. */
export function useTyped(words: readonly string[], { type = 70, erase = 35, hold = 1600 } = {}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < word.length) t = setTimeout(() => setText(word.slice(0, text.length + 1)), type);
      else t = setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), hold);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), erase);
      else {
        setI((n) => n + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, i, words, type, erase, hold]);

  return text;
}
