import React, { useState } from "react";
import { servicesData } from "../data/services";
import type { ServiceItem } from "../data/services";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceModal } from "./ServiceModal";
import { useCursor } from "../context/useCursor";
import {
  Layout,
  Layers,
  Server,
  Smartphone,
  AppWindow,
  Cpu,
  ShieldCheck,
  Code2,
  FileCode,
  ShoppingBag,
  FileSpreadsheet,
  Filter,
  GitMerge,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ArrowUpRight,
  Sparkles,
  Code,
  Database
} from "lucide-react";

interface ServicesProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const { setCursor, resetCursor } = useCursor();
  const [activeCategory, setActiveCategory] = useState<"web-software" | "data-business">("web-software");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = servicesData.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" };
    switch (iconName) {
      case "Layout": return <Layout {...props} />;
      case "Layers": return <Layers {...props} />;
      case "Server": return <Server {...props} />;
      case "Smartphone": return <Smartphone {...props} />;
      case "AppWindow": return <AppWindow {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "ShieldCheck": return <ShieldCheck {...props} />;
      case "Code2": return <Code2 {...props} />;
      case "FileCode": return <FileCode {...props} />;
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "FileSpreadsheet": return <FileSpreadsheet {...props} />;
      case "Filter": return <Filter {...props} />;
      case "GitMerge": return <GitMerge {...props} />;
      case "BarChart3": return <BarChart3 {...props} />;
      case "PieChart": return <PieChart {...props} />;
      case "LineChart": return <LineChart {...props} />;
      case "Activity": return <Activity {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHAT WE BUILD"
          title="Engineered Solutions Built Around"
          highlightedTitle="Your Business."
          subtitle="From responsive client experiences and resilient backend architectures to advanced Power BI dashboards and Excel automation models."
        />

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 border border-amber-500/20 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setActiveCategory("web-software")}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "web-software"
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Web &amp; Software Development (10)</span>
            </button>

            <button
              onClick={() => setActiveCategory("data-business")}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "data-business"
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Data &amp; Business Solutions (7)</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              onMouseEnter={() => setCursor("project", "EXPAND")}
              onMouseLeave={resetCursor}
              className="group relative p-7 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Subtle top-corner accent gradient */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/15 transition-colors pointer-events-none" />

              <div>
                {/* Header with Number and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                    // {service.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 group-hover:scale-110 group-hover:border-amber-500/40 transition-all">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-200 transition-colors mb-3 leading-snug">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/60 text-slate-400 border border-slate-700/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/30 text-slate-400">
                      +{service.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Link Arrow */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
                  <span>Explore Deliverables</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceForBooking={(title) => {
          if (onSelectServiceForBooking) onSelectServiceForBooking(title);
        }}
      />
    </section>
  );
};
