import express from 'express';
import * as addressService from '../services/addressService';
import { validateAddress } from '../utils/validation';

export const getUserAddresses = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.params.userId;
    const addresses = await addressService.getUserAddresses(userId);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.params.userId;
    const validationErrors = validateAddress(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newAddress = await addressService.createAddress(userId, req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

export const getAddressById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const address = await addressService.getAddressById(userId, addressId);
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const validationErrors = validateAddress(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedAddress = await addressService.updateAddress(userId, addressId, req.body);
    if (updatedAddress) {
      res.json(updatedAddress);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const deleted = await addressService.deleteAddress(userId, addressId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    next(error);
  }
};