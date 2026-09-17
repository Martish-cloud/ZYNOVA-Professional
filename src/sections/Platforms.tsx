import React from "react";
import { platformsData } from "../data/platforms";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  Upwork_Icon,
  Fiverr_Icon,
  Freelancer_Icon,
  PeoplePerHour_Icon,
  Truelancer_Icon
} from "../components/icons/PlatformIcons";
import { ExternalLink } from "lucide-react";

const platformIconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  upwork: Upwork_Icon,
  fiverr: Fiverr_Icon,
  freelancer: Freelancer_Icon,
  peoplePerHour: PeoplePerHour_Icon,
  truelancer: Truelancer_Icon
};

export const Platforms: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="platforms" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FIND US ONLINE"
          title="Available on Leading"
          highlightedTitle="Freelance &amp; Contract Hubs."
          subtitle="Zynova is available through leading freelancing platforms, providing flexible escrow security and milestone-based engagements worldwide."
        />

        {/* Icons-Only Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {platformsData.map((plat) => {
            const url = siteConfig.freelancePlatforms[plat.configKey];
            const IconComponent = platformIconMap[plat.id];

            return (
              <a
                key={plat.name}
                href={url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor("project", plat.name)}
                onMouseLeave={resetCursor}
                className="group relative p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden backdrop-blur-sm"
              >
                {/* Brand Color Ambient Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ backgroundColor: plat.brandColor }}
                />

                {/* External link mini icon in top-right */}
                <div className="absolute top-3 right-3 text-slate-600 group-hover:text-amber-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>

                {/* Prominent Platform Brand Icon */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/40 shadow-inner mb-3.5"
                  style={{ color: plat.brandColor }}
                >
                  {IconComponent ? <IconComponent className="w-9 h-9 sm:w-11 sm:h-11" size={42} /> : null}
                </div>

                {/* Clean Platform Name */}
                <span className="font-heading font-bold text-sm sm:text-base text-slate-200 group-hover:text-amber-200 transition-colors tracking-wide">
                  {plat.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
