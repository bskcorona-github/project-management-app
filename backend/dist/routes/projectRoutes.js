"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, projectController_1.createProject);
router.get('/', authMiddleware_1.protect, projectController_1.getProjects);
router.put('/:id', authMiddleware_1.protect, projectController_1.updateProject); // 編集ルート
router.delete('/:id', authMiddleware_1.protect, projectController_1.deleteProject); // 削除ルート
exports.default = router;
