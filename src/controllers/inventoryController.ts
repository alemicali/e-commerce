import express from 'express';
import * as inventoryService from '../services/inventoryService';
import { validateInventory } from '../utils/validation';

export const getProductInventory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const inventory = await inventoryService.getProductInventory(productId);
    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

export const updateProductInventory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const validationErrors = validateInventory(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedInventory = await inventoryService.updateProductInventory(productId, req.body);
    res.json(updatedInventory);
  } catch (error) {
    next(error);
  }
};