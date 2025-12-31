import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const albumSlug = formData.get('album') as string;
    const sectionId = formData.get('section') as string;
    const caption = formData.get('caption') as string;

    if (!file || !albumSlug || !sectionId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const { url } = await put(
      `${albumSlug}/section-${sectionId}/${Date.now()}-${file.name}`,
      file,
      {
        access: 'public',
        metadata: JSON.stringify({ caption, date: new Date().toISOString() })
      }
    );

    return NextResponse.json({ url, success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
