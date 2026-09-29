"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export function ProjectHover({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    const indicator = label.current;
    if (!element || !indicator) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(indicator, "x", { duration: .32, ease: "power3.out" });
      const yTo = gsap.quickTo(indicator, "y", { duration: .32, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        xTo(Math.max(58, Math.min(bounds.width - 58, event.clientX - bounds.left)));
        yTo(Math.max(25, Math.min(bounds.height - 25, event.clientY - bounds.top)));
      };
      const enter = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        gsap.set(indicator, { x: event.clientX - bounds.left, y: event.clientY - bounds.top });
        gsap.to(indicator, { autoAlpha: 1, scale: 1, rotation: -5, duration: .24, overwrite: "auto" });
        element.dataset.hovered = "true";
        move(event);
      };
      const leave = () => {
        gsap.to(indicator, { autoAlpha: 0, scale: .82, rotation: 0, duration: .2, overwrite: "auto" });
        delete element.dataset.hovered;
      };
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      return () => {
        xTo.tween.kill(); yTo.tween.kill(); gsap.killTweensOf(indicator);
        gsap.set(indicator, { clearProps: "all" });
        delete element.dataset.hovered;
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });
    return () => media.revert();
  }, []);
  return <div ref={root} className="project-hover">{children}<span ref={label} className="project-open" aria-hidden="true"><span>[</span> Open ↗ <span>]</span></span></div>;
}
