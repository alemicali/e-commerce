import express from 'express';
import * as productController from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';
import productCategoryRoutes from './productCategoryRoutes';
import productImageRoutes from './productImageRoutes';
import productVariantRoutes from './productVariantRoutes';
import inventoryRoutes from './inventoryRoutes';

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.use(authMiddleware);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Nested routes
router.use('/:productId/categories', productCategoryRoutes);
router.use('/:productId/images', productImageRoutes);
router.use('/:productId/variants', productVariantRoutes);
router.use('/:productId/inventory', inventoryRoutes);

export default router;