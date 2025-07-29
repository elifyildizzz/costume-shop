import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import FavoriteService, { Favorite } from '../services/FavoriteService';

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

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
      await FavoriteService.removeFavorite({ token, costumeId: fav.costumeId });
      setFavorites(favorites.filter(f => f.id !== fav.id));
    } catch (e) {
      // Hata yönetimi
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
            {favorites.map((fav) => (
              <div key={fav.id} className="newcostumes-card" style={{ position: 'relative' }}>
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
                  {/* Beden seç + beden kutucukları */}
                  {fav.costume?.size && (
                    <div className="beden-row">
                      <span className="text-xs text-gray-400 mr-2">Beden seç</span>
                      {fav.costume.size.split(',').map((size: string, idx: number) => (
                        <span key={idx} className="text-xs text-gray-700 border border-gray-300 rounded px-1 mr-1">{size}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  style={{ position: 'absolute', right: 12, bottom: 12, zIndex: 10 }}
                  onClick={() => handleRemoveFavorite(fav)}
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