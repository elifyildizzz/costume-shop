import { CartItem, Costume } from '../types';

class CartService {
  private storageKey = 'costume-cart';

  // Sepeti localStorage'dan al
  getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(this.storageKey);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart from localStorage:', error);
      return [];
    }
  }

  // Sepeti localStorage'a kaydet
  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Sepete ürün ekle
  addToCart(costume: Costume, size: string, quantity: number = 1, rentalDays: number = 1, startDate: string, endDate: string): CartItem[] {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(
      item => item.costume.id === costume.id && item.size === size && item.startDate === startDate
    );

    if (existingItemIndex > -1) {
      // Mevcut ürün varsa miktarını artır
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Yeni ürün ekle
      const newItem: CartItem = {
        id: `${costume.id}-${size}-${startDate}-${Date.now()}`,
        costume,
        size,
        quantity,
        rentalDays,
        startDate,
        endDate
      };
      cart.push(newItem);
    }

    this.saveCart(cart);
    return cart;
  }

  // Sepetten ürün çıkar
  removeFromCart(itemId: string): CartItem[] {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Ürün miktarını güncelle
  updateQuantity(itemId: string, quantity: number): CartItem[] {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Miktar 0 veya daha azsa ürünü kaldır
        return this.removeFromCart(itemId);
      } else {
        cart[itemIndex].quantity = quantity;
        this.saveCart(cart);
      }
    }
    
    return cart;
  }

  // Sepeti temizle
  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Sepet toplam fiyatını hesapla
  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      const price = parseFloat(item.costume.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      return total + (price * item.quantity * item.rentalDays);
    }, 0);
  }

  // Sepetteki toplam ürün sayısını al
  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Belirli bir kostümün sepette olup olmadığını kontrol et
  isInCart(costumeId: string, size: string, startDate: string): boolean {
    const cart = this.getCart();
    return cart.some(item => 
      String(item.costume.id) === String(costumeId) && 
      item.size === size && 
      item.startDate === startDate
    );
  }

  private parsePrice(price: string): number {
    return parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  }
}

export const cartService = new CartService();