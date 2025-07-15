"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const userData = req.body;
                const user = await this.userService.createUser(userData);
                res.status(201).json({ success: true, user });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const result = await this.userService.loginUser(email, password);
                res.json({ success: true, ...result });
            }
            catch (error) {
                res.status(401).json({ success: false, message: error.message });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const userId = req.user?.id;
                const user = await this.userService.getUserById(userId);
                res.json({ success: true, user });
            }
            catch (error) {
                res.status(404).json({ success: false, message: error.message });
            }
        };
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
