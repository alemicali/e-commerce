import { supabase } from '../config/supabase';
import { CartItem, NewCartItem } from '../types';

export const getCart = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*)')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data as CartItem[];
};

export const addToCart = async (userId: string, item: NewCartItem): Promise<CartItem[]> => {
  const { data: existingItem, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', item.product_id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

  if (existingItem) {
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + item.quantity })
      .eq('id', existingItem.id);

    if (updateError) throw updateError;
  } else {
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert({ ...item, user_id: userId });

    if (insertError) throw insertError;
  }

  return getCart(userId);
};

export const updateCartItem = async (userId: string, itemId: string, quantity: number): Promise<CartItem[]> => {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .eq('user_id', userId);

  if (error) throw error;
  return getCart(userId);
};

export const removeFromCart = async (userId: string, itemId: string): Promise<CartItem[]> => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .eq('user_id', userId);

  if (error) throw error;
  return getCart(userId);
};
