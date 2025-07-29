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
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      });
      if (response.data.success) {
        setError(''); // <-- Bunu ekle!
        setSuccessMessage('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/login');
        }, 1500); // 1.5 saniye sonra yönlendir
      } else {
        setError(response.data.message || 'Kayıt olurken bir hata oluştu');
      }
    } catch (err: any) {
      setError('Kayıt olurken bir hata oluştu');
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
                  required
                />
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
