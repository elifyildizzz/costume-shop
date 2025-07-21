// backend/src/data/newCostumesData.ts
export interface Costume {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string[];
  description: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  inStock: boolean;
  addedDate: string;
  tags: string[];
}

export const newCostumesData: Costume[] = [
  {
    id: 1,
    name: "Prenses Elsa Kostümü",
    price: 150,
    image: "/images/kostüm1.jpg",
    category: "Çocuk",
    size: ["S", "M", "L"],
    description: "Frozen temalı göz alıcı Elsa kostümü. Çocuklar için mükemmel. Kaliteli kumaş ve detaylı işçilik.",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    inStock: true,
    addedDate: "2025-01-15",
    tags: ["disney", "prenses", "frozen", "çocuk"]
  },
  {
    id: 2,
    name: "Süper Kahraman Kostümü",
    price: 200,
    image: "/images/kostüm2.jpg",
    category: "Erkek",
    size: ["M", "L", "XL"],
    description: "Kaliteli kumaştan üretilmiş süper kahraman kostümü. Detaylı logo ve aksesuarlar.",
    rating: 4.9,
    reviews: 18,
    isNew: true,
    inStock: true,
    addedDate: "2025-01-18",
    tags: ["süper kahraman", "erkek", "aksiyon"]
  },
  {
    id: 3,
    name: "Vintage Elbise",
    price: 180,
    image: "/images/kostüm3.jpg",
    category: "Kadın",
    size: ["S", "M", "L", "XL"],
    description: "1950'ler tarzı şık vintage elbise. Tema partileri için ideal. Klasik kesim.",
    rating: 4.7,
    reviews: 31,
    isNew: true,
    inStock: true,
    addedDate: "2025-01-12",
    tags: ["vintage", "retro", "1950s", "kadın"]
  },
  {
    id: 4,
    name: "Korsan Kostümü",
    price: 170,
    image: "/images/kostüm4.jpg",
    category: "Unisex",
    size: ["M", "L", "XL"],
    description: "Detaylı korsan kostümü. Aksesuarlar dahil. Şapka, kılıç ve göz bandı.",
    rating: 4.6,
    reviews: 15,
    isNew: true,
    inStock: true,
    addedDate: "2025-01-20",
    tags: ["korsan", "aksesuarlı", "unisex", "macera"]
  },
  {
    id: 5,
    name: "Cadı Kostümü",
    price: 160,
    image: "/images/görsel1.png",
    category: "Kadın",
    size: ["S", "M", "L"],
    description: "Halloween için mükemmel cadı kostümü. Şapka ve asa dahil. Göz alıcı design.",
    rating: 4.5,
    reviews: 27,
    isNew: true,
    inStock: false,
    addedDate: "2025-01-10",
    tags: ["halloween", "cadı", "mistik", "kadın"]
  },
  {
    id: 6,
    name: "Aslan Kostümü",
    price: 190,
    image: "/images/kostüm.png",
    category: "Çocuk",
    size: ["S", "M"],
    description: "Sevimli aslan kostümü. Çocuklar bayılacak! Yumuşak kumaş ve güvenli malzeme.",
    rating: 4.9,
    reviews: 33,
    isNew: true,
    inStock: true,
    addedDate: "2025-01-22",
    tags: ["aslan", "hayvan", "çocuk", "sevimli"]
  }
];

// backend/src/services/newCostumesService.ts
export class NewCostumesService {
  
  // Tüm yeni kostümleri getir
  static getAllNewCostumes(): Costume[] {
    return newCostumesData.filter(costume => costume.isNew);
  }

  // Kategoriye göre filtrele
  static getNewCostumesByCategory(category: string): Costume[] {
    const allNewCostumes = this.getAllNewCostumes();
    
    if (category === "Tümü" || !category) {
      return allNewCostumes;
    }
    
    return allNewCostumes.filter(costume => costume.category === category);
  }

  // Fiyat aralığına göre filtrele
  static getNewCostumesByPriceRange(min: number, max: number): Costume[] {
    return this.getAllNewCostumes().filter(
      costume => costume.price >= min && costume.price <= max
    );
  }

  // Sıralama
  static sortNewCostumes(costumes: Costume[], sortBy: string): Costume[] {
    const sortedCostumes = [...costumes];
    
    switch(sortBy) {
      case "price-low":
        return sortedCostumes.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedCostumes.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedCostumes.sort((a, b) => b.rating - a.rating);
      case "name":
        return sortedCostumes.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return sortedCostumes.sort((a, b) => 
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        );
      default:
        return sortedCostumes;
    }
  }

  // Stok durumu kontrolü
  static getAvailableNewCostumes(): Costume[] {
    return this.getAllNewCostumes().filter(costume => costume.inStock);
  }

  // ID'ye göre tek kostüm getir
  static getNewCostumeById(id: number): Costume | undefined {
    return newCostumesData.find(costume => costume.id === id && costume.isNew);
  }

  // Arama
  static searchNewCostumes(query: string): Costume[] {
    const lowercaseQuery = query.toLowerCase();
    
    return this.getAllNewCostumes().filter(costume =>
      costume.name.toLowerCase().includes(lowercaseQuery) ||
      costume.description.toLowerCase().includes(lowercaseQuery) ||
      costume.category.toLowerCase().includes(lowercaseQuery) ||
      costume.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // İstatistikler
  static getNewCostumesStats() {
    const allNewCostumes = this.getAllNewCostumes();
    const totalCostumes = allNewCostumes.length;
    const averagePrice = allNewCostumes.reduce((sum, costume) => sum + costume.price, 0) / totalCostumes;
    const averageRating = allNewCostumes.reduce((sum, costume) => sum + costume.rating, 0) / totalCostumes;
    const totalReviews = allNewCostumes.reduce((sum, costume) => sum + costume.reviews, 0);
    const inStockCount = allNewCostumes.filter(costume => costume.inStock).length;
    
    return {
      totalCostumes,
      averagePrice: Math.round(averagePrice),
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      inStockCount,
      outOfStockCount: totalCostumes - inStockCount
    };
  }

  // Kategorilere göre grup
  static getNewCostumesByCategories() {
    const allNewCostumes = this.getAllNewCostumes();
    const categories = [...new Set(allNewCostumes.map(costume => costume.category))];
    
    return categories.map(category => ({
      category,
      costumes: allNewCostumes.filter(costume => costume.category === category),
      count: allNewCostumes.filter(costume => costume.category === category).length
    }));
  }
}