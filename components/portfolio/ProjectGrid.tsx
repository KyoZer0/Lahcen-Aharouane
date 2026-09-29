import Link from "next/link";
import type { Project } from "@/lib/portfolio";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return <div className="project-grid">
    {projects.map(project => <article className={`project project-${project.slug}`} key={project.slug} data-reveal>
      <Link href={`/projects/${project.slug}`} className="project-link" aria-label={`Explore ${project.title}`}>
        <ProjectMedia project={project} />
        <div className="project-caption"><div><h3>{project.title}</h3><p>{project.category} <span aria-hidden="true">·</span> {project.attribution}</p></div><span className="project-arrow" aria-hidden="true">↗</span></div>
      </Link>
    </article>)}
  </div>;
}
