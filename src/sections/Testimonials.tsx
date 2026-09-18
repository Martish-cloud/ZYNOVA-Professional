import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { testimonialsData } from "../data/testimonials";
import { useCursor } from "../context/useCursor";
import { Star, CheckCircle2, Globe2, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const globalMarkets = [
    { name: "India", flag: "🇮🇳" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" },
    { name: "France", flag: "🇫🇷" }
  ];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10 overflow-hidden text-slate-200"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/[0.035] via-yellow-500/[0.02] to-transparent rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-600/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge="CLIENT TESTIMONIALS"
          title="What Our Clients"
          highlightedTitle="Say."
          subtitle="Feedback from businesses and professionals who have worked with ZYNOVA across technology, automation, data analytics and digital solutions."
          badgeVariant="gold"
          align="center"
        />

        {/* Testimonials 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setCursor("project", "READ")}
              onMouseLeave={resetCursor}
              className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-slate-900/85 via-[#090b14]/90 to-[#06070d]/95 border border-amber-500/20 hover:border-amber-400/55 p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] overflow-hidden"
            >
              {/* Large Subtle Decorative Quotation Watermark */}
              <span
                aria-hidden="true"
                className="absolute -top-3 right-4 font-serif text-8xl sm:text-9xl text-amber-400/[0.06] group-hover:text-amber-400/[0.12] transition-colors pointer-events-none select-none leading-none z-0"
              >
                &ldquo;
              </span>

              {/* Inner Card Top Content */}
              <div className="relative z-10 space-y-4">
                {/* Client Profile Header & Rating */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Neutral Avatar with Initials */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[1.5px] shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
                      <div className="w-full h-full rounded-full bg-[#080a12] flex items-center justify-center font-heading font-extrabold text-sm text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                        {item.avatar}
                      </div>
                    </div>

                    {/* Client Name & Designation */}
                    <div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {!item.isSample && (
                          <span
                            title="Verified Client"
                            className="text-amber-400 inline-flex items-center"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {item.role}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400/90 flex items-center gap-1 mt-0.5">
                        <span>{item.company}</span>
                        <span>&bull;</span>
                        <span>{item.flag}</span>
                      </p>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]"
                      />
                    ))}
                  </div>
                </div>

                {/* Review Narrative Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-sans font-normal pt-1">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Card Footer: Service Pill Badge */}
              <div className="relative z-10 pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25 group-hover:border-amber-400/40 transition-colors">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{item.service}</span>
                </span>

                <span className="text-[11px] font-mono text-slate-500">
                  {item.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Market Footprint Trust Indicator */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/80 via-[#0a0c16] to-slate-900/80 border border-amber-500/20 max-w-4xl mx-auto text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 font-heading mb-3">
            <Globe2 className="w-4 h-4 text-amber-400" />
            <span>Supporting clients across India &amp; global markets</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {globalMarkets.map((market) => (
              <span
                key={market.name}
                className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5 shadow-sm"
              >
                <span>{market.flag}</span>
                <span>{market.name}</span>
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-mono mt-3">
            Available for remote collaboration, contract engagements, and international client projects.
          </p>
        </div>
      </div>
    </section>
  );
};
