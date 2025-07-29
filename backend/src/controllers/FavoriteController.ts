import { Request, Response } from 'express';
import { FavoriteService } from '../services/FavoriteService';

// Request tipini genişletmek için interface
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const favoriteService = new FavoriteService();

export class FavoriteController {
  
  // Favori ekle
  async addFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const { costumeId, accessoryId } = req.body;
      
      if (!userId) {
        res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
        return;
      }
      
      if (!costumeId && !accessoryId) {
        res.status(400).json({ success: false, message: 'Kostüm veya aksesuar ID gerekli.' });
        return;
      }

      // String'i number'a çevir
      const favorite = await favoriteService.addFavorite(
        parseInt(userId), 
        costumeId, 
        accessoryId
      );
      
      res.status(201).json({ success: true, favorite });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  // Favori sil
  async removeFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const { costumeId, accessoryId } = req.body;
      
      if (!userId) {
        res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
        return;
      }
      
      if (!costumeId && !accessoryId) {
        res.status(400).json({ success: false, message: 'Kostüm veya aksesuar ID gerekli.' });
        return;
      }

      // String'i number'a çevir
      await favoriteService.removeFavorite(
        parseInt(userId), 
        costumeId, 
        accessoryId
      );
      
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  // Kullanıcının favorilerini getir
  async getFavorites(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      
      if (!userId) {
        res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
        return;
      }

      // String'i number'a çevir
      const favorites = await favoriteService.getFavorites(parseInt(userId));
      
      res.json({ success: true, favorites });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }
}