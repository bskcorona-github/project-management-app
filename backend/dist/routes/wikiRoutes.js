"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wikiModel_1 = __importDefault(require("../models/wikiModel"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// Get all wiki pages
router.get('/', authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wikiPages = yield wikiModel_1.default.find({});
    res.json(wikiPages);
}));
// Get a single wiki page by ID
router.get('/:id', authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wikiPage = yield wikiModel_1.default.findById(req.params.id);
    if (wikiPage) {
        res.json(wikiPage);
    }
    else {
        res.status(404).json({ message: 'Wiki page not found' });
    }
}));
// Create a new wiki page
router.post('/', authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const wikiPage = new wikiModel_1.default({ title, content });
    const createdWikiPage = yield wikiPage.save();
    res.status(201).json(createdWikiPage);
}));
// Update a wiki page
router.put('/:id', authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const wikiPage = yield wikiModel_1.default.findById(req.params.id);
    if (wikiPage) {
        wikiPage.title = title;
        wikiPage.content = content;
        const updatedWikiPage = yield wikiPage.save();
        res.json(updatedWikiPage);
    }
    else {
        res.status(404).json({ message: 'Wiki page not found' });
    }
}));
// Delete a wiki page
router.delete('/:id', authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wikiPage = yield wikiModel_1.default.findById(req.params.id);
    if (wikiPage) {
        yield wikiPage.remove();
        res.json({ message: 'Wiki page removed' });
    }
    else {
        res.status(404).json({ message: 'Wiki page not found' });
    }
}));
exports.default = router;
