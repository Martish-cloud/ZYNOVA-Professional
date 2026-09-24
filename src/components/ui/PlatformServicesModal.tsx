import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { FreelancePlatform } from "../../data/platforms";
import {
  Upwork_Icon,
  Fiverr_Icon,
  Freelancer_Icon,
  PeoplePerHour_Icon,
  Truelancer_Icon
} from "../icons/PlatformIcons";
import { X, ExternalLink } from "lucide-react";

interface PlatformServicesModalProps {
  platform: FreelancePlatform | null;
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  upwork: Upwork_Icon,
  fiverr: Fiverr_Icon,
  freelancer: Freelancer_Icon,
  peoplePerHour: PeoplePerHour_Icon,
  truelancer: Truelancer_Icon
};

export const PlatformServicesModal: React.FC<PlatformServicesModalProps> = ({
  platform,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !platform) return null;

  const IconComponent = iconMap[platform.id];
  const services = platform.services || [];

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-[#080a11] border border-slate-700/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.12)] overflow-hidden z-10 transition-all my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800/90 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner shrink-0"
              style={{ color: platform.brandColor }}
            >
              {IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" size={22} /> : null}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-white tracking-wide uppercase">
                {platform.name} Services
              </h3>
              <p className="text-[10.5px] sm:text-xs text-slate-400 font-mono">
                Select a service to view on {platform.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Services List Content */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-2">
          {services.map((service, index) => (
            <a
              key={`${service.number}-${index}-${service.title}`}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/item flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs font-bold text-amber-400/90 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 shrink-0">
                  {service.number}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover/item:text-amber-200 transition-colors truncate">
                  {service.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover/item:text-amber-300 ml-2">
                <span className="text-[10.5px] font-mono font-medium hidden sm:inline">Open</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer: View Full Profile */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800/90 bg-slate-950/70 shrink-0">
          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/40 text-slate-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer group/prof"
          >
            <span>View {platform.name} Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/prof:text-amber-300" />
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
