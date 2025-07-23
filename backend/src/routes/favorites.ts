import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const controller = new FavoriteController();

// Tüm favoriler (kullanıcıya özel)
router.get('/', authenticateToken, async (req, res) => {
  try {
    await controller.getFavorites(req, res);
  } catch (e) {}
});

// Favori ekle
router.post('/add', authenticateToken, async (req, res) => {
  try {
    await controller.addFavorite(req, res);
  } catch (e) {}
});

// Favori sil
router.post('/remove', authenticateToken, async (req, res) => {
  try {
    await controller.removeFavorite(req, res);
  } catch (e) {}
});

export default router; 