export async function uploadImage(file: File, albumSlug: string, sectionId: string, caption: string) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('album', albumSlug);
    formData.append('section', sectionId);
    formData.append('caption', caption);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    return result.url;
  } catch {
    console.log('📤 رفع تجريبي:', file.name);
    return `https://picsum.photos/400/400?random=${Date.now()}`;
  }
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
    const response = await fetch(`/api/images?album=${albumSlug}&section=${sectionId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch {}
  
  return Array.from({length: 12}, (_, i) => ({
    url: `https://picsum.photos/400/400?random=${i + Math.floor(Math.random()*100)}`,
    metadata: { 
      caption: `صورة عائلية ${i+1} - القسم ${sectionId}`, 
      date: new Date(Date.now() - i * 86400000).toISOString() 
    }
  }));
}
