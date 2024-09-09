import { supabase } from '../config/supabase';
import { Inventory, UpdateInventory } from '../types';

export const getProductInventory = async (productId: string): Promise<Inventory | null> => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('product_id', productId)
    .single();
  
  if (error) throw error;
  return data as Inventory | null;
};

export const updateProductInventory = async (productId: string, inventory: UpdateInventory): Promise<Inventory> => {
  const { data, error } = await supabase
    .from('inventory')
    .upsert({ ...inventory, product_id: productId })
    .single();
  
  if (error) throw error;
  return data as Inventory;
};