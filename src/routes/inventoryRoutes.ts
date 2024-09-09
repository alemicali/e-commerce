import express from 'express';
import * as inventoryController from '../controllers/inventoryController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', inventoryController.getProductInventory);

router.use(authMiddleware);

router.put('/', inventoryController.updateProductInventory);

export default router;