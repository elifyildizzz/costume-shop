export interface Costume {
  id: string;
  name: string;
  description: string;
  category: string;
  size: string[];
  color: string;
  material: string;
  images: string[];
  salePrice?: number;
  rentalPrice?: number;
  isForSale: boolean;
  isForRent: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}