"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FollowingPortrait } from "./FollowingPortrait";
import type { PortraitLookId } from "./PortraitLook";

const roles: Record<PortraitLookId, string> = {
  suit: "developer",
  rider: "biker",
  metal: "metalhead",
};

export function HeroIdentity() {
  const [look, setLook] = useState<PortraitLookId>("suit");
  const roleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(roleRef.current, { opacity: 0, y: 14 }, {
        opacity: 1, y: 0, duration: .45, ease: "power2.out", clearProps: "transform,opacity",
      });
    });
    return () => media.revert();
  }, [look]);

  return <>
    <FollowingPortrait look={look} onLookChange={setLook} />
    <div className="hero-copy" data-intro>
      <h1 id="hero-title">
        <span className="hero-role" ref={roleRef}><span className="hero-article">A </span><span>{roles[look]}.</span></span>
        <span className="sr-only"> I’m Lahcen Aharouane, digital product developer.</span>
      </h1>
    </div>
  </>;
}
