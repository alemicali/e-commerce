import express from 'express';
import * as addressController from '../controllers/addressController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', addressController.getUserAddresses);
router.post('/', addressController.createAddress);
router.get('/:addressId', addressController.getAddressById);
router.put('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

export default router;