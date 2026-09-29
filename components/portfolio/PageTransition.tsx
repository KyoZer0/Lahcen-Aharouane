"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { createTransitionPicker, transitionVariants, transitionAscii, type TransitionVariant } from "@/lib/page-transitions";
import "./page-transition.css";

type Journey = {
  url: URL;
  from: string;
  issued: boolean;
  ready: boolean;
  coveredAt: number;
  history: boolean;
  variant: TransitionVariant;
  direction: number;
};

function panelOffset(index: number, variant: TransitionVariant, direction: number, leaving = false) {
  const sign = (index % 2 ? 1 : -1) * direction * (leaving ? -1 : 1);
  if (variant.id === "poster") return { xPercent: sign * 112, yPercent: 0 };
  return { xPercent: variant.id === "diagonal" ? -sign * 10 : 0, yPercent: sign * 115 };
}

function destinationFor(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || !["http:", "https:"].includes(url.protocol)) return null;
  // These legacy URLs resolve to existing destinations, not separate pages.
  if (url.pathname === "/projects") url.pathname = "/work";
  if (url.pathname === "/about") { url.pathname = "/"; url.hash = "about"; }
  return url.pathname === window.location.pathname ? null : url;
}

const sectionLabels: Record<string, string> = {
  "#about": "About me", "#portfolio": "Work", "#services": "Services",
  "#journal": "Journal", "#contact": "Let’s talk", "#top": "Hello",
};

export function PageTransition({ labels }: { labels: Record<string, string> }) {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const journey = useRef<Journey | null>(null);
  const currentPath = useRef(pathname);
  const pageLabels = useRef(labels);
  const reveal = useRef<() => void>(() => {});
  const picker = useRef<ReturnType<typeof createTransitionPicker> | null>(null);
  const [label, setLabel] = useState("Work");
  const [announcement, setAnnouncement] = useState("");

  useLayoutEffect(() => { pageLabels.current = labels; }, [labels]);

  useLayoutEffect(() => {
    currentPath.current = pathname;
    const pending = journey.current;
    if (pending?.issued && pathname !== pending.from) {
      pending.ready = true;
      reveal.current();
    }
  }, [pathname]);

  useEffect(() => {
    const overlay = root.current;
    if (!overlay) return;
    const content = document.getElementById("site-content");
    const allSlices = Array.from(overlay.querySelectorAll<HTMLElement>(".transition-slice"));
    const title = overlay.querySelector<HTMLElement>(".transition-title");
    const print = overlay.querySelectorAll<HTMLElement>(".transition-print");
    const lowerWord = overlay.querySelector<HTMLElement>(".transition-word-bottom");
    const middleWord = overlay.querySelector<HTMLElement>(".transition-word-middle");
    const ghosts = overlay.querySelectorAll<HTMLElement>(".transition-ghost");
    const ascii = overlay.querySelector<HTMLElement>(".transition-ascii");
    const asciiLines = overlay.querySelectorAll<HTMLElement>(".transition-ascii-line");
    const pickVariant = picker.current ?? (picker.current = createTransitionPicker());
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefetched = new Set<string>();
    let animation: gsap.core.Timeline | null = null;
    let failureTimer = 0;
    let revealTimer = 0;
    let frame = 0;
    let preloadTimer = 0;
    let oldScrollBehavior: string | null = null;

    const release = () => {
      if (content) { content.inert = false; content.removeAttribute("aria-busy"); }
      if (oldScrollBehavior !== null) document.documentElement.style.scrollBehavior = oldScrollBehavior;
      oldScrollBehavior = null;
      overlay.dataset.phase = "idle";
      gsap.set(overlay, { autoAlpha: 0 });
    };

    const reset = () => {
      animation?.kill();
      window.clearTimeout(failureTimer);
      window.clearTimeout(revealTimer);
      cancelAnimationFrame(frame);
      journey.current = null;
      release();
      setAnnouncement("");
    };

    const focusDestination = () => {
      const main = document.querySelector<HTMLElement>("main");
      if (!main) return;
      if (!main.hasAttribute("tabindex")) {
        main.setAttribute("tabindex", "-1");
        main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
      }
      main.focus({ preventScroll: true });
    };

    const issueNavigation = () => {
      const pending = journey.current;
      if (!pending || pending.issued) return;
      pending.issued = true;
      router.push(pending.url.pathname + pending.url.search + pending.url.hash);
    };

    const revealPage = () => {
      const pending = journey.current;
      if (!pending?.ready || !pending.coveredAt || overlay.dataset.phase !== "covered") return;
      window.clearTimeout(failureTimer);
      window.clearTimeout(revealTimer);
      // Hold the finished poster long enough to read before the next page is revealed.
      const hold = Math.max(0, pending.variant.hold - (performance.now() - pending.coveredAt));
      revealTimer = window.setTimeout(() => {
        frame = requestAnimationFrame(() => {
          if (journey.current !== pending) return;
          if (!pending.history) {
            let anchor: HTMLElement | null = null;
            try { anchor = document.getElementById(decodeURIComponent(pending.url.hash.slice(1))); } catch { /* Invalid hashes keep normal top navigation. */ }
            if (anchor) anchor.scrollIntoView({ behavior: "auto" });
            else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
          overlay.dataset.phase = "revealing";
          const slices = allSlices.slice(0, pending.variant.pieces);
          animation = gsap.timeline({ onComplete: () => { reset(); focusDestination(); } });
          animation.to(middleWord, { x: 18 * pending.direction, duration: .24, ease: "steps(3)" }, 0)
            .to(lowerWord, { x: -24 * pending.direction, duration: .28, ease: "power2.in" }, 0)
            .to(ghosts, { xPercent: index => (index ? 8 : -8) * pending.direction, autoAlpha: 0, duration: .3 }, 0)
            .to(title, { xPercent: 5 * pending.direction, autoAlpha: 0, duration: .36, ease: "power2.in" }, .05)
            .to(print, { autoAlpha: 0, duration: .3 }, .05)
            .to(ascii, { autoAlpha: 0, y: -18 * pending.direction, duration: .3 }, 0)
            .to(asciiLines, { scaleX: 0, transformOrigin: pending.direction > 0 ? "right" : "left", duration: .35, stagger: .04, ease: "power2.in" }, 0)
            .to(slices, {
              xPercent: index => panelOffset(index, pending.variant, pending.direction, true).xPercent,
              yPercent: index => panelOffset(index, pending.variant, pending.direction, true).yPercent,
              duration: pending.variant.exit, stagger: pending.variant.exitStagger, ease: "power3.inOut",
            }, .14);
        });
      }, hold);
    };
    reveal.current = revealPage;

    const begin = (url: URL, history = false) => {
      if (journey.current) reset();
      const destination = sectionLabels[url.hash] ?? pageLabels.current[url.pathname] ?? "Lahcen Aharouane";
      const variant = pickVariant();
      const direction = Math.random() < .5 ? -1 : 1;
      const slices = allSlices.slice(0, variant.pieces);
      setLabel(destination);
      setAnnouncement(`Opening ${destination}`);
      const pending: Journey = { url, from: currentPath.current, issued: history, ready: false, coveredAt: 0, history, variant, direction };
      journey.current = pending;
      oldScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      if (content) { content.inert = true; content.setAttribute("aria-busy", "true"); }
      overlay.dataset.phase = "covering";
      overlay.dataset.variant = variant.id;
      overlay.style.setProperty("--transition-artwork", `url("${variant.artwork}")`);
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(allSlices, { display: index => index < variant.pieces ? "block" : "none" });
      gsap.set(slices, {
        xPercent: history ? 0 : index => panelOffset(index, variant, direction).xPercent,
        yPercent: history ? 0 : index => panelOffset(index, variant, direction).yPercent,
      });
      gsap.set([title, ...Array.from(print)], { autoAlpha: 0 });
      gsap.set(title, { xPercent: -4 * direction, yPercent: -50, y: 0, rotation: variant.id === "poster" ? -3 : 0 });
      gsap.set(middleWord, { x: 22 * direction });
      gsap.set(lowerWord, { x: -16 * direction });
      gsap.set(ghosts, { autoAlpha: 0, xPercent: index => (index ? -5 : 5) * direction, yPercent: index => index ? 105 : -105 });
      const asciiArt = transitionAscii[variant.id];
      if (ascii) ascii.textContent = asciiArt;
      gsap.set(ascii, { autoAlpha: 0, y: 20 * direction });
      gsap.set(asciiLines, { scaleX: 0, transformOrigin: direction > 0 ? "left" : "right" });
      const decode = { progress: 0 };
      let lastDecodeStep = -1;
      animation = gsap.timeline({ onComplete: () => {
        if (journey.current !== pending) return;
        pending.coveredAt = performance.now();
        overlay.dataset.phase = "covered";
        issueNavigation();
        revealPage();
      } });
      animation.to(slices, { yPercent: 0, xPercent: 0, duration: history ? .01 : variant.enter, stagger: history ? 0 : variant.stagger, ease: "power3.inOut" }, 0)
        .to(title, { xPercent: 0, autoAlpha: 1, duration: .44, ease: "power3.out" }, history ? .05 : .35)
        .to(print, { autoAlpha: 1, duration: .38 }, history ? .05 : .4)
        .to(middleWord, { x: -5 * direction, duration: .34, ease: "steps(3)" }, history ? .15 : .48)
        .to(lowerWord, { x: 3 * direction, duration: .38, ease: "power2.out" }, history ? .15 : .48);
      animation.to(ascii, { autoAlpha: .72, y: 0, duration: .4, ease: "power2.out" }, history ? .1 : .35)
        .to(asciiLines, { scaleX: 1, duration: .5, stagger: .08, ease: "power3.out" }, history ? .08 : .3)
        .to(decode, {
          progress: 1, duration: .64, ease: "none",
          onUpdate: () => {
            const step = Math.floor(decode.progress * 10);
            if (!ascii || step === lastDecodeStep) return;
            lastDecodeStep = step;
            const resolved = Math.floor(decode.progress * asciiArt.length);
            ascii.textContent = Array.from(asciiArt, (character, index) => character === " " || character === "\n" || index < resolved ? character : "+/[:#_]"[(index + step * 3) % 7]).join("");
          },
          onComplete: () => { if (ascii) ascii.textContent = asciiArt; },
        }, history ? .08 : .25);
      if (variant.id === "signal") animation.to(ghosts, { xPercent: 0, autoAlpha: .24, duration: .42, stagger: .05, ease: "power2.out" }, history ? .2 : .5);
      // A failed client route must never leave the website behind a permanent curtain.
      failureTimer = window.setTimeout(() => {
        if (journey.current !== pending) return;
        reset();
        if (!history) window.location.assign(url.href);
      }, 6500);
    };

    const anchorFrom = (event: Event) => event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = anchorFrom(event);
      const url = anchor && destinationFor(anchor);
      if (!url) return;
      event.preventDefault();
      event.stopPropagation();
      if (journey.current) return;
      if (motion.matches) router.push(url.pathname + url.search + url.hash);
      else begin(url);
    };
    const onIntent = (event: Event) => {
      const anchor = anchorFrom(event);
      const url = anchor && destinationFor(anchor);
      if (!url) return;
      const route = url.pathname + url.search;
      if (!prefetched.has(route)) { prefetched.add(route); router.prefetch(route); }
    };
    const onHistory = () => {
      if (motion.matches || window.location.pathname === currentPath.current) return;
      begin(new URL(window.location.href), true);
    };
    const onMotionChange = () => {
      if (!motion.matches || !journey.current) return;
      issueNavigation();
      reset();
    };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) reset(); };

    // Warm artwork after the initial content; each composition reuses one cached image.
    if (!motion.matches) preloadTimer = window.setTimeout(() => {
      transitionVariants.forEach(variant => {
        const artwork = new window.Image();
        artwork.decoding = "async";
        artwork.fetchPriority = "low";
        artwork.src = variant.artwork;
      });
    }, 900);
    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("pageshow", onPageShow);
    motion.addEventListener("change", onMotionChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("pageshow", onPageShow);
      motion.removeEventListener("change", onMotionChange);
      reveal.current = () => {};
      animation?.kill();
      window.clearTimeout(failureTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(preloadTimer);
      cancelAnimationFrame(frame);
      journey.current = null;
      release();
    };
  }, [router]);

  return <>
    <div ref={root} className="page-transition" data-phase="idle" data-variant="diagonal" aria-hidden="true">
      {[0, 1, 2, 3, 4].map(index => <div key={index} className="transition-slice" data-piece={index} />)}
      <pre className="transition-ascii">{transitionAscii.diagonal}</pre>
      <div className="transition-ascii-lines"><span className="transition-ascii-line">{">> / / / / / / / / / / + + +"}</span><span className="transition-ascii-line">{"[ ] :::::::::::::: [ ] //////"}</span></div>
      <div className="transition-print transition-signature">LA.</div>
      <div className="transition-title" data-length={label.length > 11 ? "long" : label.length > 5 ? "medium" : "short"}>
        <span className="transition-word transition-word-top">{label}</span>
        <span className="transition-word transition-word-middle">{label}</span>
        <span className="transition-word transition-word-bottom">{label}</span>
        <span className="transition-ghost">{label}</span>
        <span className="transition-ghost">{label}</span>
      </div>
      <span className="transition-print transition-credit">Lahcen Aharouane</span>
    </div>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </>;
}
