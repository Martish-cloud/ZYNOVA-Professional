import React from "react";
import { industriesData } from "../data/industries";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Compass,
  UtensilsCrossed,
  Activity,
  Building2,
  Briefcase,
  Rocket
} from "lucide-react";

export const Industries: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" };
    switch (iconName) {
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "HeartPulse": return <HeartPulse {...props} />;
      case "GraduationCap": return <GraduationCap {...props} />;
      case "Compass": return <Compass {...props} />;
      case "UtensilsCrossed": return <UtensilsCrossed {...props} />;
      case "Activity": return <Activity {...props} />;
      case "Building2": return <Building2 {...props} />;
      case "Briefcase": return <Briefcase {...props} />;
      case "Rocket": return <Rocket {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="industries" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="INDUSTRIES WE SERVE"
          title="Digital Solutions Engineered for"
          highlightedTitle="Diverse Sectors."
          subtitle="Tailored digital architectures and reporting pipelines designed to meet the unique operational challenges of modern industry verticals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industriesData.map((ind) => (
            <div
              key={ind.name}
              onMouseEnter={() => setCursor("project", ind.name)}
              onMouseLeave={resetCursor}
              className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 group-hover:scale-110 group-hover:border-amber-400/40 transition-all">
                    {getIcon(ind.icon)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-200 transition-colors mb-2">
                  {ind.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {ind.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
