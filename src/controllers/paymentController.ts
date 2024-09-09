import express from 'express';
import * as paymentService from '../services/paymentService';
import { validatePayment } from '../utils/validation';

export const getOrderPayments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const payments = await paymentService.getOrderPayments(orderId);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const validationErrors = validatePayment(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newPayment = await paymentService.createPayment(orderId, req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const paymentId = req.params.paymentId;
    const payment = await paymentService.getPaymentById(orderId, paymentId);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
};