import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createUser(userData: any): Promise<User> {
    // Email benzersizlik kontrolü
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error('Bu email adresi zaten kayıtlı');
    }

    // Gerekli alanların kontrolü
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      throw new Error('Tüm alanlar zorunludur');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    try {
      const user = await this.prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName
        }
      });
      return user;
    } catch (error) {
      console.error('User create error:', error);
      throw new Error('Kullanıcı oluşturulurken hata oluştu');
    }
  }

  public async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw new Error('Kullanıcı bulunamadı');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Şifre yanlış');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  // Email kontrolü için yardımcı method
  public async isEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return !!user;
  }
}