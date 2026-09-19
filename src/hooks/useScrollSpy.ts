import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const activeIdRef = useRef<string>(activeId);

  useEffect(() => {
    let ticking = false;
    let elementMap: { id: string; el: HTMLElement | null }[] = [];

    const cacheElements = () => {
      elementMap = sectionIds.map((id) => ({
        id,
        el: document.getElementById(id)
      }));
    };

    cacheElements();

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      let matchedId: string | null = null;

      for (let i = elementMap.length - 1; i >= 0; i--) {
        const item = elementMap[i];
        const element = item.el || document.getElementById(item.id);
        if (element) {
          if (!item.el) item.el = element;
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            matchedId = item.id;
            break;
          }
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
    window.addEventListener("resize", cacheElements, { passive: true });
    checkActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", cacheElements);
    };
  }, [sectionIds, offset]);

  return activeId;
}
