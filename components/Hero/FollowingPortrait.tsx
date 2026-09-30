"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getHeadDirection, headDirections, type HeadDirection } from "@/lib/head-direction";
import { PortraitLook, portraitLookOrder, portraitLooks, type PortraitLookId } from "./PortraitLook";
import { animatePortraitChange, PortraitTransition } from "./PortraitTransition";
import { heroPersonas } from "./hero-personas";

type Props = {
  look: PortraitLookId;
  onLookChange: (look: PortraitLookId) => void;
};

export function FollowingPortrait({ look, onLookChange }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const currentLook = useRef<PortraitLookId>(look);
  const lastTransition = useRef(-1);
  const [pending, setPending] = useState<PortraitLookId | null>(null);
  const [mounted, setMounted] = useState<Set<PortraitLookId>>(() => new Set(["suit"]));
  const [ready, setReady] = useState<Set<PortraitLookId>>(() => new Set());
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<HeadDirection>("neutral");
  const [reducedMotion, setReducedMotion] = useState(false);
  const nextLook = portraitLookOrder[(portraitLookOrder.indexOf(look) + 1) % portraitLookOrder.length];
  const pendingReady = pending !== null && ready.has(pending);

  const markReady = useCallback((id: PortraitLookId) => {
    setReady(previous => previous.has(id) ? previous : new Set(previous).add(id));
  }, []);
  const loadFailed = useCallback((id: PortraitLookId) => {
    // Never remove the visible look if a background frame fails to load.
    if (id === currentLook.current) return;
    setMounted(previous => { const next = new Set(previous); next.delete(id); return next; });
    setReady(previous => { const next = new Set(previous); next.delete(id); return next; });
    setPending(null);
    busyRef.current = false;
    setError("Couldn’t load this look. Click to try again.");
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-pointer: fine)");
    let frame = 0;
    let position: { x: number; y: number } | null = null;
    const reset = () => { cancelAnimationFrame(frame); frame = 0; position = null; setDirection("neutral"); };
    const onPreference = () => { setReducedMotion(motion.matches); reset(); };
    const update = () => {
      frame = 0;
      if (!position || !frameRef.current || motion.matches || !pointer.matches || busyRef.current) return;
      const canvas = frameRef.current.querySelector<HTMLElement>(`.portrait-look[data-look="${currentLook.current}"] .portrait-canvas`);
      if (!canvas || frameRef.current.getBoundingClientRect().bottom < 0) return;
      const rect = canvas.getBoundingClientRect();
      const dx = position.x - (rect.left + rect.width * .50);
      const dy = position.y - (rect.top + rect.height * portraitLooks[currentLook.current].headY);
      setDirection(previous => getHeadDirection(dx, dy, previous));
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches || !pointer.matches || busyRef.current) return;
      position = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onViewportChange = () => { if (position && !frame) frame = requestAnimationFrame(update); };
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

  // Keep the current portrait visible until the next neutral image is decoded.
  useEffect(() => {
    if (!pending || pendingReady) return;
    const timer = window.setTimeout(() => loadFailed(pending), 15000);
    return () => window.clearTimeout(timer);
  }, [pending, pendingReady, loadFailed]);

  useLayoutEffect(() => {
    if (!pending || !pendingReady || !frameRef.current || !transitionRef.current) return;
    const frame = frameRef.current;
    let settled = false;
    const reveal = () => {
      currentLook.current = pending;
      // Commit the portrait and its headline together while the paper covers it.
      onLookChange(pending);
    };
    const finish = () => {
      if (settled) return;
      settled = true;
      reveal();
      setPending(null);
      busyRef.current = false;
    };
    if (reducedMotion) { finish(); return; }
    const variants = [0, 1, 2].filter(value => value !== lastTransition.current);
    const variant = variants[Math.floor(Math.random() * variants.length)];
    lastTransition.current = variant;
    frame.dataset.transition = String(variant);
    const cancelAnimation = animatePortraitChange(transitionRef.current, variant, reveal, finish);
    // Background tabs and interrupted animation ticks must not leave the UI busy.
    const onVisibilityChange = () => { if (document.hidden) finish(); };
    const deadline = window.setTimeout(finish, 4000);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelAnimation();
      window.clearTimeout(deadline);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pending, pendingReady, reducedMotion, onLookChange]);

  const switchLook = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError("");
    setDirection("neutral");
    setMounted(previous => new Set(previous).add(nextLook));
    setPending(nextLook);
  };
  const warmNextLook = () => {
    if (!error && !busyRef.current) setMounted(previous => previous.has(nextLook) ? previous : new Set(previous).add(nextLook));
  };

  return <div ref={frameRef} className="portrait-frame" data-look={look} data-direction={direction} data-changing={pending !== null}>
    {portraitLookOrder.map(id => mounted.has(id) ? <PortraitLook key={id} look={id} active={id === look} direction={id === look ? direction : "neutral"} reducedMotion={reducedMotion} onReady={markReady} onError={loadFailed} /> : null)}
    <PortraitTransition ref={transitionRef} label={heroPersonas[pending ?? look].role} />
    <button type="button" className="portrait-toggle" aria-label={`Switch portrait to ${nextLook} look`}
      aria-describedby="portrait-keyboard-help" aria-busy={pending !== null} aria-disabled={pending !== null}
      onClick={switchLook} onPointerEnter={warmNextLook} onFocus={warmNextLook} onBlur={() => setDirection("neutral")}
      onKeyDown={event => {
        if (busyRef.current || reducedMotion) return;
        if (event.key === "Escape" || event.key === "Home") {
          event.preventDefault(); setDirection("neutral");
        } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          const step = event.key === "ArrowRight" ? 1 : -1;
          setDirection(previous => {
            const index = previous === "neutral" ? (step === 1 ? -1 : 0) : headDirections.indexOf(previous);
            return headDirections[(index + step + 8) % 8];
          });
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault(); setDirection(event.key === "ArrowUp" ? "top" : "bottom");
        }
      }}>
      <span className="portrait-caption" aria-hidden="true"><span>{portraitLooks[look].caption} · 0{portraitLookOrder.indexOf(look) + 1}/03</span><span>{error ? "Try again ↗" : pending ? pendingReady ? "Changing look…" : `Loading ${pending}…` : "Click to change ↗"}</span></span>
    </button>
    <span className="sr-only" id="portrait-keyboard-help">Click or press Enter or Space to cycle through the suit, LS2 rider, and metal jacket with headphones. Use the arrow keys to change head direction. Press Escape to look forward.</span>
    <span className="sr-only" role="status">{error || (pending ? "Preparing the next portrait" : portraitLooks[look].description)}</span>
  </div>;
}
