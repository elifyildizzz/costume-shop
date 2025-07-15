import { Request, Response } from 'express';
import { CostumeService } from '../services/CostumeService';

export class CostumeController {
  private costumeService: CostumeService;

  constructor() {
    this.costumeService = new CostumeService();
  }

  public getAllCostumes = async (req: Request, res: Response) => {
    try {
      const { category, size, color, type } = req.query;
      const costumes = await this.costumeService.getCostumes({
        category: category as string,
        size: size as string,
        color: color as string,
        type: type as 'sale' | 'rent'
      });
      res.json({ success: true, costumes });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ success: false, message: errorMessage });
    }
  };

  public getCostumeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const costume = await this.costumeService.getCostumeById(id);
      res.json({ success: true, costume });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Costume not found';
      res.status(404).json({ success: false, message: errorMessage });
    }
  };

  public createCostume = async (req: Request, res: Response) => {
    try {
      const costumeData = req.body;
      const costume = await this.costumeService.createCostume(costumeData);
      res.status(201).json({ success: true, costume });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create costume';
      res.status(400).json({ success: false, message: errorMessage });
    }
  };
}