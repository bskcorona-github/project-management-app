import express from 'express';
import { uploadFile, getFile, deleteFile } from '../controllers/fileController';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

// ファイルアップロード
router.post('/', upload.single('file'), uploadFile);

// ファイル取得
router.get('/:id', getFile);

// ファイル削除
router.delete('/:id', deleteFile);

export default router;
