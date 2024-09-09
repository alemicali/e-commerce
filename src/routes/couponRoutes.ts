import express from 'express';
import * as couponController from '../controllers/couponController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', couponController.getAllCoupons);
router.post('/', couponController.createCoupon);
router.get('/:couponId', couponController.getCouponById);
router.put('/:couponId', couponController.updateCoupon);
router.delete('/:couponId', couponController.deleteCoupon);

export default router;