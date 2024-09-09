import request from 'supertest';
import app from '../../src/app';
import { supabase } from '../../src/config/supabase';

jest.mock('../../src/config/supabase');

describe('User Routes', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    created_at: '2023-05-01T00:00:00Z',
    updated_at: '2023-05-01T00:00:00Z'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /v1/users/register', () => {
    it('should register a new user', async () => {
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: { id: '1' } },
        error: null
      });
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockUser, error: null })
        })
      });

      const response = await request(app)
        .post('/v1/users/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          first_name: 'Test',
          last_name: 'User'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });
  });

  describe('POST /v1/users/login', () => {
    it('should login a user', async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { session: { access_token: 'fake-token' } },
        error: null
      });

      const response = await request(app)
        .post('/v1/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('session');
    });
  });

  describe('GET /v1/users/profile', () => {
    it('should get user profile', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockUser, error: null })
          })
        })
      });

      const response = await request(app)
        .get('/v1/users/profile')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });
  });
});
