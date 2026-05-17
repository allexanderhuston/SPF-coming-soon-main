import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunset Port Festival — Coming Soon · 22 & 23 August 2026",
  description: "A boutique open-air festival on the Black Sea coast. Pomorie Port, Bulgaria. Coming soon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/DelaGothicOne-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/hero-banner.jpg" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
