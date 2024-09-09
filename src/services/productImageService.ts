import { supabase } from '../config/supabase';
import { ProductImage, NewProductImage } from '../types';

export const getProductImages = async (productId: string): Promise<ProductImage[]> => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data as ProductImage[];
};

export const addProductImage = async (productId: string, image: NewProductImage): Promise<ProductImage> => {
  const { data, error } = await supabase
    .from('product_images')
    .insert({ ...image, product_id: productId })
    .single();
  
  if (error) throw error;
  return data as ProductImage;
};

export const deleteProductImage = async (productId: string, imageId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId)
    .eq('product_id', productId);
  
  if (error) throw error;
  return true;
};