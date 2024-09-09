import express from 'express';
import * as cartService from '../services/cartService';
import { validateCartItem } from '../utils/validation';

export const getCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const validationErrors = validateCartItem({ ...req.body, user_id: req.user.id });
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedCart = await cartService.addToCart(req.user.id, req.body);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    const updatedCart = await cartService.updateCartItem(req.user.id, id, quantity);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.params;
    const updatedCart = await cartService.removeFromCart(req.user.id, id);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};
