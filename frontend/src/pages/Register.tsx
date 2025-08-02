// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios'; // Added axios import
import { API_URL } from '../config'; // Added API_URL import

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Email formatını kontrol et
  const isValidEmail = (email: string): boolean => {
    // Basit email kontrolü
    return email.includes('@') && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Email validasyonu
    if (name === 'email') {
      console.log('Email değişti:', value);
      if (value === '') {
        setEmailError('');
        console.log('Email boş, hata temizlendi');
      } else if (!isValidEmail(value)) {
        setEmailError('Lütfen geçerli bir email adresi girin.');
        console.log('Geçersiz email formatı, hata ayarlandı');
      } else {
        setEmailError('');
        console.log('Geçerli email formatı, hata temizlendi');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Test için basit hata mesajı
    console.log('Form gönderiliyor...', formData);

    // Email formatını kontrol et
    if (!isValidEmail(formData.email)) {
      setEmailError('Lütfen geçerli bir email adresi girin.');
      setLoading(false);
      return;
    }

    // Şifre eşleşmesini kontrol et
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      setLoading(false);
      return;
    }

    // Şifre uzunluğunu kontrol et
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }

    try {
      console.log('API çağrısı yapılıyor:', `${API_URL}/api/auth/register`);
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      });
      console.log('API yanıtı:', response.data);
      
      if (response.data.success) {
        setError('');
        setEmailError('');
        setSuccessMessage('Kayıt başarılı! Hoş geldin emaili gönderildi. Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2 saniye sonra yönlendir
      } else {
        setError(response.data.message || 'Kayıt olurken bir hata oluştu');
      }
    } catch (err: any) {
      console.error('Hata detayları:', err);
      console.error('Response data:', err.response?.data);
      
      if (err.response?.data?.message) {
        // Backend'ten gelen hata mesajlarını kontrol et
        const errorMessage = err.response.data.message;
        console.log('Backend hata mesajı:', errorMessage);
        
        if (errorMessage.includes('Bu email adresi zaten mevcut')) {
          setError('Bu email adresi zaten mevcut. Lütfen farklı bir email adresi kullanın.');
        } else if (errorMessage.includes('Lütfen geçerli bir email adresi girin')) {
          setError('Lütfen geçerli bir email adresi girin.');
        } else if (errorMessage.includes('Tüm alanlar zorunludur')) {
          setError('Tüm alanları doldurun.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: '#fff', paddingTop: '48px' }}>
      <div className="contact-form-box">
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.6rem', marginBottom: '1.5rem', color: '#1a202c' }}>Kayıt Ol</h2>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        {successMessage && (
          <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
            {successMessage}
            </div>
            )}
            <form onSubmit={handleRegister}>
          <label>Ad</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
          <label>Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
          <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  style={{
                    borderColor: emailError ? '#ef4444' : isEmailFocused ? '#668A69' : '#e5e7eb'
                  }}
                  required
                />
                {emailError && (
                  <div style={{ 
                    color: '#ef4444', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem',
                    marginBottom: '0.5rem'
                  }}>
                    {emailError}
                  </div>
                )}
                {/* Debug bilgisi */}
                <div style={{ 
                  color: '#666', 
                  fontSize: '0.75rem', 
                  marginTop: '0.25rem'
                }}>
                  Debug: emailError = "{emailError}", email = "{formData.email}", isValid = {isValidEmail(formData.email) ? 'true' : 'false'}
                </div>
          <label>Şifre</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
          <label>Şifre Tekrar</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
          <button type="submit" disabled={loading}>
                {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
              </button>
            </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#444' }}>
          Zaten hesabınız var mı?{' '}
          <Link to="/login" style={{ color: '#668A69', fontWeight: 600 }}>Giriş yap</Link>
            </p>
      </div>
    </div>
  );
};

export { Register };
