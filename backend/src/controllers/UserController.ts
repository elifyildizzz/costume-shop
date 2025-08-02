import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({ success: true, user });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(400).json({ success: false, message: errMsg });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      
      // data wrapper ekleyin
      res.json({ 
        success: true, 
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(401).json({ success: false, message: errMsg });
    }
  };
  public getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // userId JWT middleware tarafından ekleniyor
      const userId = req.userId;
      
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: 'Kullanıcı kimliği bulunamadı.' 
        });
        return;
      }

      const user = await this.userService.getUserById(parseInt(userId));
      
      if (!user) {
        res.status(404).json({ 
          success: false, 
          message: 'Kullanıcı bulunamadı.' 
        });
        return;
      }

      res.json({ success: true, data: user });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ success: false, message: errMsg });
    }
  };

  public updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.userId;
      
      if (!userId) {
        res.status(401).json({ 
          success: false, 
          message: 'Kullanıcı kimliği bulunamadı.' 
        });
        return;
      }

      const updateData = req.body;
      const user = await this.userService.updateUser(parseInt(userId), updateData);
      
      res.json({ success: true, user });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ success: false, message: errMsg });
    }
  };
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası oluştu.'
  });
}