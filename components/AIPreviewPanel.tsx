"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, X, Check, Loader2 } from "lucide-react";

export default function AIPreviewPanel({ isOpen, onClose, originalContent, onApply }: any) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !originalContent) return;
    setLoading(true);
    fetch("/api/ai/enhance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: originalContent }) })
      .then(res => res.json()).then(data => { setHtml(data.html || originalContent); setLoading(false); })
      .catch(() => { setHtml(originalContent); setLoading(false); });
  }, [isOpen, originalContent]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-20 right-6 bottom-6 w-96 bg-white rounded-2xl shadow-2xl border border-indigo-200 z-50 flex flex-col overflow-hidden">
      <div className="flex justify-between px-4 py-3 bg-indigo-600 text-white"><span className="font-semibold">AI Preview</span><button onClick={onClose}><X size={18} /></button></div>
      <div className="flex-1 overflow-auto p-4">{loading ? <Loader2 className="animate-spin mx-auto" /> : <div dangerouslySetInnerHTML={{ __html: html }} />}</div>
      <div className="flex gap-2 p-3 border-t">
        <button onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex-1 py-2 border rounded-lg">{copied ? "Copied!" : "Copy"}</button>
        <button onClick={() => { onApply(html); onClose(); }} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg">Apply</button>
      </div>
    </div>
  );
}