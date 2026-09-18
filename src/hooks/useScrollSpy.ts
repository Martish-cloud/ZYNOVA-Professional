import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const activeIdRef = useRef<string>(activeId);

  useEffect(() => {
    let ticking = false;

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      let matchedId: string | null = null;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            matchedId = id;
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
    checkActiveSection();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
