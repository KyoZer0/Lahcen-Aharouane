"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  seed: number;
};

const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 118;
const TRAIL_NOISE_AMP = 38;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;

function drawMorphBlob(
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number,
  seed: number,
) {
  if (radius < 2) return;

  const vertices: { x: number; y: number }[] = [];

  for (let index = 0; index < TRAIL_BLOB_PTS; index += 1) {
    const angle = (index / TRAIL_BLOB_PTS) * Math.PI * 2;
    const n1 = Math.sin(angle * 3 + time * 1.4 + seed) * 0.45;
    const n2 = Math.sin(angle * 5 - time * 0.9 + seed * 2.3) * 0.3;
    const n3 = Math.cos(angle * 2 + time * 1.8 + seed * 0.7) * 0.25;
    const noise =
      (n1 + n2 + n3) * TRAIL_NOISE_AMP * (radius / TRAIL_HEAD_R);
    const currentRadius = Math.max(2, radius + noise);

    vertices.push({
      x: cx + Math.cos(angle) * currentRadius,
      y: cy + Math.sin(angle) * currentRadius,
    });
  }

  const first = vertices[0];
  const last = vertices[vertices.length - 1];
  context.beginPath();
  context.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);

  for (let index = 0; index < vertices.length; index += 1) {
    const current = vertices[index];
    const next = vertices[(index + 1) % vertices.length];
    context.quadraticCurveTo(
      current.x,
      current.y,
      (current.x + next.x) / 2,
      (current.y + next.y) / 2,
    );
  }

  context.closePath();
  context.fill();
}

export function HeroPortrait() {
  const stageRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const portrait = portraitRef.current;
    const front = frontRef.current;
    const reveal = revealRef.current;

    if (!stage || !portrait || !front || !reveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frontCanvas = document.createElement("canvas");
    const revealCanvas = document.createElement("canvas");
    const frontContext = frontCanvas.getContext("2d");
    const revealContext = revealCanvas.getContext("2d");

    if (!frontContext || !revealContext) return;

    let points: TrailPoint[] = [];
    let hovering = false;
    let headRadius = 0;
    let time = 0;
    let mouse = { x: 0, y: 0 };
    let previousSample: { x: number; y: number } | null = null;
    let animationFrame = 0;

    const resize = () => {
      const bounds = portrait.getBoundingClientRect();
      frontCanvas.width = Math.max(1, Math.round(bounds.width));
      frontCanvas.height = Math.max(1, Math.round(bounds.height));
      revealCanvas.width = frontCanvas.width;
      revealCanvas.height = frontCanvas.height;
    };

    const setPointer = (event: PointerEvent) => {
      const bounds = portrait.getBoundingClientRect();
      mouse = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    };

    const onPointerEnter = (event: PointerEvent) => {
      hovering = true;
      setPointer(event);
      previousSample = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      setPointer(event);
    };

    const onPointerLeave = () => {
      hovering = false;
      previousSample = null;
    };

    const renderMask = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      inverted: boolean,
    ) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!inverted) {
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "destination-out";
      } else {
        context.globalCompositeOperation = "source-over";
      }

      for (const point of points) {
        context.fillStyle = inverted
          ? `rgba(255,255,255,${point.alpha})`
          : `rgba(0,0,0,${point.alpha})`;
        drawMorphBlob(context, point.x, point.y, point.r, time, point.seed);
      }

      context.globalCompositeOperation = "source-over";
    };

    const frame = () => {
      const targetRadius = hovering ? TRAIL_HEAD_R : 0;
      headRadius +=
        (targetRadius - headRadius) * (hovering ? 0.14 : 0.04);

      if (hovering && headRadius > 5) {
        const distance = previousSample
          ? Math.hypot(
              mouse.x - previousSample.x,
              mouse.y - previousSample.y,
            )
          : Number.POSITIVE_INFINITY;

        if (distance > TRAIL_SAMPLE_DIST) {
          points.push({
            x: mouse.x,
            y: mouse.y,
            r: headRadius,
            alpha: 1,
            seed: Math.random() * 100,
          });
          points = points.slice(-TRAIL_MAX_POINTS);
          previousSample = { ...mouse };
        }
      }

      points = points
        .map((point) => ({
          ...point,
          alpha: point.alpha * TRAIL_FADE_SPEED,
          r: point.r * 0.995,
        }))
        .filter((point) => point.alpha >= 0.01);

      time += 0.016;

      if (points.length > 0) {
        renderMask(frontContext, frontCanvas, false);
        renderMask(revealContext, revealCanvas, true);
        const frontMask = `url(${frontCanvas.toDataURL()})`;
        const revealMask = `url(${revealCanvas.toDataURL()})`;
        front.style.maskImage = frontMask;
        front.style.webkitMaskImage = frontMask;
        reveal.style.maskImage = revealMask;
        reveal.style.webkitMaskImage = revealMask;
      } else {
        front.style.maskImage = "none";
        front.style.webkitMaskImage = "none";
        reveal.style.maskImage = "linear-gradient(transparent, transparent)";
        reveal.style.webkitMaskImage =
          "linear-gradient(transparent, transparent)";
      }

      animationFrame = window.requestAnimationFrame(frame);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(portrait);
    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    animationFrame = window.requestAnimationFrame(frame);

    return () => {
      resizeObserver.disconnect();
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={stageRef} className="hero-portrait-stage" aria-hidden="true">
      <div ref={portraitRef} className="hero-portrait">
        <div ref={frontRef} className="hero-portrait__layer hero-portrait__front">
          <Image
            src="/generated/lahcen-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 88vw, 48vw"
            className="hero-portrait__image"
          />
        </div>
        <div
          ref={revealRef}
          className="hero-portrait__layer hero-portrait__reveal"
        >
          <Image
            src="/generated/lahcen-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 88vw, 48vw"
            className="hero-portrait__image"
          />
        </div>
      </div>
    </div>
  );
}
