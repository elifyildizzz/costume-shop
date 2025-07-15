"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostumeController = void 0;
const CostumeService_1 = require("../services/CostumeService");
class CostumeController {
    constructor() {
        this.getAllCostumes = async (req, res) => {
            try {
                const { category, size, color, type } = req.query;
                const costumes = await this.costumeService.getCostumes({
                    category: category,
                    size: size,
                    color: color,
                    type: type
                });
                res.json({ success: true, costumes });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        };
        this.getCostumeById = async (req, res) => {
            try {
                const { id } = req.params;
                const costume = await this.costumeService.getCostumeById(id);
                res.json({ success: true, costume });
            }
            catch (error) {
                res.status(404).json({ success: false, message: error.message });
            }
        };
        this.createCostume = async (req, res) => {
            try {
                const costumeData = req.body;
                const costume = await this.costumeService.createCostume(costumeData);
                res.status(201).json({ success: true, costume });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        };
        this.costumeService = new CostumeService_1.CostumeService();
    }
}
exports.CostumeController = CostumeController;
