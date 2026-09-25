import React from "react";
import { Badge } from "./Badge";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeVariant?: "cyan" | "purple" | "emerald" | "gold" | "neutral";
  className?: string;
  fadeInOut?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightedTitle,
  subtitle,
  align = "center",
  badgeVariant = "gold",
  className = "",
  fadeInOut = true
}) => {
  const isCenter = align === "center";
  const { ref, isInView, prefersReducedMotion } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
    retrigger: true
  });

  const shouldAnimate = fadeInOut && !prefersReducedMotion;
  const isVisible = !shouldAnimate || isInView;

  return (
    <div
      ref={ref}
      className={`mb-8 sm:mb-10 md:mb-12 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"} ${className}`}
    >
      {/* Badge with Entrance Motion */}
      <div
        className={`mb-2.5 sm:mb-3 flex ${isCenter ? "justify-center" : "justify-start"} ${
          shouldAnimate
            ? `transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5 pointer-events-none"
              }`
            : ""
        }`}
      >
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>

      {/* Main Section Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2.5 sm:mb-3 leading-snug ${
          shouldAnimate
            ? `transition-all duration-700 delay-75 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`
            : ""
        }`}
      >
        {title}{" "}
        {highlightedTitle && (
          <span className="bg-gradient-to-r from-[#F4E4BC] via-[#D4AF37] to-[#E6C364] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(212,175,55,0.25)]">
            {highlightedTitle}
          </span>
        )}
      </h2>

      {/* Subtitle with Entrance Motion */}
      {subtitle && (
        <p
          className={`text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl font-normal ${
            shouldAnimate
              ? `transition-all duration-700 delay-150 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`
              : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
