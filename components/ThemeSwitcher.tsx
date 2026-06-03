"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Sparkles } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
      <button
        onClick={() => setTheme("next")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          theme === "next"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Sun size={16} />
        Next.js
      </button>
      <button
        onClick={() => setTheme("gemini")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          theme === "gemini"
            ? "bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Sparkles size={16} />
        Gemini
      </button>
    </div>
  );
}