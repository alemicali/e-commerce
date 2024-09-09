import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
    
    if (Date.now() >= decoded.exp! * 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Add the decoded token to the request object
    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};