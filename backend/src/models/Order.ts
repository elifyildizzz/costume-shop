export interface Order {
  id: string;
  userId: string;
  type: 'SALE' | 'RENTAL';
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'RETURNED';
  items: OrderItem[];
  totalAmount: number;
  rentalStartDate?: Date;
  rentalEndDate?: Date;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  costumeId: string;
  quantity: number;
  size: string;
  price: number;
  type: 'SALE' | 'RENTAL';
}