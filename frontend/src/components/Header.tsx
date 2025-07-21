import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '80px' }}>
          {/* Sol taraf - Boş alan (Desktop) */}
          <div style={{ flex: '1' }} className="hidden md:block"></div>
          
          {/* Orta - Logo */}
          <div className="logo-container" style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
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

          {/* Sağ taraf - Arama + Kullanıcı menüsü */}
          <div className="user-menu" style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
            {/* Arama Alanı */}
            <div className="search-container" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Arama..."
                style={{ 
                  border: '1px solid #d1d5db',
                  borderRadius: '9999px',
                  background: '#f9fafb',
                  fontSize: '14px',
                  padding: '0.5rem 2.5rem 0.5rem 1rem',
                  width: '160px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLButtonElement).style.color = '#ea580c';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.color = '#6b7280';
                }}
              >
                🔍
              </button>
            </div>

            {/* Kullanıcı Menüsü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {user ? (
                <>
                  <span className="hidden lg:inline" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Merhaba, <span style={{ fontWeight: '500', color: '#1f2937' }}>{user.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'color 0.2s ease'
                    }}
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
                <>
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
                  <span style={{ color: '#d1d5db', margin: '0 0.5rem' }} className="hidden sm:inline">|</span>
                  <Link 
                    to="/register" 
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: 'color 0.2s ease',
                      marginRight: '16px'
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
                  
                  {/* Favoriler */}
                  <Link 
                    to="/wishlist" 
                    style={{ 
                      fontSize: '1.25rem', 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      marginRight: '18px'
                    }}
                    title="Favoriler"
                    onMouseOver={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#ef4444';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#6b7280';
                    }}
                  >
                    ♡
                  </Link>
                  
                  {/* Sepet */}
                  <Link 
                    to="/cart" 
                    style={{ 
                      fontSize: '1.25rem', 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      position: 'relative',
                      transition: 'color 0.2s ease',
                      marginRight: '0px',
                      marginLeft: '2px'
                    }}
                    title="Sepet"
                    onMouseOver={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#ea580c';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLAnchorElement).style.color = '#6b7280';
                    }}
                  >
                    🛒
                    {getTotalItems() > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontSize: '0.75rem',
                        borderRadius: '50%',
                        height: '20px',
                        width: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '500'
                      }}>
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>


{/* Navigasyon Menüsü */}
<div className="border-t border-gray-200 bg-white">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-3">
    <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
      <Link 
        to="/new-costumes"  // Düzeltildi: /en-yeniler yerine /new-costumes
        className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 tracking-wide whitespace-nowrap py-2 px-1 border-b-2 border-transparent hover:border-orange-600"
      >
        EN YENİLER
      </Link>
      <Link 
        to="/costumes"  // Düzeltildi: /kostumler yerine /costumes
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