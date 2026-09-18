import React, { useState } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import { excelDashboards, powerBIDashboards } from "../data/dashboards";
import { DashboardGalleryModal } from "../components/data/DashboardGalleryModal";
import {
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
  Sparkles,
  Database,
  TrendingUp
} from "lucide-react";

export const DataSolutions: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeModal, setActiveModal] = useState<"excel" | "powerbi" | null>(null);

  const activeDashboards =
    activeModal === "excel"
      ? excelDashboards
      : activeModal === "powerbi"
      ? powerBIDashboards
      : [];

  return (
    <section
      id="data-solutions"
      className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-amber-500/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-b from-amber-500/[0.035] via-yellow-500/[0.025] to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge="DATA & BI"
          title="Excel & Power BI"
          highlightedTitle="Solutions."
          subtitle="Transform chaotic spreadsheets and complex data pipelines into automated executive dashboards, standardized data models, and high-impact business intelligence."
          badgeVariant="gold"
          align="center"
        />

        {/* The Two Prominent Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {/* ============================================================ */}
          {/* CARD 1: EXCEL */}
          {/* ============================================================ */}
          <div
            onClick={() => setActiveModal("excel")}
            onMouseEnter={() => setCursor("project", "VIEW")}
            onMouseLeave={resetCursor}
            className="group relative flex flex-col rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a0c16] to-[#06070d] border border-amber-500/20 hover:border-amber-400/60 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
          >
            {/* Subtle glow accent inside card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/15 transition-all duration-500" />

            {/* Top Category Badge & Item Count */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>EXCEL</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {excelDashboards.length} Live Dashboards
              </span>
            </div>

            {/* Card Visual: Professional Excel Showcase Thumbnail */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-slate-800/90 bg-[#080a12] shadow-inner group-hover:border-amber-400/40 transition-colors">
              <img
                src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.png"}
                alt="Advanced Excel Dashboards & Analytics"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

              {/* Floating Tag over Visual */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/25 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Pivot Tables &bull; Formulas &bull; Automation</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  Excel
                </h3>
                <p className="text-sm font-semibold text-amber-200/90 font-mono mt-1">
                  Advanced Excel Dashboards &amp; Analytics
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  Interactive Excel dashboards, automated reports, Pivot Tables, formulas, data analysis and business reporting solutions.
                </p>
              </div>

              {/* Core Feature Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[
                  "Interactive Dashboards",
                  "Automated Reporting",
                  "Pivot Tables & Slicers",
                  "Formulas & Logic",
                  "Data Cleaning",
                  "Business Analytics"
                ].map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTA Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all">
                  <span>VIEW EXCEL DASHBOARDS</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: POWER BI */}
          {/* ============================================================ */}
          <div
            onClick={() => setActiveModal("powerbi")}
            onMouseEnter={() => setCursor("project", "VIEW")}
            onMouseLeave={resetCursor}
            className="group relative flex flex-col rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a0c16] to-[#06070d] border border-amber-500/20 hover:border-amber-400/60 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
          >
            {/* Subtle glow accent inside card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/15 transition-all duration-500" />

            {/* Top Category Badge & Item Count */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>POWER BI</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {powerBIDashboards.length} Live Dashboards
              </span>
            </div>

            {/* Card Visual: Professional Power BI Showcase Thumbnail */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-slate-800/90 bg-[#080a12] shadow-inner group-hover:border-amber-400/40 transition-colors">
              <img
                src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.png"}
                alt="Business Intelligence & Data Visualization"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

              {/* Floating Tag over Visual */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/25 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                <span>DAX Modeling &bull; Power Query &bull; KPIs</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  Power BI
                </h3>
                <p className="text-sm font-semibold text-amber-200/90 font-mono mt-1">
                  Business Intelligence &amp; Data Visualization
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  Interactive Power BI dashboards, KPI reporting, data modeling, DAX, Power Query and business intelligence solutions.
                </p>
              </div>

              {/* Core Feature Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[
                  "Interactive Dashboards",
                  "KPI Reporting",
                  "Data Modeling",
                  "Advanced DAX",
                  "Power Query ETL",
                  "Data Visualization"
                ].map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTA Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all">
                  <span>VIEW POWER BI DASHBOARDS</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Capabilities Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/80 via-[#0a0c16] to-slate-900/80 border border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                Custom Analytics Architecture for Your Enterprise
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Whether you need automated spreadsheet cleaning or an enterprise multi-source Power BI model, we deliver clean, actionable data systems.
              </p>
            </div>
          </div>

          <a
            href="#book-call"
            onMouseEnter={() => setCursor("button")}
            onMouseLeave={resetCursor}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Discuss Data Architecture</span>
          </a>
        </div>
      </div>

      {/* Interactive Gallery Lightbox Modal */}
      <DashboardGalleryModal
        category={activeModal}
        dashboards={activeDashboards}
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
};
