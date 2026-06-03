'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  slug?: string;
}

export default function NoteForm({ slug }: NoteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`/api/notes/${slug}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setTags(data.tags.join(', '));
          setStatus(data.status);
          setContent(data.content);
        })
        .catch(() => alert('Failed to load note'));
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { title, tags, status, content };
    const url = slug ? `/api/notes/${slug}` : '/api/notes';
    const method = slug ? 'PUT' : 'POST';
    const res = await fetch(url, { method, body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) {
      router.push('/notes');
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to save note');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{slug ? 'Edit Note' : 'Create Note'}</h1>
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded-lg p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Tags (comma separated)</label>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="ai, react, nextjs" className="w-full border rounded-lg p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded-lg p-2">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Content (Markdown)</label>
        <textarea rows={12} value={content} onChange={e => setContent(e.target.value)} required className="w-full border rounded-lg p-2 font-mono text-sm" />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-xl disabled:opacity-50">
        {loading ? 'Saving...' : slug ? 'Update' : 'Create'}
      </button>
    </form>
  );
}