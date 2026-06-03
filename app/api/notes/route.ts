import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDir = path.join(process.cwd(), 'public', 'notes-content');
if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir, { recursive: true });

function parseTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t: string) => t.trim());
  return tags.split(',').map((t: string) => t.trim());
}

export async function GET() {
  const files = fs.readdirSync(notesDir).filter((f: string) => f.endsWith('.md'));
  const notes = files.map((file: string) => {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const stats = fs.statSync(filePath);
    return {
      slug,
      title: data.title || slug,
      date: data.date || stats.mtime.toISOString().split('T')[0],
      status: data.status || 'draft',
      tags: parseTags(data.tags),
    };
  });
  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, tags, status, content } = body;
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const date = new Date().toISOString().split('T')[0];
  const tagList = parseTags(tags);
  const frontmatter = { title, date, status: status || 'draft', tags: tagList };
  const fileContent = matter.stringify(content, frontmatter);
  const filePath = path.join(notesDir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Note already exists' }, { status: 409 });
  }
  fs.writeFileSync(filePath, fileContent, 'utf8');
  return NextResponse.json({ slug }, { status: 201 });
}