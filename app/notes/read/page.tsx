"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import AIThemeButton from "@/components/AIThemeButton";
import { useTheme } from "@/contexts/ThemeContext";

interface NoteData {
  title: string;
  date: string;
  status: string;
  tags: string[];
  content: string;
}

export default function ReadNotePage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { layout, setLayout } = useTheme();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/notes/${slug}`)
      .then(res => res.json())
      .then(data => {
        setNote(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (!slug) notFound();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!note) notFound();

  const tags = note.tags || [];
  const layoutClass = layout === "one-col" 
    ? "max-w-4xl mx-auto"
    : layout === "two-col-alt"
    ? "grid md:grid-cols-2 gap-8 items-start"
    : "max-w-3xl mx-auto";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 layout-${layout}`}>
      <div className="p-6">
        <div className="flex justify-end gap-2 mb-4">
          <AIThemeButton />
          <div className="theme-selector">
            <ThemeSwitcher />
          </div>
          <LayoutSwitcher layout={layout} setLayout={setLayout} />
        </div>
        <div className={layoutClass}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-800">{note.title || slug}</h1>
              <div className="text-sm text-slate-500 mt-2">{note.date} · {note.status}</div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag: string) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}