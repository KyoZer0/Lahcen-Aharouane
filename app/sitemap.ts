import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { projects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work", ...projects.map(project => `/projects/${project.slug}`)].map(path => ({ url: absoluteUrl(path) }));
}
