import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FavoriteService {
  // Favori ekle (kostüm veya aksesuar) - Toggle mantığı
  async addFavorite(userId: number, costumeId?: number, accessoryId?: number) {
    if (!costumeId && !accessoryId) {
      throw new Error('Kostüm veya aksesuar ID gerekli.');
    }
    // Aynı favori zaten var mı kontrolü
    const existing = await prisma.favorite.findFirst({
      where: {
        userId,
        costumeId: costumeId || null,
        accessoryId: accessoryId || null,
      },
    });
    if (existing) {
      // Eğer favori zaten varsa, onu sil (toggle)
      return prisma.favorite.delete({
        where: { id: existing.id },
      });
    }
    // Favori yoksa, ekle
    return prisma.favorite.create({
      data: {
        userId,
        costumeId: costumeId || null,
        accessoryId: accessoryId || null,
      },
    });
  }

  // Favori sil (kostüm veya aksesuar)
  async removeFavorite(userId: number, costumeId?: number, accessoryId?: number) {
    if (!costumeId && !accessoryId) {
      throw new Error('Kostüm veya aksesuar ID gerekli.');
    }
    return prisma.favorite.deleteMany({
      where: {
        userId,
        costumeId: costumeId || null,
        accessoryId: accessoryId || null,
      },
    });
  }

  // Kullanıcının favorilerini getir
  async getFavorites(userId: number) {
    return prisma.favorite.findMany({
      where: { userId },
      include: {
        costume: true,
        accessory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
} 