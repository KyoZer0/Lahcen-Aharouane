"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { contact } from "@/lib/site";

const services = [
  { title: "Product & interface design", text: "Turning ideas into clear flows, considered interfaces, and practical prototypes.", tools: "User flows / UI design / Prototyping" },
  { title: "Web development", text: "Building responsive websites and web applications with careful attention to usability, performance, and maintainable code.", tools: "React / Next.js / Astro / Rust / Leptos" },
  { title: "Product direction", text: "Connecting what a product does with who it serves. A clear proposition, a practical roadmap, and a consistent story.", tools: "Product thinking / Technical guidance / Market positioning" }
];
export function Services() {
  const [active, setActive] = useState<number | null>(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tweens = rows.current.map((row, index) => row && gsap.to(row, { height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0, duration: reduced || firstRender.current ? 0 : .38, ease: "power2.inOut", overwrite: true }));
    firstRender.current = false;
    return () => { tweens.forEach(tween => { if (tween) tween.kill(); }); };
  }, [active]);
  return <section id="services" className="services-section" aria-labelledby="services-title">
    <div className="services-inner">
      <div className="services-intro" data-reveal>
        <p className="section-label">(03 — Services)</p>
        <h2 id="services-title">From an idea<br />to something<br />people use.</h2>
        <p className="services-note">Thoughtful strategy. Careful design.<br />Solid engineering.</p>
        <a href={`mailto:${contact.email}?subject=Let%E2%80%99s%20discuss%20a%20project`} className="text-link">Let’s discuss your project <span aria-hidden="true">↗</span></a>
      </div>
      <div className="services-list" data-reveal>
        {services.map((service, index) => <div className="service-row" key={service.title}>
          <h3><button id={`service-button-${index}`} aria-expanded={active === index} aria-controls={`service-panel-${index}`} onClick={() => setActive(active === index ? null : index)}>
            <span className="service-number">0{index + 1}</span><span>{service.title}</span><span className="service-toggle" aria-hidden="true">{active === index ? "−" : "+"}</span>
          </button></h3>
          <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-button-${index}`} aria-hidden={active !== index} ref={element => { rows.current[index] = element; }} className="service-panel" style={{ height: index === 0 ? "auto" : 0, opacity: index === 0 ? 1 : 0 }}>
            <div className="service-panel-content"><p>{service.text}</p><p className="service-tools">{service.tools}</p></div>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}

