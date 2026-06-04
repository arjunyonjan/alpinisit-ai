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

    // Load saved HTML on mount
  useEffect(() => {
    if (!slug) return;
    const savedHtml = localStorage.getItem(`ai-html-${slug}`);
    if (savedHtml) {
      setHtmlContent(savedHtml);
      setViewMode("iframe");
    }
  }, [slug]);

  // Clear when slug changes
  useEffect(() => {
    if (!slug) return;
    setHtmlContent("");
    setViewMode("markdown");
    // Then try to load saved
    const savedHtml = localStorage.getItem(`ai-html-${slug}`);
    if (savedHtml) {
      setHtmlContent(savedHtml);
      setViewMode("iframe");
    }
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
    <div className="w-full bg-gray-50">
      <div className="w-full">
        <div className="bg-white border-b border-gray-200 px-4 py-2 mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode("markdown")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === "markdown" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}><Eye size={14} className="inline mr-1" />Read</button>
              <button onClick={() => setViewMode("iframe")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === "iframe" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}><LayoutTemplate size={14} className="inline mr-1" />Theme</button>
            </div>
            <div className="flex items-center gap-2"><AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} /><ThemeSwitcher /><LayoutSwitcher layout={layout} setLayout={setLayout} disabled={viewMode === "iframe"} /></div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="px-4 py-6 border-t border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{note.title || slug}</h1>
            <div className="flex items-center gap-3 mt-6 text-base text-gray-500">
              <span>{note.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{note.status}</span>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map(tag => <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md">#{tag}</span>)}
              </div>
            )}
          </div>

          <div className="px-8">
            {viewMode === "iframe" ? (
              htmlContent ? (
                <iframe srcDoc={(() => {
    let cleanHtml = htmlContent;
    // Remove gradient text classes
    cleanHtml = cleanHtml.replace(/text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600/g, 'text-gray-900');
    cleanHtml = cleanHtml.replace(/bg-gradient-to-r from-purple-600 to-pink-600/g, '');
    cleanHtml = cleanHtml.replace(/text-transparent bg-clip-text/g, 'text-gray-900');
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{margin:0;padding:20px;background:white;}h1{font-size:1.8rem;font-weight:700;margin-bottom:1rem;}h2{font-size:1.5rem;font-weight:600;margin-top:1.5rem;margin-bottom:0.75rem;border-bottom:1px solid #e5e7eb;padding-bottom:0.25rem;}h3{font-size:1.25rem;font-weight:600;margin-top:1.25rem;margin-bottom:0.5rem;}p{line-height:1.6;margin-bottom:1rem;}</style></head><body><div class="w-full">${cleanHtml}</div></body></html>`;
  })()} className="w-full h-screen border-0 rounded-lg" sandbox="allow-same-origin allow-scripts" />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-6xl mb-10">✨</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Theme Generated</h3>
                  <p className="text-gray-500">Click the <strong>AI Theme</strong> button to generate.</p>
                </div>
              )
            ) : layout === "two-col-alt" ? (
              <div className="grid md:grid-cols-2 gap-16">
                <div className="prose prose-lg max-w-none w-full leading-relaxed text-gray-800 prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:mb-5 prose-ul:my-4 prose-li:my-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"><ReactMarkdown components={{ h1: ({node, ...props}) => <h1 className="text-3xl font-bold" {...props} />, h2: ({node, ...props}) => <h2 className="text-2xl font-semibold pb-2 border-b border-gray-200" {...props} />, h3: ({node, ...props}) => <h3 className="text-xl font-semibold" {...props} /> }}>{leftCol}</ReactMarkdown></div>
                <div className="prose prose-lg max-w-none w-full leading-relaxed text-gray-800 prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:mb-5 prose-ul:my-4 prose-li:my-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"><ReactMarkdown components={{ h1: ({node, ...props}) => <h1 className="text-3xl font-bold" {...props} />, h2: ({node, ...props}) => <h2 className="text-2xl font-semibold pb-2 border-b border-gray-200" {...props} />, h3: ({node, ...props}) => <h3 className="text-xl font-semibold" {...props} /> }}>{rightCol}</ReactMarkdown></div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none w-full leading-relaxed text-gray-800 prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2 prose-p:mb-5 prose-ul:my-4 prose-li:my-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"><ReactMarkdown components={{ h1: ({node, ...props}) => <h1 className="text-3xl font-bold" {...props} />, h2: ({node, ...props}) => <h2 className="text-2xl font-semibold pb-2 border-b border-gray-200" {...props} />, h3: ({node, ...props}) => <h3 className="text-xl font-semibold" {...props} /> }}>{markdownContent}</ReactMarkdown></div>
            )}
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