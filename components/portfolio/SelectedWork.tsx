import Link from "next/link";
import { featuredProjects, projects } from "@/lib/portfolio";
import { ProjectGrid } from "./ProjectGrid";

export function SelectedWork() {
  return <section id="portfolio" className="section selected-work" aria-labelledby="work-title">
    <div className="section-label ruled-label" data-reveal><span>(01 — Portfolio)</span></div>
    <div className="section-heading" data-reveal><h2 id="work-title">Selected work.</h2><p>From playful products to <br />purposeful platforms.</p></div>
    <ProjectGrid projects={featuredProjects} />
    <div className="all-work-link" data-reveal><Link href="/work" className="text-link">View all work ({String(projects.length).padStart(2, "0")}) <span aria-hidden="true">↗</span></Link></div>
  </section>;
}

