export interface ContentBlock {
  type: "text" | "media";
  content: string;
}

export function parseContentForTwoCol(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  // Split by image, code block, or blockquote
  const mediaRegex = /(!\[.*?\]\(.*?\))|(```[\s\S]*?```)|(>.*?(\n>.*?)*)/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = mediaRegex.exec(markdown)) !== null) {
    // Text before media
    if (match.index > lastIndex) {
      const textChunk = markdown.slice(lastIndex, match.index).trim();
      if (textChunk) {
        blocks.push({ type: "text", content: textChunk });
      }
    }
    
    // Media block
    blocks.push({ type: "media", content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  // Remaining text
  if (lastIndex < markdown.length) {
    const remaining = markdown.slice(lastIndex).trim();
    if (remaining) {
      blocks.push({ type: "text", content: remaining });
    }
  }
  
  return blocks;
}