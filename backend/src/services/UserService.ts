import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { PrismaClient } from '@prisma/client';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: userData.role || 'CUSTOMER'
      }
    });

    return user;
  }

  public async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Geçersiz şifre');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return { user, token };
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    return user;
  }
}