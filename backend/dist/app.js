"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const wikiRoutes_1 = __importDefault(require("./routes/wikiRoutes"));
// 環境変数を読み込み
dotenv_1.default.config({ path: '../.env' });
console.log('MONGODB_URI from dotenv:', process.env.MONGODB_URI); // デバッグ用
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/projects', projectRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/wiki', wikiRoutes_1.default); // Wikiルートを追加
exports.default = app;
