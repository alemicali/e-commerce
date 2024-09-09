import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/token', authController.generateToken);

export default router;
