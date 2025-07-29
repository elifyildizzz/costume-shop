import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

const AuthController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    
    try {
      // Validation
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Tüm alanlar zorunludur.' 
        });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Bu email ile zaten bir kullanıcı var.' 
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        success: true,
        message: 'Kullanıcı başarıyla oluşturuldu',
        data: {
          user: {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          token
        }
      });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Kayıt sırasında hata oluştu.' 
      });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
      // Validation
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email ve şifre zorunludur.' 
        });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: 'Kullanıcı bulunamadı.' 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false, 
          message: 'Şifre yanlış.' 
        });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        success: true,
        message: 'Giriş başarılı',
        data: {
          user: {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          token
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Giriş sırasında hata oluştu.' 
      });
    }
  },

  profile: async (req: Request, res: Response) => {
    // authenticateToken middleware ile req.userId atanır
    try {
      // @ts-ignore
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Kullanıcı kimliği bulunamadı.' 
        });
      }

      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Kullanıcı bulunamadı.' 
        });
      }

      res.json({ 
        success: true,
        data: {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }
      });
    } catch (err) {
      console.error('Profile error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Profil alınırken hata oluştu.' 
      });
    }
  },
};

export default AuthController;