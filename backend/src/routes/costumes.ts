import express from 'express';
import { CostumeController } from '../controllers/CostumeController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const costumeController = new CostumeController();

router.get('/', (req, res) => costumeController.getAllCostumes(req, res));
router.get('/:id', (req, res) => costumeController.getCostumeById(req, res));
router.post('/', authenticateToken, (req, res) => costumeController.createCostume(req, res));
// Güncelleme ve silme fonksiyonları eklenirse burada da eklenmeli.

export default router;
