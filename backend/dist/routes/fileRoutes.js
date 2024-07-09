"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controllers/fileController");
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const router = express_1.default.Router();
// ファイルアップロード
router.post('/', uploadMiddleware_1.default.single('file'), fileController_1.uploadFile);
// ファイル取得
router.get('/:id', fileController_1.getFile);
// ファイル削除
router.delete('/:id', fileController_1.deleteFile);
exports.default = router;
