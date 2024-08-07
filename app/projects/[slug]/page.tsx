import React from "react";
import Nav from "@/components/Navigation/Nav";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
    description:
      "A comprehensive website for Association Initiative Al Amal pour l'Intégration Sociale, focused on promoting social integration and community support.",
    images: ["/project1.png", "/project1-2.png"],
    fullDescription: `
      My collaboration with AIAIS resulted in a well crafted digital platform that amplifies their mission of social integration and community support. This project showcases the perfect blend of aesthetic design and robust functionality.

      Key Achievements:
      • Developed a responsive, user-centric interface that adapts seamlessly across devices
      • Implemented an intuitive content management system, empowering AIAIS to easily update and manage their digital content
      • Integrated interactive elements like event calendars and donation portals to boost community engagement
      • Optimized the site for search engines, significantly improving AIAIS's online visibility

      The impact of this project extends beyond the digital realm. By providing AIAIS with a strong online presence, I've helped them reach a wider audience, facilitate easier volunteer sign-ups, and streamline their donation process. The website now serves as a central hub for their community, fostering stronger connections and driving their mission forward.

      This project not only sharpened my Laravel skills but also deepened my understanding of non-profit sector needs in the digital space. It was a rewarding experience to see how our technical expertise could directly contribute to social good.
    `,
    technologies: ["Laravel", "PHP", "MySQL", "CSS3", "HTML5"],
    liveUrl: "https://aiais.org",
  },
  {
    slug: "centre-al-amal",
    name: "Centre Al amal",
    description:
      "An advanced center management platform designed to facilitate interactions between students, teachers, and administrators, streamlining educational operations and communication.",
    images: ["/project2.png", "/project2-1.png"],
    fullDescription: `
      The Centre Al Amal project represents a significant leap forward in educational management technology. This sophisticated platform seamlessly connects students, teachers, and administrators, creating a harmonious digital ecosystem for educational institutions.
  
      Key Achievements:
      • Crafted a clean, user-friendly interface catering to diverse user groups, ensuring effortless navigation and engagement
      • Integrated an advanced analytics dashboard, providing valuable insights into student progress and institutional performance
      • Engineered a state-of-the-art data protection system, ensuring the utmost privacy and security of sensitive information
  
      This project transcends traditional educational software by creating a holistic platform that addresses the unique challenges faced by modern educational institutions. By streamlining administrative tasks, enhancing communication, and providing data-driven insights.
  
      The platform's success lies in its ability to adapt to the specific needs of the institution. Through close collaboration with the Centre Al Amal team, we were able to tailor the solution to their unique requirements, resulting in a tool that feels custom-built yet offers the reliability of a well-established system.
  
      Leveraging the power of Laravel and PHP, coupled with a robust MySQL backend, this project pushed the boundaries of what's possible in educational technology. It challenged me to think creatively about data structures and user experience, resulting in significant growth in my ability to architect complex, scalable systems.
  
      The Centre Al Amal project not only sharpened my technical skills but also deepened my understanding of the education sector's digital needs. It was immensely satisfying to see how my technological solution could directly contribute to enhancing the quality of education and administrative efficiency.
    `,
    technologies: ["Laravel", "PHP", "MySQL", "CSS3", "HTML5"],
    liveUrl: "https://centrealamal.ma/",
  },
  {
    slug: "arcane-studios",
    name: "Arcane Studios",
    description:
      "A platform that connects clients with freelancers for a wide range of services, fostering a collaborative environment for professional growth.",
    images: ["/project3.png", "/project3-1.png", "/project3-2.png"],
    fullDescription: `
      Arcane Studios represents a paradigm shift in the freelance marketplace landscape. This innovative platform doesn't just connect clients with freelancers; it cultivates a thriving ecosystem where professional growth and collaboration take center stage.
  
      Key Features and Achievements:
      • Engineered a sophisticated system that pairs clients with the most suitable freelancers based on skills, experience, and project requirements
      • Implemented a robust, multi-currency payment system ensuring smooth, secure transactions for global users
      • Designed an immersive portfolio display feature, allowing freelancers to showcase their work in engaging, interactive formats
      • Integrated cutting-edge communication and project management tools, facilitating seamless collaboration between clients and freelancers
  
      Arcane Studios goes beyond being just another freelance platform. It's a catalyst for professional growth and innovation. By fostering a community where skills are valued and nurtured, we've created an environment that benefits both clients and freelancers alike.
  
      The platform's success is evident in the vibrant community it has fostered. Freelancers report increased job satisfaction and career growth, while clients praise the quality of work and ease of finding the right talent. This symbiotic relationship has resulted in a flourishing marketplace that continues to grow and evolve.
  
      Building Arcane Studios was an exhilarating journey into the world of modern web development. Utilizing React for a dynamic front-end, coupled with a robust Node.js and Express backend, and MongoDB for flexible data storage, this project pushed the boundaries of my full-stack development skills.
  
    `,
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "kloude",
    name: "Kloude",
    description:
      "A website for Kloude, A cloud-based platform that offers Performance & Budget Hosting for Any Platform!",
    images: ["/project4.png", "/project4-1.png", "/project4-2.png"],
    fullDescription: `
      Kloude emerges as a game-changer in the cloud hosting arena, offering a perfect blend of performance and affordability. This project showcases how cutting-edge technology can be harnessed to deliver unparalleled hosting solutions for businesses of all sizes.
  
      Innovative Features:
      • Crafted a user-friendly interface that simplifies complex hosting management tasks, making it accessible even to non-technical users
      • Designed the platform with a focus on energy efficiency, minimizing carbon footprint without compromising on performance
  
      Kloude has revolutionized the hosting experience for countless users. By offering enterprise-grade hosting solutions at budget-friendly prices, we've democratized access to high-performance hosting. The platform's reliability and ease of use have garnered praise from individual bloggers to large e-commerce businesses alike.
  
      The success of Kloude lies in its ability to adapt to diverse hosting needs. Whether it's a simple WordPress site or a complex web application, Kloude provides the perfect environment for growth and scalability. This versatility has not only attracted a wide user base but has also set new standards in the hosting industry.
  
      Building Kloude was an exciting foray into the intricate world of cloud infrastructure. Leveraging the power of React for a responsive front-end, combined with a scalable Node.js backend and MongoDB for flexible data management, this project pushed the boundaries of what's possible in cloud hosting technology.
  
    `,
    technologies: ["React", "Node.js", "MongoDB", "Express", "Figma"],
  },
  {
    slug: "kombathost",
    name: "KombatHost",
    description:
      "A hosting platform for Next-Gen Games, Voice and Web Hosting Provider. Spececilized in providing DDos Protection & High Performance Servers.",
    images: ["/project5.png"],
    fullDescription: `
      KombatHost emerges as a trailblazer in the specialized hosting realm, offering a unique blend of high-performance servers and unparalleled DDoS protection. This project exemplifies how targeted solutions can address the specific needs of gaming communities and performance-critical web applications.
  
      Groundbreaking Features:
      • Developed a flexible voice hosting platform that seamlessly scales with user demand, perfect for gaming communities of all sizes
      • Created an intuitive system allowing users to deploy game servers for popular titles with just a few clicks, streamlining the setup process
      • Implemented an advanced analytics dashboard providing real-time insights into server health, network performance, and resource utilization
  
      KombatHost has redefined the landscape of game and web hosting. By offering a robust platform that caters specifically to the high-demand, low-tolerance environment of online gaming, we've created a haven for gamers and developers alike. The platform's reliability and performance have garnered accolades from individual streamers to large e-sports organizations.
  
      The success of KombatHost lies in its understanding of the unique challenges faced by the gaming community. Whether it's hosting a small multiplayer server or supporting a massive online tournament, KombatHost provides the perfect infrastructure for seamless, uninterrupted gameplay. This specialized approach has not only attracted a dedicated user base but has also set new benchmarks in the industry.
  
      Developing KombatHost was an exhilarating dive into the complex world of high-performance hosting and network security. Utilizing cutting-edge technologies and custom-built solutions, this project pushed the boundaries of what's achievable in terms of server performance and protection.
  
    `,
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "conflow-debug",
    name: "Conflow.Debug",
    description:
      "A web development Agency that offers a wide range of services, including web development, web design, and digital marketing.",
    images: ["/project6.png", "/project6-1.png"],
    fullDescription: `
      Conflow.Debug represents the pinnacle of web development artistry, offering a comprehensive suite of digital services that transform ideas into captivating online experiences. This project showcases the power of holistic digital solutions in driving business growth and user engagement.
  
      Innovative Service Spectrum:
      • Pioneered a flexible development approach that seamlessly adapts to evolving project requirements and technological advancements
      • Implemented a design process that places user experience at the forefront, resulting in intuitive and engaging interfaces
      • Developed cutting-edge techniques to enhance website speed and performance, ensuring optimal user experience across all devices
      • Created a synergistic approach that aligns web development with digital marketing efforts, maximizing online visibility and conversion rates
  
      Conflow.Debug has redefined what it means to be a web development agency. By offering a perfect blend of technical expertise and creative innovation, we've helped businesses of all sizes establish powerful digital presences. The success stories range from startups achieving rapid online growth to established enterprises undergoing successful digital transformations.
  
      The agency's impact extends beyond just building websites. Through our holistic approach, we've helped clients reimagine their entire digital strategy, resulting in improved user engagement, higher conversion rates, and stronger brand identities. This comprehensive service model has not only satisfied clients but has also set new standards in the web development industry.
  
      Leading Conflow.Debug has been an exciting journey of continuous learning and innovation. By staying at the forefront of web technologies and design trends, we've consistently delivered cutting-edge solutions that push the boundaries of what's possible on the web.
  
    `,
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
];
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <article className="px-10 md:px-20 py-8">
        <Button variant="ghost" asChild className="mb-6">
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
          <p className="ml-6 text-lg">{project.description}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detailed Description</h2>
          <div
            className="ml-6 prose dark:prose-invert md:max-w-6xl md:text-justify text-lg"
            dangerouslySetInnerHTML={{
              __html: project.fullDescription.replace(/\n/g, "<br />"),
            }}
          />
        </section>

        {project.liveUrl && (
          <div className="mt-8">
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> View Live Site
              </a>
            </Button>
          </div>
        )}
      </article>
    </>
  );
}
