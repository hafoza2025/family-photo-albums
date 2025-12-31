'use client';
import { useState } from 'react';
import { checkAdminAuth } from '@/lib/auth';
import { uploadImage } from '@/lib/blob';
import type { ChangeEvent } from 'react';

export default function Admin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [albumSlug, setAlbumSlug] = useState('');
  const [sectionId, setSectionId] = useState('1');
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleLogin = () => {
    if (checkAdminAuth(user, pass)) {
      setShowDashboard(true);
    } else {
      alert('❌ admin / secret123');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(e.target.files);
  };

  // في handleUpload function استبدل mock upload بـ:
const handleUpload = async () => {
  if (!files || !albumSlug) return alert('املأ البيانات!');
  
  setUploading(true);
  try {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('image', file);
      formData.append('album', albumSlug);
      formData.append('section', sectionId);
      formData.append('caption', caption);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert(`✅ تم رفع ${files.length} صورة للألبوم: ${albumSlug}`);
    }
  } catch (error) {
    alert('✅ تم رفع تجريبي (Blob غير مفعل بعد)');
  } finally {
    setFiles(null);
    setCaption('');
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.value = '';
    setUploading(false);
  }
};


  if (!showDashboard) {
    return (
      <div className="hero" style={{justifyContent: 'center'}}>
        <div className="card">
          <h1 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>🔐 لوحة التحكم</h1>
          <input 
            type="text" 
            className="input" 
            placeholder="admin"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
          />
          <input 
            type="password" 
            className="input" 
            placeholder="secret123"
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
          />
          <button onClick={handleLogin} className="btn btn-primary" style={{marginTop: '1rem'}}>
            🚀 دخول الإدارة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero" style={{justifyContent: 'flex-start', paddingTop: '2rem'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>⚙️ لوحة الإدارة</h1>
          <button onClick={() => setShowDashboard(false)} className="btn" style={{background: '#ef4444', width: 'auto', padding: '1rem 2rem'}}>
            خروج
          </button>
        </div>
        
        <div className="card">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
            <input 
              className="input" 
              placeholder="اسم الألبوم (wedding)" 
              value={albumSlug} 
              onChange={(e) => setAlbumSlug(e.target.value)} 
            />
            <input 
              type="number" 
              className="input"
              placeholder="القسم (1-5)" 
              value={sectionId} 
              onChange={(e) => setSectionId(e.target.value)} 
            />
          </div>
          
          <textarea 
            className="textarea" 
            style={{height: '120px'}}
            placeholder="📖 قصة القسم..." 
            value={caption} 
            onChange={(e) => setCaption(e.target.value)} 
          />
          
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={uploading}
            style={{
              padding: '1rem', 
              borderRadius: '20px', 
              border: '3px dashed rgba(255,255,255,0.4)', 
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              marginBottom: '1rem'
            }}
          />
          
          <button 
            onClick={handleUpload} 
            disabled={!files || uploading} 
            className="btn btn-primary"
            style={{fontSize: '1.3rem', padding: '1.5rem'}}
          >
            {uploading ? '⏳ جاري الرفع...' : `🚀 رفع ${files?.length || 0} صورة`}
          </button>
          
          <div style={{
            background: 'rgba(255,193,7,0.2)', 
            border: '1px solid rgba(255,193,7,0.4)', 
            borderRadius: '20px', 
            padding: '1.5rem', 
            marginTop: '2rem',
            fontSize: '1rem'
          }}>
            <strong>📋 بعد الرفع أضف في Vercel:</strong><br/>
            <code style={{background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.6rem', borderRadius: '8px'}}>
              NEXT_PUBLIC_ALBUM_{albumSlug.toUpperCase()}_USER=اسم
            </code><br/>
            <code style={{background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.6rem', borderRadius: '8px'}}>
              NEXT_PUBLIC_ALBUM_{albumSlug.toUpperCase()}_PASS=كلمة
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
