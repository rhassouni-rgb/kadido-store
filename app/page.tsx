import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
        مرحباً بك في متجر كاديدو 🛍️
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        الموقع يعمل بنجاح!
      </p>
      
      {/* هذا الزر سينقلك للوحة التحكم */}
      <Link href="/manager"> {/* 👈 تأكد أن هذا يطابق اسم مجلد لوحة التحكم لديك (admin أو manager) */}
        <button style={{
          padding: '12px 24px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          الدخول للوحة التحكم
        </button>
      </Link>
    </div>
  );
}