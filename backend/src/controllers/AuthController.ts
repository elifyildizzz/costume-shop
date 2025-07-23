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
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu email ile zaten bir kullanıcı var.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
      });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }, token });
    } catch (err) {
      res.status(500).json({ message: 'Kayıt sırasında hata oluştu.' });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Şifre yanlış.' });
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }, token });
    } catch (err) {
      res.status(500).json({ message: 'Giriş sırasında hata oluştu.' });
    }
  },

  profile: async (req: Request, res: Response) => {
    // authenticateToken middleware ile req.userId atanır
    try {
      // @ts-ignore
      const userId = req.userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      res.json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email });
    } catch (err) {
      res.status(500).json({ message: 'Profil alınırken hata oluştu.' });
    }
  },
};

export default AuthController; 