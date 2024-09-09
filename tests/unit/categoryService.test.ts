import { supabase } from '../../src/config/supabase';
import * as categoryService from '../../src/services/categoryService';
import { NewCategory, Category } from '../../src/types';

jest.mock('../../src/config/supabase');

describe('Category Service', () => {
  const mockCategory: Category = {
    id: '1',
    name: 'Test Category',
    description: 'This is a test category'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [mockCategory], error: null })
      });

      const result = await categoryService.getAllCategories();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by id', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockCategory, error: null })
          })
        })
      });

      const result = await categoryService.getCategoryById('1');
      expect(result).toEqual(mockCategory);
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const newCategory: NewCategory = {
        name: 'New Category',
        description: 'This is a new category'
      };

      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: { ...newCategory, id: '2' }, error: null })
        })
      });

      const result = await categoryService.createCategory(newCategory);
      expect(result).toEqual({ ...newCategory, id: '2' });
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updatedCategory = { ...mockCategory, name: 'Updated Category' };
      (supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: updatedCategory, error: null })
          })
        })
      });

      const result = await categoryService.updateCategory('1', { name: 'Updated Category' });
      expect(result).toEqual(updatedCategory);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null })
        })
      });

      const result = await categoryService.deleteCategory('1');
      expect(result).toBe(true);
    });
  });
});
