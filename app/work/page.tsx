import type { Metadata } from "next";
import { SiteHeader } from "@/components/Hero/SiteHeader";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { PageMotion } from "@/components/portfolio/PageMotion";
import { projects } from "@/lib/portfolio";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Work", description: "Websites, applications, and digital products by Lahcen Aharouane. Explore PlayTad, Agent71, VoxPair, ILikePDF, Archilux, and Madarij." };

export default function WorkPage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader inner />
    <main className="work-page" id="main">
      <div className="work-intro"><h1>Work, in practice.</h1><p>Digital products, websites, and tools. <br />A selection of things I’ve helped <br />bring to life.</p></div>
      <div className="work-index-label"><span>Selected projects ({String(projects.length).padStart(2, "0")})</span><i aria-hidden="true" /><span>2024 — 2026</span></div>
      <PageMotion><ProjectGrid projects={projects} /></PageMotion>
      <div className="case-footer archive-footer"><a href="/#top" className="text-link">← Back to home</a><a href={`mailto:${contact.email}`} className="text-link">Have a project in mind? <span aria-hidden="true">↗</span></a></div>
    </main>
  </>;
}
