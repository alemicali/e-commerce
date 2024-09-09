import express from 'express';
import * as paymentController from '../controllers/paymentController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', paymentController.getOrderPayments);
router.post('/', paymentController.createPayment);
router.get('/:paymentId', paymentController.getPaymentById);

export default router;