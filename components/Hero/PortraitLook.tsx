"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { headDirections, type HeadDirection } from "@/lib/head-direction";

export type PortraitLookId = "suit" | "rider";
const poses = ["neutral", ...headDirections] as const;
const directories = { suit: "/generated/head-cutouts", rider: "/generated/portrait-looks/rider-gloves" };
type Props = {
  look: PortraitLookId;
  direction: HeadDirection;
  reducedMotion: boolean;
  onReady: (look: PortraitLookId) => void;
  onError: (look: PortraitLookId) => void;
};

export function PortraitLook({ look, direction, reducedMotion, onReady, onError }: Props) {
  const headsRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const reported = useRef(false);
  const shownDirection = !reducedMotion && loaded.has(direction) ? direction : "neutral";
  const directory = directories[look];

  useEffect(() => {
    if (loaded.size !== poses.length + 1 || reported.current) return;
    reported.current = true;
    onReady(look);
  }, [loaded, look, onReady]);

  useLayoutEffect(() => {
    const layers = headsRef.current?.querySelectorAll<HTMLImageElement>("[data-head]");
    if (!layers?.length) return;
    const selected = poses.indexOf(shownDirection);
    const opacity = (index: number) => index === selected ? 1 : 0;
    if (reducedMotion) { gsap.set(layers, { opacity }); return; }
    // Retarget the current blend weights; the body's neutral image never changes.
    const tween = gsap.to(layers, { opacity, duration: .36, ease: "power2.out", overwrite: true });
    return () => { tween.kill(); };
  }, [shownDirection, reducedMotion]);

  const markLoaded = (key: string) => setLoaded(previous => previous.has(key) ? previous : new Set(previous).add(key));
  return <div className="portrait-look" data-look={look} data-direction={shownDirection} aria-hidden="true">
    <div className="portrait-canvas">
      <div className="portrait-body">
        <Image src={`${directory}/neutral.png`} alt="" fill priority={look === "suit"} loading={look === "suit" ? undefined : "eager"} quality={90}
          sizes="(max-width: 760px) 1000px, 2000px" className="portrait-base" onLoad={() => markLoaded("body")} onError={() => onError(look)} />
      </div>
      <div className="portrait-heads" ref={headsRef}>
        {poses.map(pose => <Image key={pose} src={`${directory}/${pose}.png`} alt="" fill quality={90}
          sizes="(max-width: 760px) 1000px, 2000px" loading="eager" className="portrait-head" data-head={pose}
          onLoad={() => markLoaded(pose)} onError={() => onError(look)} />)}
      </div>
    </div>
  </div>;
}
