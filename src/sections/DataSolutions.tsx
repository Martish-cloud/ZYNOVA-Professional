import React, { useState } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCursor } from "../context/useCursor";
import {
  FileSpreadsheet,
  BarChart3,
  Filter,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  RefreshCw
} from "lucide-react";

export const DataSolutions: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeTimeframe, setActiveTimeframe] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q4");

  // Simulated metrics based on timeframe
  const metricsData = {
    Q1: { processed: "420,000", speed: "99.4%", latency: "1.2s", accuracy: "99.98%", heightMultiplier: 0.65 },
    Q2: { processed: "680,000", speed: "99.7%", latency: "1.0s", accuracy: "99.99%", heightMultiplier: 0.78 },
    Q3: { processed: "890,000", speed: "99.8%", latency: "0.8s", accuracy: "100.0%", heightMultiplier: 0.88 },
    Q4: { processed: "1,250,000+", speed: "99.9%", latency: "0.4s", accuracy: "100.0%", heightMultiplier: 1.0 }
  };

  const currentMetric = metricsData[activeTimeframe];

  return (
    <section id="data-solutions" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="DATA &amp; BUSINESS INTELLIGENCE"
          title="Turn Business Data Into"
          highlightedTitle="Actionable Decisions."
          subtitle="Transform chaotic spreadsheets and scattered databases into automated executive dashboards, standardized cleaning pipelines, and high-impact Power BI models."
          badgeVariant="gold"
        />

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {/* Card 1: Data Cleaning & Merging */}
          <div className="p-5 sm:p-5.5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3.5 group-hover:scale-110 transition-transform">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1.5">
              Data Cleaning &amp; Merging
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Systematic elimination of duplicates, syntax sanitization, date/currency normalization, and multi-file master merging using advanced Excel Power Query.
            </p>
          </div>

          {/* Card 2: Professional Excel Dashboards */}
          <div className="p-5 sm:p-5.5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 hover:border-yellow-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-3.5 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1.5">
              Automated Excel Dashboards
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bespoke operational dashboards featuring dynamic timeline slicers, automated KPI variance indicators, scenario toggles, and one-click refresh buttons.
            </p>
          </div>

          {/* Card 3: Advanced Power BI Reporting */}
          <div className="p-5 sm:p-5.5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 hover:border-amber-400/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-3.5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1.5">
              Enterprise Power BI Models
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Production-grade Star Schema modeling, complex DAX time-intelligence formulas (YoY, MoM, moving averages), drill-through views, and scheduled cloud sync.
            </p>
          </div>
        </div>

        {/* Interactive Simulated Dashboard Demonstration */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0a0c16] border border-amber-500/20 p-5 sm:p-6 lg:p-7 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.1)] overflow-hidden">
          {/* Subtle Demonstration Disclaimer Tag */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <div>
                <h4 className="font-heading font-bold text-base text-white">
                  SIMULATED ANALYTICS ENGINE &bull; DEMO INTERFACE
                </h4>
                <p className="text-xs text-slate-400">
                  Interactive architectural demonstration of our reporting modeling &amp; dashboard systems.
                </p>
              </div>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
              {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveTimeframe(q)}
                  onMouseEnter={() => setCursor("button")}
                  onMouseLeave={resetCursor}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    activeTimeframe === q
                      ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Scorecards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[9.5px] font-mono uppercase text-slate-400">
                Automated Records Processed
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-white mt-1">
                {currentMetric.processed}
              </div>
              <span className="text-[10.5px] text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +38.4% Efficiency
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[9.5px] font-mono uppercase text-slate-400">
                Pipeline Accuracy Rate
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-white mt-1 text-amber-300">
                {currentMetric.accuracy}
              </div>
              <span className="text-[10.5px] text-slate-400 font-mono mt-0.5">
                Zero formula errors
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[9.5px] font-mono uppercase text-slate-400">
                ETL Refresh Latency
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-white mt-1 text-yellow-300">
                {currentMetric.latency}
              </div>
              <span className="text-[10.5px] text-amber-400 font-mono mt-0.5">
                Automated schedule
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[9.5px] font-mono uppercase text-slate-400">
                Data Consistency Index
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-white mt-1 text-amber-200">
                {currentMetric.speed}
              </div>
              <span className="text-[10.5px] text-slate-400 font-mono mt-0.5">
                Cleaned &amp; consolidated
              </span>
            </div>
          </div>

          {/* Simulated Interactive Bar Visualization */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <span>MONTHLY CONSOLIDATED OPERATIONAL VOLUME ({activeTimeframe})</span>
              </div>
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Live Simulated Feed
              </span>
            </div>

            {/* Custom Bar Graphics using SVG & CSS */}
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 h-32 sm:h-36 items-end pt-3 border-b border-slate-800 pb-2">
              {[45, 62, 58, 75, 82, 90, 68, 88, 94, 85, 96, 100].map((val, idx) => {
                const adjustedVal = Math.round(val * currentMetric.heightMultiplier);
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 group h-full justify-end">
                    <div
                      style={{ height: `${adjustedVal}%` }}
                      className="w-full rounded-t-md bg-gradient-to-t from-amber-600 via-yellow-500 to-amber-300 group-hover:from-amber-400 group-hover:to-yellow-200 transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    />
                    <span className="text-[8.5px] font-mono text-slate-400 group-hover:text-white transition-colors">
                      M0{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA for Data Consultations */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Need custom Excel cleaning or an enterprise Power BI model for your datasets?
            </span>
            <MagneticButton
              asAnchor
              href="#book-call"
              variant="outline"
              className="!py-2 !px-4 text-xs font-semibold"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Discuss Data Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
