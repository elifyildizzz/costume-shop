import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await login(email, password);
      setSuccessMessage('Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...');
      setTimeout(() => {
      navigate('/');
      }, 1500);
    } catch (err: any) {
      // Daha detaylı hata mesajları
      if (err.message) {
        if (err.message.includes('Kullanıcı bulunamadı')) {
          setError('Bu email adresi ile kayıtlı kullanıcı bulunamadı. Lütfen kayıt olun.');
        } else if (err.message.includes('Şifre yanlış')) {
          setError('Şifre yanlış. Lütfen tekrar deneyin.');
        } else if (err.message.includes('Email ve şifre zorunludur')) {
          setError('Email ve şifre alanları zorunludur.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: '#fff', paddingTop: '48px' }}>
      <div className="contact-form-box">
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.6rem', marginBottom: '1.5rem', color: '#1a202c' }}>Giriş Yap</h2>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        {successMessage && (
          <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
            {successMessage}
            </div>
            )}
        <form onSubmit={handleLogin}>
          <label>Email</label>
                <input
                  type="email"
            name="email"
                  value={email}
            onChange={e => setEmail(e.target.value)}
                  required
                />
          <label>Şifre</label>
                <input
                  type="password"
            name="password"
                  value={password}
            onChange={e => setPassword(e.target.value)}
                  required
                />
          <button type="submit" disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#444' }}>
          Hesabınız yok mu?{' '}
          <Link to="/register" style={{ color: '#668A69', fontWeight: 600 }}>Kayıt olun</Link>
            </p>
      </div>
    </div>
  );
}