import express from 'express';
import * as couponService from '../services/couponService';
import { validateCoupon } from '../utils/validation';

export const getAllCoupons = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const validationErrors = validateCoupon(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newCoupon = await couponService.createCoupon(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    next(error);
  }
};

export const getCouponById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await couponService.getCouponById(couponId);
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCoupon = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const couponId = req.params.couponId;
    const validationErrors = validateCoupon(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedCoupon = await couponService.updateCoupon(couponId, req.body);
    if (updatedCoupon) {
      res.json(updatedCoupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const couponId = req.params.couponId;
    const deleted = await couponService.deleteCoupon(couponId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    next(error);
  }
};