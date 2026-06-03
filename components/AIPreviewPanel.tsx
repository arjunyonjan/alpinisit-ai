"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, X, Check, Loader2 } from "lucide-react";

interface AIPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  onApply: (newContent: string, isHtml: boolean) => void;
  currentLayout?: string;
}

export default function AIPreviewPanel({ 
  isOpen, 
  onClose, 
  originalContent, 
  onApply, 
  currentLayout = "document" 
}: AIPreviewPanelProps) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<"fun" | "poetic" | "professional">("fun");
  const [detectedTheme, setDetectedTheme] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !originalContent) return;
    
    let isMounted = true;
    setLoading(true);
    
    fetch("/api/ai/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: originalContent, style, layout: currentLayout }),
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setHtml(data.html || data.transformed || originalContent);
          setDetectedTheme(data.detectedTheme || "");
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHtml(originalContent);
          setLoading(false);
        }
      });
      
    return () => { isMounted = false; };
  }, [isOpen, originalContent, style, currentLayout]);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    // Pass HTML content and flag that it's HTML (not markdown)
    onApply(html, true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-6 bottom-6 w-96 bg-white rounded-2xl shadow-2xl border border-indigo-200 z-50 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <span className="font-semibold">AI Enhancement</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition">
          <X size={18} />
        </button>
      </div>

      <div className="flex gap-2 p-3 border-b border-slate-200 bg-slate-50">
        {(["fun", "poetic", "professional"] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setStyle(s);
              setHtml("");
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              style === s
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {s === "fun" && "🎉 Fun"}
            {s === "poetic" && "📜 Poetic"}
            {s === "professional" && "💼 Professional"}
          </button>
        ))}
      </div>

      {detectedTheme && (
        <div className="px-3 py-1 text-xs text-center border-b border-slate-100">
          <span className={`${detectedTheme === "gemini" ? "text-purple-600" : "text-blue-600"} font-medium`}>
            🎨 Theme: {detectedTheme === "gemini" ? "Gemini (Rainbow)" : "Next.js (Blue)"}
          </span>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-slate-500">DeepSeek is generating HTML...</p>
          </div>
        ) : (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>

      <div className="flex gap-2 p-3 border-t border-slate-200 bg-slate-50">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy HTML"}
        </button>
        <button
          onClick={handleApply}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition"
        >
          <Sparkles size={16} />
          Apply HTML
        </button>
      </div>
    </div>
  );
}