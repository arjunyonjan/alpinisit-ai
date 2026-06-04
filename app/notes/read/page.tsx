"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import AIPreviewPanel from "@/components/AIPreviewPanel";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Eye, LayoutTemplate, AlertCircle } from "lucide-react";

interface NoteData {
  title: string;
  date: string;
  status: string;
  tags: string[];
  content: string;
}

// Storage keys with versioning for future migrations
const STORAGE_KEYS = {
  aiHtml: (slug: string) => `ai-html-v2-${slug}`,
  aiStyle: (slug: string) => `ai-style-${slug}`,
  aiTimestamp: (slug: string) => `ai-timestamp-${slug}`,
};

// Helper for safe localStorage operations
const safeStorage = {
  get: (key: string, maxSizeMB = 2): string | null => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      
      // Check size limit
      const sizeInMB = new Blob([value]).size / (1024 * 1024);
      if (sizeInMB > maxSizeMB) {
        console.warn(`Storage key ${key} exceeds ${maxSizeMB}MB, removing...`);
        localStorage.removeItem(key);
        return null;
      }
      
      return value;
    } catch (error) {
      console.error(`Failed to read from localStorage: ${key}`, error);
      return null;
    }
  },
  
  set: (key: string, value: string, maxSizeMB = 2): boolean => {
    try {
      const sizeInMB = new Blob([value]).size / (1024 * 1024);
      if (sizeInMB > maxSizeMB) {
        console.warn(`Cannot store ${key}: exceeds ${maxSizeMB}MB limit`);
        return false;
      }
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to write to localStorage: ${key}`, error);
      return false;
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove from localStorage: ${key}`, error);
    }
  }
};

// Helper to validate HTML content
function isValidHtmlContent(html: string): boolean {
  if (!html || typeof html !== 'string') return false;
  if (html.length < 10) return false;
  
  // Check for potentially dangerous content
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onclick=/i,
    /onerror=/i,
    /onload=/i,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(html)) {
      console.warn('Dangerous HTML pattern detected:', pattern);
      return false;
    }
  }
  
  return true;
}

function ReadNotePageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { layout, setLayout } = useTheme();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
    const [sharedCacheAvailable, setSharedCacheAvailable] = useState(false);
  const [cachedMetadata, setCachedMetadata] = useState<{ cachedAt?: string }>({});
  const [viewMode, setViewMode] = useState<"markdown" | "iframe">("markdown");
  const [appliedStyle, setAppliedStyle] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // Restore saved theme from localStorage on mount
  useEffect(() => {
    if (!slug) {
      setIsRestoring(false);
      return;
    }
    
    try {
      // Try to restore HTML content
      const savedHtml = safeStorage.get(STORAGE_KEYS.aiHtml(slug));
      const savedStyle = safeStorage.get(STORAGE_KEYS.aiStyle(slug));
      const savedTimestamp = safeStorage.get(STORAGE_KEYS.aiTimestamp(slug));
      
      if (savedHtml && isValidHtmlContent(savedHtml)) {
        setHtmlContent(savedHtml);
        setViewMode("iframe");
        if (savedStyle) setAppliedStyle(savedStyle);
        
        // Log restore info
        const age = savedTimestamp ? Math.round((Date.now() - parseInt(savedTimestamp)) / (1000 * 60 * 60)) : 'unknown';
        console.log(`✅ Restored AI theme for "${slug}" (age: ${age === 'unknown' ? 'unknown' : age + ' hours'})`);
      } else if (savedHtml) {
        console.warn(`Invalid HTML content for "${slug}", clearing...`);
        safeStorage.remove(STORAGE_KEYS.aiHtml(slug));
        safeStorage.remove(STORAGE_KEYS.aiStyle(slug));
        safeStorage.remove(STORAGE_KEYS.aiTimestamp(slug));
      }
    } catch (error) {
      console.error('Failed to restore AI theme:', error);
    } finally {
      setIsRestoring(false);
    }
  }, [slug]);

  // Clear theme when navigating to different note
  useEffect(() => {
    if (!slug) return;
    
    // Reset view mode when slug changes (unless we just restored a theme)
    const resetTimer = setTimeout(() => {
      if (!isRestoring && viewMode === "iframe" && !htmlContent) {
        setViewMode("markdown");
      }
    }, 100);
    
    return () => clearTimeout(resetTimer);
  }, [slug, htmlContent, viewMode, isRestoring]);

  // Fetch note content
  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);
    
    fetch(`/api/notes/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setNote(data);
        setMarkdownContent(data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch note:', err);
        setError(err.message || 'Failed to load note');
        setLoading(false);
      });
  }, [slug]);

  // Save AI-generated HTML to localStorage
  const handleApplyHtml = useCallback((newHtml: string, style: string = "fun") => {
    if (!slug) return;
    
    if (!isValidHtmlContent(newHtml)) {
      console.error('Invalid HTML content, refusing to save');
      alert('Generated theme contains invalid content. Please try again.');
      return;
    }
    
    // Save to state
    setHtmlContent(newHtml);
    setAppliedStyle(style);
    setViewMode("iframe");
    
    // Persist to localStorage with metadata
    const saved = safeStorage.set(STORAGE_KEYS.aiHtml(slug), newHtml);
    if (saved) {
      safeStorage.set(STORAGE_KEYS.aiStyle(slug), style);
      safeStorage.set(STORAGE_KEYS.aiTimestamp(slug), String(Date.now()));
      console.log(`✅ AI theme saved for "${slug}"`);
    } else {
      console.warn(`Failed to save AI theme for "${slug}" (likely size limit)`);
      alert('Theme is too large to save locally. Consider simplifying the content.');
    }
  }, [slug]);

  // Clear saved theme
  const handleClearTheme = useCallback(() => {
    if (!slug) return;
    
    safeStorage.remove(STORAGE_KEYS.aiHtml(slug));
    safeStorage.remove(STORAGE_KEYS.aiStyle(slug));
    safeStorage.remove(STORAGE_KEYS.aiTimestamp(slug));
    
    setHtmlContent("");
    setAppliedStyle(null);
    setViewMode("markdown");
    
    console.log(`🗑️ AI theme cleared for "${slug}"`);
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
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Note</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
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
      {/* Toolbar with theme status indicator */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1">
            <button 
              onClick={() => setViewMode("markdown")} 
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all ${
                viewMode === "markdown" 
                  ? "bg-black text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Eye size={14} />
              Read
            </button>
            <button 
              onClick={() => setViewMode("iframe")} 
              className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all ${
                viewMode === "iframe" 
                  ? "bg-black text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${!htmlContent ? "opacity-50" : ""}`}
              disabled={!htmlContent}
              title={!htmlContent ? "Generate an AI theme first" : ""}
            >
              <LayoutTemplate size={14} />
              Theme View
              {appliedStyle && viewMode === "iframe" && (
                <span className="ml-1 text-xs opacity-70">
                  ({appliedStyle === "fun" ? "🎉" : appliedStyle === "poetic" ? "📜" : "💼"})
                </span>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Show theme indicator if active */}
            {htmlContent && (
              <div className="flex items-center gap-2 mr-2">
                <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <span>🎨 Theme Active</span>
                  <button 
                    onClick={handleClearTheme}
                    className="ml-1 hover:bg-indigo-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    title="Clear saved theme"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            
            <AIThemeButton onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            <ThemeSwitcher />
            <LayoutSwitcher 
              layout={layout} 
              setLayout={setLayout} 
              disabled={viewMode === "iframe"} 
            />
          </div>
        </div>
        
        {/* Warning for truncated content (from API) */}
        {viewMode === "iframe" && htmlContent && htmlContent.includes("truncated") && (
          <div className="mt-2 text-xs bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <AlertCircle size={12} />
            <span>Theme generated from truncated content. Some sections may be incomplete.</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">{note.title || slug}</h1>
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-3">
          <span>{note.date}</span>
          <span>·</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            note.status === 'published' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-amber-100 text-amber-700'
          }`}>
            {note.status}
          </span>
          {htmlContent && viewMode === "iframe" && appliedStyle && (
            <>
              <span>·</span>
              <span className="text-xs text-indigo-600">
                ✨ AI Theme {appliedStyle === "fun" ? "Fun" : appliedStyle === "poetic" ? "Poetic" : "Professional"}
              </span>
            </>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full text-sm text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {viewMode === "iframe" ? (
          htmlContent ? (
            <iframe 
              key={`iframe-${slug}-${Date.now()}`} // Force re-render on theme change
              srcDoc={`<!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                      body { 
                        margin: 0; 
                        padding: 20px; 
                        background: white;
                        font-family: system-ui, -apple-system, sans-serif;
                      }
                      /* Prevent iframe content from breaking layout */
                      img { max-width: 100%; height: auto; }
                      pre { overflow-x: auto; }
                    </style>
                  </head>
                  <body>
                    <div class="max-w-4xl mx-auto">
                      ${htmlContent}
                    </div>
                  </body>
                </html>
              `}
              className="w-full min-h-[70vh] border-0 rounded-lg"
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
        ) : layout === "two-col-alt" ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="prose max-w-none"><ReactMarkdown>{leftCol}</ReactMarkdown></div>
            <div className="prose max-w-none"><ReactMarkdown>{rightCol}</ReactMarkdown></div>
          </div>
        ) : (
          <div className="prose max-w-none"><ReactMarkdown>{markdownContent}</ReactMarkdown></div>
        )}
      </div>

      <AIPreviewPanel 
        isOpen={aiPanelOpen} 
        onClose={() => setAiPanelOpen(false)} 
        originalContent={markdownContent} 
        onApply={(html: string, style: string) => handleApplyHtml(html, style)}
      />
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
