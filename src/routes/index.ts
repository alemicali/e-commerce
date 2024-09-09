import express from 'express';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import cartRoutes from './cartRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import addressRoutes from './addressRoutes';
import categoryRoutes from './categoryRoutes';
import couponRoutes from './couponRoutes';
import reviewRoutes from './reviewRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/coupons', couponRoutes);

// Nested routes
router.use('/users/:userId/addresses', addressRoutes);
router.use('/products/:productId/reviews', reviewRoutes);

export default router;