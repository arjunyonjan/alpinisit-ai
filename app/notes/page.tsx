"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Sparkles, Tag, Calendar, Eye } from 'lucide-react';

interface Note {
  slug: string;
  title: string;
  date: string;
  status: string;
  tags: string[];
}

const statusColors = {
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
  published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function NotesDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        setNotes(data.notes);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-4">
                <Sparkles size={14} />
                <span>Gemini Material Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Notes Library</h1>
              <p className="text-blue-100 mt-2 max-w-md">Markdown notes — auto‑discovered, instantly searchable</p>
            </div>
            <Link
              href="/notes/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} />
              Create note
            </Link>
          </div>
        </div>
        {/* Decorative wave */}
        <svg className="absolute bottom-0 w-full h-6 text-white/10" preserveAspectRatio="none" viewBox="0 0 1440 40">
          <path fill="currentColor" d="M0,40 L1440,40 L1440,0 C1440,0 1380,10 1320,10 C1260,10 1200,0 1140,0 C1080,0 1020,10 960,10 C900,10 840,0 780,0 C720,0 660,10 600,10 C540,10 480,0 420,0 C360,0 300,10 240,10 C180,10 120,0 60,0 C30,0 15,5 0,10 Z" />
        </svg>
      </div>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {notes.length === 0 ? (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500">No notes yet. Create your first markdown note!</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {notes.map((note) => (
              <div
                key={note.slug}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <Link href={`/notes/read?slug=${note.slug}`} className="block">
                        <h2 className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1">
                          {note.title}
                        </h2>
                      </Link>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={14} />
                          {note.date}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[note.status as keyof typeof statusColors] || statusColors.draft}`}>
                          {note.status}
                        </span>
                      </div>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {note.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/notes/read?slug=${note.slug}`}
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/notes/edit?slug=${note.slug}`}
                        className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm('Delete this note?')) {
                            await fetch(`/api/notes/${note.slug}`, { method: 'DELETE' });
                            setNotes(notes.filter(n => n.slug !== note.slug));
                          }
                        }}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 text-center text-sm text-slate-400 border-t border-slate-200 pt-8">
          <p>⚡ Markdown notes • Auto‑discovered from <code className="bg-slate-100 px-1.5 py-0.5 rounded">public/notes-content/</code></p>
          <p className="mt-1">Gemini Material Design — clean, fast, declarative</p>
        </div>
      </div>
    </div>
  );
}