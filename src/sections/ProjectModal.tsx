import React from "react";
import type { ProjectItem } from "../data/projects";
import { Modal } from "../components/ui/Modal";
import { MagneticButton } from "../components/ui/MagneticButton";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Layers, ExternalLink } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onDiscussProject
}) => {
  if (!project) return null;

  const handleDiscuss = () => {
    onDiscussProject(`Inquiry regarding project architecture similar to: ${project.title}`);
    onClose();
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Subtitle & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
          <span className="text-slate-300 font-medium">{project.subtitle}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
              {project.badge}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Visual Showcase with Real Project Mockup */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#07080f] border border-slate-700/80 shadow-2xl group">
          <PortfolioImage
            src={project.image}
            alt={project.title}
            isPriority={true}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            width={1200}
            height={750}
            className={`w-full h-full ${
              project.platform ? "object-contain bg-[#07080f]" : "object-cover object-top"
            } transition-transform duration-700 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

          {/* Floating badge & External full preview button */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-lg border border-amber-500/20 shadow-lg">
              <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest block mb-0.5">
                {project.platform ? `${project.platform} Application • ${project.title}` : `${project.category} • ${project.badge}`}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                {project.title}
              </h3>
            </div>

            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-black/80 hover:bg-amber-500/20 text-xs font-mono text-amber-300 border border-amber-500/40 backdrop-blur-md inline-flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Full View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transparent Indicative Pricing & Tiers */}
        {project.pricing && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/25 via-slate-900/80 to-amber-950/15 border border-amber-500/25">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold block">
                  {project.platform ? `${project.platform} Application Pricing` : "Project Pricing & Development Scope"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 font-mono">Starting from:</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text">
                    {project.pricing.startingPrice}
                  </span>
                </div>
              </div>

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <span>OPEN WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-500 select-none">
                  DEMO COMING SOON
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {project.pricing.basicPrice && (
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block uppercase">Basic Tier</span>
                  <span className="font-bold text-slate-200">{project.pricing.basicPrice}</span>
                </div>
              )}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block uppercase">Standard Tier</span>
                <span className="font-bold text-slate-200">{project.pricing.standardPrice}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-amber-400/90 block uppercase">Premium Tier</span>
                <span className="font-bold text-amber-300">{project.pricing.premiumPrice}</span>
              </div>
              {project.pricing.customPrice && (
                <div className="col-span-2 sm:col-span-3 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10.5px] text-slate-400 uppercase">Custom Architecture &amp; Scale</span>
                  <span className="font-bold text-amber-400">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] font-mono text-slate-500 mt-2.5 leading-tight">
              *{project.pricing.pricingQualification || "Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements."}
            </p>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            Project Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              The Business Challenge
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              Engineered Solution
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Key Functional Highlights</span>
          </h4>
          <ul className="space-y-2">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_4px_#f59e0b]" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            <span>Technologies Employed</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fully customizable codebase with complete IP transfer</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            {project.demoUrl ? (
              <MagneticButton
                asAnchor
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold font-mono !rounded-xl"
                cursorLabel="VISIT"
              >
                <span>OPEN WEBSITE</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </MagneticButton>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed opacity-75 inline-flex items-center justify-center gap-2"
              >
                <span>DEMO COMING SOON</span>
              </button>
            )}

            <MagneticButton
              variant="outline"
              onClick={handleDiscuss}
              className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold !rounded-xl border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
