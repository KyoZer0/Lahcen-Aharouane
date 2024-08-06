import React from 'react';
import Nav from "@/components/Navigation/Nav";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export interface Project {
  slug: string;
  name: string;
  description: string;
  images: string[];
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
}
const projects: Project[] = [
  {
    slug: "aiais",
    name: "AIAIS - Association Initiative Al Amal pour l'Intégration Sociale",
    description: "A comprehensive website for Association Initiative Al Amal pour l'Intégration Sociale, focused on promoting social integration and community support.",
    images: ["/project1.png", "/project1-2.png"],
    fullDescription: `
      Our collaboration with AIAIS resulted in a powerful digital platform that amplifies their mission of social integration and community support. This project showcases the perfect blend of aesthetic design and robust functionality.

      Key Achievements:
      • Developed a responsive, user-centric interface that adapts seamlessly across devices
      • Implemented an intuitive content management system, empowering AIAIS to easily update and manage their digital content
      • Integrated interactive elements like event calendars and donation portals to boost community engagement
      • Optimized the site for search engines, significantly improving AIAIS's online visibility

      The impact of this project extends beyond the digital realm. By providing AIAIS with a strong online presence, we've helped them reach a wider audience, facilitate easier volunteer sign-ups, and streamline their donation process. The website now serves as a central hub for their community, fostering stronger connections and driving their mission forward.

      This project not only sharpened my Laravel skills but also deepened my understanding of non-profit sector needs in the digital space. It was a rewarding experience to see how our technical expertise could directly contribute to social good.
    `,
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "CSS3", "HTML5"],
    liveUrl: "https://www.aiais.org",
  },
  {
    slug: "centre-al-amal",
    name: "Centre Al amal",
    description:
      "An advanced center management platform designed to facilitate interactions between students, teachers, and administrators, streamlining educational operations and communication.",
    images: ["/project2.png"],
    fullDescription: "Detailed description of Centre Al amal project...",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://www.centre-al-amal.com",
  },
  {
    slug: "arcane-studios",
    name: "Arcane Studios",
    description:
      "A platform that connects clients with freelancers for a wide range of services, fostering a collaborative environment for professional growth.",
    images: ["/project3.png", "/project3-1.png", "/project3-2.png"],
    fullDescription: "Detailed description of Project 3...",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "kloude",
    name: "Kloude",
    description:
      "A website for Kloude, A cloud-based platform that offers Performance & Budget Hosting for Any Platform!",
    images: ["/project4.png", "/project4-1.png", "/project4-2.png"],
    fullDescription: "Detailed description",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "kombathost",
    name: "KombatHost",
    description: "A hosting platform for Next-Gen Games, Voice and Web Hosting Provider. Spececilized in providing DDos Protection & High Performance Servers.",
    images: ["/project5.png"],
    fullDescription: "Detailed description",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "conflow-debug",
    name: "Conflow.Debug",
    description:
      "A web development Agency that offers a wide range of services, including web development, web design, and digital marketing.",
    images: ["/project6.png", "/project6-1.png"],
    fullDescription: "Detailed description",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <article className="px-10 py-8">
        <Button
          variant="ghost"
          asChild
          className="mb-6"
        >
          <Link href="/projects">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>

        <div className="mb-8">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="mr-2 mb-2">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${project.name} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-lg">{project.description}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detailed Description</h2>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
        </section>

        {project.liveUrl && (
          <div className="mt-8">
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> View Live Site
              </a>
            </Button>
          </div>
        )}
      </article>
    </>
  );
}