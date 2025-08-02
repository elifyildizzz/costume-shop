import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StockService {
  
  // Kostüm stok durumunu getir - basit versiyon
  async getCostumeStock(costumeId: number) {
    try {
      // Basit bir stok simülasyonu
      const costume = await prisma.costume.findUnique({
        where: { id: costumeId }
      });

      if (!costume) {
        return [];
      }

      // Kostümün bedenlerini parse et
      const sizes = costume.size.split(',').map(s => s.trim());
      
      // Her beden için rastgele stok durumu
      return sizes.map(size => ({
        id: Math.random(),
        costumeId,
        size,
        quantity: Math.floor(Math.random() * 3), // 0-2 arası
        available: Math.random() > 0.3 // %70 ihtimal stokta var
      }));
    } catch (error) {
      console.error('Stok durumu alınamadı:', error);
      return [];
    }
  }

  // Aksesuar stok durumunu getir - basit versiyon
  async getAccessoryStock(accessoryId: number) {
    try {
      // Basit bir stok simülasyonu
      return [{
        id: Math.random(),
        accessoryId,
        size: 'standart',
        quantity: Math.floor(Math.random() * 5), // 0-4 arası
        available: Math.random() > 0.2 // %80 ihtimal stokta var
      }];
    } catch (error) {
      console.error('Stok durumu alınamadı:', error);
      return [];
    }
  }

  // Kostüm için stok durumunu kontrol et
  async checkCostumeAvailability(costumeId: number) {
    try {
      const costume = await prisma.costume.findUnique({
        where: { id: costumeId }
      });

      if (!costume) {
        return [];
      }

      const sizes = costume.size.split(',').map(s => s.trim());
      
      return sizes.map(size => ({
        size,
        available: Math.random() > 0.3, // %70 ihtimal stokta var
        quantity: Math.floor(Math.random() * 3)
      }));
    } catch (error) {
      console.error('Stok durumu kontrol edilemedi:', error);
      return [];
    }
  }

  // Aksesuar için stok durumunu kontrol et
  async checkAccessoryAvailability(accessoryId: number) {
    try {
      return [{
        size: 'standart',
        available: Math.random() > 0.2, // %80 ihtimal stokta var
        quantity: Math.floor(Math.random() * 5)
      }];
    } catch (error) {
      console.error('Stok durumu kontrol edilemedi:', error);
      return [];
    }
  }
} 