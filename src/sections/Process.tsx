import React, { useState } from "react";
import { processData } from "../data/process";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  Compass,
  Map,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
  Sparkles
} from "lucide-react";

export const Process: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeStep, setActiveStep] = useState(0);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" };
    switch (iconName) {
      case "Compass": return <Compass {...props} />;
      case "Map": return <Map {...props} />;
      case "Palette": return <Palette {...props} />;
      case "Code2": return <Code2 {...props} />;
      case "CheckCircle2": return <CheckCircle2 {...props} />;
      case "Rocket": return <Rocket {...props} />;
      case "LifeBuoy": return <LifeBuoy {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="process" className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="HOW WE WORK"
          title="A Disciplined Seven-Step"
          highlightedTitle="Delivery Pipeline."
          subtitle="From initial discovery and architectural blueprinting to testing, release, and long-term support."
        />

        {/* Interactive Timeline Stepper on Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-16 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          
          {processData.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setCursor("button")}
                onMouseLeave={resetCursor}
                className={`relative z-10 flex flex-col items-center group cursor-pointer transition-transform ${
                  isSelected ? "scale-110" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(245,158,11,0.5)] border border-amber-200/50"
                      : "bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-amber-400/50"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-[11px] font-mono mt-2 font-bold tracking-wider text-slate-300 uppercase">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Banner */}
        <div className="hidden lg:block mb-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#100f0a] to-slate-900/90 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.1)]">
          <div className="flex items-start justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  STEP {processData[activeStep].number} OF 07
                </span>
                <h3 className="text-3xl font-black font-heading text-white">
                  {processData[activeStep].title}
                </h3>
              </div>
              <p className="text-base text-slate-200 font-medium">
                {processData[activeStep].description}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {processData[activeStep].details}
              </p>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              {getIcon(processData[activeStep].icon)}
            </div>
          </div>
        </div>

        {/* Vertical Stepper for Mobile & Tablets */}
        <div className="lg:hidden space-y-4">
          {processData.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-heading font-black flex items-center justify-center shrink-0 text-sm">
                {step.number}
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-300 mb-1">
                  {step.description}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
