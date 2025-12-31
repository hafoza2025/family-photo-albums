'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AlbumViewer() {
  const params = useParams();
  const slug = params.slug as string;
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [section, setSection] = useState('1');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAlbumAuth = (albumSlug: string, u: string, p: string) => {
    const mockUsers: Record<string, {user: string, pass: string}> = {
      'test': {user: 'testuser', pass: 'testpass'},
      'wedding': {user: 'wedding', pass: '123456'}
    };
    return (mockUsers[albumSlug]?.user === u) && (mockUsers[albumSlug]?.pass === p);
  };

  useEffect(() => {
    if (authenticated) loadImages();
  }, [authenticated, section]);

  const loadImages = async () => {
    setLoading(true);
    // Mock images for production demo
    const mockImages = Array.from({length: 12}, (_, i) => ({
      url: `https://picsum.photos/400/400?random=${i}`,
      metadata: { 
        caption: `صورة عائلية ${i+1} - القسم ${section}`, 
        date: new Date(Date.now() - i * 86400000).toISOString() 
      }
    }));
    setImages(mockImages);
    setLoading(false);
  };

  const handleLogin = () => {
    if (checkAlbumAuth(slug, user, pass)) {
      setAuthenticated(true);
    } else {
      alert('❌ بيانات خاطئة!');
    }
  };

  if (!authenticated) {
    return (
      <div className="hero" style={{justifyContent: 'center'}}>
        <div className="card">
          <h1 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>👨‍👩‍👧‍👦 ألبوم {slug}</h1>
          <input 
            type="text" 
            className="input" 
            placeholder="اسم المستخدم"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
          />
          <input 
            type="password" 
            className="input" 
            placeholder="كلمة المرور"
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
          />
          <button onClick={handleLogin} className="btn btn-primary" style={{marginTop: '1rem'}}>
            👁️ عرض الألبوم
          </button>
          <div style={{marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8}}>
            <strong>تجريبي:</strong> testuser / testpass
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero" style={{justifyContent: 'flex-start', paddingTop: '2rem'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>📸 ألبوم {slug}</h1>
          <select 
            value={section} 
            onChange={(e) => setSection(e.target.value)}
            style={{
              padding: '1rem 2rem', 
              borderRadius: '20px', 
              border: '2px solid rgba(255,255,255,0.3)', 
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            {[1,2,3,4,5].map(i => (
              <option key={i} value={i}>القسم {i}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '4rem'}}>
            <div style={{
              width: '60px', height: '60px', border: '4px solid rgba(255,255,255,0.3)', 
              borderTop: '4px solid white', borderRadius: '50%', 
              animation: 'spin 1s linear infinite', margin: '0 auto 2rem'
            }}></div>
            <p style={{fontSize: '1.2rem'}}>جاري تحميل الصور...</p>
          </div>
        ) : (
          <div className="image-grid">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="image-card" 
                onClick={() => setSelectedImage(img)}
                style={{cursor: 'pointer'}}
              >
                <img 
                  src={img.url} 
                  alt={img.metadata.caption} 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
                <div>
                  <h3 style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem'}}>{selectedImage.metadata.caption}</h3>
                  <p style={{color: '#666', fontSize: '1rem'}}>{new Date(selectedImage.metadata.date).toLocaleString('ar-EG')}</p>
                </div>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <a href={selectedImage.url} download style={{padding: '1rem', background: '#3b82f6', color: 'white', borderRadius: '12px', textDecoration: 'none'}}>
                    📥 تحميل
                  </a>
                  <button 
                    onClick={() => setSelectedImage(null)} 
                    style={{padding: '1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer'}}
                  >
                    ✕ إغلاق
                  </button>
                </div>
              </div>
              <img 
                src={selectedImage.url} 
                style={{width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '20px', marginBottom: '2rem'}}
              />
              <p style={{lineHeight: 1.7, fontSize: '1.1rem'}}>{selectedImage.metadata.caption}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
