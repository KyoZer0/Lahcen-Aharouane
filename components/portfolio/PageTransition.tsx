"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import "./page-transition.css";

type Journey = {
  url: URL;
  from: string;
  issued: boolean;
  ready: boolean;
  coveredAt: number;
  history: boolean;
};

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
    const slices = overlay.querySelectorAll<HTMLElement>(".transition-slice");
    const title = overlay.querySelector<HTMLElement>(".transition-title");
    const print = overlay.querySelectorAll<HTMLElement>(".transition-print");
    const lowerWord = overlay.querySelector<HTMLElement>(".transition-word-bottom");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefetched = new Set<string>();
    let animation: gsap.core.Timeline | null = null;
    let failureTimer = 0;
    let revealTimer = 0;
    let frame = 0;
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
      // A short complete frame keeps fast, cached navigations from becoming a flash.
      const hold = Math.max(0, 160 - (performance.now() - pending.coveredAt));
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
          animation = gsap.timeline({ onComplete: () => { reset(); focusDestination(); } });
          animation.to(lowerWord, { x: -18, duration: .1, ease: "steps(2)" }, 0)
            .to(title, { xPercent: 7, autoAlpha: 0, duration: .18, ease: "power2.in" }, .025)
            .to(print, { autoAlpha: 0, duration: .12 }, .025)
            .to(slices, { yPercent: index => index === 1 ? 112 : -112, xPercent: index => index === 1 ? -12 : 12, duration: .48, stagger: .045, ease: "power3.inOut" }, .07);
        });
      }, hold);
    };
    reveal.current = revealPage;

    const begin = (url: URL, history = false) => {
      if (journey.current) reset();
      const destination = sectionLabels[url.hash] ?? pageLabels.current[url.pathname] ?? "Lahcen Aharouane";
      setLabel(destination);
      setAnnouncement(`Opening ${destination}`);
      const pending: Journey = { url, from: currentPath.current, issued: history, ready: false, coveredAt: 0, history };
      journey.current = pending;
      oldScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      if (content) { content.inert = true; content.setAttribute("aria-busy", "true"); }
      overlay.dataset.phase = "covering";
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(slices, { yPercent: history ? 0 : index => index === 1 ? 112 : -112, xPercent: history ? 0 : index => index === 1 ? -10 : 10 });
      gsap.set([title, ...Array.from(print)], { autoAlpha: 0 });
      gsap.set(title, { xPercent: -6, yPercent: -50, y: 0 });
      gsap.set(lowerWord, { x: 12 });
      animation = gsap.timeline({ onComplete: () => {
        if (journey.current !== pending) return;
        pending.coveredAt = performance.now();
        overlay.dataset.phase = "covered";
        issueNavigation();
        revealPage();
      } });
      animation.to(slices, { yPercent: 0, xPercent: 0, duration: history ? .01 : .36, stagger: history ? 0 : .035, ease: "power3.inOut" }, 0)
        .to(title, { xPercent: 0, autoAlpha: 1, duration: .2, ease: "power2.out" }, history ? 0 : .18)
        .to(print, { autoAlpha: 1, duration: .18 }, history ? 0 : .2)
        .to(lowerWord, { x: 0, duration: .16, ease: "steps(2)" }, history ? .04 : .26);
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

    // Warm the shared artwork once; all three moving slices reuse the same resource.
    const artwork = new window.Image();
    artwork.decoding = "async";
    artwork.fetchPriority = "low";
    artwork.src = "/transitions/ink-collage.png";
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
      cancelAnimationFrame(frame);
      journey.current = null;
      release();
    };
  }, [router]);

  return <>
    <div ref={root} className="page-transition" data-phase="idle" aria-hidden="true">
      <div className="transition-slice transition-slice-left" />
      <div className="transition-slice transition-slice-middle" />
      <div className="transition-slice transition-slice-right" />
      <div className="transition-print transition-signature">LA.</div>
      <div className="transition-title" data-length={label.length > 11 ? "long" : label.length > 5 ? "medium" : "short"}>
        <span className="transition-word transition-word-top">{label}</span>
        <span className="transition-word transition-word-bottom">{label}</span>
      </div>
      <span className="transition-print transition-credit">Lahcen Aharouane</span>
    </div>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </>;
}
