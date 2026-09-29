export type Project = {
  slug: string; title: string; category: string; attribution: string; image: string;
  summary: string; context: string; role: string;
  technologies?: string[]; highlights?: string[]; capture?: string;
  source?: string; sourceLabel?: string;
  links?: { label: string; url: string }[];
};
export const projects: Project[] = [
  {
    slug: "playtad", title: "PlayTad", category: "Browser gaming", attribution: "Hikaritech",
    image: "/work/playtad.png", capture: "The live PlayTad website.",
    summary: "Small games. Whole worlds.",
    context: "PlayTad is Hikaritech’s browser-game studio in Casablanca. Its website brings the studio, its craft, and games such as JigSolitaire, Magic Sort, and FillWords into one playful digital world.",
    role: "Technical direction and product development at Hikaritech, connecting the studio’s visual identity, web experience, performance, and growth.",
    technologies: ["Astro", "TypeScript", "GSAP"],
    highlights: ["A studio identity rooted in Casablanca", "A dedicated catalogue and pages for each game", "Responsive layouts and considered motion"],
    source: "https://playtad.com/", sourceLabel: "Visit PlayTad",
    links: [{ label: "JigSolitaire", url: "https://jigsolitaire.online" }, { label: "Magic Sort", url: "https://magicsort.online" }, { label: "FillWords", url: "https://fillwords.com" }]
  },
  {
    slug: "agent71", title: "Agent71", category: "Enterprise software", attribution: "Hikaritech",
    image: "/work/agent71.png", capture: "The live Agent71 website, with its illustrative product dashboard.",
    summary: "One place for a business to move forward.",
    context: "Agent71 is an ERP initiative for Moroccan SMEs, bringing finance, sales, purchasing, inventory, and accounting into a connected product vision. This website introduces the platform through a clear product narrative and interactive interface previews.",
    role: "Technical direction and product development at Hikaritech. The work shown here focuses on the public product website, its interface, and the way it communicates the platform.",
    technologies: ["React", "JavaScript", "Vite", "GSAP"],
    highlights: ["A product-led homepage and dashboard presentation", "English, French, and Arabic navigation", "Dedicated product scope and e-invoicing pages"],
    source: "https://agent71.com/", sourceLabel: "Visit Agent71"
  },
  {
    slug: "voxpair", title: "VoxPair", category: "Mobile application", attribution: "Product development",
    image: "/work/voxpair.png", capture: "VoxPair’s local web preview. Native features are built for Android and iOS.",
    summary: "Good roads. Better company.",
    context: "VoxPair is a motorcycle riding companion for Android and iOS. It brings ride planning, navigation, saved journeys, rider profiles, and group coordination into one focused interface.",
    role: "Product design and application development, from the onboarding flow and riding interface to the systems supporting group journeys and voice communication.",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "LiveKit", "MapLibre"],
    highlights: ["Solo and group ride planning", "Maps, directions, and an opt-in location-sharing flow", "Rider profiles, bikes, and saved ride history"]
  },
  {
    slug: "ilikepdf", title: "ILikePDF", category: "Document tools", attribution: "Hikaritech",
    image: "/work/ilikepdf.png", capture: "The live ILikePDF tool catalogue.",
    summary: "Everyday PDF work. A little less effort.",
    context: "ILikePDF is a document workspace for merging, splitting, organizing, converting, and protecting PDFs. Guest processing happens in the browser, while account features add saved files and activity history.",
    role: "Design and development of the product experience, connecting a Rust web application with browser-based document processing, account infrastructure, and deployment.",
    technologies: ["Rust", "Leptos", "Axum", "WebAssembly", "PostgreSQL", "SQLx"],
    highlights: ["A searchable catalogue of PDF tools", "Document processing on the user’s device", "Account workspaces with encrypted file storage"],
    source: "https://ilikepdf.ma/", sourceLabel: "Visit ILikePDF"
  },
  {
    slug: "archilux", title: "Archilux", category: "Brand & commerce", attribution: "Website development",
    image: "/work/archilux.png", capture: "The local Archilux website preview. The hero is an illustrative campaign scene.",
    summary: "A different feeling starts with light.",
    context: "A digital showroom for Archilux, a lighting business in Casablanca. Cinematic campaign scenes introduce a catalogue of pendants, chandeliers, wall lights, and architectural lighting, with original product photography at the centre of the browsing experience.",
    role: "Website design and development across the visual direction, multilingual catalogue, product discovery, motion, and enquiry preparation.",
    technologies: ["Astro", "TypeScript", "CSS", "AVIF / WebP"],
    highlights: ["English, French, and Arabic, including RTL layouts", "Product discovery, search, sorting, and a style finder", "A local selection and project enquiry draft"]
  },
  {
    slug: "madarij", title: "Madarij", category: "Education platform", attribution: "Product development",
    image: "/work/madarij.png", capture: "The English homepage of the local Madarij website preview.",
    summary: "A whole school, finally connected.",
    context: "Madarij connects school teams and families around academics, communication, administration, and transport. The bilingual website introduces the product, while a separate school application provides role-scoped workspaces and persistent school records.",
    role: "Product design and development across the public website and school application, with attention to clear information, school roles, and modular software architecture.",
    technologies: ["Astro", "GSAP", "Rust", "Leptos", "PostgreSQL"],
    highlights: ["A bilingual French and English product website", "Dedicated journeys for school teams and families", "School workspaces with scoped roles and records"]
  },
  {
    slug: "centre-al-amal", title: "Centre Al Amal", category: "Education", attribution: "Team collaboration",
    image: "/project2.png", capture: "An original screenshot from the portfolio archive.",
    summary: "A clearer window into education.",
    context: "A digital presence for Centre Al Amal, introducing the centre, its learning opportunities, and access to registration. The project connects an educational institution with the people it serves.",
    role: "Team collaboration and technical guidance. Public project credits acknowledge Imad Guidouh’s web development and my collaboration; Oussama Kbaili also credits my professional supervision on a related academic management project.",
    source: "https://www.linkedin.com/posts/imad-guidouh_newbeginnings-grateful-developerjourney-activity-7247962366334631936-0JxV", sourceLabel: "Read the team’s project note"
  },
  {
    slug: "aiais", title: "AIAIS", category: "Community", attribution: "Team collaboration",
    image: "/project1.png", capture: "An original screenshot from the portfolio archive.",
    summary: "Making community work visible.",
    context: "An association website bringing news, activities, and ways to get involved into one public-facing experience. The original portfolio capture shows the organisation’s community initiatives and institutional updates.",
    role: "A collaborative team project with Imad Guidouh, who publicly credits the partnership. My broader work at Association Initiative Al Amal also included IT leadership, archiving systems, and online pre-inscription platforms.",
    source: "https://aiais.org", sourceLabel: "Visit AIAIS",
    links: [{ label: "Read the team’s project note", url: "https://www.linkedin.com/posts/imad-guidouh_newbeginnings-grateful-developerjourney-activity-7247962366334631936-0JxV" }]
  }
];
export const featuredProjects = ["playtad", "agent71", "archilux", "madarij"].map(slug => projects.find(project => project.slug === slug)!);
export const articles = [
  { category: "Puzzle design", title: "How puzzles build resilience", publication: "JigSolitaire", url: "https://jigsolitaire.online/blog/puzzles-build-resilience/" },
  { category: "Focus & play", title: "Why AMAZE is good for focus", publication: "AMAZE", url: "https://amaze-game.com/blog/why-amaze-game-is-good-for-focus/" },
  { category: "Shared experiences", title: "Cooperative puzzle games for the family", publication: "JigSolitaire", url: "https://jigsolitaire.online/blog/cooperative-puzzle-games-family/" }
];
