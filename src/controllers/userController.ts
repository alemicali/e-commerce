import express from 'express';
import * as userService from '../services/userService';
import { validateUser, validateUserUpdate } from '../utils/validation';

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const validationErrors = validateUser({ email, password, first_name, last_name });
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const user = await userService.registerUser(email, password, first_name, last_name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const session = await userService.loginUser(email, password);
    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await userService.getUserProfile(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { first_name, last_name } = req.body;
    const validationErrors = validateUserUpdate({ first_name, last_name });
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedUser = await userService.updateUserProfile(userId, { first_name, last_name });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};