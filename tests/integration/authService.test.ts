import { supabase } from '../../src/config/supabase';
import * as authService from '../../src/services/authService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../src/config/supabase');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'password123',
        first_name: 'Test',
        last_name: 'User'
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: { ...mockUser, id: '1' }, error: null })
        })
      });

      const result = await authService.registerUser(mockUser);

      expect(result).toEqual({ ...mockUser, id: '1' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });
  });

  describe('loginUser', () => {
    it('should login a user and return a token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password_hash: 'hashedPassword'
      };

      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockUser, error: null })
          })
        })
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake-token');

      const result = await authService.loginUser('test@example.com', 'password123');

      expect(result).toBe('fake-token');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: '1' }, expect.any(String), { expiresIn: '1d' });
    });
  });
});
