import express from 'express';
import { StockController } from '../controllers/StockController';

const router = express.Router();
const stockController = new StockController();

// Kostüm stok durumu
router.get('/costume/:costumeId', stockController.getCostumeStock);
router.get('/costume/:costumeId/availability', stockController.checkCostumeAvailability);

// Aksesuar stok durumu
router.get('/accessory/:accessoryId', stockController.getAccessoryStock);
router.get('/accessory/:accessoryId/availability', stockController.checkAccessoryAvailability);

export default router; 