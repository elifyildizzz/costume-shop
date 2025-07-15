// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { Order, CartItem } from '../types';
import { apiService } from '../services/ApiService';

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getOrders(userId);
      
      if (response.success) {
        setOrders(response.data);
      } else {
        setError(response.message || 'Siparişler yüklenirken bir hata oluştu');
      }
    } catch (err) {
      setError('Siparişler yüklenirken bir hata oluştu');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    items: CartItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
  }) => {
    try {
      setLoading(true);
      const response = await apiService.createOrder({
        ...orderData,
        userId: userId!,
        status: 'pending'
      });
      
      if (response.success) {
        // Siparişleri yeniden yükle
        await fetchOrders();
        return response.data;
      } else {
        throw new Error(response.message || 'Sipariş oluşturulurken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      const response = await apiService.getOrderById(orderId);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await apiService.updateOrderStatus(orderId, status);
      if (response.success) {
        // Siparişleri yeniden yükle
        await fetchOrders();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return {
    orders,
    loading,
    error,
    createOrder,
    getOrderById,
    updateOrderStatus,
    refreshOrders: fetchOrders
  };
};