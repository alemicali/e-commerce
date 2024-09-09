import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { clientId, clientSecret } = req.body;

    // Verifica le credenziali (questo Ã¨ un esempio, dovresti implementare la tua logica di verifica)
    if (clientId !== config.API_CLIENT_ID || clientSecret !== config.API_CLIENT_SECRET) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Genera il token
    const token = jwt.sign(
      { clientId },
      config.JWT_SECRET,
      { expiresIn: '1h' } // Il token scade dopo 1 ora
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
