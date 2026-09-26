import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  retrigger?: boolean;
  failSafeMs?: number;
}

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -30px 0px",
    retrigger = true,
    failSafeMs = 1200
  } = options;

  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // If reduced motion is preferred, immediately start as visible
  const [isInView, setIsInView] = useState<boolean>(() => prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    let isDisposed = false;

    // Fail-safe visibility timeout: guarantees text is never permanently stuck hidden without triggering layout thrashing
    let failSafeTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      if (!isDisposed) {
        setIsInView(true);
      }
    }, failSafeMs);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isDisposed) return;

        if (entry.isIntersecting) {
          if (failSafeTimer) {
            clearTimeout(failSafeTimer);
            failSafeTimer = null;
          }
          setIsInView(true);
        } else if (retrigger) {
          // When scrolled out of the trigger area, reset so it can re-trigger cleanly upon return
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      isDisposed = true;
      if (failSafeTimer) clearTimeout(failSafeTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, retrigger, failSafeMs, prefersReducedMotion]);

  return { ref, isInView: prefersReducedMotion ? true : isInView, prefersReducedMotion };
}
