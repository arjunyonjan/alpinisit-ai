import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

type StyleType = "fun" | "poetic" | "professional";

const styleGuide: Record<StyleType, string> = {
  fun: "Add playful emojis (🎉✨🚀💡), exclamation marks, enthusiastic tone. Make it engaging and fun to read.",
  poetic: "Use elegant language, metaphors, soft line breaks, artistic spacing. Add 🌸📖🌙✨ emojis. Make it flow like poetry.",
  professional: "Keep clean, formal, structured. Use bullet points, clear headings, professional terminology. No emojis."
};

export async function POST(req: NextRequest) {
  try {
    const { content, style } = await req.json();
    
    if (!content) {
      return NextResponse.json({ error: 'Content required' }, { status: 400 });
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 });
    }

    const styleText = styleGuide[style as StyleType] || styleGuide.professional;

    const prompt = `Transform the following markdown content into a beautiful, well-formatted HTML snippet.

STYLE REQUIREMENTS: ${styleText}

RULES:
- Return ONLY the HTML div content (no <html>, <body>, or <head> tags)
- Use Tailwind CSS classes for styling (p-4, text-lg, font-bold, etc.)
- Preserve ALL original information, facts, and code blocks
- Add appropriate spacing and visual hierarchy
- Keep response concise but complete

CONTENT:
${content.substring(0, 4000)}

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
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    let html = data.choices[0].message.content;
    
    html = html.replace(/^```html?\s*/i, '').replace(/\s*```$/, '');
    
    return NextResponse.json({ html });
    
  } catch (error) {
    console.error("DeepSeek error:", error);
    return NextResponse.json({ error: 'AI enhancement failed' }, { status: 500 });
  }
}