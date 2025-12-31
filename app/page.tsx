export default function Home() {
  return (
    <main className="hero">
      <div className="hero-content">
        <h1>👨‍👩‍👧‍👦 البومات العائلية</h1>
        <p>ألبومات صور عائلية آمنة وخاصة تماماً<br/>محمية بكلمات مرور منفصلة لكل ألبوم</p>
        <div className="btn-group">
          <a href="/admin" className="btn btn-primary">
            🔐 لوحة التحكم الإدارية
          </a>
          <a href="/album/test" className="btn btn-secondary">
            👀 جرب ألبوم تجريبي
          </a>
        </div>
        <div className="grid" style={{marginTop: '4rem'}}>
          <div className="card">
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>🔒 أمان كامل</h3>
            <p>كل ألبوم له يوزر وباسورد منفصلين، لا قاعدة بيانات، كل شيء في Environment Variables</p>
          </div>
          <div className="card">
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>📱 موبايل فيرست</h3>
            <p>تصميم متجاوب 100% يعمل مثالي على كل الأجهزة والشاشات</p>
          </div>
        </div>
      </div>
    </main>
  )
}
