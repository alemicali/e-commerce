import express from 'express';
import * as orderItemController from '../controllers/orderItemController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', orderItemController.getOrderItems);
router.post('/', orderItemController.addOrderItem);
router.delete('/:itemId', orderItemController.deleteOrderItem);

export default router;