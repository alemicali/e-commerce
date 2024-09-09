import { supabase } from '../config/supabase';
import { Category } from '../types';

export const getProductCategories = async (productId: string): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('product_categories')
    .select('categories:category_id(*)')
    .eq('product_id', productId);
  
  if (error) throw error;

  // Verifichiamo e convertiamo i dati al tipo corretto
  if (!data) return [];

  return data.map(item => {
    const category = item.categories;
    if (isCategory(category)) {
      return category;
    } else {
      throw new Error('Invalid category data received from the database');
    }
  });
};

export const addProductCategory = async (productId: string, categoryId: string): Promise<void> => {
  const { error } = await supabase
    .from('product_categories')
    .insert({ product_id: productId, category_id: categoryId });
  
  if (error) throw error;
};

export const removeProductCategory = async (productId: string, categoryId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('product_categories')
    .delete()
    .eq('product_id', productId)
    .eq('category_id', categoryId);
  
  if (error) throw error;
  return true;
};

// Funzione di type guard per verificare se un oggetto Ã¨ di tipo Category
function isCategory(obj: any): obj is Category {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    (obj.parent_id === undefined || typeof obj.parent_id === 'string') &&
    (obj.description === undefined || typeof obj.description === 'string')
  );
}