import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "purple" | "emerald" | "neutral" | "gold";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  className = "",
  dot = true
}) => {
  let colorStyles = "";
  let dotColor = "";

  switch (variant) {
    case "gold":
      colorStyles = "bg-amber-500/10 text-[#F4E4BC] border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]";
      dotColor = "bg-amber-400 shadow-[0_0_6px_#f59e0b]";
      break;
    case "cyan":
      colorStyles = "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]";
      dotColor = "bg-cyan-400";
      break;
    case "purple":
      colorStyles = "bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]";
      dotColor = "bg-purple-400";
      break;
    case "emerald":
      colorStyles = "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]";
      dotColor = "bg-emerald-400";
      break;
    case "neutral":
      colorStyles = "bg-slate-800/80 text-slate-300 border-slate-700/60";
      dotColor = "bg-slate-400";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${colorStyles} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      )}
      {children}
    </span>
  );
};
