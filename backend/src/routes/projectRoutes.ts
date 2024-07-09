import express from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.put('/:id', protect, updateProject); // 編集ルート
router.delete('/:id', protect, deleteProject); // 削除ルート

export default router;
