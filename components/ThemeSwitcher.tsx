"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Sparkles, Monitor, Globe } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
      <button onClick={() => setTheme("normal")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${theme === "normal" ? "bg-gray-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}><Globe size={12} />Normal</button>
      <button onClick={() => setTheme("next")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${theme === "next" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}><Sun size={12} />Next</button>
      <button onClick={() => setTheme("gemini")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${theme === "gemini" ? "bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}><Sparkles size={12} />Gemini</button>
      <button onClick={() => setTheme("system")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${theme === "system" ? "bg-gray-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}><Monitor size={12} />System</button>
    </div>
  );
}