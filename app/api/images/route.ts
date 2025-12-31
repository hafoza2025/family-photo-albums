import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const albumSlug = searchParams.get('album');
    const sectionId = searchParams.get('section') || '1';

    if (!albumSlug) {
      return NextResponse.json({ error: 'Missing album' }, { status: 400 });
    }

    // Mock images (يعمل بدون Vercel Blob)
    const mockImages = Array.from({length: 12}, (_, i) => ({
      url: `https://picsum.photos/400/400?random=${i}`,
      metadata: {
        caption: `صورة ${i+1} من ألبوم ${albumSlug} - القسم ${sectionId}`,
        date: new Date(Date.now() - i * 86400000).toISOString()
      }
    }));

    return NextResponse.json(mockImages);
  } catch (error) {
    return NextResponse.json([]);
  }
}
