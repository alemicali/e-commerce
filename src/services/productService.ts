import { supabase } from '../config/supabase';
import { Product, NewProduct } from '../types';

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) throw error;
  return data as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Product | null;
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Product | null;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};
