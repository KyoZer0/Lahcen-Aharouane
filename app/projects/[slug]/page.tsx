import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, socialLinks } from "@/lib/portfolio";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19 19 5M9 5h10v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function AsteriskMark() {
  return (
    <svg className="project-brand" viewBox="0 0 66 62" fill="none" aria-hidden="true">
      <path
        d="M33 1v60M3 31h60M11.8 9.8l42.4 42.4M54.2 9.8 11.8 52.2"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="project-page">
      <header className="project-header">
        <Link href="/#index" aria-label="Back to Lahcen Aharouane home">
          <AsteriskMark />
          <span>Lahcen Aharouane</span>
        </Link>
        <Link href="/#work">All work</Link>
      </header>

      <article>
        <div className="project-hero">
          <div className="project-hero__intro">
            <span className="project-kicker">
              {project.index} · {project.category}
            </span>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
          </div>

          <div className="project-hero__facts">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Stack</span>
              <strong>{project.technologies.join(" · ")}</strong>
            </div>
          </div>
        </div>

        <figure className="project-cover">
          <Image
            src={project.images[0]}
            alt={project.name + " full project view"}
            fill
            priority
            sizes="100vw"
            className="project-cover__image"
          />
        </figure>

        <section className="project-overview">
          <span>Overview</span>
          <p>{project.description}</p>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit live project <ArrowIcon />
            </a>
          ) : null}
        </section>

        {project.images.slice(1).map((image, index) => (
          <figure className="project-gallery-image" key={image}>
            <Image
              src={image}
              alt={project.name + " detail " + (index + 1)}
              fill
              sizes="100vw"
              className="project-gallery-image__asset"
            />
          </figure>
        ))}
      </article>

      <footer className="next-project">
        <span>Next project</span>
        <Link href={"/projects/" + nextProject.slug}>
          <strong>{nextProject.name}</strong>
          <ArrowIcon />
        </Link>
        <div>
          <a href={"mailto:" + socialLinks.email}>{socialLinks.email}</a>
          <span>Casablanca, Morocco</span>
        </div>
      </footer>
    </main>
  );
}
