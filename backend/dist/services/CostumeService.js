"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostumeService = void 0;
const client_1 = require("@prisma/client");
class CostumeService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getCostumes(filters) {
        const where = {};
        if (filters.category) {
            where.category = filters.category;
        }
        if (filters.color) {
            where.color = filters.color;
        }
        if (filters.type === 'sale') {
            where.isForSale = true;
        }
        else if (filters.type === 'rent') {
            where.isForRent = true;
        }
        if (filters.size) {
            where.size = {
                has: filters.size
            };
        }
        const costumes = await this.prisma.costume.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });
        return costumes;
    }
    async getCostumeById(id) {
        const costume = await this.prisma.costume.findUnique({
            where: { id }
        });
        if (!costume) {
            throw new Error('Kostüm bulunamadı');
        }
        return costume;
    }
    async createCostume(costumeData) {
        const costume = await this.prisma.costume.create({
            data: costumeData
        });
        return costume;
    }
}
exports.CostumeService = CostumeService;
