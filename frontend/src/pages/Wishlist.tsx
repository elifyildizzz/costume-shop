import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import FavoriteService, { Favorite } from '../services/FavoriteService';

const Wishlist: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSizeIndex, setOpenSizeIndex] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const favs = await FavoriteService.getFavorites(token);
          setFavorites(favs);
        }
      } catch (e) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user, navigate]);

  if (!user) return null;

  const handleRemoveFavorite = async (fav: Favorite) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      // Hem kostüm hem de aksesuar için çalışacak şekilde güncellendi
      await FavoriteService.removeFavorite({ 
        token, 
        costumeId: fav.costumeId, 
        accessoryId: fav.accessoryId 
      });
      setFavorites(favorites.filter(f => f.id !== fav.id));
    } catch (e) {
      // Hata yönetimi
      console.error('Favori silme hatası:', e);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '1.6rem',
          letterSpacing: '0.01em',
          textAlign: 'left',
          marginBottom: '2.5rem',
          textTransform: 'none'
        }}>Favorilerim</h1>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : favorites.length === 0 ? (
          <div className="text-gray-500">Henüz favori ürününüz yok.</div>
        ) : (
          <div className="newcostumes-grid">
            {favorites.map((fav, idx) => (
              <div key={fav.id} className="newcostumes-card" style={{ position: 'relative' }}>
                <Link 
                  to={fav.costume ? `/costume/${fav.costume.id}` : `/accessories/${fav.accessory?.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="newcostumes-image-container">
                    <img
                      src={fav.costume?.image || fav.accessory?.image}
                      alt={fav.costume?.name || fav.accessory?.name}
                    />
                  </div>
                  <div className="newcostumes-info">
                    <div className="text-black text-base font-normal leading-tight">
                      {fav.costume?.name || fav.accessory?.name}
                    </div>
                    <div className="text-black text-lg font-bold">
                      {fav.costume?.price || fav.accessory?.price}
                    </div>
                    {/* Kostüm bedenleri */}
                    {fav.costume?.size && (
                      <div className="beden-row">
                        <span className="text-xs text-gray-400 mr-2 cursor-pointer" onClick={(e) => {
                          e.preventDefault();
                          setOpenSizeIndex(openSizeIndex === idx ? null : idx);
                        }}>Beden seç</span>
                        {openSizeIndex === idx && fav.costume.size && fav.costume.size.length > 0 && (
                          fav.costume.size.split(',').map((size: string, sidx: number) => (
                            <span key={sidx} className="size-box">{size}</span>
                          ))
                        )}
                      </div>
                    )}
                    {/* Aksesuar bedenleri */}
                    {fav.accessory?.size && (
                      <div className="beden-row">
                        <span className="text-xs text-gray-400 mr-2 cursor-pointer" onClick={(e) => {
                          e.preventDefault();
                          setOpenSizeIndex(openSizeIndex === idx ? null : idx);
                        }}>Beden seç</span>
                        {openSizeIndex === idx && fav.accessory.size && fav.accessory.size.length > 0 && (
                          fav.accessory.size.map((size: string, sidx: number) => (
                            <span key={sidx} className="size-box">{size}</span>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </Link>
                <span
                  style={{ position: 'absolute', right: 12, bottom: 12, zIndex: 10 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(fav);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="#ef4444"
                    stroke="#ef4444"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 