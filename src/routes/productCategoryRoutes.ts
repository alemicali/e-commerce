import express from 'express';
import * as productCategoryController from '../controllers/productCategoryController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', productCategoryController.getProductCategories);

router.use(authMiddleware);

router.post('/', productCategoryController.addProductCategory);
router.delete('/:categoryId', productCategoryController.removeProductCategory);

export default router;