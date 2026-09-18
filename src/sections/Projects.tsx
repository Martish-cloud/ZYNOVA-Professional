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

  // In All Work, don't show internal duplicates; when a specific category is active, filter accordingly
  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.filterCategory === activeFilter);

  const activeDashboards =
    activeDashboardModal === "excel"
      ? excelDashboards
      : activeDashboardModal === "powerbi"
      ? powerBIDashboards
      : [];

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, and automated business tools."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
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

        {/* ============================================================ */}
        {/* CONDITIONAL CONTENT: DATA & BI CATEGORY CARDS OR PROJECT GRID */}
        {/* ============================================================ */}
        {activeFilter === "data" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8 animate-in fade-in duration-300">
            {/* ============================================================ */}
            {/* CARD 1: EXCEL */}
            {/* ============================================================ */}
            <div
              onClick={() => setActiveDashboardModal("excel")}
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
                  src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
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
                    <span>VIEW EXCEL DASHBOARDS →</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CARD 2: POWER BI */}
            {/* ============================================================ */}
            <div
              onClick={() => setActiveDashboardModal("powerbi")}
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
                  src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
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
                    <span>VIEW POWER BI DASHBOARDS →</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Project Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setCursor("project", "VIEW")}
                onMouseLeave={resetCursor}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/90 border border-slate-800/80 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(245,158,11,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Visual Header Representation with Real Project Mockup */}
                  <div className="w-full h-56 relative overflow-hidden bg-slate-950 border-b border-slate-800/80 group-hover:border-amber-400/40 transition-colors">
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.subtitle}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Bottom gradient fade so image seamlessly transitions into card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent pointer-events-none" />

                    {/* Top-left category tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-slate-950/85 backdrop-blur-md text-slate-300 border border-white/10 shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Category Pill on top-right */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-lg">
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold font-heading text-white group-hover:text-amber-200 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                      {project.shortDesc}
                    </p>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
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
                <div className="px-6 pb-6 pt-2">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                    <span>View Project Architecture</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
