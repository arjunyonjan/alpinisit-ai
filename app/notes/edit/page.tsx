import NoteForm from '@/components/NoteForm';

interface EditPageProps {
  searchParams: { slug?: string };
}

export default function EditNotePage({ searchParams }: EditPageProps) {
  const slug = searchParams.slug;
  if (!slug) return <div>No slug provided</div>;
  return <NoteForm slug={slug} />;
}