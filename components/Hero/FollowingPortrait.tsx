"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getHeadDirection, headDirections, type HeadDirection } from "@/lib/head-direction";
import { PortraitLook, type PortraitLookId } from "./PortraitLook";

export function FollowingPortrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const currentLook = useRef<PortraitLookId>("suit");
  const [look, setLook] = useState<PortraitLookId>("suit");
  const [pending, setPending] = useState<PortraitLookId | null>(null);
  const [riderMounted, setRiderMounted] = useState(false);
  const [ready, setReady] = useState<Set<PortraitLookId>>(() => new Set());
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<HeadDirection>("neutral");
  const [reducedMotion, setReducedMotion] = useState(false);

  const markReady = useCallback((id: PortraitLookId) => {
    setReady(previous => previous.has(id) ? previous : new Set(previous).add(id));
  }, []);
  const loadFailed = useCallback((id: PortraitLookId) => {
    if (id === "rider") setRiderMounted(false);
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
      const canvas = frameRef.current.querySelector<HTMLElement>(`[data-look="${currentLook.current}"] .portrait-canvas`);
      if (!canvas || frameRef.current.getBoundingClientRect().bottom < 0) return;
      const rect = canvas.getBoundingClientRect();
      const dx = position.x - (rect.left + rect.width * .50);
      const dy = position.y - (rect.top + rect.height * .30);
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

  // Keep the current portrait visible until every frame of the next look is decoded.
  useEffect(() => {
    if (!pending || ready.has(pending)) return;
    const timer = window.setTimeout(() => loadFailed(pending), 15000);
    return () => window.clearTimeout(timer);
  }, [pending, ready, loadFailed]);

  useLayoutEffect(() => {
    if (!pending || !ready.has(pending) || !frameRef.current) return;
    const frame = frameRef.current;
    const outgoing = frame.querySelector<HTMLElement>(`[data-look="${look}"]`);
    const incoming = frame.querySelector<HTMLElement>(`[data-look="${pending}"]`);
    const sweep = frame.querySelector<HTMLElement>(".portrait-sweep");
    if (!outgoing || !incoming || !sweep) return;
    const finish = () => {
      gsap.set(outgoing, { autoAlpha: 0, clearProps: "clipPath,zIndex" });
      gsap.set(incoming, { autoAlpha: 1, clearProps: "clipPath,zIndex" });
      gsap.set(sweep, { autoAlpha: 0 });
      currentLook.current = pending;
      setLook(pending);
      setPending(null);
      busyRef.current = false;
    };
    if (reducedMotion) { finish(); return; }
    const progress = { value: 0 };
    const reverse = pending === "suit";
    gsap.set(incoming, { autoAlpha: 1, zIndex: 1 });
    gsap.set(outgoing, { autoAlpha: 1, zIndex: 0 });
    const draw = () => {
      const y = reverse ? -20 + progress.value * 140 : 120 - progress.value * 140;
      const upper = `polygon(0% 0%, 100% 0%, 100% ${y - 8}%, 0% ${y + 8}%)`;
      const lower = `polygon(0% ${y + 8}%, 100% ${y - 8}%, 100% 100%, 0% 100%)`;
      incoming.style.clipPath = reverse ? upper : lower;
      outgoing.style.clipPath = reverse ? lower : upper;
      sweep.style.top = `${y}%`;
    };
    draw();
    const timeline = gsap.timeline({ onComplete: finish });
    timeline.to(progress, { value: 1, duration: 1.25, ease: "power2.inOut", onUpdate: draw }, 0)
      .to(sweep, { autoAlpha: .65, duration: .22 }, .12)
      .to(sweep, { autoAlpha: 0, duration: .3 }, .92);
    return () => { timeline.kill(); };
  }, [pending, ready, look, reducedMotion]);

  const switchLook = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError("");
    setDirection("neutral");
    setRiderMounted(true);
    setPending(look === "suit" ? "rider" : "suit");
  };
  const warmRider = () => { if (!error) setRiderMounted(true); };

  return <div ref={frameRef} className="portrait-frame" data-look={look} data-direction={direction} data-changing={pending !== null}>
    <PortraitLook look="suit" direction={direction} reducedMotion={reducedMotion} onReady={markReady} onError={loadFailed} />
    {riderMounted ? <PortraitLook look="rider" direction={direction} reducedMotion={reducedMotion} onReady={markReady} onError={loadFailed} /> : null}
    <div className="portrait-sweep" aria-hidden="true"><span>{"///// + /////"}</span></div>
    <button type="button" className="portrait-toggle" aria-label={`Switch portrait to ${look === "suit" ? "rider" : "suit"} look`}
      aria-describedby="portrait-keyboard-help" aria-pressed={look === "rider"} aria-busy={pending !== null} aria-disabled={pending !== null}
      onClick={switchLook} onPointerEnter={warmRider} onFocus={warmRider} onBlur={() => setDirection("neutral")}
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
      <span className="portrait-caption" aria-hidden="true"><span>{look === "suit" ? "On duty" : "Off duty"}</span><span>{error ? "Try again ↗" : pending ? ready.has(pending) ? "Changing look…" : "Loading rider…" : "Click to change ↗"}</span></span>
    </button>
    <span className="sr-only" id="portrait-keyboard-help">Click or press Enter or Space to change between the original suit and the LS2 rider jacket. Use the arrow keys to change head direction. Press Escape to look forward.</span>
    <span className="sr-only" role="status">{error || (pending ? "Preparing the next portrait" : look === "rider" ? "Rider look: LS2 jacket and gloves, adjusting a glove strap." : "Original suit portrait.")}</span>
  </div>;
}
