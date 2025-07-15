// src/pages/NewCostumes.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getNewCostumes, getCategories, Costume } from '../data/costumes';

const NewCostumes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const newCostumes = getNewCostumes();
  const categories = getCategories();

  // Filtreleme ve sıralama
  const filteredAndSortedCostumes = useMemo(() => {
    let filtered = newCostumes;

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(costume => costume.category === selectedCategory);
    }

    // Sıralama
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₺', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₺', '').replace(',', ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₺', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₺', '').replace(',', ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [newCostumes, selectedCategory, sortBy]);

  const CostumeCard: React.FC<{ costume: Costume }> = ({ costume }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div className="costume-card" style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      >
        {/* Yeni Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: '#10b981',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: '600',
          padding: '0.25rem 0.5rem',
          borderRadius: '6px',
          zIndex: 2
        }}>
          YENİ
        </div>

        {/* İndirim Badge */}
        {costume.isOnSale && costume.discount && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            zIndex: 2
          }}>
            %{costume.discount}
          </div>
        )}

        {/* Kostüm Görseli */}
        <Link to={`/costumes/${costume.id}`} style={{ textDecoration: 'none' }}>
          <div style={{
            width: '100%',
            height: '250px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            marginBottom: '1rem',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {!imageError ? (
              <img 
                src={`${process.env.PUBLIC_URL}/${costume.image}`}
                alt={costume.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onError={() => setImageError(true)}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '1rem'
              }}>
                {costume.name}
              </div>
            )}
          </div>
        </Link>

        {/* Kostüm Bilgileri */}
        <div>
          <Link to={`/costumes/${costume.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.5rem',
              lineHeight: '1.4'
            }}>
              {costume.name}
            </h3>
          </Link>

          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '0.5rem'
          }}>
            {costume.category}
          </p>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              {'★'.repeat(Math.floor(costume.rating))}
              {'☆'.repeat(5 - Math.floor(costume.rating))}
            </div>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              ({costume.reviewCount})
            </span>
          </div>

          {/* Fiyat */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              {costume.price}
            </span>
            {costume.originalPrice && (
              <span style={{
                fontSize: '1rem',
                color: '#6b7280',
                textDecoration: 'line-through'
              }}>
                {costume.originalPrice}
              </span>
            )}
          </div>

          {/* Sepete Ekle Butonu */}
          <button style={{
            width: '100%',
            backgroundColor: '#ea580c',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ea580c';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
    }}>
      {/* Sayfa Başlığı */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          En Yeni Kostümler
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Koleksiyonumuza yeni eklenen kostümleri keşfedin. Her biri özenle seçilmiş ve tasarlanmıştır.
        </p>
      </div>

      {/* Filtreler ve Sıralama */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Sol taraf - Filtreler */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Kategori Filtresi */}
          <div>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginRight: '0.5rem'
            }}>
              Kategori:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
                color: '#374151',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sıralama */}
          <div>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginRight: '0.5rem'
            }}>
              Sırala:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
                color: '#374151',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="newest">En Yeni</option>
              <option value="price-low">Fiyat (Düşük-Yüksek)</option>
              <option value="price-high">Fiyat (Yüksek-Düşük)</option>
              <option value="rating">En Yüksek Puan</option>
            </select>
          </div>
        </div>

        {/* Sağ taraf - Görünüm ve Sonuç Sayısı */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            {filteredAndSortedCostumes.length} kostüm bulundu
          </span>

          {/* Görünüm Modları */}
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem',
                backgroundColor: viewMode === 'grid' ? '#ea580c' : '#f3f4f6',
                color: viewMode === 'grid' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Grid Görünümü"
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem',
                backgroundColor: viewMode === 'list' ? '#ea580c' : '#f3f4f6',
                color: viewMode === 'list' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Liste Görünümü"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Kostüm Listesi */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' 
          ? 'repeat(auto-fill, minmax(280px, 1fr))'
          : '1fr',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {filteredAndSortedCostumes.map(costume => (
          <CostumeCard key={costume.id} costume={costume} />
        ))}
      </div>

      {/* Boş Durum */}
      {filteredAndSortedCostumes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#6b7280'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Kostüm bulunamadı
          </h3>
          <p style={{
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            Seçtiğiniz filtrelere uygun kostüm bulunamadı. Filtreleri değiştirmeyi deneyin.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('newest');
            }}
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCostumes;