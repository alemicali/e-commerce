import express from 'express';
import * as categoryController from '../controllers/categoryController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:categoryId', categoryController.getCategoryById);

router.use(authMiddleware);

router.post('/', categoryController.createCategory);
router.put('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

export default router;