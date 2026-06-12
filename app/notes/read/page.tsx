"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import AIPreviewPanel from "@/components/AIPreviewPanel";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Eye, LayoutTemplate, AlignJustify, AlignCenter } from "lucide-react";

interface NoteData {
  title: string;
  date: string;
  status: string;
  tags: string[];
  content: string;
}

type WidthMode = "full" | "readable";

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
  const [appliedStyle, setAppliedStyle] = useState<string | null>(null);
  const [widthMode, setWidthMode] = useState<WidthMode>("readable");

  // Load saved width preference
  useEffect(() => {
    const saved = localStorage.getItem("read-width-mode") as WidthMode;
    if (saved === "full" || saved === "readable") {
      setWidthMode(saved);
    }
  }, []);

  // Save width preference
  const toggleWidthMode = () => {
    const newMode = widthMode === "readable" ? "full" : "readable";
    setWidthMode(newMode);
    localStorage.setItem("read-width-mode", newMode);
  };

  // Load cached theme
  useEffect(() => {
    if (!slug) return;
    
    fetch(`/api/ai/theme-cache?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.cached && data.html) {
          setHtmlContent(data.html);
          setViewMode("iframe");
        }
      })
      .catch(err => console.error("Failed to load cached theme:", err));
  }, [slug]);

  // Fetch note content
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/notes/${slug}`)
      .then(res => res.json())
      .then(data => {
        setNote(data);
        setMarkdownContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleApplyTheme = useCallback(async (newHtml: string, style: string = "fun") => {
    if (!slug) return;
    
    await fetch('/api/ai/theme-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content: markdownContent, style })
    });
    
    setHtmlContent(newHtml);
    setAppliedStyle(style);
    setViewMode("iframe");
  }, [slug, markdownContent]);

  const handleClearTheme = useCallback(async () => {
    if (!slug) return;
    await fetch(`/api/ai/theme-cache?slug=${slug}`, { method: 'DELETE' });
    setHtmlContent("");
    setAppliedStyle(null);
    setViewMode("markdown");
  }, [slug]);

  if (!slug) notFound();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading note...</p>
        </div>
      </div>
    );
  }
  if (!note) notFound();

  const tags = note.tags || [];

  return (
    <div className="min-h-screen bg-white overflow-x-auto">
      <style>{`
        .prose-readable {
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
        }
        .prose-full {
          max-width: 100%;
        }
        .prose-readable img, .prose-full img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("markdown")}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all ${viewMode === "markdown" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Eye size={14} />Read
            </button>
            <button
              onClick={() => setViewMode("iframe")}
              disabled={!htmlContent}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all ${viewMode === "iframe" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${!htmlContent ? "opacity-50" : ""}`}
            >
              <LayoutTemplate size={14} />Theme View{appliedStyle && viewMode === "iframe" && <span className="ml-1 text-xs opacity-70">({appliedStyle})</span>}
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {htmlContent && (
              <div className="flex items-center gap-2 mr-2">
                <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <span>🎨 Theme Active</span>
                  <button onClick={handleClearTheme} className="ml-1 hover:bg-indigo-200 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                </div>
              </div>
            )}
            <button
              onClick={toggleWidthMode}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${widthMode === "readable" ? "bg-indigo-100 text-indigo-700 border-indigo-300" : "bg-white/80 text-gray-700 hover:bg-gray-100 border-gray-200"}`}
              title={widthMode === "readable" ? "Switch to full width" : "Switch to readable width"}
            >
              {widthMode === "readable" ? <AlignCenter size={12} /> : <AlignJustify size={12} />}
              <span>{widthMode === "readable" ? "Readable" : "Full"}</span>
            </button>
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <ThemeSwitcher />
            <LayoutSwitcher layout={layout} setLayout={setLayout} disabled={viewMode === "iframe"} />
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-10 overflow-x-auto">
        <div className={widthMode === "readable" ? "prose-readable" : "prose-full"}>
          <h1 className="text-3xl font-bold mb-2">{note.title || slug}</h1>
          <div className="text-sm text-gray-500 mb-4 flex items-center gap-3">
            <span>{note.date}</span><span>·</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${note.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{note.status}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap">
              {tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full text-sm text-gray-600">#{tag}</span>
              ))}
            </div>
          )}

          {viewMode === "iframe" ? (
            htmlContent ? (
              <iframe
                key={`iframe-${slug}-${widthMode}`}
                srcDoc={`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 40px 20px; background: white; font-family: system-ui, sans-serif; display: flex; justify-content: center; }
    .container { max-width: ${widthMode === "readable" ? "800px" : "100%"}; width: 100%; }
    img { max-width: 100%; height: auto; }
    pre { overflow-x: auto; }
  </style>
</head>
<body>
  <div class="container">${htmlContent}</div>
</body>
</html>`}
                className="w-full h-[calc(100vh-300px)] min-h-[500px] border-0 rounded-lg"
                title="AI Theme Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl">
                <LayoutTemplate size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="mb-2">No AI theme generated yet</p>
                <p className="text-sm text-gray-400">Click the AI Theme button to create a beautiful design</p>
              </div>
            )
          ) : (
            <div className="prose prose-slate">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <AIPreviewPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} originalContent={markdownContent} slug={slug || undefined} onApply={(html: string, style: string) => handleApplyTheme(html, style)} />
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