import express from 'express';
import * as orderController from '../controllers/orderController';
import { authMiddleware } from '../middleware/auth';
import orderItemRoutes from './orderItemRoutes';
import paymentRoutes from './paymentRoutes';
import shipmentRoutes from './shipmentRoutes';

const router = express.Router();

router.use(authMiddleware);

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);

// Nested routes
router.use('/:orderId/items', orderItemRoutes);
router.use('/:orderId/payments', paymentRoutes);
router.use('/:orderId/shipments', shipmentRoutes);

export default router;