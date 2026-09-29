"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!elements) return;
      const tweens = new Set<gsap.core.Tween>();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const tween = gsap.to(entry.target, { opacity: 1, y: 0, duration: .8, ease: "power3.out", clearProps: "transform,opacity", onComplete: () => { tweens.delete(tween); } });
          tweens.add(tween);
          observer.unobserve(entry.target);
        });
      }, { threshold: .08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        gsap.set(element, { opacity: 0, y: 24 });
        observer.observe(element);
      });
      return () => { observer.disconnect(); tweens.forEach(tween => tween.kill()); };
    }, root);
    return () => media.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}

