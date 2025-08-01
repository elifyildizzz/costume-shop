import costumesData from '../data/Costumes.json';
import newCostumesData from '../data/NewCostumes.json';
import { Costume } from '../types/index';

export interface CostumeFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  colors?: string[];
  isNew?: boolean;
}

export interface SortOptions {
  sortBy: 'newest' | 'price-low' | 'price-high' | 'name' | 'popularity';
}

export class CostumeService {
  private allCostumes: Costume[] = [];
  private newCostumeIds: number[] = [];
  private newCostumes: Costume[] = [];

  constructor() {
    this.allCostumes = costumesData.costumes.map((c: any) => ({
      id: Number(c.id),
      name: c.name,
      price: String(c.price),
      image: c.image,
      description: c.description || "",
      category: c.category || "",
      images: c.images || [c.image],
      available: c.available !== undefined ? c.available : true,
      colors: c.colors || [],
      size: c.size || [],
    }));
    this.newCostumeIds = newCostumesData.newCostumeIds.map(Number);
    this.newCostumes = this.allCostumes.filter(c => this.newCostumeIds.includes(c.id));
  }

  // Tüm kostümleri getir
  getAllCostumes(): Costume[] {
    return this.allCostumes;
  }

  // Sadece yeni kostümleri getir
  getNewCostumes(): Costume[] {
    return this.newCostumes;
  }

  // ID'ye göre kostüm getir
  getCostumeById(id: number): Costume | undefined {
    return this.allCostumes.find(costume => costume.id === id);
  }

  // Kategoriye göre kostüm getir
  getCostumesByCategory(category: string): Costume[] {
    return this.allCostumes.filter(costume => costume.category === category);
  }

  // Kostümleri filtrele
  filterCostumes(filters: CostumeFilter): Costume[] {
    return this.allCostumes.filter(costume => {
      // Kategori filtresi
      if (filters.category && costume.category !== filters.category) {
        return false;
      }

  
      // Fiyat aralığı filtresi
      if (filters.priceRange) {
        const price = this.parsePrice(costume.price);
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      // Renk filtresi
      if (filters.colors && filters.colors.length > 0) {
        const hasMatchingColor = costume.colors.some(color => 
          filters.colors?.includes(color)
        );
        if (!hasMatchingColor) {
          return false;
        }
      }

      return true;
    });
  }

  // Kostümleri sırala
  sortCostumes(costumes: Costume[], options: SortOptions): Costume[] {
    const sortedCostumes = [...costumes];

    switch (options.sortBy) {
      case 'price-low':
        return sortedCostumes.sort((a, b) => 
          this.parsePrice(a.price) - this.parsePrice(b.price)
        );
      
      case 'price-high':
        return sortedCostumes.sort((a, b) => 
          this.parsePrice(b.price) - this.parsePrice(a.price)
        );
      
      case 'name':
        return sortedCostumes.sort((a, b) => 
          a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' })
        );
      
      case 'newest':
        return sortedCostumes.sort((a, b) => b.id - a.id);
      
      case 'popularity':
        // Popülarite sıralaması için gelecekte bir alan eklenebilir
        return sortedCostumes;
      
      default:
        return sortedCostumes;
    }
  }

  // Fiyat arama ve filtreleme
  searchCostumes(query: string): Costume[] {
    const lowerQuery = query.toLowerCase();
    return this.allCostumes.filter(costume => 
      costume.name.toLowerCase().includes(lowerQuery) ||
      costume.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Mevcut kategorileri getir
  getCategories(): string[] {
    const categories = Array.from(new Set(this.allCostumes.map(costume => costume.category)));
    return categories;
  }

  // Mevcut renkleri getir
  getAvailableColors(): string[] {
    const colors = new Set<string>();
    this.allCostumes.forEach(costume => {
      costume.colors.forEach(color => colors.add(color));
    });
    return Array.from(colors);
  }

  // Fiyat aralığını getir
  getPriceRange(): { min: number; max: number } {
    const prices = this.allCostumes.map(costume => this.parsePrice(costume.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  // Fiyat string'ini sayıya çevir
  private parsePrice(priceString: string): number {
    // "1.249,00 TL" formatını 1249.00 sayısına çevir
    const numericString = priceString
      .replace(/[^\d,]/g, '') // Sadece rakam ve virgül bırak
      .replace(',', '.'); // Virgülü noktaya çevir
    return parseFloat(numericString) || 0;
  }

  // Fiyat formatla (görüntüleme için)
  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }
}

// Singleton instance
export const costumeService = new CostumeService();
export default costumeService;