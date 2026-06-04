import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const THEMES_CACHE_DIR = path.join(process.cwd(), 'public', 'themes-cache');

if (!fs.existsSync(THEMES_CACHE_DIR)) {
  fs.mkdirSync(THEMES_CACHE_DIR, { recursive: true });
}

function getCacheKey(slug: string, style: string): string {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '_');
  return `${safeSlug}_${style}.html`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const style = searchParams.get('style') || 'fun';
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 });
  }
  
  const cacheKey = getCacheKey(slug, style);
  const cachePath = path.join(THEMES_CACHE_DIR, cacheKey);
  
  if (fs.existsSync(cachePath)) {
    const html = fs.readFileSync(cachePath, 'utf8');
    return NextResponse.json({ html, cached: true });
  }
  
  return NextResponse.json({ cached: false });
}
export async function POST(req: NextRequest) {
  try {
    const { slug, content, style } = await req.json();
    
    if (!slug || !content) {
      return NextResponse.json({ error: 'Slug and content required' }, { status: 400 });
    }
    
    const cacheKey = getCacheKey(slug, style || 'fun');
    const cachePath = path.join(THEMES_CACHE_DIR, cacheKey);
    
    const html = `<div class="p-4">Enhanced: ${content.substring(0, 100)}</div>`;
    fs.writeFileSync(cachePath, html, 'utf8');
    
    return NextResponse.json({ html, cached: false });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to cache theme' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const style = searchParams.get('style');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    }
    
    if (style) {
      const cacheKey = getCacheKey(slug, style);
      const cachePath = path.join(THEMES_CACHE_DIR, cacheKey);
      if (fs.existsSync(cachePath)) {
        fs.unlinkSync(cachePath);
      }
    } else {
      const prefix = slug.replace(/[^a-z0-9-]/gi, '_');
      const files = fs.readdirSync(THEMES_CACHE_DIR);
      files.forEach(file => {
        if (file.startsWith(prefix)) {
          fs.unlinkSync(path.join(THEMES_CACHE_DIR, file));
        }
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete cache' }, { status: 500 });
  }
}