"use client";

import ReactMarkdown from "react-markdown";

export default function TwoColumnLayout({ content }: { content: string }) {
  // Split by headings (lines starting with #)
  const sections = content.split(/(?=^#)/m).filter(s => s.trim().length > 0);
  
  return (
    <div className="space-y-16">
      {sections.map((section, idx) => (
        <div key={idx}>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="note-content prose prose-slate max-w-none">
              <ReactMarkdown>{section}</ReactMarkdown>
            </div>
            <div className="note-content prose prose-slate max-w-none">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <p className="text-slate-500 text-sm font-semibold mb-3">📌 Summary</p>
                <ReactMarkdown>{section.split("\n").slice(0, 4).join("\n")}</ReactMarkdown>
              </div>
            </div>
          </div>
          {idx < sections.length - 1 && (
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">✦ ✦ ✦</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}