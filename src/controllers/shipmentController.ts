import express from 'express';
import * as shipmentService from '../services/shipmentService';
import { validateShipment } from '../utils/validation';

export const getOrderShipments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const shipments = await shipmentService.getOrderShipments(orderId);
    res.json(shipments);
  } catch (error) {
    next(error);
  }
};

export const createShipment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const validationErrors = validateShipment(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const newShipment = await shipmentService.createShipment(orderId, req.body);
    res.status(201).json(newShipment);
  } catch (error) {
    next(error);
  }
};

export const getShipmentById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const shipmentId = req.params.shipmentId;
    const shipment = await shipmentService.getShipmentById(orderId, shipmentId);
    if (shipment) {
      res.json(shipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateShipment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const orderId = req.params.orderId;
    const shipmentId = req.params.shipmentId;
    const validationErrors = validateShipment(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const updatedShipment = await shipmentService.updateShipment(orderId, shipmentId, req.body);
    if (updatedShipment) {
      res.json(updatedShipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (error) {
    next(error);
  }
};