import express from 'express';
import * as productImageService from '../services/productImageService';
import { validateProductImage } from '../utils/validation';

export const getProductImages = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const images = await productImageService.getProductImages(productId);
    res.json(images);
  } catch (error) {
    next(error);
  }
};

export const addProductImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const validationErrors = validateProductImage(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newImage = await productImageService.addProductImage(productId, req.body);
    res.status(201).json(newImage);
  } catch (error) {
    next(error);
  }
};

export const deleteProductImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const imageId = req.params.imageId;
    const deleted = await productImageService.deleteProductImage(productId, imageId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product image not found' });
    }
  } catch (error) {
    next(error);
  }
};