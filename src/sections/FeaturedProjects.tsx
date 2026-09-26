import React, { useState, useEffect, useRef, useCallback } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Globe,
  ArrowUpRight
} from "lucide-react";

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  image: string;
  badge: string;
  tech: string[];
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "ml-ai-portfolio",
    title: "ML & AI Portfolio",
    category: "AI / Machine Learning",
    description: "Machine Learning, Generative AI, intelligent automation, and AI-powered solutions.",
    url: "https://k-zynova2.vercel.app/",
    image: "/projects/ml-portfolio-preview-v2.webp",
    badge: "Flagship AI",
    tech: ["PyTorch", "LLMs", "FastAPI", "Next.js"]
  },
  {
    id: "hamhold-jewellery",
    title: "HamHold Jewellery",
    category: "Luxury E-Commerce",
    description: "A premium jewellery e-commerce experience featuring elegant product presentation and luxury-inspired design.",
    url: "https://hamhold-jewellery.zynovaprofessional.workers.dev/",
    image: "/projects/hamhold-jewellery.webp",
    badge: "Luxury Brand",
    tech: ["React", "Tailwind CSS", "Cloudflare", "Framer"]
  },
  {
    id: "freshmart",
    title: "FreshMart",
    category: "Web Application",
    description: "A modern grocery shopping platform with an intuitive product discovery and shopping experience.",
    url: "https://freshmart.zynovaprofessional.workers.dev/",
    image: "/projects/FreshMart.webp",
    badge: "Live Platform",
    tech: ["TypeScript", "React", "Cloudflare", "Vite"]
  },
  {
    id: "bookverse",
    title: "BookVerse",
    category: "Digital Bookstore",
    description: "A modern online bookstore experience featuring curated books and a clean browsing interface.",
    url: "https://bookverse.zynovaprofessional.workers.dev/",
    image: "/projects/BookVerse.webp",
    badge: "Interactive Web",
    tech: ["React", "Modern UI/UX", "Tailwind", "Workers"]
  },
  {
    id: "mediwell",
    title: "MediWell",
    category: "Healthcare Platform",
    description: "A healthcare platform designed to make medical information and healthcare services easier to explore.",
    url: "https://medi-well-ten.vercel.app/",
    image: "/projects/MediWell.webp",
    badge: "HealthTech",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"]
  }
];

export const FeaturedProjects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isInViewport, setIsInViewport] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Track window resizing for responsive 3D card layout calculations with RAF throttling
  useEffect(() => {
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // IntersectionObserver to pause auto-rotate when section is not in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotation timer: pauses on hover, when out of view, or when reduced motion is preferred
  useEffect(() => {
    if (isHovered || !isInViewport) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, isInViewport]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum swipe distance

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Card slot calculation (5 positions: center, right, deep right, deep left, left)
  const getSlotConfig = useCallback((index: number) => {
    const count = FEATURED_PROJECTS.length;
    const diff = (index - activeIndex + count) % count;

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    if (diff === 0) {
      // CENTER (Active foreground card)
      return {
        slot: "center",
        zIndex: 30,
        opacity: 1,
        pointerEvents: "auto" as const,
        animationClass: "animate-float-center",
        transform: isMobile
          ? "translate3d(0, 0, 30px) scale(1)"
          : isTablet
          ? "translate3d(0, 0, 40px) scale(1)"
          : "translate3d(0, 0, 50px) scale(1)",
        isCenter: true
      };
    } else if (diff === 1) {
      // RIGHT (Immediate right flanking card)
      return {
        slot: "right",
        zIndex: 20,
        opacity: isMobile ? 0.45 : 0.85,
        pointerEvents: "auto" as const,
        animationClass: "animate-float-right",
        transform: isMobile
          ? "translate3d(85px, 12px, -30px) scale(0.82) rotateY(-4deg)"
          : isTablet
          ? "translate3d(200px, 16px, -50px) scale(0.86) rotateY(-8deg)"
          : "translate3d(280px, 18px, -60px) scale(0.88) rotateY(-9deg)",
        isCenter: false
      };
    } else if (diff === count - 1) {
      // LEFT (Immediate left flanking card)
      return {
        slot: "left",
        zIndex: 20,
        opacity: isMobile ? 0.45 : 0.85,
        pointerEvents: "auto" as const,
        animationClass: "animate-float-left",
        transform: isMobile
          ? "translate3d(-85px, 12px, -30px) scale(0.82) rotateY(4deg)"
          : isTablet
          ? "translate3d(-200px, 16px, -50px) scale(0.86) rotateY(8deg)"
          : "translate3d(-280px, 18px, -60px) scale(0.88) rotateY(9deg)",
        isCenter: false
      };
    } else if (diff === 2) {
      // DEEP RIGHT
      return {
        slot: "deep-right",
        zIndex: 10,
        opacity: isMobile ? 0 : isTablet ? 0.35 : 0.55,
        pointerEvents: isMobile ? ("none" as const) : ("auto" as const),
        animationClass: "animate-float-deep-right",
        transform: isMobile
          ? "translate3d(140px, 25px, -100px) scale(0.65)"
          : isTablet
          ? "translate3d(330px, 28px, -110px) scale(0.72) rotateY(-12deg)"
          : "translate3d(470px, 35px, -140px) scale(0.76) rotateY(-15deg)",
        isCenter: false
      };
    } else {
      // DEEP LEFT (diff === 3)
      return {
        slot: "deep-left",
        zIndex: 10,
        opacity: isMobile ? 0 : isTablet ? 0.35 : 0.55,
        pointerEvents: isMobile ? ("none" as const) : ("auto" as const),
        animationClass: "animate-float-deep-left",
        transform: isMobile
          ? "translate3d(-140px, 25px, -100px) scale(0.65)"
          : isTablet
          ? "translate3d(-330px, 28px, -110px) scale(0.72) rotateY(12deg)"
          : "translate3d(-470px, 35px, -140px) scale(0.76) rotateY(15deg)",
        isCenter: false
      };
    }
  }, [activeIndex, windowWidth]);

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 relative z-10 bg-transparent border-t border-amber-500/10 overflow-hidden"
      aria-label="Featured Projects Showcase"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/8 via-yellow-500/10 to-amber-600/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="SIGNATURE SHOWCASE"
          title="Featured"
          highlightedTitle="Projects & Products."
          subtitle="Explore a curated selection of digital products, intelligent solutions, and premium web experiences crafted by Zynova."
          badgeVariant="gold"
          align="center"
        />

        {/* Project Selector Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12 flex-wrap">
          {FEATURED_PROJECTS.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-850"
                }`}
                aria-label={`View ${proj.title}`}
              >
                <span className={`text-[10px] sm:text-xs font-mono font-semibold ${isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-400"}`}>
                  0{idx + 1}
                </span>
                <span>{proj.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3D Floating Stage Container */}
        <div
          className="relative w-full h-[510px] sm:h-[550px] md:h-[590px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {FEATURED_PROJECTS.map((project, idx) => {
            const config = getSlotConfig(idx);

            return (
              <div
                key={project.id}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  zIndex: config.zIndex,
                  opacity: config.opacity,
                  transform: config.transform,
                  pointerEvents: config.pointerEvents,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity"
                }}
                onClick={() => {
                  if (!config.isCenter) {
                    setActiveIndex(idx);
                  }
                }}
              >
                {/* Inner floating bobbing container (decoupled from 3D positioning) */}
                <div
                  className={`w-[305px] sm:w-[370px] md:w-[410px] ${config.animationClass} transition-shadow duration-300`}
                >
                  <div
                    className={`relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 bg-[#0b0e17]/95 backdrop-blur-xl border transition-all duration-300 shadow-2xl group ${
                      config.isCenter
                        ? "border-amber-500/50 shadow-[0_15px_45px_-10px_rgba(245,158,11,0.22)] ring-1 ring-amber-500/20"
                        : "border-slate-800/80 hover:border-amber-500/30 cursor-pointer shadow-black/60"
                    }`}
                  >
                    {/* Ambient subtle top glow */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

                    {/* Card Browser-style Top Bar */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
                        <span className="text-[10px] text-slate-400 font-mono ml-1.5 truncate max-w-[140px] sm:max-w-[180px]">
                          {project.url.replace(/^https?:\/\//, "")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{project.badge}</span>
                      </div>
                    </div>

                    {/* Project Preview Image */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-amber-500/40 transition-colors">
                      <PortfolioImage
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Image Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-transparent opacity-60" />

                      {/* Live Status indicator badge */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[10px] text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Production</span>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="pt-3.5 sm:pt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium tracking-wider uppercase text-amber-400">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {project.tech.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-amber-200 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        {config.isCenter && (
                          <ArrowUpRight className="w-4 h-4 text-amber-400 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        )}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Card Action Link / Button */}
                      {config.isCenter ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/25 transition-all duration-300 active:scale-[0.98]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>VISIT WEBSITE</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActiveIndex(idx)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-amber-300 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/30 transition-all"
                          aria-label={`Focus ${project.title}`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Click to View Project</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-8 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-amber-500 text-slate-300 hover:text-amber-400 shadow-xl transition-all hover:scale-110 active:scale-95 group"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-8 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-amber-500 text-slate-300 hover:text-amber-400 shadow-xl transition-all hover:scale-110 active:scale-95 group"
            aria-label="Next Project"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Pagination Dots & Active Project Info Banner */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {FEATURED_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span>Click any background card or use arrows / swipe to navigate</span>
          </p>
        </div>
      </div>
    </section>
  );
};
