import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: number;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gerçek uygulamada API'den siparişler alınacak
    const mockOrders: Order[] = [
      {
        id: 1,
        date: '2024-01-15',
        total: 299,
        status: 'delivered',
        items: [
          {
            id: 1,
            name: 'Cadı Kostümü',
            price: 299,
            quantity: 1,
            image: '/api/placeholder/150/150'
          }
        ]
      },
      {
        id: 2,
        date: '2024-01-20',
        total: 599,
        status: 'shipped',
        items: [
          {
            id: 2,
            name: 'Vampir Kostümü',
            price: 399,
            quantity: 1,
            image: '/api/placeholder/150/150'
          },
          {
            id: 3,
            name: 'Kahraman Kostümü',
            price: 200,
            quantity: 1,
            image: '/api/placeholder/150/150'
          }
        ]
      }
    ];
    
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'shipped': return 'Kargoda';
      case 'delivered': return 'Teslim Edildi';
      case 'cancelled': return 'İptal Edildi';
      default: return 'Bilinmeyen';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Siparişlerim</h1>
        <p>Siparişlerinizi görmek için giriş yapmalısınız.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Siparişlerim</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Siparişlerim</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Henüz siparişiniz bulunmamaktadır.</p>
          <a
            href="/costumes"
            className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Alışverişe Başla
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Sipariş #{order.id}</h3>
                  <p className="text-gray-600">Tarih: {new Date(order.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <p className="text-lg font-bold mt-2">₺{order.total}</p>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">Adet: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₺{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <button className="text-orange-500 hover:text-orange-600 font-medium">
                  Sipariş Detayı
                </button>
                {order.status === 'delivered' && (
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Tekrar Sipariş Ver
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;