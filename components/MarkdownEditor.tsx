"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { 
  Bold, Italic, Heading1, Heading2, Link as LinkIcon, 
  Code, Eye, EyeOff, Save, Sparkles
} from "lucide-react";

interface MarkdownEditorProps {
  slug?: string;
  initialTitle?: string;
  initialTags?: string;
  initialStatus?: string;
  initialContent?: string;
}

export default function MarkdownEditor({ 
  slug, 
  initialTitle = "", 
  initialTags = "", 
  initialStatus = "draft", 
  initialContent = "" 
}: MarkdownEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState(initialTags);
  const [status, setStatus] = useState(initialStatus);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<"edit" | "split" | "preview">("split");
  const [saved, setSaved] = useState(false);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!slug) {
      const draft = localStorage.getItem("note-draft");
      if (draft && !initialContent) {
        const { title: t, tags: tg, content: c } = JSON.parse(draft);
        if (t) setTitle(t);
        if (tg) setTags(tg);
        if (c) setContent(c);
      }
    }
  }, [slug, initialContent]);

  const autoSave = useCallback(() => {
    if (!slug) {
      const draft = { title, tags, content };
      localStorage.setItem("note-draft", JSON.stringify(draft));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [title, tags, content, slug]);

  useEffect(() => {
    if (!slug) {
      const timer = setTimeout(autoSave, 3000);
      return () => clearTimeout(timer);
    }
  }, [title, tags, content, autoSave, slug]);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newText = content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = { title, tags, status, content };
    const url = slug ? `/api/notes/${slug}` : "/api/notes";
    const method = slug ? "PUT" : "POST";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (res.ok) {
      if (!slug) localStorage.removeItem("note-draft");
      router.push("/notes");
    } else {
      alert("Failed to save note");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{slug ? "Edit Note" : "Create New Note"}</h1>
        <p className="text-gray-500 mt-1">Write in Markdown · Live preview · Auto-save draft</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-t-2xl border border-gray-200 p-2 flex flex-wrap gap-1">
        <button onClick={() => insertMarkdown("**", "**")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Bold"><Bold size={18} /></button>
        <button onClick={() => insertMarkdown("*", "*")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Italic"><Italic size={18} /></button>
        <button onClick={() => insertMarkdown("# ", "")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Heading 1"><Heading1 size={18} /></button>
        <button onClick={() => insertMarkdown("## ", "")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Heading 2"><Heading2 size={18} /></button>
        <button onClick={() => insertMarkdown("[", "](url)")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Link"><LinkIcon size={18} /></button>
        <button onClick={() => insertMarkdown("`", "`")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Inline Code"><Code size={18} /></button>
        <button onClick={() => insertMarkdown("```\n", "\n```")} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Code Block"><Code size={18} className="text-blue-600" /></button>
        <div className="w-px h-8 bg-gray-200 mx-1" />
        <button onClick={() => setPreviewMode("edit")} className={`p-2 rounded-lg transition ${previewMode === "edit" ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"}`}><EyeOff size={18} /></button>
        <button onClick={() => setPreviewMode("split")} className={`p-2 rounded-lg transition ${previewMode === "split" ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"}`}><Eye size={18} /></button>
      </div>

      {/* Editor + Preview */}
      <div className={`border-x border-gray-200 bg-white ${previewMode === "split" ? "grid md:grid-cols-2" : ""}`}>
        {(previewMode === "edit" || previewMode === "split") && (
          <div className={`p-4 ${previewMode === "split" ? "border-r border-gray-200" : ""}`}>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold border-0 focus:ring-0 focus:outline-none mb-4 placeholder-gray-300"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your markdown content here... (supports **bold**, *italic*, # headings, - lists, ```code```)"
              className="w-full h-[500px] font-mono text-sm border-0 focus:ring-0 focus:outline-none resize-none"
            />
          </div>
        )}

        {(previewMode === "preview" || previewMode === "split") && (
          <div className="p-4 overflow-y-auto h-[600px]">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{content || "*Nothing to preview yet...*"}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Meta & Actions */}
      <div className="bg-white rounded-b-2xl border border-gray-200 p-4 mt-0">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              placeholder="ai, react, nextjs"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
            >
              <option value="draft">📝 Draft</option>
              <option value="published">🚀 Published</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            {saved && <div className="text-xs text-green-600 mb-2">✓ Draft saved</div>}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={16} />
            {loading ? "Saving..." : status === "published" ? "Publish Note" : "Save Draft"}
          </button>
          <button
            onClick={() => router.push("/notes")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        ⌨️ Shortcuts: Ctrl+B (bold) · Ctrl+I (italic) · Auto-saves every 3s
      </div>
    </div>
  );
}