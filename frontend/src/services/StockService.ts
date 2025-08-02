import axios from 'axios';
import { API_URL } from '../config';

const API_BASE = `${API_URL}/api`;

export interface StockItem {
  id: number;
  size: string;
  quantity: number;
  available: boolean;
}

export interface AvailabilityItem {
  size: string;
  available: boolean;
  quantity: number;
}

export class StockService {
  
  // Kostüm stok durumunu getir
  static async getCostumeStock(costumeId: number): Promise<StockItem[]> {
    try {
      const res = await axios.get(`${API_BASE}/stock/costume/${costumeId}`);
      return res.data.stock;
    } catch (error) {
      console.error('Kostüm stok durumu alınamadı:', error);
      return [];
    }
  }

  // Aksesuar stok durumunu getir
  static async getAccessoryStock(accessoryId: number): Promise<StockItem[]> {
    try {
      const res = await axios.get(`${API_BASE}/stock/accessory/${accessoryId}`);
      return res.data.stock;
    } catch (error) {
      console.error('Aksesuar stok durumu alınamadı:', error);
      return [];
    }
  }

  // Kostüm için stok durumunu kontrol et
  static async checkCostumeAvailability(costumeId: number): Promise<AvailabilityItem[]> {
    try {
      const res = await axios.get(`${API_BASE}/stock/costume/${costumeId}/availability`);
      return res.data.availability;
    } catch (error) {
      console.error('Kostüm stok durumu kontrol edilemedi:', error);
      // Fallback: Simüle edilmiş stok durumu
      return [
        { size: 'S', available: Math.random() > 0.3, quantity: Math.floor(Math.random() * 3) },
        { size: 'M', available: Math.random() > 0.3, quantity: Math.floor(Math.random() * 3) },
        { size: 'L', available: Math.random() > 0.3, quantity: Math.floor(Math.random() * 3) }
      ];
    }
  }

  // Aksesuar için stok durumunu kontrol et
  static async checkAccessoryAvailability(accessoryId: number): Promise<AvailabilityItem[]> {
    try {
      const res = await axios.get(`${API_BASE}/stock/accessory/${accessoryId}/availability`);
      return res.data.availability;
    } catch (error) {
      console.error('Aksesuar stok durumu kontrol edilemedi:', error);
      // Fallback: Simüle edilmiş stok durumu
      return [
        { size: 'standart', available: Math.random() > 0.2, quantity: Math.floor(Math.random() * 5) }
      ];
    }
  }
}

export default StockService; 