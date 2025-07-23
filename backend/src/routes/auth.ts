import express from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    await userController.getProfile(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
