"use client";

import { gsap } from "gsap";
import { forwardRef, useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const strips = Array.from({ length: 7 }, (_, index) => index);
const marks = ["+ + +   //   + + +", "/////////", "[ + ]   [ + ]", "////  ×  ////", ":: :: :: ::", "×   +   ×   +", "/////////"];

export const PortraitTransition = forwardRef<HTMLDivElement, { label: string }>(function PortraitTransition({ label }, ref) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // A body portal keeps the artwork clear of hero clipping and page transforms.
  return createPortal(<div ref={ref} className="portrait-transition" aria-hidden="true">
    {strips.map(index => <div className="portrait-tear" key={index} style={{ "--strip": index } as CSSProperties}>
      <div className="portrait-tear-print"><span>{marks[index]}</span></div>
    </div>)}
    <div className="portrait-transition-title">
      <span className="portrait-title-echo">{label}</span>
      <span className="portrait-title-main">{[...label].map((letter, index) => <span key={index}>{letter}</span>)}</span>
      <span className="portrait-title-echo">{label}</span>
    </div>
    <span className="portrait-transition-signature">LA. / Another side of me.</span>
  </div>, document.body);
});

/** Cover the whole portrait before swapping, so differently sized looks never ghost. */
export function animatePortraitChange(overlay: HTMLElement, variant: number, onCovered: () => void, onComplete: () => void) {
  const pieces = Array.from(overlay.querySelectorAll<HTMLElement>(".portrait-tear"));
  const title = overlay.querySelector<HTMLElement>(".portrait-transition-title")!;
  const letters = title.querySelectorAll(".portrait-title-main > span");
  const echoes = title.querySelectorAll(".portrait-title-echo");
  const signature = overlay.querySelector<HTMLElement>(".portrait-transition-signature")!;
  const order = variant === 0 ? [0, 1, 2, 3, 4, 5, 6] : variant === 1 ? [6, 5, 4, 3, 2, 1, 0] : [3, 2, 4, 1, 5, 0, 6];
  const direction = (index: number) => variant === 1 ? -1 : index % 2 === 0 ? 1 : -1;
  // Reset the pixel offset GSAP reads from the initial CSS percentage transform.
  // Otherwise it adds that offset to xPercent and the strips never fully close.
  gsap.set(pieces, { x: 0, y: 0, xPercent: index => direction(index) * 110 });
  gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
  gsap.set([title, signature], { opacity: 0 });
  gsap.set(letters, { yPercent: 110, rotation: 5 });
  gsap.set(echoes, { xPercent: index => index === 0 ? -12 : 12 });
  const timeline = gsap.timeline({ onComplete: () => {
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    onComplete();
  } });
  order.forEach((index, rank) => {
    timeline.to(pieces[index], { xPercent: 0, duration: .54, ease: "power3.inOut" }, rank * .055);
  });
  // All seven overlapping paper strips are fully closed at .87 seconds.
  timeline.call(onCovered, [], .91);
  timeline.to([title, signature], { opacity: 1, duration: .16 }, .78);
  timeline.to(letters, { yPercent: 0, rotation: 0, duration: .5, stagger: .025, ease: "power3.out" }, .8);
  timeline.to(echoes, { xPercent: 0, duration: .65, ease: "power3.out" }, .85);
  timeline.to([title, signature], { opacity: 0, duration: .25 }, 1.65);
  [...order].reverse().forEach((index, rank) => {
    timeline.to(pieces[index], { xPercent: -direction(index) * 110, duration: .66, ease: "power3.inOut" }, 1.8 + rank * .045);
  });
  return () => {
    timeline.kill();
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
  };
}
