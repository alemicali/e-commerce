import { supabase } from '../config/supabase';
import { Category, NewCategory } from '../types';

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) throw error;
  return data as Category[];
};

export const createCategory = async (category: NewCategory): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .single();
  
  if (error) throw error;
  return data as Category;
};

export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();
  
  if (error) throw error;
  return data as Category | null;
};

export const updateCategory = async (categoryId: string, category: Partial<Category>): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', categoryId)
    .single();
  
  if (error) throw error;
  return data as Category | null;
};

export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);
  
  if (error) throw error;
  return true;
};