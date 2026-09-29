import type { Metadata } from "next";
import { contact, site } from "./site";
import { technologyGroups } from "./technologies";

export const absoluteUrl = (path: string) => new URL(path, site.url).href;
export const personId = absoluteUrl("/#person");

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle, description, url: absoluteUrl(path), siteName: site.name,
      type: "website", locale: "en_US",
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${site.name} — Digital product developer` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [absoluteUrl("/opengraph-image")] },
  };
}

export const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": personId,
      name: site.name, givenName: "Lahcen", familyName: "Aharouane",
      alternateName: site.alternateNames, url: absoluteUrl("/"),
      image: absoluteUrl("/lahcen2.jpg"), description: site.description,
      jobTitle: "CTO & Digital Product Developer",
      worksFor: { "@type": "Organization", name: "Hikaritech", url: "https://hikaritech.ma" },
      homeLocation: { "@type": "Place", name: "Casablanca, Morocco" },
      sameAs: [contact.linkedin, contact.github],
      knowsAbout: technologyGroups.flatMap(group => group.items),
    },
    {
      "@type": "WebSite", "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"), name: site.name, inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage", "@id": absoluteUrl("/#profile"),
      url: absoluteUrl("/"), name: `${site.name} — Digital Product Developer`,
      description: site.description, inLanguage: "en",
      isPartOf: { "@id": absoluteUrl("/#website") }, mainEntity: { "@id": personId },
    },
  ],
};
