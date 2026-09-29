import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/Hero/SiteHeader";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { projects } from "@/lib/portfolio";
import { contact } from "@/lib/site";
import { pageMetadata, absoluteUrl, personId } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
type ProjectParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProjectParams): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: true } };
  return pageMetadata(project.title, `${project.summary} ${project.category} project with contributions by Lahcen Aharouane.`, `/projects/${project.slug}`);
}
export default async function ProjectPage({ params }: ProjectParams) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.context, url: absoluteUrl(`/projects/${project.slug}`), image: absoluteUrl(project.image), contributor: { "@id": personId, "@type": "Person", name: "Lahcen Aharouane", url: absoluteUrl("/") } }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader inner />
    <main className="case-page" id="main">
      <Link className="text-link case-back" href="/work">← All work</Link>
      <div className="case-heading"><h1>{project.title}</h1><p>{project.category}<br />{project.attribution}</p></div>
      <ProjectMedia project={project} priority />
      <p className="capture-caption">{project.capture}</p>
      <div className="case-content">
        <h2>{project.summary}</h2>
        <div><p>{project.context}</p><h3>My contribution</h3><p>{project.role}</p>
          {project.technologies && <><h3>Built with</h3><ul className="case-technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></>}
          {project.highlights && <><h3>Inside the project</h3><ul className="case-highlights">{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></>}
          {project.source && <a className="text-link case-source" href={project.source} target="_blank" rel="noopener noreferrer">{project.sourceLabel} <span aria-hidden="true">↗</span></a>}
          {project.links && <div className="case-links">{project.links.map(link => <a key={link.url} className="text-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
        </div>
      </div>
      <div className="next-project"><p>Next project</p><Link href={`/projects/${nextProject.slug}`}>{nextProject.title} <span aria-hidden="true">↗</span></Link></div>
      <div className="case-footer"><Link href="/work" className="text-link">← All work</Link><a href={`mailto:${contact.email}`} className="text-link">Let’s work together <span aria-hidden="true">↗</span></a></div>
    </main>
  </>;
}
