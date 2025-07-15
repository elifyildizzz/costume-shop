import rawData from './costumesData.json';

export interface Costume {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  images?: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  inStock: boolean;
  discount?: number;
}

export const costumes: Costume[] = rawData;

// Yardımcı fonksiyonlar (aynı şekilde kalabilir)
export const getNewCostumes = () =>
  costumes.filter(c => c.isNew).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const getFeaturedCostumes = () => costumes.filter(c => c.isFeatured);
export const getSaleCostumes = () => costumes.filter(c => c.isOnSale);
export const getCategories = () => Array.from(new Set(costumes.map(c => c.category)));
export const getCostumeById = (id: number) => costumes.find(c => c.id === id);
