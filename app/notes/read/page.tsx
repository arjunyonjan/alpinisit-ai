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
    const savedHtml = localStorage.getItem(`ai-html-${slug}`);
    if (savedHtml) { setHtmlContent(savedHtml); setViewMode("iframe"); }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setHtmlContent("");
    setViewMode("markdown");
  }, [slug]);

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

  // Split content for two-column layout
  const sections = markdownContent.split(/(?=^## )/m);
  const leftSections: string[] = [];
  const rightSections: string[] = [];
  sections.forEach((section, idx) => {
    if (idx % 2 === 0) leftSections.push(section);
    else rightSections.push(section);
  });
  const leftCol = leftSections.join("");
  const rightCol = rightSections.join("");

  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button onClick={() => setViewMode("markdown")} className={`px-3 py-1.5 text-sm rounded-md ${viewMode === "markdown" ? "bg-black text-white" : "bg-gray-100"}`}>Read</button>
            <button onClick={() => setViewMode("iframe")} className={`px-3 py-1.5 text-sm rounded-md ${viewMode === "iframe" ? "bg-black text-white" : "bg-gray-100"}`}>Theme</button>
          </div>
          <div className="flex items-center gap-2">
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <ThemeSwitcher />
            <LayoutSwitcher layout={layout} setLayout={setLayout} disabled={viewMode === "iframe"} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">{note.title || slug}</h1>
        <div className="text-sm text-gray-500 mb-4">{note.date} · {note.status}</div>
        {tags.length > 0 && <div className="flex gap-2 mb-8">{tags.map(tag => <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-sm">#{tag}</span>)}</div>}

        {viewMode === "iframe" ? (
          htmlContent ? (
            <iframe srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{margin:0;padding:20px;background:white;}</style></head><body><div class="w-full">${htmlContent}</div></body></html>`} className="w-full min-h-[70vh] border-0" />
          ) : (
            <div className="text-center py-20 text-gray-500">Click AI Theme to generate</div>
          )
        ) : layout === "two-col-alt" ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="prose max-w-none"><ReactMarkdown>{leftCol}</ReactMarkdown></div>
            <div className="prose max-w-none"><ReactMarkdown>{rightCol}</ReactMarkdown></div>
          </div>
        ) : (
          <div className="prose max-w-none"><ReactMarkdown>{markdownContent}</ReactMarkdown></div>
        )}
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