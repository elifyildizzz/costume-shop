import { Costume } from '../models/Costume';
import { PrismaClient } from '@prisma/client';

export class CostumeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCostumes(filters: {
    category?: string;
    size?: string;
    color?: string;
    type?: 'sale' | 'rent';
  }): Promise<Costume[]> {
    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.color) {
      where.color = filters.color;
    }

    if (filters.type === 'sale') {
      where.isForSale = true;
    } else if (filters.type === 'rent') {
      where.isForRent = true;
    }

    if (filters.size) {
      where.size = {
        has: filters.size
      };
    }

    const costumes = await this.prisma.costume.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return costumes;
  }

  public async getCostumeById(id: string): Promise<Costume> {
    const costume = await this.prisma.costume.findUnique({
      where: { id }
    });

    if (!costume) {
      throw new Error('Kostüm bulunamadı');
    }

    return costume;
  }

  public async createCostume(costumeData: Partial<Costume>): Promise<Costume> {
    const costume = await this.prisma.costume.create({
      data: costumeData
    });

    return costume;
  }
}