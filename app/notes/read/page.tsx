"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [viewMode, setViewMode] = useState<"markdown">("markdown");

  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`layout-${slug}`);
    if (saved === "document" || saved === "one-col" || saved === "two-col-alt") {
      setLayout(saved);
    }
  }, [slug, setLayout]);

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
        setMarkdownContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (!slug) notFound();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!note) notFound();

  const tags = note.tags || [];

  // Split content for two-column layout
  const paragraphs = markdownContent.split(/\n\s*\n/);
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftContent = paragraphs.slice(0, midPoint).join("\n\n");
  const rightContent = paragraphs.slice(midPoint).join("\n\n");

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 layout-${layout}`}>
      <div className="p-4 md:p-6 w-full">
        {/* Desktop Toolbar */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("markdown")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === "markdown"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              📝 Markdown
            </button>
            
          </div>
          <div className="flex gap-2">
            
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <div className="theme-selector"><ThemeSwitcher /></div>
            <LayoutSwitcher layout={layout} setLayout={saveLayout} />
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          
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

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 w-full">
          {/* Title and metadata */}
          <div className="px-6 py-4 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800">{note.title || slug}</h1>
            <div className="text-sm text-slate-500 mt-1">{note.date} · {note.status}</div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag: string) => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Markdown View */}
          {viewMode === "markdown" && layout !== "two-col-alt" && (
            <div className="note-content prose prose-slate max-w-none px-6 py-4">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          )}

          {/* Two Column Markdown View */}
          {viewMode === "markdown" && layout === "two-col-alt" && (
            <div className="grid md:grid-cols-2 gap-6 px-6 py-4">
              <div className="note-content prose prose-slate max-w-none">
                <ReactMarkdown>{leftContent}</ReactMarkdown>
              </div>
              <div className="note-content prose prose-slate max-w-none">
                <ReactMarkdown>{rightContent}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* HTML Preview View */}\n\n        </div>
      </div>

      <AIPreviewPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        originalContent={markdownContent}
        onApply={(newContent) => setHtmlContent(newContent)}
        currentLayout={layout}
      />
    </div>
  );
}