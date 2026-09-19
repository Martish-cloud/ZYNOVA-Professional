import React, { useState } from "react";
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

  // Resolve work items according to the active category tab
  const workItems: WorkItem[] = (() => {
    if (activeFilter === "data") {
      // "Data & BI" tab displays ONLY Excel and Power BI
      return [{ type: "excel" }, { type: "powerbi" }];
    }

    if (activeFilter === "mobile" || activeFilter === "web") {
      // "Mobile Apps" tab displays ONLY the 12 iOS & Android mobile applications
      return mobileProjectsData.map((p) => ({ type: "project", data: p }));
    }

    if (activeFilter === "All") {
      // "All Work" includes ALL existing projects + Excel + Power BI + 12 Mobile Apps
      // Structured into balanced rows on desktop (4 cards per row, 7 rows total = 28 cards)
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
      // Append all 12 mobile applications
      mobileProjectsData.forEach((app) => {
        items.push({ type: "project", data: app });
      });
      return items;
    }

    // Individual category filters (e.g. ecommerce, business, ui-ux)
    return projectsData
      .filter((p) => p.filterCategory === activeFilter && !p.platform)
      .map((p) => ({ type: "project", data: p }));
  })();

  const activeDashboards =
    activeDashboardModal === "excel"
      ? excelDashboards
      : activeDashboardModal === "powerbi"
      ? powerBIDashboards
      : [];

  // ============================================================
  // CARD 1: EXCEL (Compact Medium Card)
  // ============================================================
  const renderExcelCard = () => (
    <div
      key="dashboard-card-excel"
      onClick={() => setActiveDashboardModal("excel")}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 via-[#0a0c16] to-[#06070d] border border-emerald-500/25 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-36 sm:h-40 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-emerald-400/40 transition-colors">
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
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-widest bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <FileSpreadsheet className="w-2.5 h-2.5 text-emerald-400" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-lg">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[9px] font-mono text-emerald-300 flex items-center gap-1 pointer-events-none">
            <Sparkles className="w-2 h-2 text-emerald-400" />
            <span>Formulas &bull; Automation</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm sm:text-base font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
              Excel
            </h3>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300/80 border border-emerald-500/20">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[10.5px] font-semibold text-emerald-400/90 font-mono mb-1 line-clamp-1">
            Advanced Dashboards &amp; Analytics
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 leading-snug line-clamp-2 mb-2.5">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and business reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Interactive Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Starting From
              </span>
              <span className="text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-emerald-200 via-teal-300 to-emerald-400 bg-clip-text">
                $18
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center bg-slate-950/70 rounded-lg p-1.5 border border-slate-800/80">
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[11.5px] font-mono font-bold text-emerald-300">$18</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Standard</span>
                <span className="text-[11.5px] font-mono font-bold text-emerald-300">$65</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Premium</span>
                <span className="text-[11.5px] font-mono font-bold text-emerald-300">$176</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-emerald-400/90 font-medium">$18 – $176</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-0.5">
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[10.5px]">View Excel Dashboards</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  // ============================================================
  // CARD 2: POWER BI (Compact Medium Card)
  // ============================================================
  const renderPowerBICard = () => (
    <div
      key="dashboard-card-powerbi"
      onClick={() => setActiveDashboardModal("powerbi")}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 via-[#0a0c16] to-[#06070d] border border-amber-500/25 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-36 sm:h-40 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
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
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-widest bg-amber-950/90 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
              <BarChart3 className="w-2.5 h-2.5 text-amber-400" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-lg">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-amber-500/30 text-[9px] font-mono text-amber-300 flex items-center gap-1 pointer-events-none">
            <TrendingUp className="w-2.5 h-2.5 text-amber-400" />
            <span>DAX &bull; Power Query &bull; KPIs</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm sm:text-base font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
              Power BI
            </h3>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300/80 border border-amber-500/20">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[10.5px] font-semibold text-amber-300/90 font-mono mb-1 line-clamp-1">
            Business Intelligence &amp; Data Viz
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 leading-snug line-clamp-2 mb-2.5">
            Interactive Power BI dashboards, KPI reporting, data modeling, DAX, Power Query and business intelligence.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Interactive Dashboards", "KPI Reporting", "DAX Modeling", "Power Query"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Starting From
              </span>
              <span className="text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                $21
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center bg-slate-950/70 rounded-lg p-1.5 border border-slate-800/80">
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[11.5px] font-mono font-bold text-amber-300">$21</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Standard</span>
                <span className="text-[11.5px] font-mono font-bold text-amber-300">$95</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-slate-900/60">
                <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Premium</span>
                <span className="text-[11.5px] font-mono font-bold text-amber-300">$279</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-amber-400/90 font-medium">$21 – $279</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-0.5">
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[10.5px]">View Power BI Dashboards</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  // ============================================================
  // CARD 3: PROJECT & MOBILE APP CARD (Compact Medium Card)
  // ============================================================
  const renderProjectCard = (project: ProjectItem, index: number) => (
    <div
      key={project.id}
      onClick={() => setSelectedProject(project)}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className={`group relative rounded-2xl bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/90 border ${
        project.platform === "iOS"
          ? "border-purple-500/25 hover:border-purple-400/60 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.25)]"
          : project.platform === "Android"
          ? "border-emerald-500/25 hover:border-emerald-400/60 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.25)]"
          : "border-slate-800/80 hover:border-amber-400/60 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)]"
      } transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden h-full`}
    >
      <div>
        {/* Visual Header Representation with Real Project / App Mockup */}
        <div className="w-full h-36 sm:h-40 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
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
          <div className="absolute top-2 left-2 z-10">
            <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-widest backdrop-blur-md shadow-sm border ${
              project.platform === "iOS"
                ? "bg-purple-950/90 text-purple-300 border-purple-500/30"
                : project.platform === "Android"
                ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/30"
                : "bg-slate-950/85 text-slate-300 border-white/10"
            }`}>
              {project.platform ? `${project.platform} App` : project.category}
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold backdrop-blur-md shadow-lg border ${
              project.platform === "iOS"
                ? "bg-black/80 text-purple-300 border-purple-400/30"
                : project.platform === "Android"
                ? "bg-black/80 text-emerald-300 border-emerald-400/30"
                : "bg-black/80 text-amber-300 border-amber-400/30"
            }`}>
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h3 className="text-sm sm:text-base font-bold font-heading text-white group-hover:text-amber-200 transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.platform && (
              <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                project.platform === "iOS"
                  ? "text-purple-300 bg-purple-950/40 border border-purple-500/20"
                  : "text-emerald-300 bg-emerald-950/40 border border-emerald-500/20"
              }`}>
                {project.platform}
              </span>
            )}
          </div>

          <p className="text-[10.5px] font-semibold text-slate-400/90 font-mono mb-1 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 leading-snug line-clamp-2 mb-2">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1 py-0.5 rounded text-[9.5px] font-mono bg-slate-800/40 text-slate-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Direct Transparent Pricing Module */}
          {project.platform ? (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="grid grid-cols-3 gap-1 text-center bg-slate-950/70 rounded-lg p-1.5 border border-slate-800/80">
                <div className="px-1 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                  <span className={`text-[11.5px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.basicPrice}
                  </span>
                </div>
                <div className="px-1 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Standard</span>
                  <span className={`text-[11.5px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.standardPrice}
                  </span>
                </div>
                <div className="px-1 py-0.5 rounded bg-slate-900/60">
                  <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Premium</span>
                  <span className="text-[11.5px] font-mono font-bold text-amber-300">
                    {project.pricing.premiumPrice}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-baseline justify-between gap-1 mb-1.5">
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Starting From
                </span>
                <span className="text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                  {project.pricing.startingPrice}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[9.5px] font-mono bg-slate-950/70 rounded-lg p-1.5 border border-slate-800/80">
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
                <div className="mt-1 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-slate-500">Custom Scope:</span>
                  <span className="text-amber-400/90 font-medium">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Line: VIEW DETAILS & VIEW DEMO */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-0.5">
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(project);
            }}
            className="font-heading uppercase tracking-wider text-[10px] font-semibold text-slate-400 group-hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View Architecture</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
          </button>

          {project.demoUrl ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
              className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-400/20 text-amber-300 border border-amber-500/30 text-[9.5px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>VIEW DETAILS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="text-[9px] font-mono text-slate-500 bg-slate-900/80 border border-slate-800/80 px-1.5 py-0.5 rounded select-none">
              DEMO COMING SOON
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, automated business tools, and executive BI dashboards."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === f.value
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Unified 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4.5 xl:gap-5 animate-in fade-in duration-300">
          {workItems.map((item, index) => {
            if (item.type === "excel") {
              return renderExcelCard();
            }
            if (item.type === "powerbi") {
              return renderPowerBICard();
            }
            return renderProjectCard(item.data, index);
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
          onClose={() => setSelectedProject(null)}
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
          onClose={() => setActiveDashboardModal(null)}
        />
      )}
    </section>
  );
};
