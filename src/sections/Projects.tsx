import React, { useState } from "react";
import { projectsData } from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProjectModal } from "./ProjectModal";
import { useCursor } from "../context/useCursor";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  onDiscussProject?: (brief: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onDiscussProject }) => {
  const { setCursor, resetCursor } = useCursor();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filters = [
    { label: "All Work", value: "All" },
    { label: "E-commerce", value: "ecommerce" },
    { label: "Web Apps", value: "web" },
    { label: "Business Portals", value: "business" },
    { label: "Data & BI", value: "data" },
    { label: "UI / UX", value: "ui-ux" }
  ];

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter((p) => {
        if (activeFilter === "data") {
          return p.filterCategory === "data" || p.id === "bizgrow" || p.id === "fitlife";
        }
        return p.filterCategory === activeFilter;
      });

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

        {/* Project Cards Grid */}
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
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={(brief) => {
          if (onDiscussProject) onDiscussProject(brief);
        }}
      />
    </section>
  );
};
