import { PrismaClient, Order, OrderItem, OrderStatus, OrderType } from '@prisma/client';

const prisma = new PrismaClient();

export interface OrderItemInput {
  costumeId: string;
  quantity: number;
  size: string;
  price: number;
  type: OrderType;
}

export interface CreateOrderInput {
  userId: string;
  type: OrderType; // EKLENDİ
  totalAmount: number;
  shippingAddress: string;
  items: OrderItemInput[];
}

export class OrderService {
  async createOrder(data: CreateOrderInput) {
    try {
      return await prisma.order.create({
        data: {
          userId: data.userId,
          type: data.type, // EKLENDİ
          totalAmount: data.totalAmount,
          status: OrderStatus.PENDING,
          shippingAddress: data.shippingAddress,
          items: {
            create: data.items.map((item) => ({
              costumeId: item.costumeId,
              quantity: item.quantity,
              size: item.size,
              price: item.price,
              type: item.type
            }))
          }
        },
        include: { items: true }
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      throw new Error('Sipariş oluşturulamadı: ' + errMsg);
    }
  }

  async getOrdersByUser(userId: string) {
    try {
      return await prisma.order.findMany({
        where: { userId },
        include: { items: true }
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      throw new Error('Kullanıcı siparişleri alınamadı: ' + errMsg);
    }
  }

  async getOrderById(id: string) {
    try {
      return await prisma.order.findUnique({
        where: { id },
        include: { items: true }
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      throw new Error('Sipariş bulunamadı: ' + errMsg);
    }
  }
}