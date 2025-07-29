import express from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register', async (req, res, next) => {
  try {
    await userController.register(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await userController.login(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    await userController.getProfile(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
