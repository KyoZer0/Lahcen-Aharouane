export type PortfolioProject = {
  slug: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "centre-al-amal",
    index: "01",
    name: "Centre Al Amal",
    category: "Education platform",
    summary:
      "An academic operations platform connecting students, teachers, and administrators.",
    description:
      "Centre Al Amal brings core education workflows into one clear digital environment. The work focused on shaping a usable management experience for different roles, from day-to-day administration to student progress and communication.",
    role: "Product design & development",
    year: "2024",
    images: ["/project2.png", "/project2-1.png"],
    technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS"],
    liveUrl: "https://centrealamal.ma/",
  },
  {
    slug: "aiais",
    index: "02",
    name: "AIAIS",
    category: "Social impact platform",
    summary:
      "A public-facing platform supporting the association’s social-integration mission.",
    description:
      "The AIAIS website gives the association a central place to communicate its work, publish updates, welcome volunteers, and make community participation easier. The result balances a human mission with a maintainable digital presence.",
    role: "Web development & digital experience",
    year: "2024",
    images: ["/project1.png", "/project1-2.png", "/project1-1.png"],
    technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS"],
    liveUrl: "https://aiais.org",
  },
  {
    slug: "kloude",
    index: "03",
    name: "Kloude",
    category: "Hosting experience",
    summary:
      "A hosting product experience designed to make performance and plans easier to understand.",
    description:
      "Kloude translates a technical hosting offer into a confident, approachable product story. Clear comparison, responsive presentation, and a strong visual system help users move from evaluating infrastructure to choosing a plan.",
    role: "Product UI & front-end",
    year: "2024",
    images: ["/project4.png", "/project4-1.png", "/project4-2.png"],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Figma"],
  },
  {
    slug: "arcane-studios",
    index: "04",
    name: "Arcane Studios",
    category: "Freelance marketplace",
    summary:
      "A marketplace concept connecting clients and independent specialists.",
    description:
      "Arcane Studios explores a service marketplace built around relevant matching, professional portfolios, communication, and project collaboration.",
    role: "Full-stack product development",
    year: "2023",
    images: ["/project3.png", "/project3-1.png", "/project3-2.png"],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "kombathost",
    index: "05",
    name: "KombatHost",
    category: "Game hosting",
    summary:
      "A focused hosting interface for game, voice, and web infrastructure.",
    description:
      "KombatHost packages performance, protection, and server deployment into an experience aimed at demanding gaming communities.",
    role: "Product UI & development",
    year: "2023",
    images: ["/project5.png"],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "conflow-debug",
    index: "06",
    name: "Conflow.Debug",
    category: "Digital studio",
    summary:
      "A digital studio presence bringing development, design, and marketing together.",
    description:
      "Conflow.Debug presents a flexible digital service offer through a cohesive interface, with an emphasis on clear positioning and strong visual delivery.",
    role: "Design & development",
    year: "2023",
    images: ["/project6.png", "/project6-1.png"],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    slug: "tabkeeper",
    index: "07",
    name: "TabKeeper",
    category: "Browser utility",
    summary: "A compact Chrome extension for faster bookmark capture.",
    description:
      "TabKeeper is a lightweight browser tool that removes friction from saving useful websites for later.",
    role: "Product design & development",
    year: "2023",
    images: ["/project7.png"],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

export const featuredProjects = projects.slice(0, 3);

export const capabilities = [
  {
    index: "01",
    title: "Product development",
    copy: "From problem framing and prototypes to a usable, working digital product.",
  },
  {
    index: "02",
    title: "Web platforms",
    copy: "Responsive interfaces and robust web systems built around real workflows.",
  },
  {
    index: "03",
    title: "Digital consulting",
    copy: "Clear technical direction for businesses deciding what to build and how to deliver it.",
  },
];

export const experience = [
  {
    index: "01",
    name: "Hikaritech",
    detail: "Digital product development",
    meta: "Casablanca",
  },
  {
    index: "02",
    name: "Association Initiative Al Amal",
    detail: "Digital, web & communications",
    meta: "Social impact",
  },
  {
    index: "03",
    name: "Holberton School",
    detail: "Software engineering",
    meta: "2023—2024",
  },
];

export const socialLinks = {
  email: "lahcen.aharouane@gmail.com",
  linkedin: "https://ma.linkedin.com/in/lahcen-aharouane",
  github: "https://github.com/KyoZer0",
};
