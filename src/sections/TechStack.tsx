import React, { useState } from "react";
import { technologiesData } from "../data/technologies";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  OpenAI_Icon,
  Claude_Icon,
  Gemini_Icon,
  N8N_Icon,
  Python_Icon,
  PowerBI_Icon,
  Excel_Icon,
  React_Icon,
  Nextjs_Icon,
  TypeScript_Icon,
  JavaScript_Icon,
  HTML5_Icon,
  CSS3_Icon,
  Nodejs_Icon,
  Express_Icon,
  NestJS_Icon,
  PHP_Icon,
  Laravel_Icon,
  WordPress_Icon,
  Git_Icon
} from "../components/icons/TechIcons";

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  openai: OpenAI_Icon,
  claude: Claude_Icon,
  gemini: Gemini_Icon,
  n8n: N8N_Icon,
  python: Python_Icon,
  powerbi: PowerBI_Icon,
  excel: Excel_Icon,
  react: React_Icon,
  nextjs: Nextjs_Icon,
  reactnative: React_Icon,
  typescript: TypeScript_Icon,
  javascript: JavaScript_Icon,
  html: HTML5_Icon,
  css: CSS3_Icon,
  nodejs: Nodejs_Icon,
  express: Express_Icon,
  nestjs: NestJS_Icon,
  php: PHP_Icon,
  laravel: Laravel_Icon,
  wordpress: WordPress_Icon,
  git: Git_Icon
};

export const TechStack: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI & Automation", "Frontend", "Backend", "Ecosystem & CMS"];

  const filteredTech = activeCategory === "All"
    ? technologiesData
    : technologiesData.filter((t) => t.category === activeCategory);

  // For infinite marquee: repeat array
  const marqueeList = [...technologiesData, ...technologiesData];

  return (
    <section id="tech-stack" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR TECHNOLOGY STACK"
          title="Engineered With High-Performance"
          highlightedTitle="Modern Tools."
          subtitle="We build resilient digital architectures utilizing leading-edge frameworks, typed systems, AI pipelines, and battle-tested databases."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mb-20">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.id];
            return (
              <div
                key={tech.id}
                onMouseEnter={() => setCursor("project", tech.name)}
                onMouseLeave={resetCursor}
                className="group relative p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden backdrop-blur-sm hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
              >
                {/* Dynamic Brand Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ backgroundColor: tech.brandColor }}
                />
                
                {/* Icon Container */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/40 shadow-inner mb-3"
                  style={{ color: tech.brandColor }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" size={32} />
                  ) : null}
                </div>

                {/* Clean Label */}
                <span className="font-heading font-semibold text-xs sm:text-sm text-slate-300 group-hover:text-amber-200 transition-colors tracking-wide truncate max-w-full">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee Bar */}
      <div className="relative w-full overflow-hidden border-y border-slate-800/80 py-5 bg-[#090b14]/80 backdrop-blur-md">
        {/* Subtle Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#07080b] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#07080b] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-8 items-center whitespace-nowrap">
          {marqueeList.map((item, idx) => {
            const MarqueeIcon = iconMap[item.id];
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-mono text-xs font-semibold tracking-wider hover:border-amber-400/50 hover:text-amber-300 transition-colors"
              >
                {MarqueeIcon && <MarqueeIcon className="w-4 h-4" size={16} />}
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-500">&bull; {item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
