"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import TwoColumnLayout from "@/components/TwoColumnLayout";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import AIPreviewPanel from "@/components/AIPreviewPanel";
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
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [isHtmlContent, setIsHtmlContent] = useState(false);
  const [viewMode, setViewMode] = useState<"markdown" | "html">("markdown");

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
        setNoteContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (!slug) notFound();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!note) notFound();

  const tags = note.tags || [];
  const layoutClass = layout === "one-col" 
    ? "max-w-5xl mx-auto"
    : layout === "two-col-alt"
    ? "w-full"
    : "max-w-4xl mx-auto";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 layout-${layout}`}>
      <div className="p-6 md:p-8">
        {/* Desktop Toolbar */}
        <div className="hidden md:flex justify-end gap-2 mb-6 flex-wrap">
          <div className="text-xs text-slate-400 self-center mr-auto bg-slate-100 px-2 py-1 rounded-full">
            📐 {layout === "document" ? "Document" : layout === "one-col" ? "1 Column" : "2 Column Alternate"}
          </div>
          <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
          <div className="theme-selector"><ThemeSwitcher /></div>
          <LayoutSwitcher layout={layout} setLayout={saveLayout} />
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <div className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            📐 {layout === "document" ? "Document" : layout === "one-col" ? "1 Column" : "2 Column Alternate"}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-white shadow-sm border border-slate-200">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 mb-4 border border-slate-200">
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <div className="theme-selector"><ThemeSwitcher /></div>
            <LayoutSwitcher layout={layout} setLayout={saveLayout} />
          </div>
        )}

        {/* Content */}
        <div className={layoutClass}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">{note.title || slug}</h1>
              <div className="text-sm text-slate-500 mt-2">{note.date} · {note.status}</div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag: string) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {layout === "two-col-alt" ? (
              <TwoColumnLayout content={noteContent} />
            ) : (
              <div className="note-content prose prose-slate max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:pb-2 prose-headings:border-b prose-headings:border-slate-200 prose-h1:mt-0 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-ul:my-4 prose-li:my-2">            {isHtmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: noteContent }} />
            ) : (
              <ReactMarkdown>{noteContent}</ReactMarkdown>
            )}</div>
            )}
          </div>
        </div>
      </div>

      <AIPreviewPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        originalContent={noteContent}
        onApply={(newContent) => setNoteContent(newContent)}
      />
    </div>
  );
}
