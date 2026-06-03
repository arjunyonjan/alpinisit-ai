import { useEffect } from "react";
import { LayoutMode } from "@/contexts/ThemeContext";

export function useNoteLayout(slug: string | null, layout: LayoutMode, setLayout: (mode: LayoutMode) => void) {
  // Load saved layout for this note
  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`layout-${slug}`) as LayoutMode;
    if (saved === "document" || saved === "one-col" || saved === "two-col-alt") {
      setLayout(saved);
    }
  }, [slug, setLayout]);

  // Save layout when it changes
  const saveLayout = (newLayout: LayoutMode) => {
    setLayout(newLayout);
    if (slug) {
      localStorage.setItem(`layout-${slug}`, newLayout);
    }
  };

  return { saveLayout };
}