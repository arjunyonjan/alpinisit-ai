"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, X, Check, Loader2, Palette, Wand2 } from "lucide-react";

export default function AIPreviewPanel({ isOpen, onClose, originalContent, onApply }: any) {
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
      body: JSON.stringify({ content: originalContent, style }),
    })
      .then(res => res.json())
      .then(data => { setHtml(data.html || originalContent); setLoading(false); })
      .catch(() => { setHtml(originalContent); setLoading(false); });
  }, [isOpen, originalContent, style]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-indigo-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="flex items-center gap-2">
          <Wand2 size={18} />
          <span className="font-semibold">AI Theme Studio</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition"><X size={18} /></button>
      </div>

      {/* Style Selector */}
      <div className="p-5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2"><Palette size={12} />Choose Style</p>
        <div className="flex gap-2">
          {(["fun", "poetic", "professional"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                style === s
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s === "fun" && "🎉 Fun"}
              {s === "poetic" && "📜 Poetic"}
              {s === "professional" && "💼 Professional"}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="p-5 min-h-[300px] max-h-[400px] overflow-auto bg-gray-50">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-gray-500">Gemini AI is creating your theme...</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html || "✨ Click Apply to generate your theme" }} />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-5 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy HTML"}
        </button>
        <button
          onClick={() => { onApply(html); onClose(); }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
        >
          <Sparkles size={16} />
          Apply Theme
        </button>
      </div>
    </div>
  );
}