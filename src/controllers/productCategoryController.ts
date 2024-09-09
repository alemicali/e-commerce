import express from 'express';
import * as productCategoryService from '../services/productCategoryService';

export const getProductCategories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const categories = await productCategoryService.getProductCategories(productId);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const addProductCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }
    const newProductCategory = await productCategoryService.addProductCategory(productId, categoryId);
    res.status(201).json(newProductCategory);
  } catch (error) {
    next(error);
  }
};

export const removeProductCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const categoryId = req.params.categoryId;
    const deleted = await productCategoryService.removeProductCategory(productId, categoryId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    next(error);
  }
};