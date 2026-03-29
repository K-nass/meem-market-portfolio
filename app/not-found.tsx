
export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            margin: '0',
            background: 'linear-gradient(135deg, #003366 0%, #004080 50%, #002952 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
            overflow: 'hidden',
            position: 'fixed',
            inset: 0,
        }}>
            <div>
                <div style={{
                    fontSize: '8rem',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.08)',
                    lineHeight: 1,
                    marginBottom: '-1rem',
                    userSelect: 'none',
                }}>404</div>

                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2.5rem',
                }}>🔍</div>

                <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                    الصفحة غير موجودة
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '360px', margin: '0 auto 2.5rem' }}>
                    الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                </p>

                <a href="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#D4AF37',
                    color: '#002952',
                    fontWeight: 700,
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    textDecoration: 'none',
                    fontSize: '1rem',
                }}>
                    🏠 العودة للرئيسية
                </a>
            </div>
        </div>
    );
}
