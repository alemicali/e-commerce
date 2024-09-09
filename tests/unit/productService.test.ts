import { supabase } from '../../src/config/supabase';
import * as productService from '../../src/services/productService';
import { NewProduct, Product } from '../../src/types';

jest.mock('../../src/config/supabase');

describe('Product Service', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    base_price: 19.99,
    sku: 'TEST-001',
    is_active: true,
    created_at: '2023-05-01T00:00:00Z',
    updated_at: '2023-05-01T00:00:00Z'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [mockProduct], error: null })
      });

      const result = await productService.getAllProducts();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockProduct, error: null })
          })
        })
      });

      const result = await productService.getProductById('1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProduct: NewProduct = {
        name: 'New Product',
        description: 'This is a new product',
        base_price: 29.99,
        sku: 'NEW-001'
      };

      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: { ...newProduct, id: '2' }, error: null })
        })
      });

      const result = await productService.createProduct(newProduct);
      expect(result).toEqual({ ...newProduct, id: '2' });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updatedProduct = { ...mockProduct, name: 'Updated Product' };
      (supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: updatedProduct, error: null })
          })
        })
      });

      const result = await productService.updateProduct('1', { name: 'Updated Product' });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null })
        })
      });

      const result = await productService.deleteProduct('1');
      expect(result).toBe(true);
    });
  });
});
