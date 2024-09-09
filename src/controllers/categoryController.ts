import express from 'express';
import * as categoryService from '../services/categoryService';
import { validateCategory } from '../utils/validation';

export const getAllCategories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const validationErrors = validateCategory(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategoryById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const categoryId = req.params.categoryId;
    const validationErrors = validateCategory(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const categoryId = req.params.categoryId;
    const deleted = await categoryService.deleteCategory(categoryId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};