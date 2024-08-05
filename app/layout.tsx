import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from '@next/font/local'

const ppradio = localFont({
  src: [
    {
      path: '../public/fonts/PPRadioGrotesk-Regular.otf',
      weight: '400'
    },
    {
      path: '../public/fonts/PPRadioGrotesk-Black.otf',
      weight: '700'
    }
  ],
  variable: '--font-ppradio'
});

export const metadata: Metadata = {
  title: "Lahcen Aharouane",
  description: "Lahcen Aharouane's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ppradio.className}>{children}</body>
    </html>
  );
}
