import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseHold?: number;
  pauseRestart?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseHold = 3400,
  pauseRestart = 500,
  className = "",
  cursorClassName = "bg-[#D4AF37] shadow-[0_0_14px_#f59e0b]"
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (isHolding) {
      timer = setTimeout(() => {
        setIsHolding(false);
        setIsDeleting(true);
      }, pauseHold);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      if (displayText.length < text.length) {
        const nextChar = text[displayText.length];
        const delay = nextChar === "." ? typingSpeed + 160 : typingSpeed;
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, delay);
      } else {
        setIsHolding(true);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, pauseRestart);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isHolding, text, typingSpeed, deletingSpeed, pauseHold, pauseRestart]);

  return (
    <span className="inline-flex items-center">
      <span className={className}>{displayText}</span>
      <span
        className={`inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] align-baseline animate-cursor-blink rounded-[1px] ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
};
