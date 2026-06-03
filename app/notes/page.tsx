"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Note {
  slug: string;
  title: string;
  date: string;
  status: string;
  tags: string[];
}

export default function NotesDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data.notes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this note?')) return;
    await fetch(`/api/notes/${slug}`, { method: 'DELETE' });
    fetchNotes();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Link href="/notes/new" className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus size={18} /> Create Note
        </Link>
      </div>
      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note.slug} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <Link href={`/notes/read?slug=${note.slug}`} className="text-xl font-semibold hover:underline">
                  {note.title}
                </Link>
                <div className="text-sm text-gray-500 mt-1">{note.date} · {note.status}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/notes/edit?slug=${note.slug}`} className="p-2 hover:bg-gray-100 rounded-full">
                  <Pencil size={18} />
                </Link>
                <button onClick={() => handleDelete(note.slug)} className="p-2 hover:bg-gray-100 rounded-full text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}