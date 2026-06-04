"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import AIPreviewPanel from "@/components/AIPreviewPanel";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

interface NoteData {
  title: string;
  date: string;
  status: string;
  tags: string[];
  content: string;
}

function ReadNotePageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { layout, setLayout } = useTheme();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [viewMode, setViewMode] = useState<"markdown" | "iframe">("markdown");

  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`layout-${slug}`);
    if (saved === "document" || saved === "one-col" || saved === "two-col-alt") {
      setLayout(saved);
    }
  }, [slug, setLayout]);

  useEffect(() => {
    if (!slug) return;
    const savedHtml = localStorage.getItem(`ai-html-${slug}`);
    if (savedHtml) setHtmlContent(savedHtml);
  }, [slug]);

  const saveLayout = (newLayout: string) => {
    setLayout(newLayout as any);
    if (slug) localStorage.setItem(`layout-${slug}`, newLayout);
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

  const handleApplyHtml = (newHtml: string) => {
    setHtmlContent(newHtml);
    localStorage.setItem(`ai-html-${slug}`, newHtml);
    setViewMode("iframe");
  };

  if (!slug) notFound();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!note) notFound();

  const tags = note.tags || [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="p-4 md:p-6 w-full">
        {/* Desktop Toolbar */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button onClick={() => setViewMode("markdown")} className={`px-4 py-2 rounded-full text-sm font-medium ${viewMode === "markdown" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border"}`}>Markdown</button>
            <button onClick={() => setViewMode("iframe")} disabled={!htmlContent} className={`px-4 py-2 rounded-full text-sm font-medium ${viewMode === "iframe" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border"} ${!htmlContent ? "opacity-50" : ""}`}>Theme View</button>
          </div>
          <div className="flex gap-2">
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <ThemeSwitcher />
            <LayoutSwitcher layout={layout} setLayout={saveLayout} disabled={viewMode === "iframe"} />
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-white shadow-sm border">Menu</button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 mb-4">
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <ThemeSwitcher />
            <LayoutSwitcher layout={layout} setLayout={saveLayout} disabled={viewMode === "iframe"} />
          </div>
        )}

        {/* Content */}
        <div className="bg-white/80 rounded-2xl border p-6 w-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{note.title || slug}</h1>
            <div className="text-sm text-gray-500 mt-1">{note.date} · {note.status}</div>
            {tags.length > 0 && <div className="flex gap-2 mt-2">{tags.map(tag => <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-xs">#{tag}</span>)}</div>}
          </div>

          {viewMode === "iframe" && htmlContent ? (
            <iframe srcDoc={htmlContent} className="w-full h-[600px] border-0" sandbox="allow-same-origin allow-scripts" />
          ) : (
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          )}
        </div>
      </div>

      <AIPreviewPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} originalContent={markdownContent} onApply={handleApplyHtml} />
    </div>
  );
}

export default function ReadNotePage() {
  return (
    <ThemeProvider>
      <ReadNotePageContent />
    </ThemeProvider>
  );
}