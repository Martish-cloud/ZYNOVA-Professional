import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const activeIdRef = useRef<string>(activeId);
  const isScrolledRef = useRef<boolean>(false);

  useEffect(() => {
    let ticking = false;
    let sectionMetrics: { id: string; top: number }[] = [];

    const cacheMetrics = () => {
      sectionMetrics = sectionIds.map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.offsetTop : 0
        };
      });
    };

    cacheMetrics();
    const timer = setTimeout(cacheMetrics, 600);

    const checkState = () => {
      const currentScrollY = window.scrollY;

      // 1. Unified header scroll state check (threshold: 25px)
      const nextScrolled = currentScrollY > 25;
      if (isScrolledRef.current !== nextScrolled) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      // 2. Active section detection
      if (sectionIds.length > 0) {
        const scrollPosition = currentScrollY + offset;
        let matchedId: string | null = null;

        for (let i = sectionMetrics.length - 1; i >= 0; i--) {
          const item = sectionMetrics[i];
          if (item.top > 0 && scrollPosition >= item.top) {
            matchedId = item.id;
            break;
          }
        }

        if (!matchedId && currentScrollY < 200) {
          matchedId = sectionIds[0];
        }

        if (matchedId && matchedId !== activeIdRef.current) {
          activeIdRef.current = matchedId;
          setActiveId(matchedId);
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", cacheMetrics, { passive: true });
    checkState();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", cacheMetrics);
    };
  }, [sectionIds, offset]);

  return { activeSection: activeId, isScrolled, activeId };
}
