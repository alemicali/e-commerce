import express from 'express';
import * as cartController from '../controllers/cartController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);  // Applica il middleware a tutte le route del carrello

router.get('/', cartController.getCart);
router.post('/items', cartController.addToCart);
router.put('/items/:itemId', cartController.updateCartItem);
router.delete('/items/:itemId', cartController.removeFromCart);

export default router;
