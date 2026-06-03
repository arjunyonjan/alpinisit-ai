"use client";

import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function AIThemeButton() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("aiThemeActive");
    if (stored === "true") setIsActive(true);
  }, []);

  const toggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    sessionStorage.setItem("aiThemeActive", String(newState));
    document.documentElement.classList.toggle("ai-theme-active", newState);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg ring-2 ring-purple-300 animate-pulse"
          : "bg-white/80 text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Sparkles size={16} />
      AI Theme
    </button>
  );
}