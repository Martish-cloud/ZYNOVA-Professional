import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(target: number, durationMs = 1800, shouldStart = false) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState<number>(() => (prefersReducedMotion ? target : 0));
  const startedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    if (!shouldStart) {
      // When scrolled out of view: cancel animation, reset state for next scroll entry
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      startedRef.current = false;
      setCount(0);
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Smooth ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.floor(easedProgress * target);
      setCount(nextVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [target, durationMs, shouldStart, prefersReducedMotion]);

  return prefersReducedMotion ? target : count;
}
