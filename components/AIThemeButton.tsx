"use client";

import { Sparkles } from "lucide-react";

export default function AIThemeButton({ onToggle }: { onToggle?: () => void }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer">
      <Sparkles size={12} className="text-indigo-500" />
      <span>AI Theme</span>
    </button>
  );
}