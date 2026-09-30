"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FollowingPortrait } from "./FollowingPortrait";
import type { PortraitLookId } from "./PortraitLook";
import { heroPersonas } from "./hero-personas";

export function HeroIdentity() {
  const [look, setLook] = useState<PortraitLookId>("suit");
  const copyRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstEntrance = useRef(true);
  const persona = heroPersonas[look];

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const delay = firstEntrance.current ? 0 : 1.05;
    firstEntrance.current = false;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const letters = copyRef.current?.querySelectorAll("[data-hero-letter]");
      const details = [
        ...Array.from(copyRef.current?.querySelectorAll("[data-hero-reveal]") ?? []),
        ...Array.from(summaryRef.current?.querySelectorAll("[data-hero-reveal]") ?? []),
      ];
      // Start as the full-screen paper opens, so the text entrance is visible.
      const timeline = gsap.timeline({ delay });
      if (letters) timeline.fromTo(letters, { yPercent: 110, rotation: 5 }, {
        yPercent: 0, rotation: 0, duration: .72, stagger: .035, ease: "power3.out", clearProps: "transform",
      }, 0);
      timeline.fromTo(details, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: .7, stagger: .09, ease: "power2.out", clearProps: "transform,opacity",
      }, .12);
    });
    return () => media.revert();
  }, [look]);

  return <>
    <FollowingPortrait look={look} onLookChange={setLook} />
    <div className="hero-copy" ref={copyRef} data-intro>
      <h1 id="hero-title" aria-label={`${persona.role}, ${persona.phrase} I’m Lahcen Aharouane, digital product developer.`}>
        <span className="hero-role" aria-hidden="true">{[...persona.role].map((letter, index) => <span key={`${look}-${index}`} data-hero-letter>{letter}</span>)}<span className="hero-period" data-hero-letter>.</span></span>
        <span className="hero-phrase" data-hero-reveal aria-hidden="true">{persona.phrase}</span>
      </h1>
      <p className="hero-detail" data-hero-reveal>{persona.detail}</p>
    </div>
    <div className="hero-summary" ref={summaryRef} data-intro>
      <p className="hero-introduction" data-hero-reveal>I’m Lahcen Aharouane.</p>
      <p className="hero-description" data-hero-reveal>{persona.introduction}</p>
      <p className="hero-personal" data-hero-reveal>Code, two wheels &amp; loud guitars.</p>
    </div>
  </>;
}
