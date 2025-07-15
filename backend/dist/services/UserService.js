"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createUser(userData) {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
                role: userData.role || 'CUSTOMER'
            }
        });
        return user;
    }
    async loginUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Geçersiz şifre');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return { user, token };
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        return user;
    }
}
exports.UserService = UserService;
