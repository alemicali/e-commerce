import express from 'express';
import * as orderService from '../services/orderService';
import { validateOrder } from '../utils/validation';

export const getAllOrders = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orders = await orderService.getAllOrders(req.query);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const validationErrors = validateOrder(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const validationErrors = validateOrder(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};
