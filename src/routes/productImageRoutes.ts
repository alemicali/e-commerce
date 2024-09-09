import express from 'express';
import * as productImageController from '../controllers/productImageController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', productImageController.getProductImages);

router.use(authMiddleware);

router.post('/', productImageController.addProductImage);
router.delete('/:imageId', productImageController.deleteProductImage);

export default router;