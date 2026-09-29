"use client";

import { gsap } from "gsap";
import type { CSSProperties } from "react";

const strips = Array.from({ length: 7 }, (_, index) => index);
const marks = ["+ + +   //   + + +", "/////////", "[ + ]   [ + ]", "////  ×  ////", ":: :: :: ::", "×   +   ×   +", "/////////"];

export function PortraitTransition() {
  return <div className="portrait-transition" aria-hidden="true">
    {strips.map(index => <div className="portrait-tear" key={index} style={{ "--strip": index } as CSSProperties}>
      <div className="portrait-tear-print"><span>{marks[index]}</span></div>
    </div>)}
  </div>;
}

/** Cover the whole portrait before swapping, so differently sized looks never ghost. */
export function animatePortraitChange(frame: HTMLElement, outgoing: HTMLElement, incoming: HTMLElement, variant: number, onComplete: () => void) {
  const overlay = frame.querySelector<HTMLElement>(".portrait-transition")!;
  const pieces = Array.from(overlay.querySelectorAll<HTMLElement>(".portrait-tear"));
  const order = variant === 0 ? [0, 1, 2, 3, 4, 5, 6] : variant === 1 ? [6, 5, 4, 3, 2, 1, 0] : [3, 2, 4, 1, 5, 0, 6];
  const direction = (index: number) => variant === 1 ? -1 : index % 2 === 0 ? 1 : -1;
  let completed = false;
  gsap.set(overlay, { autoAlpha: 1 });
  pieces.forEach((piece, index) => gsap.set(piece, { xPercent: direction(index) * 110 }));
  const timeline = gsap.timeline({ onComplete: () => {
    completed = true;
    gsap.set(overlay, { autoAlpha: 0 });
    onComplete();
  } });
  order.forEach((index, rank) => {
    timeline.to(pieces[index], { xPercent: 0, duration: .54, ease: "power3.inOut" }, rank * .055);
  });
  // All seven overlapping paper strips are fully closed at .87 seconds.
  timeline.set(outgoing, { autoAlpha: 0 }, .91)
    .set(incoming, { autoAlpha: 1 }, .91);
  [...order].reverse().forEach((index, rank) => {
    timeline.to(pieces[index], { xPercent: -direction(index) * 110, duration: .66, ease: "power3.inOut" }, 1.06 + rank * .045);
  });
  return () => {
    timeline.kill();
    gsap.set(overlay, { autoAlpha: 0 });
    if (!completed) {
      gsap.set(outgoing, { autoAlpha: 1 });
      gsap.set(incoming, { autoAlpha: 0 });
    }
  };
}
