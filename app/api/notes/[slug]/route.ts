import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDir = path.join(process.cwd(), 'public', 'notes-content');

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const mdPath = path.join(notesDir, `${slug}.md`);
  const htmlPath = path.join(notesDir, `${slug}.html`);
  
  if (!fs.existsSync(mdPath)) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  const content = fs.readFileSync(mdPath, 'utf8');
  const { data, content: markdown } = matter(content);
  let html = null;
  if (fs.existsSync(htmlPath)) {
    html = fs.readFileSync(htmlPath, 'utf8');
  }
  
  return NextResponse.json({
    slug,
    title: data.title || slug,
    date: data.date || '',
    status: data.status || 'draft',
    tags: data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',')) : [],
    content: markdown,
    html,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { title, tags, status, content, html } = body;
  
  const date = new Date().toISOString().split('T')[0];
  const tagList = tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())) : [];
  const frontmatter = { title, date, status: status || 'draft', tags: tagList };
  const fileContent = matter.stringify(content, frontmatter);
  const mdPath = path.join(notesDir, `${slug}.md`);
  
  fs.writeFileSync(mdPath, fileContent, 'utf8');
  
  if (html) {
    const htmlPath = path.join(notesDir, `${slug}.html`);
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{margin:0;padding:20px;background:white;}</style></head><body><div class="w-full">${html}</div></body></html>`;
    fs.writeFileSync(htmlPath, fullHtml, 'utf8');
  }
  
  return NextResponse.json({ slug });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const mdPath = path.join(notesDir, `${slug}.md`);
  if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);
  const htmlPath = path.join(notesDir, `${slug}.html`);
  if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
  return NextResponse.json({ success: true });
}