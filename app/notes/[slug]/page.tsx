import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function getNoteContent(slug: string) {
  const filePath = path.join(process.cwd(), "notes-content", `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)
  
  return { metadata: data, content: content }
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNoteContent(params.slug)
  
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Note not found</h1>
          <p className="text-gray-500 mt-2">The note you are looking for does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">{note.metadata.title || params.slug}</h1>
          {note.metadata.date && <p className="text-sm text-gray-500 mt-2">📅 {note.metadata.date}</p>}
          <div className="prose prose-slate max-w-none mt-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}