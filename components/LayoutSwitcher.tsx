"use client";

import { FileText, Columns, LayoutGrid } from "lucide-react";

export type LayoutMode = "document" | "one-col" | "two-col-alt";

interface LayoutSwitcherProps {
  layout: LayoutMode;
  setLayout: (layout: LayoutMode) => void;
}

export default function LayoutSwitcher({ layout, setLayout }: LayoutSwitcherProps) {
  const buttons = [
    { id: "document" as const, icon: FileText, label: "Document" },
    { id: "one-col" as const, icon: LayoutGrid, label: "1 Column" },
    { id: "two-col-alt" as const, icon: Columns, label: "2 Column Alternate" },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
      {buttons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setLayout(id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
            layout === id
              ? "bg-indigo-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title={label}
        >
          <Icon size={14} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}