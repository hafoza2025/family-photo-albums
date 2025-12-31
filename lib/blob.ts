export async function uploadImage(file: File, albumSlug: string, sectionId: string, caption: string) {
  console.log('📤 رفع:', file.name, albumSlug, sectionId);
  return `https://picsum.photos/400/400?random=${Date.now()}`;
}

export type BlobImage = {
  url: string;
  metadata: {
    caption: string;
    date: string;
  };
};

export async function getAlbumImages(albumSlug: string, sectionId: string): Promise<BlobImage[]> {
  return Array.from({length: 9}, (_, i) => ({
    url: `https://picsum.photos/400/400?random=${i}`,
    metadata: { 
      caption: `صورة عائلية ${i+1}`, 
      date: new Date(Date.now() - i * 86400000).toISOString() 
    }
  }));
}
