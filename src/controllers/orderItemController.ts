import express from 'express';
import * as orderItemService from '../services/orderItemService';
import { validateOrderItem } from '../utils/validation';

export const getOrderItems = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const orderItems = await orderItemService.getOrderItems(orderId);
    res.json(orderItems);
  } catch (error) {
    next(error);
  }
};

export const addOrderItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const validationErrors = validateOrderItem(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newOrderItem = await orderItemService.addOrderItem(orderId, req.body);
    res.status(201).json(newOrderItem);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const itemId = req.params.itemId;
    const deleted = await orderItemService.deleteOrderItem(orderId, itemId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Order item not found' });
    }
  } catch (error) {
    next(error);
  }
};