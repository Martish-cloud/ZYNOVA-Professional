import React, { useState } from "react";
import { projectsData } from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { excelDashboards, powerBIDashboards } from "../data/dashboards";
import { DashboardGalleryModal } from "../components/data/DashboardGalleryModal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProjectModal } from "./ProjectModal";
import { useCursor } from "../context/useCursor";
import {
  ArrowUpRight,
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
    { label: "E-commerce", value: "ecommerce" },
    { label: "Web Apps", value: "web" },
    { label: "Business Portals", value: "business" },
    { label: "Data & BI", value: "data" },
    { label: "UI / UX", value: "ui-ux" }
  ];

  // Resolve work items according to the active category tab
  const workItems: WorkItem[] = (() => {
    if (activeFilter === "data") {
      // "Data & BI" tab displays ONLY Excel and Power BI
      return [{ type: "excel" }, { type: "powerbi" }];
    }

    if (activeFilter === "All") {
      // "All Work" includes ALL projects + Excel + Power BI unified naturally
      // Insert Excel & Power BI at index 4 and 5 (Row 2, items 1 and 2 in a 4-col grid)
      const items: WorkItem[] = [];
      projectsData.forEach((project, index) => {
        if (index === 4) {
          items.push({ type: "excel" });
          items.push({ type: "powerbi" });
        }
        items.push({ type: "project", data: project });
      });
      if (projectsData.length < 4) {
        items.push({ type: "excel" });
        items.push({ type: "powerbi" });
      }
      return items;
    }

    // Individual category filters
    return projectsData
      .filter((p) => p.filterCategory === activeFilter)
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
        <div className="w-full h-44 sm:h-48 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-emerald-400/40 transition-colors">
          <img
            src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
            alt="Advanced Excel Dashboards & Analytics"
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-lg">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1 pointer-events-none">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            <span>Formulas &bull; Automation</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
              Excel
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300/80 border border-emerald-500/20">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[11px] font-semibold text-emerald-400/90 font-mono mb-1.5 line-clamp-1">
            Advanced Dashboards &amp; Analytics
          </p>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and business reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2">
            {["Interactive Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[11px]">View Excel Dashboards</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
        <div className="w-full h-44 sm:h-48 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
          <img
            src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
            alt="Business Intelligence & Data Visualization"
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-amber-950/90 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
              <BarChart3 className="w-3 h-3 text-amber-400" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-lg">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1 pointer-events-none">
            <TrendingUp className="w-2.5 h-2.5 text-amber-400" />
            <span>DAX &bull; Power Query &bull; KPIs</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
              Power BI
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300/80 border border-amber-500/20">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[11px] font-semibold text-amber-300/90 font-mono mb-1.5 line-clamp-1">
            Business Intelligence &amp; Data Viz
          </p>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
            Interactive Power BI dashboards, KPI reporting, data modeling, DAX, Power Query and business intelligence.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2">
            {["Interactive Dashboards", "KPI Reporting", "DAX Modeling", "Power Query"].map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[11px]">View Power BI Dashboards</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  // ============================================================
  // CARD 3: REGULAR PROJECT (Compact Medium Card)
  // ============================================================
  const renderProjectCard = (project: ProjectItem) => (
    <div
      key={project.id}
      onClick={() => setSelectedProject(project)}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/90 border border-slate-800/80 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      <div>
        {/* Visual Header Representation with Real Project Mockup */}
        <div className="w-full h-44 sm:h-48 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
          <img
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Bottom gradient fade so image seamlessly transitions into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-slate-950/85 backdrop-blur-md text-slate-300 border border-white/10 shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-lg">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-amber-200 transition-colors mb-1.5 line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800/40 text-slate-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[11px]">View Architecture</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 bg-transparent">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, automated business tools, and executive BI dashboards."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-14">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 animate-in fade-in duration-300">
          {workItems.map((item) => {
            if (item.type === "excel") {
              return renderExcelCard();
            }
            if (item.type === "powerbi") {
              return renderPowerBICard();
            }
            return renderProjectCard(item.data);
          })}
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
