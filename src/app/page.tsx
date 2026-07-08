"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic imports to avoid SSR issues with canvas/browser APIs
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import AISection from "@/components/AISection";
import MarketingSection from "@/components/MarketingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <TimelineSection />
          <AISection />
          <MarketingSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
