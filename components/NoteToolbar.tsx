"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher, { LayoutMode } from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import { Eye, LayoutTemplate } from "lucide-react";

interface NoteToolbarProps {
  viewMode: "markdown" | "iframe";
  setViewMode: (mode: "markdown" | "iframe") => void;
  htmlContent: string;
  onAIThemeClick: () => void;
  layout: LayoutMode;
  setLayout: (layout: LayoutMode) => void;
}

export default function NoteToolbar({
  viewMode,
  setViewMode,
  htmlContent,
  onAIThemeClick,
  layout,
  setLayout,
}: NoteToolbarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode("markdown")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "markdown"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            <Eye size={16} />
            <span>Read</span>
          </button>
          <button
            onClick={() => setViewMode("iframe")}
            disabled={!htmlContent}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "iframe"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:text-indigo-500"
            } ${!htmlContent ? "opacity-50 cursor-not-allowed" : ""}`}
            title={!htmlContent ? "Generate theme first" : ""}
          >
            <LayoutTemplate size={16} />
            <span>Theme View</span>
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <AIThemeButton onToggle={onAIThemeClick} />
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <ThemeSwitcher />
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <LayoutSwitcher layout={layout} setLayout={setLayout} disabled={viewMode === "iframe"} />
        </div>
      </div>
    </div>
  );
}