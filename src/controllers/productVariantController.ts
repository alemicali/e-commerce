import express from 'express';
import * as productVariantService from '../services/productVariantService';
import { validateProductVariant } from '../utils/validation';

export const getProductVariants = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const variants = await productVariantService.getProductVariants(productId);
    res.json(variants);
  } catch (error) {
    next(error);
  }
};

export const createProductVariant = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const validationErrors = validateProductVariant(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newVariant = await productVariantService.createProductVariant(productId, req.body);
    res.status(201).json(newVariant);
  } catch (error) {
    next(error);
  }
};

export const getProductVariantById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const variant = await productVariantService.getProductVariantById(productId, variantId);
    if (variant) {
      res.json(variant);
    } else {
      res.status(404).json({ message: 'Product variant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProductVariant = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const validationErrors = validateProductVariant(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedVariant = await productVariantService.updateProductVariant(productId, variantId, req.body);
    if (updatedVariant) {
      res.json(updatedVariant);
    } else {
      res.status(404).json({ message: 'Product variant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProductVariant = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const deleted = await productVariantService.deleteProductVariant(productId, variantId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product variant not found' });
    }
  } catch (error) {
    next(error);
  }
};