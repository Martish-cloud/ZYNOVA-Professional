import React from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import { ShieldCheck, MapPin, Terminal, Cpu, Clock, CheckCircle2 } from "lucide-react";

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="about" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHO WE ARE"
          title="Technology Built Around"
          highlightedTitle="Your Vision."
          subtitle="Zynova is a digital technology brand focused on building modern software, websites, applications, automation systems, and data-driven business solutions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Mission & Capabilities */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug">
              Practical digital engineering for ambitious entrepreneurs &amp; enterprises.
            </h3>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              At Zynova, we believe software must be resilient, beautiful, and directly tied to business results. We combine modern full-stack development, mobile engineering, AI workflows, and precision data analytics to solve tangible challenges.
            </p>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Whether building an e-commerce platform from the ground up, engineering enterprise backend APIs, automating error-prone Excel workflows, or delivering high-level Power BI reporting models, our focus is uncompromising quality and long-term scalability.
            </p>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-amber-500/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Full IP Transfer</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">100% client ownership of repositories, code, design assets, and environments.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-amber-500/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Clean Engineering</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Modern typed stacks, clean modular architecture, and zero unnecessary bloat.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-amber-500/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Agile Turnaround</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Guaranteed responses within 12 hours with transparent development milestones.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-amber-500/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Actionable Analytics</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Deep mastery of Excel automation and Power BI to transform messy data into clarity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Card */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => setCursor("project", "FOUNDER")}
              onMouseLeave={resetCursor}
              className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-amber-400/60 transition-all duration-300"
            >
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                    FOUNDER IDENTITY
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  VERIFIED
                </span>
              </div>

              {/* Founder Details */}
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-600 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                  <div className="w-full h-full bg-[#080a12] rounded-[14px] flex items-center justify-center">
                    <span className="font-heading font-black text-2xl text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                      AH
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold font-heading text-white">
                    {siteConfig.founder.name}
                  </h4>
                  <p className="text-sm font-medium text-amber-300 mt-0.5">
                    {siteConfig.founder.role}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 font-mono pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Location: {siteConfig.founder.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span>Response Benchmark: {siteConfig.metrics.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span>Domain: Full-Stack Web, Mobile, Data Automation</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                  {siteConfig.founder.bio}
                </p>

                {/* Founder Portfolio Showcase Preview */}
                <div className="pt-1">
                  <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 group/img">
                    <img
                      src="/projects/amit-halder-portfolio.webp"
                      alt="Amit Halder Portfolio Showcase"
                      loading="lazy"
                      className="w-full h-36 object-cover object-top opacity-85 group-hover/img:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-300">Amit Halder &bull; Portfolio Showcase</span>
                      <a
                        href="/projects/amit-halder-portfolio.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:bg-amber-500/30 transition-colors"
                      >
                        Full Preview
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Committed to transparent deliverables &amp; high engineering standards.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
