import { PrismaClient, Costume } from '@prisma/client';

export class CostumeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCostumes(filters: {
    name?: string;
    color?: string;
    size?: string;
  }): Promise<Costume[]> {
    const where: any = {};

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters.color) {
      // colors alanı virgül ile ayrılmış string, filtreleme için LIKE kullanılır
      where.colors = { contains: filters.color };
    }

    if (filters.size) {
      where.size = { contains: filters.size };
    }

    const costumes = await this.prisma.costume.findMany({
      where
    });

    return costumes;
  }

  public async getCostumeById(id: number): Promise<Costume> {
    const costume = await this.prisma.costume.findUnique({
      where: { id }
    });

    if (!costume) {
      throw new Error('Kostüm bulunamadı');
    }

    return costume;
  }

  public async createCostume(costumeData: Omit<Costume, 'id'>): Promise<Costume> {
    const costume = await this.prisma.costume.create({
      data: costumeData
    });

    return costume;
  }
}