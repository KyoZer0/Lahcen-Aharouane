import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";

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
  title: {
    default: "Lahcen Aharouane — Digital Product Developer",
    template: "%s — Lahcen Aharouane",
  },
  description:
    "Digital Product Developer in Casablanca building useful web platforms, product experiences, and business systems.",
  openGraph: {
    title: "Lahcen Aharouane — Digital Product Developer",
    description:
      "Digital products, web platforms, and consulting from Casablanca, Morocco.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#161616",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ppradio.variable}>{children}</body>
    </html>
  );
}
