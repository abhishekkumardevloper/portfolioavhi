import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Abhishek Kumar — AI Developer & Full Stack Expert",
  description:
    "Award-winning AI Developer, Full Stack Engineer, SaaS Builder, and Marketing Strategist. Building tomorrow's digital experiences today.",
  keywords: [
    "AI Developer",
    "Full Stack Developer",
    "SaaS Developer",
    "Marketing Strategist",
    "Lead Generation",
    "UI/UX Designer",
    "Brand Consultant",
    "Automation Expert",
    "Abhishek Kumar",
  ],
  openGraph: {
    title: "Abhishek Kumar — AI Developer & Full Stack Expert",
    description: "Building premium AI systems, websites, and automation solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
