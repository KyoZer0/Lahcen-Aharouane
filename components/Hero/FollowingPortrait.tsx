"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getHeadDirection, headDirections, type HeadDirection } from "@/lib/head-direction";

const poses = ["neutral", ...headDirections] as const;

export function FollowingPortrait() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headsRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<HeadDirection>("neutral");
  const [loaded, setLoaded] = useState<Set<HeadDirection>>(() => new Set<HeadDirection>(["neutral"]));
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-pointer: fine)");
    let frame = 0;
    let position: { x: number; y: number } | null = null;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      position = null;
      setDirection("neutral");
    };
    const onPreference = () => {
      setReducedMotion(motion.matches);
      reset();
    };
    const update = () => {
      frame = 0;
      if (!position || !canvasRef.current || motion.matches || !pointer.matches) return;
      // Measure the enlarged photo, so the gaze follows the actual head even after cropping.
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = position.x - (rect.left + rect.width * 0.50);
      const dy = position.y - (rect.top + rect.height * 0.30);
      if (frameRef.current && frameRef.current.getBoundingClientRect().bottom < 0) return;
      setDirection(previous => getHeadDirection(dx, dy, previous));
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches || !pointer.matches) return;
      position = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onViewportChange = () => {
      if (position && !frame) frame = requestAnimationFrame(update);
    };
    const onVisibilityChange = () => { if (document.hidden) reset(); };

    onPreference();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motion.addEventListener("change", onPreference);
    pointer.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motion.removeEventListener("change", onPreference);
      pointer.removeEventListener("change", reset);
    };
  }, []);

  const shownDirection = !reducedMotion && loaded.has(direction) ? direction : "neutral";

  useLayoutEffect(() => {
    const layers = headsRef.current?.querySelectorAll<HTMLImageElement>("[data-head]");
    if (!layers?.length) return;
    const selected = poses.indexOf(shownDirection);
    if (reducedMotion) {
      gsap.set(layers, { opacity: (index: number) => index === 0 ? 1 : 0 });
      frameRef.current?.setAttribute("data-transitioning", "false");
      return;
    }

    // All weights use the same ease and duration; plus-lighter keeps the blend opaque.
    // Retarget from current weights instead of resetting, even on rapid pointer movement.
    frameRef.current?.setAttribute("data-transitioning", "true");
    const tween = gsap.to(layers, {
      opacity: (index: number) => index === selected ? 1 : 0,
      duration: 0.32,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => frameRef.current?.setAttribute("data-transitioning", "false"),
    });
    return () => { tween.kill(); };
  }, [shownDirection, reducedMotion]);

  return (
    <div
      ref={frameRef}
      className="portrait-frame"
      data-direction={shownDirection}
      tabIndex={0}
      role="img"
      aria-label="Black-and-white portrait of Lahcen in a suit. His head follows your cursor."
      aria-describedby="portrait-keyboard-help"
      onBlur={() => setDirection("neutral")}
      onKeyDown={event => {
        if (reducedMotion) return;
        if (event.key === "Escape" || event.key === "Home") {
          event.preventDefault();
          setDirection("neutral");
        } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          const step = event.key === "ArrowRight" ? 1 : -1;
          setDirection(previous => {
            const index = previous === "neutral" ? (step === 1 ? -1 : 0) : headDirections.indexOf(previous);
            return headDirections[(index + step + 8) % 8];
          });
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          setDirection(event.key === "ArrowUp" ? "top" : "bottom");
        }
      }}
    >
      <div ref={canvasRef} className="portrait-canvas">
        <div className="portrait-body"><Image src="/generated/head-cutouts/neutral.png" alt="" fill priority quality={90} sizes="(max-width: 760px) 1000px, 2000px" className="portrait-base" /></div>
        <div className="portrait-heads" ref={headsRef}>
          {poses.map(pose => (
            <Image
              key={pose}
              src={`/generated/head-cutouts/${pose}.png`}
              alt=""
              aria-hidden="true"
              fill
              quality={90}
              sizes="(max-width: 760px) 1000px, 2000px"
              loading="eager"
              className="portrait-head"
              data-head={pose}
              onLoad={() => setLoaded(previous => new Set(previous).add(pose))}
            />
          ))}
        </div>
      </div>
      <span className="sr-only" id="portrait-keyboard-help">Use left and right arrow keys to cycle through eight head directions. Press Escape to return to the original pose.</span>
    </div>
  );
}
