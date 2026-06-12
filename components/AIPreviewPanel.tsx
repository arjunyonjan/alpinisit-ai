"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, X, Check, Loader2, Palette } from "lucide-react";

export default function AIPreviewPanel({ 
  isOpen, 
  onClose, 
  originalContent, 
  slug,
  onApply 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  originalContent: string;
  slug?: string;
  onApply: (html: string, style: string) => void;
}) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<"fun" | "poetic" | "professional">("fun");

  useEffect(() => {
    if (!isOpen || !originalContent) return;
    setLoading(true);
    fetch("/api/ai/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: originalContent, style, slug }),
    })
      .then(res => res.json())
      .then(data => {
        const generatedHtml = data.html || `<div class="p-4">${originalContent}</div>`;
        setHtml(generatedHtml);
        setLoading(false);
        if (data.truncated) {
          console.warn("Content was truncated for token limits");
        }
      })
      .catch(() => {
        setHtml(`<div class="p-4">${originalContent}</div>`);
        setLoading(false);
      });
  }, [isOpen, originalContent, style, slug]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-indigo-200 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-2"><Sparkles size={18} /><span className="font-semibold">AI Theme Studio</span></div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg"><X size={18} /></button>
      </div>

      <div className="p-5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2"><Palette size={12} />Style</p>
        <div className="flex gap-2">
          {(["fun", "poetic", "professional"] as const).map((s) => (
            <button key={s} onClick={() => setStyle(s)} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${style === s ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {s === "fun" && "🎉 Fun"}{s === "poetic" && "📜 Poetic"}{s === "professional" && "💼 Professional"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 min-h-[320px] max-h-[450px] overflow-auto bg-gray-50">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-sm text-gray-500 font-medium">AI is creating your theme...</p>
            <p className="text-xs text-gray-400">This may take a few seconds</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html || "✨ Select a style and click Apply to generate your theme" }} />
        )}
      </div>

      <div className="flex gap-3 p-5 border-t border-gray-100 bg-gray-50">
        <button onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
          {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy HTML"}
        </button>
        <button onClick={() => onApply(html, style)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
          <Sparkles size={16} /> Apply Theme
        </button>
      </div>
    </div>
  );
}