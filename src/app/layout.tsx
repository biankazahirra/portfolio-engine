import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { portfolioConfig } from "@/config/portfolio.config";
import { siteUrl } from "@/config/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolioConfig.site.title,
  description: portfolioConfig.site.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fidela Andina",
    title: portfolioConfig.site.title,
    description: portfolioConfig.site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioConfig.site.title,
    description: portfolioConfig.site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#171A17" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
