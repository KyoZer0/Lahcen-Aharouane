import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";

export interface Project {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    slug: 'kloude',
    name: 'Kloude',
    description: 'A website for Kloude, A cloud-based platform that offers Performance & Budget Hosting for Any Platform!',
    imageUrl: '/project4.png',
  },
  {
    slug: 'kombathost',
    name: 'KombatHost',
    description: "A hosting platform for Next-Gen Games, Voice and Web Hosting Provider. Spececilized in providing DDos Protection & High Performance Servers.",
    imageUrl: '/project5.png',
  },
  {
    slug: 'arcane-studios',
    name: 'Arcane Studios',
    description: 'A platform that connects clients with freelancers for a wide range of services, fostering a collaborative environment for professional growth.',
    imageUrl: '/project3.png',
  },
  {
    slug: 'conflow-debug',
    name: 'Conflow.Debug',
    description: "A web development Agency that offers a wide range of services, including web development, web design, and digital marketing.",
    imageUrl: '/project6.png',
  },
  {
    slug: 'tabkeeper',
    name: 'TabKeeper',
    description: 'A chrome extension designed to help users automate the process of adding websites to their bookmarks.',
    imageUrl: '/project7.png',
  },
    {
      slug: 'aiais',
      name: 'AIAIS',
      description: "A comprehensive website for Association Initiative Al Amal pour l'Intégration Sociale, focused on promoting social integration and community support.",
      imageUrl: '/project1.png',
    },
    {
      slug: 'centre-al-amal',
      name: 'Centre Al amal',
      description: 'An advanced center management platform designed to facilitate interactions between students, teachers, and administrators, streamlining educational operations and communication.',
      imageUrl: '/project2.png',
    },
  ]

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <div className="p-4 md:p-10">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="block"
            >
              <div className="border border-gray-300 dark:border-gray-700 rounded-[10px] overflow-hidden hover:shadow-lg w-full h-full hover:scale-105 transition-all duration-500 ease-in-out">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.description.slice(0, 100)}...
                  </p>
                  <button className="mt-6 w-full rounded bg-primary-col px-4 py-4 text-md text-white hover:bg-transparent hover:border border-black hover:text-black transition-all duration-500">
                    Learn more &rarr;
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
