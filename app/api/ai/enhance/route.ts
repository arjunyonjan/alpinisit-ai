import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { content } = await req.json();
  const html = `<div class="p-6 prose max-w-none">${content.replace(/\n/g, '<br/>')}</div>`;
  return NextResponse.json({ html });
}