import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import FavoriteService from '../services/FavoriteService';
import StockService, { AvailabilityItem } from '../services/StockService';
import costumesData from '../data/Costumes.json';

interface Costume {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
  size: string[];
}

const CostumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [costume, setCostume] = useState<Costume | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stockAvailability, setStockAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    if (id) {
      const foundCostume = costumesData.costumes.find(c => c.id === parseInt(id));
      if (foundCostume) {
        setCostume(foundCostume);
        checkFavoriteStatus(foundCostume.id);
        checkStockAvailability(foundCostume.id);
      }
      setLoading(false);
    }
  }, [id]);

  const checkFavoriteStatus = async (costumeId: number) => {
    if (!user) return;
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const favorites = await FavoriteService.getFavorites(token);
        const isFav = favorites.some(fav => fav.costumeId === costumeId);
        setIsFavorite(isFav);
      }
    } catch (e) {
      console.error('Favori durumu kontrol edilemedi:', e);
    }
  };

  const checkStockAvailability = async (costumeId: number) => {
    try {
      const availability = await StockService.checkCostumeAvailability(costumeId);
      setStockAvailability(availability);
    } catch (e) {
      console.error('Stok durumu alınamadı:', e);
      if (costume) {
        const fallbackAvailability = costume.size.map(size => ({
          size,
          available: true,
          quantity: 1
        }));
        setStockAvailability(fallbackAvailability);
      }
    }
  };

  const handleFavoriteToggle = async () => {
    console.log('=== FAVORI TOGGLE DEBUG ===');
    console.log('User:', user);
    console.log('Costume:', costume);
    console.log('IsFavorite:', isFavorite);
    
    if (!user) {
      console.log('User yok, login sayfasına yönlendiriliyor');
      navigate('/login');
      return;
    }
    if (!costume) {
      console.log('Costume yok');
      return;
    }

    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    
    if (!token) {
      console.log('Token yok, login sayfasına yönlendiriliyor');
      navigate('/login');
      return;
    }

    try {
      console.log('Favori toggle işlemi...');
      console.log('Gönderilen data:', { token, costumeId: costume.id });
      await FavoriteService.addFavorite({ token, costumeId: costume.id });
      
      // Toggle işlemi başarılı, state'i tersine çevir
      setIsFavorite(!isFavorite);
      console.log('Favori toggle başarılı, yeni durum:', !isFavorite);
    } catch (e: any) {
      console.error('Favori işlemi başarısız:', e);
      console.error('Error response:', e.response);
      console.error('Error status:', e.response?.status);
      console.error('Error data:', e.response?.data);
      
      // Token geçersizse kullanıcıyı logout yap
      if (e.response?.status === 401) {
        console.log('401 hatası, token siliniyor ve login sayfasına yönlendiriliyor');
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  if (!costume) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          Kostüm bulunamadı
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
    }}>
      {/* Geri Butonu - Üstte Minimal */}
      <div style={{
        padding: '1rem 0 0 2rem'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Geri
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '2rem 0',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          gap: '5rem',
          alignItems: 'flex-start',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}>
          {/* Left Side - Image */}
          <div style={{
            flexShrink: 0,
            width: '600px'
          }}>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: '#f3f4f6',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              width: '100%'
            }}>
              <img 
                src={costume.image} 
                alt={costume.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            paddingLeft: '5rem'
          }}>
            {/* Title and Favorite */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#111827',
                lineHeight: '1.2',
                margin: 0,
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                {costume.name}
              </h1>
              <button
                onClick={handleFavoriteToggle}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg 
                  width="28" 
                  height="28" 
                  fill={isFavorite ? '#ef4444' : 'none'} 
                  stroke={isFavorite ? '#ef4444' : '#6b7280'} 
                  viewBox="0 0 24 24" 
                  strokeWidth={2}
                  style={{
                    transition: 'all 0.2s ease'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Price */}
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              {costume.price}
            </div>

            {/* Colors */}
            <div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem',
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                Renkler
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                {costume.colors.map((color, index) => (
                  <span 
                    key={index}
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '25px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      border: '1px solid #e5e7eb',
                      fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1.5rem',
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                BEDEN SEÇENEKLERİ
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {costume.size.map((size) => {
                  const stockItem = stockAvailability.find(item => item.size === size);
                  const isAvailable = stockItem ? stockItem.available : true;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(selectedSize === size ? null : size)}
                      disabled={!isAvailable}
                      style={{
                        padding: '0.5rem 1rem',
                        border: selectedSize === size ? '2px solid #111827' : '2px solid #e5e7eb',
                        borderRadius: '6px',
                        backgroundColor: selectedSize === size ? '#111827' : '#ffffff',
                        color: selectedSize === size ? '#ffffff' : isAvailable ? '#111827' : '#9ca3af',
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif',
                        minWidth: '60px'
                      }}
                      onMouseOver={(e) => {
                        if (isAvailable && selectedSize !== size) {
                          e.currentTarget.style.borderColor = '#d1d5db';
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedSize !== size) {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }
                      }}
                    >
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                      }}>
                        {size}
                      </div>
                      <div style={{
                        fontSize: '0.6rem',
                        opacity: 0.8,
                        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                      }}>
                        {isAvailable ? 'Stokta' : 'Stokta Yok'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.5rem',
              marginTop: '1rem'
            }}>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem',
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                Bu kostümü kiralamak için bizimle iletişime geçin:
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.85rem',
                color: '#4b5563',
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📞</span>
                  <span>+90 537 455 00</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📧</span>
                  <span>info@kostumakademi.com</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span>📍</span>
                  <span>Uluç mahallesi 1150. sokak villa ayzade no:22/5 Konyaaltı Antalya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CostumeDetail };