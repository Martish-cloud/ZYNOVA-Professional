import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const activeIdRef = useRef<string>(activeId);

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

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      let matchedId: string | null = null;

      for (let i = sectionMetrics.length - 1; i >= 0; i--) {
        const item = sectionMetrics[i];
        if (item.top > 0 && scrollPosition >= item.top) {
          matchedId = item.id;
          break;
        }
      }

      if (!matchedId && sectionIds.length > 0 && window.scrollY < 200) {
        matchedId = sectionIds[0];
      }

      if (matchedId && matchedId !== activeIdRef.current) {
        activeIdRef.current = matchedId;
        setActiveId(matchedId);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", cacheMetrics, { passive: true });
    checkActiveSection();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", cacheMetrics);
    };
  }, [sectionIds, offset]);

  return activeId;
}
