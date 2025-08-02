import express from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

// Kullanıcı profili getir
router.get('/profile', authenticateToken, userController.getProfile);

// Kullanıcı profili güncelle
router.put('/profile', authenticateToken, userController.updateProfile);

export default router; 