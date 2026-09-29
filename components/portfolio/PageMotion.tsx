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
          if (entry.target.matches("h2, h3, .section-heading, .technology-heading")) {
            // Apply the mask only after intersection; a fully clipped element cannot intersect.
            gsap.set(entry.target, { clipPath: "inset(0% 0% 100% 0%)" });
          }
          const tween = gsap.to(entry.target, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: .95, ease: "power3.out", clearProps: "transform,opacity,clipPath", onComplete: () => { tweens.delete(tween); } });
          tweens.add(tween);
          observer.unobserve(entry.target);
        });
      }, { threshold: .08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        const heading = element.matches("h2, h3, .section-heading, .technology-heading");
        gsap.set(element, { opacity: 0, y: heading ? 32 : 24 });
        observer.observe(element);
      });
      return () => {
        observer.disconnect();
        tweens.forEach(tween => tween.kill());
        gsap.set(elements, { clearProps: "transform,opacity,clipPath" });
      };
    }, root);
    return () => media.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}

