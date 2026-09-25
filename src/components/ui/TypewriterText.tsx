import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

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
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isInView, setIsInView] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(() => (prefersReducedMotion ? text : ""));
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);

  // Clear any active timer safely
  const clearActiveTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 1. Viewport Intersection Observer (with reset on scroll-away)
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    let isDisposed = false;

    // Fail-safe visibility timeout: guarantees text is visible if observer lags or fails
    const failSafeTimer = setTimeout(() => {
      if (!isDisposed && node) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
          setIsInView(true);
        }
      }
    }, 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isDisposed) return;
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // When user scrolls away from this section, cleanly reset so it can re-trigger
          setIsInView(false);
          clearActiveTimer();
          setDisplayText("");
          setIsDeleting(false);
          setIsHolding(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    observer.observe(node);

    return () => {
      isDisposed = true;
      clearTimeout(failSafeTimer);
      clearActiveTimer();
      observer.disconnect();
    };
  }, [prefersReducedMotion, text]);

  // 2. Typing / Deleting Loop (runs ONLY when isInView is true)
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    if (!isInView) {
      clearActiveTimer();
      return;
    }

    clearActiveTimer();

    if (isHolding) {
      timerRef.current = setTimeout(() => {
        setIsHolding(false);
        setIsDeleting(true);
      }, pauseHold);
      return clearActiveTimer;
    }

    if (!isDeleting) {
      if (displayText.length < text.length) {
        const nextChar = text[displayText.length];
        const delay = nextChar === "." ? typingSpeed + 160 : typingSpeed;
        timerRef.current = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, delay);
      } else {
        // Full text reached, enter hold phase
        setIsHolding(true);
      }
    } else {
      if (displayText.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Fully deleted, pause briefly then start typing again
        timerRef.current = setTimeout(() => {
          setIsDeleting(false);
        }, pauseRestart);
      }
    }

    return clearActiveTimer;
  }, [
    isInView,
    displayText,
    isDeleting,
    isHolding,
    text,
    typingSpeed,
    deletingSpeed,
    pauseHold,
    pauseRestart,
    prefersReducedMotion
  ]);

  return (
    <span ref={containerRef} className="inline-flex items-center">
      <span className={className}>
        {prefersReducedMotion ? text : displayText}
      </span>
      {!prefersReducedMotion && (
        <span
          className={`inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] align-baseline animate-cursor-blink rounded-[1px] ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
