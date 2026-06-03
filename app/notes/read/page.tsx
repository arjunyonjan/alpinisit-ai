"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import TwoColumnLayout from "@/components/TwoColumnLayout";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import { useTheme } from "@/contexts/ThemeContext";

interface NoteData {
  title: string;
  date: string;
  status: string;
  tags: string[];
  content: string;
}

export default function ReadNotePage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { layout, setLayout } = useTheme();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load saved layout for this note
  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`layout-${slug}`);
    if (saved === "document" || saved === "one-col" || saved === "two-col-alt") {
      setLayout(saved);
    }
  }, [slug, setLayout]);

  // Save layout when changed
  const saveLayout = (newLayout: string) => {
    setLayout(newLayout as any);
    if (slug) {
      localStorage.setItem(`layout-${slug}`, newLayout);
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/notes/${slug}`)
      .then(res => res.json())
      .then(data => {
        setNote(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (!slug) notFound();
  if (loading) return <div className="p-10 md:p-12">Loading...</div>;
  if (!note) notFound();

  const tags = note.tags || [];
  const layoutClass = layout === "one-col" 
    ? "max-w-4xl mx-auto"
    : layout === "two-col-alt"
    ? "w-full"
    : "max-w-3xl mx-auto";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 layout-${layout}`}>
      <div className="p-10 md:p-12 md:p-12">
        {/* Desktop Toolbar */}
        <div className="hidden md:flex justify-end gap-4 mb-8 flex-wrap">
          <div className="text-xs text-slate-400 self-center mr-auto bg-slate-100 px-2 py-1 rounded-full">
            📐 {layout === "document" ? "Document" : layout === "one-col" ? "1 Column" : "2 Column Alternate"}
          </div>
          <AIThemeButton />
          <div className="theme-selector"><ThemeSwitcher /></div>
          <LayoutSwitcher layout={layout} setLayout={saveLayout} />
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <div className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            📐 {layout === "document" ? "Document" : layout === "one-col" ? "1 Column" : "2 Column Alternate"}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-white shadow-sm border border-slate-200">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 bg-white rounded-xl shadow-lg p-3 mb-8 border border-slate-200">
            <AIThemeButton />
            <div className="theme-selector"><ThemeSwitcher /></div>
            <LayoutSwitcher layout={layout} setLayout={saveLayout} />
          </div>
        )}

        {/* Content */}
        <div className={layoutClass}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 md:p-12 border border-slate-200 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">{note.title || slug}</h1>
              <div className="text-sm text-slate-500 mt-3">{note.date} · {note.status}</div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-3">
                  {tags.map((tag: string) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {layout === "two-col-alt" ? (
              <TwoColumnLayout content={note.content} />
            ) : (
              <div className="prose prose-slate max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-4 prose-ul:my-4 prose-li:my-2">
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}