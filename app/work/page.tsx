import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/Hero/SiteHeader";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { PageMotion } from "@/components/portfolio/PageMotion";
import { projects } from "@/lib/portfolio";
import { contact } from "@/lib/site";
import { pageMetadata, absoluteUrl, personId } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = pageMetadata("Work", "Websites, applications, and digital products by Lahcen Aharouane. Explore PlayTad, Agent71, VoxPair, ILikePDF, Archilux, and Madarij.", "/work");

export default function WorkPage() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Work by Lahcen Aharouane", url: absoluteUrl("/work"), about: { "@id": personId }, mainEntity: { "@type": "ItemList", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: absoluteUrl(`/projects/${project.slug}`) })) } }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader inner />
    <main className="work-page" id="main">
      <div className="work-intro"><h1>Work, in practice.</h1><p>Digital products, websites, and tools. <br />A selection of things I’ve helped <br />bring to life.</p></div>
      <div className="work-index-label"><span>Selected projects ({String(projects.length).padStart(2, "0")})</span><i aria-hidden="true" /><span>2024 — 2026</span></div>
      <PageMotion><ProjectGrid projects={projects} /></PageMotion>
      <div className="case-footer archive-footer"><Link href="/#top" className="text-link">← Back to home</Link><a href={`mailto:${contact.email}`} className="text-link">Have a project in mind? <span aria-hidden="true">↗</span></a></div>
    </main>
  </>;
}
