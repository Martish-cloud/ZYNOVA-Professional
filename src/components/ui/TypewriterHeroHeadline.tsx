import React, { useState, useEffect } from "react";

interface TypewriterHeroHeadlineProps {
  className?: string;
}

const LINE_1 = "BUILD. AUTOMATE.";
const LINE_2 = "SCALE WHAT'S NEXT.";

export const TypewriterHeroHeadline: React.FC<TypewriterHeroHeadlineProps> = ({ className = "" }) => {
  const [l1, setL1] = useState("");
  const [l2, setL2] = useState("");
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);
  const [phase, setPhase] = useState<
    "TYPING_L1" | "TYPING_L2" | "HOLD" | "DEL_L2" | "DEL_L1"
  >("TYPING_L1");

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setL1(LINE_1);
      setL2(LINE_2);
      setCursorLine(2);
      return;
    }

    if (typeof document !== "undefined" && document.hidden) {
      const handleVisible = () => {
        if (!document.hidden) {
          document.removeEventListener("visibilitychange", handleVisible);
          setPhase((p) => p);
        }
      };
      document.addEventListener("visibilitychange", handleVisible);
      return () => document.removeEventListener("visibilitychange", handleVisible);
    }

    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "TYPING_L1": {
        setCursorLine(1);
        if (l1.length < LINE_1.length) {
          const nextChar = LINE_1[l1.length];
          // Natural punctuation cadence: slight breath after full stops
          const delay = nextChar === "." ? 220 : 70;
          timeout = setTimeout(() => {
            setL1(LINE_1.slice(0, l1.length + 1));
          }, delay);
        } else {
          // Pause briefly at end of line 1 before starting line 2
          timeout = setTimeout(() => {
            setPhase("TYPING_L2");
          }, 360);
        }
        break;
      }

      case "TYPING_L2": {
        setCursorLine(2);
        if (l2.length < LINE_2.length) {
          const nextChar = LINE_2[l2.length];
          const delay = nextChar === "." ? 260 : 70;
          timeout = setTimeout(() => {
            setL2(LINE_2.slice(0, l2.length + 1));
          }, delay);
        } else {
          // Both lines are fully typed! Hold for reading
          timeout = setTimeout(() => {
            setPhase("HOLD");
          }, 100);
        }
        break;
      }

      case "HOLD": {
        setCursorLine(2);
        // Display the completed grand statement for 3.8 seconds
        timeout = setTimeout(() => {
          setPhase("DEL_L2");
        }, 3800);
        break;
      }

      case "DEL_L2": {
        setCursorLine(2);
        if (l2.length > 0) {
          timeout = setTimeout(() => {
            setL2(LINE_2.slice(0, l2.length - 1));
          }, 32);
        } else {
          // Pause briefly between deleting line 2 and line 1
          timeout = setTimeout(() => {
            setPhase("DEL_L1");
          }, 180);
        }
        break;
      }

      case "DEL_L1": {
        setCursorLine(1);
        if (l1.length > 0) {
          timeout = setTimeout(() => {
            setL1(LINE_1.slice(0, l1.length - 1));
          }, 32);
        } else {
          // Pause in empty state before starting next typing cycle
          timeout = setTimeout(() => {
            setPhase("TYPING_L1");
          }, 550);
        }
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [l1, l2, phase]);

  return (
    <h1
      className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08] mb-4 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[135px] md:min-h-[165px] lg:min-h-[185px] ${className}`}
      aria-label={`${LINE_1} ${LINE_2}`}
    >
      {/* Line 1: BUILD. AUTOMATE. */}
      <span className="inline-flex items-center justify-center min-h-[1.12em] text-slate-100">
        <span>{l1}</span>
        {cursorLine === 1 && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-amber-400 align-baseline animate-cursor-blink shadow-[0_0_14px_#f59e0b] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>

      {/* Line 2: SCALE WHAT'S NEXT. (Radiant Metallic Champagne Gold) */}
      <span className="inline-flex items-center justify-center min-h-[1.12em]">
        <span className="bg-gradient-to-r from-[#F4E4BC] via-[#D4AF37] to-[#E6C364] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(212,175,55,0.35)]">
          {l2}
        </span>
        {cursorLine === 2 && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-[#D4AF37] align-baseline animate-cursor-blink shadow-[0_0_16px_#f59e0b] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>
    </h1>
  );
};
