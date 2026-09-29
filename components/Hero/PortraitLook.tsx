"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { headDirections, type HeadDirection } from "@/lib/head-direction";

export const portraitLookOrder = ["suit", "rider", "metal"] as const;
export type PortraitLookId = typeof portraitLookOrder[number];
export const portraitLooks = {
  suit: { directory: "/generated/head-cutouts", neutral: "neutral", caption: "On duty", description: "Original suit portrait.", headY: .30 },
  rider: { directory: "/generated/portrait-looks/rider-gloves", neutral: "neutral", caption: "Off duty", description: "Rider look: LS2 jacket and gloves, adjusting a glove strap.", headY: .30 },
  metal: { directory: "/generated/portrait-looks/metal", neutral: "neutral-v2", caption: "Volume up", description: "Metal look: patched denim and leather jacket with headphones.", headY: .20 },
} as const;
const poses = ["neutral", ...headDirections] as const;
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
  const { directory, neutral } = portraitLooks[look];

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
        <Image src={`${directory}/${neutral}.png`} alt="" fill priority={look === "suit"} loading={look === "suit" ? undefined : "eager"} quality={90}
          sizes="(max-width: 760px) 1000px, 2000px" className="portrait-base" onLoad={() => markLoaded("body")} onError={() => onError(look)} />
      </div>
      <div className="portrait-heads" ref={headsRef}>
        {poses.map(pose => <Image key={pose} src={`${directory}/${pose === "neutral" ? neutral : pose}.png`} alt="" fill quality={90}
          sizes="(max-width: 760px) 1000px, 2000px" loading="eager" className="portrait-head" data-head={pose}
          onLoad={() => markLoaded(pose)} onError={() => onError(look)} />)}
      </div>
    </div>
  </div>;
}
