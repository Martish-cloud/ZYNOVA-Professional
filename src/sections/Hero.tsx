import React from "react";
import { siteConfig } from "../config/siteConfig";
import { HeroBackground } from "./HeroBackground";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { TypewriterHeroHeadline } from "../components/ui/TypewriterHeroHeadline";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:py-24 overflow-hidden"
    >
      {/* Dynamic Animated Canvas & Ambient Backing */}
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Micro Badge */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700 mb-3.5 sm:mb-4">
          <Badge variant="gold" className="py-1 px-3 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>PREMIUM DIGITAL SOLUTIONS &bull; EST. 2026</span>
          </Badge>
        </div>

        {/* Cinematic Typewriter Main Headline */}
        <TypewriterHeroHeadline />

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed mb-4 sm:mb-5 font-normal">
          {siteConfig.brandName} is a premium technology studio engineering high-performance websites, scalable software, mobile apps, intelligent automation workflows, and actionable business intelligence.
        </p>

        {/* Founder Credential Line */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 border border-amber-500/20 backdrop-blur-md text-[11px] sm:text-xs text-slate-400 mb-6 sm:mb-7">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>
            Founded by <span className="text-amber-100 font-semibold">{siteConfig.founder.name}</span> &bull; {siteConfig.founder.location}
          </span>
        </div>

        {/* Primary Call To Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <MagneticButton
            asAnchor
            href="#book-call"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("book-call");
            }}
            variant="gold"
            className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold"
            cursorLabel="BOOK"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Book a Discovery Call</span>
          </MagneticButton>

          <MagneticButton
            asAnchor
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            variant="secondary"
            className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !border-amber-500/30 hover:!border-amber-400/80 hover:!text-amber-200"
            cursorLabel="SERVICES"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </MagneticButton>

          <MagneticButton
            asAnchor
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            variant="ghost"
            className="!px-4 sm:!px-5 !py-2.5 sm:!py-3 text-xs sm:text-sm font-medium border border-white/10 hover:border-amber-400/40 hover:text-amber-100"
            cursorLabel="WORK"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>View Projects</span>
          </MagneticButton>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <button
          onClick={() => scrollToSection("stats")}
          className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-[#D4AF37] transition-colors cursor-pointer group"
          aria-label="Scroll down to explore"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-9 rounded-full border-2 border-slate-700 flex items-start justify-center p-1 group-hover:border-amber-400/80 transition-colors">
            <span className="w-1.5 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
