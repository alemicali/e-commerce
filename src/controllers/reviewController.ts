import express from 'express';
import * as reviewService from '../services/reviewService';
import { validateReview } from '../utils/validation';

export const getProductReviews = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const reviews = await reviewService.getProductReviews(productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.id; // Assuming user is authenticated and user id is available in req.user
    if (!userId) {
      return res.status(401).json({ message: 'User must be authenticated to create a review' });
    }
    const validationErrors = validateReview(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newReview = await reviewService.createReview(productId, userId, req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const review = await reviewService.getReviewById(productId, reviewId);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const userId = req.user?.id; // Assuming user is authenticated and user id is available in req.user
    if (!userId) {
      return res.status(401).json({ message: 'User must be authenticated to update a review' });
    }
    const validationErrors = validateReview(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedReview = await reviewService.updateReview(productId, reviewId, userId, req.body);
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found or user not authorized to update' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const userId = req.user?.id; // Assuming user is authenticated and user id is available in req.user
    if (!userId) {
      return res.status(401).json({ message: 'User must be authenticated to delete a review' });
    }
    const deleted = await reviewService.deleteReview(productId, reviewId, userId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Review not found or user not authorized to delete' });
    }
  } catch (error) {
    next(error);
  }
};