import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const albumSlug = formData.get('album') as string;
    const sectionId = formData.get('section') as string;
    const caption = formData.get('caption') as string;

    if (!file || !albumSlug) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Mock upload (يعمل بدون Vercel Blob token)
    const mockUrl = `https://picsum.photos/400/400?random=${Date.now()}`;
    
    return NextResponse.json({ 
      url: mockUrl, 
      success: true,
      metadata: { caption: caption || 'صورة جديدة', date: new Date().toISOString() }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
