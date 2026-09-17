import React, { useRef, useState, useEffect } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { Clock, Briefcase, Layers, ShieldCheck } from "lucide-react";

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countHours = useCountUp(12, 1200, isInView);
  const countIndustries = useCountUp(8, 1400, isInView);
  const countProjects = useCountUp(35, 1600, isInView);
  const countOwnership = useCountUp(100, 1800, isInView);

  const stats = [
    {
      icon: Clock,
      value: `${countHours} Hours`,
      label: "Rapid Response Guarantee",
      subtext: "Agile, clear communication across time zones",
      color: "text-amber-300",
      borderGlow: "group-hover:border-amber-500/50"
    },
    {
      icon: Briefcase,
      value: `${countIndustries}+`,
      label: "Industries Served",
      subtext: "E-commerce, Healthcare, SaaS, EdTech, Real Estate",
      color: "text-yellow-400",
      borderGlow: "group-hover:border-yellow-500/50"
    },
    {
      icon: Layers,
      value: `${countProjects}+`,
      label: "Solutions Engineered",
      subtext: "Web platforms, backend microservices, BI dashboards",
      color: "text-amber-400",
      borderGlow: "group-hover:border-amber-500/50"
    },
    {
      icon: ShieldCheck,
      value: `${countOwnership}%`,
      label: "Client Ownership",
      subtext: "Complete source code, assets, and repository rights",
      color: "text-yellow-300",
      borderGlow: "group-hover:border-yellow-400/50"
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative z-10 py-16 bg-[#050609]/30 border-y border-amber-500/10 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`group relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 ${stat.borderGlow} transition-all duration-300 hover:bg-slate-900/70 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/50 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-slate-500 tracking-widest">
                    METRIC // 0{idx + 1}
                  </span>
                </div>

                <div className={`text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-1`}>
                  {stat.value}
                </div>

                <div className="text-sm font-semibold text-slate-200 mb-1">
                  {stat.label}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
