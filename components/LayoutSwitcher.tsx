"use client";

import { FileText, Columns } from "lucide-react";

export type LayoutMode = "document" | "two-col-alt";

export default function LayoutSwitcher({ layout, setLayout, disabled = false }: { layout: LayoutMode; setLayout: (layout: LayoutMode) => void; disabled?: boolean }) {
  const buttons = [
    { id: "document" as const, icon: FileText, label: "Single" },
    { id: "two-col-alt" as const, icon: Columns, label: "2 Col" },
  ];
  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
      {buttons.map(({ id, icon: Icon, label }) => (
        <button key={id} onClick={() => !disabled && setLayout(id)} disabled={disabled} className={`px-2.5 py-1.5 rounded-full text-xs transition-all ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${layout === id ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`} title={label}><Icon size={12} /><span className="ml-1 hidden sm:inline">{label}</span></button>
      ))}
    </div>
  );
}