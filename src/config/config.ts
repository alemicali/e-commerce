import dotenv from 'dotenv';

dotenv.config();

export const config = {
  API_CLIENT_ID: process.env.API_CLIENT_ID,
  API_CLIENT_SECRET: process.env.API_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
};

if (!config.API_CLIENT_ID || !config.API_CLIENT_SECRET || !config.JWT_SECRET) {
  throw new Error('Missing required environment variables');
}
