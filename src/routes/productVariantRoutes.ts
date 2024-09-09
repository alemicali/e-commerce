import express from 'express';
import * as productVariantController from '../controllers/productVariantController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', productVariantController.getProductVariants);
router.get('/:variantId', productVariantController.getProductVariantById);

router.use(authMiddleware);

router.post('/', productVariantController.createProductVariant);
router.put('/:variantId', productVariantController.updateProductVariant);
router.delete('/:variantId', productVariantController.deleteProductVariant);

export default router;