import React, { useState } from "react";
import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { TechStack } from "./sections/TechStack";
import { DataSolutions } from "./sections/DataSolutions";
import { Projects } from "./sections/Projects";
import { WhyZynova } from "./sections/WhyZynova";
import { Industries } from "./sections/Industries";
import { Process } from "./sections/Process";
import { Platforms } from "./sections/Platforms";
import { CTASection } from "./sections/CTASection";
import { BookCall } from "./sections/BookCall";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/layout/Footer";
import { GlobalVideoBackground } from "./components/layout/GlobalVideoBackground";
import { Toast } from "./components/ui/Toast";
import type { ToastMessage } from "./components/ui/Toast";

export const App: React.FC = () => {
  const [prefilledService, setPrefilledService] = useState<string>("");
  const [prefilledBrief, setPrefilledBrief] = useState<string>("");
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
  };

  const handleDiscussProject = (brief: string) => {
    setPrefilledBrief(brief);
  };

  const showToast = (title: string, description: string, type: "success" | "error" = "success") => {
    setActiveToast({
      id: Date.now().toString(),
      type,
      title,
      description
    });
  };

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#050609] text-[#f1f5f9] selection:bg-amber-500/25 selection:text-amber-100">
        {/* Global Cinematic Tech 02 Background Video (Full website backdrop) */}
        <GlobalVideoBackground />

        {/* Subtle Ambient Golden Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/[0.035] blur-[150px]" />
          <div className="absolute top-[50%] left-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-500/[0.03] blur-[160px]" />
          <div className="absolute top-[80%] right-[10%] w-[500px] h-[500px] rounded-full bg-amber-600/[0.025] blur-[140px]" />
        </div>

        {/* Custom Interactive Physics Cursor */}
        <CustomCursor />

        {/* Fixed Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Quick Metrics Strip */}
          <Stats />

          {/* About Zynova & Founder Card */}
          <About />

          {/* Large Services Section with Modal */}
          <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

          {/* Modern Technology Stack */}
          <TechStack />

          {/* Dedicated Data & Analytics Section */}
          <DataSolutions />

          {/* Selected Work Showcase with Filter & Detail Modal */}
          <Projects onDiscussProject={handleDiscussProject} />

          {/* Why Zynova: 4 Pillars */}
          <WhyZynova />

          {/* Industries We Serve */}
          <Industries />

          {/* 7-Step Delivery Process */}
          <Process />

          {/* Freelance & Contract Platforms */}
          <Platforms />

          {/* Cinematic Agency CTA */}
          <CTASection />

          {/* Book A Call Conversion Point */}
          <BookCall
            prefilledService={prefilledService}
            prefilledBrief={prefilledBrief}
            onSuccess={(title, desc) => showToast(title, desc, "success")}
          />

          {/* Direct Contact Form */}
          <Contact
            onSuccess={(title, desc) => showToast(title, desc, "success")}
          />
        </main>

        {/* Agency Dark Footer */}
        <Footer />

        {/* Feedback Toast */}
        <Toast toast={activeToast} onDismiss={() => setActiveToast(null)} />
      </div>
    </CursorProvider>
  );
};

export default App;
