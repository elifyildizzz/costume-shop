import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div style={{ fontSize: 80, color: 'green', marginBottom: 24 }}>✔️</div>
      <h1 style={{ fontSize: '2.8rem', fontFamily: 'Playfair Display, serif', marginBottom: 16 }}>HOŞGELDİNİZ</h1>
      <div style={{ fontSize: '1.5rem', marginBottom: 24 }}>
        Yeni Üyelik İşleminiz Başarıyla Kaydedildi!
      </div>
      <div style={{ fontSize: '1.2rem', marginBottom: 32 }}>
        E-posta adresinizi ve şifrenizi yazarak giriş yapabilirsiniz.<br />
        Teşekkür ederiz
      </div>
      <button
        style={{
          background: '#d9534f',
          color: 'white',
          fontSize: '1.2rem',
          padding: '1rem 2.5rem',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginRight: 16
        }}
        onClick={() => navigate('/')}
      >
        &lt;&lt; Anasayfaya Geri Dön
      </button>
      <button
        style={{
          background: '#668A69',
          color: 'white',
          fontSize: '1.2rem',
          padding: '1rem 2.5rem',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/login')}
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default Welcome;
