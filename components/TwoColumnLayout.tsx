"use client";

import ReactMarkdown from "react-markdown";

export default function TwoColumnLayout({ content }: { content: string }) {
  // Split into two roughly equal halves
  const midpoint = Math.floor(content.length / 2);
  let splitPoint = content.indexOf("\n\n", midpoint);
  if (splitPoint === -1) splitPoint = midpoint;
  
  const leftColumn = content.slice(0, splitPoint);
  const rightColumn = content.slice(splitPoint);
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown>{leftColumn}</ReactMarkdown>
      </div>
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown>{rightColumn}</ReactMarkdown>
      </div>
    </div>
  );
}