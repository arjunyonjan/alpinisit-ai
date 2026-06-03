import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { content, style, layout, themePreference } = await req.json();
    
    if (!content) {
      return NextResponse.json({ error: 'Content required' }, { status: 400 });
    }

    const prompt = buildPrompt(content, style, layout, themePreference);
    
    // If no API key, use mock
    if (!DEEPSEEK_API_KEY) {
      const mockHtml = generateMockHtml(content, style, layout);
      return NextResponse.json({ 
        html: mockHtml, 
        detectedTheme: "gemini",
        mock: true 
      });
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are an expert UI designer. Generate clean, responsive HTML using Tailwind CSS classes.
Return ONLY the HTML content (no <html>, <body>, or <head> tags).
Use semantic HTML5 elements.
Make it visually appealing with appropriate spacing, colors, and typography.
The theme should be reflected in the color scheme.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    let html = data.choices[0].message.content;
    
    // Extract theme from generated HTML or use preference
    let detectedTheme = themePreference || "next";
    if (html.includes("gemini") || html.includes("rainbow") || html.includes("gradient")) {
      detectedTheme = "gemini";
    } else if (html.includes("next") || html.includes("blue") || html.includes("tailwind")) {
      detectedTheme = "next";
    }
    
    return NextResponse.json({ html, detectedTheme });
    
  } catch (error) {
    const { content, style, layout } = await req.json();
    const mockHtml = generateMockHtml(content, style, layout);
    return NextResponse.json({ 
      html: mockHtml, 
      detectedTheme: "gemini",
      error: true 
    });
  }
}

function buildPrompt(content: string, style: string, layout: string, themePreference?: string): string {
  const themeInstruction = themePreference 
    ? `Use ${themePreference.toUpperCase()} theme (${themePreference === "next" ? "blue tones, clean cards, rounded corners, professional" : "rainbow gradients, Google colors, vibrant accents, modern"})`
    : "Choose the best theme (next or gemini) based on the content. Next.js = blue/professional, Gemini = rainbow/creative";

  const layoutMap: Record<string, string> = {
    document: "Single column, max-width 4xl, centered, readable prose",
    "one-col": "Full width single column, large text, generous spacing, modern cards",
    "two-col-alt": "Two column layout that alternates left/right for each section"
  };

  const styleMap: Record<string, string> = {
    fun: "Playful, add emojis ✨🚀, enthusiastic tone, colorful accents",
    poetic: "Elegant, flowing language, soft colors, artistic spacing",
    professional: "Clean, structured, formal, grid-based, business-like"
  };

  return `Transform this content into beautiful HTML using Tailwind CSS.

LAYOUT: ${layoutMap[layout] || layoutMap.document}
STYLE: ${styleMap[style] || styleMap.professional}
THEME: ${themeInstruction}

REQUIREMENTS:
- Use Tailwind CSS classes (bg-white, rounded-xl, shadow-md, p-6, etc.)
- Responsive (mobile-first, md: breakpoints)
- Add section dividers (border-t, my-8)
- Headings: h1 (text-3xl md:text-4xl font-bold), h2 (text-2xl font-semibold mt-8)
- Lists: styled with list-disc, pl-5, space-y-2
- Code blocks: bg-gray-900 text-gray-100 p-4 rounded-xl
- Links: text-blue-600 hover:underline
- Add appropriate icons/spacers

Return ONLY the HTML. No markdown wrapper, no explanations.

CONTENT:
${content}`;
}

function generateMockHtml(content: string, style: string, layout: string): string {
  const isGemini = style === "fun" || style === "poetic";
  const themeClass = isGemini 
    ? "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    : "bg-gradient-to-br from-slate-50 via-white to-blue-50";
    
  const cardClass = isGemini
    ? "bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg"
    : "bg-white rounded-2xl border border-slate-200 shadow-md";
    
  const accentClass = isGemini
    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
    : "text-blue-600";
    
  const lines = content.split('\n');
  let html = `<div class="${themeClass} p-8 rounded-3xl">`;
  html += `<div class="${cardClass} p-6 md:p-8">`;
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      html += `<h1 class="text-3xl md:text-4xl font-bold ${accentClass} mb-4 pb-2 border-b border-slate-200">${line.slice(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      html += `<h2 class="text-2xl font-semibold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-200">${line.slice(3)}</h2>`;
    } else if (line.startsWith('- ')) {
      html += `<li class="text-slate-700 ml-5 list-disc">${line.slice(2)}</li>`;
    } else if (line.trim()) {
      html += `<p class="text-slate-700 mb-4 leading-relaxed">${line}</p>`;
    }
  }
  
  html += `</div></div>`;
  return html;
}