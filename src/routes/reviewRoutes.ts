import express from 'express';
import * as reviewController from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', reviewController.getProductReviews);
router.get('/:reviewId', reviewController.getReviewById);

router.use(authMiddleware);

router.post('/', reviewController.createReview);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

export default router;