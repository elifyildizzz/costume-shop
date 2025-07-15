// src/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { CartItem, Costume } from '../types';
import { cartService } from '../services/CartService';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sepeti yükle
  const loadCart = () => {
    setIsLoading(true);
    try {
      const cartData = cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Component mount olduğunda sepeti yükle
  useEffect(() => {
    loadCart();
  }, []);

  // Sepete ürün ekle
  const addToCart = (
    costume: Costume,
    size: string,
    quantity: number = 1,
    rentalDays: number = 1,
    startDate: string,
    endDate: string
  ) => {
    try {
      const updatedCart = cartService.addToCart(costume, size, quantity, rentalDays, startDate, endDate);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  // Sepetten ürün çıkar
  const removeFromCart = (itemId: string) => {
    try {
      const updatedCart = cartService.removeFromCart(itemId);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  // Ürün miktarını güncelle
  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      const updatedCart = cartService.updateQuantity(itemId, quantity);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  };

  // Sepeti temizle
  const clearCart = () => {
    try {
      cartService.clearCart();
      setCart([]);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  // Sepet toplam fiyatını hesapla
  const getCartTotal = () => {
    return cartService.getCartTotal();
  };

  // Sepetteki toplam ürün sayısını al
  const getCartItemCount = () => {
    return cartService.getCartItemCount();
  };

  // Belirli bir kostümün sepette olup olmadığını kontrol et
  const isInCart = (costumeId: string, size: string, startDate: string) => {
    return cartService.isInCart(costumeId, size, startDate);
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    refreshCart: loadCart,
  };
};