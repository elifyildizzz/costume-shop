import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({ success: true, user });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(400).json({ success: false, message: errMsg });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      res.json({ success: true, ...result });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(401).json({ success: false, message: errMsg });
    }
  };

  public getProfile = async (req: Request, res: Response) => {
    try {
      // userId JWT middleware tarafından ekleniyor
      // @ts-ignore
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Kullanıcı kimliği bulunamadı.' });
      }
      const user = await this.userService.getUserById(userId);
      res.json({ success: true, user });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(404).json({ success: false, message: errMsg });
    }
  };
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası oluştu.'
  });
}

