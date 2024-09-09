import { supabase } from '../config/supabase';
import { ProductVariant, NewProductVariant } from '../types';

export const getProductVariants = async (productId: string): Promise<ProductVariant[]> => {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId);
  
  if (error) throw error;
  return data as ProductVariant[];
};

export const createProductVariant = async (productId: string, variant: NewProductVariant): Promise<ProductVariant> => {
  const { data, error } = await supabase
    .from('product_variants')
    .insert({ ...variant, product_id: productId })
    .single();
  
  if (error) throw error;
  return data as ProductVariant;
};

export const getProductVariantById = async (productId: string, variantId: string): Promise<ProductVariant | null> => {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('id', variantId)
    .eq('product_id', productId)
    .single();
  
  if (error) throw error;
  return data as ProductVariant | null;
};

export const updateProductVariant = async (productId: string, variantId: string, variant: Partial<ProductVariant>): Promise<ProductVariant | null> => {
  const { data, error } = await supabase
    .from('product_variants')
    .update(variant)
    .eq('id', variantId)
    .eq('product_id', productId)
    .single();
  
  if (error) throw error;
  return data as ProductVariant | null;
};

export const deleteProductVariant = async (productId: string, variantId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', variantId)
    .eq('product_id', productId);
  
  if (error) throw error;
  return true;
};