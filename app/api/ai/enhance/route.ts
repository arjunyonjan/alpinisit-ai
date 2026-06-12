import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const THEMES_CACHE_DIR = path.join(process.cwd(), 'public', 'themes-cache');

if (!fs.existsSync(THEMES_CACHE_DIR)) {
  fs.mkdirSync(THEMES_CACHE_DIR, { recursive: true });
}

type StyleType = "fun" | "poetic" | "professional";

const TOKEN_LIMITS = {
  SAFE_MAX_CHARS: 12000,      
  AGGRESSIVE_MAX_CHARS: 100000,
  WARNING_THRESHOLD: 8000,     
};

const styleGuide: Record<StyleType, string> = {
  fun: "Add playful emojis (🎉✨🚀💡), exclamation marks, enthusiastic tone. Make it engaging and fun to read.",
  poetic: "Use elegant language, metaphors, soft line breaks, artistic spacing. Add 🌸📖🌙✨ emojis. Make it flow like poetry.",
  professional: "Keep clean, formal, structured. Use bullet points, clear headings, professional terminology. No emojis."
};

function smartTruncate(content: string, maxLength: number): { text: string; truncated: boolean } {
  if (content.length <= maxLength) {
    return { text: content, truncated: false };
  }
  const boundaries = ['\n## ', '\n### ', '\n\n', '. ', '! ', '? ', '\n'];
  for (const boundary of boundaries) {
    const truncatedIndex = content.lastIndexOf(boundary, maxLength);
    if (truncatedIndex > maxLength * 0.7) {
      return {
        text: content.substring(0, truncatedIndex) + '\n\n...[Content truncated due to length]...',
        truncated: true
      };
    }
  }
  return {
    text: content.substring(0, maxLength) + '\n\n...[Content truncated due to length]...',
    truncated: true
  };
}

function getCacheKey(slug: string, style: string): string {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '_');
  return `${safeSlug}_${style}.html`;
}

export async function POST(req: NextRequest) {
  try {
    const { content, style, slug } = await req.json();
    
    if (!content) {
      return NextResponse.json({ error: 'Content required' }, { status: 400 });
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 });
    }

    const styleText = styleGuide[style as StyleType] || styleGuide.professional;
    const { text: processedContent, truncated } = smartTruncate(content, TOKEN_LIMITS.AGGRESSIVE_MAX_CHARS);
    const warningHeader = truncated 
      ? "⚠️ NOTE: Content was truncated due to length. Focus on enhancing the visible portion.\n\n"
      : "";

    const prompt = `Transform the following markdown content into a beautiful, well-formatted HTML snippet.

${warningHeader}STYLE REQUIREMENTS: ${styleText}

RULES:
- Return ONLY the HTML div content (no <html>, <body>, or <head> tags)
- Use Tailwind CSS classes for styling (p-4, text-lg, font-bold, etc.)
- Preserve ALL original information from the provided content
- Add appropriate spacing and visual hierarchy
- Keep response concise but complete

CONTENT:
${processedContent}

Return ONLY the HTML div.`;
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are an expert HTML designer. Transform markdown into beautiful, responsive HTML using Tailwind CSS. Return ONLY the HTML div content, no explanations." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    let html = data.choices[0].message.content;
    html = html.replace(/^```html?\s*/i, '').replace(/\s*```$/, '');
    
    if (truncated) {
      html = `<!-- ⚠️ AI Theme generated from truncated content (${content.length} → ${processedContent.length} chars) -->\n${html}`;
    }
    
    // Write directly to cache if slug is provided
    if (slug) {
      const cacheKey = getCacheKey(slug, style || 'fun');
      const cachePath = path.join(THEMES_CACHE_DIR, cacheKey);
      fs.writeFileSync(cachePath, html, 'utf8');
      console.log(`✅ Theme cached: ${cachePath}`);
    }
    
    return NextResponse.json({ html, truncated });
    
  } catch (error) {
    console.error("DeepSeek error:", error);
    return NextResponse.json({ error: 'AI enhancement failed' }, { status: 500 });
  }
}