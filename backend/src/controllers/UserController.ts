import { Request, Response } from 'express';
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
      res.status(400).json({ success: false, message: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  };

  public getProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const user = await this.userService.getUserById(userId);
      res.json({ success: true, user });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}
