"use client";

import { FileText, Columns } from "lucide-react";

export type LayoutMode = "single" | "two-col";

export default function LayoutSwitcher({ layout, setLayout, disabled = false }: { layout: LayoutMode; setLayout: (layout: LayoutMode) => void; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
      <button onClick={() => !disabled && setLayout("single")} disabled={disabled} className={`px-3 py-1 rounded text-xs font-medium transition-all ${layout === "single" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-indigo-500"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <FileText size={12} className="inline mr-1" /> Single
      </button>
      <button onClick={() => !disabled && setLayout("two-col")} disabled={disabled} className={`px-3 py-1 rounded text-xs font-medium transition-all ${layout === "two-col" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-indigo-500"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <Columns size={12} className="inline mr-1" /> 2 Col
      </button>
    </div>
  );
}