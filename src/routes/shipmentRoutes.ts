import express from 'express';
import * as shipmentController from '../controllers/shipmentController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', shipmentController.getOrderShipments);
router.post('/', shipmentController.createShipment);
router.get('/:shipmentId', shipmentController.getShipmentById);
router.put('/:shipmentId', shipmentController.updateShipment);

export default router;