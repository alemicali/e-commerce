import request from 'supertest';
import app from '../../src/app';
import { supabase } from '../../src/config/supabase';

jest.mock('../../src/config/supabase');

describe('Order Routes', () => {
  const mockOrder = {
    id: '1',
    user_id: '1',
    total_amount: 100.00,
    status: 'pending',
    created_at: '2023-05-01T00:00:00Z',
    updated_at: '2023-05-01T00:00:00Z'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /v1/orders', () => {
    it('should create a new order', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockOrder, error: null })
        })
      });

      const response = await request(app)
        .post('/v1/orders')
        .set('Authorization', 'Bearer fake-token')
        .send({
          user_id: '1',
          total_amount: 100.00,
          shipping_address_id: '1',
          billing_address_id: '1'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOrder);
    });
  });

  describe('GET /v1/orders/:id', () => {
    it('should return an order when given a valid id', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockOrder, error: null })
          })
        })
      });

      const response = await request(app)
        .get('/v1/orders/1')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });
  });
});
