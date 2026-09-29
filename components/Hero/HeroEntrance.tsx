"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export function HeroEntrance({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = sceneRef.current?.querySelectorAll("[data-intro]");
      if (!elements) return;
      gsap.from(elements, {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.12,
        clearProps: "transform,opacity,visibility",
      });
    }, sceneRef);
    return () => media.revert();
  }, []);

  return <section id="top" ref={sceneRef} className="hero-scene" aria-labelledby="hero-title">{children}</section>;
}
