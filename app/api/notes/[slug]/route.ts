import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDir = path.join(process.cwd(), 'public', 'notes-content');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(notesDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdown } = matter(content);
  
  return NextResponse.json({
    slug,
    title: data.title || slug,
    date: data.date || '',
    status: data.status || 'draft',
    tags: data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',')) : [],
    content: markdown,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();
  const { title, tags, status, content } = body;
  
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
  }
  
  const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const date = new Date().toISOString().split('T')[0];
  const tagList = tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())) : [];
  const frontmatter = { title, date, status: status || 'draft', tags: tagList };
  const fileContent = matter.stringify(content, frontmatter);
  const filePath = path.join(notesDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  if (newSlug !== slug) {
    const newFilePath = path.join(notesDir, `${newSlug}.md`);
    if (fs.existsSync(newFilePath)) {
      return NextResponse.json({ error: 'A note with that title already exists' }, { status: 409 });
    }
    fs.writeFileSync(newFilePath, fileContent, 'utf8');
    fs.unlinkSync(filePath);
    return NextResponse.json({ slug: newSlug });
  }
  
  fs.writeFileSync(filePath, fileContent, 'utf8');
  return NextResponse.json({ slug });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(notesDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  fs.unlinkSync(filePath);
  return NextResponse.json({ success: true });
}