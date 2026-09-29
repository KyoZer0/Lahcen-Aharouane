import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { PageTransition } from "@/components/portfolio/PageTransition";
import { projects } from "@/lib/portfolio";
import { site } from "@/lib/site";

const pageLabels = { "/": "Hello", "/work": "Work", ...Object.fromEntries(projects.map(project => [`/projects/${project.slug}`, project.title])) };

const ppradio = localFont({
  src: [
    {
      path: "../public/fonts/PPRadioGrotesk-Ultralight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/PPRadioGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PPRadioGrotesk-Black.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-ppradio",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lahcen Aharouane — Digital Product Developer",
    template: "%s — Lahcen Aharouane",
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#f4f4f3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ppradio.variable}>
        <div id="site-content">{children}</div>
        <PageTransition labels={pageLabels} />
      </body>
    </html>
  );
}
