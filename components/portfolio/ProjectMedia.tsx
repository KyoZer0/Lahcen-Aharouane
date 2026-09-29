import Image from "next/image";
import type { Project } from "@/lib/portfolio";

export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <div className={`project-media project-media-${project.slug}${project.image.startsWith("/work/") ? " project-media-captured" : ""}`}><div className="project-screen">
    <Image src={project.image} alt={`${project.title} — ${project.capture ?? "project interface screenshot"}`} fill sizes={priority ? "100vw" : "(max-width: 760px) 100vw, 55vw"} quality={90} priority={priority} />
  </div></div>;
}

