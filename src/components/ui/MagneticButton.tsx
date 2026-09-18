import React, { useRef } from "react";
import { useCursor } from "../../context/useCursor";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  pullStrength?: number;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  pullStrength = 0.25,
  asAnchor = false,
  href,
  target,
  rel,
  cursorLabel = "CLICK",
  onClick,
  ...rest
}) => {
  const { setCursor, resetCursor } = useCursor();
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * pullStrength;
    const deltaY = (e.clientY - centerY) * pullStrength;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transition = "none";
        buttonRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    });
  };

  const handleMouseEnter = () => {
    setCursor("button", cursorLabel);
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (buttonRef.current) {
      buttonRef.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      buttonRef.current.style.transform = "translate3d(0px, 0px, 0)";
    }
    resetCursor();
  };

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.65)] border border-amber-200/50 hover:brightness-105";
      break;
    case "gold":
      variantStyles = "bg-gradient-to-r from-[#F4E4BC] via-[#D4AF37] to-[#B89228] text-slate-950 font-bold shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] border border-[#FFF0C8]/60 hover:brightness-105";
      break;
    case "secondary":
      variantStyles = "bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-slate-700/60 hover:border-amber-400/60 backdrop-blur-md";
      break;
    case "outline":
      variantStyles = "bg-transparent text-amber-300 border border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
      break;
    case "ghost":
      variantStyles = "bg-transparent text-slate-300 hover:text-amber-200 hover:bg-amber-500/5";
      break;
  }

  const baseClasses = `inline-flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${variantStyles} ${className}`;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      {asAnchor && href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      ) : (
        <button className={baseClasses} onClick={onClick} {...rest}>
          {children}
        </button>
      )}
    </div>
  );
};
