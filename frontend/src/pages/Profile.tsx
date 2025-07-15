import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Profil güncelleme işlemi burada yapılacak
    alert('Profil bilgileri güncellendi!');
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    alert('Çıkış yapıldı');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profil</h1>
        <p>Profil sayfasına erişmek için giriş yapmalısınız.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profil</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Profil Bilgileri</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editMode ? 'İptal' : 'Düzenle'}
            </button>
          </div>
          
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Adres</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Şehir</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Posta Kodu</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Kaydet
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Ad Soyad</label>
                <p className="text-lg">{formData.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg">{formData.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Telefon</label>
                <p className="text-lg">{formData.phone || 'Belirtilmemiş'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Adres</label>
                <p className="text-lg">{formData.address || 'Belirtilmemiş'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Şehir</label>
                  <p className="text-lg">{formData.city || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Posta Kodu</label>
                  <p className="text-lg">{formData.postalCode || 'Belirtilmemiş'}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;