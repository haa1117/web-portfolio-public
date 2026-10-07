import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });

const description = `${site.name} — ${site.role}. Products across mobile, TV, web, AI/data and business systems: apps on Google Play, live web platforms and full-stack software.`;

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description,
  authors: [{ name: site.name }],
  keywords: ["Hassan Ali Alvi", "portfolio", "full-stack developer", "mobile app developer", "Flutter", "React", "Next.js", "Android TV", "AI engineer"],
  openGraph: { title: `${site.name} — ${site.role}`, description, type: "website", siteName: `${site.name} Portfolio` },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description },
};

export const viewport: Viewport = { themeColor: "#04050a", colorScheme: "dark", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
      <body className="noise antialiased">{children}</body>
    </html>
  );
}
