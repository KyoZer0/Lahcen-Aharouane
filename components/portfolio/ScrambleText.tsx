"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const glyphs = "<>/[]#_+=*";

export function ScrambleText({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const visual = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = visual.current;
    const target = root.current?.closest("a, button");
    if (!element || !target) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Tween | undefined;
    let previousStep = -1;
    const restore = () => { tween?.kill(); element.textContent = text; root.current?.removeAttribute("data-scrambling"); };
    const start = () => {
      if (motion.matches) return;
      tween?.kill();
      previousStep = -1;
      const progress = { value: 0 };
      root.current?.setAttribute("data-scrambling", "true");
      tween = gsap.to(progress, {
        value: 1, duration: .56, ease: "none",
        onUpdate: () => {
          const step = Math.floor(progress.value * 12);
          if (step === previousStep) return;
          previousStep = step;
          const resolved = Math.floor(progress.value * text.length);
          element.textContent = Array.from(text, (letter, index) => index < resolved || letter === " " ? letter : glyphs[(index * 3 + step * 7) % glyphs.length]).join("");
        },
        onComplete: restore,
      });
    };
    target.addEventListener("pointerenter", start);
    target.addEventListener("focus", start);
    target.addEventListener("pointerleave", restore);
    target.addEventListener("blur", restore);
    motion.addEventListener("change", restore);
    return () => {
      restore();
      target.removeEventListener("pointerenter", start);
      target.removeEventListener("focus", start);
      target.removeEventListener("pointerleave", restore);
      target.removeEventListener("blur", restore);
      motion.removeEventListener("change", restore);
    };
  }, [text]);
  return <span ref={root} className="scramble-text"><span className="scramble-measure" aria-hidden="true">{text}</span><span ref={visual} className="scramble-visual" aria-hidden="true">{text}</span><span className="sr-only">{text}</span></span>;
}
