"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  capabilities,
  experience,
  featuredProjects,
  projects,
  socialLinks,
} from "@/lib/portfolio";
import { HeroPortrait } from "./HeroPortrait";

const navigation = [
  { label: "Index", href: "#index" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

function AsteriskMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 66 62"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M33 1v60M3 31h60M11.8 9.8l42.4 42.4M54.2 9.8 11.8 52.2"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 19 19 5M9 5h10v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="poster-header">
      <a className="brand-link" href="#index" aria-label="Lahcen Aharouane — home">
        <AsteriskMark className="brand-mark" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="poster-pill desktop-cta" href="#contact">
        Start a project
      </a>

      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <button
        className={"menu-scrim " + (open ? "is-open" : "")}
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        className={"mobile-menu " + (open ? "is-open" : "")}
        aria-hidden={!open}
      >
        <div className="mobile-menu__topline">
          <span>Navigate</span>
          <span>Casablanca · MA</span>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span>05</span>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}

export function PortfolioHome() {
  const secondaryProjects = projects.slice(3);

  return (
    <main className="portfolio-shell">
      <RevealObserver />
      <section className="poster-hero" id="index" aria-labelledby="hero-title">
        <Header />

        <h1 className="hero-name" id="hero-title">
          <span className="hero-name__line hero-name__line--white">Lahcen</span>
          <span className="hero-name__line hero-name__line--pink">Aharouane</span>
        </h1>

        <HeroPortrait />

        <p className="hero-support hero-support--left">
          Digital Product Developer —
          <br />
          Casablanca, Morocco.
        </p>
        <p className="hero-support hero-support--right">
          Web systems for
          <br /> ambitious businesses.
        </p>
        <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
          <span className="hero-scroll__line" />
        </a>
      </section>

      <section className="manifesto-section" id="about">
        <div className="section-index" data-reveal>
          <span>00</span>
          <span>About</span>
        </div>

        <div className="manifesto-grid">
          <div className="manifesto-copy" data-reveal>
            <h2 className="display-heading">
              Products,
              <br />
              <span>platforms &</span>
              <br /> progress.
            </h2>
            <p>
              I turn business needs into clear, useful digital products — from
              first prototype to working platform.
            </p>
          </div>

          <figure className="developer-figure" data-reveal>
            <Image
              src="/generated/lahcen-developer.png"
              alt="Lahcen Aharouane working on a digital product at a laptop"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              className="cover-image"
            />
            <figcaption>
              <span>Designing the interface</span>
              <span>Building the system</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-index" data-reveal>
          <span>01</span>
          <span id="services-title">Services</span>
        </div>

        <div className="service-list">
          {capabilities.map((capability) => (
            <article className="service-row" key={capability.index} data-reveal>
              <span className="service-row__number">{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <ArrowIcon className="row-arrow" />
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="work-heading" data-reveal>
          <span className="section-index section-index--inline">
            <span>02</span>
            <span>Case studies</span>
          </span>
          <h2 className="display-heading" id="work-title">
            Selected <span>work</span>
          </h2>
        </div>

        <div className="featured-work">
          {featuredProjects.map((project, index) => (
            <article
              className={
                "project-feature " +
                (index % 2 === 1 ? "project-feature--reverse" : "")
              }
              key={project.slug}
              data-reveal
            >
              <div className="project-feature__meta">
                <span className="project-feature__number">{project.index}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                </div>
                <p className="project-feature__summary">{project.summary}</p>
                <Link className="text-link" href={"/projects/" + project.slug}>
                  View case study <ArrowIcon />
                </Link>
              </div>

              <Link
                className="project-feature__media"
                href={"/projects/" + project.slug}
                aria-label={"View " + project.name + " case study"}
              >
                <Image
                  src={project.images[0]}
                  alt={project.name + " project preview"}
                  fill
                  sizes="(max-width: 900px) 100vw, 62vw"
                  className="project-image"
                />
                <span className="project-feature__hover">Open project</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="more-work" data-reveal>
          <p>Also in the archive</p>
          <div>
            {secondaryProjects.map((project) => (
              <Link key={project.slug} href={"/projects/" + project.slug}>
                <span>{project.index}</span>
                <strong>{project.name}</strong>
                <span>{project.category}</span>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="consulting-section" aria-labelledby="consulting-title">
        <div className="consulting-copy" data-reveal>
          <div className="section-index section-index--light">
            <span>03</span>
            <span>Collaboration</span>
          </div>
          <h2 className="display-heading" id="consulting-title">
            Between <span>code</span>
            <br /> & business.
          </h2>
          <p>
            I work with teams to clarify the problem, shape the product, and
            deliver a digital system people can actually use.
          </p>
        </div>
        <figure className="consulting-figure" data-reveal>
          <Image
            src="/generated/lahcen-consulting.png"
            alt="Lahcen Aharouane discussing a digital product roadmap with business leaders"
            fill
            sizes="100vw"
            className="cover-image"
          />
        </figure>
      </section>

      <section className="experience-section" aria-labelledby="experience-title">
        <div className="section-index" data-reveal>
          <span>04</span>
          <span id="experience-title">Experience</span>
        </div>

        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row" key={item.index} data-reveal>
              <span>{item.index}</span>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <strong>{item.meta}</strong>
            </article>
          ))}
        </div>

        <blockquote className="proof-quote" data-reveal>
          <span className="proof-quote__label">Peer perspective</span>
          <p>
            “Elegant, clean prototypes and highly valued{" "}
            <em>front-end expertise.</em>”
          </p>
          <footer>
            Public LinkedIn recommendation · React, CSS & Figma collaboration
          </footer>
        </blockquote>

        <div className="credentials-line" data-reveal>
          <span>Selected learning</span>
          <p>IBM Web Development · Git & GitHub · Cloud Computing</p>
          <p>Holberton School · Software Engineering</p>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-heading" data-reveal>
          <h2 className="display-heading">
            Let&apos;s build
            <br />
            <span>something useful.</span>
          </h2>
        </div>

        <div className="contact-details" data-reveal>
          <div className="section-index section-index--light">
            <span>05</span>
            <span>Contact</span>
          </div>
          <a className="contact-email" href={"mailto:" + socialLinks.email}>
            {socialLinks.email}
          </a>
          <div className="contact-socials">
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowIcon />
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              GitHub <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="contact-footer">
          <a href="#index">
            <AsteriskMark className="footer-mark" /> Back to top
          </a>
          <span>Casablanca, Morocco</span>
          <span>© 2026 Lahcen Aharouane</span>
        </div>
      </footer>
    </main>
  );
}
