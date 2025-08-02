import { Request, Response } from 'express';
import { StockService } from '../services/StockService';

const stockService = new StockService();

export class StockController {
  
  // Kostüm stok durumunu getir
  async getCostumeStock(req: Request, res: Response): Promise<void> {
    try {
      const { costumeId } = req.params;
      
      if (!costumeId) {
        res.status(400).json({ success: false, message: 'Kostüm ID gerekli.' });
        return;
      }

      const stock = await stockService.getCostumeStock(parseInt(costumeId));
      
      res.json({ success: true, stock });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  // Aksesuar stok durumunu getir
  async getAccessoryStock(req: Request, res: Response): Promise<void> {
    try {
      const { accessoryId } = req.params;
      
      if (!accessoryId) {
        res.status(400).json({ success: false, message: 'Aksesuar ID gerekli.' });
        return;
      }

      const stock = await stockService.getAccessoryStock(parseInt(accessoryId));
      
      res.json({ success: true, stock });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  // Kostüm stok durumunu kontrol et
  async checkCostumeAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { costumeId } = req.params;
      
      if (!costumeId) {
        res.status(400).json({ success: false, message: 'Kostüm ID gerekli.' });
        return;
      }

      const availability = await stockService.checkCostumeAvailability(parseInt(costumeId));
      
      res.json({ success: true, availability });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  // Aksesuar stok durumunu kontrol et
  async checkAccessoryAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { accessoryId } = req.params;
      
      if (!accessoryId) {
        res.status(400).json({ success: false, message: 'Aksesuar ID gerekli.' });
        return;
      }

      const availability = await stockService.checkAccessoryAvailability(parseInt(accessoryId));
      
      res.json({ success: true, availability });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }
} 