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
exports.deleteFile = exports.getFile = exports.uploadFile = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const conn = mongoose_1.default.connection;
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.file;
    res.status(201).json({
        file: {
            id: file.id,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            bucketName: file.bucketName,
        },
    });
});
exports.uploadFile = uploadFile;
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileID = new mongodb_1.ObjectId(req.params.id);
    try {
        const bucket = new mongodb_1.GridFSBucket(conn.db, {
            bucketName: 'uploads',
        });
        const downloadStream = bucket.openDownloadStream(fileID);
        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });
        downloadStream.on('error', () => {
            res.sendStatus(404);
        });
        downloadStream.on('end', () => {
            res.end();
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching file' });
    }
});
exports.getFile = getFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileID = new mongodb_1.ObjectId(req.params.id);
    try {
        const bucket = new mongodb_1.GridFSBucket(conn.db, {
            bucketName: 'uploads',
        });
        yield bucket.delete(fileID);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting file' });
    }
});
exports.deleteFile = deleteFile;
