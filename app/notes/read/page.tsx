import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

interface ReadPageProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function ReadNotePage({ searchParams }: ReadPageProps) {
  const { slug } = await searchParams;
  if (!slug) notFound();
  
  const filePath = path.join(process.cwd(), "public", "notes-content", `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();
  
  const content = fs.readFileSync(filePath, "utf8");
  const { data, content: markdown } = matter(content);
  
  const tags = data.tags 
    ? (Array.isArray(data.tags) ? data.tags : (data.tags as string).split(",")) 
    : [];
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{data.title || slug}</h1>
        <div className="text-sm text-gray-500 mt-2">{data.date} · {data.status}</div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}