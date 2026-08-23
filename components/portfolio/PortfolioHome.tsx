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

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={open ? "menu-icon is-open" : "menu-icon"} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>("a[href]");
    document.body.style.overflow = "hidden";
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

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Lahcen Aharouane, home">
        Lahcen Aharouane
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        Start a project <ArrowIcon />
      </a>

      <button
        ref={triggerRef}
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <MenuIcon open={open} />
      </button>

      <button
        className={open ? "mobile-scrim is-open" : "mobile-scrim"}
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={open ? "mobile-navigation is-open" : "mobile-navigation"}
        aria-hidden={!open}
      >
        <p>Navigate</p>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
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
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4%" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function ProjectLink({ slug }: { slug: string }) {
  return (
    <Link className="text-link" href={`/projects/${slug}`}>
      View case study <ArrowIcon />
    </Link>
  );
}

export function PortfolioHome() {
  const [primaryProject, ...supportingProjects] = featuredProjects;
  const archiveProjects = projects.slice(3);

  return (
    <main className="site-shell">
      <RevealObserver />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <Header />

        <div className="hero-grid page-grid">
          <div className="hero-copy">
            <span className="hero-rule" aria-hidden="true" />
            <h1 id="hero-title">
              Digital products,
              <br />
              clearly built<span>.</span>
            </h1>
            <p>
              I&apos;m Lahcen Aharouane, a product developer in Casablanca helping
              businesses turn complex ideas into useful web platforms.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">
                View selected work
              </a>
              <a className="button button--secondary" href="#contact">
                Start a conversation
              </a>
            </div>
          </div>

          <figure className="hero-media" aria-label="Portrait of Lahcen Aharouane">
            <Image
              src="/generated/lahcen-hero.png"
              alt="Lahcen Aharouane wearing a grey suit"
              fill
              priority
              sizes="(max-width: 760px) 88vw, 48vw"
              className="hero-image"
            />
          </figure>
        </div>

        <div className="hero-meta page-grid" aria-label="Professional details">
          <span>Casablanca, Morocco</span>
          <span>Product development</span>
          <span>Available for select projects</span>
        </div>
      </section>

      <section className="about-section page-grid" id="about">
        <div className="about-grid">
          <figure className="about-media" data-reveal>
            <Image
              src="/generated/lahcen-developer.png"
              alt="Lahcen Aharouane working on a digital product at a laptop"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
              className="media-image"
            />
          </figure>

          <div className="about-copy" data-reveal>
            <SectionLabel>About</SectionLabel>
            <h2>From idea to a product people can use.</h2>
            <p>
              I translate business needs into focused digital products—from
              early decisions and prototypes to robust platforms ready for real
              work.
            </p>
            <span className="image-caption">
              Designing the interface · Building the system
            </span>
          </div>
        </div>

        <div className="services-block" id="services">
          <SectionLabel>Services</SectionLabel>
          <div className="service-list">
            {capabilities.map((capability) => (
              <article className="service-row" key={capability.index} data-reveal>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section page-grid" id="work" aria-labelledby="work-title">
        <header className="work-intro" data-reveal>
          <SectionLabel>Selected work</SectionLabel>
          <h2 id="work-title">Platforms built for real people and real work.</h2>
        </header>

        <article className="featured-project" data-reveal>
          <div className="project-copy">
            <span className="project-number">{primaryProject.index}</span>
            <h3>{primaryProject.name}</h3>
            <p className="project-category">{primaryProject.category}</p>
            <p className="project-summary">{primaryProject.summary}</p>
            <ProjectLink slug={primaryProject.slug} />
          </div>
          <Link
            className="project-media project-media--featured"
            href={`/projects/${primaryProject.slug}`}
            aria-label={`View ${primaryProject.name} case study`}
          >
            <Image
              src={primaryProject.images[0]}
              alt={`${primaryProject.name} project preview`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 64vw"
              className="project-image"
            />
          </Link>
        </article>

        <div className="supporting-work">
          {supportingProjects.map((project) => (
            <article className="supporting-project" key={project.slug} data-reveal>
              <Link
                className="project-media"
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.name} case study`}
              >
                <Image
                  src={project.images[0]}
                  alt={`${project.name} project preview`}
                  fill
                  sizes="(max-width: 760px) 100vw, 46vw"
                  className="project-image"
                />
              </Link>
              <div className="supporting-project__copy">
                <span className="project-number">{project.index}</span>
                <h3>{project.name}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-summary">{project.summary}</p>
                <ProjectLink slug={project.slug} />
              </div>
            </article>
          ))}
        </div>

        <div className="archive-list" data-reveal>
          <SectionLabel>More work</SectionLabel>
          {archiveProjects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <span>{project.index}</span>
              <strong>{project.name}</strong>
              <span>{project.category}</span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="consulting-section page-grid" aria-labelledby="consulting-title">
        <figure className="consulting-media" data-reveal>
          <Image
            src="/generated/lahcen-consulting.png"
            alt="Lahcen Aharouane discussing a digital product with business leaders"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="media-image"
          />
        </figure>
        <div className="consulting-copy" data-reveal>
          <SectionLabel>Consulting</SectionLabel>
          <h2 id="consulting-title">Technical decisions, made clearer.</h2>
          <p>
            I work with teams to clarify the problem, shape the product, and
            deliver a digital system people can actually use.
          </p>
        </div>
      </section>

      <section className="experience-section page-grid" aria-labelledby="experience-title">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="sr-only" id="experience-title">
          Experience
        </h2>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row" key={item.index} data-reveal>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <strong>{item.meta}</strong>
              <ArrowIcon />
            </article>
          ))}
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-grid page-grid">
          <div className="contact-copy" data-reveal>
            <h2>Have a product to move forward?</h2>
            <p>
              Tell me what you&apos;re building, where it is stuck, or what needs to
              become clearer.
            </p>
          </div>

          <div className="contact-links" data-reveal>
            <a className="email-link" href={`mailto:${socialLinks.email}`}>
              {socialLinks.email} <ArrowIcon />
            </a>
            <div>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowIcon />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noreferrer">
                GitHub <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer page-grid">
          <a href="#top">Lahcen Aharouane</a>
          <span>Casablanca, Morocco</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
