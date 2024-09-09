import { supabase } from '../../src/config/supabase';
import * as orderService from '../../src/services/orderService';
import { NewOrder, Order } from '../../src/types';

jest.mock('../../src/config/supabase');

describe('Order Service', () => {
  const mockOrder: Order = {
    id: '1',
    user_id: '1',
    total_amount: 100.00,
    status: 'pending',
    shipping_address_id: '1',
    billing_address_id: '1',
    order_date: '2023-05-01T00:00:00Z'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllOrders', () => {
    it('should return an array of orders', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          match: jest.fn().mockResolvedValue({ data: [mockOrder], error: null })
        })
      });

      const result = await orderService.getAllOrders({});

      expect(result).toEqual([mockOrder]);
      expect(supabase.from).toHaveBeenCalledWith('orders');
    });
  });

  describe('createOrder', () => {
    it('should create and return a new order', async () => {
      const newOrder: NewOrder = {
        user_id: '1',
        total_amount: 100.00,
        shipping_address_id: '1',
        billing_address_id: '1'
      };

      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockOrder, error: null })
        })
      });

      const result = await orderService.createOrder(newOrder);

      expect(result).toEqual(mockOrder);
      expect(supabase.from).toHaveBeenCalledWith('orders');
    });
  });

  describe('getOrderById', () => {
    it('should return an order when given a valid id', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockOrder, error: null })
          })
        })
      });

      const result = await orderService.getOrderById('1');

      expect(result).toEqual(mockOrder);
      expect(supabase.from).toHaveBeenCalledWith('orders');
    });
  });

  describe('updateOrder', () => {
    it('should update and return an order', async () => {
      const updateData = { status: 'processing' as const };

      (supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: { ...mockOrder, ...updateData }, error: null })
          })
        })
      });

      const result = await orderService.updateOrder('1', updateData);

      expect(result).toEqual({ ...mockOrder, ...updateData });
      expect(supabase.from).toHaveBeenCalledWith('orders');
    });
  });
});
