"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import AIPreviewPanel from "@/components/AIPreviewPanel";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Eye, LayoutTemplate } from "lucide-react";

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
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [viewMode, setViewMode] = useState<"markdown" | "iframe">("markdown");

  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`layout-${slug}`);
    if (saved === "document" || saved === "one-col" || saved === "two-col-alt") setLayout(saved);
  }, [slug, setLayout]);

  useEffect(() => {
    if (!slug) return;
    const savedHtml = localStorage.getItem(`ai-html-${slug}`);
    if (savedHtml) setHtmlContent(savedHtml);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setHtmlContent("");
    setViewMode("markdown");
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
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button onClick={() => setViewMode("markdown")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "markdown" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-indigo-500"}`}><Eye size={16} /><span>Read</span></button>
              <button onClick={() => setViewMode("iframe")}  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "iframe" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-indigo-500"} `} title={!htmlContent ? "No theme generated yet. Click AI Theme button to create one." : ""}><LayoutTemplate size={16} /><span>Theme View</span></button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <ThemeSwitcher />
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <LayoutSwitcher layout={layout} setLayout={saveLayout} disabled={viewMode === "iframe"} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900">{note.title || slug}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span>{note.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{note.status}</span>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">#{tag}</span>)}
              </div>
            )}
          </div>
          <div className="p-6">
            {viewMode === "iframe" ? (htmlContent ? (<iframe srcDoc={htmlContent} className="w-full min-h-[600px] border-0 rounded-lg" sandbox="allow-same-origin allow-scripts" />) : (<div className="flex flex-col items-center justify-center py-16 text-center"><div className="text-6xl mb-4">✨</div><h3 className="text-xl font-semibold text-gray-700 mb-2">No Theme Generated</h3><p className="text-gray-500">Click the <strong>AI Theme</strong> button to generate a beautiful HTML version.</p></div>)) : (<div className="prose prose-slate max-w-none"><ReactMarkdown>{markdownContent}</ReactMarkdown></div>)}
          </div>
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