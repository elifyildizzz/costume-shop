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

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Favorilerim</h1>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : favorites.length === 0 ? (
          <div className="text-gray-500">Henüz favori ürününüz yok.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="border rounded-lg p-4 flex flex-col items-center bg-gray-50">
                {fav.costume ? (
                  <>
                    <img src={fav.costume.image} alt={fav.costume.name} className="w-32 h-32 object-cover rounded mb-2" />
                    <div className="font-semibold">{fav.costume.name}</div>
                    <div className="text-green-700 font-bold">{fav.costume.price}</div>
                  </>
                ) : fav.accessory ? (
                  <>
                    <img src={fav.accessory.image} alt={fav.accessory.name} className="w-32 h-32 object-cover rounded mb-2" />
                    <div className="font-semibold">{fav.accessory.name}</div>
                    <div className="text-green-700 font-bold">{fav.accessory.price}</div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 