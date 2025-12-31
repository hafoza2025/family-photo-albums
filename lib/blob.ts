import { put, list } from '@vercel/blob';

export async function uploadImage(file: File, albumSlug: string, sectionId: string, caption: string) {
  const { url } = await put(
    `${albumSlug}/section-${sectionId}/${Date.now()}-${file.name}`,
    file,
    {
      access: 'public',
      metadata: JSON.stringify({ caption, date: new Date().toISOString() })
    }
  );
  console.log('✅ صورة محفوظة:', url);
  return url;
}

export type BlobImage = {
  url: string;
  metadata: {
    caption: string;
    date: string;
  };
};

export async function getAlbumImages(albumSlug: string, sectionId: string): Promise<BlobImage[]> {
  try {
    const { blobs } = await list({ prefix: `${albumSlug}/section-${sectionId}` });
    return blobs.map(blob => ({
      url: blob.url,
      metadata: JSON.parse(blob.metadata as string)
    }));
  } catch {
    // Fallback mock للاختبار
    return Array.from({length: 9}, (_, i) => ({
      url: `https://picsum.photos/400/400?random=${i}`,
      metadata: { caption: `صورة ${i+1}`, date: new Date().toISOString() }
    }));
  }
}
