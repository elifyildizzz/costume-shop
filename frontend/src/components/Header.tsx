import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/costumes?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="bg-white text-black shadow-sm border-b">
      {/* Üst Bant - Kargo Yazısı */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 text-sm border-b border-orange-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2 text-orange-800">
              <span className="text-orange-600">📦</span>
              <span className="font-medium">1000₺ ve Üzeri Alışverişlerinizde Kargo Bedava</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Header */}
      <div style={{ maxWidth: '100%', margin: '0', padding: '1.5rem 2rem' }}>
        {/* Logo Satırı */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
          <div className="logo-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img 
                src="/logo.png" 
                alt="Kostüm Akademi Logo" 
                style={{ height: '120px', width: 'auto', transition: 'transform 0.3s ease' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('logo.png')) {
                    target.src = '/logo.jpg';
                  }
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
            </Link>
          </div>
          </div>

        {/* Arama + Kullanıcı Kontrolleri Satırı */}
        <div className="header-controls-container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', paddingRight: '0', width: '100%' }}>
          {/* Arama - Sağda */}
          <div className="search-container-top" style={{ marginRight: '0.5rem' }}>
            <form
              className="search-form-override"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                margin: '0'
              }}
              onSubmit={handleSearch}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <input
                  type="text"
                  placeholder="Arama..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ 
                    border: '1px solid #d1d5db',
                    borderRadius: '9999px',
                    background: '#f9fafb',
                    fontSize: '14px',
                    padding: '0.5rem 2.2rem 0.5rem 1rem',
                    width: '200px',
                    height: '40px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ea580c';
                    e.target.style.boxShadow = '0 0 0 2px rgba(234, 88, 12, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    transition: 'all 0.2s ease',
                    padding: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '28px',
                    width: '28px',
                    borderRadius: '50%',
                    zIndex: 1
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.color = '#ea580c';
                    (e.target as HTMLButtonElement).style.background = '#f3f4f6';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.color = '#6b7280';
                    (e.target as HTMLButtonElement).style.background = 'none';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Kullanıcı Kontrolleri - Sağda */}
          <div className="user-controls-bottom" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
              {user ? (
                <>
                {/* Kullanıcı Selamlaması */}
                <span className="user-greeting">
                  Merhaba, <span style={{ fontWeight: 700 }}>{user.firstName} {user.lastName?.split(' ')[0]}</span>
                  </span>

                {/* Dikey Çizgi */}
                <div className="vertical-divider"></div>

                {/* Favoriler Butonu */}
                <button
                  onClick={() => navigate('/wishlist')}
                  title="Favorilerim"
                  className="favorite-button"
                  onMouseOver={e => (e.currentTarget.style.color = '#ef4444')}
                  onMouseOut={e => (e.currentTarget.style.color = '#000')}
                >
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Dikey Çizgi */}
                <div className="vertical-divider"></div>

                {/* Çıkış Butonu */}
                  <button
                    onClick={handleLogout}
                  className="logout-button"
                    onMouseOver={(e) => {
                      (e.target as HTMLButtonElement).style.color = '#ea580c';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLButtonElement).style.color = '#6b7280';
                    }}
                  >
                    Çıkış
                  </button>
                </>
              ) : (
              <div className="guest-controls">
                  <Link 
                    to="/login" 
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#ea580c';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#6b7280';
                    }}
                  >
                    Üye Girişi
                  </Link>
                  <span style={{ color: '#d1d5db', margin: '0 0.3rem', fontSize: '1.1rem' }}>|</span>
                  <Link 
                    to="/register" 
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      fontWeight: '500',
                    transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#ea580c';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#6b7280';
                    }}
                  >
                    Üye Ol
                  </Link>
                {/* Dikey çizgi */}
                  <span style={{
                    display: 'inline-block',
                    width: '1px',
                    height: '16px',
                    background: '#e5e7eb',
                    margin: '0 0.3rem',
                    verticalAlign: 'middle'
                  }} />
                  {/* Favoriler */}
                  <button
                    type="button"
                    style={{ 
                      fontSize: '1.15rem',
                      color: '#6b7280', 
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      verticalAlign: 'middle',
                      padding: 0,
                      lineHeight: 1,
                      height: '20px',
                      position: 'relative',
                      top: '2px'
                    }}
                    title="Favorilerim"
                    onClick={() => {
                      if (user) {
                        navigate('/wishlist');
                      } else {
                        navigate('/login');
                      }
                    }}
                    aria-label="Favorilerim"
                    onMouseOver={e => (e.currentTarget.style.color = '#ef4444')}
                    onMouseOut={e => (e.currentTarget.style.color = '#6b7280')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
              </div>
              )}
          </div>
        </div>
      </div>

{/* Navigasyon Menüsü */}
<div className="border-t border-gray-200 bg-white">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3">
    <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
      <Link 
              to="/new-costumes"
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        EN YENİLER
      </Link>
      <Link 
              to="/costumes"
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        KOSTÜMLER
      </Link>
      <Link 
        to="/aksesuarlar" 
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        AKSESUARLAR
      </Link>
      <Link 
        to="/blog" 
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        BLOG
      </Link>
      <Link 
        to="/galeri" 
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        GALERİ
      </Link>
      <Link 
        to="/indirim" 
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        İNDİRİM
      </Link>
      <Link 
        to="/contact" 
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        İLETİŞİM
      </Link>
    </nav>
  </div>
</div>
    </header>
  );
};

export default Header;