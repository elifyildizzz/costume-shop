import { Request, Response } from 'express';
import { FavoriteService } from '../services/FavoriteService';

const favoriteService = new FavoriteService();

export class FavoriteController {
  // Favori ekle
  async addFavorite(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.userId;
      const { costumeId, accessoryId } = req.body;
      if (!userId) return res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
      if (!costumeId && !accessoryId) return res.status(400).json({ success: false, message: 'Kostüm veya aksesuar ID gerekli.' });
      const favorite = await favoriteService.addFavorite(userId, costumeId, accessoryId);
      res.status(201).json({ success: true, favorite });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : String(error) });
    }
  }

  // Favori sil
  async removeFavorite(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.userId;
      const { costumeId, accessoryId } = req.body;
      if (!userId) return res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
      if (!costumeId && !accessoryId) return res.status(400).json({ success: false, message: 'Kostüm veya aksesuar ID gerekli.' });
      await favoriteService.removeFavorite(userId, costumeId, accessoryId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : String(error) });
    }
  }

  // Kullanıcının favorilerini getir
  async getFavorites(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
      const favorites = await favoriteService.getFavorites(userId);
      res.json({ success: true, favorites });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : String(error) });
    }
  }
} 