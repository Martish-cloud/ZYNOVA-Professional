import React, { useState, useMemo, useCallback } from "react";
import { projectsData, mobileProjectsData } from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { excelDashboards, powerBIDashboards } from "../data/dashboards";
import { DashboardGalleryModal } from "../components/data/DashboardGalleryModal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProjectModal } from "./ProjectModal";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { useCursor } from "../context/useCursor";
import {
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react";

interface ProjectsProps {
  onDiscussProject?: (brief: string) => void;
}

type WorkItem =
  | { type: "project"; data: ProjectItem }
  | { type: "excel" }
  | { type: "powerbi" };

// ============================================================
// CARD 1: EXCEL (Compact Medium Card) - Memoized
// ============================================================
const ExcelCard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className="group relative rounded-xl bg-gradient-to-b from-slate-900/80 via-[#0a0c16] to-[#06070d] border border-emerald-500/25 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-emerald-400/40 transition-colors">
          <PortfolioImage
            src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
            alt="Advanced Excel Dashboards & Analytics"
            isPriority={true}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            fallbackTitle="Excel Solutions"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest bg-emerald-950/95 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <FileSpreadsheet className="w-2 h-2 text-emerald-400" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold bg-black/90 text-emerald-300 border border-emerald-500/30 shadow-lg">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-black/90 border border-emerald-500/30 text-[7.5px] sm:text-[8px] font-mono text-emerald-300 flex items-center gap-1 pointer-events-none">
            <Sparkles className="w-2 h-2 text-emerald-400" />
            <span>Formulas &bull; Auto</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-white group-hover:text-emerald-300 transition-colors truncate">
              Excel
            </h3>
            <span className="text-[7.5px] sm:text-[8px] font-mono px-1 py-0.5 rounded bg-emerald-950/40 text-emerald-300/80 border border-emerald-500/20 shrink-0">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-emerald-400/90 font-mono mb-0.5 truncate">
            Dashboards &amp; Analytics
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-400 leading-snug line-clamp-2 mb-1.5">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {["Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-1.5 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Starting From
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-emerald-200 via-teal-300 to-emerald-400 bg-clip-text">
                $18
              </span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-950/70 rounded-md p-1 border border-slate-800/80">
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-300">$18</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-300">$65</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-300">$176</span>
              </div>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-emerald-400/90 font-medium">$18 – $176</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px]">View Dashboards</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});
ExcelCard.displayName = "ExcelCard";

// ============================================================
// CARD 2: POWER BI (Compact Medium Card) - Memoized
// ============================================================
const PowerBICard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className="group relative rounded-xl bg-gradient-to-b from-slate-900/80 via-[#0a0c16] to-[#06070d] border border-amber-500/25 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
            alt="Business Intelligence & Data Visualization"
            isPriority={true}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            fallbackTitle="Power BI Intelligence"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest bg-amber-950/95 text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
              <BarChart3 className="w-2 h-2 text-amber-400" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold bg-black/90 text-amber-300 border border-amber-500/30 shadow-lg">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-black/90 border border-amber-500/30 text-[7.5px] sm:text-[8px] font-mono text-amber-300 flex items-center gap-1 pointer-events-none">
            <TrendingUp className="w-2 h-2 text-amber-400" />
            <span>DAX &bull; BI Models</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-white group-hover:text-amber-300 transition-colors truncate">
              Power BI
            </h3>
            <span className="text-[7.5px] sm:text-[8px] font-mono px-1 py-0.5 rounded bg-amber-950/40 text-amber-300/80 border border-amber-500/20 shrink-0">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-amber-400/90 font-mono mb-0.5 truncate">
            Enterprise BI Dashboards
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-400 leading-snug line-clamp-2 mb-1.5">
            Interactive executive business intelligence dashboards, DAX metrics, data modeling, automated ETL &amp; KPIs.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {["Power BI", "DAX", "Data Modeling", "ETL Pipelines"].map((chip) => (
              <span
                key={chip}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-1.5 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Starting From
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                $21
              </span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-950/70 rounded-md p-1 border border-slate-800/80">
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">$21</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">$95</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">$279</span>
              </div>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-amber-400/90 font-medium">$21 – $279</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px]">View Dashboards</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});
PowerBICard.displayName = "PowerBICard";

// ============================================================
// CARD 3: PROJECT & MOBILE APP CARD - Memoized
// ============================================================
const ProjectCard = React.memo<{
  project: ProjectItem;
  index: number;
  onSelect: (p: ProjectItem) => void;
}>(({ project, index, onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={() => {
        resetCursor();
        onSelect(project);
      }}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className={`group relative rounded-xl bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/90 border ${
        project.platform === "iOS"
          ? "border-purple-500/25 hover:border-purple-400/60 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.25)]"
          : project.platform === "Android"
          ? "border-emerald-500/25 hover:border-emerald-400/60 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.25)]"
          : "border-slate-800/80 hover:border-amber-400/60 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.25)]"
      } transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden h-full`}
    >
      <div>
        {/* Visual Header Representation with Real Project / App Mockup */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            isPriority={index < 4}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Bottom gradient fade so image seamlessly transitions into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className={`px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest shadow-sm border ${
                project.platform === "iOS"
                  ? "bg-purple-950/95 text-purple-300 border-purple-500/30"
                  : project.platform === "Android"
                  ? "bg-emerald-950/95 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-950/90 text-slate-300 border-white/10"
              }`}
            >
              {project.platform ? `${project.platform} App` : project.category}
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold shadow-lg border ${
                project.platform === "iOS"
                  ? "bg-black/90 text-purple-300 border-purple-400/30"
                  : project.platform === "Android"
                  ? "bg-black/90 text-emerald-300 border-emerald-400/30"
                  : "bg-black/90 text-amber-300 border-amber-400/30"
              }`}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-white group-hover:text-amber-200 transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.platform && (
              <span
                className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0 ${
                  project.platform === "iOS"
                    ? "text-purple-300 bg-purple-950/40 border border-purple-500/20"
                    : "text-emerald-300 bg-emerald-950/40 border border-emerald-500/20"
                }`}
              >
                {project.platform}
              </span>
            )}
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-slate-400/90 font-mono mb-0.5 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-400 leading-snug line-clamp-2 mb-1.5">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-800/40 text-slate-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Direct Transparent Pricing Module */}
          {project.platform ? (
            <div className="pt-1.5 border-t border-slate-800/80">
              <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-950/70 rounded-md p-1 border border-slate-800/80">
                <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.basicPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.standardPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">
                    {project.pricing.premiumPrice}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-1.5 border-t border-slate-800/80">
              <div className="flex items-baseline justify-between gap-1 mb-1">
                <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Starting From
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                  {project.pricing.startingPrice}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-0.5 text-[8.5px] sm:text-[9px] font-mono bg-slate-950/70 rounded-md p-1 border border-slate-800/80">
                <div className="truncate">
                  <span className="text-slate-500">Std: </span>
                  <span className="text-slate-300 font-medium">{project.pricing.standardPrice}</span>
                </div>
                <div className="truncate text-right">
                  <span className="text-slate-500">Prem: </span>
                  <span className="text-amber-300/90 font-medium">{project.pricing.premiumPrice}</span>
                </div>
              </div>
              {project.pricing.customPrice && (
                <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
                  <span className="text-slate-500">Custom Scope:</span>
                  <span className="text-amber-400/90 font-medium">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Line: VIEW ARCHITECTURE & VIEW DETAILS */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between gap-1 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px] font-semibold text-slate-400 group-hover:text-amber-300 transition-colors flex items-center gap-0.5 cursor-pointer truncate"
          >
            <span>Architecture</span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-500 group-hover:text-amber-300 shrink-0" />
          </button>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-1.5 py-0.5 rounded bg-amber-500/10 hover:bg-amber-400/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-400/50 text-[8px] sm:text-[9px] font-mono font-bold flex items-center gap-0.5 transition-all cursor-pointer shrink-0"
            >
              <span>VISIT WEBSITE</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="text-[7.5px] sm:text-[8px] font-mono text-slate-500 bg-slate-900/80 border border-slate-800/80 px-1 py-0.5 rounded select-none shrink-0">
              COMING SOON
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

export const Projects: React.FC<ProjectsProps> = ({ onDiscussProject }) => {
  const { setCursor, resetCursor } = useCursor();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDashboardModal, setActiveDashboardModal] = useState<"excel" | "powerbi" | null>(null);

  const filters = [
    { label: "All Work", value: "All" },
    { label: "Mobile Apps", value: "mobile" },
    { label: "E-commerce", value: "ecommerce" },
    { label: "Business Portals", value: "business" },
    { label: "Data & BI", value: "data" }
  ];

  // Resolve work items according to the active category tab (memoized)
  const workItems: WorkItem[] = useMemo(() => {
    if (activeFilter === "data") {
      return [{ type: "excel" }, { type: "powerbi" }];
    }

    if (activeFilter === "mobile" || activeFilter === "web") {
      return mobileProjectsData.map((p) => ({ type: "project", data: p }));
    }

    if (activeFilter === "All") {
      const items: WorkItem[] = [];
      const baseProjects = projectsData.filter((p) => !p.platform);
      baseProjects.forEach((project, index) => {
        if (index === 4) {
          items.push({ type: "excel" });
          items.push({ type: "powerbi" });
        }
        items.push({ type: "project", data: project });
      });
      if (baseProjects.length < 4) {
        items.push({ type: "excel" });
        items.push({ type: "powerbi" });
      }
      mobileProjectsData.forEach((app) => {
        items.push({ type: "project", data: app });
      });
      return items;
    }

    return projectsData
      .filter((p) => p.filterCategory === activeFilter && !p.platform)
      .map((p) => ({ type: "project", data: p }));
  }, [activeFilter]);

  const activeDashboards = useMemo(() => {
    return activeDashboardModal === "excel"
      ? excelDashboards
      : activeDashboardModal === "powerbi"
      ? powerBIDashboards
      : [];
  }, [activeDashboardModal]);

  const handleSelectExcel = useCallback(() => {
    setActiveDashboardModal("excel");
  }, []);

  const handleSelectPowerBI = useCallback(() => {
    setActiveDashboardModal("powerbi");
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleCloseDashboardModal = useCallback(() => {
    setActiveDashboardModal(null);
  }, []);

  return (
    <section id="projects" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, automated business tools, and executive BI dashboards."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === f.value
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Unified 5-Column Desktop, 3-Column Tablet, 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 animate-in fade-in duration-300">
          {workItems.map((item, index) => {
            if (item.type === "excel") {
              return <ExcelCard key="dashboard-card-excel" onSelect={handleSelectExcel} />;
            }
            if (item.type === "powerbi") {
              return <PowerBICard key="dashboard-card-powerbi" onSelect={handleSelectPowerBI} />;
            }
            return (
              <ProjectCard
                key={item.data.id}
                project={item.data}
                index={index}
                onSelect={handleSelectProject}
              />
            );
          })}
        </div>

        {/* Subtle Pricing Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] sm:text-xs font-mono text-slate-400/80 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
            <span>Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements.</span>
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseProjectModal}
          onDiscussProject={(brief) => {
            if (onDiscussProject) onDiscussProject(brief);
          }}
        />
      )}

      {/* Interactive Dashboard Gallery Modal (Excel & Power BI) */}
      {activeDashboardModal && (
        <DashboardGalleryModal
          category={activeDashboardModal}
          dashboards={activeDashboards}
          isOpen={activeDashboardModal !== null}
          onClose={handleCloseDashboardModal}
        />
      )}
    </section>
  );
};
