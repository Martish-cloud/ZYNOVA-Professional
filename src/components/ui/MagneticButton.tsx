import React, { useRef, useState } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * pullStrength;
    const deltaY = (e.clientY - centerY) * pullStrength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setCursor("button", cursorLabel);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
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

  const baseClasses = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${variantStyles} ${className}`;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
      }}
      className="inline-block will-change-transform"
    >
      {asAnchor && href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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
