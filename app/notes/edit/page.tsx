import MarkdownEditor from "../../../components/MarkdownEditor";

interface EditPageProps {
  searchParams: Promise<{ slug?: string }>;
}

interface NoteData {
  title: string;
  tags: string[];
  status: string;
  content: string;
}

async function getNote(slug: string): Promise<NoteData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notes/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EditNotePage({ searchParams }: EditPageProps) {
  const { slug } = await searchParams;
  
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">No slug provided</h1>
          <p className="text-gray-500">Please specify a note slug in the URL: <code className="bg-gray-100 px-2 py-1 rounded">?slug=your-note</code></p>
          <a href="/notes" className="mt-4 inline-block text-blue-600 hover:underline">← Back to notes</a>
        </div>
      </div>
    );
  }
  
  const note = await getNote(slug);
  
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Note not found</h1>
          <p className="text-gray-500">The note you're trying to edit doesn't exist.</p>
          <a href="/notes" className="mt-4 inline-block text-blue-600 hover:underline">← Back to notes</a>
        </div>
      </div>
    );
  }
  
  return (
    <MarkdownEditor 
      slug={slug}
      initialTitle={note.title}
      initialTags={note.tags.join(', ')}
      initialStatus={note.status}
      initialContent={note.content}
    />
  );
}