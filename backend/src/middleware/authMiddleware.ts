import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Request tipini genişletmek için interface
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token bulunamadı.' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Token geçersiz.' });
      return;
    }
    req.userId = decoded.userId.toString();
    next();
  });
} 